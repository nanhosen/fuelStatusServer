const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define our model
const userSchema = new Schema({ // define types, ie, js String type
	email: { type: String, unique: true, lowercase: true }, // mongoose uniqueness (!) checks account for upper/lowercase
	password: String
})

// On Save Hook, encrypt password
// Before saving model, run this function
userSchema.pre('save', function(next) { 
	// don't use arrow function, autobinding of "this" to the overall model file is happening instead of binding to the
	// specific instance of 'user' that we're doing the pre.save check on
 	const user = this // get access to the user model

	// generate a salt then run callback
	bcrypt.genSalt(10, function(err, salt) {
		if (err) { return next(err) }

		// hash (encrypt) our password using the salt
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) { return next(err) }

			// overwrite plain text password with encrypted password
			user.password = hash
			next()
		})
	})
})

// password verification method for logging in
userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) { return callback(err) }

		callback(null, isMatch)
	}) 
}
// Create the model class
const User = mongoose.model('user', userSchema)

// Export the model so that our application can utilize it
module.exports = User