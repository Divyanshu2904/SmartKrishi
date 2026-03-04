from flask import Blueprint, request
from services.market_service import get_market_rate
from utils.response import success_response, error_response

market_bp = Blueprint("market", __name__)

@market_bp.route("/market-rate", methods=["GET"])
def market_rate():
    try:
        crop = request.args.get("crop")
        market = request.args.get("market")

        if not crop or not market:
            return error_response("crop and market required")

        data = get_market_rate(crop, market)
        return success_response("Market data fetched", data)

    except Exception as e:
        return error_response(str(e))
