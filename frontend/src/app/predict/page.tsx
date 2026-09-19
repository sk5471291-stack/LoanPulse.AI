"use client";

import { useState } from "react";
import { predictLoanApproval, LoanPredictionInput, LoanPredictionResult } from "@/lib/api";
import { Sparkles, CheckCircle2, XCircle, Loader2, ShieldCheck, HelpCircle, DollarSign, Calculator, AlertTriangle } from "lucide-react";

export default function PredictorPage() {
  const [formData, setFormData] = useState<LoanPredictionInput>({
    Gender: "Male",
    Married: "Yes",
    Dependents: "0",
    Education: "Graduate",
    Self_Employed: "No",
    ApplicantIncome: 5400,
    CoapplicantIncome: 1800,
    LoanAmount: 140,
    Loan_Amount_Term: 360,
    Credit_History: 1.0,
    Property_Area: "Urban",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LoanPredictionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await predictLoanApproval(formData);
      setResult(res);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to fetch prediction from REST API server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-2">
            <Sparkles className="h-3.5 w-3.5" /> REST API Model Service Online
          </div>
          <h1 className="text-3xl font-extrabold text-white">Loan Eligibility Predictor</h1>
          <p className="text-slate-400 text-sm">Enter loan applicant parameters to trigger real-time KNN classification.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Form (7 Cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-white/10 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Personal Profile */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-xs">1</span>
                Applicant Profile
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                {/* Gender */}
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Gender</label>
                  <select
                    value={formData.Gender}
                    onChange={(e) => setFormData({ ...formData, Gender: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Male" className="bg-slate-900">Male</option>
                    <option value="Female" className="bg-slate-900">Female</option>
                  </select>
                </div>

                {/* Married */}
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Married</label>
                  <select
                    value={formData.Married}
                    onChange={(e) => setFormData({ ...formData, Married: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Yes" className="bg-slate-900">Yes</option>
                    <option value="No" className="bg-slate-900">No</option>
                  </select>
                </div>

                {/* Dependents */}
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Dependents</label>
                  <select
                    value={formData.Dependents}
                    onChange={(e) => setFormData({ ...formData, Dependents: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="0" className="bg-slate-900">0</option>
                    <option value="1" className="bg-slate-900">1</option>
                    <option value="2" className="bg-slate-900">2</option>
                    <option value="3+" className="bg-slate-900">3+</option>
                  </select>
                </div>

                {/* Education */}
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Education</label>
                  <select
                    value={formData.Education}
                    onChange={(e) => setFormData({ ...formData, Education: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Graduate" className="bg-slate-900">Graduate</option>
                    <option value="Not Graduate" className="bg-slate-900">Not Graduate</option>
                  </select>
                </div>

                {/* Self Employed */}
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Self Employed</label>
                  <select
                    value={formData.Self_Employed}
                    onChange={(e) => setFormData({ ...formData, Self_Employed: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="No" className="bg-slate-900">No</option>
                    <option value="Yes" className="bg-slate-900">Yes</option>
                  </select>
                </div>

                {/* Property Area */}
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Property Area</label>
                  <select
                    value={formData.Property_Area}
                    onChange={(e) => setFormData({ ...formData, Property_Area: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Urban" className="bg-slate-900">Urban</option>
                    <option value="Semiurban" className="bg-slate-900">Semiurban</option>
                    <option value="Rural" className="bg-slate-900">Rural</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-white/5" />

            {/* Section 2: Financial Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-xs">2</span>
                Financial & Credit Parameters
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Applicant Income ($/mo)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input
                      type="number"
                      value={formData.ApplicantIncome}
                      onChange={(e) => setFormData({ ...formData, ApplicantIncome: Number(e.target.value) })}
                      className="w-full rounded-xl bg-white/5 border border-white/10 pl-9 pr-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Co-applicant Income ($/mo)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input
                      type="number"
                      value={formData.CoapplicantIncome}
                      onChange={(e) => setFormData({ ...formData, CoapplicantIncome: Number(e.target.value) })}
                      className="w-full rounded-xl bg-white/5 border border-white/10 pl-9 pr-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Loan Amount ($ in Thousands)</label>
                  <input
                    type="number"
                    value={formData.LoanAmount}
                    onChange={(e) => setFormData({ ...formData, LoanAmount: Number(e.target.value) })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Loan Term (Months)</label>
                  <select
                    value={formData.Loan_Amount_Term}
                    onChange={(e) => setFormData({ ...formData, Loan_Amount_Term: Number(e.target.value) })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="120" className="bg-slate-900">120 Months (10 Yrs)</option>
                    <option value="180" className="bg-slate-900">180 Months (15 Yrs)</option>
                    <option value="240" className="bg-slate-900">240 Months (20 Yrs)</option>
                    <option value="360" className="bg-slate-900">360 Months (30 Yrs)</option>
                  </select>
                </div>
              </div>

              {/* Credit History Radio Toggle */}
              <div className="rounded-2xl bg-white/5 p-4 border border-white/5 space-y-2">
                <label className="text-xs font-semibold text-white flex items-center justify-between">
                  <span>Credit History Status</span>
                  <span className="text-slate-400 font-normal">Score &gt; 700?</span>
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, Credit_History: 1.0 })}
                    className={`py-2 rounded-xl border font-medium transition ${
                      formData.Credit_History === 1.0
                        ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300"
                        : "border-white/10 bg-white/5 text-slate-400"
                    }`}
                  >
                    1.0 (Good History)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, Credit_History: 0.0 })}
                    className={`py-2 rounded-xl border font-medium transition ${
                      formData.Credit_History === 0.0
                        ? "border-rose-500/50 bg-rose-500/20 text-rose-300"
                        : "border-white/10 bg-white/5 text-slate-400"
                    }`}
                  >
                    0.0 (No/Bad History)
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-primary to-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 hover:opacity-95 transition disabled:opacity-50 glow-indigo"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Querying Flask REST API...
                </>
              ) : (
                <>
                  <Calculator className="h-5 w-5" /> Calculate Loan Eligibility
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Prediction Result Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6 min-h-[480px] flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Prediction Result</h2>
              <p className="text-xs text-slate-400">Live evaluation from Flask KNN backend model</p>
            </div>

            {errorMsg && (
              <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 p-4 text-xs text-rose-300 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">REST API Error</span>
                  <span>{errorMsg}</span>
                </div>
              </div>
            )}

            {!result && !errorMsg && (
              <div className="my-auto text-center space-y-3 py-12">
                <div className="h-16 w-16 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                  <Calculator className="h-8 w-8" />
                </div>
                <h3 className="text-sm font-semibold text-slate-300">Ready for Assessment</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Fill in applicant parameters on the left and click "Calculate Loan Eligibility".
                </p>
              </div>
            )}

            {result && (
              <div className="space-y-6 animate-fadeIn">
                {/* Result Status Badge */}
                <div
                  className={`rounded-2xl p-6 border text-center space-y-2 ${
                    result.is_approved
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 glow-emerald"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-400 glow-rose"
                  }`}
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                    {result.is_approved ? (
                      <CheckCircle2 className="h-7 w-7 text-emerald-400" />
                    ) : (
                      <XCircle className="h-7 w-7 text-rose-400" />
                    )}
                  </div>
                  <h3 className="text-2xl font-extrabold uppercase tracking-wide">
                    LOAN {result.status}
                  </h3>
                  <p className="text-xs opacity-80">
                    {result.is_approved
                      ? "Applicant matches high-probability approval clusters."
                      : "Application flagged for high financial risk criteria."}
                  </p>
                </div>

                {/* Probability Score Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">Approval Confidence Score</span>
                    <span className={result.is_approved ? "text-emerald-400" : "text-rose-400"}>
                      {result.probability}%
                    </span>
                  </div>
                  <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        result.is_approved
                          ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                          : "bg-gradient-to-r from-rose-500 to-red-400"
                      }`}
                      style={{ width: `${result.probability}%` }}
                    ></div>
                  </div>
                </div>

                {/* Risk Factor Table */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk Factors Breakdown</h4>
                  <div className="space-y-2 text-xs">
                    {result.risk_factors.map((rf, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded-xl bg-white/5 p-3 border border-white/5">
                        <span className="text-slate-300 font-medium">{rf.factor}</span>
                        <span className={`font-bold ${rf.status === 'Positive' || rf.status === 'Healthy' ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {rf.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Model Cluster Info */}
                <div className="rounded-2xl bg-indigo-500/10 border border-indigo-500/20 p-4 text-xs space-y-1">
                  <span className="text-indigo-300 font-semibold block">KNN Cluster Info</span>
                  <p className="text-slate-400">
                    Evaluated against nearest <span className="text-indigo-400 font-bold">k = {result.k_neighbors}</span> applicant neighbors in feature vector space.
                  </p>
                </div>
              </div>
            )}

            <div className="text-xs text-center text-slate-500 pt-4 border-t border-white/5">
              Backend Server: <span className="text-emerald-400">http://localhost:5000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
