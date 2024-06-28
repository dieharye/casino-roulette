var WindowWidth = 0;
var WindowHeight = 0;

$( document ).ready( function () {
  WindowWidth = $( window ).width();
  WindowHeight = $( window ).height();
  ResetView( WindowWidth, WindowHeight );
} );
$( window ).resize( function () {
  WindowWidth = $( window ).width();
  WindowHeight = $( window ).height();
  ResetView( WindowWidth, WindowHeight );
} );

function ResetView ( WindowWidth, WindowHeight ) {
  var headerheight = $( "header" ).innerHeight();
  var chattitle = $( ".chatbar_title" ).height();
  var chatmessagebox = $( ".chatbar_message_box" ).innerHeight();
  var footerheight = $( "footer" ).innerHeight();



  if ( WindowWidth > 991 ) {
    var totalVal = parseInt( headerheight + chattitle + chatmessagebox + footerheight + 80 );
    var c_heigt = WindowHeight - totalVal;
    c_heigt = c_heigt + 40;
    $( '.charbar_message_list' ).slimscroll( {
      height: $( '.charbar_message_list' ).css( { 'height': c_heigt + "px" } ),
      start: 'bottom',
    } );
  }
  else if ( WindowWidth > 767 && WindowWidth < 850 ) {
    var totalVal = parseInt( headerheight + footerheight + 80 );
    var c_heigt = WindowHeight - totalVal;
    c_heigt = c_heigt + 40;
    $( '.charbar_message_list' ).slimscroll( {
      height: $( '.charbar_message_list' ).css( { 'height': c_heigt + "px" } ),
      start: 'bottom',
    } );
  }
  else if ( WindowWidth > 500 && WindowWidth < 767 ) {
    var totalVal = parseInt( headerheight + footerheight + 56 );
    var c_heigt = WindowHeight - totalVal;
    c_heigt = c_heigt + 40;
    $( '.charbar_message_list' ).slimscroll( {
      height: $( '.charbar_message_list' ).css( { 'height': c_heigt + "px" } ),
      start: 'bottom',
    } );
  }
  else if ( WindowWidth > 300 && WindowWidth < 500 ) {

    var totalVal = parseInt( headerheight + footerheight + 33 );
    var c_heigt = WindowHeight - totalVal;
    c_heigt = c_heigt + 40;
    $( '.charbar_message_list' ).slimscroll( {
      height: $( '.charbar_message_list' ).css( { 'height': c_heigt + "px" } ),
      start: 'bottom',
    } );
  }
  else {
    var totalVal = parseInt( headerheight + footerheight + 82 );
    var c_heigt = WindowHeight - totalVal;
    c_heigt = c_heigt + 40;
    $( '.charbar_message_list' ).slimscroll( {
      height: $( '.charbar_message_list' ).css( { 'height': c_heigt + "px" } ),
      start: 'bottom',
    } );
  }

}
$( ".chat_toggle" ).click( function () {
  if ( WindowWidth < 991 ) {
    if ( $( '.chatbar' ).is( ':hidden' ) ) {
      $( '.chatbar' ).show( 'slide', { direction: 'left' }, 200 );
    } else {
      $( '.chatbar' ).hide( 'slide', { direction: 'left' }, 200 );
    }
  } else {
    $( '.chatbar' ).show( 'slide', { direction: 'left' }, 200 );
  }
} );