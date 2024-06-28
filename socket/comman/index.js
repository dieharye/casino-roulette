var loginArrayCreate = [];
var nodemailer = require( 'nodemailer' );

module.exports = function ( io, client ) {
	client.on( 'updateUserId', async function ( data ) {
		if ( data == '0' ) {
			io.emit( 'count', logIndata );
		} else {
			var createSimpleArray = { userId: data, socket_id: client.id };
			var newuserAssingResult = loginArrayCreate.filter( ( item ) => item.userId !== createSimpleArray.userId );
			loginArrayCreate = newuserAssingResult;
			loginArrayCreate.push( createSimpleArray );
			var logIndata = {
				totalU: 1,
				loginUser: loginArrayCreate.length
			};
			io.emit( 'count', logIndata );
		}
	} );

	client.on( 'disconnect', async function () {
		var disConId = client.id;
		var newuserAssingResult = loginArrayCreate.filter( ( item ) => item.socket_id !== disConId );
		loginArrayCreate = newuserAssingResult;
		var logIndata = {
			totalU: 1,
			loginUser: loginArrayCreate.length
		};
		io.emit( 'count', logIndata );
	} );

	client.on( 'getSetting', async function ( callback ) {
	} );

	client.on( 'getcmsDetail', async function ( data, callback ) {
	} );

	client.on( 'supportmailSend', async function ( data, callback ) {
		try {
			var transporter = nodemailer.createTransport( {
				service: 'gmail',
				auth: {
					user: 'node@aistechnolabs.co.uk',
					pass: 'aisnode@44!22'
				}
			} );

			var mailOptions = {
				from: data.email,
				to: "roulette",
				subject: 'Casinc Roulette: Support',
				html: '<p>' + data.desc + '</p>'
			};

			var send = await transporter.sendMail( mailOptions );
			if ( send ) {
				return callback( { 'status': 'success', 'message': 'Ticket create successfully' } );
			} else {
				return callback( { 'status': 'fail', 'message': 'Ticket not create. Please try again.' } );
			}
		} catch ( err ) {
			console.log( err );
			return callback( { 'status': 'fail', 'message': 'something went wrong please try again' } );
		}
	} );

	client.on( 'muteUnmuteVolume', async function ( data, callback ) {
		try {
			var userId = data.user_id;
			var btnvL = data.btnvL;

			if ( userId != 0 && userId != undefined && userId != "" ) {
				return callback( { 'status': 'fail' } );
			}
		} catch ( error ) {
			return callback( { status: "fail", data: '' } );
		}
	} );

	client.on( 'chatRuleAccept', async function ( data, callback ) {
		try {
			var userId = data.userId;
			return callback( { 'status': 'fail' } );
		} catch ( error ) {
			return callback( { status: "fail", data: '' } );
		}
	} );

	client.on( 'getchatRuleAccept', async function ( data, callback ) {
		try {
			var userId = data.userId;
			return callback( { 'status': 'fail', data: '' } );
		} catch ( error ) {
			return callback( { status: "fail", data: '' } );
		}
	} );

	client.on( "changeClintSeed", async function ( data, callback ) {
		try {
			callback( { status: "error", message: "Something Went Wrong, Please  Refresh The Page." } );
		} catch ( error ) {
			console.log( 'error -->', error );
			callback( { status: "error", message: "Something Went Wrong, Please  Refresh The Page." } );
		}

	} );

	client.on( 'getclintorserverseedData', async function ( data, callback ) {
		callback( { status: "success", data: [] } );
	} );

	client.on( 'getProuvablyDetails', async function ( data, callback ) {
		return callback( { 'status': 'fail', 'message': ' Please all fild are require. ' } );
	} );

};	