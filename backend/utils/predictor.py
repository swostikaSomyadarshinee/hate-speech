import numpy as np
import torch
import tensorflow as tf
from utils.preprocessing import preprocess_pipeline
from utils.model_loader import models, artifacts


def predict_ml(text, model_name):

    clean = preprocess_pipeline(text)

    vectorizer = artifacts["tfidf"]
    model = models[model_name]

    X = vectorizer.transform([clean])

    prediction = int(model.predict(X)[0])

    # Handle models without predict_proba
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(X)[0]

    else:
        # fallback for LinearSVC
        decision = model.decision_function(X)

        import numpy as np
        exp_scores = np.exp(decision)
        probs = exp_scores / np.sum(exp_scores)

        probs = probs[0]

    return prediction, probs

def predict_dl(text, model_name):

    clean = preprocess_pipeline(text)

    tokenizer = artifacts["tokenizer"]
    model = models[model_name]

    seq = tokenizer.texts_to_sequences([clean])
    seq = tf.keras.preprocessing.sequence.pad_sequences(seq, maxlen=100)

    probs = model.predict(seq)[0]

    prediction = np.argmax(probs)

    return prediction, probs


def predict_bert(text):

    tokenizer = artifacts["bert_tokenizer"]
    model = models["bert"]

    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )

    outputs = model(**inputs)

    logits = outputs.logits

    probs = torch.softmax(logits, dim=1).detach().numpy()[0]

    prediction = np.argmax(probs)

    return prediction, probs


def unified_predict(text, model_name):

    if model_name in ["logistic", "svm"]:
        return predict_ml(text, model_name)

    elif model_name in ["cnn", "lstm"]:
        return predict_dl(text, model_name)

    elif model_name == "bert":
        return predict_bert(text)

    else:
        raise ValueError("Unknown model")