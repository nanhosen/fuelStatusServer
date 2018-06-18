const fetch = require('node-fetch')
const fs = require('fs')
const xml2js = require('xml2js')


const urlArray = [
	'https://gacc.nifc.gov/gbcc/predictive/ERCMap/all_greatbasin_nfdrdate.xml',
	'https://gacc.nifc.gov/gbcc/predictive/ERCMap/all_greatbasin_nfdrdate24.xml',
	'https://gacc.nifc.gov/gbcc/predictive/ERCMap/all_greatbasin_nfdrdate48.xml',
]

const rawsData = () => {

	const xml0 = fs.createWriteStream(`./cron/xml/allData.xml`, {flags: 'w'})
	const xml1 = fs.createWriteStream(`./cron/xml/allData24.xml`, {flags: 'w'})
	const xml2 = fs.createWriteStream(`./cron/xml/allData48.xml`, {flags: 'w'})

	const dest0 = fs.createWriteStream(`./cron/json/allData.json`, {flags: 'w'})
	const dest1 = fs.createWriteStream(`./cron/json/24Data.json`, {flags: 'w'})
	const dest2 = fs.createWriteStream(`./cron/json/48Data.json`, {flags: 'w'})

	const xmlObj = {
		0: xml0,
		1: xml1,
		2: xml2,
		3: `./cron/xml/allData.xml`,
		4: `./cron/xml/allData24.xml`,
		5: `./cron/xml/allData48.xml`,
	}

	const destObj = {
		0: dest0,
		1: dest1,
		2: dest2,
	}
	return urlArray.map((url, i) => {
		fetch(url)
		.then(res => res.body.pipe(xmlObj[i]))
		.then(res => {
			res.on('finish', () => {
				fs.readFile(xmlObj[i + 3], (err, data) => {
					new xml2js.Parser().parseString(data, (err, result) => {
						err ? console.log(err) : destObj[i].write(JSON.stringify(result))
					})
				})
			})
		})
		.catch(err => console.log(err)) 
	})
}


module.exports = rawsData