import Link from "next/link";
import { Sparkles, ShieldCheck, Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#070d1a] py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-white">LoanPulse.AI</span>
          </div>
          <p className="text-sm text-slate-400 max-w-sm">
            AI-driven loan eligibility predictions powered by K-Nearest Neighbors machine learning algorithms. Real-time REST API integration.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Bank-Grade Privacy</span>
            <span className="flex items-center gap-1"><Cpu className="h-4 w-4 text-indigo-400" /> Scikit-Learn KNN</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Quick Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition">Landing Page</Link></li>
            <li><Link href="/predict" className="hover:text-white transition">Loan Predictor</Link></li>
            <li><Link href="/dashboard" className="hover:text-white transition">Applications Dashboard</Link></li>
            <li><Link href="/model-stats" className="hover:text-white transition">KNN Model Analytics</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Account & API</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/login" className="hover:text-white transition">Sign In</Link></li>
            <li><Link href="/settings" className="hover:text-white transition">Model Settings</Link></li>
            <li><a href="http://localhost:5000/api/health" target="_blank" className="hover:text-emerald-400 transition">API Health Status</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 mt-12 pt-6 border-t border-white/5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} LoanPulse AI. Built for Loan Approval Prediction.
      </div>
    </footer>
  );
}
