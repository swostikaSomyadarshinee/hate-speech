from flask import Blueprint, jsonify
from utils.model_loader import models


model_bp = Blueprint("models", __name__)


@model_bp.route("/models", methods=["GET"])
def get_models():

    try:

        model_list = list(models.keys())

        return jsonify({
            "available_models": model_list
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500