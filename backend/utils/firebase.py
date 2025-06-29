import os
import json
import base64
import firebase_admin
from firebase_admin import credentials, firestore
from config import Config 


try:
    firebase_key_json = base64.b64decode(Config.firebase_key).decode('utf-8')
    firebase_key_dict = json.loads(firebase_key_json)
except Exception as e:
    raise ValueError("Invalid Base64 or JSON in firebase_key") from e


if not firebase_admin._apps:
    cred = credentials.Certificate(firebase_key_dict)
    firebase_admin.initialize_app(cred)

db = firestore.client()

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
    

#find project by id
def get_project(project_id):
    try:
        project_ref = db.collection('projects').document(project_id)
        project_doc = project_ref.get()

        if project_doc.exists:
            data = project_doc.to_dict()
            data['id'] = project_doc.id
            return data
        else:
            return None
        
    except Exception as e:
        print(f'Error fetching project: {e}')
        return None
    

#create project in firebase return project id
def create_project(project_data):
    try:
        if does_project_exist(project_data):
            print("Duplicate project title found for this user.")
            return None

        projects_ref = db.collection('projects')
        new_project = projects_ref.document()
        project_data['id'] = new_project.id
        new_project.set(project_data)
        return new_project.id

    except Exception as e:
        print(f'Error creating project: {e}')
        return None
    
def does_project_exist(project_data):
    existing = db.collection('projects')\
        .where('project_title', '==', project_data['project_title']).get()
    
    return len(existing) > 0  # Explicitly check if any results exist


def get_all_projects():
    try:
        projects_ref = db.collection('projects')
        projects = projects_ref.limit(5).get()

        
        #limited to 6 projects for the response
        all_projects = []
        for project in projects:
            project_data = project.to_dict()
            project_data['id'] = project.id
            all_projects.append(project_data)
        
        return all_projects
    
    except Exception as e:
        print(f'Error fetching all projects: {e}')
        return []  # Return an empty list on error



