"use client";

import { useState, useEffect } from "react";
import { User, Sliders, Server, Save, CheckCircle, Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "Credit Analyst");
  const [email, setEmail] = useState(user?.email || "analyst@bank.com");
  const [kNeighbors, setKNeighbors] = useState(19);
  const [apiUrl, setApiUrl] = useState("http://localhost:5000");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      {/* Title */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Profile & Model Preferences</h1>
        <p className="text-slate-400 text-sm">Manage user credentials, authentication method, and backend API configuration.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* User Profile Settings */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <User className="h-5 w-5 text-indigo-400" /> User Profile Information
            </h3>
            {user?.method === "google" && (
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> Google Verified Account
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-300 font-medium block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-medium block mb-1">Email / Gmail Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  disabled={user?.method === "google"}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500 disabled:opacity-60"
                />
              </div>
            </div>
            <div>
              <label className="text-slate-300 font-medium block mb-1">Assigned Role</label>
              <input
                type="text"
                value={user?.role || "Senior Risk Underwriter"}
                disabled
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-slate-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-slate-300 font-medium block mb-1">Authentication Method</label>
              <input
                type="text"
                value={user?.method === "google" ? "Google OAuth 2.0 (Gmail)" : "Password Authentication"}
                disabled
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-indigo-400 cursor-not-allowed font-medium"
              />
            </div>
          </div>
        </div>

        {/* Model Preferences */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sliders className="h-5 w-5 text-emerald-400" /> KNN Classification Settings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-300 font-medium block mb-1">Default Neighbor parameter (k)</label>
              <input
                type="number"
                value={kNeighbors}
                onChange={(e) => setKNeighbors(Number(e.target.value))}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-medium block mb-1">Scaling Algorithm</label>
              <input
                type="text"
                defaultValue="StandardScaler (Z-Score)"
                disabled
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* REST API Endpoint Settings */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Server className="h-5 w-5 text-cyan-400" /> API Endpoint Settings
          </h3>
          <div className="text-xs space-y-2">
            <label className="text-slate-300 font-medium block">Backend URL</label>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
            />
            <p className="text-slate-500">Production API uses Next.js serverless routes or custom backend endpoint.</p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between">
          {saved && (
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
              <CheckCircle className="h-4 w-4" /> Profile & Settings Saved!
            </span>
          )}
          <button
            type="submit"
            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:opacity-90 transition glow-indigo"
          >
            <Save className="h-4 w-4" /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
