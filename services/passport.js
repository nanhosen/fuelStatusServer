const passport = require('passport')
// const User = require('../models/user')
const Center = require('../models/centers')
const Password = require('../models/password')
const config = require('../configJWT')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

// // create local EMAIL strategy
// const localOptions = { 
// 	usernameField: 'email',
// } // need to specify the username manually beacuse we're using an email address to login,
// // bodyParser will automatically parse the rest of the request and find the user's password
// const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
// 	// verify this email (username) and password, call done with the user
// 	// if it is the correct email and password, if it is not, call 'done' with false
// 	User.findOne({ email: email }, function(err, user) {
// 		if (err) { return done(err) }
// 		if (!user) { return done(null, false) } // no user found

// 		// compare passwords - is 'password' === user.password ?
// 		user.comparePassword(password, function(err, isMatch) {
// 			if (err) { return done(err) }
// 			if (!isMatch) { return done(null, false) }

// 			return done(null, user) // done gives us access to req.user, use this in authentication controller
// 		}) 
// 	})
// })

// create local USERNAME strategy
// bodyParser will automatically parse the rest of the request and find the user's password
const localLogin = new LocalStrategy(function(username, password, done) {
	// verify this username and password, call done with the user
	// if it is the correct email and password, if it is not, call 'done' with false
	Center.findOne({ username: username }, function(err, user) {
		if (err) { return done(err) }
		if (!user) { return done(null, false) } // no user found
		console.log(user)
		// compare passwords - is 'password' === user.password ?
		user.comparePassword(password, function(err, isMatch) {
			if (err) { return done(err) }
			if (!isMatch) { return done(null, false) }

			return done(null, user) // done gives us access to req.user, use this in authentication controller
		}) 
	})
})



// Setup options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
}

// Create JWT strategy
// payload is decoded JWT token: jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
// done: callback function that is called after we've tried to authenticate the user
// const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
// 	// See if the user ID in the payload exists in our database
// 	// If it does, call 'done' with that User object
// 	// otherwise call 'done' without a User object (void) 
// 	User.findById(payload.sub, function(err, user) {
// 		if (err) { 
// 			return done(err, false) 
// 		} // search for user resulted in an error, no user found
// 		else if (user) {
// 			done(null, user) // no error in search, return user
// 		}
// 		else {
// 			done(null, false) // no error in search, but failed to find user
// 		}
// 	})
// })

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// See if the user ID in the payload exists in our database
	// If it does, call 'done' with that User object
	// otherwise call 'done' without a User object (void) 
	Center.findById(payload.sub, function(err, user) {
		if (err) { 
			return done(err, false) 
		} // search for user resulted in an error, no user found
		else if (user) {
			done(null, user) // no error in search, return user
		}
		else {
			done(null, false) // no error in search, but failed to find user
		}
	})
})


// Tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)