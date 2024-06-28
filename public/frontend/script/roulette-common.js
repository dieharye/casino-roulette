socket.on( "rouletteStartCountDown", function ( response ) {
  var timer = response.count;
  // console.log('timer -->', timer);
  if ( timer <= 9 ) {
    timer = '0' + timer;
  }
  $( "#minutes" ).html( timer );
  var milisecond = 10;
  var widthSet = response.width;
  var myInterval = setInterval( function () {
    if ( milisecond <= 9 ) {
      milisecond = '0' + milisecond;
    }
    $( "#seconds" ).html( milisecond );
    milisecond -= 1;
    widthSet += 1;
    if ( milisecond == 0 ) {
      clearInterval( myInterval );
    }
    $( ".timer_line" ).css( "width", widthSet + "%" );
  }, 100 /* 100 */ );
} );

console.log( 'userId -->', userId );
socket.emit( 'getclintorserverseedData', userId, function ( response ) {
  $( '.clintseed' ).val( response.data.client_seed );
  $( '.serverseed' ).val( response.data.server_seed );
  $( '.nonce' ).val( response.data.nonce );
} );

$( window ).focus( () => {
  // console.log('---> on change tab load page');
  window.location.reload();
} );


var cases = [
  [ "dark-gradiant", "14" ],
  [ "danger-gradiant", "3" ],
  [ "dark-gradiant", "12" ],
  [ "danger-gradiant", "1" ],
  [ "dark-gradiant", "12" ],
  [ "danger-gradiant", "5" ],
  [ "dark-gradiant", "10" ],
  [ "danger-gradiant", "7" ],
  [ "dark-gradiant", "8" ],
  [ "success-gradiant", "0" ],
  [ "danger-gradiant", "9" ],
  [ "dark-gradiant", "8" ],
  [ "danger-gradiant", "11" ],
  [ "dark-gradiant", "14" ],
  [ "danger-gradiant", "1" ],
  [ "dark-gradiant", "10" ],
  [ "danger-gradiant", "13" ],
  [ "dark-gradiant", "12" ],
  [ "danger-gradiant", "11" ],
  [ "success-gradiant", "0" ],
  [ "dark-gradiant", "2" ],
  [ "danger-gradiant", "5" ],
  [ "dark-gradiant", "10" ],
  [ "danger-gradiant", "3" ],
  [ "dark-gradiant", "4" ],
  [ "danger-gradiant", "7" ],
  [ "dark-gradiant", "8" ],
  [ "danger-gradiant", "1" ],
  [ "dark-gradiant", "14" ],
  [ "danger-gradiant", "3" ],
  [ "dark-gradiant", "6" ],
  [ "danger-gradiant", "13" ],
  [ "dark-gradiant", "12" ],
  [ "danger-gradiant", "11" ],
  [ "success-gradiant", "0" ],
  [ "dark-gradiant", "8" ],
  [ "danger-gradiant", "5" ],
  [ "dark-gradiant", "10" ],
  [ "danger-gradiant", "7" ],
  [ "dark-gradiant", "4" ],
  [ "danger-gradiant", "9" ],
  [ "dark-gradiant", "8" ],
  [ "danger-gradiant", "1" ],
  [ "dark-gradiant", "14" ],
  [ "danger-gradiant", "11" ],
  [ "dark-gradiant", "10" ],
  [ "danger-gradiant", "3" ],
  [ "dark-gradiant", "12" ],
  [ "danger-gradiant", "1" ],
  [ "success-gradiant", "0" ],
  [ "dark-gradiant", "2" ],
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
  [ "danger-gradiant", "9" ],
  [ "success-gradiant", "0" ],
  [ "dark-gradiant", "4" ],
  [ "danger-gradiant", "5" ],
  [ "dark-gradiant", "10" ],
  [ "danger-gradiant", "7" ],
  [ "dark-gradiant", "6" ],
  [ "danger-gradiant", "7" ],
  [ "dark-gradiant", "8" ],
  [ "danger-gradiant", "1" ],
  [ "dark-gradiant", "14" ],
  [ "danger-gradiant", "9" ],
  [ "dark-gradiant", "6" ],
  [ "danger-gradiant", "7" ],
  [ "dark-gradiant", "12" ],
  [ "danger-gradiant", "3" ],
  [ "dark-gradiant", "4" ],
  [ "dark-gradiant", "14" ],
  [ "danger-gradiant", "3" ],
  [ "dark-gradiant", "8" ],
  [ "danger-gradiant", "7" ],
  [ "dark-gradiant", "12" ],
  [ "danger-gradiant", "13" ],
  [ "dark-gradiant", "6" ],

];

