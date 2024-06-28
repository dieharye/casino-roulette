module.exports = function () {
	var module = {};

	module.login = function ( req, res, next ) {
		// next()
		if ( req.session.admin ) {
			next();
		} else {
			req.flash( 'error', "Please log in to Play" );
			res.redirect( '/backend' );
		}
	};

	module.isLogin = function ( req, res, next ) {
		if ( req.session.admin ) {
			res.redirect( '/backend/dashboard' );
		} else {
			next();
		}
	};
	return module;
};