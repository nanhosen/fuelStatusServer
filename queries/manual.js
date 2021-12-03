const ZoneInfo = require('../models/zoneinfo')
const ercArray = require('./raws')

// const manualQuery = ZoneInfo
// 	.find({ cured: true })
// 	.where('manual_expires').lt(Date.now())
// 	.select('zone manual')

const manualQuery = ZoneInfo
	.find({
		cured: true,
		$and: [ 
			{ manual_expires: { $gt: Date.now() } },
			{ manual: { $ne: 'not set' } },
		],
		ERC_threshold: { $exists: true, $gt: 0 }
	})
	.select({
		zone: 1,
		elevation: 1,
		manual: 1,
		manual_expires: 1,
		center_id: 1,
		ERC_threshold: 1,
		rawsObject: 1,
		cured: 1,
	})
	.lean()

const buildMap = o => Object.keys(o).reduce((prev, curr) => {
	if (!o[curr].selected)
		return prev
	prev.set(curr, o[curr].RAWSname)
	return prev
}, new Map())

function manualArray() {
	return manualQuery
		.then(results => {
			results.forEach(zone => {
				const selected = Array.from(buildMap(zone.rawsObject).keys()) // array of selected RAWS
				let days = 3
				const periodicAverages = ercArray.map(x => {
					let n = selected.length
					var result = selected.reduce((prev, curr) => {
						const a = x.get(curr) ? parseInt(x.get(curr)) : (n -= 1, 0) // if missing a station reading:
						// first decrement the n-counter to account for that missing station reading
						// for that particular time period so that the average zone ERC calculation remains meaningful, 
						// then coerce the absent raws station ERC reading to equal zero for calculation purposes
						return prev += a
					}, null) 
					// console.log(result > 0)
					// !(result > 0) && days -= 1 // account for a missing day's worth of RAWS data potentially
					if (!(result > 0)) days -= 1 
					return n === 0 ? 0 : (result / n) 
				})
				zone.ERC = periodicAverages[0]
				zone.ERC24 = periodicAverages[1]
				zone.ERC48 = periodicAverages[2]

				const ThreeDayAverage = (days > 0) 
					? periodicAverages.reduce((prev, curr) => prev + curr, null) / days
				 	: null
				zone.ThreeDayAverage = ThreeDayAverage
				
				const thresholdDiff = parseInt(ThreeDayAverage) - parseInt(zone.ERC_threshold) 
				zone.thresholdDiff = thresholdDiff

				const status = function(thresholdDiff) {
					switch(true) {
						case (thresholdDiff <= -11):
							return 'notcritical'
						case (-11 < thresholdDiff && thresholdDiff < 0):
							return 'approachingcritical'
						case (0 <= thresholdDiff):
							return 'critical'
						default:
							return 'nodata'
					}
				}(thresholdDiff)
		    zone.calc_erc_status = status
		    zone.status = zone.manual
			})
			return results
		})
		.catch(err => console.log(err))
}

module.exports = manualArray

