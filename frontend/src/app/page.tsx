import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Zap, BarChart3, CheckCircle2, UserCheck, Layers } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="space-y-24 py-12 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" /> Next-Gen KNN Loan Scoring Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Instant AI-Powered <br />
            <span className="bg-gradient-to-r from-indigo-400 via-primary to-emerald-400 bg-clip-text text-transparent">
              Loan Approval Predictions
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl">
            Evaluate applicant financial profiles in real time using our optimized K-Nearest Neighbors Machine Learning model. Fast, accurate, and explainable risk analysis.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              href="/predict"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3.5 text-base font-semibold text-white transition hover:opacity-90 shadow-lg shadow-indigo-600/30 glow-indigo"
            >
              Start Free Assessment <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/model-stats"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-base font-semibold text-slate-200 transition hover:bg-white/10"
            >
              View Model Accuracy
            </Link>
          </div>
        </div>

        {/* Floating Interactive Mockup Card */}
        <div className="relative flex justify-center">
          <div className="w-full max-w-md glass-card rounded-3xl p-6 shadow-2xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Sample Applicant #492</h3>
                  <p className="text-xs text-slate-400">Income: $6,000 | Loan: $120k</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                APPROVED
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Approval Confidence</span>
                <span className="text-emerald-400 font-bold">85.4%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full w-[85%]"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                <span className="text-slate-400 block">Credit History</span>
                <span className="text-white font-medium flex items-center gap-1 mt-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Clear (1.0)
                </span>
              </div>
              <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                <span className="text-slate-400 block">KNN Neighbors</span>
                <span className="text-indigo-400 font-medium mt-1 block">k = 19 Clusters</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white">Engineered for Precision & Speed</h2>
          <p className="text-slate-400">Powered by a Scikit-Learn KNN Classifier served via Python Flask REST API.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card glass-card-hover rounded-2xl p-6 space-y-4">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Sub-second Inference</h3>
            <p className="text-sm text-slate-400">
              Instantly process applicant features like income, debt, loan amount, and credit history with zero latency.
            </p>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-6 space-y-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Standardized Scaling</h3>
            <p className="text-sm text-slate-400">
              Uses StandardScaler and categorical encoding to ensure distance calculations are unbiased.
            </p>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-6 space-y-4">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">GridSearch Tuned</h3>
            <p className="text-sm text-slate-400">
              Hyperparameters automatically cross-validated across $k=1$ to $k=20$ to select optimal neighbors.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
