
from flask import jsonify, request, Blueprint
from utils.chatbot import getChatbotResponse


assistantbot_route_bp = Blueprint('assistantbot', __name__)

@assistantbot_route_bp.route('/',methods=['POST'])
def assistbot ():
    data = request.get_json()
    history = data.get('history', [])
    prompt = data.get('user_prompt')
    
    sysin = """
    TechTopia is a ai powered crowdfunding platform that helps users to create and fund projects.
    you are a helpful chatbot assistant that helps users navigate in this website/platform.
    
    Introduce yourself first as an assitant chatbot named tobi.
    Then ask the user what they need help with.

    """
    response = getChatbotResponse(history,prompt,sysin)

    return jsonify({
        'response': response    
    })

    
