var sha256 = require( 'js-sha256' ).sha256;
var converter = require( 'hex2dec' );
module.exports = function ( config ) {
	let gameStartCount = config.rouletteStartTime;
	var module = {};
	module.gameCount = async function ( callback ) {
		try {
			var gamaStartInterval = setInterval( function () {
				var gameCount = { "status": "fail" };
				clearInterval( gamaStartInterval );
				return callback( gameCount );
			}, 1000 );
		} catch ( error ) {
			console.log( "Error when game start count down start: ", error );
		}
	};

	module.gameCountDown = function ( gamaStartInterval, rouletteId, callback ) {
		if ( gameStartCount <= 0.0 ) {
			clearInterval( gamaStartInterval );
			gameStartCount = config.rouletteStartTime;
			return callback( { "status": "start" } );

		} else {
			let width = ( config.rouletteStartTime - gameStartCount ) / parseFloat( config.rouletteStartTime ) * 100;
			var response = { "status": "success", "count": gameStartCount, width: width };
			gameStartCount -= 1;
			return callback( response );
		}
	};

	module.rouletteLogic = async function ( callback ) {
		try {
			var gameNumber = helper.getNextIntNumber( new date() );
			let public_seed = helper.randomOnlyNumber( 10 );
			let server_seed = helper.randomString( 64 );
			var gameSecret = public_seed;
			var hashSalt = server_seed;
			var gameHash = sha256( gameSecret + "-" + hashSalt + "-" + gameNumber );
			var cases = getCase();
			cases = shuffle( cases );
			var dangerArray = [];
			var greyArray = [];
			var successArray = [];
			for ( var x = 0; x < cases.length; x++ ) {
				if ( cases[ x ][ 1 ] == 1 || cases[ x ][ 1 ] == 3 || cases[ x ][ 1 ] == 5 || cases[ x ][ 1 ] == 7 || cases[ x ][ 1 ] == 9 || cases[ x ][ 1 ] == 11 || cases[ x ][ 1 ] == 13 ) {
					dangerArray.push( cases[ x ] );
				} else if ( cases[ x ][ 1 ] == 2 || cases[ x ][ 1 ] == 4 || cases[ x ][ 1 ] == 6 || cases[ x ][ 1 ] == 8 || cases[ x ][ 1 ] == 10 || cases[ x ][ 1 ] == 12 || cases[ x ][ 1 ] == 14 ) {
					greyArray.push( cases[ x ] );
				} else if ( cases[ x ][ 1 ] == 0 ) {
					successArray.push( cases[ x ] );
				}
			}
			var arr3 = [];
			for ( var y = 0, len = dangerArray.length; y < len; y++ ) {
				if ( arr3.length == 74 ) {
					arr3[ 74 ] = successArray[ 0 ];
					y--;
				} else {
					arr3[ arr3.length ] = dangerArray[ y ];
				}
				if ( arr3.length == 74 ) {
					arr3[ 74 ] = successArray[ 0 ];
					y--;
				} else {
					arr3[ arr3.length ] = greyArray[ y ];
				}
			}
			cases = arr3;
			var hash1 = gameHash.substr( 0, 8 );
			var rolls = converter.hexToDec( hash1 );
			var roll = rolls % 15;
			var roll_colour = '';
			var wamt = '';
			if ( roll == 0 ) {
				roll_colour = 'green';
				wamt = config.WonGreenMultiplier;
			} else if ( roll == 1 || roll == 3 || roll == 5 || roll == 7 || roll == 9 || roll == 11 || roll == 13 ) {
				roll_colour = 'danger';
				wamt = config.WonDangerMultiplier;
			} else if ( roll == 2 || roll == 4 || roll == 6 || roll == 8 || roll == 10 || roll == 12 || roll == 14 ) {
				roll_colour = 'black';
				wamt = config.WonGreyMultiplier;
			}
			var checkamt = parseFloat( getrouletteDetail.bet_amount ) + parseFloat( getrouletteDetail.total_amt_carryforward );

			if ( true ) {
				var totalWinAmt = parseFloat( getStopColor[ 0 ].bet_amount ) * parseInt( wamt );
				if ( checkamt < totalWinAmt ) {
					if ( roll_colour == 'danger' ) {
						var myArray = [ "black", "green" ];
					} else if ( roll_colour == 'black' ) {
						var myArray = [ "danger", "green" ];
					} else if ( roll_colour == 'green' ) {
						var myArray = [ "danger", "black" ];
					}
					roll_colour = myArray[ Math.floor( Math.random() * myArray.length ) ];
				}
			}

			var winColor = [ roll_colour /* "green" */ ];
			var winColorClassObj = { "black": "dark-gradiant", "green": "success-gradiant", "danger": "danger-gradiant" };
			let rouletteStopPosition = Math.rand( 6190, 6270 );
			let winData = '';
			let minWonAmt = 0;

			if ( winColor.length ) {
				var winnerColor = winColor[ 0 ];
				if ( winnerColor == "green" ) {
					// rouletteStopPosition = Math.rand(/* 6570,6640 */ 6438,6448 );
					rouletteStopPosition = 6441;
					console.log( 'rouletteStopPosition -->', rouletteStopPosition );
					var replacenumber = cases[ 74 ];
					replacenumber[ replacenumber.indexOf( replacenumber[ 1 ] ) ] = roll.toString();
					replacenumber[ replacenumber.indexOf( replacenumber[ 0 ] ) ] = 'success-gradiant';
					winData = replacenumber;
					console.log( 'winData -->', winData );
					console.log( '-----------------------------------------' );
				} else if ( winnerColor == "black" ) {
					// rouletteStopPosition = Math.rand( /* 6100,6170 */ 5970,5980 );
					rouletteStopPosition = 5970;
					console.log( 'rouletteStopPosition -->', rouletteStopPosition );
					var replacenumber = cases[ 69 ];
					replacenumber[ replacenumber.indexOf( replacenumber[ 1 ] ) ] = roll.toString();
					replacenumber[ replacenumber.indexOf( replacenumber[ 0 ] ) ] = 'dark-gradiant';
					winData = replacenumber;
					console.log( 'winData -->', winData );
					console.log( '-------------------------------------------' );
				} else if ( winnerColor == "danger" ) {
					// rouletteStopPosition = Math.rand(/* 6190,6270 */ 6064,6074 );
					rouletteStopPosition = 6066;
					console.log( 'rouletteStopPosition -->', rouletteStopPosition );
					var replacenumber = cases[ 70 ];
					replacenumber[ replacenumber.indexOf( replacenumber[ 1 ] ) ] = roll.toString();
					replacenumber[ replacenumber.indexOf( replacenumber[ 0 ] ) ] = 'danger-gradiant';
					winData = replacenumber;
					console.log( 'winData -->', winData );
					console.log( '------------------------------------------' );
				}
				let winColorClass = winColorClassObj[ winnerColor ];
			}
			if ( winData[ 0 ] == 'danger-gradiant' ) {
				wonMultiplier = config.WonDangerMultiplier;
				gameStoppedOn = 'danger';
			} else if ( winData[ 0 ] == 'dark-gradiant' ) {
				wonMultiplier = config.WonGreyMultiplier;
				gameStoppedOn = 'black';
			} else if ( winData[ 0 ] == "success-gradiant" ) {
				gameStoppedOn = 'green';
				wonMultiplier = config.WonGreenMultiplier;
			}

			var rouletteResponse = {
				status: "success",
				cases: cases,
				rouletteRotateDuration: config.rouletteRotateDuration,
				stopPosition: rouletteStopPosition,
				winnerColor: winnerColor
			};
			io.emit( "rouletteGameStarted", rouletteResponse );

			setTimeout( async function () {
				return callback( { status: "success" } );
			}, config.rouletteRotateDuration + 3000 );

			return callback( { status: "started" } );
		} catch ( err ) {
			console.log( err );
		}
	};

	module.bettingStart = async function ( data, callback ) {
		try {
			var userId = data.user_id;
			var betAmount = data.bet_amount;
			var btn_clicks = data.btn_click;
			if ( userId < 0 ) {
				return callback( { 'status': 'fail', 'message': 'Please log in to Play' } );
			}
			if ( betAmount == "" ) {
				return callback( { 'status': 'fail', 'message': 'Please enter bet amount' } );
			}
			if ( isNaN( betAmount ) ) {
				return callback( { 'status': 'fail', 'message': 'Please enter valid bet amount' } );
			}
			if ( betAmount <= 0 ) {
				return callback( { 'status': 'fail', 'message': 'Please enter valid bet amount' } );
			}
			if ( parseInt( betAmount ) < parseInt( settingDetail.min_bet ) ) {
				return callback( { 'status': 'fail', 'message': 'Please enter minimum bet amount ' + settingDetail.min_bet } );
			}

			if ( parseInt( betAmount ) > parseInt( settingDetail.max_bet ) ) {
				return callback( { 'status': 'fail', 'message': 'Please enter Valid amount. Amount should not be greater than ' + settingDetail.max_bet } );
			}
			io.emit( "rouletteBalanceAfterBet", { main_balance: parseFloat( 0 ).toFixed( 2 ), user_id: 0 } );

			let wonMultiplier = 0;
			if ( btn_clicks == 'danger' ) {
				wonMultiplier = config.WonDangerMultiplier;
			} else if ( btn_clicks == 'grey' ) {
				wonMultiplier = config.WonGreyMultiplier;
			} else if ( btn_clicks == "green" ) {
				wonMultiplier = config.WonGreenMultiplier;
			}
			io.emit( "rouletteJoinedByUser", joinedUser );
			return callback( { 'status': 'success', 'message': 'Bet placed successfully' } );

		} catch ( error ) {
			console.log( "try catch", error );
			return callback( { 'status': 'fail', 'message': 'Game not available' } );
		}
	};

	module.muteUnmuteVolume = async function ( data, callback ) {
		try {
			console.log( "Error when insurance decline by user: ", error );
		} catch ( error ) {
		}
	};

	module.updateRouletteUser = async function ( data, callback ) {
		return callback( { status: "success", message: "Roulette user updated successfully" } );
	};

	return module;
};

