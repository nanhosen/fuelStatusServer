const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rawsSchema = new Schema({
	zone: String, 
	RAWSid: Number,
	RAWSname: String,
	selected: Boolean 
}, { collection: 'raws' })

rawsSchema.pre('save', function(next) { 
 	const raws = this 
 	next()
})

// rawsSchema.methods.comparePassword = function(candidatePassword, callback) {
// }
const Raws = mongoose.model('raws', rawsSchema)

// var newRaws = Raws({
// 	selected: true, 
// })

// newRaws.save(err => {
// 	if (err) throw err
// 	console.log('RAWS Created')
// })

module.exports = Raws