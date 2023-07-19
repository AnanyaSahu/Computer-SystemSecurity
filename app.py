
from flask import Flask, render_template, request

# mysql = MySQL()
app = Flask(__name__)
# CORS(app)
# mysql.init_app(app)



# @app.route('/api/<name>', methods=['GET'])
# def  getBookingsForCustomer(name):
    # b = bookTicketsForCustomer()
    # return b.getBookingsForCustomer(name)

# This will render the template on cloud
@app.route('/')
def  landPage():
    return render_template('template/index.html')

if __name__ == "__main__":
 app.run(host='0.0.0.0',port='8080', ssl_context=('../cert.pem', '../privkey.pem'))

