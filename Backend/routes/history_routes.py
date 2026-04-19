from flask import Blueprint, request
from services.history_service import get_user_history
from utils.response import success_response, error_response

history_bp = Blueprint("history", __name__)

@history_bp.route("/history/<int:user_id>", methods=["GET"])
def get_history(user_id):
    """
    Returns crop, image, market history for logged-in user.
    Android: GET /history/1
    """
    try:
        data = get_user_history(user_id)
        return success_response("History fetched", data)
    except Exception as e:
        return error_response(str(e))
