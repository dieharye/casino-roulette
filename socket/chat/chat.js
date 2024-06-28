var striptags = require( 'striptags' );

module.exports = function () {
	var module = {};

	module.getMessages = async function ( callback ) {
		try {
			callback( { 'status': 'fail', 'message': 'Chat not available' } );
		} catch ( error ) {
			callback( { 'status': 'fail', 'message': 'Chat not available' } );
		}
	};

	module.chatMessageSave = async function ( data, callback ) {
		try {
			callback( { 'status': 'fail', 'message': 'Chat not available' } );
		} catch ( error ) {
			callback( { 'status': 'fail', 'message': 'Chat not available' } );
		}

	};
	return module;
};