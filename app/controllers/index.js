module.exports = function () {
	var module = {};
	module.admin = require( './admin.js' )();
	module.web = require( './web.js' )();
	return module;
};	