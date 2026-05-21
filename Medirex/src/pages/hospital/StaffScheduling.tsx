import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Users, Calendar, Clock, Plus, Edit2, Check, X, ChevronLeft, ChevronRight,
  UserCheck, AlertTriangle, Phone
} from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SHIFTS = ['Morning (06:00–14:00)', 'Afternoon (14:00–22:00)', 'Night (22:00–06:00)', 'Off'];
const DEPARTMENTS = ['All', 'Emergency', 'ICU', 'General Ward', 'Surgery', 'Pediatrics', 'Radiology'];

interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  department: string;
  schedule: Record<string, string>;
  phone: string;
  status: 'Active' | 'Off-Duty' | 'On-Call';
}

const INITIAL_STAFF: StaffMember[] = [
  {
    id: 's1', name: 'Dr. Robert Harrison', role: 'Cardiologist', phone: '+1 (555) 123-4567',
    avatar: 'https://i.pravatar.cc/150?u=1612349317150-e413f6a5b16d',
    department: 'ICU', status: 'Active',
    schedule: { Monday: 'Morning (06:00–14:00)', Tuesday: 'Morning (06:00–14:00)', Wednesday: 'Off', Thursday: 'Afternoon (14:00–22:00)', Friday: 'Morning (06:00–14:00)', Saturday: 'Off', Sunday: 'Off' }
  },
  {
    id: 's2', name: 'Dr. Maria Torres', role: 'Emergency Physician', phone: '+1 (555) 234-5678',
    avatar: 'https://i.pravatar.cc/150?u=1559839734-2b71ea197ec2',
    department: 'Emergency', status: 'Active',
    schedule: { Monday: 'Afternoon (14:00–22:00)', Tuesday: 'Afternoon (14:00–22:00)', Wednesday: 'Night (22:00–06:00)', Thursday: 'Night (22:00–06:00)', Friday: 'Off', Saturday: 'Morning (06:00–14:00)', Sunday: 'Morning (06:00–14:00)' }
  },
  {
    id: 's3', name: 'Nurse Jennifer Kim', role: 'Head Nurse', phone: '+1 (555) 345-6789',
    avatar: 'https://i.pravatar.cc/150?u=1573496359142-b8d87734a5a2',
    department: 'General Ward', status: 'Active',
    schedule: { Monday: 'Morning (06:00–14:00)', Tuesday: 'Morning (06:00–14:00)', Wednesday: 'Morning (06:00–14:00)', Thursday: 'Off', Friday: 'Off', Saturday: 'Afternoon (14:00–22:00)', Sunday: 'Afternoon (14:00–22:00)' }
  },
  {
    id: 's4', name: 'Dr. Ahmed Al-Hassan', role: 'Anesthesiologist', phone: '+1 (555) 456-7890',
    avatar: 'https://i.pravatar.cc/150?u=1582750433449-648ed127bb54',
    department: 'Surgery', status: 'On-Call',
    schedule: { Monday: 'Off', Tuesday: 'Night (22:00–06:00)', Wednesday: 'Night (22:00–06:00)', Thursday: 'Morning (06:00–14:00)', Friday: 'Morning (06:00–14:00)', Saturday: 'Off', Sunday: 'Off' }
  },
  {
    id: 's5', name: 'Nurse Patricia Adams', role: 'ICU Nurse', phone: '+1 (555) 567-8901',
    avatar: 'https://i.pravatar.cc/150?u=1494790108755-2616b612b47c',
    department: 'ICU', status: 'Active',
    schedule: { Monday: 'Night (22:00–06:00)', Tuesday: 'Off', Wednesday: 'Morning (06:00–14:00)', Thursday: 'Morning (06:00–14:00)', Friday: 'Afternoon (14:00–22:00)', Saturday: 'Afternoon (14:00–22:00)', Sunday: 'Off' }
  },
  {
    id: 's6', name: 'Dr. Lisa Chen', role: 'Pediatrician', phone: '+1 (555) 678-9012',
    avatar: 'https://i.pravatar.cc/150?u=1527613426441-4da17471b66d',
    department: 'Pediatrics', status: 'Off-Duty',
    schedule: { Monday: 'Off', Tuesday: 'Off', Wednesday: 'Afternoon (14:00–22:00)', Thursday: 'Afternoon (14:00–22:00)', Friday: 'Afternoon (14:00–22:00)', Saturday: 'Morning (06:00–14:00)', Sunday: 'Off' }
  },
];

