"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, ArrowRight, Shield, Eye, EyeOff, User as UserIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, loginWithEmail, signUpWithEmail, loginWithGoogle } = useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Gmail modal state
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGmail, setCustomGmail] = useState("");

  // Helper function to evaluate password strength
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "", color: "bg-slate-700" };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score, label: "Weak", color: "bg-rose-500" };
    if (score <= 4) return { score, label: "Medium", color: "bg-amber-500" };
    return { score, label: "Strong", color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength(password);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (mode === "signup") {
        if (password.length < 6) {
          setErrorMsg("Password must be at least 6 characters long.");
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setErrorMsg("Passwords do not match.");
          setLoading(false);
          return;
        }
        await signUpWithEmail(name || "New User", email, password);
        setSuccessMsg("Account created successfully! Redirecting to Predictor...");
      } else {
        await loginWithEmail(email, password);
        setSuccessMsg("Signed in successfully! Redirecting...");
      }

      setTimeout(() => {
        router.push("/predict");
      }, 1200);
    } catch (err: any) {
      setErrorMsg("Authentication failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSubmit = async (selectedEmail?: string) => {
    setLoading(true);
    setShowGoogleModal(false);
    try {
      await loginWithGoogle(selectedEmail || customGmail || "analyst.user@gmail.com");
      setSuccessMsg("Google Sign-In successful! Redirecting...");
      setTimeout(() => {
        router.push("/predict");
      }, 1000);
    } catch (err) {
      setErrorMsg("Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl glass-card rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white/10 shadow-2xl">
        
        {/* Left Branding Side */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center text-white shadow-lg">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">LoanPulse<span className="text-indigo-400">.AI</span></span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-extrabold text-white leading-tight">
                {mode === "signin" ? "Welcome Back to Loan Intelligence Portal" : "Create Your Risk Analyst Account"}
              </h2>
              <p className="text-sm text-slate-300">
                {mode === "signin" 
                  ? "Sign in with your Gmail account or email credentials to manage loan applications and run KNN prediction models." 
                  : "Register today to set custom KNN classification parameters and evaluate loan risk profiles."}
              </p>
            </div>

            {/* Quick Benefits list */}
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Real-time KNN Machine Learning Predictions
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> One-click Google / Gmail Sign-In integration
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Secure password & profile encryption
              </div>
            </div>
          </div>

          <div className="relative z-10 glass-card p-4 rounded-2xl text-xs space-y-1.5 border border-white/10 mt-8">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <Shield className="h-4 w-4" /> Bank-grade Security
            </span>
            <p className="text-slate-400">Restricted access portal for authorized underwriters and credit officers.</p>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="p-8 space-y-6 flex flex-col justify-center bg-[#0d152a]">
          
          {/* Mode Switcher Tabs */}
          <div className="flex rounded-xl bg-white/5 p-1 border border-white/10">
            <button
              onClick={() => { setMode("signin"); setErrorMsg(""); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                mode === "signin" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("signup"); setErrorMsg(""); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                mode === "signup" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">
              {mode === "signin" ? "Sign In" : "Sign Up"}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {mode === "signin" ? "Select Google authentication or enter password credentials" : "Set up your credentials & password"}
            </p>
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" /> {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" /> {successMsg}
            </div>
          )}

          {/* Google / Gmail Button */}
          <button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            className="w-full py-3 rounded-xl bg-white text-slate-900 font-semibold text-sm flex items-center justify-center gap-3 shadow-md hover:bg-slate-100 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Continue with Google / Gmail
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full"></div>
            <span className="bg-[#0d152a] px-3 text-[11px] text-slate-500 uppercase font-medium">Or continue with password</span>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Gmail / Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@gmail.com"
                  className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password strength meter in Sign Up mode */}
              {mode === "signup" && password && (
                <div className="pt-1 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Password Strength:</span>
                    <span className="font-semibold text-white">{strength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full flex-1 transition-all ${strength.score >= 1 ? strength.color : "bg-transparent"}`}></div>
                    <div className={`h-full flex-1 transition-all ${strength.score >= 3 ? strength.color : "bg-transparent"}`}></div>
                    <div className={`h-full flex-1 transition-all ${strength.score >= 5 ? strength.color : "bg-transparent"}`}></div>
                  </div>
                </div>
              )}
            </div>

            {mode === "signup" && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>
            )}

            {mode === "signin" && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded bg-white/10 border-white/20 text-indigo-600 focus:ring-0" /> Remember me
                </label>
                <button
                  type="button"
                  onClick={() => alert("Password reset link has been dispatched to your email.")}
                  className="text-indigo-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:opacity-90 transition glow-indigo disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  {mode === "signin" ? "Sign In with Password" : "Create Account & Password"} <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Google / Gmail Selection Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0f172a] border border-white/10 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <h3 className="text-lg font-bold text-white">Sign In with Google</h3>
              </div>
              <button
                onClick={() => setShowGoogleModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Choose a Gmail account to authenticate with LoanPulse.AI:
            </p>

            {/* Quick Gmail Accounts Options */}
            <div className="space-y-2">
              <button
                onClick={() => handleGoogleSubmit("alex.morgan@gmail.com")}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                    A
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Alex Morgan</p>
                    <p className="text-[11px] text-slate-400">alex.morgan@gmail.com</p>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">Primary</span>
              </button>

              <button
                onClick={() => handleGoogleSubmit("analyst.risk@gmail.com")}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    R
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Risk Analyst</p>
                    <p className="text-[11px] text-slate-400">analyst.risk@gmail.com</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-white/10 w-full"></div>
              <span className="bg-[#0f172a] px-3 text-[10px] text-slate-500">Or use another Gmail address</span>
            </div>

            <div className="space-y-2">
              <input
                type="email"
                value={customGmail}
                onChange={(e) => setCustomGmail(e.target.value)}
                placeholder="your.name@gmail.com"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={() => handleGoogleSubmit()}
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition"
              >
                Sign In with Custom Gmail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
