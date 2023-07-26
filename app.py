
import json
from flask import Flask, render_template, request

from backend import backend

# mysql = MySQL()
app = Flask(__name__)
# CORS(app)
# mysql.init_app(app)



@app.route('/getMsg/<userId>', methods=['GET'])
def  getMessagesForUser(userId):
    b = backend()
    return b.getMessagesForUser(userId)

@app.route('/createMsg', methods=['POST'])
def  createMessageForUser():
    b = backend()
    return b.createMessageForUser(request.get_json('message')['message'], request.get_json('recieverId')['recieverId'],request.get_json('sender')['sender'])


@app.route('/getUser/<userId>', methods=['GET'])
def  getUser(userId):
    b = backend()
    return b.checkUserAvailabliity(userId)

@app.route('/deleteMsg/<msgId>', methods=['PUT'])
def  deleteUserMessages(msgId):
    b = backend()
    return b.deleteUserMessages(msgId)

@app.route('/getMsg/<msgId>', methods=['GET'])
def  getMessage(msgId):
    b = backend()
    return b.getMessage(msgId)

@app.route('/clearKey', methods=['PUT'])
def  removeUserPublicKey():
    b = backend()
    return b.clearPublicKey(request.get_json('emailID')['emailID'])

@app.route('/generateKey', methods=['PUT'])
def  setPublicKey():
    b = backend()
    return b.setPublicKey(request.get_json('emailID')['emailID'], request.get_json('publicKey')['publicKey'])



@app.route('/createUser', methods=['POST'])
def  createUser():
    b = backend()
    return b.createUser(request.get_json('emailId')['emailId'])

# This will render the template on cloud
@app.route('/createMsg')
def  createMsgPage():
    return render_template('createMsg.html')

# This will render the template on cloud
@app.route('/userMsgs')
def  userMsgsPage():
    return render_template('userMsgs.html')


# This will render the template on cloud
@app.route('/')
def  landPage():
    return render_template('index.html')

if __name__ == "__main__":
    #  app.run(host='0.0.0.0',port='8080')
 app.run(host='0.0.0.0',port='8080', ssl_context=('../cert.pem', '../privkey.pem'))

