import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(__file__))


def load_comparison_table():

    path = os.path.join(BASE_DIR, "results/final_comparison.csv")

    df = pd.read_csv(path)

    return df.to_dict(orient="records")


def load_confusion_matrices():

    folder = os.path.join(BASE_DIR, "results/confusion_matrices")

    files = sorted(os.listdir(folder))

    return files


def load_performance_plots():

    folder = os.path.join(BASE_DIR, "results/performance_plots")

    files = os.listdir(folder)

    return files