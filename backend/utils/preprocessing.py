import re
import string

def clean_text(text: str) -> str:
    """
    Basic text cleaning for hate speech detection.
    """

    if not isinstance(text, str):
        return ""

    text = text.lower()

    # remove urls
    text = re.sub(r"http\S+|www\S+", "", text)

    # remove mentions
    text = re.sub(r"@\w+", "", text)

    # remove hashtags symbol
    text = re.sub(r"#", "", text)

    # remove numbers
    text = re.sub(r"\d+", "", text)

    # remove punctuation
    text = text.translate(str.maketrans("", "", string.punctuation))

    # remove extra spaces
    text = re.sub(r"\s+", " ", text).strip()

    return text


def preprocess_pipeline(text: str) -> str:
    """
    Complete preprocessing pipeline
    """

    cleaned = clean_text(text)

    return cleaned