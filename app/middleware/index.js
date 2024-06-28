module.exports = function () {
	var module = {};
	module.auth = require( './auth' )();
	module.admin = require( './admin' )();
	return module;
};