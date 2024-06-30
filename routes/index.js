module.exports = function ( app, controllers ) {
	//This route is for administrator
	require( './admin.js' )( app, controllers.admin );
	//This route is for client
	require( './web.js' )( app, controllers.web );
};	