from utils.firebase import create_project, get_project
from flask_jwt_extended import jwt_required

from flask import Blueprint, jsonify, request

# Blueprints
create_project_route_bp = Blueprint("create_project", __name__)
get_project_route_bp = Blueprint("get_project", __name__)

# POST /create
@create_project_route_bp.route('/', methods=['POST'])
@jwt_required()
def create_project_route():
    try:
        request_data = request.get_json()
        if not request_data:
            return jsonify({'error': 'Invalid JSON input'}), 400

        project_data = {
            'project_creator': request_data.get('creator-id'),
            'project_title': request_data.get('project-title'),
            'project_description': request_data.get('project-description'),
            'project_goal': request_data.get('project-goal'),
            'project_duration': request_data.get('project-duration'),
            'funding_type': request_data.get('funding-type')
        }

        project_id = create_project(project_data)

        if project_id:
            return jsonify({
                'project_id': project_id,
                'response': 'Project created successfully'
            }), 200
        else:
            return jsonify({'response': 'Error: project already exists'}), 409

    except Exception as e:
        print(f'Error creating project: {e}')
        return jsonify({'error': 'Internal server error'}), 500


# POST /get
@get_project_route_bp.route('/', methods=['POST'])
@jwt_required()
def get_project_data():
    try:
        project_details = request.get_json()
        if not project_details or 'id' not in project_details:
            return jsonify({'error': 'Project ID required'}), 400

        project_data = get_project(project_details['id'])

        if project_data:
            return jsonify(project_data), 200
        else:
            return jsonify({'error': 'Project not found'}), 404

    except Exception as e:
        print(f'Error fetching project: {e}')
        return jsonify({'error': 'Internal server error'}), 500
