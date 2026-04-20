import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'


from flask import Flask
from flask_cors import CORS

from config import MAX_CONTENT_LENGTH

from routes.test_routes    import test_bp
from routes.auth_routes    import auth_bp
from routes.farmer_routes  import farmer_bp
from routes.crop_routes    import crop_bp
from routes.image_routes   import image_bp
from routes.disease_routes import disease_bp
from routes.market_routes  import market_bp
from routes.agent_routes   import agent_bp
from routes.history_routes import history_bp


def create_app():
    app = Flask(__name__)
    CORS(app)   # Allow Android app to connect

    app.config["MAX_CONTENT_LENGTH"] = MAX_CONTENT_LENGTH

    # Register all blueprints
    app.register_blueprint(test_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(farmer_bp)
    app.register_blueprint(crop_bp)
    app.register_blueprint(image_bp)
    app.register_blueprint(disease_bp)
    app.register_blueprint(market_bp)
    app.register_blueprint(agent_bp)
    app.register_blueprint(history_bp)

    @app.route("/")
    def home():
        return "SmartKrishi Backend is running! Visit /test to verify."

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port=5000)
