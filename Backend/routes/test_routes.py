from flask import Blueprint
from utils.response import success_response

test_bp = Blueprint("test", __name__)

@test_bp.route("/test", methods=["GET"])
def test_api():
    return success_response("Test API working")
