module.exports = function ( config ) {
	var module = {};
	module.view = function ( request, response ) {
		response.render( 'backend/cms/cms', {
			title: 'CMS List',
			error: request.flash( "error" ),
			success: request.flash( "success" ),
			vErrors: request.flash( "vErrors" ),
			auth: request.session,
			config: config,
			alias: 'cms',
			subAlias: 'list',
		} );
	};

	module.getCms = async function ( request, response ) {
		var obj = {
			'draw': request.query.draw,
			'recordsTotal': 0,
			'recordsFiltered': 0,
			'data': null
		};
		return response.send( JSON.stringify( obj ) );
	};
	return module;
};