from flask import Blueprint
from utils.response import success_response

test_bp = Blueprint("test", __name__)

@test_bp.route("/test", methods=["GET"])
def test_api():
    return success_response("SmartKrishi API is working!", {
        "version":  "1.0",
        "status":   "ok"
    })
