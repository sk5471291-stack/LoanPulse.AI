import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    best_k: 19,
    accuracy: 0.6757,
    confusion_matrix: [[1, 22], [2, 49]],
    feature_names: [
      'Gender', 'Married', 'Dependents', 'Education', 'Self_Employed',
      'ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term',
      'Credit_History', 'Property_Area'
    ],
    total_samples: 367
  });
}
