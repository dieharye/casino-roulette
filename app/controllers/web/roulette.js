module.exports = function ( config ) {
	var module = {};
	module.view = async function ( req, res ) {
		try {
			res.render( 'frontend/roulette', {
				error: req.flash( "error" ),
				success: req.flash( "success" ),
				vErrors: req.flash( "vErrors" ),
				auth: req.session,
				config: config,
				alias: 'game',
				subAlias: 'roulette',
				title: 'Roulette',
				rouletteData: [],
				setting: [],
			} );
		} catch ( error ) {
			req.flash( 'error', "Game under maintenance, please after some times." );
			res.redirect( '/' );
		}
	};
	return module;
};