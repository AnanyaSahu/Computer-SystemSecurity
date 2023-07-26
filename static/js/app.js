// const prefix = 'http://127.0.0.1:8080'
const prefix = ''
const prefix1 = "http://127.0.0.1:5500"

let listOfMessages = []
let UserDetails = {
    emailId: '',
    pubKey: ''
}

let loggedInUSer = {
    email: '',
    name: ''
}

function getMsgsForUser() {
    // userId = '2'
    var msgEle = document.getElementById("messages");
    ele ='' 
    console.log('loggedInUSer', sessionStorage.getItem('loggedInUSeremail'))
    fetch(prefix+'/getMsg/'+sessionStorage.getItem('loggedInUSeremail'), {
        method: 'GET',

    }).then(response => response.json())
    .then((data) => {
    
        if(data.rows.length == 0) {
            
            ele+=" <div class='cursor-pointer'>No New Messages</div>"
        } else {
            listOfMessages = data.rows
            for (row in data.rows) {
                r = data.rows[row]
                ele+=" <div class='msg-background' onclick='showMsg("+row+")'>"+  r[2]+"</div> <br>"
            }
        }
        msgEle.innerHTML = ele  
}).catch( err => {
    alert('unable to fetch user messages')
    console.log(err)
  })
}

async function showMsg(msg) {
        console.log(listOfMessages[msg])
        // alert(listOfMessages[msg][1])
        //decrypt message
        const privateKeyData = localStorage.getItem("privateKey");
        const privateKey = await window.crypto.subtle.importKey(
            "jwk",
            JSON.parse(privateKeyData),
            {
                name: "RSA-OAEP",
                hash: { name: "SHA-256" },
            },
            true,
            ["decrypt"]
        );
        console.log('decrypted msg',await decryptWithPrivateKey(privateKey, listOfMessages[msg][1]))
        alert(await decryptWithPrivateKey(privateKey, listOfMessages[msg][1]))
}

function createMsgsForUser() {
    var arealist = document.getElementById("area-list");
    ele =''
    fetch(prefix+'/createMsg/' + userId, {
        method: 'POST',
        body: JSON.stringify({
            recieverId:'' ,
            message: ''
        })
    }).then(response => response.json())
    .then((data) => {
        alert('msg has been sent')
}).catch( err => {
    alert('unable to create user messages')
    console.log(err)
  })
}

function deleteMsgsForUser() {
    var arealist = document.getElementById("area-list");
    ele =''
    fetch(prefix+'/deleteMsg/'+msgId, {
        method: 'PUT',
    }).then(response => response.json())
    .then((data) => {
        // if(len(data.rows) == 0) {
        //     ele+=" <div class='cursor-pointer'>No New Messages</div>"
        // } else {
        //     for (row in data.rows) {
        //         r = data.rows[row]
        //         ele+=" <div class='cursor-pointer' onclick='selectArea("+ r[0]+")'>"+ r[0]+","+ r[1]+"</div>"
        //     }
        // }
        // arealist.innerHTML = ele  
}).catch( err => {
    alert('unable to delete user messages')
    console.log(err)
  })
}

function navigate(page) {
    if(page == 'createMsg') {
        window.location.assign("createMsg");

    } else if(page == 'readMsg') {
        window.location.assign("userMsgs");
    }
}


async function getUSerData(req) {
    console.log('getUSerData')
    await fetch('https://graph.facebook.com/' + 
    req.userID+"?fields=id,name,email&access_token="+ req.accessToken ).then(response => response.json())
    .then(async (data) => {
        console.log('user Data from facebook')
        console.log(data)
        sessionStorage.setItem('loggedInUSeremail',data.email)
        sessionStorage.setItem('loggedInUSername',data.name)
    // loggedInUSer.email = data.email,
    // loggedInUSer.name = data.name




}).catch( err => {
    alert('unable get user data from facebook')
    console.log(err)
  })

  await fetch(prefix+'/createUser', {
    method: 'POST',
    body: JSON.stringify({
        emailId: sessionStorage.getItem('loggedInUSername')
    })
}).then(response => response.json())
.then(async (data) => {
    alert('user logged in')
            // Generate and display the RSA public key
            const rsaKeyPair = await generateRSAKeyPair();
            const publicKey = rsaKeyPair.publicKey;
            const publicKeyData = await exportPublicKey(publicKey);
            const privateKey = rsaKeyPair.privateKey;
            const privateKeyData = await window.crypto.subtle.exportKey("jwk", privateKey);
            localStorage.setItem("privateKey", JSON.stringify(privateKeyData));
            console.log(publicKeyData)
            // console.log(privateKeyData)
            savePublicKey(publicKeyData)
}).catch( err => {
alert('unable to login user ')
console.log(err)
})
}


