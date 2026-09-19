"use client";

import { useState } from "react";
import { Search, Filter, CheckCircle2, XCircle, FileText, ArrowUpRight, TrendingUp, Users, DollarSign } from "lucide-react";

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const sampleApplications = [
    { id: "LP-001015", gender: "Male", income: "$5,720", loan: "$110,000", term: "360 mos", credit: "1.0 (Good)", area: "Urban", status: "Approved", prob: "88.2%", date: "2026-09-09" },
    { id: "LP-001022", gender: "Male", income: "$3,076", loan: "$126,000", term: "360 mos", credit: "1.0 (Good)", area: "Urban", status: "Approved", prob: "76.4%", date: "2026-09-09" },
    { id: "LP-001031", gender: "Male", income: "$5,000", loan: "$208,000", term: "360 mos", credit: "1.0 (Good)", area: "Urban", status: "Approved", prob: "82.1%", date: "2026-09-08" },
    { id: "LP-001035", gender: "Male", income: "$2,340", loan: "$100,000", term: "360 mos", credit: "0.0 (Bad)", area: "Urban", status: "Rejected", prob: "34.5%", date: "2026-09-08" },
    { id: "LP-001051", gender: "Male", income: "$3,276", loan: "$78,000", term: "360 mos", credit: "1.0 (Good)", area: "Urban", status: "Approved", prob: "91.0%", date: "2026-09-07" },
    { id: "LP-001056", gender: "Male", income: "$3,881", loan: "$147,000", term: "360 mos", credit: "0.0 (Bad)", area: "Rural", status: "Rejected", prob: "21.8%", date: "2026-09-07" },
    { id: "LP-001059", gender: "Male", income: "$13,633", loan: "$280,000", term: "240 mos", credit: "1.0 (Good)", area: "Urban", status: "Approved", prob: "94.5%", date: "2026-09-06" },
  ];

  const filteredApps = sampleApplications.filter((app) => {
    const matchesSearch = app.id.toLowerCase().includes(searchTerm.toLowerCase()) || app.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Applications History & Analytics</h1>
          <p className="text-slate-400 text-sm">Review processed loan applications and aggregate KNN model predictions.</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Total Evaluated</span>
            <Users className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">369</p>
          <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
            <TrendingUp className="h-3.5 w-3.5" /> +14% this month
          </span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Approval Rate</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400">68.4%</p>
          <span className="text-xs text-slate-400">252 Approved / 117 Flagged</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Average Loan Requested</span>
            <DollarSign className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">$146,410</p>
          <span className="text-xs text-slate-400">Average term: 342 months</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>KNN Cluster Accuracy</span>
            <ArrowUpRight className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-extrabold text-indigo-400">67.6%</p>
          <span className="text-xs text-slate-400">Optimal Neighbors k=19</span>
        </div>
      </div>

      {/* Filter & Table Section */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by ID or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Filter className="h-4 w-4 text-slate-400" />
            <span className="text-slate-400 font-medium">Status:</span>
            {["All", "Approved", "Rejected"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg border font-medium transition ${
                  statusFilter === st
                    ? "bg-indigo-600 border-indigo-500 text-white"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-white/5 text-slate-400 font-semibold uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="px-4 py-3">Application ID</th>
                <th className="px-4 py-3">Applicant Income</th>
                <th className="px-4 py-3">Loan Amount</th>
                <th className="px-4 py-3">Credit History</th>
                <th className="px-4 py-3">Property Area</th>
                <th className="px-4 py-3">Prediction Score</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-white/5 transition">
                  <td className="px-4 py-3 font-semibold text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-indigo-400" /> {app.id}
                  </td>
                  <td className="px-4 py-3">{app.income}</td>
                  <td className="px-4 py-3 font-medium text-white">{app.loan}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${app.credit.includes('1.0') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                      {app.credit}
                    </span>
                  </td>
                  <td className="px-4 py-3">{app.area}</td>
                  <td className="px-4 py-3 font-semibold text-indigo-300">{app.prob}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[11px] ${
                        app.status === "Approved"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {app.status === "Approved" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
