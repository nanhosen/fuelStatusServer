const rawsAll = require('../cron/json/allData')
const raws24 = require('../cron/json/24Data')
const raws48 = require('../cron/json/48Data')

// const extractERC = arr => arr.reduce((prev, curr, j) => {
// 	const rawsErc = {}
// 	rawsErc[curr['sta_id'][0]] = curr['ec'][0]
// 	prev.push(rawsErc)
// 	return prev
// }, [])

const extractERC = arr => arr.reduce((prev, curr) => {
	// prev[curr['sta_id'][0]] = curr['ec'][0]
	// prev.set(parseInt(curr['sta_id'][0]), parseInt(curr['ec'][0]))

	// prev.set("stnName", curr["sta_nm"][0])
	// prev.set("lat", curr["latitude"][0])
	// prev.set("lon", curr["longitude"][0])
	// prev.set("date", curr["nfdr_dt"][0])

	prev.set(curr['sta_id'][0], curr['ec'][0])
	return prev
}, new Map())

const ercArray = [ 
	rawsAll['nfdrs']['row'],
	raws24['nfdrs']['row'],
	raws48['nfdrs']['row'],
].map(arr => extractERC(arr))


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

module.exports = ercArray