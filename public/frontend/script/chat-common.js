$( '.chat_message_div' ).on( "keypress", function ( e ) {
    if ( e.keyCode == 13 ) {
        chatMessageSave();
    }
} );

socket.on( 'appentNewMessageAllUser', async ( res, lastMessage ) => {
    console.log( 'appentNewMessageAllUser data -->', res );

    if ( res.status == "success" ) {
        var chatHtml = '';

        $( '.charbar_message_list' ).html( '' );
        for ( var i = 0; i < res.data.length; i++ ) {
            console.log( ' i -->', i );

            var detail = res.data[ i ];
            console.log( '------1------' );
            chatHtml += await chatMessageHtml( detail, res.moderatorUser );
        }
        $( '.charbar_message_list' ).html( chatHtml );
    }

    setTimeout( function () {
        var height = 10;
        $( '.list-unstyled' ).each( function () {
            height += $( this ).outerHeight();
        } );
        $( "#chatscroll" ).slimScroll( { scrollTo: ( parseInt( height ) ) + 'px' } );
    }, 100 );


} );

function chatMessageSave () {
    if ( userId != "" && userId != 0 && userId != null && userId != undefined ) {
        var message = $( '.chat_message_div' ).val();
        $( '.chat_message_div' ).val( '' );
        if ( message != "" ) {
            var data = { 'userId': userId, 'message': message };
            socket.emit( 'chatMessageSave', data, function ( response ) {

                if ( response.popup == "show" ) {
                    $( '#chatrule' ).modal( 'show' );
                }
                if ( response.status == "success" ) {
                    getChatMessage();
                    $( '.chat_message_div' ).val( '' );
                } else if ( response.status == "fail" ) {
                    $.toast( { heading: 'Error', text: response.message, position: 'top-right', icon: 'error', stack: false } );
                }

            } );
        } else {
            $.toast( { heading: 'Error', text: 'Please enter message to start conversation', position: 'top-right', icon: 'error', stack: false } );
        }
    } else {
        $.toast( { heading: 'Error', text: 'Please log in to Play', position: 'top-right', icon: 'error', stack: false } );
    }
}

//START: Socket call to getting chat messages
getChatMessage();
function getChatMessage () {
    socket.emit( 'getMessages', async function ( response ) {
        if ( response.status == "success" ) {
            var chatHtml = '';

            $( '.charbar_message_list' ).html( '' );

            for ( var i = 0; i < response.data.length; i++ ) {
                var detail = response.data[ i ];

                chatHtml += await chatMessageHtml( detail, response.moderatorUser );
            }
            $( '.charbar_message_list' ).html( chatHtml );

        }

        setTimeout( function () {
            var height = 10;
            $( '.list-unstyled' ).each( function () {
                height += $( this ).outerHeight();
            } );
            $( "#chatscroll" ).slimScroll( { scrollTo: ( parseInt( height ) ) + 'px' } );
        }, 100 );

    } );
}
//END: Socket call to getting chat messages

// Socket Count 
socket.on( 'count', async function ( response ) {
    $( '.active_user' ).text( response.loginUser );
} );
//end: Socket Count 


//START: Chat html create
function chatMessageHtml ( detail, moderatorUserss ) {

    let name, profilePicc;
    if ( detail.anymos == 1 ) {

        name = 'Anonymous';
        profilePicc = baseUrl + 'frontend/upload/user/anymos.jpg';

    } else if ( detail[ 'userDetail.profile_image' ] == 'default.png' ) {

        name = detail[ 'userDetail.name' ];
        profilePicc = baseUrl + 'frontend/upload/user/' + detail[ 'userDetail.profile_image' ];

    } else {

        name = detail[ 'userDetail.name' ];
        profilePicc = baseUrl + 'frontend/upload/user/' + detail[ 'userDetail.profile_image' ];

    }

    var moderatorUser = '';
    var chatClose = '';

    if ( detail[ 'userDetail.moderator_type' ] == 'moderator' ) {
        moderatorUser = "#ffa31a";
    } else {
        moderatorUser = '';
    }

    if ( detail[ 'userDetail.moderator_type' ] == "moderator" ) {
        chatClose = '';
    } else {
        var ids = parseInt( userIds );
        if ( moderatorUserss.indexOf( ids ) !== -1 ) {
            chatClose = '<a href="/profile/userchatdelete/' + detail.id + '"><i class="fa fa-times closeSignChange" style="color:#ffa31a"></i></a>';
        } else {
            chatClose = '';
        }
    }

    var html = '';
    html += '<div class="chat_user_message list-unstyled">';
    html += '<div class="chat_user_img">';
    html += '<img src="' + profilePicc + '"  alt="' + name + '">';
    html += '</div>';
    html += '<div class="char_user_message">';
    html += '<div class="chat_user_name " style=color:' + moderatorUser + '>' + name + '<span class="cun-right" style="float: right;">' + chatClose + ' </span></div>';
    html += '<div class="chat_message">' + detail.chat_message + '</div>';
    html += '</div>';
    html += '</div>';
    return html;
}
//END: Chat html create
