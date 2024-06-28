module.exports = function ( io, client ) {
	var chat = require( './chat' )();
	//START: Chat message insert into database
	client.on( 'chatMessageSave', function ( data, callback ) {
		chat.chatMessageSave( data, function ( response ) {
			if ( response.status = 'success' ) {
				io.emit( 'appentNewMessageAllUser', response, response.lastMessage );
			}
			callback( response );
		} );
	} );
	//END: Chat message insert into database

	//START: Chat messages getting
	client.on( 'getMessages', function ( callback ) {
		chat.getMessages( function ( response ) {
			callback( response );
		} );
	} );
	//END: Chat messages getting
};	