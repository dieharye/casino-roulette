// $("#withdraw_coin").keydown(function (e) {
//   if (
//     $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
//     (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
//     (e.keyCode >= 35 && e.keyCode <= 40)
//   ) {
//     return;
//   }
//   if (
//     (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
//     (e.keyCode < 96 || e.keyCode > 105)
//   ) {
//     e.preventDefault();
//   }
// });

$( "#withdraw_coin" ).keydown( function ( e ) {

  var invalidChars = [
    "-",
    "+",
    "e",
  ];

  if ( invalidChars.includes( e.key ) ) {
    e.preventDefault();
  }

} );

async function validateNConnect () {
  const isPhantomInstalled = window.solana && window.solana.isPhantom;

  if ( isPhantomInstalled ) {
    await window.solana.connect();
  } else {
    window.alert( "solana object not found! get a phantom wallet" );
    window.location = "https://www.phantom.app/";
  }
}

$( ".coin_withdraw_btn" ).click( async function () {
  console.log( 'hellew' );
  await validateNConnect();
  const provider = window.solana;
  let minDepAmt = 0.05;

  var coin = $( "#withdraw_coin" ).val();
  //   var coinToAmt = coin;
  let userWalletPubKey = provider.publicKey.toString();

  // console.log("coin ", coin);
  // console.log("userId ", userId);
  // console.log("userWalletPubKey ", userWalletPubKey);

  if ( parseFloat( coin ) > parseFloat( usrCurntBal ) ) {
    $.toast( {
      heading: "Error",
      text: "Withdraw amount is greater than your current balance",
      position: "top-right",
      icon: "error",
    } );
  } else if ( parseFloat( coin ) >= minDepAmt ) {
    if (
      userId !== "" &&
      userId !== 0 &&
      userId !== null &&
      userId !== undefined
    ) {
      if ( userWalletPubKey ) {
        $.ajax( {
          type: "POST",
          dataType: "json",
          url: baseUrl + "withdraw/sendPayment",
          data: {
            amount: coin,
            user_id: userId,
            userWalletPubKey: userWalletPubKey,
          },
          success: async function ( response ) {
            if ( response.status === "success" ) {
              console.log( 'successfull call' );
              $.toast( {
                heading: "success",
                text: response.message,
                position: "top-right",
                icon: "success",
              } );
              setTimeout( function () {
                window.location.reload();
              }, 3000 );
            } else {
              console.log( ' failed calling successfull' );

              $.toast( {
                heading: "Error",
                text: response.message,
                position: "top-right",
                icon: "error",
              } );
            }

          },
        } );
      } else {
        console.log( ' userWalletPubKey err' );
        $.toast( {
          heading: "Error",
          text: "Wallet info not found",
          position: "top-right",
          icon: "error",
        } );


      }
    }
  } else {
    $.toast( {
      heading: "Error",
      text: `Minimum Withdraw amount is ${ minDepAmt } SOL.`,
      position: "top-right",
      icon: "error",
    } );
  }
} );
