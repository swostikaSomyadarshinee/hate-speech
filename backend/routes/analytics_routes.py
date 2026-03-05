from flask import Blueprint, jsonify

from utils.evaluation_loader import (
    load_comparison_table,
    load_confusion_matrices,
    load_performance_plots
)

analytics_bp = Blueprint("analytics", __name__)


@analytics_bp.route("/comparison", methods=["GET"])
def comparison():

    try:

        data = load_comparison_table()

        return jsonify({
            "comparison": data
        })

    except Exception as e:

        return jsonify({"error": str(e)}), 500


@analytics_bp.route("/confusion-matrices", methods=["GET"])
def confusion_matrices():

    try:

        files = load_confusion_matrices()

        return jsonify({
            "confusion_matrices": files
        })

    except Exception as e:

        return jsonify({"error": str(e)}), 500


@analytics_bp.route("/performance-plots", methods=["GET"])
def performance_plots():

    try:

        files = load_performance_plots()

        return jsonify({
            "plots": files
        })

    except Exception as e:

        return jsonify({"error": str(e)}), 500