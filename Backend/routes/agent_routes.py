from flask import Blueprint, request
from services.agent_service import handle_message
from utils.response import success_response, error_response

agent_bp = Blueprint("agent", __name__)

@agent_bp.route("/agent/chat", methods=["POST"])
def agent_chat():
    try:
        data = request.json
        message = data.get("message")

        if not message:
            return error_response("Message required")

        result = handle_message(message)

        return success_response("Agent response", result)

    except Exception as e:
        return error_response(str(e))
