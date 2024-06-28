module.exports = function ( config ) {
	var module = {};
	module.view = async function ( req, res ) {
		try {
			if ( req.session.user.id ) {
				res.render( 'frontend/profile', {
					error: req.flash( "error" ),
					success: req.flash( "success" ),
					vErrors: req.flash( "vErrors" ),
					auth: req.session,
					config: config,
					alias: 'Profile',
					subAlias: 'profile',
					title: 'Profile',
					detail: [],
					setting: [],
				} );
			} else {
				req.flash( 'error', "Please log in to Play" );
				res.redirect( '/' );
			}
		} catch ( error ) {
			console.log( "Error when profile page view: ", error );
			res.redirect( '/' );
		}
	};
	return module;
};