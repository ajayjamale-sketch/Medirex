import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { MOCK_APPOINTMENTS, MOCK_DOCTORS } from '@/constants/mockData';
import { Calendar, Plus, Search, Video, MapPin, ChevronLeft, ChevronRight, Clock, Check, X, User, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Appointment } from '@/types';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function MiniCalendar({ onDaySelect }: { onDaySelect?: (day: number) => void }) {
  const today = new Date();
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(today.getDate());
  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const apptDays = [5, 12, 20, 21, 22, 25, 28];

  return (
    <div className="medical-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 font-display text-sm">{MONTHS[month]} {year}</h3>
        <div className="flex gap-1">
          <button onClick={() => setCurrent(new Date(year, month - 1, 1))} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
          <button onClick={() => setCurrent(new Date(year, month + 1, 1))} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {DAYS.map(d => <div key={d} className="text-[10px] font-semibold text-gray-400">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
        {Array(daysInMonth).fill(null).map((_, i) => {
          const day = i + 1;
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const isSelected = day === selected && month === today.getMonth();
          const hasApt = apptDays.includes(day);
          return (
            <button key={day} onClick={() => { setSelected(day); onDaySelect?.(day); }}
              className={`w-7 h-7 rounded-lg text-xs font-medium mx-auto flex items-center justify-center relative transition-all ${isToday ? 'bg-primary-600 text-white' : isSelected ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100 text-gray-700'}`}>
              {day}
              {hasApt && !isToday && !isSelected && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full" />}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50 text-xs text-gray-500">
        <div className="flex items-center gap-1"><span className="w-2 h-2 bg-primary-600 rounded-sm" /> Today</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 bg-primary-100 rounded-sm" /> Selected</div>
        <div className="flex items-center gap-1.5"><span className="w-1 h-1 bg-primary-500 rounded-full" /> Has appts</div>
      </div>
    </div>
  );
}

const STATUS_STYLES: Record<string, string> = {
  'Scheduled': 'badge-primary',
  'Confirmed': 'bg-emerald-100 text-emerald-700',
  'Completed': 'bg-gray-100 text-gray-600',
  'Cancelled': 'bg-red-100 text-red-600',
  'In Progress': 'bg-amber-100 text-amber-700',
};

export default function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookStep, setBookStep] = useState<1|2|3>(1);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({ date: '', time: '', type: 'In-Person', reason: '' });
  const [toast, setToast] = useState<string | null>(null);
  const [actionModal, setActionModal] = useState<{ type: string; apt: Appointment } | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const filtered = appointments.filter(a =>
    (statusFilter === 'All' || a.status === statusFilter) &&
    (typeFilter === 'All' || a.type === typeFilter) &&
    (a.patientName.toLowerCase().includes(search.toLowerCase()) || a.doctorName.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAction = (action: string, apt: Appointment) => {
    if (action === 'join') { navigate('/telemedicine'); return; }
    if (action === 'view') { navigate('/emr'); return; }
    setActionModal({ type: action, apt });
  };

  const confirmAction = () => {
    if (!actionModal) return;
    const { type, apt } = actionModal;
    if (type === 'confirm') {
      setAppointments(prev => prev.map(a => a.id === apt.id ? { ...a, status: 'Completed' as const } : a));
      showToast('Appointment marked as completed');
    } else if (type === 'cancel') {
      setAppointments(prev => prev.map(a => a.id === apt.id ? { ...a, status: 'Cancelled' as const } : a));
      showToast('Appointment cancelled');
    }
    setActionModal(null);
  };

  const handleBook = () => {
    const doc = MOCK_DOCTORS.find(d => d.id === selectedDoctor);
    if (!doc || !bookingData.date || !bookingData.time) return;
    const newApt: Appointment = {
      id: `apt${Date.now()}`, patientId: 'p001', patientName: 'Sarah Johnson',
      doctorId: doc.id, doctorName: doc.name, specialization: doc.specialization,
      date: bookingData.date, time: bookingData.time, type: bookingData.type as 'In-Person' | 'Telemedicine',
      status: 'Scheduled', reason: bookingData.reason || 'Consultation', fee: doc.consultationFee,
    };
    setAppointments(prev => [newApt, ...prev]);
    setShowBookModal(false);
    setBookStep(1);
    setSelectedDoctor(null);
    setBookingData({ date: '', time: '', type: 'In-Person', reason: '' });
    showToast('Appointment booked successfully!');
  };

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
            <h1 className="text-2xl font-bold text-gray-900 font-display">Appointments</h1>
            <p className="text-gray-500 text-sm mt-0.5">Schedule, manage, and track all appointments</p>
          </div>
          <button onClick={() => setShowBookModal(true)} className="btn-primary text-sm py-2.5">
            <Plus className="w-4 h-4" /> Book Appointment
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Today's Appointments", value: appointments.filter(a => a.date === '2026-05-20').length, color: 'text-primary-600 bg-primary-50 border-primary-100' },
            { label: 'Confirmed', value: appointments.filter(a => a.status === 'Confirmed').length, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
            { label: 'In Progress', value: appointments.filter(a => a.status === 'In Progress').length, color: 'text-amber-600 bg-amber-50 border-amber-100' },
            { label: 'Scheduled', value: appointments.filter(a => a.status === 'Scheduled').length, color: 'text-sky-600 bg-sky-50 border-sky-100' },
          ].map(s => (
            <button key={s.label} onClick={() => setStatusFilter(s.label.includes('Today') ? 'All' : s.label)}
              className={`p-4 rounded-2xl border text-left transition-all hover:scale-105 ${s.color}`}>
              <div className="text-2xl font-bold font-display">{s.value}</div>
              <div className="text-sm font-medium opacity-80 mt-0.5">{s.label}</div>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search appointments..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full" />
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                {['All', 'Scheduled', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
              </select>
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                {['All', 'In-Person', 'Telemedicine'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Appointment list */}
            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="medical-card p-12 text-center">
                  <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="font-semibold text-gray-500">No appointments found</p>
                  <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or book a new appointment</p>
                  <button onClick={() => setShowBookModal(true)} className="btn-primary mt-4 text-sm"><Plus className="w-4 h-4" /> Book Appointment</button>
                </div>
              ) : filtered.map(apt => (
                <div key={apt.id} className="medical-card p-4 group">
                  <div className="flex items-start gap-3">
                    <img src={apt.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(apt.patientName)}&background=0284C7&color=fff`} alt={apt.patientName} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">{apt.patientName}</p>
                          <p className="text-xs text-gray-500 truncate">{apt.doctorName} · {apt.specialization}</p>
                        </div>
                        <span className={`badge text-[10px] flex-shrink-0 ${STATUS_STYLES[apt.status] || 'badge-primary'}`}>{apt.status}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{apt.reason}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />{apt.date} · {apt.time}
                        </div>
                        <div className={`flex items-center gap-1 text-xs ${apt.type === 'Telemedicine' ? 'text-primary-600' : 'text-gray-500'}`}>
                          {apt.type === 'Telemedicine' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                          {apt.type}
                        </div>
                        <span className="text-xs font-semibold text-emerald-600">${apt.fee}</span>
                      </div>
                      {(apt.status === 'Confirmed' || apt.status === 'Scheduled' || apt.status === 'In Progress') && (
                        <div className="flex gap-2 mt-3">
                          {apt.type === 'Telemedicine' && (
                            <button onClick={() => navigate('/telemedicine')} className="flex items-center gap-1 px-3 py-1.5 bg-primary-600 text-white rounded-lg text-xs font-semibold hover:bg-primary-700 transition-colors">
                              <Video className="w-3 h-3" /> Join
                            </button>
                          )}
                          {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                            <>
                              <button onClick={() => handleAction('confirm', apt)} className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors">
                                <Check className="w-3 h-3" /> Complete
                              </button>
                              <button onClick={() => handleAction('cancel', apt)} className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors">
                                <X className="w-3 h-3" /> Cancel
                              </button>
                            </>
                          )}
                          <button onClick={() => navigate('/emr')} className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors">
                            <User className="w-3 h-3" /> EMR
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            <MiniCalendar />

            {/* Available Doctors */}
            <div className="medical-card p-5">
              <h3 className="font-bold text-gray-900 font-display text-sm mb-3">Available Doctors</h3>
              <div className="space-y-2.5">
                {MOCK_DOCTORS.filter(d => d.available).slice(0, 3).map(doc => (
                  <button key={doc.id} onClick={() => { setShowBookModal(true); setSelectedDoctor(doc.id); setBookStep(2); }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors text-left">
                    <img src={doc.avatar} alt={doc.name} className="w-9 h-9 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-xs truncate">{doc.name}</p>
                      <p className="text-[10px] text-gray-500">{doc.specialization} · ${doc.consultationFee}</p>
                    </div>
                    <div className="text-right">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full block mb-1" />
                      <span className="text-[10px] text-gray-400">⭐ {doc.rating}</span>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => navigate('/emr')} className="btn-ghost w-full justify-center text-xs mt-3 border border-gray-100">
                View All Doctors <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="medical-card p-5">
              <h3 className="font-bold text-gray-900 font-display text-sm mb-3">Appointment Stats</h3>
              {[
                { label: 'This Week', value: appointments.filter(a => a.date >= '2026-05-18').length },
                { label: 'Telemedicine', value: appointments.filter(a => a.type === 'Telemedicine').length },
                { label: 'Completed', value: appointments.filter(a => a.status === 'Completed').length },
                { label: 'Cancelled', value: appointments.filter(a => a.status === 'Cancelled').length },
              ].map(s => (
                <div key={s.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0 text-sm">
                  <span className="text-gray-500">{s.label}</span>
                  <span className="font-semibold text-gray-900">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Confirmation Modal */}
      {actionModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setActionModal(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-gray-900 font-display mb-2">
              {actionModal.type === 'confirm' ? 'Complete Appointment' : 'Cancel Appointment'}
            </h3>
            <div className="p-3 bg-gray-50 rounded-xl mb-4">
              <p className="font-semibold text-sm text-gray-900">{actionModal.apt.patientName}</p>
              <p className="text-xs text-gray-500">{actionModal.apt.doctorName} · {actionModal.apt.date} {actionModal.apt.time}</p>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {actionModal.type === 'confirm' ? 'Mark this appointment as completed. The patient EMR will be updated.' : 'Cancel this appointment. The patient will be notified.'}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setActionModal(null)} className="flex-1 btn-ghost border border-gray-200 justify-center">Back</button>
              <button onClick={confirmAction} className={`flex-1 ${actionModal.type === 'confirm' ? 'btn-primary' : 'btn-danger'} justify-center`}>
                {actionModal.type === 'confirm' ? <><Check className="w-4 h-4" /> Complete</> : <><X className="w-4 h-4" /> Cancel</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Book Appointment Modal */}
      {showBookModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => { setShowBookModal(false); setBookStep(1); }}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full animate-scale-in max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 font-display">Book Appointment</h3>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1,2,3].map(s => <div key={s} className={`h-1.5 w-10 rounded-full transition-all ${s <= bookStep ? 'bg-primary-500' : 'bg-gray-200'}`} />)}
                </div>
                <span className="text-xs text-gray-400">Step {bookStep}/3</span>
              </div>
            </div>

            {bookStep === 1 && (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-700">Select Doctor</p>
                {MOCK_DOCTORS.map(doc => (
                  <div key={doc.id} onClick={() => setSelectedDoctor(doc.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedDoctor === doc.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <img src={doc.avatar} alt={doc.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.specialization} · ${doc.consultationFee} · ⭐ {doc.rating}</p>
                    </div>
                    <span className={`badge text-[10px] ${doc.available ? 'badge-success' : 'badge-warning'}`}>{doc.available ? 'Available' : doc.nextAvailable}</span>
                  </div>
                ))}
                <div className="flex gap-3 mt-4">
                  <button onClick={() => setShowBookModal(false)} className="flex-1 btn-ghost border border-gray-200 justify-center">Cancel</button>
                  <button disabled={!selectedDoctor} onClick={() => setBookStep(2)} className="flex-1 btn-primary justify-center disabled:opacity-50">Next →</button>
                </div>
              </div>
            )}

            {bookStep === 2 && (
              <div className="space-y-4">
                <p className="text-sm font-semibold text-gray-700">Select Date & Time</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Date</label>
                    <input type="date" value={bookingData.date} onChange={e => setBookingData(d => ({...d, date: e.target.value}))} className="input-medical" min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Type</label>
                    <select value={bookingData.type} onChange={e => setBookingData(d => ({...d, type: e.target.value}))} className="input-medical">
                      <option>In-Person</option><option>Telemedicine</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Available Time Slots</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['9:00 AM', '10:30 AM', '11:00 AM', '2:00 PM', '3:30 PM', '4:00 PM'].map(slot => (
                      <button key={slot} onClick={() => setBookingData(d => ({...d, time: slot}))}
                        className={`py-2 text-xs font-semibold rounded-xl border-2 transition-all ${bookingData.time === slot ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-200 text-gray-600 hover:border-primary-300 hover:bg-primary-50'}`}>
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setBookStep(1)} className="flex-1 btn-ghost border border-gray-200 justify-center">← Back</button>
                  <button disabled={!bookingData.date || !bookingData.time} onClick={() => setBookStep(3)} className="flex-1 btn-primary justify-center disabled:opacity-50">Next →</button>
                </div>
              </div>
            )}

            {bookStep === 3 && (
              <div className="space-y-4">
                <p className="text-sm font-semibold text-gray-700">Reason for Visit</p>
                <textarea value={bookingData.reason} onChange={e => setBookingData(d => ({...d, reason: e.target.value}))} placeholder="Describe your symptoms or reason for consultation..." rows={4} className="input-medical resize-none" />
                <div className="p-3 bg-primary-50 rounded-xl">
                  <p className="text-xs font-semibold text-primary-600 mb-1">Booking Summary</p>
                  <p className="font-semibold text-primary-900 text-sm">{MOCK_DOCTORS.find(d => d.id === selectedDoctor)?.name}</p>
                  <p className="text-xs text-primary-600">{bookingData.date} · {bookingData.time} · {bookingData.type}</p>
                  <p className="text-xs font-semibold text-emerald-600 mt-1">Fee: ${MOCK_DOCTORS.find(d => d.id === selectedDoctor)?.consultationFee}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setBookStep(2)} className="flex-1 btn-ghost border border-gray-200 justify-center">← Back</button>
                  <button onClick={handleBook} className="flex-1 btn-primary justify-center"><Check className="w-4 h-4" /> Confirm Booking</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
