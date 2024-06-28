module.exports = function ( config ) {
	var module = {};
	module.view = async function ( request, response ) {
		response.render( 'backend/setting', {
			title: 'Setting',
			error: request.flash( "error" ),
			success: request.flash( "success" ),
			vErrors: request.flash( "vErrors" ),
			auth: request.session,
			config: config,
			alias: 'setting',
			subAlias: 'setting',
			setting: []
		} );
	};
	return module;
};