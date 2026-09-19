import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

def main():
    print("--- 1. Data Preprocessing ---")
    # Load the Loan dataset
    df = pd.read_csv('Loan dataset.csv')
    
    # Check if 'Loan_Status' exists
    if 'Loan_Status' not in df.columns:
        print("Warning: 'Loan_Status' column is missing from the dataset.")
        print("Generating synthetic 'Loan_Status' for demonstration purposes...")
        np.random.seed(42)
        df['Loan_Status'] = np.random.choice(['Y', 'N'], size=len(df))
    
    # Check for missing values
    print("Missing values before imputation:")
    print(df.isnull().sum())
    
    # Fill missing values
    # Numerical columns with median
    num_cols = df.select_dtypes(include=[np.number]).columns
    for col in num_cols:
        df[col] = df[col].fillna(df[col].median())
        
    # Categorical columns with mode
    cat_cols = df.select_dtypes(include=['object']).columns
    for col in cat_cols:
        df[col] = df[col].fillna(df[col].mode()[0])
        
    # Encode categorical variables into numerical values
    label_encoders = {}
    for col in cat_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le
        
    # Drop Loan_ID as it's not a predictive feature
    if 'Loan_ID' in df.columns:
        df = df.drop('Loan_ID', axis=1)
        
    # Split the dataset into 80% training and 20% testing
    X = df.drop('Loan_Status', axis=1)
    y = df['Loan_Status']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Standardize the features using StandardScaler
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    print("\n--- 2. Train K-Nearest Neighbors (KNN) Model ---")
    # Train a K-Nearest Neighbors classifier with the default parameters
    knn_default = KNeighborsClassifier()
    knn_default.fit(X_train_scaled, y_train)
    
    # Evaluate the model's performance using accuracy
    y_pred_default = knn_default.predict(X_test_scaled)
    acc_default = accuracy_score(y_test, y_pred_default)
    print(f"Accuracy of Default KNN Model: {acc_default:.4f}")
    
    # Experiment with different values of k
    print("\nExperimenting with different k values:")
    for k in [3, 5, 7]:
        knn_temp = KNeighborsClassifier(n_neighbors=k)
        knn_temp.fit(X_train_scaled, y_train)
        acc_temp = accuracy_score(y_test, knn_temp.predict(X_test_scaled))
        print(f"Accuracy for k={k}: {acc_temp:.4f}")
        
    print("\n--- 3. Hyperparameter Tuning ---")
    # Tune n_neighbors for KNN model using GridSearchCV
    param_grid = {'n_neighbors': np.arange(1, 21)}
    knn_cv = GridSearchCV(KNeighborsClassifier(), param_grid, cv=5, scoring='accuracy')
    knn_cv.fit(X_train_scaled, y_train)
    
    print(f"Best parameters from GridSearchCV: {knn_cv.best_params_}")
    best_knn = knn_cv.best_estimator_
    
    print("\n--- 4. Model Evaluation ---")
    y_pred_best = best_knn.predict(X_test_scaled)
    acc_best = accuracy_score(y_test, y_pred_best)
    
    print(f"Default KNN Accuracy: {acc_default:.4f}")
    cm_default = confusion_matrix(y_test, y_pred_default)
    print("Default KNN Confusion Matrix:")
    print(cm_default)
    
    print(f"\nTuned KNN Accuracy: {acc_best:.4f}")
    cm_best = confusion_matrix(y_test, y_pred_best)
    print("Tuned KNN Confusion Matrix:")
    print(cm_best)
    
    print("\n--- 5. Visualization ---")
    # Plot the Confusion Matrix for both models
    fig, axes = plt.subplots(1, 2, figsize=(12, 5))
    
    classes = label_encoders['Loan_Status'].classes_ if 'Loan_Status' in label_encoders else np.unique(y)
    
    disp_default = ConfusionMatrixDisplay(confusion_matrix=cm_default, display_labels=classes)
    disp_default.plot(ax=axes[0], cmap='Blues')
    axes[0].set_title('Default KNN Confusion Matrix')
    
    disp_best = ConfusionMatrixDisplay(confusion_matrix=cm_best, display_labels=classes)
    disp_best.plot(ax=axes[1], cmap='Blues')
    axes[1].set_title(f'Tuned KNN (k={knn_cv.best_params_["n_neighbors"]}) Confusion Matrix')
    
    plt.tight_layout()
    plt.savefig('confusion_matrices.png')
    print("Confusion matrices plot saved as 'confusion_matrices.png'.")

if __name__ == "__main__":
    main()
