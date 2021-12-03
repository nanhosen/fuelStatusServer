const mongoose = require('mongoose')
const Schema = mongoose.Schema


const zoneinfoSchema = new Schema(
	{ 
		zone: { type: String, uppercase: true }, 
		center_id: { type: String, uppercase: true },
		CWA: String,
		elevation: { type: String, lowercase: true, default: null },
		coords: String,
		rawsObject: {},
		cured: { type: Boolean, default: false },
		ERC_threshold: Number,
		manual: { type: String, default: 'not set' },
		manual_expires: { type: Date, default: null },
		updated: { type: Date, default: Date.now },
	}, 
	{ collection: 'zoneinfo' },
	{ runSettersOnQuery: true }
)

zoneinfoSchema.pre('save', function(next) { 
 	const zoneinfo = this // get access to the zoneinfo model
 	next()
})

// zoneinfoSchema.methods.comparePassword = function(candidatePassword, callback) {

// }

const ZoneInfo = mongoose.model('zoneinfo', zoneinfoSchema)

module.exports = ZoneInfo



