const http = require('http')
const https = require('https')
const url = require('url')
const path = require('path')
const fs = require('fs')
const port = process.env.PORT || 3090
// const options = {
// 	key: fs.readFileSync('../certs/server-key.pem'),
// 	cert: fs.readFileSync('../certs/server-crt.pem'),
// }

// main starting point for our application
const compression = require('compression')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan') // logging framework to log incoming http requests to our app
const app = express()
app.use(compression())
const router = require('./router')
const mongoose = require('mongoose').set('debug', false)
const cors = require('cors')
const config = require('./config')
const Center = require('./models/centers')
const ZoneInfo = require('./models/zoneinfo')
const Status = require('./models/status')

// cron
const rawsData = require('./cron/rawsData')
const genErcData = require('./cron/genErcData')
const genData = require('./cron/genErcData')
const CronJob = require('cron').CronJob
const xmlJob = new CronJob({cronTime: '* * 7,23 * * 0-6', onTick: rawsData, start: false, timeZone: 'America/Boise'}) 
const ercJob = new CronJob({cronTime: '* * 8,24 * * 0-6', onTick: genErcData, start: false, timeZone: 'America/Boise'})
// xmlJob.start()
// ercJob.start()
genErcData()
// var x = genErcData()
// console.log(x)
genErcData(__dirname)
console.log(`hello from the new path: ${__dirname}`)
// DB Setup
// const dbConnection = mongoose.connect(config.getDbConnectionString(), {
// 	useMongoClient: true,
// })
// dbConnection.catch(err => console.log(err))
const loginInfo = config.credentials()
const { username, password } = loginInfo

mongoose.connect('mongodb+srv://' + username + ':' + password + '@fuels.5zmxx.mongodb.net/fuels?retryWrites=true&w=majority', err => {	
	if (err) throw err

	// var newZone = new ZoneInfo({
	// 	zone: 'Test', 
	// })

	// newZone.save(err => {
	// 	if (err) throw err
	// 	console.log('Zone Created')
	// })

	// ZoneInfo.find({}, function(err, zones) {
	//   if (err) throw err
	//   console.log(zones)
	// })

	// const o = { out : {inline: 1} }
	// const o = {}
	// o.map = function() { 
	// 	emit(this.zone, 1)
	// }
	// o.reduce = function(keys, vals) {
	// 	return 
	// }
	// ZoneInfo.mapReduce(o, function(err, results) {
	// 	if (err) throw err
	// 	return results
	// }).then(results => console.log(results.map(result => result['_id'])))

})
// mongoose.connect('mongodb://laterdude:!QAZxsw23edc@ds117311.mlab.com:17311/authentication')

// ercThresholdCalc.then(res => console.log(res))
// console.log(ercThresholdCalc)
// ercThresholdCalc()
// App Setup
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({ type: '*/*' })) // force any incoming request to be parsed as json
router(app)

// Server setup
// const server = https.createServer(options, app) 
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on: ', port)