async function checkUserAvailabliity(){
    var messageArea = document.getElementById('message-area');
    var sendBtn = document.getElementById('send-btn');
    var notFound = document.getElementById('userNotFound');  
    // userId = '2'
    var userId =  document.getElementById('recipient').value;
    ele ='' 
    await fetch('/getUser/'+userId, {
        method: 'GET'
    }).then(response => response.json())
    .then((data) => {
        // console.log(data)
        if(data.rows.length == 0) {
            
            messageArea.style.display = 'none'
            sendBtn.style.display = 'none'
            notFound.innerHTML = "<div>User is not available</div>"
            //no user
        } 
        
        else {
            messageArea.style.display = 'none'
            sendBtn.style.display = 'none'
            UserDetails.emailId = data.rows[0][0]
            sessionStorage.setItem('UserDetailsemailId',data.rows[0][0])
            data.rows[0][1].split("|")
            pubKeyobj = {
                e:data.rows[0][1].split("|")[0],
                kty:data.rows[0][1].split("|")[1],
                n:data.rows[0][1].split("|")[2]
            }
            UserDetails.pubKey = pubKeyobj
            sessionStorage.setItem('UserDetailspubKey',JSON.stringify( pubKeyobj))
          

            if(  sessionStorage.getItem('UserDetailspubKey')  == '') {
                alert('user offline')
            } else {
                messageArea.style.display = 'block'
                sendBtn.style.display = 'block'
                notFound.innerHTML = ""
            }
            // email = data[0][0]
            // pubkey = data[0][1]
        //    user is online
        }
}).catch( err => {
    alert('user not available')
    console.log(err)
  })
}


async function sendMsg(){
    const publicKey = await window.crypto.subtle.importKey(
        "jwk",
        JSON.parse(sessionStorage.getItem('UserDetailspubKey')),
        {
            name: "RSA-OAEP",
            hash: { name: "SHA-256" },
        },
        true,
        ["encrypt"]
    );
    const messageForm = document.getElementById('messageForm');
    // e.preventDefault();
    const sender = '1'; // Replace this with the actual sender's username.
    const recipient = document.getElementById('recipient').value;
    const message = document.getElementById('message').value;
    console.log(sessionStorage.getItem('UserDetailspubKey') )
    console.log('message', message)
    // encryptMessageText = encryptMessage(UserDetails.pubKey, message)
    const encryptMessageText = await encryptWithPublicKey(publicKey, message);
    // .then(response =>{
    //     console.log(response)
    // });
    console.log(encryptMessageText)
   

    await fetch('/createMsg', {
        method: 'POST',
        body: JSON.stringify({ message:encryptMessageText , recieverId:recipient, sender:sender }),
    }).then(response => response.json())
    .then((data) => {
        alert('Message sent successfully!');
}).catch( err => {
    alert('user not available')
    console.log(err)
  })

    // if (response.ok) {
        
    //     alert('Message sent successfully!');
    // } else {
    //     alert('There is no user with this username, try a valid username please.');
    // }
}


function clearPublicKey(res){
        fetch(prefix+'/clearKey/'+sessionStorage.getItem('UserDetailsemailId') , {
            method: 'PUT',
            body: JSON.stringify({
                emailID: sessionStorage.getItem('UserDetailsemailId'),
            })
        }).then(response => response.json())
        .then((data) => {
 
    }).catch( err => {
        alert('unable to delete user key')
        console.log(err)
      })
    
}



function savePublicKey(publicKey){
    fetch(prefix+'/generateKey', {
        method: 'PUT',
        body: JSON.stringify({
            emailID: sessionStorage.getItem('loggedInUSeremail'),
            publicKey:JSON.parse(publicKey)
        })
    }).then(response => response.json())
    .then((data) => {

}).catch( err => {
    alert('unable to save user key')
    console.log(err)
  })

}