from pymongo import MongoClient
import pymongo

client = "mongodb+srv://freedb:freemondb@cluster0.g4aky.mongodb.net/freeedb?retryWrites=true&w=majority"
# client = "mongodb+srv://b33r:LrHpoFtRpBzoVDm8@cluster0.mzdpt.mongodb.net/opmdb?retryWrites=true&w=majority"
cluster = MongoClient(client)
db = cluster['freeedb']

def get_login_details(username):
    users = db['users']
    count = users.count_documents({})

    if count > 0:
        details = users.find_one({'username' : username})
        print(details)
        if details:
            return details['username'], details['password']

    return None, None


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


def update_user_details(details):
    users = db['users']
    details = users.update_one({'username': details['username']},{'$set' : {
        'name' : details['name'],
        'gender' : details['gender'],
        'age' : details['age']
    }})

    return details

def uploadPost(username, caption, img, date) :
    feeds = db['feeds']
    _id = feeds.insert_one({
        'username' : username,
        'caption' : caption,
        'img' : img,
        'date' : date 
    })

    return str(_id)

def get_feeds():
    feeds = db['feeds']
    allFeeds = feeds.find({}).sort('date', pymongo.DESCENDING)
    allFeeds = [{
        '_id' : str(feed['_id']),
        'username' : feed['username'],
        'caption' : feed['caption'],
        'img' : feed['img'],
        'date' : feed['date']
    } for feed in allFeeds ]

    return allFeeds

