import os

from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS

from config import Config

# Route imports
from routes.predict_routes import predict_bp
from routes.model_routes import model_bp
from routes.analytics_routes import analytics_bp

# Model loader
from utils.model_loader import load_all


# ==========================================
# Create Flask Application
# ==========================================
def create_app():

    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Enable CORS (for React frontend)
    CORS(app)

    # ==========================================
    # Register API Routes
    # ==========================================
    app.register_blueprint(predict_bp, url_prefix=Config.API_PREFIX)
    app.register_blueprint(model_bp, url_prefix=Config.API_PREFIX)
    app.register_blueprint(analytics_bp, url_prefix=Config.API_PREFIX)

    # ==========================================
    # Serve Results Folder (Images for frontend)
    # ==========================================
    @app.route("/results/<path:filename>")
    def serve_results(filename):
        """
        Serve confusion matrices and performance plots
        """
        results_dir = os.path.join(Config.BASE_DIR, "results")
        return send_from_directory(results_dir, filename)

    # ==========================================
    # Health Check Endpoint
    # ==========================================
    @app.route("/")
    def health():
        return jsonify({
            "status": "running",
            "service": "Hate Speech Detection API",
            "version": "1.0"
        })

    return app


# ==========================================
# Create App Instance
# ==========================================
app = create_app()


# ==========================================
# Load AI Models at Startup
# ==========================================
print("\n==============================")
print(" Loading Hate Speech AI Models ")
print("==============================\n")

load_all()

print("\nModels loaded successfully!\n")


# ==========================================
# Run Server
# ==========================================
if __name__ == "__main__":

    print("==============================")
    print(" Starting Hate Speech Backend ")
    print("==============================\n")

    print(f"Host: {Config.HOST}")
    print(f"Port: {Config.PORT}")
    print(f"API Prefix: {Config.API_PREFIX}")
    print("Frontend URL: http://localhost:5173")
    print("\nServer running...\n")

    app.run(
        host=Config.HOST,
        port=Config.PORT,
        debug=Config.DEBUG
    )