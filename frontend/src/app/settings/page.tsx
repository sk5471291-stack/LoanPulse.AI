"use client";

import { useState, useEffect, useRef } from "react";
import { User, Sliders, Server, Save, CheckCircle, Upload, ShieldCheck, Camera, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState(user?.name || "Alex Morgan");
  const [email, setEmail] = useState(user?.email || "alex.morgan@gmail.com");
  const [role, setRole] = useState(user?.role || "Senior Risk Underwriter");
  const [authMethod, setAuthMethod] = useState<"google" | "password">(user?.method || "google");
  const [avatar, setAvatar] = useState(user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80");
  
  // Model & Server states
  const [kNeighbors, setKNeighbors] = useState(19);
  const [scalingAlgo, setScalingAlgo] = useState("StandardScaler (Z-Score)");
  const [apiUrl, setApiUrl] = useState("http://localhost:5000");
  
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role || "Senior Risk Underwriter");
      setAuthMethod(user.method || "google");
      if (user.avatar) setAvatar(user.avatar);
    }
  }, [user]);

  // Handle local image file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const newAvatarUrl = reader.result as string;
          setAvatar(newAvatarUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset avatar selection
  const presetAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      role,
      method: authMethod,
      avatar,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      {/* Header Title */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Profile & System Preferences</h1>
        <p className="text-slate-400 text-sm">Customize your user profile photo, credentials, KNN model parameters, and API endpoints.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* User Profile & Avatar Section */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <User className="h-5 w-5 text-indigo-400" /> User Profile & Photo
            </h3>
            {authMethod === "google" && (
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> Google Verified Gmail
              </span>
            )}
          </div>

          {/* Profile Photo Upload Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="relative group">
              <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-indigo-500/50 shadow-xl bg-slate-800">
                <img src={avatar} alt="Profile" className="h-full w-full object-cover" />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition text-white text-xs font-medium"
              >
                <Camera className="h-6 w-6 mb-1" />
                <span>Upload</span>
              </button>
            </div>

            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div>
                <h4 className="text-sm font-bold text-white">Profile Picture</h4>
                <p className="text-xs text-slate-400">Upload a custom image file or select from preset avatars.</p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                >
                  <Upload className="h-3.5 w-3.5" /> Upload Photo
                </button>

                <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
                  <span className="text-[11px] text-slate-400 font-medium">Presets:</span>
                  {presetAvatars.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatar(url)}
                      className={`h-7 w-7 rounded-full overflow-hidden border transition ${
                        avatar === url ? "border-emerald-400 ring-2 ring-emerald-400/30 scale-110" : "border-white/20 hover:opacity-80"
                      }`}
                    >
                      <img src={url} alt={`Preset ${idx}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* User Input Fields (Fully Selectable & Editable) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            {/* Full Name */}
            <div>
              <label className="text-slate-300 font-medium block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Email / Gmail Address (Editable & Selectable) */}
            <div>
              <label className="text-slate-300 font-medium block mb-1">Gmail / Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@gmail.com"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Assigned Role (Selectable Dropdown) */}
            <div>
              <label className="text-slate-300 font-medium block mb-1">Assigned Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl bg-[#111a33] border border-white/10 px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500 cursor-pointer transition"
              >
                <option value="Senior Risk Underwriter">Senior Risk Underwriter</option>
                <option value="Credit Officer">Credit Officer</option>
                <option value="Loan Analyst">Loan Analyst</option>
                <option value="Risk Manager">Risk Manager</option>
                <option value="Financial Officer">Financial Officer</option>
              </select>
            </div>

            {/* Authentication Method (Selectable Dropdown) */}
            <div>
              <label className="text-slate-300 font-medium block mb-1">Authentication Method</label>
              <select
                value={authMethod}
                onChange={(e) => setAuthMethod(e.target.value as "google" | "password")}
                className="w-full rounded-xl bg-[#111a33] border border-white/10 px-3 py-2.5 text-indigo-300 focus:outline-none focus:border-indigo-500 cursor-pointer font-medium transition"
              >
                <option value="google">Google OAuth 2.0 (Gmail)</option>
                <option value="password">Password Authentication</option>
              </select>
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
                min="1"
                max="50"
                value={kNeighbors}
                onChange={(e) => setKNeighbors(Number(e.target.value))}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Scaling Algorithm (Selectable Dropdown) */}
            <div>
              <label className="text-slate-300 font-medium block mb-1">Scaling Algorithm</label>
              <select
                value={scalingAlgo}
                onChange={(e) => setScalingAlgo(e.target.value)}
                className="w-full rounded-xl bg-[#111a33] border border-white/10 px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500 cursor-pointer transition"
              >
                <option value="StandardScaler (Z-Score)">StandardScaler (Z-Score)</option>
                <option value="MinMaxScaler (0-1)">MinMaxScaler (0-1)</option>
                <option value="RobustScaler (Median/IQR)">RobustScaler (Median/IQR)</option>
                <option value="Normalizer (L2 Norm)">Normalizer (L2 Norm)</option>
              </select>
            </div>
          </div>
        </div>

        {/* REST API Endpoint Settings */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Server className="h-5 w-5 text-cyan-400" /> API Endpoint Settings
          </h3>
          <div className="text-xs space-y-2">
            <label className="text-slate-300 font-medium block">Backend Server URL</label>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
            />
            <p className="text-slate-500">Production environment routes requests via serverless endpoints or custom REST backend.</p>
          </div>
        </div>

        {/* Save Controls */}
        <div className="flex items-center justify-between pt-2">
          {saved && (
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
              <CheckCircle className="h-4 w-4" /> Profile & Settings Saved Successfully!
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
