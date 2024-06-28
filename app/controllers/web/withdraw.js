module.exports = function ( config ) {
	var module = {};
	module.view = async function ( req, res ) {
		try {
			if ( req.session.user.id ) {
				req.flash( 'error', "Please login." );
				res.redirect( '/login' );
			}
		} catch ( error ) {
			res.redirect( '/' );
		}
	};
	return module;
};