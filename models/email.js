const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emailSchema = new Schema({
	ID: String,
	email: { type: String, lowercase: true }, 
 	firstname: String,
  lastname: String,
  notify: Boolean,
}, { collection: 'emails' })


emailSchema.pre('save', function(next) { 
 	const email = this 

 	next()
})

const Email = mongoose.model('email', emailSchema)

module.exports = Email
