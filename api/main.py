from functools import wraps
from flask import Flask, json, request, jsonify, make_response, session
from flask_cors import CORS, cross_origin
import jwt
from datetime import date, timedelta , datetime
from db import *
from datetime import datetime 

app = Flask(__name__)
app.config['SECRET_KEY'] = "Thissisasectetrkeyandyoucantdcodethisoneasldothisoneissoooobugandamesseduokeytoo"

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


def create_token(uname):
    session['logged_in'] = True
    payload = {
            'username' : uname ,
            'exp' : datetime.utcnow() + timedelta(days=7)
        }
    
    token = jwt.encode(payload= payload, key= app.config['SECRET_KEY'])
    return token


@app.route('/api/login', methods=['POST'])
def login():
    print(request.json)
    uname = request.json['username']
    upass = request.json['password']
    dbuname, dbupass = get_login_details(uname)

    # dbuname, dbupass = details['username'], details['password']
    if not dbuname:
        return make_response(f"{dbuname} is not found", 403, {"WWW-Authenticate" : "Basic realm : 'login menu'"})

    if uname == dbuname  and upass == dbupass:
        try:
            token = create_token(uname)
            return jsonify({
                'username' : uname,
                'token' : token,
                'key' : app.config['SECRET_KEY']
                }) , 200
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
    token = create_token(username)

    return jsonify({
        'token' : token,
        'username' : username,
        'key' : app.config['SECRET_KEY'] 
    }), 200


@app.route('/api/feeds', methods = ['POST'])
@validate_token
def feeds():
    allFeeds = get_feeds()
    print(f'all feeds : {[i["_id"] for i in allFeeds]}')
    # allFeeds = [1,2,3]
    return jsonify({
        'code' : 200, 
        'feeds' : allFeeds
    }) , 200 

@app.route('/api/profile', methods = ["POST"])
@validate_token
def profile():
    username = request.json['username']
    details = get_login_details(username)
    details['_id'] = str(details['_id'])
    details['password'] = ""

    return jsonify({
            'code' : 200,
            'data' : details
        }) , 200


@app.route('/api/updateProfile', methods = ['POST'])
@validate_token
def updateProfile():
    details = request.json['details']
    print(f'''

    got it =========================> {details}

    ''')
    _id = update_user_details(details)
    print(_id)
    return jsonify({
        'code' : 200,
        'updated_id' : str(_id)
    }), 200


def nowtime():
    return datetime.now()

@app.route('/api/uploadForm', methods = ['POST'])
@validate_token
def uploadForm():
    username = request.json['username']
    img = request.json['img']
    caption = request.json['caption']
    time = nowtime().ctime()
    uploaded_id = uploadPost(username, caption, img, time)

    return jsonify({
        'code' : 200,
        'postId' : uploaded_id
    }) , 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)


