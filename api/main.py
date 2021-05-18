from functools import wraps
from flask import Flask, request, jsonify, make_response, session
from flask_cors import CORS, cross_origin
import jwt
from datetime import timedelta , datetime
from cryptography.fernet import Fernet
from db import *

app = Flask(__name__)
app.config['SECRET_KEY'] = Fernet.generate_key().decode('UTF-8')

CORS(app, support_credentials=True)
@cross_origin(supports_credentials=True)


def expireDate(minutes = None,):
    date = datetime.now() + timedelta(minutes= minutes)
    return date

def validate_token(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        try:
            token = request.json['token']
            print(token)
            if token == "null" : return jsonify({'error': error}) , 403
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms="HS256")
            print(data)
        except TypeError as error:
            return jsonify({'error': error}, request) , 405
        except jwt.ExpiredSignatureError as error:
            return jsonify({'error': error}) , 401
        except jwt.InvalidTokenError as error:
            return jsonify({'error': error}) , 403
        except jwt.InvalidSignatureError as error:
            return jsonify({'error': error}) , 403
        except :
            print('error')
            return jsonify({'error': 'error'}) , 403

        return func(*args, **kwargs)
    return wrapped


@app.route('/api/login', methods=['POST'])
def login():
    print(request.json)
    uname = request.json['username']
    upass = request.json['password']
    userId, dbuname , dbupass = get_login_details(uname)

    if not dbuname:
        return make_response(f"{dbuname} is not found", 403, {"WWW-Authenticate" : "Basic realm : 'login menu'"})

    if uname == dbuname  and upass == dbupass:
        try:
            session['logged_in'] = True
            payload = {
                'username' : uname ,
                'exp' : datetime.utcnow() + timedelta(days=7)
                }
            token = jwt.encode(payload= payload, key= app.config['SECRET_KEY'])
            return jsonify({
                'username' : uname,
                'token' : token,
                'key' : app.config['SECRET_KEY']
                })
        except TypeError as error:
            print(error)

    return make_response("invalid credentials", 403, {"WWW-Authenticate" : "Basic realm : 'login menu'"})


@app.route('/api/signup', methods = ['POST'])
def signup():
    name = request.json['name']
    username = request.json['username']
    password = request.json['password']
    age = request.json['age']
    gender = request.json['gender']
    _id, uname = store_user_details(name, username, password, age, gender)

    return jsonify({
        'code' : 200,
        'username' : username
    }), 200


@app.route('/api/feeds', methods = ['POST'])
@validate_token
def feeds():
    # allFeeds = get_feeds()
    allFeeds = [1,2,3]
    return jsonify({
        'code' : 200, 
        'feeds' : allFeeds
    }) , 200 



if __name__ == "__main__":
    app.run(debug=True, port=5000)



# @app.route('/api/unprotected')
# def unprotected():
#     return jsonify({
#         'success' : 'you are inn'
#         })

# @app.route('/api/protected', methods= ['POST'])
# @validate_token
# def protected():
#     data = {
#         "username" : 'jaabir',
#         "age" : 19
#     }
#     return jsonify(data)