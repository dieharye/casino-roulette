module.exports = function () {
	var module = {};
	module.login = function ( req, res, next ) {
		req.checkBody( 'name', 'Username is required' ).notEmpty();
		req.checkBody( 'password', 'Password is required' ).notEmpty();
		var errors = req.validationErrors();
		if ( errors ) {
			req.flash( 'vErrors', errors );
			res.redirect( '/' );
		} else {
			next();
		}
	};
	return module;
};