function getName ( name ) {
  var arr = name.split( '|' );
  return ( arr.length == 1 ) ? name : arr[ 1 ];
}
Array.prototype.shuffle = function () {
  var o = this;
  for ( var j, x, i = o.length; i; j = Math.floor( Math.random() * i ), x = o[ --i ], o[ i ] = o[ j ], o[ j ] = x );
  return o;
};
Array.prototype.mul = function ( k ) {
  var res = [];
  for ( var i = 0; i < k; ++i ) res = res.concat( this.slice( 0 ) );
  return res;
};
Math.rand = function getRandomInt ( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
};
function getImage ( str, w, h ) {
  w = w || 384;
  h = h || 384;
  return str + '/' + w + 'fx' + h + 'f';
}
fillRoulette( cases );

function fillRoulette ( cases ) {
  var casesCarusel = $( '#casesCarusel' );
  var arr = cases;
  var el = '';
  arr.forEach( function ( item, i, arr ) {

    var displayname = item[ 1 ];
    var mar = 29;
    if ( item[ 0 ] == 'success-gradiant' ) {
      displayname = '<img src="/frontend/img/sign.png" style="height: 45px !important; width: 35px !important;">';
      mar = 22;
    }


    el += '<div class="itm ' + item[ 0 ] + '" style="height:85px; width:85px">' +
      '<div class="name" style="font-size: 20px;color: white;text-align: center;margin-top: ' + mar + 'px;" data-inventory-id=' + getName( item[ 1 ] ) + '>  ' + displayname + ' </div> </div>';
  } );

  casesCarusel.css( "margin-left", "0px" );
  casesCarusel.html( el );
}
var cnt = 0;
function fillCarusel ( cases, rotateDuration, stopPosition, winnerColor ) {
  cnt++;
  var DefaultWidth = 1600;

  var screenWidth = window.innerWidth;
  // console.log('screenWidth -->',screenWidth);
  // console.log('stopPosition -->', stopPosition);
  // console.log('winnerColor -->', winnerColor);

  if ( winnerColor == 'danger' ) {
    // console.log('---danger---');

    if ( screenWidth == DefaultWidth ) {
      // console.log('== 1 ==');
      stopPosition == stopPosition;
      // console.log(' stopPosition ==>', stopPosition);
      // console.log('-----------------------------------------');
    } else if ( 992 > screenWidth ) {
      // console.log('== 2 ==');
      var getDifWidth = DefaultWidth - screenWidth;
      // console.log('getDifWidth ==>', getDifWidth);
      var totalDifWidth = getDifWidth / 2;
      // console.log('totalDifWidth ==>', totalDifWidth);
      stopPosition = Math.abs( ( totalDifWidth + 6066 ) - 150 );
      // console.log('stopPosition ==>', stopPosition);
    } else if ( DefaultWidth < screenWidth ) {
      // console.log('== 3 ==');
      var getDifWidth = DefaultWidth - screenWidth;
      // console.log('getDifWidth ==>', getDifWidth);
      var totalDifWidth = getDifWidth / 2;
      // console.log('totalDifWidth ==>', totalDifWidth);
      stopPosition = Math.abs( totalDifWidth + 6066 );
      // console.log('stopPosition ==>', stopPosition);
      // console.log('-----------------------------------------');
    } else if ( DefaultWidth > screenWidth ) {
      // console.log('== 4 ==');
      var getDifWidth = DefaultWidth - screenWidth;
      // console.log('getDifWidth ==>', getDifWidth);
      var totalDifWidth = getDifWidth / 2;
      // console.log('totalDifWidth ==>', totalDifWidth);
      stopPosition = Math.abs( totalDifWidth + 6066 );
      // console.log("stopPosition ==>", stopPosition);
      // console.log('-----------------------------------------');
    }

  }

  if ( winnerColor == 'black' ) {
    // console.log('---black---');

    if ( screenWidth == DefaultWidth ) {
      // console.log('== 1 ==');
      stopPosition == stopPosition;
      // console.log(' stopPosition ==>', stopPosition);
      // console.log('-----------------------------------------');
    } else if ( 992 > screenWidth ) {
      // console.log('== 4 ==');
      var getDifWidth = DefaultWidth - screenWidth;
      // console.log('getDifWidth ==>', getDifWidth);
      var totalDifWidth = getDifWidth / 2;
      // console.log('totalDifWidth ==>', totalDifWidth);
      stopPosition = Math.abs( ( totalDifWidth + 5970 ) - 150 );
      // console.log('stopPosition ==>', stopPosition);
    } else if ( DefaultWidth < screenWidth ) {
      // console.log('== 3 ==');
      var getDifWidth = DefaultWidth - screenWidth;
      // console.log('getDifWidth ==>', getDifWidth);
      var totalDifWidth = getDifWidth / 2;
      // console.log('totalDifWidth ==>', totalDifWidth);
      stopPosition = Math.abs( totalDifWidth + 5970 );
      // console.log('stopPosition ==>', stopPosition);
      // console.log('-----------------------------------------');
    } else if ( DefaultWidth > screenWidth ) {
      // console.log('== 2 ==');
      var getDifWidth = DefaultWidth - screenWidth;
      // console.log('getDifWidth ==>', getDifWidth);
      var totalDifWidth = getDifWidth / 2;
      // console.log('totalDifWidth ==>', totalDifWidth);
      stopPosition = Math.abs( totalDifWidth + 5970 );
      // console.log("stopPosition ==>", stopPosition);
      // console.log('-----------------------------------------');
    }
  }

  if ( winnerColor == 'green' ) {
    // console.log('---green---');

    if ( screenWidth == DefaultWidth ) {
      // console.log('== 1 ==');
      stopPosition == stopPosition;
      // console.log(' stopPosition ==>', stopPosition);
      // console.log('-----------------------------------------');
    } else if ( 992 > screenWidth ) {
      // console.log('== 4 ==');
      var getDifWidth = DefaultWidth - screenWidth;
      // console.log('getDifWidth ==>', getDifWidth);
      var totalDifWidth = getDifWidth / 2;
      // console.log('totalDifWidth ==>', totalDifWidth);
      stopPosition = Math.abs( ( totalDifWidth + 6441 ) - 150 );
      // console.log('stopPosition ==>', stopPosition);
    } else if ( DefaultWidth < screenWidth ) {
      // console.log('== 3 ==');
      var getDifWidth = DefaultWidth - screenWidth;
      // console.log('getDifWidth ==>', getDifWidth);
      var totalDifWidth = getDifWidth / 2;
      // console.log('totalDifWidth ==>', totalDifWidth);
      stopPosition = Math.abs( totalDifWidth + 6441 );
      // console.log('stopPosition ==>', stopPosition);
      // console.log('-----------------------------------------');
    } else if ( DefaultWidth > screenWidth ) {
      // console.log('== 2 ==');
      var getDifWidth = DefaultWidth - screenWidth;
      // console.log('getDifWidth ==>', getDifWidth);
      var totalDifWidth = getDifWidth / 2;
      // console.log('totalDifWidth ==>', totalDifWidth);
      stopPosition = Math.abs( totalDifWidth + 6441 );
      /* console.log("stopPosition ==>", stopPosition);
      console.log('-----------------------------------------'); */
    }
  }


  var casesCarusel = $( '#casesCarusel' );
  var arr = cases;
  var el = '';
  arr.forEach( function ( item, i, arr ) {

    var displayname = item[ 1 ];
    var mar = 29;
    if ( item[ 0 ] == 'success-gradiant' ) {
      displayname = '<img src="/frontend/img/sign.png" style="height: 45px !important; width: 35px !important;">';
      mar = 22;
    }

    el += '<div class="itm ' + item[ 0 ] + '"style="height:85px; width:85px">' +
      '<div class="name" style="font-size: 20px;color: white;text-align: center;margin-top: ' + mar + 'px;" data-inventory-id=' + getName( item[ 1 ] ) + '>  ' + displayname + ' </div> </div>';
  } );
  casesCarusel.css( "margin-left", "0px" );
  casesCarusel.html( el );
  var winSound = new Audio( '/frontend/sound/win.aac' );
  var afterWinSound = new Audio( '/frontend/sound/afterWin.mp3' );

  setTimeout( function () {
    var btnCurrentVal = localStorage.getItem( 'muteFUn' );
    if ( btnCurrentVal == null ) {
      btnCurrentVal = 0;
    }
    if ( btnCurrentVal == '0' ) {
      afterWinSound.play();
    }
  }, 2000 );
  console.log( '----> ' + cnt, stopPosition, rotateDuration + '' );

  $( '#casesCarusel' ).animate( { marginLeft: -1 * stopPosition }, {

    start: function () {
      console.log( '--> start ' );
      $( ".three_tbl" ).css( { "opacity": "0.4", "pointer-events": "none" } );
    },
    complete: function () {
      openingCase = false;
      console.log( 'openingCase -->', openingCase );
      setTimeout( function () {
        fullname = $( "div.itm:nth-child(21)" ).find( ".name" ).html();
        console.log( 'fullname -->', fullname );
        console.log( '---------------------------------------' );
      }, 3000 );
      var btnCurrentVal = localStorage.getItem( 'muteFUn' );
      if ( btnCurrentVal == null ) {
        btnCurrentVal = 0;
      }

      if ( btnCurrentVal == '0' ) {
        winSound.play();
      }
    },

    duration: rotateDuration,

  } );

}
// End : carusel slider 

