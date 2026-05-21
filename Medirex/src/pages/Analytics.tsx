import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { REVENUE_CHART_DATA, PATIENT_CHART_DATA, DEPARTMENT_DATA, OCCUPANCY_DATA } from '@/constants/mockData';
import { BarChart3, TrendingUp, Users, Activity, DollarSign, Heart, Zap, Download, Calendar } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid
} from 'recharts';

const TABS = ['Overview', 'Revenue', 'Patients', 'Operations', 'AI Insights'] as const;

const DOCTOR_PERF = [
  { name: 'Dr. Harrison', patients: 4892, rating: 4.9, revenue: 284000, satisfaction: 96 },
  { name: 'Dr. Torres', patients: 3211, rating: 4.8, revenue: 193000, satisfaction: 94 },
  { name: 'Dr. Kim', patients: 6145, rating: 4.7, revenue: 312000, satisfaction: 91 },
  { name: 'Dr. Al-Hassan', patients: 2890, rating: 4.9, revenue: 168000, satisfaction: 97 },
  { name: 'Dr. Johnson', patients: 9811, rating: 4.8, revenue: 420000, satisfaction: 93 },
];

const OP_DATA = [
  { name: 'Mon', opd: 145, ipd: 42, emergency: 18 },
  { name: 'Tue', opd: 162, ipd: 38, emergency: 22 },
  { name: 'Wed', opd: 178, ipd: 45, emergency: 15 },
  { name: 'Thu', opd: 155, ipd: 51, emergency: 29 },
  { name: 'Fri', opd: 190, ipd: 47, emergency: 20 },
  { name: 'Sat', opd: 98, ipd: 33, emergency: 31 },
  { name: 'Sun', opd: 72, ipd: 28, emergency: 24 },
];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Overview');
  const [period, setPeriod] = useState('This Month');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">Analytics & Insights</h1>
            <p className="text-gray-500 text-sm mt-0.5">Real-time healthcare performance metrics & AI predictions</p>
          </div>
          <div className="flex gap-2">
            <select value={period} onChange={e => setPeriod(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
              <option>This Month</option><option>Last 3 Months</option><option>This Year</option>
            </select>
            <button className="btn-ghost border border-gray-200 text-sm py-2 px-3"><Download className="w-4 h-4" /> Export</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 overflow-x-auto w-fit">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Overview' && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Revenue (MTD)', value: '$580K', change: '+18%', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
                { label: 'Patients Served', value: '1,580', change: '+12%', icon: Users, color: 'text-primary-600 bg-primary-50' },
                { label: 'Bed Occupancy', value: '87%', change: '+4%', icon: Activity, color: 'text-amber-600 bg-amber-50' },
                { label: 'AI Accuracy', value: '94.7%', change: '+1.2%', icon: Zap, color: 'text-purple-600 bg-purple-50' },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="medical-card p-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><Icon className="w-5 h-5" /></div>
                    <p className="text-2xl font-bold text-gray-900 font-display">{s.value}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
                    <span className="text-xs font-semibold text-emerald-600">{s.change} vs last period</span>
                  </div>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-2 gap-5">
              <div className="medical-card p-5">
                <h3 className="font-bold text-gray-900 font-display mb-4">Monthly Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={REVENUE_CHART_DATA.slice(0, 6)}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0284C7" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                    <Tooltip formatter={(v: number) => [`$${(v/1000).toFixed(0)}K`, 'Revenue']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="value" stroke="#0284C7" strokeWidth={2} fill="url(#revGrad)" name="Revenue" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="medical-card p-5">
                <h3 className="font-bold text-gray-900 font-display mb-4">Patient Volume (Monthly)</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={PATIENT_CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="value" fill="#0284C7" radius={[6,6,0,0]} name="Outpatients" />
                    <Bar dataKey="secondary" fill="#10B981" radius={[6,6,0,0]} name="Inpatients" />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
              <div className="medical-card p-5">
                <h3 className="font-bold text-gray-900 font-display mb-4 text-sm">Department Distribution</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={DEPARTMENT_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={0}>
                      {DEPARTMENT_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ borderRadius: '10px', border: 'none' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1.5 mt-2">
                  {DEPARTMENT_DATA.map(d => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: d.color }} /><span className="text-xs text-gray-600">{d.name}</span></div>
                      <span className="text-xs font-semibold text-gray-900">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="medical-card p-5 lg:col-span-2">
                <h3 className="font-bold text-gray-900 font-display mb-4 text-sm">Weekly Bed Occupancy Rate</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={OCCUPANCY_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                    <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" dataKey="value" stroke="#0284C7" strokeWidth={2} dot={{ r: 4 }} name="Occupancy" />
                    <Line type="monotone" dataKey="secondary" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} name="Target" />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Revenue' && (
          <div className="space-y-5 animate-fade-in">
            <div className="medical-card p-5">
              <h3 className="font-bold text-gray-900 font-display mb-4">Annual Revenue Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={REVENUE_CHART_DATA}>
                  <defs>
                    <linearGradient id="revFull" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284C7" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip formatter={(v: number) => [`$${(v/1000).toFixed(0)}K`]} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="value" stroke="#0284C7" strokeWidth={2} fill="url(#revFull)" name="Revenue" />
                  <Area type="monotone" dataKey="secondary" stroke="#10B981" strokeWidth={2} fill="none" name="Collections" />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'Gross Revenue', value: '$7.05M', sub: 'YTD 2026', color: 'text-primary-600' },
                { label: 'Net Collections', value: '$6.32M', sub: '89.7% collection rate', color: 'text-emerald-600' },
                { label: 'Insurance Claims', value: '$4.1M', sub: '65% of total revenue', color: 'text-purple-600' },
              ].map(r => (
                <div key={r.label} className="medical-card p-5 text-center">
                  <p className={`text-3xl font-bold font-display ${r.color}`}>{r.value}</p>
                  <p className="font-semibold text-gray-900 mt-1">{r.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{r.sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Patients' && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'New Patients (MTD)', value: '320', change: '+14%', color: 'text-primary-600 bg-primary-50' },
                { label: 'Returning Patients', value: '1,260', change: '+10%', color: 'text-emerald-600 bg-emerald-50' },
                { label: 'Avg Wait Time', value: '18 min', change: '-8%', color: 'text-amber-600 bg-amber-50' },
                { label: 'Patient Satisfaction', value: '94.2%', change: '+1.8%', color: 'text-purple-600 bg-purple-50' },
              ].map(s => (
                <div key={s.label} className={`p-4 rounded-2xl ${s.color}`}>
                  <p className="text-2xl font-bold font-display">{s.value}</p>
                  <p className="text-sm font-medium mt-0.5 opacity-80">{s.label}</p>
                  <p className="text-xs font-semibold text-emerald-600 mt-0.5">{s.change} vs last period</p>
                </div>
              ))}
            </div>

            <div className="medical-card p-5">
              <h3 className="font-bold text-gray-900 font-display mb-4">Doctor Performance Overview</h3>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead><tr><th>Doctor</th><th>Total Patients</th><th>Rating</th><th>Revenue</th><th>Satisfaction</th><th>Performance</th></tr></thead>
                  <tbody>
                    {DOCTOR_PERF.map(doc => (
                      <tr key={doc.name}>
                        <td className="font-medium text-gray-900 text-sm">{doc.name}</td>
                        <td>{doc.patients.toLocaleString()}</td>
                        <td><span className="font-semibold text-amber-500">⭐ {doc.rating}</span></td>
                        <td className="font-semibold text-emerald-600">${(doc.revenue/1000).toFixed(0)}K</td>
                        <td>{doc.satisfaction}%</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full" style={{ width: `${doc.satisfaction}%` }} />
                            </div>
                            <span className="text-xs text-gray-500">{doc.satisfaction}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="medical-card p-5">
              <h3 className="font-bold text-gray-900 font-display mb-4">Age & Gender Distribution</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[['0-18', '12%', '#BAE6FD'], ['19-35', '28%', '#0284C7'], ['36-50', '35%', '#0369A1'], ['51-65', '18%', '#075985'], ['65+', '7%', '#0C4A6E']].map(([group, pct, color]) => (
                  <div key={group} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: color }}>
                      <span className="text-white text-xs font-bold">{group}</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{pct}</p>
                      <p className="text-xs text-gray-500">of patients</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Operations' && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Avg Response Time', value: '6.2 min', sub: 'Emergency', color: 'text-red-600 bg-red-50' },
                { label: 'Staff Utilization', value: '84%', sub: 'This week', color: 'text-primary-600 bg-primary-50' },
                { label: 'OR Utilization', value: '79%', sub: 'Operating rooms', color: 'text-purple-600 bg-purple-50' },
                { label: 'Equipment Uptime', value: '98.1%', sub: 'Critical equipment', color: 'text-emerald-600 bg-emerald-50' },
              ].map(s => (
                <div key={s.label} className={`p-4 rounded-2xl ${s.color}`}>
                  <p className="text-2xl font-bold font-display">{s.value}</p>
                  <p className="text-sm font-medium">{s.label}</p>
                  <p className="text-xs opacity-70">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="medical-card p-5">
              <h3 className="font-bold text-gray-900 font-display mb-4">Weekly Patient Flow (OPD vs IPD vs Emergency)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={OP_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="opd" fill="#0284C7" radius={[4,4,0,0]} name="OPD" />
                  <Bar dataKey="ipd" fill="#10B981" radius={[4,4,0,0]} name="IPD" />
                  <Bar dataKey="emergency" fill="#EF4444" radius={[4,4,0,0]} name="Emergency" />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { label: 'Bed Turnover Rate', value: '4.2 days', desc: 'Average length of stay' },
                { label: 'Readmission Rate', value: '8.3%', desc: '30-day readmission rate' },
                { label: 'Surgery Success Rate', value: '97.8%', desc: 'All surgical procedures' },
                { label: 'Patient Throughput', value: '1,580/mo', desc: 'Monthly patient throughput' },
              ].map(m => (
                <div key={m.label} className="medical-card p-5">
                  <p className="text-2xl font-bold text-gray-900 font-display">{m.value}</p>
                  <p className="font-semibold text-gray-800 mt-1">{m.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'AI Insights' && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 bg-primary-50 border border-primary-200 rounded-xl flex items-center gap-3">
              <Zap className="w-5 h-5 text-primary-600 flex-shrink-0" />
              <p className="text-sm text-primary-700 font-medium">AI engine analyzing {period.toLowerCase()} data across 6 hospitals · 94.7% model accuracy</p>
              <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full animate-pulse flex-shrink-0" />
            </div>
            {[
              { title: 'Predicted ICU Surge', desc: 'Models predict 94% ICU capacity by 18:00 today. Recommend activating overflow protocol and notifying on-call staff.', confidence: 82, type: 'Operations Risk', color: 'border-red-200 bg-red-50', action: 'Activate Protocol' },
              { title: 'Revenue Optimization', desc: 'AI identified $180K in potential unbilled charges from cardiology procedures in Q1. Automated claim generation recommended.', confidence: 91, type: 'Financial', color: 'border-emerald-200 bg-emerald-50', action: 'Generate Claims' },
              { title: 'Readmission Prevention', desc: '8 high-risk patients flagged for readmission within 30 days. Proactive care management initiated for 6 of 8 cases.', confidence: 87, type: 'Clinical', color: 'border-amber-200 bg-amber-50', action: 'View Patients' },
              { title: 'Supply Chain Alert', desc: 'Predicted stockout of Insulin Glargine in 12 days based on current consumption rates. Emergency reorder recommended.', confidence: 95, type: 'Supply Chain', color: 'border-primary-200 bg-primary-50', action: 'Order Now' },
            ].map(insight => (
              <div key={insight.title} className={`p-5 rounded-2xl border ${insight.color}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-primary-600" />
                      <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">{insight.type}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 font-display">{insight.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{insight.desc}</p>
                    <button className="mt-3 btn-primary text-xs py-1.5 px-3">{insight.action} →</button>
                  </div>
                  <div className="text-center flex-shrink-0">
                    <div className="text-2xl font-bold text-gray-900 font-display">{insight.confidence}%</div>
                    <div className="text-xs text-gray-500">confidence</div>
                    <div className="mt-2 h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-500 rounded-full" style={{ width: `${insight.confidence}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
