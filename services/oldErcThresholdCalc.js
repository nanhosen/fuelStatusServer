const regularArray = require('../queries/regular')
const ZoneInfo = require('../models/zoneinfo')
const Raws = require('../models/raws')
const raws24 = require('../cron/json/24Data')
const raws48 = require('../cron/json/48Data')
const rawsAll = require('../cron/json/allData')
const extractor = require('./coGen')

// const extractERC = arr => arr.reduce((prev, curr, j) => {
// 	const rawsErc = {}
// 	rawsErc[curr['sta_id'][0]] = curr['ec'][0]
// 	prev.push(rawsErc)
// 	return prev
// }, [])

// const extractERC = arr => arr.reduce((prev, curr) => {
// 	// prev[curr['sta_id'][0]] = curr['ec'][0]
// 	// prev.set(parseInt(curr['sta_id'][0]), parseInt(curr['ec'][0]))
// 	prev.set(curr['sta_id'][0], curr['ec'][0])
// 	return prev
// }, new Map())

// const ercArray = [ 
// 	raws24['nfdrs']['row'],
// 	raws48['nfdrs']['row'],
// 	rawsAll['nfdrs']['row'],
// ].map(arr => extractERC(arr))

// const set24 = new Set([1, 2, 3, 4, 5])
// const set48 = new Set([3, 4, 5, 6, 7])
// const setAll = new Set([5, 6, 7, 8, 9])
// const set24 = new Set(ercArray[0].keys())
// const set48 = new Set(ercArray[1].keys())
// const setAll = new Set(ercArray[2].keys())

// const intersection = new Set([...set24].filter(x => set48.has(x)).filter(x => setAll.has(x)))
// const intersection = [...set24].filter(x => set48.has(x)).filter(x => setAll.has(x))
// console.log(intersection)
// const avgErcMap = intersection.reduce((prev, curr, j) => {
// 	const value = parseInt(ercArray[0].get(curr)) + parseInt(ercArray[1].get(curr)) + parseInt(ercArray[2].get(curr))
// 	prev.set(curr, (value / 3))
// 	return prev
// }, new Map())
// console.log(avgErcMap)

// const regularQuery = ZoneInfo
// 	.find({ cured: true })
// 	.where('manual').equals('not set')
// 	.select('zone rawsObject ERC_threshold')

// const manualQuery = ZoneInfo
// 	.find({ cured: true })
// 	.where('manual_expires').lt(Date.now())
// 	.select('zone manual')

// const regularQuery = ZoneInfo
// 	.find({
// 		cured: true,
// 		$or: [ 
// 			{ manual_expires: { $lt: Date.now() } },
// 			{ manual: { $eq: 'not set' } },
// 		],
// 	})
// 	.select({
// 		zone: 1,
// 		ERC_threshold: 1,
// 		manual: 1,
// 		manual_expires: 1,
// 		rawsObject: 1,
// 	})
// 	.limit(2)
// 	.lean()

// const manualQuery = ZoneInfo
// 	.find({
// 		cured: true,
// 		$and: [ 
// 			{ manual_expires: { $gt: Date.now() } },
// 			{ manual: { $ne: 'not set' } },
// 		],
// 	})
// 	.select({
// 		zone: 1,
// 		manual: 1,
// 		manual_expires: 1,
// 	})
// 	.lean()

// var dog = { '101812': { RAWSname: 'Horton Peak', selected: false },
//   '102903': { RAWSname: 'North Fork', selected: true },
//   '102906': { RAWSname: 'Ohio Gulch', selected: true } }
// var cat = { '102601': { RAWSname: 'Boise South', selected: false },
//   '102709': { RAWSname: 'Mountain Home', selected: true } } 

// const buildMap = o => Object.keys(o).reduce((prev, curr) => {
// 	if (!o[curr].selected)
// 		return prev
// 	prev.set(curr, o[curr].RAWSname)
// 	return prev
// }, new Map())

// var hello = [ '20109' ].reduce((prev, curr) => {
// 	console.log(prev)
// 	console.log(curr)
// }, 0)



// // console.log(ercArray[0].get('20109'))
// const regularArray = regularQuery.then(results => {
// 	results.forEach(zone => {
// 		const selected = Array.from(buildMap(zone.rawsObject).keys())

// 		const avg = []
// 		ercArray.map(x => {
// 			selected.reduce((prev, curr) => {
// 				curr
// 				const value = parseInt(x.get(prev)) + parseInt(x.get(curr))
// 				return avg.push(value / selected.length)
// 			}, '')
// 		})
// 		const avgZoneErc = avg.reduce((prev, curr) => prev + curr) / 3
// 		zone.status = zone.ERC_threshold > avgZoneErc
// 			? 'not critical' 
// 			: 'critical'
// 	})
// 	console.log(results)
// 	return results
// })

// var newRaws = Raws({
// 	selected: true, 
// })

// newRaws.save(err => {
// 	if (err) throw err
// 	console.log('RAWS Created')
// })

// var newZone = ZoneInfo({
// 	zone: 'RY999',
// 	cured: true,
// 	manual: 'borderline',
// 	manual_expires: Date.now() + 3*24*60*60000,
// 	ERC_threshold: 69, 
// })

// newZone.save(err => {
// 	if (err) throw err
// 	console.log('Zone Created')
// })

// const o = {}
// o.map = function() { 
// 	emit(this.zone, 1)
// }
// o.reduce = function(keys, values) {
// 	return 
// }

// const zoneArray = ZoneInfo.mapReduce(o, function(err, results) {
// 	if (err) throw err
// 	return results
// }).then(results => results.map(result => result))

// const p = {}
// p.query = { selected: true }
// p.map = function() {
// 	emit(this.RAWSid, this.zone)

// 	// if (this.status = true) {
// 	// 	emit(this.RAWSid, this.zone)
// 	// }

// 	// emit(this.zone, {
// 	// 	RAWSid: this.RAWSid,
// 	// 	RAWSname: this.RAWSname,
// 	// 	selected: this.selected
// 	// })
// }
// p.reduce = function(keys, values) {
// 	return 
// }

// const zoneRawsArray = Raws.mapReduce(p, function(err, results) {
// 	if (err) throw err
// 	return results
// }).then(results => console.log(results))

// const zoneRawsArray = Raws.mapReduce(p, function(err, results) {
// 	if (err) throw err
// 	return results
// }).then(results => results.reduce(function(prev, curr) {
//   if (curr.selected) { 
//     prev.push(curr)
//   }
//   return prev
// }, []))

// const zoneRawsArray = Raws.mapReduce(p, function(err, results) {
// 	if (err) throw err
// 	return results
// }).then(results => results.map(result => {
// 	return result
// }))

// module.exports = extractor(jsonArray)
// module.exports = intersection.size
// module.exports = zonesArray
// module.exports = regularQuery.then(res => console.log(res))
module.exports = regularArray