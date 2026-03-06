import os


class Config:
    """
    Global configuration settings for Hate Speech Detection API
    """

    # ==========================================
    # Base Directory
    # ==========================================
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

    # ==========================================
    # Model Directories
    # ==========================================
    MODELS_DIR = os.path.join(BASE_DIR, "models")

    ML_MODELS_DIR = os.path.join(MODELS_DIR, "ml_models")
    DL_MODELS_DIR = os.path.join(MODELS_DIR, "dl_models")
    BERT_MODEL_DIR = os.path.join(MODELS_DIR, "bert_model")

    # ==========================================
    # Artifacts
    # ==========================================
    ARTIFACTS_DIR = os.path.join(BASE_DIR, "artifacts")

    # ==========================================
    # Tokenizer
    # ==========================================
    TOKENIZER_DIR = os.path.join(BASE_DIR, "tokenizer")

    # ==========================================
    # Results (charts, confusion matrices)
    # ==========================================
    RESULTS_DIR = os.path.join(BASE_DIR, "results")

    # ==========================================
    # API Configuration
    # ==========================================
    API_PREFIX = "/api"

    # ==========================================
    # Flask Server Settings
    # ==========================================
    DEBUG = False
    HOST = "0.0.0.0"

    # Use environment variable if available
    PORT = int(os.environ.get("PORT", 10000))

    # ==========================================
    # Environment
    # ==========================================
    ENV = os.environ.get("ENVIRONMENT", "production")