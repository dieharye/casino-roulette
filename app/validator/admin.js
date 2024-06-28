module.exports = function () {
	var module = {};
	//Start: Validation for login
	module.login = function ( req, res, next ) {
		req.checkBody( 'email', 'Email address is required' ).notEmpty();
		req.checkBody( 'password', 'Password is required' ).notEmpty();
		req.checkBody( 'email', 'Please enter valid email-id' ).isEmail();
		var errors = req.validationErrors();
		if ( errors ) {
			req.flash( 'vErrors', errors );
			res.redirect( '/backend' );
		} else {
			next();
		}
	};
	//End: Validation for login

	//Start: Validation for user add and edit
	module.user = function ( req, res, next ) {
		req.checkBody( 'name', 'Name is required' ).notEmpty();
		var errors = req.validationErrors();
		if ( errors ) {
			req.flash( 'vErrors', errors );
			if ( req.params.id ) {
				res.redirect( '/backend/user/edit/' + req.params.id );
			} else {
				res.redirect( '/backend/user/add' );
			}
		} else {
			next();
		}
	};
	//End: Validation for user add and edit

	//Start: Validation for cms add and edit
	module.cms = function ( req, res, next ) {
		req.checkBody( 'title', 'Package name is required' ).notEmpty();
		// req.checkBody('meta_tag', 'Description is required').notEmpty();
		// req.checkBody('meta_title', 'Meta title is required').notEmpty();
		req.checkBody( 'description', 'Description is required' ).notEmpty();
		var errors = req.validationErrors();
		if ( errors ) {
			req.flash( 'vErrors', errors );
			if ( req.params.id ) {
				res.redirect( '/backend/cms/edit/' + req.params.id );
			} else {
				res.redirect( '/backend/cms/add' );
			}
		} else {
			next();
		}
	};
	//End: Validation for cms add and edit

	//Start: Validation for change password
	module.changePassword = async function ( req, res, next ) {
		req.checkBody( 'oldpassword', 'Old password is required' ).notEmpty();
		req.checkBody( 'newpassword', 'New password is required' ).notEmpty();
		req.checkBody( 'confirmpassword', 'Confirm password is required' ).notEmpty();

		var errors = req.validationErrors();
		if ( errors ) {
			req.flash( 'vErrors', errors );
			res.redirect( '/backend/changepassword' );
		} else {
			next();
		}
	};
	//End: Validation for change password

	return module;
};