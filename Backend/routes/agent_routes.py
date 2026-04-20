from flask import Blueprint, request
from services.agent_service import handle_message
from utils.response import success_response, error_response

agent_bp = Blueprint("agent", __name__)

@agent_bp.route("/agent/chat", methods=["POST"])
def agent_chat():
    """
    Android body (JSON):
    {
        "message": "gehu ka bhav nagpur mein kya hai"
    }
    """
    try:
        data    = request.json or {}
        message = (data.get("message") or "").strip()

        if not message:
            return error_response("Message required hai")

        result = handle_message(message)
        return success_response("Agent response", result)

    except Exception as e:
        return error_response(str(e))
