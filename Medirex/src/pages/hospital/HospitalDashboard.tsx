import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import KPICard from '@/components/features/KPICard';
import EmergencyBanner from '@/components/features/EmergencyBanner';
import ActivityFeed from '@/components/features/ActivityFeed';
import { MOCK_BEDS, OCCUPANCY_DATA, DEPARTMENT_DATA } from '@/constants/mockData';
import { Users, Activity, TrendingUp, AlertTriangle, Clock, UserCheck, BarChart3, Square, Check, X, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { HospitalBed } from '@/types';

interface BedModalProps { bed: HospitalBed; onClose: () => void; onUpdate: (bed: HospitalBed) => void; }

function BedModal({ bed, onClose, onUpdate }: BedModalProps) {
  const [status, setStatus] = useState(bed.status);
  const [patient, setPatient] = useState(bed.patientName || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdate({ ...bed, status, patientName: status === 'Occupied' ? patient : undefined });
    setSaved(true);
    setTimeout(onClose, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-scale-in" onClick={e => e.stopPropagation()}>
        {saved ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3"><Check className="w-6 h-6 text-emerald-600" /></div>
            <p className="font-bold text-gray-900">Bed Updated</p>
            <p className="text-sm text-gray-500 mt-1">{bed.bedNumber} → {status}</p>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-gray-900 font-display mb-1">Bed {bed.bedNumber}</h3>
            <p className="text-xs text-gray-500 mb-4">{bed.ward} · {bed.type}</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Available', 'Occupied', 'Reserved', 'Maintenance'] as const).map(s => (
                    <button key={s} onClick={() => setStatus(s)}
                      className={`py-2 text-xs font-semibold rounded-xl border-2 transition-all ${status === s ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>{s}</button>
                  ))}
                </div>
              </div>
              {status === 'Occupied' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Patient Name</label>
                  <input value={patient} onChange={e => setPatient(e.target.value)} className="input-medical" placeholder="Enter patient name" />
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={onClose} className="flex-1 btn-ghost border border-gray-200 justify-center">Cancel</button>
              <button onClick={handleSave} className="flex-1 btn-primary justify-center">Update Bed</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function HospitalDashboard() {
  const navigate = useNavigate();
  const [bedFilter, setBedFilter] = useState<string>('All');
  const [beds, setBeds] = useState(MOCK_BEDS);
  const [selectedBed, setSelectedBed] = useState<HospitalBed | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const totalBeds = beds.length;
  const occupiedBeds = beds.filter(b => b.status === 'Occupied').length;
  const availableBeds = beds.filter(b => b.status === 'Available').length;

  const filteredBeds = bedFilter === 'All' ? beds : beds.filter(b =>
    b.ward.toLowerCase().includes(bedFilter.toLowerCase()) || b.type === bedFilter
  );

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleBedUpdate = (updated: HospitalBed) => {
    setBeds(prev => prev.map(b => b.id === updated.id ? updated : b));
    showToast(`Bed ${updated.bedNumber} updated to ${updated.status}`);
  };

  const [queueItems, setQueueItems] = useState([
    { token: 'OPD-047', name: 'R. Thompson', dept: 'Cardiology', wait: '2 min', called: false },
    { token: 'OPD-048', name: 'K. Brown', dept: 'Orthopedics', wait: '15 min', called: false },
    { token: 'OPD-049', name: 'L. Davis', dept: 'Neurology', wait: '28 min', called: false },
    { token: 'OPD-050', name: 'M. Clark', dept: 'Cardiology', wait: '35 min', called: false },
  ]);

  const callPatient = (token: string) => {
    setQueueItems(prev => prev.map(q => q.token === token ? { ...q, called: true } : q));
    showToast(`${token} called to consultation room`);
  };

  return (
    <DashboardLayout>
      {selectedBed && (
        <BedModal bed={selectedBed} onClose={() => setSelectedBed(null)} onUpdate={handleBedUpdate} />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}

      <EmergencyBanner message="3 critical cases active in ER" count={3} />
      <div className="space-y-6 mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">Hospital Operations Center</h1>
            <p className="text-gray-500 text-sm mt-0.5">Medirex Medical Center · Real-time overview</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/analytics')} className="btn-secondary text-sm py-2.5">
              <BarChart3 className="w-4 h-4" /> Analytics
            </button>
            <button onClick={() => navigate('/emergency')} className="btn-danger text-sm py-2.5">
              <AlertTriangle className="w-4 h-4" /> Emergency Control
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Total Beds" value={totalBeds} icon={Square} change={0} />
          <KPICard title="Occupied Beds" value={occupiedBeds} icon={Users} iconColor="text-primary-600" change={-3} changeLabel="vs yesterday" />
          <KPICard title="Available Beds" value={availableBeds} icon={UserCheck} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
          <KPICard title="Occupancy Rate" value={Math.round((occupiedBeds / totalBeds) * 100)} suffix="%" icon={Activity} iconColor="text-amber-600" iconBg="bg-amber-50" change={4} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Occupancy Chart */}
            <div className="medical-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 font-display">Weekly Bed Occupancy</h2>
                <span className="badge-primary text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" /> Live</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={OCCUPANCY_DATA}>
                  <defs>
                    <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284C7" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} formatter={(v) => [`${v}%`, 'Occupancy']} />
                  <Area type="monotone" dataKey="value" stroke="#0284C7" strokeWidth={2} fill="url(#occGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Bed Management */}
            <div className="medical-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 font-display">Bed Management</h2>
                <div className="flex gap-1 flex-wrap">
                  {['All', 'ICU', 'Emergency', 'General', 'Private'].map(f => (
                    <button key={f} onClick={() => setBedFilter(f)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${bedFilter === f ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                {filteredBeds.map(bed => (
                  <button key={bed.id}
                    onClick={() => setSelectedBed(bed)}
                    className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all hover:scale-105 hover:shadow-card ${
                      bed.status === 'Available' ? 'bg-emerald-50 border-emerald-200' :
                      bed.status === 'Occupied' ? 'bg-red-50 border-red-200' :
                      bed.status === 'Reserved' ? 'bg-amber-50 border-amber-200' :
                      'bg-gray-50 border-gray-200'}`}
                  >
                    <Square className={`w-5 h-5 mx-auto mb-1 ${
                      bed.status === 'Available' ? 'text-emerald-500' :
                      bed.status === 'Occupied' ? 'text-red-500' :
                      bed.status === 'Reserved' ? 'text-amber-500' : 'text-gray-400'}`} />
                    <p className="text-[10px] font-bold text-gray-800">{bed.bedNumber}</p>
                    <p className={`text-[9px] font-semibold ${
                      bed.status === 'Available' ? 'text-emerald-600' :
                      bed.status === 'Occupied' ? 'text-red-600' :
                      bed.status === 'Reserved' ? 'text-amber-600' : 'text-gray-500'}`}>{bed.status}</p>
                    {bed.patientName && <p className="text-[9px] text-gray-500 truncate mt-0.5">{bed.patientName.split(' ')[0]}</p>}
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-4 text-xs text-gray-500 flex-wrap">
                {[['Available', 'bg-emerald-500'], ['Occupied', 'bg-red-500'], ['Reserved', 'bg-amber-500'], ['Maintenance', 'bg-gray-400']].map(([l, c]) => (
                  <div key={l} className="flex items-center gap-1.5"><span className={`w-2 h-2 rounded-sm ${c}`} />{l}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Department Distribution */}
            <div className="medical-card p-5">
              <h3 className="font-bold text-gray-900 font-display text-sm mb-3">Dept. Patient Distribution</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={DEPARTMENT_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                    {DEPARTMENT_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                {DEPARTMENT_DATA.map(d => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="text-[10px] text-gray-600 truncate">{d.name} ({d.value}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* OPD Queue */}
            <div className="medical-card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 font-display text-sm">OPD Queue</h3>
                <span className="badge-warning text-xs">{queueItems.filter(q => !q.called).length} waiting</span>
              </div>
              <div className="space-y-2">
                {queueItems.map(q => (
                  <div key={q.token} className={`flex items-center gap-2 p-2 rounded-lg transition-all ${q.called ? 'bg-emerald-50 opacity-60' : 'bg-gray-50'}`}>
                    <span className={`badge text-[10px] flex-shrink-0 ${q.called ? 'badge-success' : 'badge-primary'}`}>{q.token}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{q.name}</p>
                      <p className="text-[10px] text-gray-500">{q.dept}</p>
                    </div>
                    {!q.called ? (
                      <button onClick={() => callPatient(q.token)} className="text-[10px] font-semibold px-2 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex-shrink-0">
                        Call
                      </button>
                    ) : (
                      <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    )}
                  </div>
                ))}
                <button onClick={() => showToast('New patient added to queue')} className="w-full flex items-center justify-center gap-1 text-xs text-primary-600 font-medium py-1.5 border border-dashed border-primary-300 rounded-lg hover:bg-primary-50 transition-colors mt-1">
                  <Plus className="w-3 h-3" /> Add to Queue
                </button>
              </div>
            </div>

            <ActivityFeed />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
