import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import KPICard from '@/components/features/KPICard';
import AppointmentCard from '@/components/features/AppointmentCard';
import AIAssistantPanel from '@/components/features/AIAssistantPanel';
import ActivityFeed from '@/components/features/ActivityFeed';
import EmergencyBanner from '@/components/features/EmergencyBanner';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_APPOINTMENTS, MOCK_AI_INSIGHTS } from '@/constants/mockData';
import {
  Calendar, FileText, Pill, Heart, Activity, TrendingUp,
  Video, AlertTriangle, Plus, Clock, ChevronRight, Check, X, Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const HEALTH_DATA = [
  { day: 'Mon', bp: 120, pulse: 72, spo2: 98 },
  { day: 'Tue', bp: 125, pulse: 75, spo2: 97 },
  { day: 'Wed', bp: 118, pulse: 70, spo2: 99 },
  { day: 'Thu', bp: 122, pulse: 73, spo2: 98 },
  { day: 'Fri', bp: 128, pulse: 78, spo2: 96 },
  { day: 'Sat', bp: 116, pulse: 68, spo2: 99 },
  { day: 'Sun', bp: 121, pulse: 71, spo2: 98 },
];

type Vital = { label: string; value: string; unit: string; status: 'normal' | 'warning' | 'critical'; prev: string };

const VITALS: Vital[] = [
  { label: 'Blood Pressure', value: '128/82', unit: 'mmHg', status: 'normal', prev: '131/85' },
  { label: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal', prev: '75' },
  { label: 'SpO2', value: '97', unit: '%', status: 'normal', prev: '96' },
  { label: 'Blood Glucose', value: '142', unit: 'mg/dL', status: 'warning', prev: '138' },
];

interface SOSModalProps { onClose: () => void }
function SOSModal({ onClose }: SOSModalProps) {
  const [countdown, setCountdown] = useState(5);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sent) return;
    if (countdown <= 0) { setSent(true); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, sent]);

  return (
    <div className="fixed inset-0 bg-red-900/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center animate-scale-in">
        {!sent ? (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 font-display mb-2">SOS Activated</h2>
            <p className="text-gray-500 mb-4">Emergency services will be alerted in</p>
            <div className="text-6xl font-bold text-red-600 font-display mb-6">{countdown}</div>
            <button onClick={onClose} className="w-full btn-ghost border-2 border-gray-300 justify-center py-3 text-base">Cancel SOS</button>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 font-display mb-2">Alert Sent!</h2>
            <p className="text-gray-500 mb-4">Emergency services notified. Ambulance dispatched to your location. ETA: 8 min.</p>
            <div className="p-3 bg-red-50 rounded-xl mb-4 text-sm text-red-700 font-medium">📞 Emergency contact notified: +1 (555) 234-5679</div>
            <button onClick={() => { onClose(); navigate('/emergency'); }} className="w-full btn-danger justify-center py-3">Track Response →</button>
          </>
        )}
      </div>
    </div>
  );
}

