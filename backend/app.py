import os
import threading
import logging

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
# Logging Setup
# ==========================================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

logger = logging.getLogger(__name__)


# ==========================================
# Global Model Status
# ==========================================
MODELS_READY = False


# ==========================================
# Model Loader Thread
# ==========================================
def load_models_background():
    """
    Load AI models without blocking server startup.
    This prevents Render port timeout.
    """
    global MODELS_READY

    try:
        logger.info("Loading AI models...")

        load_all()

        MODELS_READY = True

        logger.info("All models loaded successfully!")

    except Exception as e:
        logger.error(f"Model loading failed: {str(e)}")


# ==========================================
# Create Flask Application
# ==========================================
def create_app():

    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS
    CORS(app)

    logger.info("Flask application initialized")

    # ==========================================
    # Register API Routes
    # ==========================================
    app.register_blueprint(predict_bp, url_prefix=Config.API_PREFIX)
    app.register_blueprint(model_bp, url_prefix=Config.API_PREFIX)
    app.register_blueprint(analytics_bp, url_prefix=Config.API_PREFIX)

    logger.info("Routes registered successfully")

    # ==========================================
    # Serve Results (Confusion matrices, charts)
    # ==========================================
    @app.route("/results/<path:filename>")
    def serve_results(filename):
        results_dir = Config.RESULTS_DIR
        return send_from_directory(results_dir, filename)

    # ==========================================
    # Health Check Endpoint
    # ==========================================
    @app.route("/")
    def health():
        return jsonify({
            "status": "running",
            "service": "Hate Speech Detection API",
            "version": "1.0",
            "models_loaded": MODELS_READY
        })

    # ==========================================
    # Readiness Check
    # ==========================================
    @app.route("/ready")
    def readiness():
        if MODELS_READY:
            return jsonify({"status": "ready"})
        else:
            return jsonify({"status": "loading models"}), 503

    return app


# ==========================================
# Create App Instance
# ==========================================
app = create_app()


# ==========================================
# Run Server
# ==========================================
if __name__ == "__main__":

    logger.info("Starting Hate Speech Backend")

    # Start model loading in background
    threading.Thread(target=load_models_background).start()

    # Render requires PORT environment variable
    port = int(os.environ.get("PORT", Config.PORT))

    logger.info(f"Server starting on 0.0.0.0:{port}")

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )