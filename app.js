const prefix = 'http://127.0.0.1:8080'

function getMsgsForUser() {
    var arealist = document.getElementById("area-list");
    ele =''
    fetch(prefix+'/getMsg/'+userId, {
        method: 'GET',
    }).then(response => response.json())
    .then((data) => {
        if(len(data.rows) == 0) {
            ele+=" <div class='cursor-pointer'>No New Messages</div>"
        } else {
            for (row in data.rows) {
                r = data.rows[row]
                ele+=" <div class='cursor-pointer' onclick='selectArea("+ r[0]+")'>"+ r[0]+","+ r[1]+"</div>"
            }
        }
        arealist.innerHTML = ele  
}).catch( err => {
    alert('unable to fetch user messages')
  })
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
        if(len(data.rows) == 0) {
            ele+=" <div class='cursor-pointer'>No New Messages</div>"
        } else {
            for (row in data.rows) {
                r = data.rows[row]
                ele+=" <div class='cursor-pointer' onclick='selectArea("+ r[0]+")'>"+ r[0]+","+ r[1]+"</div>"
            }
        }
        arealist.innerHTML = ele  
}).catch( err => {
    alert('unable to create user messages')
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
  })
}