//START : Bet amount change
$( '#betAmounts' ).keyup( function ( event ) {
  if ( event.which == 46 && $( '#betAmounts' ).val().split( '.' ).length > '1' ) {
    event.preventDefault();
  }

  if ( event.which != 46 && ( event.which < 48 || event.which > 59 ) ) {
    event.preventDefault();
    if ( ( event.which == 46 ) && ( $( this ).indexOf( '.' ) != -1 ) ) {
      event.preventDefault();
    }
  }
  var betAmt = $( '#betAmounts' ).val();
} );

$( ".bet-button" ).on( "click", function () {
  amountMul( $( this ).data( "num" ) );
} );

function amountMul ( amountVal ) {
  if ( amountVal == 'Max' ) {
    socket.emit( 'getSetting', function ( response ) {
      $( '#betAmounts' ).val( response.max_bet );
    } );
    return false;
  }

  var betAmt = parseFloat( $( '#betAmounts' ).val() );
  if ( betAmt ) {
    ( amountVal == 'dot' ) ? $( '#betAmounts' ).val( ( betAmt + 0.1 ).toFixed( 2 ) ) : '';
    ( amountVal == 'one' ) ? $( '#betAmounts' ).val( ( betAmt + 1 ).toFixed( 2 ) ) : '';
    ( amountVal == 'ten' ) ? $( '#betAmounts' ).val( ( betAmt + 10 ).toFixed( 2 ) ) : '';
    ( amountVal == 'multification' ) ? $( '#betAmounts' ).val( ( betAmt * 2 ).toFixed( 2 ) ) : '';
    ( amountVal == 'devided' ) ? $( '#betAmounts' ).val( ( betAmt / 2 ).toFixed( 2 ) ) : '';
    ( amountVal == 'Clear' ) ? $( '#betAmounts' ).val( '' ) : '';

    ( amountVal == 'pointZeroOne' ) ? $( '#betAmounts' ).val( ( betAmt + 0.01 ).toFixed( 2 ) ) : '';
    ( amountVal == 'pointOne' ) ? $( '#betAmounts' ).val( ( betAmt + 0.1 ).toFixed( 2 ) ) : '';
    ( amountVal == 'pointFive' ) ? $( '#betAmounts' ).val( ( betAmt + 0.5 ).toFixed( 2 ) ) : '';

  } else {
    ( amountVal == 'dot' ) ? $( '#betAmounts' ).val( ( 0.1 ).toFixed( 2 ) ) : '';
    ( amountVal == 'one' ) ? $( '#betAmounts' ).val( ( 1 ).toFixed( 2 ) ) : '';
    ( amountVal == 'ten' ) ? $( '#betAmounts' ).val( ( 10 ).toFixed( 2 ) ) : '';
    ( amountVal == 'multification' ) ? $( '#betAmounts' ).val( ( 4 ).toFixed( 2 ) ) : '';
    ( amountVal == 'devided' ) ? $( '#betAmounts' ).val( ( 0.5 ).toFixed( 2 ) ) : '';
    ( amountVal == 'Clear' ) ? $( '#betAmounts' ).val( '' ) : '';

    ( amountVal == 'pointZeroOne' ) ? $( '#betAmounts' ).val( ( 0.01 ).toFixed( 2 ) ) : '';
    ( amountVal == 'pointOne' ) ? $( '#betAmounts' ).val( ( 0.1 ).toFixed( 2 ) ) : '';
    ( amountVal == 'pointFive' ) ? $( '#betAmounts' ).val( ( 0.5 ).toFixed( 2 ) ) : '';

  }
}

