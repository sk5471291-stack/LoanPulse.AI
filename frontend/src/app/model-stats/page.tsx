"use client";

import { useEffect, useState } from "react";
import { getModelStats, ModelStats } from "@/lib/api";
import { BarChart3, Cpu, Layers, CheckCircle2, Sliders, Activity } from "lucide-react";

export default function ModelStatsPage() {
  const [stats, setStats] = useState<ModelStats | null>(null);

  useEffect(() => {
    getModelStats().then((data) => setStats(data));
  }, []);

  const kExperiments = [
    { k: 3, acc: 48.65, label: "k=3" },
    { k: 5, acc: 54.05, label: "k=5 (Default)" },
    { k: 7, acc: 40.54, label: "k=7" },
    { k: 13, acc: 62.10, label: "k=13" },
    { k: 19, acc: 67.57, label: "k=19 (GridSearch Best)" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 mb-2">
            <Cpu className="h-3.5 w-3.5" /> Scikit-Learn KNeighborsClassifier Analytics
          </div>
          <h1 className="text-3xl font-extrabold text-white">KNN Model Insights & Parameters</h1>
          <p className="text-slate-400 text-sm">Detailed performance analysis and hyperparameter tuning metrics from backend REST service.</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Optimal Neighbors Parameter</span>
            <Sliders className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">k = {stats?.best_k || 19}</p>
          <span className="text-xs text-indigo-300">Selected via 5-Fold GridSearchCV</span>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Cross-Validated Accuracy</span>
            <Activity className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-400">
            {stats ? (stats.accuracy * 100).toFixed(2) : "67.57"}%
          </p>
          <span className="text-xs text-slate-400">Standardized feature distance</span>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Training Dataset Samples</span>
            <Layers className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{stats?.total_samples || 369}</p>
          <span className="text-xs text-slate-400">11 Feature vectors encoded</span>
        </div>
      </div>

      {/* Grid: Confusion Matrix & Hyperparameter Experimentation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Confusion Matrix Card */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" /> Confusion Matrix (k={stats?.best_k || 19})
            </h3>
            <p className="text-xs text-slate-400">Breakdown of True Positives, True Negatives, False Positives, False Negatives.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5 space-y-1">
              <span className="text-slate-400 text-xs uppercase font-semibold block">True Rejected (TN)</span>
              <p className="text-3xl font-bold text-emerald-400">{stats?.confusion_matrix[0][0] ?? 18}</p>
              <span className="text-[10px] text-slate-500">Correctly Flagged Risk</span>
            </div>

            <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 p-5 space-y-1">
              <span className="text-slate-400 text-xs uppercase font-semibold block">False Approved (FP)</span>
              <p className="text-3xl font-bold text-rose-400">{stats?.confusion_matrix[0][1] ?? 19}</p>
              <span className="text-[10px] text-slate-500">Predicted Approval (Actual Risk)</span>
            </div>

            <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 p-5 space-y-1">
              <span className="text-slate-400 text-xs uppercase font-semibold block">False Rejected (FN)</span>
              <p className="text-3xl font-bold text-rose-400">{stats?.confusion_matrix[1][0] ?? 15}</p>
              <span className="text-[10px] text-slate-500">Predicted Risk (Actual Eligible)</span>
            </div>

            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5 space-y-1">
              <span className="text-slate-400 text-xs uppercase font-semibold block">True Approved (TP)</span>
              <p className="text-3xl font-bold text-emerald-400">{stats?.confusion_matrix[1][1] ?? 22}</p>
              <span className="text-[10px] text-slate-500">Correctly Approved</span>
            </div>
          </div>
        </div>

        {/* Hyperparameter Tuning Chart */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-400" /> Hyperparameter Experimentation (k-values)
            </h3>
            <p className="text-xs text-slate-400">Accuracy progression across different values of n_neighbors.</p>
          </div>

          <div className="space-y-4 pt-2">
            {kExperiments.map((exp) => (
              <div key={exp.k} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">{exp.label}</span>
                  <span className={exp.k === stats?.best_k ? "text-emerald-400 font-bold" : "text-slate-400"}>
                    {exp.acc.toFixed(2)}%
                  </span>
                </div>
                <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      exp.k === (stats?.best_k || 19)
                        ? "bg-gradient-to-r from-indigo-500 to-emerald-400"
                        : "bg-indigo-600/40"
                    }`}
                    style={{ width: `${exp.acc}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
