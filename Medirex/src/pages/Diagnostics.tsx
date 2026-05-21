import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { MOCK_LAB_TESTS } from '@/constants/mockData';
import { FlaskConical, Search, Plus, Filter, Download, Eye, Check, Calendar, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const STATUS_COLORS: Record<string, string> = {
  'Pending': 'badge bg-gray-100 text-gray-600',
  'Sample Collected': 'badge bg-sky-100 text-sky-700',
  'Processing': 'badge bg-amber-100 text-amber-700',
  'Completed': 'badge badge-success',
  'Report Ready': 'badge bg-emerald-100 text-emerald-700',
};

const CATEGORIES = ['All', 'Hematology', 'Chemistry', 'Cardiology', 'Diabetes', 'Imaging'];

export default function Diagnostics() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [priority, setPriority] = useState('All');
  const [viewReport, setViewReport] = useState<string | null>(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [bookForm, setBookForm] = useState({ patient: '', test: '', date: '', priority: 'Normal', homeCollection: false });
  const { user } = useAuth();
  const isPatient = user?.role === 'patient';

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const filtered = MOCK_LAB_TESTS.filter(t =>
    (isPatient ? t.patientName === 'Sarah Johnson' : true) && // Mock patient filter
    (category === 'All' || t.category === category) &&
    (priority === 'All' || t.priority === priority) &&
    (t.patientName.toLowerCase().includes(search.toLowerCase()) || t.testName.toLowerCase().includes(search.toLowerCase()))
  );

  const selectedTest = viewReport ? MOCK_LAB_TESTS.find(t => t.id === viewReport) : null;

  return (
    <DashboardLayout>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">Diagnostics & Lab</h1>
            <p className="text-gray-500 text-sm mt-0.5">Test booking, sample tracking & digital reports</p>
          </div>
          <button onClick={() => setShowBookModal(true)} className="btn-primary text-sm py-2.5">
            <Plus className="w-4 h-4" /> Book Test
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Tests Today', value: MOCK_LAB_TESTS.length, color: 'text-primary-600 bg-primary-50 border-primary-100' },
            { label: 'Pending', value: MOCK_LAB_TESTS.filter(t => t.status === 'Pending').length, color: 'text-gray-600 bg-gray-50 border-gray-100' },
            { label: 'Processing', value: MOCK_LAB_TESTS.filter(t => t.status === 'Processing' || t.status === 'Sample Collected').length, color: 'text-amber-600 bg-amber-50 border-amber-100' },
            { label: 'Reports Ready', value: MOCK_LAB_TESTS.filter(t => t.status === 'Report Ready' || t.status === 'Completed').length, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
          ].map(s => (
            <div key={s.label} className={`p-4 rounded-2xl border ${s.color}`}>
              <div className="text-2xl font-bold font-display">{s.value}</div>
              <div className="text-sm font-medium opacity-80 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {!isPatient && (
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tests or patients..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full" />
            </div>
          )}
          <select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={priority} onChange={e => setPriority(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            {['All', 'Normal', 'Urgent', 'STAT'].map(p => <option key={p}>{p}</option>)}
          </select>
        </div>

        {/* STAT Alert */}
        {!isPatient && MOCK_LAB_TESTS.filter(t => t.priority === 'STAT').length > 0 && (
          <div className="flex items-center gap-3 p-3.5 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-sm font-semibold text-red-700">{MOCK_LAB_TESTS.filter(t => t.priority === 'STAT').length} STAT test(s) require immediate processing</p>
            <button onClick={() => showToast('STAT team notified')} className="ml-auto btn-danger text-xs py-1.5 px-3">Alert Lab Team</button>
          </div>
        )}

        {/* Test Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(test => (
            <div key={test.id} className="medical-card p-4 cursor-pointer" onClick={() => setViewReport(test.id)}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  test.priority === 'STAT' ? 'bg-red-100' : test.priority === 'Urgent' ? 'bg-amber-100' : 'bg-purple-100'
                }`}>
                  <FlaskConical className={`w-5 h-5 ${
                    test.priority === 'STAT' ? 'text-red-600' : test.priority === 'Urgent' ? 'text-amber-600' : 'text-purple-600'
                  }`} />
                </div>
                <div className="flex gap-1.5">
                  {test.priority !== 'Normal' && (
                    <span className={`badge text-[10px] ${test.priority === 'STAT' ? 'badge-danger' : 'badge-warning'}`}>{test.priority}</span>
                  )}
                  <span className={STATUS_COLORS[test.status] || 'badge'}>{test.status}</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-sm font-display">{test.testName}</h3>
              {!isPatient && <p className="text-xs text-gray-500 mt-0.5">{test.patientName}</p>}
              <p className="text-xs text-gray-400 mt-0.5">{test.testCode} · {test.category}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                <div>
                  <p className="text-xs text-gray-500">{test.date}</p>
                  <p className="text-xs font-semibold text-gray-700">${test.price}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={e => { e.stopPropagation(); setViewReport(test.id); }} className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  {(test.status === 'Report Ready' || test.status === 'Completed') && (
                    <button onClick={e => { e.stopPropagation(); showToast(`Downloading report for ${test.patientName}`); }} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full medical-card p-12 text-center">
              <FlaskConical className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="font-semibold text-gray-500">No tests found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedTest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setViewReport(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full animate-scale-in overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 font-display">Lab Report Detail</h3>
              <span className={STATUS_COLORS[selectedTest.status] || 'badge'}>{selectedTest.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                !isPatient ? { label: 'Patient', value: selectedTest.patientName } : null,
                { label: 'Test', value: selectedTest.testName },
                { label: 'Code', value: selectedTest.testCode },
                { label: 'Date', value: selectedTest.date },
                { label: 'Category', value: selectedTest.category },
                { label: 'Ordered By', value: selectedTest.orderedBy },
              ].filter(Boolean).map(f => (
                <div key={f!.label} className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-0.5">{f!.label}</p>
                  <p className="font-semibold text-sm text-gray-900">{f!.value}</p>
                </div>
              ))}
            </div>
            {selectedTest.result ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl mb-4">
                <p className="text-xs font-semibold text-emerald-600 mb-1">Result</p>
                <p className="font-bold text-gray-900">{selectedTest.result}</p>
                {selectedTest.normalRange && <p className="text-xs text-gray-500 mt-1">Normal range: {selectedTest.normalRange}</p>}
                {selectedTest.result && !selectedTest.normalRange?.includes(selectedTest.result.split(':')[1]?.trim() || '') && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" /> Result outside normal range — review recommended
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl mb-4 text-center text-sm text-gray-400">
                Results pending — test in progress
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => setViewReport(null)} className="flex-1 btn-ghost border border-gray-200 justify-center">Close</button>
              <button onClick={() => { showToast('Report downloaded'); setViewReport(null); }} className="flex-1 btn-primary justify-center"><Download className="w-4 h-4" /> Download PDF</button>
            </div>
          </div>
        </div>
      )}

      {/* Book Test Modal */}
      {showBookModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowBookModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-gray-900 font-display mb-4">Book Diagnostic Test</h3>
            <div className="space-y-3">
              {!isPatient && (
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Patient Name</label>
                  <input value={bookForm.patient} onChange={e => setBookForm(f => ({...f, patient: e.target.value}))} className="input-medical" placeholder="Search patient..." />
                </div>
              )}
              <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Test Type</label>
                <select value={bookForm.test} onChange={e => setBookForm(f => ({...f, test: e.target.value}))} className="input-medical">
                  <option value="">Select test...</option>
                  <option>Complete Blood Count (CBC)</option><option>Lipid Panel</option><option>HbA1c</option><option>Kidney Function Panel</option><option>MRI Brain</option><option>Echocardiogram</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Date</label>
                  <input type="date" value={bookForm.date} onChange={e => setBookForm(f => ({...f, date: e.target.value}))} className="input-medical" min={new Date().toISOString().split('T')[0]} />
                </div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Priority</label>
                  <select value={bookForm.priority} onChange={e => setBookForm(f => ({...f, priority: e.target.value}))} className="input-medical">
                    <option>Normal</option><option>Urgent</option><option>STAT</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer p-3 bg-gray-50 rounded-xl">
                <input type="checkbox" checked={bookForm.homeCollection} onChange={e => setBookForm(f => ({...f, homeCollection: e.target.checked}))} className="w-4 h-4 rounded text-primary-600" />
                <span className="text-sm font-medium text-gray-700">🏠 Home Sample Collection</span>
              </label>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowBookModal(false)} className="flex-1 btn-ghost border border-gray-200 justify-center">Cancel</button>
              <button onClick={() => { setShowBookModal(false); showToast('Test booked successfully'); }} disabled={(!isPatient && !bookForm.patient) || !bookForm.test} className="flex-1 btn-primary justify-center disabled:opacity-50">
                <Calendar className="w-4 h-4" /> Book Test
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
