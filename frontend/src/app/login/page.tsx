"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Mail, Lock, ArrowRight, Shield } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Demo Sign in successful for ${email || "Guest"}! Redirecting to Predictor...`);
    window.location.href = "/predict";
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl glass-card rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white/10 shadow-2xl">
        {/* Left Branding Side */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-white">LoanPulse.AI</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              Access AI Loan Intelligence Portal
            </h2>
            <p className="text-sm text-slate-300">
              Sign in to manage risk profiles, view history, and perform real-time KNN loan predictions.
            </p>
          </div>

          <div className="relative z-10 glass-card p-4 rounded-xl text-xs space-y-2 border border-white/10 mt-8">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <Shield className="h-4 w-4" /> Bank-grade Security
            </span>
            <p className="text-slate-400">Restricted access portal for authorized underwriters and credit officers.</p>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="p-8 space-y-6 flex flex-col justify-center bg-[#0d152a]">
          <div>
            <h3 className="text-2xl font-bold text-white">Sign In</h3>
            <p className="text-xs text-slate-400 mt-1">Enter your credentials to access the predictor</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@bank.com"
                  className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-400">
                <input type="checkbox" className="rounded bg-white/10 border-white/20 text-indigo-600" /> Remember me
              </label>
              <a href="#" className="text-indigo-400 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:opacity-90 transition glow-indigo"
            >
              Sign In to Portal <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="text-xs text-center text-slate-500">
            Demo Portal. Click Sign In to proceed directly to <Link href="/predict" className="text-indigo-400 underline">Predictor</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
