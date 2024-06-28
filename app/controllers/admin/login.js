module.exports = function ( config ) {
	var module = {};
	module.signin = function ( request, response ) {
		var emailId = "";
		var password = "";
		if ( request.cookies.admin_login_detail != null && request.cookies.admin_login_detail != undefined ) {
			var emailId = request.cookies.admin_login_detail.email_id;
			var password = request.cookies.admin_login_detail.password;
		}
		return response.render( 'backend/auth/login', {
			error: request.flash( "error" ),
			success: request.flash( "success" ),
			vErrors: request.flash( "vErrors" ),
			session: request.session,
			config: config,
			emailId: emailId,
			password: password,
		} );
	};

	module.signinCheck = async function ( request, response ) {
		try {
			response.clearCookie( 'admin_login_detail' );
		} catch ( err ) {
			request.flash( 'error', "Email-id or password invalid" );
			return response.redirect( '/backend' );
		}
	};

	module.logout = function ( request, response ) {
		delete request.session.admin;
		request.flash( 'success', "Logout successfully" );
		return response.redirect( '/backend' );
	};
	return module;
};