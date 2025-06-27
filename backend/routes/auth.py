
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
import bcrypt
from utils.firebase import get_user, create_user


login_route_bp = Blueprint("login",__name__)
register_route_bp = Blueprint("register",__name__)

@login_route_bp.route('/', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

  
    user_doc = get_user(username)

    if not user_doc:
        return jsonify({'response': 'error occured, user not found'}),404

    if not bcrypt.checkpw(password.encode(),user_doc['password'].encode()):
        return jsonify({'response': 'error occured incorrect password'}),401

    token = create_access_token(identity=user_doc['id'])

    return jsonify({
        'id' : user_doc['id'],
        'access_token' : token,
        'response ': 'user logged in'
    }),200



@register_route_bp.route('/',methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    hashed_pw = bcrypt.hashpw(password.encode(),bcrypt.gensalt()).decode()

    if get_user(username):
        return jsonify({'response':'username already used'}),404
    
    create_user(username, hashed_pw)
    
    return jsonify({'response': 'account created'}), 201