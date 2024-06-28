var winston = require( 'winston' );
require( 'winston-daily-rotate-file' );

var transport = new ( winston.transports.DailyRotateFile )( {
	filename: 'log/roullete-%DATE%.log',
	datePattern: 'YYYY-MM-DD'
} );

global.logger = winston.createLogger( {
	level: 'error',
	format: winston.format.json(),
	transports: [ transport ]
} );
