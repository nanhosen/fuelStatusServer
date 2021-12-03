const jwt = require('jwt-simple')
// const User = require('../models/user')
const Center = require('../models/centers')
const config = require('../configJWT')

const zonesQuery = require('../queries/zones')
 
const tokenForUser = user => {
	const timestamp = new Date().getTime()
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function(req, res, next) {
	zonesQuery(req.user.ID)
		.then(results => {
			// console.log(results[0])
			return res.send({ token: tokenForUser(req.user), center_id: req.user.ID, zones: results })
		})
		.catch(err => console.log(err))
	// User has already had their email and password auth'd
	// We just need to give them a token
	
	next()
}

exports.signup = function(req, res, next) {
	// pull off info from req.body object
	// const email = req.body.email
	const username = req.body.username
	const password = req.body.password

	// if (!email || !password) {
	// 	return res.status(422).send({ error: 'You must provide email and password' })
	// }
	if (!username || !password) {
		return res.status(422).send({ error: 'You must provide username and password' })
	}
	// // See if a user with the given email exists
	// User.findOne({ email: email }, (err, existingUser) => {
	// 	if (err) { return next(err) }

	// 	// If a user with email does exist, return an error
	// 	if (existingUser) {
	// 		return res.status(422).send({ error: 'Email is in use' })
	// 	}

	// 	// If a user with email does NOT exist, create and save user record
	// 	const user = new User({
	// 		email,
	// 		password
	// 	})

	// 	user.save(function(err) {
	// 		if (err) { return next(err) }

	// 		// Respond to request indicating the user was created
	// 		// when signing up or signing in, give a token in exchange for an id:
	// 		// 'User ID' + 'Our Secret String' = 'JSON Web Token'
	// 		// In the future, when a user makes an authenticated request they should include their JWT
	// 		// 'JSON Web Token' + 'Our Secret String' = 'User ID'
 // 			res.json({ token: tokenForUser(user), email: user.email })
	// 	})
	// })
	// See if a user with the given email exists
	Center.findOne({ username: username }, (err, existingUser) => {
		if (err) { return next(err) }

		// If a user with username does exist, return an error
		if (existingUser) {
			return res.status(422).send({ error: 'username is in use' })
		}

		// If a user with username does NOT exist, create and save user record
		const user = new Center({
			username,
			password
		})

		user.save(function(err) {
			if (err) { return next(err) }

			// Respond to request indicating the user was created
			// when signing up or signing in, give a token in exchange for an id:
			// 'User ID' + 'Our Secret String' = 'JSON Web Token'
			// In the future, when a user makes an authenticated request they should include their JWT
			// 'JSON Web Token' + 'Our Secret String' = 'User ID'
 			res.json({ token: tokenForUser(user), username: user.username })
		})
	})
}