const SHIFT_COLORS: Record<string, string> = {
  'Morning (06:00–14:00)': 'bg-sky-100 text-sky-700 border-sky-200',
  'Afternoon (14:00–22:00)': 'bg-amber-100 text-amber-700 border-amber-200',
  'Night (22:00–06:00)': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Off': 'bg-gray-100 text-gray-400 border-gray-200',
};

const SHIFT_SHORT: Record<string, string> = {
  'Morning (06:00–14:00)': 'AM',
  'Afternoon (14:00–22:00)': 'PM',
  'Night (22:00–06:00)': 'Night',
  'Off': '—',
};

const STATUS_COLORS: Record<string, string> = {
  'Active': 'bg-emerald-100 text-emerald-700',
  'Off-Duty': 'bg-gray-100 text-gray-600',
  'On-Call': 'bg-amber-100 text-amber-700',
};

export default function StaffScheduling() {
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [selectedDept, setSelectedDept] = useState('All');
  const [editingCell, setEditingCell] = useState<{ staffId: string; day: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', role: '', department: 'General Ward', phone: '' });
  const [weekOffset, setWeekOffset] = useState(0);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const filteredStaff = selectedDept === 'All' ? staff : staff.filter(s => s.department === selectedDept);

  const handleShiftChange = (staffId: string, day: string, shift: string) => {
    setStaff(prev => prev.map(s => s.id === staffId ? { ...s, schedule: { ...s.schedule, [day]: shift } } : s));
    setEditingCell(null);
    showToast(`Shift updated for ${staff.find(s => s.id === staffId)?.name}`);
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.role) return;
    const entry: StaffMember = {
      id: `s${Date.now()}`,
      name: newStaff.name,
      role: newStaff.role,
      phone: newStaff.phone || '+1 (555) 000-0000',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newStaff.name)}&background=0284C7&color=fff`,
      department: newStaff.department,
      status: 'Active',
      schedule: Object.fromEntries(DAYS.map(d => [d, 'Off'])),
    };
    setStaff(prev => [...prev, entry]);
    setShowAddModal(false);
    setNewStaff({ name: '', role: '', department: 'General Ward', phone: '' });
    showToast(`${entry.name} added to schedule`);
  };

  // Week label
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1 + weekOffset * 7);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  const weekLabel = `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  // Coverage stats
  const morningCount = staff.filter(s => Object.values(s.schedule).some(sh => sh.includes('Morning'))).length;
  const afternoonCount = staff.filter(s => Object.values(s.schedule).some(sh => sh.includes('Afternoon'))).length;
  const nightCount = staff.filter(s => Object.values(s.schedule).some(sh => sh.includes('Night'))).length;
  const onCallCount = staff.filter(s => s.status === 'On-Call').length;

  return (
    <DashboardLayout>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-primary-600" /> Staff Scheduling
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">Manage shift assignments and on-call rotations</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="btn-primary text-sm py-2.5">
            <Plus className="w-4 h-4" /> Add Staff Member
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Morning Shift Coverage', value: morningCount, color: 'text-sky-600 bg-sky-50 border-sky-100', desc: 'staff on AM shift' },
            { label: 'Afternoon Shift', value: afternoonCount, color: 'text-amber-600 bg-amber-50 border-amber-100', desc: 'staff on PM shift' },
            { label: 'Night Shift', value: nightCount, color: 'text-indigo-600 bg-indigo-50 border-indigo-100', desc: 'overnight coverage' },
            { label: 'On-Call Standby', value: onCallCount, color: 'text-emerald-600 bg-emerald-50 border-emerald-100', desc: 'staff on call' },
          ].map(s => (
            <div key={s.label} className={`p-4 rounded-2xl border ${s.color}`}>
              <div className="text-3xl font-bold font-display">{s.value}</div>
              <p className="text-sm font-semibold mt-0.5">{s.label}</p>
              <p className="text-xs opacity-70">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Week nav + Dept filter */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button onClick={() => setWeekOffset(w => w - 1)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl">
              <Calendar className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-gray-800">{weekLabel}</span>
            </div>
            <button onClick={() => setWeekOffset(w => w + 1)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
            {weekOffset !== 0 && (
              <button onClick={() => setWeekOffset(0)} className="text-xs text-primary-600 font-semibold hover:underline">Today</button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {DEPARTMENTS.map(dept => (
              <button key={dept} onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedDept === dept ? 'bg-primary-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'}`}>
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="medical-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-52">Staff Member</th>
                  {DAYS.map((day, i) => (
                    <th key={day} className="px-2 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <span className="hidden sm:block">{DAYS_SHORT[i]}</span>
                      <span className="sm:hidden">{DAYS_SHORT[i][0]}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredStaff.map(member => (
                  <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img src={member.avatar} alt={member.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-xs truncate">{member.name}</p>
                          <p className="text-[10px] text-gray-500 truncate">{member.role} · {member.department}</p>
                          <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-0.5 ${STATUS_COLORS[member.status]}`}>
                            {member.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    {DAYS.map(day => {
                      const shift = member.schedule[day] || 'Off';
                      const isEditing = editingCell?.staffId === member.id && editingCell?.day === day;
                      return (
                        <td key={day} className="px-1.5 py-2 text-center">
                          {isEditing ? (
                            <select
                              autoFocus
                              value={shift}
                              onChange={e => handleShiftChange(member.id, day, e.target.value)}
                              onBlur={() => setEditingCell(null)}
                              className="w-full text-[10px] border border-primary-400 rounded-lg p-1 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                            >
                              {SHIFTS.map(s => <option key={s} value={s}>{SHIFT_SHORT[s] || s}</option>)}
                            </select>
                          ) : (
                            <button
                              onClick={() => setEditingCell({ staffId: member.id, day })}
                              className={`w-full py-1.5 px-1 rounded-lg border text-[10px] font-bold transition-all hover:opacity-80 ${SHIFT_COLORS[shift] || 'bg-gray-100 text-gray-400'}`}
                              title={`Click to change: ${shift}`}
                            >
                              {SHIFT_SHORT[shift] || '—'}
                            </button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="font-semibold text-gray-700">Shift Legend:</span>
            {Object.entries(SHIFT_SHORT).map(([full, short]) => (
              <div key={full} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border ${SHIFT_COLORS[full]}`}>
                <span className="font-bold">{short}</span>
                <span className="hidden sm:inline opacity-70">{full.match(/\(([^)]+)\)/)?.[1] || ''}</span>
              </div>
            ))}
            <span className="ml-auto text-primary-600">Click any cell to change a shift</span>
          </div>
        </div>

        {/* Staff Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStaff.map(member => {
            const workDays = Object.values(member.schedule).filter(s => s !== 'Off').length;
            return (
              <div key={member.id} className="medical-card p-4">
                <div className="flex items-start gap-3">
                  <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                    <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 ${STATUS_COLORS[member.status]}`}>
                      {member.status}
                    </span>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center bg-gray-50 rounded-xl p-2">
                  <div><p className="font-bold text-sm text-gray-900">{workDays}</p><p className="text-[10px] text-gray-500">Work Days</p></div>
                  <div><p className="font-bold text-sm text-gray-900">{7 - workDays}</p><p className="text-[10px] text-gray-500">Off Days</p></div>
                  <div><p className="font-bold text-sm text-primary-600">{member.department}</p><p className="text-[10px] text-gray-500">Dept.</p></div>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                  <Phone className="w-3 h-3" /> {member.phone}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 font-display">Add Staff Member</h3>
              <button onClick={() => setShowAddModal(false)}><X className="w-4 h-4 text-gray-400" /></button>
            </div>
            <form onSubmit={handleAddStaff} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name</label>
                <input required value={newStaff.name} onChange={e => setNewStaff(n => ({ ...n, name: e.target.value }))} placeholder="Dr. / Nurse full name" className="input-medical" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Role / Specialization</label>
                <input required value={newStaff.role} onChange={e => setNewStaff(n => ({ ...n, role: e.target.value }))} placeholder="e.g. Cardiologist, Head Nurse" className="input-medical" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Department</label>
                <select value={newStaff.department} onChange={e => setNewStaff(n => ({ ...n, department: e.target.value }))} className="input-medical">
                  {DEPARTMENTS.filter(d => d !== 'All').map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Contact Phone</label>
                <input type="tel" value={newStaff.phone} onChange={e => setNewStaff(n => ({ ...n, phone: e.target.value }))} placeholder="+1 (555) 000-0000" className="input-medical" />
              </div>
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 btn-ghost border border-gray-200 justify-center">Cancel</button>
                <button type="submit" className="flex-1 btn-primary justify-center"><Plus className="w-4 h-4" /> Add Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
