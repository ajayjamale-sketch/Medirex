import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import KPICard from '@/components/features/KPICard';
import AppointmentCard from '@/components/features/AppointmentCard';
import AIAssistantPanel from '@/components/features/AIAssistantPanel';
import EmergencyBanner from '@/components/features/EmergencyBanner';
import { MOCK_APPOINTMENTS, MOCK_PATIENTS } from '@/constants/mockData';
import { useAuth } from '@/contexts/AuthContext';
import {
  Users, Calendar, FileText, Video, Stethoscope, ChevronRight,
  Clock, Star, Plus, Check, X, AlertTriangle, Zap, Pill, Printer
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const WEEKLY_PATIENTS = [
  { day: 'Mon', count: 14 }, { day: 'Tue', count: 18 }, { day: 'Wed', count: 12 },
  { day: 'Thu', count: 20 }, { day: 'Fri', count: 16 }, { day: 'Sat', count: 8 }, { day: 'Sun', count: 4 },
];

interface PrescriptionModalProps {
  patientName: string;
  onClose: () => void;
}

function PrescriptionModal({ patientName, onClose }: PrescriptionModalProps) {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ diagnosis: '', medicine: '', dosage: '', frequency: '2x daily', duration: '30 days', notes: '' });
  const handleSave = () => {
    if (!form.medicine) return;
    setSaved(true);
  };
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full animate-scale-in" onClick={e => e.stopPropagation()}>
        {!saved ? (
          <>
            <h3 className="font-bold text-gray-900 font-display mb-1">Create Prescription</h3>
            <p className="text-sm text-gray-500 mb-4">Patient: <span className="font-semibold text-primary-600">{patientName}</span></p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Diagnosis</label>
                <input value={form.diagnosis} onChange={e => setForm(f => ({...f, diagnosis: e.target.value}))} className="input-medical" placeholder="e.g., Hypertension" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Medicine</label>
                  <input value={form.medicine} onChange={e => setForm(f => ({...f, medicine: e.target.value}))} className="input-medical" placeholder="e.g., Lisinopril 10mg" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Dosage</label>
                  <input value={form.dosage} onChange={e => setForm(f => ({...f, dosage: e.target.value}))} className="input-medical" placeholder="e.g., 1 tablet" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Frequency</label>
                  <select value={form.frequency} onChange={e => setForm(f => ({...f, frequency: e.target.value}))} className="input-medical">
                    <option>Once daily</option><option>2x daily</option><option>3x daily</option><option>As needed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Duration</label>
                  <select value={form.duration} onChange={e => setForm(f => ({...f, duration: e.target.value}))} className="input-medical">
                    <option>7 days</option><option>14 days</option><option>30 days</option><option>90 days</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Notes</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} rows={2} className="input-medical resize-none" placeholder="Take with food..." />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={onClose} className="flex-1 btn-ghost border border-gray-200 justify-center">Cancel</button>
              <button onClick={handleSave} disabled={!form.medicine} className="flex-1 btn-primary justify-center disabled:opacity-50">
                <Pill className="w-4 h-4" /> Issue Prescription
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3"><Check className="w-7 h-7 text-emerald-600" /></div>
            <h3 className="font-bold text-gray-900 font-display mb-1">Prescription Issued!</h3>
            <p className="text-sm text-gray-500 mb-4">Sent to pharmacy for {patientName}</p>
            <div className="flex gap-2">
              <button onClick={onClose} className="flex-1 btn-ghost border border-gray-200 justify-center">Close</button>
              <button onClick={onClose} className="flex-1 btn-secondary justify-center"><Printer className="w-4 h-4" /> Print</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DoctorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [actionModal, setActionModal] = useState<{ type: string; patient?: string } | null>(null);
  const [showPrescription, setShowPrescription] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const todayApts = MOCK_APPOINTMENTS.filter(a => a.doctorId === 'd001');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAppointmentAction = (action: string, apt: typeof MOCK_APPOINTMENTS[0]) => {
    if (action === 'join') navigate('/telemedicine');
    else if (action === 'view') navigate('/emr');
    else if (action === 'confirm') { setActionModal({ type: 'confirm', patient: apt.patientName }); }
    else if (action === 'cancel') { setActionModal({ type: 'cancel', patient: apt.patientName }); }
  };

  return (
    <DashboardLayout>
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}

      {showPrescription && (
        <PrescriptionModal patientName={showPrescription} onClose={() => setShowPrescription(null)} />
      )}

      <EmergencyBanner message="Patient incoming - Acute MI, ETA 4 min" />
      <div className="space-y-6 mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">Clinical Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">Welcome, {user?.name} · Cardiology · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/telemedicine')} className="btn-secondary text-sm py-2.5">
              <Video className="w-4 h-4" /> Start Consult
            </button>
            <button onClick={() => navigate('/emr')} className="btn-primary text-sm py-2.5">
              <Plus className="w-4 h-4" /> New Patient
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Patients Today" value={12} icon={Users} change={8} changeLabel="vs yesterday" onClick={() => navigate('/emr')} />
          <KPICard title="Appointments" value={5} suffix=" remaining" icon={Calendar} iconColor="text-primary-600" onClick={() => navigate('/appointments')} />
          <KPICard title="Teleconsults" value={3} icon={Video} iconColor="text-sky-600" iconBg="bg-sky-50" onClick={() => navigate('/telemedicine')} />
          <KPICard title="Avg Rating" value="4.9" icon={Star} iconColor="text-amber-500" iconBg="bg-amber-50" animate={false} suffix="/5" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule */}
            <div className="medical-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 font-display">Today's Schedule</h2>
                <button onClick={() => navigate('/appointments')} className="text-primary-600 text-xs font-semibold hover:underline">Full Schedule</button>
              </div>
              <div className="space-y-3">
                {todayApts.map(apt => (
                  <AppointmentCard key={apt.id} appointment={apt} onAction={handleAppointmentAction} />
                ))}
              </div>
            </div>

            {/* Weekly Patient Load */}
            <div className="medical-card p-5">
              <h2 className="font-bold text-gray-900 font-display mb-4">Weekly Patient Load</h2>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={WEEKLY_PATIENTS}>
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="count" fill="#0284C7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Patients */}
            <div className="medical-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 font-display">Recent Patients</h2>
                <button onClick={() => navigate('/emr')} className="text-primary-600 text-xs font-semibold hover:underline">View All EMR</button>
              </div>
              <div className="overflow-x-auto">
                <table className="data-table w-full">
                  <thead><tr><th>Patient</th><th>Diagnosis</th><th>Last Visit</th><th>Action</th></tr></thead>
                  <tbody>
                    {MOCK_PATIENTS.slice(0, 4).map(p => (
                      <tr key={p.id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <img src={p.avatar} alt={p.name} className="w-7 h-7 rounded-lg object-cover" />
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{p.name}</p>
                              <p className="text-xs text-gray-400">{p.age}y · {p.gender}</p>
                            </div>
                          </div>
                        </td>
                        <td><span className="text-xs text-gray-600">{p.conditions[0] || 'General'}</span></td>
                        <td><span className="text-xs text-gray-500">{p.lastVisit}</span></td>
                        <td>
                          <div className="flex gap-1">
                            <button onClick={() => navigate('/emr')} className="text-xs text-primary-600 font-semibold hover:underline">EMR</button>
                            <span className="text-gray-300">|</span>
                            <button onClick={() => setShowPrescription(p.name)} className="text-xs text-amber-600 font-semibold hover:underline">Rx</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            <AIAssistantPanel />

            {/* Clinical Alerts */}
            <div className="medical-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <h3 className="font-bold text-gray-900 font-display text-sm">Clinical Alerts</h3>
                <span className="badge-danger ml-auto">3</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { text: 'Drug interaction: Lisinopril + NSAIDs (J. Williams)', severity: 'High', action: '/emr' },
                  { text: 'HbA1c 8.2% - Diabetes poorly controlled (J. Williams)', severity: 'Medium', action: '/emr' },
                  { text: 'Missed follow-up: E. Rodriguez (7 days overdue)', severity: 'Low', action: '/appointments' },
                ].map((alert, i) => (
                  <div key={i} onClick={() => navigate(alert.action)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer hover:scale-[1.01] transition-all ${
                    alert.severity === 'High' ? 'bg-red-50 border-red-100 text-red-700' :
                    alert.severity === 'Medium' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                    'bg-gray-50 border-gray-100 text-gray-600'}`}>
                    {alert.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="medical-card p-5">
              <h3 className="font-bold text-gray-900 font-display text-sm mb-3">My Performance</h3>
              {[
                { label: 'Patient Satisfaction', value: 96 },
                { label: 'On-Time Rate', value: 88 },
                { label: 'Documentation', value: 94 },
              ].map(m => (
                <div key={m.label} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-xs text-gray-600 mb-1"><span>{m.label}</span><span className="font-semibold">{m.value}%</span></div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full transition-all" style={{ width: `${m.value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="medical-card p-4">
              <h3 className="font-bold text-gray-900 font-display text-sm mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: 'View My Schedule', path: '/appointments', color: 'text-primary-600' },
                  { label: 'EMR / Patient Records', path: '/emr', color: 'text-gray-700' },
                  { label: 'Lab Orders', path: '/diagnostics', color: 'text-purple-600' },
                  { label: 'Analytics', path: '/analytics', color: 'text-emerald-600' },
                ].map(item => (
                  <button key={item.label} onClick={() => navigate(item.path)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 text-sm font-medium ${item.color} transition-colors`}>
                    {item.label}
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Confirmation Modal */}
      {actionModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setActionModal(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-gray-900 font-display mb-2 capitalize">
              {actionModal.type === 'confirm' ? 'Mark Appointment Complete' : 'Cancel Appointment'}
            </h3>
            <p className="text-sm text-gray-500 mb-1">Patient: <span className="font-semibold">{actionModal.patient}</span></p>
            <p className="text-sm text-gray-500 mb-4">
              {actionModal.type === 'confirm' ? 'This will mark the appointment as completed and update the patient EMR.' : 'Are you sure you want to cancel this appointment? The patient will be notified.'}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setActionModal(null)} className="flex-1 btn-ghost border border-gray-200 justify-center">Back</button>
              <button onClick={() => { setActionModal(null); showToast(actionModal.type === 'confirm' ? 'Appointment marked complete' : 'Appointment cancelled'); }}
                className={`flex-1 ${actionModal.type === 'confirm' ? 'btn-primary' : 'btn-danger'} justify-center`}>
                {actionModal.type === 'confirm' ? <><Check className="w-4 h-4" /> Confirm</> : <><X className="w-4 h-4" /> Cancel Appointment</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
