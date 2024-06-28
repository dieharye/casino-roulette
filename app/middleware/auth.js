module.exports = function () {
	var module = {};

	module.login = function ( req, res, next ) {
		if ( req.session.user ) {
			// req.session.user = userDetail;
			next();
		} else {
			req.flash( 'error', "Please log in to Play" );
			res.redirect( '/' );
		}
	};

	module.isLogin = async function ( req, res, next ) {
		if ( req.session.user ) {
			req.flash( 'error', "You have already login." );
			res.redirect( '/' );
		} else {
			next();
		}
	};

	return module;
};    