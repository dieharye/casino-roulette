module.exports = function () {
	var module = {};
	module.admin = require( './admin' )();
	module.web = require( './web' )();
	return module;
};