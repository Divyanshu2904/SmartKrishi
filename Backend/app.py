from flask import Flask
from flask_cors import CORS
from routes.test_routes import test_bp
from routes.crop_routes import crop_bp
from routes.farmer_routes import farmer_bp
from routes.image_routes import image_bp
from config import MAX_CONTENT_LENGTH
from routes.market_routes import market_bp
from routes.agent_routes import agent_bp




def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(test_bp)
    app.register_blueprint(crop_bp)
    app.register_blueprint(farmer_bp)
    app.register_blueprint(image_bp)
    app.config["MAX_CONTENT_LENGTH"] = MAX_CONTENT_LENGTH
    app.register_blueprint(market_bp)
    app.register_blueprint(agent_bp)




    @app.route("/")
    def home():
        return "SmartKrishi Backend is running!"

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