$( ".btn-play" ).on( "click", function () {
  bettingStart( $( this ).data( "color" ) );
} );

$( '.findGameDetails' ).on( 'click', function () {
  var cnt_seed = $( '.clintSeedtxt' ).val();
  var srv_seed = $( '.serverseedtxt' ).val();
  var non = $( '.noncetxt' ).val();

  var details = {
    cnt_seed: cnt_seed,
    srv_seed: srv_seed,
    non: non
  };
  socket.emit( 'getProuvablyDetails', details, function ( response ) {
    console.log( 'getProuvablyDetails response-->', response );
    if ( response.status == 'success' ) {
      console.log( 'yes final' );
      var color = '';
      if ( response.data == 'danger' ) {
        color = 'Red';
      } else {
        color = response.data;
      }
      $( '.final_results' ).text( color );
    } else {
      $.toast( { heading: 'Error', text: response.message, position: 'top-right', icon: 'error', stack: false } );
      return false;
    }
  } );

} );
// Start : user betting start in game
function bettingStart ( btn_click ) {
  var betAmt = $.trim( $( '#betAmounts' ).val() );
  $( "#betAmounts" ).val( "" );

  if ( !userId ) {
    $.toast( { heading: 'Error', text: 'Please log in to Play', position: 'top-right', icon: 'error', stack: false } );
    return false;
  } else if ( parseFloat( betAmt ) == "" ) {
    $.toast( { heading: 'Error', text: 'Please enter bet amount', position: 'top-right', icon: 'error', stack: false } );
    return false;
  } else if ( parseFloat( betAmt ) < parseFloat( minBet ) ) {
    $.toast( { heading: 'Error', text: 'Minimum bet amount is ' + minBet, position: 'top-right', icon: 'error', stack: false } );
  } else if ( parseFloat( betAmt ) > parseFloat( maxBet ) ) {
    $.toast( { heading: 'Error', text: 'Maximum bet amount is ' + maxBet, position: 'top-right', icon: 'error', stack: false } );
  } else {
    socket.emit( 'bettingStart', { 'user_id': userId, 'bet_amount': betAmt, 'btn_click': btn_click }, function ( response ) {
      if ( response.status == "success" ) {
        $( "#betAmounts" ).val( "" );
        $.toast( { heading: 'Success', text: 'Bet placed successfully', position: 'top-right', icon: 'success', stack: false } );
      } else {
        $.toast( { heading: 'Error', text: response.message, position: 'top-right', icon: 'error', stack: false } );
      }
    } );
  }
}
// End : user betting start in game

