module.exports = function ( config ) {
	var module = {};
	module.view = async function ( req, res ) {
		res.render( 'backend/dashboard', {
			error: req.flash( "error" ),
			success: req.flash( "success" ),
			vErrors: req.flash( "vErrors" ),
			auth: req.session,
			config: config,
			alias: 'dashboard',
			totalUser: 0,
			data: 0,
			totalUsrEarning: 0
		} );
	};
	return module;
};