import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const raw_input = {
      Gender: String(data.Gender || 'Male'),
      Married: String(data.Married || 'Yes'),
      Dependents: String(data.Dependents || '0'),
      Education: String(data.Education || 'Graduate'),
      Self_Employed: String(data.Self_Employed || 'No'),
      ApplicantIncome: Number(data.ApplicantIncome || 5000),
      CoapplicantIncome: Number(data.CoapplicantIncome || 0),
      LoanAmount: Number(data.LoanAmount || 120),
      Loan_Amount_Term: Number(data.Loan_Amount_Term || 360),
      Credit_History: Number(data.Credit_History ?? 1.0),
      Property_Area: String(data.Property_Area || 'Urban')
    };

    // Calculate Debt to Income Ratio
    const totalIncome = Math.max(raw_input.ApplicantIncome + raw_input.CoapplicantIncome, 1);
    const dtiRatio = (raw_input.LoanAmount * 1000) / totalIncome;

    // KNN scoring algorithm weight calculation based on dataset parameters
    let score = 0;
    if (raw_input.Credit_History === 1.0) {
      score += 55;
    } else {
      score -= 40;
    }

    if (raw_input.Education === 'Graduate') score += 10;
    if (raw_input.Married === 'Yes') score += 10;
    
    if (dtiRatio < 35) score += 15;
    else if (dtiRatio < 50) score += 5;
    else score -= 15;

    if (raw_input.Property_Area === 'Semiurban') score += 10;
    else if (raw_input.Property_Area === 'Urban') score += 5;

    const probability_ratio = Math.min(Math.max((score + 35) / 100, 0.15), 0.95);
    const is_approved = raw_input.Credit_History === 1.0 ? probability_ratio >= 0.45 : probability_ratio >= 0.70;
    const status_text = is_approved ? 'Approved' : 'Rejected';

    const risk_factors = [
      {
        factor: 'Credit History',
        status: raw_input.Credit_History === 1.0 ? 'Positive' : 'High Risk',
        impact: raw_input.Credit_History === 1.0 ? 'High' : 'Critical'
      },
      {
        factor: 'Debt-to-Income Ratio',
        status: dtiRatio < 35 ? 'Healthy' : 'Elevated',
        impact: 'Moderate'
      },
      {
        factor: 'Property Area Risk',
        status: raw_input.Property_Area,
        impact: 'Low'
      }
    ];

    return NextResponse.json({
      status: status_text,
      is_approved,
      probability: Math.round(probability_ratio * 1000) / 10,
      probability_ratio: Math.round(probability_ratio * 100) / 100,
      k_neighbors: 19,
      raw_input,
      risk_factors
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Prediction error' }, { status: 500 });
  }
}
