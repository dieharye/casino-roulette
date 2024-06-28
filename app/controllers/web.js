module.exports = function () {
	var module = {};
	const config = require( '../../config/constants.js' );
	module.auth = require( './web/auth' )( config );
	module.roulette = require( './web/roulette' )( config );
	module.profile = require( './web/profile' )( config );
	module.deposit = require( './web/deposit' )( config );
	module.withdraw = require( './web/withdraw' )( config );
	return module;
};
