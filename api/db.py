from pymongo import MongoClient

client = "mongodb+srv://freedb:freemondb@cluster0.g4aky.mongodb.net/freeedb?retryWrites=true&w=majority"
# client = "mongodb+srv://b33r:LrHpoFtRpBzoVDm8@cluster0.mzdpt.mongodb.net/opmdb?retryWrites=true&w=majority"
cluster = MongoClient(client)
db = cluster['freeedb']

def get_login_details(username):
    users = db['users']
    userId, uname, upass = None, None, None
    count = users.count_documents({})

    if count > 0:
        details = users.find_one({'username' : username})
        print(details)
        if details:
            userId = details['_id']
            uname = details['username']
            upass = details['password']

    return userId, uname, upass


def store_user_details(name, username, password, age, gender):
    users = db['users']
    _id = users.insert_one({
        'name' : name,
        'username' : username,
        'password' : password,
        'age' : age,
        'gender' : gender
    })

    return _id, username 

