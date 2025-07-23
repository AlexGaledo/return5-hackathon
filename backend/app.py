from flask import Flask,jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from routes.auth import login_route_bp, register_route_bp
from routes.createProject import create_project_route_bp, get_project_route_bp
from routes.browseProjects import browse_projects_route_bp
from routes.assistantbot import assistantbot_route_bp


app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
jwt = JWTManager(app)


#app.register_blueprint(import route_bp from file, url prefix =)
app.register_blueprint(login_route_bp, url_prefix = '/login')
app.register_blueprint(register_route_bp, url_prefix = '/register')
app.register_blueprint(create_project_route_bp, url_prefix ='/create')
app.register_blueprint(get_project_route_bp, url_prefix = '/get-project')
app.register_blueprint(browse_projects_route_bp, url_prefix = '/browse-projects')
app.register_blueprint(assistantbot_route_bp, url_prefix = '/tobi')

@app.route('/')
def home():
    return jsonify({
        "response":"Welcome to return5backend v0.1"
    })


if __name__ == "__main__":
    app.run(debug=True)