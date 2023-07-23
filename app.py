
from flask import Flask, render_template, request

from backend import backend

# mysql = MySQL()
app = Flask(__name__)
# CORS(app)
# mysql.init_app(app)



@app.route('/getMsg/<userId>', methods=['GET'])
def  getMessagesForUser(userId):
    b = backend()
    return b.getMessageForUser(userId)

@app.route('/createMsg/<userId>', methods=['POST'])
def  createMessageForUser(userId):
    # request.json
    b = backend()
    return b.createMessageForUser(userId, request.json)

@app.route('/deleteMsg/<msgId>', methods=['PUT'])
def  deleteUserMessages(msgId):
    b = backend()
    return b.deleteUserMessages(msgId)

# This will render the template on cloud
@app.route('/')
def  landPage():
    return render_template('template/index.html')

if __name__ == "__main__":
 app.run(host='0.0.0.0',port='8080', ssl_context=('../cert.pem', '../privkey.pem'))

