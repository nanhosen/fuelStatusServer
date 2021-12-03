// const textract = require('textract')
// const UpdateZone = require('./controllers/updateZone')
// const Authentication = require('./controllers/authentication')
// const passportService = require('./services/passport')
// const passport = require('passport')
// // create middleware/route-interceptor of sorts
// const requireAuth = passport.authenticate('jwt', { session: false }) // session: false means 'no cookies'
// const requireSignin = passport.authenticate('local', { session: false }) // route middleware

// const ercDataArchive = require('./archive/ercDataArchive')
// const genErcData = require('./cron/genErcData')

// // const zonesQuery = require('./queries/zones')
// // const Status = require('./models/status')
// const Status = require('./queries/status')

// module.exports = app => {
// 	// app.locals.ercDataArchive = ercDataArchive
// 	app.get('/data', function(req, res, next) {
// 		const options = {
// 	    root: __dirname + '/',
// 	    // dotfiles: 'deny',
// 	    lastModified: true,
// 	    headers: {
//         'x-timestamp': Date.now(),
//         'x-sent': true,
// 	    }
// 	  }
// 	  res.sendFile('./archive/ercDataArchive.json', options, function (err) {
// 	    if (err) {
// 	      next(err);
// 	    } 
// 	    return
// 	  })	  
// 		// async function respond() {
// 		// 	try {
// 		// 		const jsonData = await genErcData()
// 		// 		// console.log("az105", jsonData["AZ105"])
// 		// 		res.send({ jsonData })
// 		// 	}
// 		// 	catch (error) {
// 		// 		console.log(error)
// 		// 	}
// 		// }
// 		// respond()		
// 		// res.send(ercDataArchive)
// 	})
// 	app.get('/', requireAuth, function(req, res) {
// 		res.send({ "message": "this is a secret code" })
// 		// res.send(app.locals.ercDataArchive)
// 	})
// 	// use route middleware requireSignin before proceeding to route
// 	app.post('/signin', requireSignin, Authentication.signin, function(req, res) {
// 		// res.send(zonesQuery(req.user.ID).then(response => response).catch(err => console.log(err)))
// 	}) 
// 	app.post('/signup', Authentication.signup)
// 	app.post('/client', requireAuth, function(req, res) {
// 		res.send({ "message": "this is a secret widget code" })
// 	})
// 	app.post('/update', requireAuth, 
// 		UpdateZone.updateZone
// 	// 	function(req, res) {
// 	// 		genErcData()
// 	// 		res.send({ "message": "update successful" })		
// 	// 	}
// 	)
// 	app.get('/status', function(req, res) {
// 		// const statusQuery = Status
// 		// 	.find({
// 		// 		updated:  { $gt: (Date.now() - 365*86400000) } 
// 		// 	})
// 		// 	.sort({ 'updated': -1 })

// 		Status.statusQuery.then(response => {
// 			res.set({
// 		    lastModified: true,
// 		    headers: {
// 	        'x-timestamp': Date.now(),
// 	        'x-sent': true,
// 		    }
// 	  	})
// 			res.send(response)
// 		})		
// 	})

// 	app.get('/rating', function(req, res) {
// 		const rating = () => {
// 			const url = 'https://gacc.nifc.gov/gbcc/dispatch/ut-cdc/cdcmain.html';
// 			textract.fromUrl(url, function( error, text ) {
// 				const textArray = text.split(" ");
// 				const pos = textArray.indexOf("Plateau");
// 				const plateau = textArray[pos];
// 				const ratingPosition = (pos + 5);
// 				// const adjRating = textArray[ratingPosition];
// 				const adjRating = "Low"

// 				console.log('adjrating: ' + adjRating)
// 				res.send(JSON.stringify(adjRating))
// 				// return adjrating;

// 				// fs.writeFile(`./archive/rating.json`, JSON.stringify(adjRating), err => {
// 				// 	if (err) {
// 				// 		return console.log(err)
// 				// 	}
// 				// 	console.log("file saved")
// 				// })
// 			})
// 		};
// 		rating();
// 	})
// }

const textract = require('textract')
const UpdateZone = require('./controllers/updateZone')
const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

// create middleware/route-interceptor of sorts
const requireAuth = passport.authenticate('jwt', { session: false }) // session: false means 'no cookies'
const requireSignin = passport.authenticate('local', { session: false }) // route middleware

const ercDataArchive = require('./archive/ercDataArchive')
const genErcData = require('./cron/genErcData')

// const zonesQuery = require('./queries/zones')
// const Status = require('./models/status')
const Status = require('./queries/status')

