from flask import Blueprint, request, jsonify

from utils.predictor import unified_predict
from utils.lexicon_engine import apply_lexicon_fusion


predict_bp = Blueprint("predict", __name__)

# ==================================
# Class mapping (dataset → frontend)
# ==================================
# Dataset labels:
# 0 → hate
# 1 → offensive
# 2 → clean

CLASS_MAP = {
    0: "hate",
    1: "offensive",
    2: "clean"
}


@predict_bp.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    # ============================
    # Request Validation
    # ============================

    if not data or "text" not in data:
        return jsonify({"error": "Text input missing"}), 400

    text = str(data["text"]).strip()
    model_name = str(data.get("model", "bert")).lower()

    if len(text) == 0:
        return jsonify({"error": "Empty text"}), 400

    if len(text) > 500:
        return jsonify({"error": "Text too long (max 500 characters)"}), 400

    try:

        # ============================
        # Run Model Prediction
        # ============================

        prediction, probs = unified_predict(text, model_name)

        # Ensure Python native types
        prediction = int(prediction)
        probs = list(probs)

        # ============================
        # Apply Lexicon Fusion
        # ============================

        fusion_result = apply_lexicon_fusion(text, prediction, probs)

        fused_probs = fusion_result["fused_probabilities"]
        fused_prediction_index = int(fusion_result["fused_prediction"])

        # ============================
        # Convert Probabilities
        # ============================

        prob_dict = {
            CLASS_MAP[i]: float(probs[i])
            for i in range(len(probs))
        }

        fused_prob_dict = {
            CLASS_MAP[i]: float(fused_probs[i])
            for i in range(len(fused_probs))
        }

        # ============================
        # Confidence Score
        # ============================

        confidence = float(max(prob_dict.values()))

        # ============================
        # Decode Predictions
        # ============================

        original_label = CLASS_MAP.get(prediction, "clean")
        fused_label = CLASS_MAP.get(fused_prediction_index, "clean")

        # ============================
        # Final API Response
        # ============================

        response = {

            "model_used": model_name,

            "original_prediction": original_label,

            "confidence": confidence,

            "probabilities": prob_dict,

            "lexicon_score": int(fusion_result["lexicon_score"]),

            "detected_words": fusion_result["detected_words"],

            "fused_prediction": fused_label,

            "fused_probabilities": fused_prob_dict
        }

        return jsonify(response)

    except Exception as e:

        print("Prediction error:", str(e))

        return jsonify({"error": str(e)}), 500