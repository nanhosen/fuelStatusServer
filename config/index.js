var configValues = require('./config');

module.exports = {
	getDbConnectionString: function() {
		// return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds061415.mlab.com:61415/fuels'; //oroginal that works
		// return `mongodb+srv://${configValues.uname}:${configValues.pwd}>@fuels.5zmxx.mongodb.net/fuels?retryWrites=true&w=majority` //atlast test
		return `mongodb://${configValues.uname}:${configValues.pwd}>@fuels.5zmxx.mongodb.net/fuels` //atlast test
	},
	credentials: function(){
		return {username:configValues.uname, password: configValues.pwd }
	}
}