module.exports = app => {
	// app.locals.ercDataArchive = ercDataArchive
	app.get('/server/data', function(req, res, next) {
		const options = {
	    root: __dirname + '/',
	    // dotfiles: 'deny',
	    lastModified: true,
	    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
	    }
	  }
	  res.sendFile('./archive/ercDataArchive.json', options, function (err) {
	    if (err) {
	      next(err);
	    } 
	    return
	  })	  
		// async function respond() {
		// 	try {
		// 		const jsonData = await genErcData()
		// 		// console.log("az105", jsonData["AZ105"])
		// 		res.send({ jsonData })
		// 	}
		// 	catch (error) {
		// 		console.log(error)
		// 	}
		// }
		// respond()		
		// res.send(ercDataArchive)
	})
	app.get('/server/', requireAuth, function(req, res) {
		res.send({ "message": "this is a secret code" })
		// res.send(app.locals.ercDataArchive)
	})
	app.get('/server/day1', function(req, res, next) {
		const options = {
	    root: __dirname + '/',
	    // dotfiles: 'deny',
	    lastModified: true,
	    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
	    }
	  }
	  res.sendFile('./archive/day0.json', options, function (err) {
	    if (err) {
	      next(err);
	    } 
	    return
	  })	  
	})

	app.get('/server/day2', function(req, res, next) {
		const options = {
	    root: __dirname + '/',
	    // dotfiles: 'deny',
	    lastModified: true,
	    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
	    }
	  }
	  res.sendFile('./archive/day1.json', options, function (err) {
	    if (err) {
	      next(err);
	    } 
	    return
	  })	  
	})

	app.get('/server/day3', function(req, res, next) {
		const options = {
	    root: __dirname + '/',
	    // dotfiles: 'deny',
	    lastModified: true,
	    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
	    }
	  }
	  res.sendFile('./archive/day2.json', options, function (err) {
	    if (err) {
	      next(err);
	    } 
	    return
	  })	  
	})
	// use route middleware requireSignin before proceeding to route
	app.post('/server/signin', requireSignin, Authentication.signin, function(req, res) {
		// res.send(zonesQuery(req.user.ID).then(response => response).catch(err => console.log(err)))
	}) 
	app.post('/server/signup', Authentication.signup)
	app.post('/server/client', requireAuth, function(req, res) {
		res.send({ "message": "this is a secret widget code" })
	})
	app.post('/server/update', requireAuth, 
		UpdateZone.updateZone
	// 	function(req, res) {
	// 		genErcData()
	// 		res.send({ "message": "update successful" })		
	// 	}
	)
	app.get('/server/status', function(req, res) {
		// const statusQuery = Status
		// 	.find({
		// 		updated:  { $gt: (Date.now() - 365*86400000) } 
		// 	})
		// 	.sort({ 'updated': -1 })

		Status.statusQuery.then(response => {
			res.set({
		    lastModified: true,
		    headers: {
	        'x-timestamp': Date.now(),
	        'x-sent': true,
		    }
	  	})
			res.send(response)
		})		
	})


	app.get('/server/lightning/data/6h', function(req, res, next) {
		const options = {
	    root: __dirname + '/',
	    // dotfiles: 'deny',
	    lastModified: true,
	    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
	    }
	  }
	  res.sendFile('./lightning/data/6h_ltng.csv', options, function (err) {
	    if (err) {
	      next(err);
	    } 
	    return
	  })	  
	})

	app.get('/server/rating', function(req, res) {
		const rating = () => {
			const url = 'https://gacc.nifc.gov/gbcc/dispatch/ut-cdc/cdcmain.html';
			textract.fromUrl(url, function( error, text ) {
				if (error) {
					res.send(`There was an error retrieving the data`)
				}
				else {
					const textArray = text.split(" ");
					const pos = textArray.indexOf("Plateau"); //Turn this on for fire season
					// const pos = textArray.indexOf("Discontinued"); //comment out this line for fire season. Wanted to change to "low"
					const plateau = textArray[pos];
					const ratingPosition = (pos + 6);
					const adjRating = textArray[ratingPosition];
					

				  const reducerSwitch = {
				    "L": "Low",
				    "M": "Moderate",
				    "H": "High",
				    "VH": "Very High",
				    "E": "Extreme"
				  }

				  const AppReducers = (rate) => {
				    // console.log(reducerSwitch[rate])
				    return reducerSwitch[rate]
				  }
				  const rateDisplay = AppReducers(adjRating)
					 //turn this on for fire season
					// const adjRating = textArray[pos]; //comment out and use above line for fire season
					// const adjRating = "Low"; // turn this back on in the off season when they want it to say low

					console.log('rateDisplay: ' + rateDisplay)

					res.send(JSON.stringify(rateDisplay)) //use this for fire season
					// res.send(JSON.stringify("Low")) //this is for off season to make it say low
				}
			})
		};
		rating();
	})	
}