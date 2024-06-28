// $("#deposit_coin").keydown(async function (e) {
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

$( "#deposit_coin" ).keydown( function ( e ) {

  var invalidChars = [
    "-",
    "+",
    "e",
  ];

  if ( invalidChars.includes( e.key ) ) {
    e.preventDefault();
  }

} );

async function convertCoinToSol ( coin ) {
  let solVal;

  // let solValApi = {
  //   url: "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
  //   method: "GET",
  //   timeout: 0,
  //   headers: {
  //     accept: "application/json",
  //   },
  // };

  // await $.ajax(solValApi).done(function (response) {
  //   solVal = response.solana.usd;
  // });


  // console.log('coin =>> ', coin)
  // console.log('adminSetChip =>> ', adminSetChip)
  // console.log('adminSetDepCommn =>> ', adminSetDepCommn)

  let commissionVal = parseFloat( coin ) / 100 * parseFloat( adminSetDepCommn );

  let sol = parseFloat( coin ) + parseFloat( commissionVal );
  // console.log('sol =>> ', sol)
  // console.log('commissionVal =>> ', commissionVal)
  return sol;
}

$( "#deposit_coin" ).keyup( async function ( e ) {
  let depositTbVal = $( "#deposit_coin" ).val();
  if ( depositTbVal ) {
    let sol = await convertCoinToSol( depositTbVal );
    sol = parseFloat( sol ).toFixed( 4 );
    $( '.price' ).text( sol + ' SOL' );
  } else {
    $( '.price' ).text( '' );
  }
} );


// Function to actually do the connection to the wallet
async function connectAndSend () {
  // console.log('connectAndSend called ')

  try {
    await window.solana.connect();
    await sendSol();
  } catch ( err ) { }
}

// Function to create button and on click
function validateAc () {
  // console.log('validateAc called ')

  const isPhantomInstalled = window.solana && window.solana.isPhantom;

  if ( isPhantomInstalled == true ) {
    let sendSoulBtn = document.getElementById( "coinDepositBtn" );
    sendSoulBtn.addEventListener( "click", connectAndSend );
  } else {
    window.alert( "solana object not found! get a phantom wallet" );
    window.location = "https://www.phantom.app/";
  }
}

// On load of page check to see if there is a phantom window object if not then have popup
window.addEventListener( "load", validateAc );

async function sendSol () {
  // console.log('sendSol called ')

  const provider = window.solana;
  //   const scriptObject = document.getElementById("solbutton");
  //   const toAddr = document.getElementById("to-address").value;
  const toAddr = adminWallet;
  const coinAmt = document.getElementById( "deposit_coin" ).value;
  let price = await convertCoinToSol( coinAmt );
  let userWalletAddress = provider.publicKey.toString();
  let minDepAmt = 0.05;


  // console.log('coinAmt--> ',coinAmt)
  // console.log('baseUrl--> ',baseUrl)
  // console.log('price--> ',price)
  // console.log('userWalletAddress--> ',userWalletAddress)
  // console.log('walletClusterApiUrl--> ',walletClusterApiUrl)


  let transaction_block;
  let transaction_signature;

  if ( parseFloat( coinAmt ) >= minDepAmt ) {
    const connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl( walletClusterApiUrl ),
      "confirmed"
    );

    const toAccount = new solanaWeb3.PublicKey( toAddr );

    // Create transaction object
    let transaction = new solanaWeb3.Transaction().add(
      solanaWeb3.SystemProgram.transfer( {
        fromPubkey: provider.publicKey,
        toPubkey: toAccount,
        lamports: solanaWeb3.LAMPORTS_PER_SOL * price,
        // lamports: solanaWeb3.LAMPORTS_PER_SOL * coinAmt,
      } )
    );

    // Setting the variables for the transaction
    transaction.feePayer = await provider.publicKey;
    let blockhashObj = await connection.getRecentBlockhash();
    transaction.recentBlockhash = await blockhashObj.blockhash;

    // Transaction constructor initialized successfully
    if ( transaction ) {
      console.log( "Txn created successfully" );
    } else {
      console.log( "Txn created unsuccessfully" );
    }

    // Request creator to sign the transaction (allow the transaction )
    let signed = await provider.signTransaction( transaction ).then(
      ( data ) => {
        console.log( 'signTransaction==> ', data );
        // $.toast({
        //     heading: "Success",
        //     text: "Deposited successfully.",
        //     position: "top-right",
        //     icon: "success",
        //   });
        return data;
      },
      ( reject ) => {
        $.toast( {
          heading: "Failed",
          text: "User declined transaction.",
          position: "top-right",
          icon: "error",
        } );
        // console.log(reject);
      }
    );
    // console.log('signed => ',signed)
    let signature = await connection
      .sendRawTransaction( signed.serialize() )
      .then(
        ( data ) => {
          transaction_signature = data;
          console.log( 'sendRawTransaction==> ', data );
          // $.toast({
          //     heading: "Success",
          //     text: "Deposited successfully.",
          //     position: "top-right",
          //     icon: "success",
          //   });
          return data;
        },
        ( reject ) => {
          $.toast( {
            heading: "Failed",
            text: "Insufficient balance in Phantom wallet.",
            position: "top-right",
            icon: "error",
          } );
          // console.log(reject);
        }
      );

    // console.log('signed => ',signed)
    // console.log('signature => ',signature)
    if ( signature ) {
      await connection.confirmTransaction( signature ).then(
        ( data ) => {
          console.log( 'confirmTransaction==> ', data );
          transaction_block = data.context.slot;

          $.ajax( {
            type: "POST",
            dataType: "json",
            url: baseUrl + "deposit/paymentsuccess",
            data: {
              transaction_block: transaction_block,
              transaction_signature: transaction_signature,
              coin: coinAmt,
              price: price,
              userWalletAddress: userWalletAddress,
            },
            success: function ( response ) { },
          } );

          // $.toast({
          //   heading: "Success",
          //   text: "Deposited successfully.",
          //   position: "top-right",
          //   icon: "success",
          // });
          return data;
        },
        ( reject ) => {
          $.toast( {
            heading: "Failed",
            text: "Transaction confirmation failed.",
            position: "top-right",
            icon: "error",
          } );
          // console.log(reject);
        }
      );
    }
  } else {
    $.toast( {
      heading: "Error",
      text: `Minimum deposit amount is ${ minDepAmt } solona`,
      position: "top-right",
      icon: "error",
    } );
  }
}