interface MedRefillModalProps { med: string; onClose: () => void }
function MedRefillModal({ med, onClose }: MedRefillModalProps) {
  const [ordered, setOrdered] = useState(false);
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-scale-in" onClick={e => e.stopPropagation()}>
        <h3 className="font-bold text-gray-900 font-display mb-1">Order Refill</h3>
        <p className="text-sm text-gray-500 mb-4">{med}</p>
        {!ordered ? (
          <>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Quantity</label>
                <select className="input-medical"><option>30 days supply</option><option>60 days supply</option><option>90 days supply</option></select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Delivery</label>
                <select className="input-medical"><option>Home Delivery (2-3 days)</option><option>Pharmacy Pickup</option></select>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={onClose} className="flex-1 btn-ghost border border-gray-200 justify-center">Cancel</button>
              <button onClick={() => setOrdered(true)} className="flex-1 btn-primary justify-center">Order Refill</button>
            </div>
          </>
        ) : (
          <div className="text-center py-2">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3"><Check className="w-6 h-6 text-emerald-600" /></div>
            <p className="font-semibold text-gray-900 mb-1">Refill Ordered!</p>
            <p className="text-sm text-gray-500 mb-4">Your {med} refill has been sent to the pharmacy.</p>
            <button onClick={onClose} className="btn-primary w-full justify-center">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PatientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeAppointmentTab, setActiveAppointmentTab] = useState<'upcoming' | 'past'>('upcoming');
  const [showSOS, setShowSOS] = useState(false);
  const [refillMed, setRefillMed] = useState<string | null>(null);
  const [reminders, setReminders] = useState([
    { time: '8:00 AM', text: 'Metformin dose', done: true },
    { time: '9:00 AM', text: 'Dr. Harrison appointment', done: false },
    { time: '1:00 PM', text: 'Blood pressure check', done: false },
    { time: '8:00 PM', text: 'Evening medications', done: false },
  ]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const myAppointments = MOCK_APPOINTMENTS.filter(a => a.patientId === 'p001');
  const medications = [
    { name: 'Metformin 500mg', freq: 'Twice daily', refill: '12 days left', color: 'bg-amber-50 text-amber-600' },
    { name: 'Lisinopril 10mg', freq: 'Once daily (AM)', refill: '8 days left', color: 'bg-red-50 text-red-500' },
    { name: 'Aspirin 81mg', freq: 'Once daily', refill: '25 days left', color: 'bg-emerald-50 text-emerald-600' },
  ];

  const toggleReminder = (idx: number) => {
    setReminders(prev => prev.map((r, i) => i === idx ? { ...r, done: !r.done } : r));
    showToast('Reminder updated');
  };

  return (
    <DashboardLayout>
      {showSOS && <SOSModal onClose={() => setShowSOS(false)} />}
      {refillMed && <MedRefillModal med={refillMed} onClose={() => setRefillMed(null)} />}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}

      <EmergencyBanner />
      <div className="space-y-6 mt-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">
              Good Morning, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">Here's your health overview for today — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/appointments')} className="btn-primary text-sm py-2.5">
              <Plus className="w-4 h-4" /> Book Appointment
            </button>
            <button onClick={() => setShowSOS(true)} className="btn-danger text-sm py-2.5">
              <AlertTriangle className="w-4 h-4" /> SOS
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Upcoming Appointments" value={2} icon={Calendar} iconColor="text-primary-600" iconBg="bg-primary-50" onClick={() => navigate('/appointments')} />
          <KPICard title="Active Prescriptions" value={4} icon={Pill} iconColor="text-amber-600" iconBg="bg-amber-50" onClick={() => navigate('/pharmacy')} />
          <KPICard title="Lab Reports Pending" value={2} icon={FileText} iconColor="text-purple-600" iconBg="bg-purple-50" onClick={() => navigate('/diagnostics')} />
          <KPICard title="Health Score" value={82} suffix="/100" icon={Heart} iconColor="text-emerald-600" iconBg="bg-emerald-50" change={5} changeLabel="vs last month" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vitals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {VITALS.map(v => (
                <div key={v.label} className={`medical-card p-4 text-center border-2 ${v.status === 'warning' ? 'border-amber-200' : v.status === 'critical' ? 'border-red-200' : 'border-transparent'}`}>
                  <p className={`text-xl font-bold font-display ${v.status === 'warning' ? 'text-amber-600' : v.status === 'critical' ? 'text-red-600' : 'text-gray-900'}`}>{v.value}</p>
                  <p className="text-xs text-gray-400">{v.unit}</p>
                  <p className="text-xs font-semibold text-gray-600 mt-1 truncate">{v.label}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${v.status === 'normal' ? 'bg-emerald-500' : v.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`} />
                    <span className={`text-[9px] font-semibold capitalize ${v.status === 'normal' ? 'text-emerald-600' : v.status === 'warning' ? 'text-amber-600' : 'text-red-600'}`}>{v.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Health Vitals Chart */}
            <div className="medical-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-bold text-gray-900 font-display">Weekly Health Vitals</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Blood pressure & pulse monitoring</p>
                </div>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-primary-500 inline-block rounded" /><span className="text-gray-500">BP</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-500 inline-block rounded" /><span className="text-gray-500">Pulse</span></div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={HEALTH_DATA}>
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 140]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="bp" stroke="#0284C7" strokeWidth={2} dot={{ r: 4, fill: '#0284C7' }} />
                  <Line type="monotone" dataKey="pulse" stroke="#10B981" strokeWidth={2} dot={{ r: 4, fill: '#10B981' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Appointments */}
            <div className="medical-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 font-display">My Appointments</h2>
                <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                  {(['upcoming', 'past'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveAppointmentTab(tab)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all capitalize ${activeAppointmentTab === tab ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500'}`}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {myAppointments.slice(0, 2).map(apt => (
                  <AppointmentCard key={apt.id} appointment={apt} onAction={(action) => {
                    if (action === 'join') navigate('/telemedicine');
                    else if (action === 'confirm') showToast('Appointment marked as complete');
                    else if (action === 'cancel') showToast('Appointment cancelled');
                  }} />
                ))}
              </div>
              <button onClick={() => navigate('/appointments')} className="btn-ghost w-full justify-center mt-3 text-sm">
                View All Appointments <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Video, label: 'Telemedicine', color: 'bg-primary-50 text-primary-600', path: '/telemedicine' },
                { icon: FileText, label: 'My Reports', color: 'bg-purple-50 text-purple-600', path: '/diagnostics' },
                { icon: Pill, label: 'Order Meds', color: 'bg-amber-50 text-amber-600', path: '/pharmacy' },
                { icon: Activity, label: 'Health Track', color: 'bg-emerald-50 text-emerald-600', path: '/wellness' },
              ].map(action => {
                const Icon = action.icon;
                return (
                  <button key={action.label} onClick={() => navigate(action.path)}
                    className={`medical-card p-4 flex flex-col items-center gap-2 text-center ${action.color} hover:scale-105`}>
                    <Icon className="w-6 h-6" />
                    <span className="text-xs font-semibold">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <AIAssistantPanel />

            {/* Current medications */}
            <div className="medical-card p-5">
              <h3 className="font-bold text-gray-900 font-display mb-3 text-sm">Active Medications</h3>
              <div className="space-y-2.5">
                {medications.map(med => (
                  <div key={med.name} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer group">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${med.color}`}>
                      <Pill className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-xs truncate">{med.name}</p>
                      <p className="text-[10px] text-gray-500">{med.freq}</p>
                    </div>
                    <button
                      onClick={() => setRefillMed(med.name)}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity btn-primary py-1 px-2`}
                    >
                      Refill
                    </button>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${med.color} group-hover:hidden`}>{med.refill}</span>
                  </div>
                ))}
                <button onClick={() => navigate('/pharmacy')} className="btn-ghost w-full justify-center text-xs mt-1">
                  Order Refill <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Reminders */}
            <div className="medical-card p-5">
              <h3 className="font-bold text-gray-900 font-display mb-3 text-sm">Today's Reminders</h3>
              <div className="space-y-2">
                {reminders.map((rem, i) => (
                  <button
                    key={rem.time}
                    onClick={() => toggleReminder(i)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all ${rem.done ? 'opacity-50 bg-gray-50' : 'bg-white hover:bg-primary-50'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${rem.done ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}>
                      {rem.done && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-medium ${rem.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{rem.text}</p>
                    </div>
                    <span className="text-[10px] text-gray-400">{rem.time}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <ActivityFeed />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
