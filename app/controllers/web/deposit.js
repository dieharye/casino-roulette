module.exports = function ( config ) {
	var module = {};
	module.view = async function ( req, res ) {
		try {
			if ( req.session.user.id !== 0 ) {
				if ( true ) {
					res.render( 'frontend/deposit', {
						error: req.flash( "error" ),
						success: req.flash( "success" ),
						vErrors: req.flash( "vErrors" ),
						auth: req.session,
						config: config,
						alias: 'deposit',
						userDetail: [],
						historyList: [],
						adminKiSetting: []
					} );
				}
			} else {
				req.flash( 'error', "Please login." );
				res.redirect( '/login' );
			}
		} catch ( error ) {
			console.log( "deposit page loading error: ", error );
			res.redirect( '/' );
		}
	};
	return module;
};

