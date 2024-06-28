module.exports = function ( config ) {
	var module = {};
	module.view = function ( request, response ) {
		response.render( 'backend/withdraw/list', {
			title: 'Withdraw List',
			error: request.flash( "error" ),
			success: request.flash( "success" ),
			vErrors: request.flash( "vErrors" ),
			auth: request.session,
			config: config,
			alias: 'withdraw',
			subAlias: 'list',
		} );
	};

	module.getWithdraw = async function ( request, response ) {
		var obj = {
			'draw': request.query.draw,
			'recordsTotal': 0,
			'recordsFiltered': 0,
			'data': []
		};
		return response.send( JSON.stringify( obj ) );
	};
	return module;
};