//Start: Roulette Countdown
socket.on( "rouletteGameStarted", function ( response ) {
  if ( response.status == "success" ) {
    fillCarusel( response.cases, response.rouletteRotateDuration, response.stopPosition, response.winnerColor );
    $( ".load-game" ).fadeOut( 'fast' );
    $( ".join-game-bet-sec" ).fadeOut( 'fast' );
    $( ".counter_main_block" ).fadeOut();
    $( ".inbox" ).fadeIn( 'fast' );
    $( ".btn-place-bet-sec" ).fadeIn( 'fast' );
    $( ".win-sec" ).fadeIn( 'fast' );
  }
} );
//End: Roulette Countdown

$( '.copytoclipclint' ).click( function () {
  console.log( 'yes enter on copytoclipclint copy..' );
  var copyTextclientSeed = document.getElementById( 'copyclintseed' );
  copyTextclientSeed.select();
  document.execCommand( "copy" );
  console.log( 'Copied Text' );

} );
$( '.copytoclipserver' ).click( function () {
  console.log( 'yes enter on copytoclipserver copy..' );
  var copyTextservertSeed = document.getElementById( 'copyserverseed' );
  copyTextservertSeed.select();
  document.execCommand( "copy" );
  console.log( 'Copied Text' );

} );

$( ".changeClintseed, .changeServerseed" ).click( function () {
  console.log( ' ---> userID : ', userId );
  let data = {
    userId: userId,
    client_seed: $( ".clintseed" ).val()
  };
  socket.emit( "changeClintSeed", data, function ( response ) {
    console.log( "updatej........", response );
    if ( response.status == "success" ) {
      console.log( 'response.data.client_seed ->', response.data.client_seed );
      $( '.clintseed' ).val( response.data.client_seed );
      $( '.serverseed' ).val( response.data.server_seed );
      $( '.nonce' ).val( response.data.nonce );

      $.toast( { heading: 'Success', text: "Client Seed Succesfully Chagned.", position: 'top-right', icon: 'success', stack: false, hideAfter: 2000 } );
    } else {
      $.toast( { heading: 'Error', text: response.message, position: 'top-right', icon: 'error', stack: false, hideAfter: 2000 } );
    }
  } );

} );

