"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, BarChart3, LayoutDashboard, Calculator, Settings, LogIn } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: Sparkles },
    { name: "Predictor", href: "/predict", icon: Calculator },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "KNN Stats", href: "/model-stats", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b1326]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-primary to-accent text-white shadow-lg glow-indigo">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white">
              LoanPulse<span className="text-indigo-400">.AI</span>
            </span>
            <span className="ml-2 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              KNN v1.2 Active
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Auth CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 border border-white/10"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Link>
          <Link
            href="/predict"
            className="hidden sm:inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90 shadow-md glow-emerald"
          >
            Test Eligibility
          </Link>
        </div>
      </div>
    </header>
  );
}
