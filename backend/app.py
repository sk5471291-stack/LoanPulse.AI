import os
import joblib
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for Next.js frontend

MODEL_DIR = os.path.dirname(os.path.abspath(__file__))

model = None
scaler = None
encoders = None
feature_names = None
model_stats = None

def load_artifacts():
    global model, scaler, encoders, feature_names, model_stats
    try:
        model = joblib.load(os.path.join(MODEL_DIR, 'knn_model.joblib'))
        scaler = joblib.load(os.path.join(MODEL_DIR, 'scaler.joblib'))
        encoders = joblib.load(os.path.join(MODEL_DIR, 'encoders.joblib'))
        feature_names = joblib.load(os.path.join(MODEL_DIR, 'feature_names.joblib'))
        model_stats = joblib.load(os.path.join(MODEL_DIR, 'model_stats.joblib'))
        print("Backend artifacts loaded successfully!")
    except Exception as e:
        print(f"Error loading artifacts: {e}")

load_artifacts()

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })

@app.route('/api/model-stats', methods=['GET'])
def get_stats():
    if model_stats is None:
        return jsonify({'error': 'Model stats not loaded'}), 500
    return jsonify(model_stats)

@app.route('/api/predict', methods=['POST'])
def predict():
    if model is None or scaler is None or encoders is None:
        load_artifacts()
        if model is None:
            return jsonify({'error': 'Model not trained or available'}), 500

    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No input JSON provided'}), 400

        # Features mapping & defaults
        raw_input = {
            'Gender': str(data.get('Gender', 'Male')),
            'Married': str(data.get('Married', 'Yes')),
            'Dependents': str(data.get('Dependents', '0')),
            'Education': str(data.get('Education', 'Graduate')),
            'Self_Employed': str(data.get('Self_Employed', 'No')),
            'ApplicantIncome': float(data.get('ApplicantIncome', 5000)),
            'CoapplicantIncome': float(data.get('CoapplicantIncome', 0)),
            'LoanAmount': float(data.get('LoanAmount', 120)),
            'Loan_Amount_Term': float(data.get('Loan_Amount_Term', 360)),
            'Credit_History': float(data.get('Credit_History', 1.0)),
            'Property_Area': str(data.get('Property_Area', 'Urban'))
        }

        # Build DataFrame
        df_input = pd.DataFrame([raw_input])

        # Encode categorical variables using saved encoders
        for col, le in encoders.items():
            if col in df_input.columns and col != 'Loan_Status':
                val = df_input[col].iloc[0]
                if val in le.classes_:
                    df_input[col] = le.transform([val])
                else:
                    df_input[col] = 0

        # Reorder columns as training feature_names
        df_input = df_input[feature_names]

        # Scale features
        scaled_input = scaler.transform(df_input)

        # Predict
        pred = model.predict(scaled_input)[0]
        probs = model.predict_proba(scaled_input)[0]
        
        # Get target classes if available
        classes = encoders['Loan_Status'].classes_ if 'Loan_Status' in encoders else ['N', 'Y']
        predicted_class_label = str(classes[pred])
        
        # Approval status ('Y' -> Approved, 'N' -> Rejected)
        is_approved = predicted_class_label == 'Y' or pred == 1
        status_text = 'Approved' if is_approved else 'Rejected'
        
        # Probability for 'Y' (Approved)
        approved_index = list(classes).index('Y') if 'Y' in classes else 1
        probability_score = float(probs[approved_index]) if len(probs) > approved_index else float(max(probs))

        # Risk breakdown calculation
        dti_ratio = (raw_input['LoanAmount'] * 1000) / max(raw_input['ApplicantIncome'] + raw_input['CoapplicantIncome'], 1)
        
        risk_factors = [
            {
                'factor': 'Credit History',
                'status': 'Positive' if raw_input['Credit_History'] == 1.0 else 'High Risk',
                'impact': 'High' if raw_input['Credit_History'] == 1.0 else 'Critical'
            },
            {
                'factor': 'Debt-to-Income Ratio',
                'status': 'Healthy' if dti_ratio < 35 else 'Elevated',
                'impact': 'Moderate'
            },
            {
                'factor': 'Property Area Risk',
                'status': raw_input['Property_Area'],
                'impact': 'Low'
            }
        ]

        return jsonify({
            'status': status_text,
            'is_approved': is_approved,
            'probability': round(probability_score * 100, 1),
            'probability_ratio': round(probability_score, 2),
            'k_neighbors': int(model.n_neighbors),
            'raw_input': raw_input,
            'risk_factors': risk_factors
        })

    except Exception as e:
        print(f"Prediction Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask server on port 5000...")
    app.run(host='0.0.0.0', port=5000, debug=True)