function shuffle ( array ) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while ( 0 !== currentIndex ) {
		randomIndex = Math.floor( Math.random() * currentIndex );
		currentIndex -= 1;
		temporaryValue = array[ currentIndex ];
		array[ currentIndex ] = array[ randomIndex ];
		array[ randomIndex ] = temporaryValue;
	}
	return array;
}

Math.rand = function getRandomInt ( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
};

function getCase () {
	var cases = [
		[ "dark-gradiant", "8" ],
		[ "danger-gradiant", "3" ],
		[ "dark-gradiant", "12" ],
		[ "danger-gradiant", "1" ],
		[ "dark-gradiant", "2" ],
		[ "dark-gradiant", "10" ],
		[ "danger-gradiant", "5" ],
		[ "dark-gradiant", "10" ],
		[ "danger-gradiant", "7" ],
		[ "dark-gradiant", "6" ],
		[ "danger-gradiant", "7" ],
		[ "dark-gradiant", "8" ],
		[ "danger-gradiant", "1" ],
		[ "dark-gradiant", "14" ],
		[ "danger-gradiant", "11" ],
		[ "dark-gradiant", "10" ],
		[ "danger-gradiant", "3" ],
		[ "dark-gradiant", "12" ],
		[ "danger-gradiant", "13" ],
		[ "success-gradiant", "0" ],
		[ "dark-gradiant", "2" ],
		[ "danger-gradiant", "11" ],
		[ "dark-gradiant", "10" ],
		[ "danger-gradiant", "9" ],
		[ "dark-gradiant", "4" ],
		[ "danger-gradiant", "7" ],
		[ "dark-gradiant", "8" ],
		[ "danger-gradiant", "1" ],
		[ "dark-gradiant", "14" ],
		[ "danger-gradiant", "3" ],
		[ "dark-gradiant", "10" ],
		[ "danger-gradiant", "3" ],
		[ "dark-gradiant", "12" ],
		[ "danger-gradiant", "5" ],
		[ "success-gradiant", "0" ],
		[ "dark-gradiant", "4" ],
		[ "danger-gradiant", "5" ],
		[ "dark-gradiant", "10" ],
		[ "danger-gradiant", "9" ],
		[ "dark-gradiant", "8" ],
		[ "danger-gradiant", "7" ],
		[ "dark-gradiant", "8" ],
		[ "danger-gradiant", "1" ],
		[ "dark-gradiant", "14" ],
		[ "danger-gradiant", "7" ],
		[ "dark-gradiant", "2" ],
		[ "danger-gradiant", "3" ],
		[ "dark-gradiant", "12" ],
		[ "danger-gradiant", "1" ],
		[ "danger-gradiant", "3" ],
		[ "dark-gradiant", "14" ],
		[ "danger-gradiant", "5" ],
		[ "dark-gradiant", "10" ],
		[ "danger-gradiant", "9" ],
		[ "dark-gradiant", "6" ],
		[ "danger-gradiant", "7" ],
		[ "dark-gradiant", "8" ],
		[ "danger-gradiant", "1" ],
		[ "dark-gradiant", "14" ],
		[ "danger-gradiant", "11" ],
		[ "dark-gradiant", "14" ],
		[ "danger-gradiant", "13" ],
		[ "dark-gradiant", "12" ],
		[ "danger-gradiant", "3" ],
		[ "dark-gradiant", "12" ],
		[ "dark-gradiant", "2" ],
		[ "danger-gradiant", "7" ],
		[ "dark-gradiant", "10" ],
		[ "danger-gradiant", "5" ],
		[ "dark-gradiant", "6" ],
		[ "danger-gradiant", "7" ],
		[ "dark-gradiant", "8" ],
		[ "danger-gradiant", "1" ],
		[ "dark-gradiant", "14" ],
		[ "danger-gradiant", "9" ],
		[ "dark-gradiant", "2" ],
		[ "danger-gradiant", "7" ],
		[ "dark-gradiant", "12" ],
		[ "danger-gradiant", "3" ],
		[ "dark-gradiant", "14" ],
		[ "dark-gradiant", "8" ],
		[ "dark-gradiant", "10" ],
		[ "dark-gradiant", "12" ],
		[ "dark-gradiant", "2" ],
		[ "dark-gradiant", "8" ],
		[ "dark-gradiant", "6" ],
		[ "dark-gradiant", "8" ],
		[ "danger-gradiant", "1" ],
		[ "danger-gradiant", "3" ],
		[ "danger-gradiant", "5" ],
		[ "danger-gradiant", "7" ],
		[ "danger-gradiant", "9" ],
		[ "dark-gradiant", "14" ],
		[ "danger-gradiant", "11" ],
		[ "dark-gradiant", "4" ],
		[ "danger-gradiant", "13" ],
		[ "dark-gradiant", "8" ],
		[ "danger-gradiant", "3" ],
		[ "dark-gradiant", "2" ],
	];
	return cases;
}