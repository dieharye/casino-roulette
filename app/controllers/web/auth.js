module.exports = function ( config ) {
	var module = {};
	module.login = async function ( req, res ) {
		try {
			console.log( 'walletID -->', req.body.walletId );
			if ( true ) {
				console.log( 'New register......' );
				return res.send( JSON.stringify( { "status": 'success', 'message': 'Login successfully' } ) );
			}
		} catch ( error ) {
			console.log( error );
			return res.send( JSON.stringify( { "status": 'fail', 'message': 'Something is wrong try again.' } ) );
		}
	};

	module.logout = async function ( req, res ) {
		delete req.session.user;
		req.flash( 'success', "Logout successfully" );
		res.redirect( '/' );
	};
	return module;
};