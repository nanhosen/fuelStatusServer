const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statusSchema = new Schema(
  {
    zone: { type: String, uppercase: true },
    center_id: { type: String, uppercase: true },
    elevation: { type: String, lowercase: true, default: null },
    remarks: String,
    updated: { type: Date, default: Date.now },
    cured: { type: Boolean, default: false },
    ERC_threshold: Number,
    manual: { type: String, default: 'not set' },
    manual_expires: { type: Date, default: null },
    justification: String,
    rawsObject: {},
  }, 
  { collection: 'status' },
  { runSettersOnQuery: true },
)

statusSchema.pre('save', function(next) { 
 	const status = this 
  next()
})

// statusSchema.methods.comparePassword = function(candidatePassword, callback) {
// }
const Status = mongoose.model('status', statusSchema)

module.exports = Status