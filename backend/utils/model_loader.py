import os
import joblib
import tensorflow as tf
from transformers import AutoTokenizer, AutoModelForSequenceClassification

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

models = {}
artifacts = {}


def load_ml_models():

    ml_path = os.path.join(BASE_DIR, "models/ml_models")

    models["logistic"] = joblib.load(os.path.join(ml_path, "logistic.pkl"))
    models["svm"] = joblib.load(os.path.join(ml_path, "svm_best.pkl"))


def load_dl_models():

    dl_path = os.path.join(BASE_DIR, "models/dl_models")

    models["cnn"] = tf.keras.models.load_model(os.path.join(dl_path, "cnn.h5"))
    models["lstm"] = tf.keras.models.load_model(os.path.join(dl_path, "lstm.h5"))


def load_bert():

    bert_path = os.path.join(BASE_DIR, "models/bert_model/checkpoint-4960")

    artifacts["bert_tokenizer"] = AutoTokenizer.from_pretrained(
        os.path.join(BASE_DIR, "models/bert_model")
    )

    models["bert"] = AutoModelForSequenceClassification.from_pretrained(bert_path)

def load_artifacts():

    art_path = os.path.join(BASE_DIR, "artifacts")

    artifacts["tfidf"] = joblib.load(os.path.join(art_path, "tfidf_vectorizer.pkl"))
    artifacts["label_encoder"] = joblib.load(os.path.join(art_path, "label_encoder.pkl"))


def load_tokenizer():

    tok_path = os.path.join(BASE_DIR, "tokenizer/tokenizer.pkl")

    artifacts["tokenizer"] = joblib.load(tok_path)


def load_all():

    print("Loading ML models...")
    load_ml_models()

    print("Loading DL models...")
    load_dl_models()

    print("Loading BERT model...")
    load_bert()

    print("Loading artifacts...")
    load_artifacts()

    print("Loading tokenizer...")
    load_tokenizer()

    print("All models loaded successfully!")