/* socket.on("getSeedData",function(response){
  if(response.status=="success"){        
      setCurrentSeed(response.data);    
  }
}); */


//Start: Rolette Stopped and Update History
socket.on( "rouletteStoppedUpdate", function ( response ) {
  // console.log('rouletteStoppedUpdate response --->', response);

  var html = '';
  for ( var i = 0; i < response.length; i++ ) {
    if ( response[ i ].game_stopped_on == "danger" ) {
      html += '<li class="badges danger-gradiant" style="margin-left:5px">' + response[ i ].game_stopped_number + '</li>';
    } else if ( response[ i ].game_stopped_on == "green" ) {
      html += '<li class="badges success-gradiant" style="margin-left:5px">' + response[ i ].game_stopped_number + '</li>';
    } else if ( response[ i ].game_stopped_on == "black" ) {
      html += '<li class="badges dark-gradiant" style="margin-left:5px">' + response[ i ].game_stopped_number + '</li>';
    }
  }
  $( '.list-inline' ).html( html );

} );
//End: Rolette Stopped and Update History

socket.on( "afterOverBetOnChangesSeedData", function ( response ) {
  console.log( 'afterOverBetOnChangesSeedData response --->', response );
  if ( response ) {
    $( '.clintseed' ).val( response.clientSeed );
    $( '.serverseed' ).val( response.serverSeed );
    $( '.nonce' ).val( response.nonce );
  }

} );
//Start: When user place bet then update user list
socket.on( "rouletteJoinedByUser", function ( response ) {

  let greenHtml = '';
  let redHtml = '';
  let greyHtml = '';

  let red = 0;
  let green = 0;
  let grey = 0;

  for ( let i = 0; i < response.length; i++ ) {
    let html = '<div class="even jack_table"><span>' + response[ i ].name + '</span><span class="red_ttl_bet">' + response[ i ].bet_amount + '</span></div>';

    if ( response[ i ].selected_color == "danger" ) {
      redHtml += html;
      red += 1;
    } else if ( response[ i ].selected_color == "black" ) {
      greyHtml += html;
      grey += 1;
    } else if ( response[ i ].selected_color == "green" ) {
      greenHtml += html;
      green += 1;
    }
  }

  $( ".plred" ).text( 'Player(' + red + ')' );
  $( ".plgreen" ).text( 'Player(' + green + ')' );
  $( ".plgrey" ).text( 'Player(' + grey + ')' );

  $( ".red-winner" ).find( ".winbox-body" ).html( redHtml );
  $( ".grey-winner" ).find( ".winbox-body" ).html( greyHtml );
  $( ".green-winner" ).find( ".winbox-body" ).html( greenHtml );
} );
//Start: When user place bet then update user list

