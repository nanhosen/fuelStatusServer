const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define our model
const centersSchema = new Schema({ // define types, ie, js String type
	// email: { type: String, unique: true, lowercase: true }, // mongoose uniqueness (!) checks account for upper/lowercase
 	ID: String,
  username: String,
 	contactname: String,
  contactemail: { type: String, lowercase: true },
	password: String,
	password_updated: { type: Date, default: Date.now },
	resetPasswordToken: String,
	resetPasswordExpires: Date,
  backupname: String,
  backupemail: { type: String, lowercase: true },
  backup1name: String,
  backup1email: { type: String, lowercase: true },
  infoupdated: { type: Date, default: Date.now },
  threshold: Number,
  emailnotification: Boolean	 
}, { collection: 'centers' })

// On Save Hook, encrypt password
// Before saving model, run this function
centersSchema.pre('save', function(next) { 
	// don't use arrow function, autobinding of "this" to the overall model file is 
	// happening instead of binding to the specific instance
	// of 'centers' that we're doing the pre.save check on
 	const centers = this // get access to the centers model
 	
	// generate a salt then run callback
	bcrypt.genSalt(10, function(err, salt) {
		if (err) { return next(err) }

		// hash (encrypt) our password using the salt
		bcrypt.hash(centers.password, salt, null, function(err, hash) {
			if (err) { return next(err) }

			// overwrite plain text password with encrypted password
			centers.password = hash
			next()
		})
	})
})

// password verification method for logging in
centersSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) { return callback(err); }

		callback(null, isMatch);
	}) 
}
// Create the model class
const centersModel = mongoose.model('centers', centersSchema);

// Export the model so that our application can utilize it
module.exports = centersModel