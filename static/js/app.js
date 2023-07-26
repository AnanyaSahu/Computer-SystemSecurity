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

function getMsgsForUser(userId) {
    // userId = '2'
    var msgEle = document.getElementById("messages");
    ele ='' 
    fetch(prefix+'/getMsg', {
        method: 'GET',
        body: JSON.stringify({
            userId:userId
        })
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

function showMsg(msg) {
        console.log(listOfMessages[msg])
        alert(listOfMessages[msg][1])
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
    loggedInUSer.email = data.email,
    loggedInUSer.name = data.name




}).catch( err => {
    alert('unable get user data from facebook')
    console.log(err)
  })

  await fetch(prefix+'/createUser', {
    method: 'POST',
    body: JSON.stringify({
        emailId: loggedInUSer.email
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


function checkUserAvailabliity(){
    var messageArea = document.getElementById('message-area');
    var sendBtn = document.getElementById('send-btn');
    var notFound = document.getElementById('userNotFound');  
    // userId = '2'
    var userId =  document.getElementById('recipient').value;
    ele ='' 
    fetch('/getUser', {
        method: 'GET',
        body: JSON.stringify({ userId :userId }),
    }).then(response => response.json())
    .then((data) => {
        if(data.rows.length == 0) {
            
            messageArea.style.display = 'none'
            sendBtn.style.display = 'none'
            notFound.innerHTML = "<div>User is not available</div>"
            //no user
        } 
        
        else {
            messageArea.style.display = 'none'
            sendBtn.style.display = 'none'
            UserDetails.emailId = data[0][0]
            UserDetails.pubKey = data[0][1]

            if(   UserDetails.pubKey  != '') {
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


function sendMsg(){
    const messageForm = document.getElementById('messageForm');
    e.preventDefault();
    const sender = '1'; // Replace this with the actual sender's username.
    const recipient = document.getElementById('recipient').value;
    const message = document.getElementById('message').value;
    encryptMessage = encryptMessage(UserDetails.pubKey, message)
    console.log(encryptMessage)

    const response =  fetch('/createMsg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message:encryptMessage , recieverId:recipient, sender:sender }),
    });

    if (response.ok) {
        alert('Message sent successfully!');
    } else {
        alert('There is no user with this username, try a valid username please.');
    }
}


function clearPublicKey(res){
        fetch(prefix+'/clearKey/'+UserDetails.emailId, {
            method: 'PUT',
            body: JSON.stringify({
                emailID: UserDetails.emailId,
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
            emailID: loggedInUSer.email,
            publicKey:JSON.parse(publicKey)
        })
    }).then(response => response.json())
    .then((data) => {

}).catch( err => {
    alert('unable to save user key')
    console.log(err)
  })

}