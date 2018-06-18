const rawsAll = require('../cron/json/allData')


const rawsArray = [rawsAll['nfdrs']['row']];



const extractDate = arr => arr.reduce((prev, curr) => {
	prev.set(curr['sta_id'][0], curr['nfdr_dt'][0])
	return prev
}, new Map()) 

const rawsArrayMap = rawsArray.map( arr => extractDate(arr));

const idArray = Array.from(rawsArrayMap[0].keys());
const firstID = idArray[0];

const dateArray = [ 
	rawsAll['nfdrs']['row']
].map(arr => extractDate(arr))

const oneDate = dateArray[0].get(firstID);




module.exports = oneDate