# HateSpeech AI --- Intelligent Hate Speech Detection System

An AI-powered web application that detects hate speech, offensive
language, and clean text from user input using Machine Learning, Deep
Learning, and Transformer models.

The system combines multiple NLP models with a lexicon-based fusion
engine to improve toxicity detection and provide detailed insights
through an interactive dashboard.

------------------------------------------------------------------------

# Project Overview

Social media platforms generate massive amounts of user content daily.
Detecting toxic language is critical for maintaining safe online
communities.

This project builds a **multi-model hate speech detection system** that:

-   Classifies text into **Hate Speech, Offensive Language, or Clean**
-   Uses **Logistic Regression, SVM, CNN, and BERT**
-   Enhances predictions using a **lexicon fusion engine**
-   Provides **real-time visualization dashboards**
-   Displays **model comparisons and performance analytics**

------------------------------------------------------------------------

# Key Features

## AI Text Analyzer

-   Detects hate speech, offensive language, or clean text
-   Real-time toxicity prediction
-   Highlights detected toxic words
-   Shows confidence scores
-   Displays live prediction monitoring chart
-   Shows confusion matrix of selected model

------------------------------------------------------------------------

# Multi-Model Support

The system evaluates multiple models:

  Model                 Type
  --------------------- ------------------
  Logistic Regression   Machine Learning
  SVM                   Machine Learning
  CNN                   Deep Learning
  BERT                  Transformer

------------------------------------------------------------------------

# Lexicon Fusion Engine

A custom lexicon system enhances predictions by detecting toxic
keywords.

Categories include:

-   Hate speech slurs
-   Offensive language
-   Violent threats
-   Dehumanizing language

This improves model reliability.

------------------------------------------------------------------------

# Model Comparison Dashboard

Compare performance of all models using:

-   Accuracy charts
-   F1 Score charts
-   Confusion matrices
-   Performance comparison table

------------------------------------------------------------------------

# Dataset Insights

Provides analytics about the dataset used to train models:

-   Tweet class distribution
-   Class ratio visualization
-   Dataset statistics
-   Toxic word cloud
-   Model performance plots

------------------------------------------------------------------------

# System Architecture

    User Input
         ↓
    React Frontend (Dashboard UI)
         ↓
    Flask Backend API
         ↓
    Model Prediction Engine
         ↓
    Lexicon Fusion Layer
         ↓
    Prediction + Confidence Scores
         ↓
    Interactive Visualizations

------------------------------------------------------------------------

# Project Structure

    hate_speech/
    │
    ├── backend/
    │   │
    │   ├── app.py
    │   ├── config.py
    │   ├── requirements.txt
    │   │
    │   ├── routes/
    │   │   ├── predict_routes.py
    │   │   ├── model_routes.py
    │   │   └── analytics_routes.py
    │   │
    │   ├── utils/
    │   │   ├── predictor.py
    │   │   ├── lexicon_engine.py
    │   │   └── model_loader.py
    │   │
    │   ├── models/
    │   │
    │   └── results/
    │       ├── confusion_matrices/
    │       └── performance_plots/
    │
    ├── frontend-app/
    │
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── services/
    │   │   └── styles/
    │
    │   ├── package.json
    │   └── vite.config.js

------------------------------------------------------------------------

# Backend Setup (Flask)

## 1 Install dependencies

Navigate to backend folder:

    cd backend

Create virtual environment:

    python -m venv venv

Activate environment:

### Windows

    venv\Scripts\activate

Install dependencies

    pip install -r requirements.txt

------------------------------------------------------------------------

## 2 Run Backend Server

    python app.py

Server will start on:

    http://localhost:5000

------------------------------------------------------------------------

# Frontend Setup (React + Vite)

Navigate to frontend folder:

    cd frontend-app

Install dependencies

    npm install

Run development server

    npm run dev

Frontend will start on:

    http://localhost:5173

------------------------------------------------------------------------

# Running the Full Application

Run two terminals.

### Terminal 1 (Backend)

    cd backend
    python app.py

### Terminal 2 (Frontend)

    cd frontend-app
    npm run dev

Open browser:

    http://localhost:5173

------------------------------------------------------------------------

# API Endpoint

## Predict Toxicity

**POST /api/predict**

Example request:

``` json
{
"text": "you are stupid",
"model": "bert"
}
```

Example response:

``` json
{
"model_used": "bert",
"original_prediction": "hate",
"fused_prediction": "offensive",
"confidence": 0.53,
"detected_words": ["stupid"],
"probabilities": {
"clean": 0.21,
"hate": 0.46,
"offensive": 0.33
}
}
```

------------------------------------------------------------------------

# Example Inputs

### Offensive

    you are stupid

### Hate Speech

    those people are parasites

### Clean

    everyone deserves respect

------------------------------------------------------------------------

# Technologies Used

## Backend

-   Python
-   Flask
-   Scikit-learn
-   PyTorch
-   Transformers
-   NumPy
-   Pandas

## Frontend

-   React
-   Vite
-   Chart.js
-   Recharts
-   CSS

------------------------------------------------------------------------

# Visual Dashboard Pages

### Home

Project overview and introduction.

### Analyzer

Interactive AI text toxicity detector.

### Comparison

Model performance comparison dashboard.

### Insights

Dataset analytics and visualization.

------------------------------------------------------------------------

# Future Improvements

-   Real-time social media monitoring
-   Online learning models
-   Explainable AI visualizations
-   Large-scale deployment
-   Integration with moderation tools

------------------------------------------------------------------------

# Final Year Project

**Hate Speech Detection using Machine Learning and Deep Learning**

------------------------------------------------------------------------

# License

This project is developed for **academic and educational purposes**.
