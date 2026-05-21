import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { MOCK_PATIENTS, MOCK_APPOINTMENTS } from '@/constants/mockData';
import { FileText, Search, User, Heart, Pill, FlaskConical, AlertTriangle, Plus, Download, Edit2, ChevronRight, Check, X, Save, Share2 } from 'lucide-react';
import type { Patient } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface VitalEntry { label: string; value: string; unit: string; status: 'normal' | 'warning' | 'critical' }

const DEFAULT_VITALS: VitalEntry[] = [
  { label: 'Blood Pressure', value: '128/82', unit: 'mmHg', status: 'normal' },
  { label: 'Pulse', value: '76', unit: 'bpm', status: 'normal' },
  { label: 'SpO2', value: '97', unit: '%', status: 'normal' },
  { label: 'Temperature', value: '98.6', unit: '°F', status: 'normal' },
];

export default function EMR() {
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState(MOCK_PATIENTS[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'prescriptions' | 'labs' | 'notes'>('overview');
  const [search, setSearch] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState(['Patient reports improvement in blood pressure control. Diet compliance good. Exercise routine established 3x/week. Continue current medications. Follow up in 4 weeks.']);
  const [editingVitals, setEditingVitals] = useState(false);
  const [vitals, setVitals] = useState(DEFAULT_VITALS);
  const [editVitals, setEditVitals] = useState(DEFAULT_VITALS);
  const [toast, setToast] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', phone: '', email: '', address: '' });
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const { user } = useAuth();
  const isPatient = user?.role === 'patient';

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.bloodGroup.includes(search)
  );

  const startEdit = () => {
    setEditForm({ name: selectedPatient.name, phone: selectedPatient.phone, email: selectedPatient.email, address: selectedPatient.address });
    setEditing(true);
  };

  const saveEdit = () => {
    setPatients(prev => prev.map(p => p.id === selectedPatient.id ? { ...p, ...editForm } : p));
    setSelectedPatient(prev => ({ ...prev, ...editForm }));
    setEditing(false);
    showToast('Patient record updated');
  };

  const saveVitals = () => {
    setVitals(editVitals);
    setEditingVitals(false);
    showToast('Vitals updated successfully');
  };

  const addNote = () => {
    if (!note.trim()) return;
    setNotes(prev => [`${note} — Dr. Harrison · ${new Date().toLocaleString()}`, ...prev]);
    setNote('');
    setShowAddNote(false);
    showToast('Clinical note added');
  };

  return (
    <DashboardLayout>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">{isPatient ? 'My Medical Records' : 'EMR / EHR'}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{isPatient ? 'View and manage your health records' : 'Electronic Medical & Health Records'}</p>
          </div>
          {!isPatient && (
            <button onClick={() => { setSelectedPatient(MOCK_PATIENTS[0]); showToast('New patient form opened'); }} className="btn-primary text-sm py-2.5">
              <Plus className="w-4 h-4" /> New Record
            </button>
          )}
        </div>

        <div className={`grid ${isPatient ? 'lg:grid-cols-1' : 'lg:grid-cols-3'} gap-6`}>
          {/* Patient List (Hidden for patients) */}
          {!isPatient && (
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patients..." className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full" />
              </div>
              <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin pr-1">
                {filtered.map(p => (
                  <button key={p.id} onClick={() => { setSelectedPatient(p); setActiveTab('overview'); setEditing(false); }}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${selectedPatient.id === p.id ? 'border-primary-500 bg-primary-50' : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'}`}>
                    <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.age}y · {p.gender} · {p.bloodGroup}</p>
                      {p.conditions[0] && <p className="text-[10px] text-primary-600 font-medium mt-0.5 truncate">{p.conditions[0]}</p>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Patient Detail */}
          <div className={`${isPatient ? 'lg:col-span-1 max-w-5xl mx-auto w-full' : 'lg:col-span-2'} space-y-4`}>
            {/* Patient header */}
            <div className="medical-card p-5">
              <div className="flex items-start gap-4">
                <img src={selectedPatient.avatar} alt={selectedPatient.name} className="w-16 h-16 rounded-2xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      {editing ? (
                        <input value={editForm.name} onChange={e => setEditForm(f => ({...f, name: e.target.value}))} className="input-medical text-lg font-bold mb-1" />
                      ) : (
                        <h2 className="text-xl font-bold text-gray-900 font-display">{selectedPatient.name}</h2>
                      )}
                      <p className="text-sm text-gray-500">{selectedPatient.age} years · {selectedPatient.gender} · Blood Group: <span className="font-semibold text-red-600">{selectedPatient.bloodGroup}</span></p>
                    </div>
                    <div className="flex gap-2">
                      {editing ? (
                        <>
                          <button onClick={() => setEditing(false)} className="btn-ghost text-sm py-1.5 border border-gray-200">Cancel</button>
                          <button onClick={saveEdit} className="btn-primary text-sm py-1.5"><Save className="w-3.5 h-3.5" /> Save</button>
                        </>
                      ) : (
                        <>
                          {isPatient ? (
                            <>
                              <button onClick={() => setShowShareModal(true)} className="btn-secondary text-sm py-1.5"><Share2 className="w-3.5 h-3.5" /> Share Record</button>
                              <button onClick={() => {
                                showToast('Generating PDF...');
                                setTimeout(() => showToast('Record downloaded successfully'), 1500);
                              }} className="btn-ghost text-sm py-1.5"><Download className="w-3.5 h-3.5" /> Download PDF</button>
                            </>
                          ) : (
                            <>
                              <button onClick={startEdit} className="btn-ghost text-sm py-1.5"><Edit2 className="w-3.5 h-3.5" /> Edit</button>
                              <button onClick={() => showToast('EMR exported as PDF')} className="btn-ghost text-sm py-1.5"><Download className="w-3.5 h-3.5" /> Export</button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  {editing ? (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <input value={editForm.phone} onChange={e => setEditForm(f => ({...f, phone: e.target.value}))} className="input-medical text-xs py-1.5" placeholder="Phone" />
                      <input value={editForm.email} onChange={e => setEditForm(f => ({...f, email: e.target.value}))} className="input-medical text-xs py-1.5" placeholder="Email" />
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                      <span>📞 {selectedPatient.phone}</span>
                      <span>✉️ {selectedPatient.email}</span>
                      {selectedPatient.insuranceProvider && <span>🛡️ {selectedPatient.insuranceProvider}</span>}
                    </div>
                  )}
                </div>
              </div>

              {selectedPatient.allergies.length > 0 && (
                <div className="flex items-center gap-2 mt-3 p-2.5 bg-red-50 border border-red-100 rounded-xl">
                  <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-xs text-red-600"><span className="font-semibold">⚠️ Allergies:</span> {selectedPatient.allergies.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 overflow-x-auto">
              {(['overview', 'history', 'prescriptions', 'labs', 'notes'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap capitalize ${activeTab === tab ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  {tab === 'labs' ? 'Lab Results' : tab}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="medical-card p-4">
                    <div className="flex items-center gap-2 mb-3"><Heart className="w-4 h-4 text-red-500" /><h3 className="font-semibold text-gray-900 text-sm">Conditions</h3></div>
                    {selectedPatient.conditions.length > 0 ? selectedPatient.conditions.map(c => (
                      <div key={c} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                        <span className="text-sm text-gray-700">{c}</span>
                      </div>
                    )) : <p className="text-sm text-gray-400">No chronic conditions</p>}
                  </div>
                  <div className="medical-card p-4">
                    <div className="flex items-center gap-2 mb-3"><Pill className="w-4 h-4 text-amber-500" /><h3 className="font-semibold text-gray-900 text-sm">Current Medications</h3></div>
                    {['Metformin 500mg — 2x daily', 'Lisinopril 10mg — 1x daily', 'Aspirin 81mg — 1x daily'].map(med => (
                      <div key={med} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        <span className="text-sm text-gray-700">{med}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="medical-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm">Vital Signs (Latest)</h3>
                    {!editingVitals ? (
                      <button onClick={() => { setEditVitals(vitals); setEditingVitals(true); }} className="btn-ghost text-xs py-1"><Edit2 className="w-3 h-3" /> Update Vitals</button>
                    ) : (
                      <div className="flex gap-2">
                        <button onClick={() => setEditingVitals(false)} className="btn-ghost text-xs py-1">Cancel</button>
                        <button onClick={saveVitals} className="btn-primary text-xs py-1"><Save className="w-3 h-3" /> Save</button>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {vitals.map((v, i) => (
                      <div key={v.label} className={`p-3 rounded-xl text-center ${v.status === 'warning' ? 'bg-amber-50' : v.status === 'critical' ? 'bg-red-50' : 'bg-gray-50'}`}>
                        {editingVitals ? (
                          <input value={editVitals[i].value} onChange={e => setEditVitals(prev => prev.map((ev, ei) => ei === i ? { ...ev, value: e.target.value } : ev))} className="w-full text-center font-bold text-sm border border-gray-200 rounded-lg p-1 mb-1" />
                        ) : (
                          <p className={`text-lg font-bold ${v.status === 'warning' ? 'text-amber-600' : v.status === 'critical' ? 'text-red-600' : 'text-gray-900'}`}>{v.value}</p>
                        )}
                        <p className="text-[10px] text-gray-500">{v.unit}</p>
                        <span className={`text-[9px] font-semibold capitalize ${v.status === 'normal' ? 'text-emerald-600' : v.status === 'warning' ? 'text-amber-600' : 'text-red-600'}`}>{v.status}</span>
                        <p className="text-[10px] text-gray-400 mt-0.5">{v.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-3 animate-fade-in">
                {MOCK_APPOINTMENTS.filter(a => a.patientId === selectedPatient.id).map(apt => (
                  <div key={apt.id} className="medical-card p-4 flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{apt.reason}</p>
                      <p className="text-xs text-gray-500">{apt.doctorName} · {apt.date} · {apt.type}</p>
                    </div>
                    <span className={`badge text-[10px] ${apt.status === 'Completed' ? 'badge-success' : 'badge-primary'}`}>{apt.status}</span>
                  </div>
                ))}
                {MOCK_APPOINTMENTS.filter(a => a.patientId === selectedPatient.id).length === 0 && (
                  <div className="medical-card p-8 text-center text-gray-400 text-sm">No visit history found for this patient</div>
                )}
              </div>
            )}

            {activeTab === 'prescriptions' && (
              <div className="medical-card p-5 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Prescription History</h3>
                  <button onClick={() => showToast('New prescription form opened')} className="btn-primary text-xs py-1.5 px-3"><Plus className="w-3 h-3" /> New Rx</button>
                </div>
                <div className="space-y-3">
                  {[
                    { date: '2026-05-10', doctor: 'Dr. Harrison', diagnosis: 'Hypertension Management', meds: ['Lisinopril 10mg — 1x daily', 'Aspirin 81mg — 1x daily'] },
                    { date: '2026-04-15', doctor: 'Dr. Al-Hassan', diagnosis: 'Type 2 Diabetes Control', meds: ['Metformin 500mg — 2x daily', 'Glipizide 5mg — 1x AM'] },
                  ].map((rx, i) => (
                    <div key={i} className="p-4 border border-gray-100 rounded-xl hover:border-primary-200 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{rx.diagnosis}</p>
                          <p className="text-xs text-gray-500">{rx.doctor} · {rx.date}</p>
                        </div>
                        <button onClick={() => showToast('Prescription downloaded')} className="btn-ghost text-xs py-1.5"><Download className="w-3.5 h-3.5" /> PDF</button>
                      </div>
                      <div className="space-y-1">
                        {rx.meds.map(med => (
                          <div key={med} className="flex items-center gap-2 text-xs text-gray-600">
                            <Pill className="w-3 h-3 text-amber-500" /> {med}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'labs' && (
              <div className="medical-card p-5 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Lab Results</h3>
                  <button onClick={() => showToast('New lab order created')} className="btn-primary text-xs py-1.5 px-3"><Plus className="w-3 h-3" /> Order Test</button>
                </div>
                <div className="space-y-3">
                  {[
                    { test: 'HbA1c', date: '2026-05-10', result: '8.2%', range: '<5.7%', status: 'High' },
                    { test: 'Complete Blood Count', date: '2026-05-10', result: 'Normal', range: 'WBC 4-11 K/uL', status: 'Normal' },
                    { test: 'Lipid Panel', date: '2026-04-20', result: 'Cholesterol 210mg/dL', range: '<200 mg/dL', status: 'Borderline' },
                  ].map(lab => (
                    <div key={lab.test} className="flex items-center gap-3 p-3.5 border border-gray-100 rounded-xl hover:border-primary-200 cursor-pointer transition-all" onClick={() => showToast(`Viewing ${lab.test} report`)}>
                      <FlaskConical className="w-8 h-8 text-purple-500 bg-purple-50 p-1.5 rounded-lg flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{lab.test}</p>
                        <p className="text-xs text-gray-500">{lab.date} · Normal: {lab.range}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm text-gray-900">{lab.result}</p>
                        <span className={`badge text-[10px] ${lab.status === 'Normal' ? 'badge-success' : lab.status === 'High' ? 'badge-danger' : 'badge-warning'}`}>{lab.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-3 animate-fade-in">
                <button onClick={() => setShowAddNote(true)} className="btn-primary text-sm py-2 w-full justify-center">
                  <Plus className="w-4 h-4" /> Add Clinical Note
                </button>
                {notes.map((n, i) => (
                  <div key={i} className="medical-card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-gray-500">{n.split('—')[1]?.trim() || 'Dr. Harrison · 2026-05-10'}</p>
                      <button onClick={() => { setNotes(prev => prev.filter((_, ni) => ni !== i)); showToast('Note deleted'); }} className="text-xs text-red-400 hover:text-red-600 p-1"><X className="w-3 h-3" /></button>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{n.split('—')[0]?.trim() || n}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddNote && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddNote(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-gray-900 font-display mb-4">Add Clinical Note</h3>
            <div className="space-y-3">
              <select className="input-medical"><option>SOAP Note</option><option>Progress Note</option><option>Discharge Summary</option><option>Follow-up Note</option></select>
              <textarea value={note} onChange={e => setNote(e.target.value)} rows={5} placeholder="Enter clinical note..." className="input-medical resize-none" autoFocus />
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowAddNote(false)} className="flex-1 btn-ghost border border-gray-200 justify-center">Cancel</button>
              <button onClick={addNote} disabled={!note.trim()} className="flex-1 btn-primary justify-center disabled:opacity-50">Save Note</button>
            </div>
          </div>
        </div>
      )}

      {/* Share Record Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-gray-900 font-display mb-2">Share Medical Record</h3>
            <p className="text-sm text-gray-500 mb-4">Send a secure link to a doctor or specialist. They will have access for 48 hours.</p>
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Doctor's Email</label>
                <input value={shareEmail} onChange={e => setShareEmail(e.target.value)} type="email" placeholder="doctor@hospital.com" className="input-medical" autoFocus />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="includeLabs" className="rounded text-primary-600 border-gray-300 focus:ring-primary-500" defaultChecked />
                <label htmlFor="includeLabs" className="text-xs text-gray-600">Include Lab Results & Prescriptions</label>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowShareModal(false)} className="flex-1 btn-ghost border border-gray-200 justify-center">Cancel</button>
              <button onClick={() => {
                setShowShareModal(false);
                showToast(`Secure link sent to ${shareEmail}`);
                setShareEmail('');
              }} disabled={!shareEmail} className="flex-1 btn-primary justify-center disabled:opacity-50">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
