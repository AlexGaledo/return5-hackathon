from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from utils.firebase import get_all_projects

#browse projects
browse_projects_route_bp = Blueprint("browse_projects", __name__)
@browse_projects_route_bp.route('/', methods=['GET'])
@jwt_required()
def browse_projects():
    try:
        projects = get_all_projects()

        if not projects:
            return jsonify({'response': 'No projects found'}), 404
        return jsonify(projects), 200
    
    except Exception as e:
        print(f'Error fetching projects: {e}')
        return jsonify({'error': 'Internal server error'}), 500


    




