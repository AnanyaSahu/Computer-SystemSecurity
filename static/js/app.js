const prefix = 'http://127.0.0.1:8080'

const prefix1 = "http://127.0.0.1:5500"

let listOfMessages = []

function getMsgsForUser(userId) {
    userId = '2'
    var msgEle = document.getElementById("messages");
    ele ='' 
    fetch(prefix+'/getMsg/'+userId, {
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


function getUSerData(req) {
    fetch('https://graph.facebook.com/' + 
    req.userID+"?fields=id,name,email&access_token="+ req.accessToken ).then(response => response.json())
    .then((data) => {
        console.log('user Data from facebook')
        console.log(data)

//         email
// : 
// "ananya_sahu@hotmail.com"
// id
// : 
// "6686390104724805"
// name
// : 
// "Ananya Sahu"
}).catch( err => {
    alert('unable to delete user messages')
    console.log(err)
  })
}