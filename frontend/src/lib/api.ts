export interface LoanPredictionInput {
  Gender: string;
  Married: string;
  Dependents: string;
  Education: string;
  Self_Employed: string;
  ApplicantIncome: number;
  CoapplicantIncome: number;
  LoanAmount: number;
  Loan_Amount_Term: number;
  Credit_History: number;
  Property_Area: string;
}

export interface RiskFactor {
  factor: string;
  status: string;
  impact: string;
}

export interface LoanPredictionResult {
  status: 'Approved' | 'Rejected';
  is_approved: boolean;
  probability: number;
  probability_ratio: number;
  k_neighbors: number;
  raw_input: LoanPredictionInput;
  risk_factors: RiskFactor[];
  error?: string;
}

export interface ModelStats {
  best_k: number;
  accuracy: number;
  confusion_matrix: number[][];
  feature_names: string[];
  total_samples: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function predictLoanApproval(input: LoanPredictionInput): Promise<LoanPredictionResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Server error ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    console.error("API Prediction Error:", error);
    throw error;
  }
}

export async function getModelStats(): Promise<ModelStats> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/model-stats`);
    if (!res.ok) throw new Error('Failed to fetch model stats');
    return await res.json();
  } catch (error) {
    console.error("Model Stats Error:", error);
    // Fallback default stats for UI demo if backend is offline
    return {
      best_k: 19,
      accuracy: 0.6757,
      confusion_matrix: [[18, 19], [15, 22]],
      feature_names: ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History'],
      total_samples: 369
    };
  }
}
