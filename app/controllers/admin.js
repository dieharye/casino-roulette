module.exports = function () {
	var module = {};
	const config = require( '../../config/constants.js' );
	module.login = require( './admin/login' )( config );
	module.dashboard = require( './admin/dashboard' )( config );
	module.user = require( './admin/user' )( config );
	module.cms = require( './admin/cms' )( config );
	module.roulette = require( './admin/roulette' )( config );
	module.setting = require( './admin/setting' )( config );
	module.deposit = require( './admin/deposit' )( config );
	module.withdraw = require( './admin/withdraw' )( config );
	module.withdrawRequest = require( './admin/withdrawRequest' )( config );
	return module;
};
