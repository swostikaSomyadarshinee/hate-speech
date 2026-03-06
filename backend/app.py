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


# ==========================================================
# Logging Configuration
# ==========================================================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)

logger = logging.getLogger(__name__)


# ==========================================================
# Global Model Status
# ==========================================================
MODELS_READY = False


# ==========================================================
# Background Model Loader
# ==========================================================
def load_models_background():
    """
    Loads AI models in a background thread so that
    the Flask server can start immediately.

    This prevents Render deployment timeouts.
    """

    global MODELS_READY

    try:
        logger.info("Starting AI model loading...")

        load_all()

        MODELS_READY = True

        logger.info("All AI models loaded successfully.")

    except Exception as e:
        logger.exception(f"Model loading failed: {e}")


# ==========================================================
# Create Flask Application
# ==========================================================
def create_app():

    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for React frontend
    CORS(app)

    logger.info("Flask application initialized")

    # ------------------------------------------------------
    # Register API Routes
    # ------------------------------------------------------
    app.register_blueprint(predict_bp, url_prefix=Config.API_PREFIX)
    app.register_blueprint(model_bp, url_prefix=Config.API_PREFIX)
    app.register_blueprint(analytics_bp, url_prefix=Config.API_PREFIX)

    logger.info("API routes registered")

    # ------------------------------------------------------
    # Serve Results (charts, confusion matrices)
    # ------------------------------------------------------
    @app.route("/results/<path:filename>")
    def serve_results(filename):
        """
        Serve result images to frontend
        """
        return send_from_directory(Config.RESULTS_DIR, filename)

    # ------------------------------------------------------
    # Health Check
    # ------------------------------------------------------
    @app.route("/")
    def health():
        return jsonify({
            "status": "running",
            "service": "Hate Speech Detection API",
            "version": "1.0",
            "models_loaded": MODELS_READY
        })

    # ------------------------------------------------------
    # Readiness Check
    # ------------------------------------------------------
    @app.route("/ready")
    def readiness():

        if MODELS_READY:
            return jsonify({
                "status": "ready",
                "models_loaded": True
            })

        return jsonify({
            "status": "initializing",
            "models_loaded": False
        }), 503

    return app


# ==========================================================
# Create Flask App Instance
# ==========================================================
app = create_app()


# ==========================================================
# Start Model Loading (Background)
# ==========================================================
model_thread = threading.Thread(
    target=load_models_background,
    daemon=True
)

model_thread.start()


# ==========================================================
# Run Server
# ==========================================================
if __name__ == "__main__":

    logger.info("Starting Hate Speech Detection Backend")

    # Render requires PORT environment variable
    port = int(os.environ.get("PORT", Config.PORT))

    logger.info(f"Server running on 0.0.0.0:{port}")
    logger.info(f"API prefix: {Config.API_PREFIX}")

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )