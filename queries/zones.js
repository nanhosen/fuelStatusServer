const ZoneInfo = require('../models/zoneinfo')

// const regularQuery = ZoneInfo
// 	.find({ cured: true })
// 	.where('manual').equals('not set')
// 	.select('zone rawsObject ERC_threshold')

// var dog = { '101812': { RAWSname: 'Horton Peak', selected: false },
//   '102903': { RAWSname: 'North Fork', selected: true },
//   '102906': { RAWSname: 'Ohio Gulch', selected: true } }
// var cat = { '102601': { RAWSname: 'Boise South', selected: false },
//   '102709': { RAWSname: 'Mountain Home', selected: true } } 

const zonesQuery = function(id) {
	
	if (id === '999') {
		return ZoneInfo.find({})
		.select({
			zone: 1,
			center_id: 1,
			elevation: 1,
			ERC_threshold: 1,
			manual: 1,
			manual_expires: 1,
			rawsObject: 1,
			cured: 1,		
		})
		.limit()
		.lean()		
	}

	return ZoneInfo.find({
		center_id: { $eq: id },
	})
	.select({
		zone: 1,
		center_id: 1,
		elevation: 1,
		ERC_threshold: 1,
		manual: 1,
		manual_expires: 1,
		rawsObject: 1,
		cured: 1,		
	})
	.limit()
	.lean()
} 
// const buildMap = o => Object.keys(o).reduce((prev, curr) => {
// 	if (!o[curr].selected)
// 		return prev
// 	prev.set(curr, o[curr].RAWSname)
// 	return prev
// }, new Map())

const zonesArray = function(center_id) {

	const data = zonesQuery(center_id).then(res => {
		return res	
	})
	return data
} 

// zonesQuery.then(results => {
	// results.forEach(zone => {
	// 	const selected = Array.from(buildMap(zone.rawsObject).keys()) // array of selected RAWS
	// 	let days = 3
	// 	const periodicAverages = ercArray.map(x => {
	// 		let n = selected.length
	// 		var result = selected.reduce((prev, curr) => {
	// 			const a = x.get(curr) ? parseInt(x.get(curr)) : (n -= 1, 0) // if missing a station reading:
	// 			// first decrement the n-counter to account for that missing station reading
	// 			// for that particular time period so that the average zone ERC calculation remains meaningful, 
	// 			// then coerce the absent raws station ERC reading to equal zero for calculation purposes
	// 			return prev += a
	// 		}, null) 
	// 		// console.log(result > 0)
	// 		// !(result > 0) && days -= 1 // account for a missing day's worth of RAWS data potentially
	// 		if (!(result > 0)) days -= 1 
	// 		return result / n 
	// 	})
	// 	zone.ERC = periodicAverages[0]
	// 	zone.ERC24 = periodicAverages[1]
	// 	zone.ERC48 = periodicAverages[2]

	// 	const ThreeDayAverage = (days > 0) 
	// 		? periodicAverages.reduce((prev, curr) => prev + curr, null) / days
	// 	 	: null
	// 	zone.ThreeDayAverage = ThreeDayAverage
		
	// 	const thresholdDiff = parseInt(ThreeDayAverage) - parseInt(zone.ERC_threshold) 
	// 	zone.thresholdDiff = thresholdDiff

	// 	const status = function(thresholdDiff) {
	// 		switch(true) {
	// 			case (thresholdDiff <= -11):
	// 				return 'notcritical'
	// 			case (-11 < thresholdDiff && thresholdDiff < 0):
	// 				return 'approachingcritical'
	// 			case (0 <= thresholdDiff):
	// 				return 'critical'
	// 			default:
	// 				return 'nodata'
	// 		}
	// 	}(thresholdDiff)
 //    zone.status = status
		
	// 	// const discard = [
	// 	// 	'manual',
	// 	// 	'manual_expires',
	// 	// ]
	// 	// discard.map(curr => delete zone[curr])
	// })
	// return results
// 	console.log(results)
// 	return results
// })

module.exports = zonesQuery