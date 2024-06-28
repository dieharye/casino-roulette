module.exports = function ( app ) {
	app.use( function ( req, res, next ) {
		let fs = require( 'fs' );

		res.writeHead( 404, { 'Content-Type': 'text/html' } );
		fs.readFile( './app/views/error/404.html', null, function ( error, data ) {
			if ( error ) {
				res.write( 'Hello' );
			} else {
				res.write( data );
			}
			res.end();
		} );
	} );
};