module.exports = function ( io, client ) {
	require( './comman/index.js' )( io, client );
	require( './chat/index.js' )( io, client );
	require( './roulette/index.js' )( io, client );
};
