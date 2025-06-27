import firebase_admin
from firebase_admin import credentials, firestore
from config import Config

cred = credentials.Certificate(Config.firebase_key)


if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)


db = firestore.client()


#obtain user data from firebase via username
def get_user(username):
    try:
        users_ref = db.collection('users')
        query = users_ref.where('username','==', username).get()

        for doc in query:
            user_data = doc.to_dict()
            user_data['id'] = doc.id
            return user_data if user_data else None
        
    except Exception as e:
        print(f'unexpected error occured ${e}')

#create user inside firebase
def create_user(username,hashedpw):
    try:
        users_ref = db.collection('users')
        new_user = users_ref.document()
        new_user.set({
            'username': username,
            'password' : hashedpw
        })
        
    
    except Exception as e:
        print(f'unexpected error occured ${e}')

        return False

