import os
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, confusion_matrix

def train_and_save():
    print("Training KNN Model for Loan Prediction...")
    
    # Path to dataset
    dataset_path = 'Loan dataset.csv'
    if not os.path.exists(dataset_path):
        dataset_path = '../Loan dataset.csv'
        
    df = pd.read_csv(dataset_path)
    
    # Target column check
    if 'Loan_Status' not in df.columns:
        print("Notice: 'Loan_Status' missing. Using synthetic target for training pipeline demo.")
        np.random.seed(42)
        df['Loan_Status'] = np.random.choice(['Y', 'N'], size=len(df), p=[0.69, 0.31])

    # Fill Missing Values
    num_cols = df.select_dtypes(include=[np.number]).columns
    for col in num_cols:
        df[col] = df[col].fillna(df[col].median())
        
    cat_cols = df.select_dtypes(include=['object']).columns
    for col in cat_cols:
        df[col] = df[col].fillna(df[col].mode()[0])

    # Label Encoders dictionary
    encoders = {}
    for col in cat_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))
        encoders[col] = le

    if 'Loan_ID' in df.columns:
        df = df.drop('Loan_ID', axis=1)

    X = df.drop('Loan_Status', axis=1)
    y = df['Loan_Status']

    feature_names = list(X.columns)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # GridSearch for best k
    param_grid = {'n_neighbors': np.arange(1, 21)}
    knn_cv = GridSearchCV(KNeighborsClassifier(), param_grid, cv=5, scoring='accuracy')
    knn_cv.fit(X_train_scaled, y_train)

    best_k = knn_cv.best_params_['n_neighbors']
    best_model = knn_cv.best_estimator_

    y_pred = best_model.predict(X_test_scaled)
    acc = accuracy_score(y_test, y_pred)
    cm = confusion_matrix(y_test, y_pred)

    os.makedirs('backend', exist_ok=True)
    
    # Save artifacts
    joblib.dump(best_model, 'backend/knn_model.joblib')
    joblib.dump(scaler, 'backend/scaler.joblib')
    joblib.dump(encoders, 'backend/encoders.joblib')
    joblib.dump(feature_names, 'backend/feature_names.joblib')
    
    # Save metadata for /api/model-stats
    stats = {
        'best_k': int(best_k),
        'accuracy': float(acc),
        'confusion_matrix': cm.tolist(),
        'feature_names': feature_names,
        'total_samples': len(df)
    }
    joblib.dump(stats, 'backend/model_stats.joblib')

    print(f"Model successfully saved! Best k={best_k}, Accuracy={acc:.4f}")

if __name__ == '__main__':
    train_and_save()
