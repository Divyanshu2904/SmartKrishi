from flask import Blueprint, request
from services.market_service import get_market_rate
from services.history_service import save_market_history
from utils.response import success_response, error_response

market_bp = Blueprint("market", __name__)

@market_bp.route("/market-rate", methods=["GET"])
def market_rate():
    """
    Android query params:
      crop    : string  (e.g. wheat)
      market  : string  (e.g. nagpur)
      user_id : int     (optional)
    """
    try:
        crop    = (request.args.get("crop")   or "").strip().lower()
        market  = (request.args.get("market") or "").strip().lower()
        user_id = request.args.get("user_id")

        if not crop or not market:
            return error_response("crop aur market dono required hain")

        data = get_market_rate(crop, market)

        if user_id:
            save_market_history(
                int(user_id),
                crop, market,
                data["current_price"],
                data["trend"]
            )

        return success_response("Market data fetched", data)

    except Exception as e:
        return error_response(str(e))
