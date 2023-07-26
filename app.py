
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

@app.route('/createMsg/<userId>', methods=['POST'])
def  createMessageForUser(userId):
    # request.json
    b = backend()
    return b.createMessageForUser(userId, request.json)


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

@app.route('/clearKey/<emailId>', methods=['PUT'])
def  removeUserPublicKey(emailId):
    b = backend()
    return b.deleteUserMessages(emailId)

@app.route('/generateKey/<emailId>', methods=['PUT'])
def  setPublicKey(emailId):
    b = backend()
    return b.setPublicKey(emailId, request.json)



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
     app.run(host='0.0.0.0',port='8080')
#  app.run(host='0.0.0.0',port='8080', ssl_context=('../cert.pem', '../privkey.pem'))

