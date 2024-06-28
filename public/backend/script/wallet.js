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

  // console.log('solVal => ', solVal)

  // let sol = parseFloat(coin) / parseFloat(solVal);
  // return sol;



  console.log( 'coin =>> ', coin );
  console.log( 'adminSetChip =>> ', adminSetChip );
  console.log( 'adminSetDepCommn =>> ', adminSetDepCommn );

  // let commissionVal=parseFloat(coin) / 100 * parseFloat(adminSetDepCommn)

  let sol = parseFloat( coin ) + parseFloat( commissionVal );
  console.log( 'sol =>> ', sol );
  console.log( 'commissionVal =>> ', commissionVal );
  return sol;

}

// Function to actually do the connection to the wallet
async function connectAndSend ( toAddr, solAmt, transId ) {
  try {
    await window.solana.connect();
    await sendSol( toAddr, solAmt, transId );
  } catch ( err ) { }
}

// Function to create button and on click
function validateAc () {
  const isPhantomInstalled = window.solana && window.solana.isPhantom;

  if ( isPhantomInstalled == true ) {
    // let approveTransBtn = document.getElementById("approveTransBtn");
    // approveTransBtn.addEventListener("click", connectAndSend);
  } else {
    window.alert( "solana object not found! get a phantom wallet" );
    window.location = "https://www.phantom.app/";
  }
}

// On load of page check to see if there is a phantom window object if not then have popup
window.addEventListener( "load", validateAc );

async function sendSol ( toAddr, solAmt, transId ) {
  const provider = window.solana;
  //   const scriptObject = document.getElementById("solbutton");
  //   const toAddr = document.getElementById("to-address").value;

  // const toAddr = adminWallet;
  // const solAmt = document.getElementById("deposit_coin").value;
  // let price = await convertCoinToSol(solAmt);

  // let toAddr = document.getElementById("approveTransBtn").getAttribute("to-address");
  // let solAmt = document.getElementById("approveTransBtn").getAttribute("sol-amount");

  // let price = await convertCoinToSol(solAmt);
  let price = parseFloat( solAmt );

  let transaction_block;
  let transaction_signature;


  if ( parseFloat( solAmt ) ) {
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
        // lamports: solanaWeb3.LAMPORTS_PER_SOL * solAmt,
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
        console.log( "signTransaction==> ", data );
        // $.toast({
        //     heading: "Success",
        //     text: "Deposited successfully.",
        //     position: "top-right",
        //     icon: "success",
        //   });
        return data;
      },
      ( reject ) => {
        // $.toast({
        //   heading: "Failed",
        //   text: "User declined transaction.",
        //   position: "top-right",
        //   icon: "error",
        // });
        alert( "Error- User declined transaction." );
        // console.log(reject);
      }
    );
    // console.log('signed => ',signed)
    let signature = await connection
      .sendRawTransaction( signed.serialize() )
      .then(
        ( data ) => {
          transaction_signature = data;
          console.log( "sendRawTransaction==> ", data );
          // $.toast({
          //     heading: "Success",
          //     text: "Deposited successfully.",
          //     position: "top-right",
          //     icon: "success",
          //   });
          return data;
        },
        ( reject ) => {
          // $.toast({
          //   heading: "Failed",
          //   text: "User declined transaction.",
          //   position: "top-right",
          //   icon: "error",
          // });
          alert( "Error- Insufficient balance in Phantom wallet.." );

          // console.log(reject);
        }
      );
    // console.log('signature => ',signature)
    if ( signature ) {
      let transactionStatus = await connection.confirmTransaction( signature ).then(
        ( data ) => {
          console.log( "confirmTransaction==> ", data );
          transaction_block = data.context.slot;

          // console.log("transaction_block----> ", transaction_block);
          // console.log("transaction_signature----> ", transaction_signature);

          $.ajax( {
            type: "POST",
            dataType: "json",
            url: baseUrl + "backend/withdrawRequest/approve/" + transId,
            data: {
              transaction_block: transaction_block,
              transaction_signature: transaction_signature,
              price: price,
            },
            success: function ( response ) {
              // console.log('approve response--> ',response)

            },
          } );
          alert( "Withdraw request approved." );

          setTimeout( function () { window.location.reload(); }, 500 );

          $.toast( {
            heading: "Success",
            text: "Withdraw request approved.",
            position: "top-right",
            icon: "success",
          } );



          // alert("Success- Deposited successfully.");

          return data;
        },
        ( reject ) => {
          // $.toast({
          //   heading: "Failed",
          //   text: "User declined transaction.",
          //   position: "top-right",
          //   icon: "error",
          // });
          alert( "Error- Transaction confirmation failed." );

          // console.log(reject);
          return 0;
        }
      );
    }


    // console.log("transaction_block----> ", transaction_block);
    // console.log("transaction_signature----> ", transaction_signature);
    // console.log("transactionStatus----> ", transactionStatus);
  } else {
    $.toast( {
      heading: "Error",
      text: "Minimum deposit amount is 0.5 solona",
      position: "top-right",
      icon: "error",
    } );
    console.log( 'errorer' );
  }
}
