const Status = require('../models/status')

const getStatus = Status.find({
		updated:  { $gt: (Date.now() - 365*86400000) } 
	})
	.select({
		_id: 0,
    updated: 1,
    zone: 1,
    center_id: 1,
 		elevation: 1,
		cured: 1,
    ERC_threshold: 1,
    manual: 1,
    manual_expires: 1,
    justification: 1,
    remarks: 1,
	})
	.sort({ 'updated': -1 })

exports.statusQuery = getStatus

exports.statusArray = function() {
	return getStatus.then(results => results).catch(err => console.log(err))
}


