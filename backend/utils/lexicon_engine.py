import re
import numpy as np

# ==============================
# Hate Speech Lexicon Dictionary
# ==============================

HATE_LEXICON = {

    # slurs / extremist / dehumanizing
    "slurs": [
        "nigger", "faggot", "chink", "spic",
        "kike", "raghead", "tranny",
        "gook", "wetback", "paki", "coon", "jap",
        "gypsy", "towelhead", "sandnigger",
        "dyke", "homo", "shemale", "queer",
        "fairy", "lesbo",
        "retard", "cripple", "spaz", "mentalcase",
        "whitepower", "nazi", "supremacist",
        "terrorist", "extremist", "radical",
        "infidel", "heathen",
        "vermin", "parasite", "savage"
    ],

    # general insults / abusive language
    "insults": [
        "bitch", "slut", "whore", "cunt",
        "asshole", "bastard", "moron", "idiot",
        "stupid", "loser", "scumbag", "freak",
        "pervert", "degenerate"
    ],

    # violent intent / threat words
    "violence": [
        "lynch", "gas", "exterminate",
        "kill", "murder", "die", "burn",
        "hang", "shoot", "stab", "bomb",
        "massacre", "slaughter", "destroy",
        "annihilate", "eliminate", "wipeout"
    ],

    # discrimination / dehumanizing / targeting
    "discrimination": [
        "subhuman", "slave", "inferior",
        "animal", "beast", "monster",
        "trash", "garbage", "filthy",
        "traitor"
    ]
}

# Flatten lexicon for quick lookup
ALL_LEXICON_WORDS = set(
    word for category in HATE_LEXICON.values() for word in category
)


# ==============================
# Detect toxic words
# ==============================

def detect_lexicon_words(text):

    text = text.lower()

    detected = []

    for word in ALL_LEXICON_WORDS:

        if re.search(rf"\b{re.escape(word)}\b", text):
            detected.append(word)

    return detected


# ==============================
# Lexicon score
# ==============================

def compute_lexicon_score(text):
    """
    Computes lexicon score based on detected hate words
    """

    detected_words = detect_lexicon_words(text)

    score = len(detected_words)

    return score, detected_words


# ==============================
# Probability Boost
# ==============================

def boost_probabilities(model_probs, lex_score, alpha=0.6):
    """
    Boost offensive and hate probabilities using lexicon score
    """

    boosted = np.array(model_probs).copy()

    # label order: [clean, offensive, hate]
    CLEAN_INDEX = 0
    OFFENSIVE_INDEX = 1
    HATE_INDEX = 2

    boost = alpha * lex_score

    # reduce clean probability slightly
    boosted[CLEAN_INDEX] -= boost * 0.5

    # boost offensive + hate
    boosted[OFFENSIVE_INDEX] += boost * 0.6
    boosted[HATE_INDEX] += boost * 0.4

    # ensure no negative values
    boosted = np.clip(boosted, 0, None)

    # normalize
    boosted = boosted / np.sum(boosted)

    return boosted

# ==============================
# Fusion Decision
# ==============================

def fusion_prediction(model_prediction, model_probs, lex_score):
    """
    Combine ML prediction with lexicon score
    """

    fused_probs = boost_probabilities(model_probs, lex_score)

    fused_prediction = np.argmax(fused_probs)

    return fused_prediction, fused_probs


# ==============================
# Full Fusion Pipeline
# ==============================

def apply_lexicon_fusion(text, model_prediction, model_probs):
    """
    Complete lexicon fusion pipeline
    """

    lex_score, detected_words = compute_lexicon_score(text)

    fused_pred, fused_probs = fusion_prediction(
        model_prediction,
        model_probs,
        lex_score
    )

    return {
        "lexicon_score": lex_score,
        "detected_words": detected_words,
        "fused_prediction": int(fused_pred),
        "fused_probabilities": fused_probs.tolist()
    }