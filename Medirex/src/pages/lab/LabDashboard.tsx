import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import KPICard from '@/components/features/KPICard';
import { MOCK_LAB_TESTS } from '@/constants/mockData';
import { Microscope, FlaskConical, FileText, Clock, Search, Plus, Eye, Download, CheckCircle, ChevronRight, Check, X } from 'lucide-react';
import type { LabTest } from '@/types';

const STATUS_COLORS: Record<string, string> = {
  'Pending': 'badge bg-gray-100 text-gray-600',
  'Sample Collected': 'badge bg-sky-100 text-sky-700',
  'Processing': 'badge bg-amber-100 text-amber-700',
  'Completed': 'badge badge-success',
  'Report Ready': 'badge bg-emerald-100 text-emerald-700',
};

const PRIORITY_COLORS: Record<string, string> = {
  'Normal': 'badge badge-primary',
  'Urgent': 'badge badge-warning',
  'STAT': 'badge badge-danger',
};

const PIPELINE_STAGES = ['Order Received', 'Sample Collected', 'In Processing', 'Analysis Done', 'Report Ready'];

interface ReportModalProps { test: LabTest; onClose: () => void; }
function ReportModal({ test, onClose }: ReportModalProps) {
  const [status, setStatus] = useState(test.status);
  const [result, setResult] = useState(test.result || '');
  const [saved, setSaved] = useState(false);
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full animate-scale-in overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
        {saved ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3"><Check className="w-7 h-7 text-emerald-600" /></div>
            <p className="font-bold text-gray-900 font-display">Report Updated</p>
            <p className="text-sm text-gray-500 mt-1">{test.patientName} — {test.testName}</p>
            <button onClick={onClose} className="btn-primary mt-4">Done</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 font-display">Lab Report</h3>
              <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'Patient', value: test.patientName },
                { label: 'Test', value: test.testName },
                { label: 'Code', value: test.testCode },
                { label: 'Date', value: test.date },
                { label: 'Category', value: test.category },
                { label: 'Priority', value: test.priority },
              ].map(f => (
                <div key={f.label} className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-0.5">{f.label}</p>
                  <p className="font-semibold text-sm text-gray-900">{f.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Update Status</label>
                <div className="flex gap-2 flex-wrap">
                  {Object.keys(STATUS_COLORS).map(s => (
                    <button key={s} onClick={() => setStatus(s as LabTest['status'])}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl border-2 transition-all ${status === s ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-600'}`}>{s}</button>
                  ))}
                </div>
              </div>
              {(status === 'Completed' || status === 'Report Ready') && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Result</label>
                  <textarea value={result} onChange={e => setResult(e.target.value)} rows={3} className="input-medical resize-none" placeholder="Enter test result..." />
                  {test.normalRange && <p className="text-xs text-gray-400 mt-1">Normal range: {test.normalRange}</p>}
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={onClose} className="flex-1 btn-ghost border border-gray-200 justify-center">Close</button>
              <button onClick={() => setSaved(true)} className="flex-1 btn-primary justify-center">
                <CheckCircle className="w-4 h-4" /> Save Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function LabDashboard() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewReport, setViewReport] = useState<string | null>(null);
  const [tests, setTests] = useState(MOCK_LAB_TESTS);
  const [toast, setToast] = useState<string | null>(null);
  const [showNewTest, setShowNewTest] = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const filtered = tests.filter(t =>
    (statusFilter === 'All' || t.status === statusFilter) &&
    (t.patientName.toLowerCase().includes(search.toLowerCase()) || t.testName.toLowerCase().includes(search.toLowerCase()))
  );

  const pending = tests.filter(t => t.status === 'Pending').length;
  const processing = tests.filter(t => t.status === 'Processing' || t.status === 'Sample Collected').length;
  const ready = tests.filter(t => t.status === 'Report Ready' || t.status === 'Completed').length;

  const selectedTest = viewReport ? tests.find(t => t.id === viewReport) : null;

  const pipelineCounts: Record<string, number> = {
    'Order Received': tests.filter(t => t.status === 'Pending').length,
    'Sample Collected': tests.filter(t => t.status === 'Sample Collected').length,
    'In Processing': tests.filter(t => t.status === 'Processing').length,
    'Analysis Done': tests.filter(t => t.status === 'Completed').length,
    'Report Ready': tests.filter(t => t.status === 'Report Ready').length,
  };

  return (
    <DashboardLayout>
      {selectedTest && <ReportModal test={selectedTest} onClose={() => setViewReport(null)} />}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}

      {showNewTest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNewTest(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-gray-900 font-display mb-4">New Test Order</h3>
            <div className="space-y-3">
              <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Patient Name</label><input className="input-medical" placeholder="Search patient..." /></div>
              <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Test Type</label>
                <select className="input-medical">
                  <option>Complete Blood Count (CBC)</option><option>Lipid Panel</option><option>HbA1c</option><option>Kidney Function Panel</option><option>MRI Brain</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Priority</label>
                  <select className="input-medical"><option>Normal</option><option>Urgent</option><option>STAT</option></select>
                </div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Ordered By</label><input className="input-medical" placeholder="Dr. Name" /></div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowNewTest(false)} className="flex-1 btn-ghost border border-gray-200 justify-center">Cancel</button>
              <button onClick={() => { setShowNewTest(false); showToast('New test order created'); }} className="flex-1 btn-primary justify-center">Create Order</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">Laboratory Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">Test management, sample tracking & digital reports</p>
          </div>
          <button onClick={() => setShowNewTest(true)} className="btn-primary text-sm py-2.5">
            <Plus className="w-4 h-4" /> New Test Order
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Total Tests Today" value={tests.length} icon={FlaskConical} change={8} />
          <KPICard title="Pending Collection" value={pending} icon={Clock} iconColor="text-amber-600" iconBg="bg-amber-50" />
          <KPICard title="In Processing" value={processing} icon={Microscope} iconColor="text-primary-600" />
          <KPICard title="Reports Ready" value={ready} icon={CheckCircle} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
        </div>

        {/* Sample Tracking Pipeline */}
        <div className="medical-card p-5">
          <h2 className="font-bold text-gray-900 font-display mb-4">Sample Tracking Pipeline</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {PIPELINE_STAGES.map((stage, i) => (
              <React.Fragment key={stage}>
                <button onClick={() => setStatusFilter(i === 0 ? 'Pending' : i === 1 ? 'Sample Collected' : i === 2 ? 'Processing' : i === 3 ? 'Completed' : 'Report Ready')}
                  className={`flex-shrink-0 rounded-xl p-4 min-w-[140px] text-center transition-all hover:scale-105 ${
                    i === 0 ? 'bg-gray-100 text-gray-700' :
                    i === 1 ? 'bg-sky-50 text-sky-700' :
                    i === 2 ? 'bg-amber-50 text-amber-700' :
                    i === 3 ? 'bg-purple-50 text-purple-700' :
                    'bg-emerald-50 text-emerald-700'
                  }`}>
                  <div className="text-2xl font-bold font-display">{pipelineCounts[stage] || 0}</div>
                  <div className="text-xs font-semibold mt-1">{stage}</div>
                </button>
                {i < PIPELINE_STAGES.length - 1 && (
                  <div className="flex items-center text-gray-300 flex-shrink-0"><ChevronRight className="w-5 h-5" /></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Test List */}
        <div className="medical-card p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="font-bold text-gray-900 font-display">Test Requests</h2>
            <div className="flex gap-2 flex-wrap">
              {['All', 'Pending', 'Processing', 'Report Ready'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${statusFilter === s ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {s}
                </button>
              ))}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary-500" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr><th>Patient</th><th>Test</th><th>Category</th><th>Priority</th><th>Ordered By</th><th>Status</th><th>Price</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map(test => (
                  <tr key={test.id}>
                    <td className="font-medium text-gray-900 text-sm">{test.patientName}</td>
                    <td>
                      <div>
                        <p className="text-sm text-gray-900">{test.testName}</p>
                        <p className="text-xs text-gray-400">{test.testCode}</p>
                      </div>
                    </td>
                    <td><span className="text-xs text-gray-600">{test.category}</span></td>
                    <td><span className={PRIORITY_COLORS[test.priority]}>{test.priority}</span></td>
                    <td><span className="text-xs text-gray-500">{test.orderedBy}</span></td>
                    <td><span className={STATUS_COLORS[test.status] || 'badge'}>{test.status}</span></td>
                    <td><span className="font-medium text-sm">${test.price}</span></td>
                    <td>
                      <div className="flex gap-1">
                        <button onClick={() => setViewReport(test.id)} className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="View / Update">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {(test.status === 'Report Ready' || test.status === 'Completed') && (
                          <button onClick={() => showToast(`Downloading report for ${test.patientName}`)} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Download PDF">
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