//Start: On Roulette Game start remove all bet player
socket.on( "rouletteClearBetPlayer", function ( response ) {
  $( ".winbox-body" ).html( "" );
  $( ".plred" ).text( 'Player(0)' );
  $( ".plgreen" ).text( 'Player(0)' );
  $( ".plgrey" ).text( 'Player(0)' );
  $( ".load-game" ).fadeIn( 'fast' );
  $( ".join-game-bet-sec" ).fadeIn( 'fast' );
  $( ".counter_main_block" ).fadeIn();
  $( ".three_tbl" ).removeAttr( 'style' );
  fillRoulette( cases );
  // $("#minutes").text(10)
} );
//Start: On Roulette Game start remove all bet player

//Start: Update Balance of When User Bet Roulette
socket.on( "rouletteBalanceAfterBet", function ( response ) {

  console.log( 'rouletteBalanceAfterBet response -->', response );

  if ( response.user_id == userId ) {
    $( ".user_main_balance" ).html( response.main_balance );
  }

} );
//End: Update Balance of When User Bet Roulette



//Start: Update Balance of Win User
socket.on( "rouletteWonUser", function ( response ) {
  for ( let i = 0; i < response.length; i++ ) {
    if ( response[ i ].user_id == userId ) {
      $( ".user_main_balance" ).html( response[ i ].main_balance );
    }
  }
} );
//Start: Update Balance of Win User

//Start: Show notification
socket.on( "showNotification", function ( response ) {
  $( "#minutes" ).html( '00' );
  $( "#seconds" ).html( '00' );

  for ( let i = 0; i < response.length; i++ ) {
    if ( response[ i ].user_id == userIds && response[ i ].is_won == 'yes' ) {
      $.toast( { heading: 'Success', text: 'Hurray!! Its a Win', position: 'top-right', icon: 'success', stack: false } );
    } else if ( response[ i ].user_id == userIds && response[ i ].is_won == 'no' ) {
      $.toast( { heading: 'Error', text: 'Oops! You lost the bet. ', position: 'top-right', icon: 'error', stack: false } );
    }
  }
} );
//Start: Show notification
