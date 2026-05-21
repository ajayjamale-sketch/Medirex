import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AlertTriangle, Phone, MapPin, Activity, Zap, ChevronRight, Clock, User, Heart } from 'lucide-react';
import { MOCK_EMERGENCY_CASES } from '@/constants/mockData';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const SEVERITY_STYLES: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700 border-red-200',
  High: 'bg-orange-100 text-orange-700 border-orange-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
  Low: 'bg-gray-100 text-gray-600 border-gray-200',
};

const STATUS_STYLES: Record<string, string> = {
  Incoming: 'bg-red-500 text-white',
  Arrived: 'bg-amber-500 text-white',
  'In Treatment': 'bg-primary-500 text-white',
  Stabilized: 'bg-emerald-500 text-white',
  Discharged: 'bg-gray-500 text-white',
};

export default function Emergency() {
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(5);
  const [cases, setCases] = useState(MOCK_EMERGENCY_CASES);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [etaUpdates, setEtaUpdates] = useState<Record<string, number>>({});
  const { user } = useAuth();
  const isPatient = user?.role === 'patient';
  
  // Patient SOS simulation state
  const [patientStatus, setPatientStatus] = useState(1); // 1: Requested, 2: Dispatched, 3: Arrived

  useEffect(() => {
    const timer = setInterval(() => {
      setEtaUpdates(prev => {
        const updated = { ...prev };
        cases.forEach(c => {
          if (c.eta) {
            const current = updated[c.id] ?? c.eta;
            updated[c.id] = Math.max(0, current - 0.1);
          }
        });
        return updated;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [cases]);

  useEffect(() => {
    if (!sosActive) { setSosCountdown(5); return; }
    if (sosCountdown <= 0) { setSosActive(false); setSosCountdown(5); return; }
    const timer = setTimeout(() => setSosCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [sosActive, sosCountdown]);

  const detail = selectedCase ? cases.find(c => c.id === selectedCase) : null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Emergency Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-500" /> {isPatient ? 'Emergency SOS Tracker' : 'Emergency Services'}
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">{isPatient ? 'Live tracking of your emergency response' : 'Real-time emergency monitoring, dispatch & response'}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setSosActive(!sosActive)}
              className={`relative px-6 py-3 rounded-xl font-bold text-sm transition-all ${sosActive ? 'bg-red-600 text-white animate-pulse' : 'bg-red-50 text-red-600 border-2 border-red-500 hover:bg-red-500 hover:text-white'}`}>
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              {sosActive ? `SOS SENDING (${sosCountdown}s)` : 'Activate SOS'}
            </button>
          </div>
        </div>

        {isPatient ? (
          <div className="medical-card p-8 text-center max-w-2xl mx-auto mt-10">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 font-display mb-2">Emergency Response Active</h2>
            <p className="text-gray-500 mb-8">An ambulance has been dispatched to your location.</p>
            
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 -z-10" />
              <div className="flex justify-between">
                {[
                  { step: 1, label: 'SOS Sent' },
                  { step: 2, label: 'Ambulance Dispatched' },
                  { step: 3, label: 'Arrived at Location' },
                ].map(s => (
                  <div key={s.step} className="flex flex-col items-center bg-white px-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-all ${patientStatus >= s.step ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'bg-gray-200 text-gray-400'}`}>
                      {s.step}
                    </div>
                    <span className={`text-xs font-bold ${patientStatus >= s.step ? 'text-gray-900' : 'text-gray-400'}`}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 p-4 bg-amber-50 rounded-xl border border-amber-200 text-left flex gap-4 items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm text-2xl">🚑</div>
              <div>
                <p className="font-bold text-amber-900">Ambulance AMB-012</p>
                <p className="text-sm text-amber-700 font-medium">ETA: 4 minutes</p>
                <p className="text-xs text-amber-600 mt-1">Paramedic Unit is en route to your saved home address.</p>
              </div>
            </div>

            {/* Sim controls */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-bold">Simulator Controls</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3].map(step => (
                  <button key={step} onClick={() => setPatientStatus(step)} className={`px-4 py-2 text-xs font-bold rounded-lg ${patientStatus === step ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Step {step}</button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Live Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Emergencies', value: cases.filter(c => c.status === 'Incoming' || c.status === 'In Treatment').length, color: 'text-red-600 bg-red-50 border-red-100', animate: true },
            { label: 'Ambulances Dispatched', value: cases.filter(c => c.ambulanceId).length, color: 'text-amber-600 bg-amber-50 border-amber-100', animate: false },
            { label: 'ER Beds Available', value: 3, color: 'text-emerald-600 bg-emerald-50 border-emerald-100', animate: false },
            { label: 'Response Time Avg', value: '6.2 min', color: 'text-primary-600 bg-primary-50 border-primary-100', animate: false },
          ].map(s => (
            <div key={s.label} className={`p-4 rounded-2xl border ${s.color}`}>
              <div className={`text-2xl font-bold font-display ${s.animate ? 'animate-pulse' : ''}`}>{s.value}</div>
              <div className="text-sm font-medium mt-0.5 opacity-80">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Active Cases */}
          <div className="space-y-3">
            <h2 className="font-bold text-gray-900 font-display">Active Emergency Cases</h2>
            {cases.map(emcase => (
              <div key={emcase.id}
                onClick={() => setSelectedCase(emcase.id === selectedCase ? null : emcase.id)}
                className={`medical-card p-4 cursor-pointer border-2 transition-all ${selectedCase === emcase.id ? 'border-primary-500' : 'border-transparent'} ${emcase.severity === 'Critical' ? 'hover:border-red-300' : 'hover:border-gray-200'}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${emcase.severity === 'Critical' ? 'bg-red-100' : 'bg-amber-100'}`}>
                    <User className={`w-5 h-5 ${emcase.severity === 'Critical' ? 'text-red-600' : 'text-amber-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-gray-900 text-sm">{emcase.patientName}</p>
                      <span className={`badge text-[10px] ${STATUS_STYLES[emcase.status] || 'badge-primary'}`}>{emcase.status}</span>
                      <span className={`badge text-[10px] border ${SEVERITY_STYLES[emcase.severity]}`}>{emcase.severity}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5 font-medium">{emcase.condition}</p>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      {emcase.location && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" /> {emcase.location}
                        </div>
                      )}
                      {emcase.eta && (
                        <div className="flex items-center gap-1 text-xs text-red-600 font-semibold">
                          <Clock className="w-3 h-3" /> ETA: {Math.max(0, Math.round((etaUpdates[emcase.id] ?? emcase.eta)))} min
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${selectedCase === emcase.id ? 'rotate-90' : ''}`} />
                </div>

                {selectedCase === emcase.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[
                        { label: 'BP', value: emcase.vitals.bp },
                        { label: 'Pulse', value: `${emcase.vitals.pulse} bpm` },
                        { label: 'SpO2', value: `${emcase.vitals.spo2}%` },
                        { label: 'Temp', value: `${emcase.vitals.temp}°C` },
                      ].map(v => (
                        <div key={v.label} className={`p-2 rounded-lg text-center ${emcase.vitals.spo2 < 95 && v.label === 'SpO2' ? 'bg-red-50 text-red-600' : 'bg-gray-50'}`}>
                          <p className="font-bold text-xs">{v.value}</p>
                          <p className="text-[9px] text-gray-500">{v.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {emcase.ambulanceId && (
                        <div className="flex-1 p-2 bg-amber-50 border border-amber-100 rounded-lg text-center">
                          <p className="text-xs font-semibold text-amber-700">{emcase.ambulanceId}</p>
                          <p className="text-[10px] text-amber-600">Ambulance</p>
                        </div>
                      )}
                      {emcase.assignedDoctor && (
                        <div className="flex-1 p-2 bg-primary-50 border border-primary-100 rounded-lg text-center">
                          <p className="text-xs font-semibold text-primary-700 truncate">{emcase.assignedDoctor}</p>
                          <p className="text-[10px] text-primary-600">Assigned MD</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button className="flex-1 btn-danger text-xs py-2 justify-center"><Phone className="w-3 h-3" /> Call Team</button>
                      <button className="flex-1 btn-primary text-xs py-2 justify-center"><Activity className="w-3 h-3" /> Update Status</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right panel */}
          <div className="space-y-5">
            {/* Ambulance Fleet */}
            <div className="medical-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-bold text-gray-900 font-display text-sm">Ambulance Fleet Status</h3>
                <span className="badge-danger ml-auto">2 Dispatched</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { id: 'AMB-007', status: 'Dispatched', location: '5th Ave & 42nd', eta: '4 min', color: 'text-red-600 bg-red-50' },
                  { id: 'AMB-012', status: 'Dispatched', location: 'Broadway & 34th', eta: '8 min', color: 'text-red-600 bg-red-50' },
                  { id: 'AMB-003', status: 'Available', location: 'Station A', eta: '-', color: 'text-emerald-600 bg-emerald-50' },
                  { id: 'AMB-019', status: 'Returning', location: 'Park Ave', eta: '12 min', color: 'text-amber-600 bg-amber-50' },
                ].map(amb => (
                  <div key={amb.id} className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${amb.color}`}>
                      <Heart className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-xs">{amb.id}</p>
                      <p className="text-[10px] text-gray-500">{amb.location}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-semibold ${amb.color.split(' ')[0]}`}>{amb.status}</p>
                      {amb.eta !== '-' && <p className="text-[10px] text-gray-400">ETA {amb.eta}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Protocols */}
            <div className="medical-card p-5">
              <h3 className="font-bold text-gray-900 font-display text-sm mb-3">Quick Response Protocols</h3>
              <div className="space-y-2">
                {[
                  { name: 'Code Blue - Cardiac Arrest', shortcut: 'CB-001' },
                  { name: 'Code Red - Stroke Protocol', shortcut: 'CR-002' },
                  { name: 'Trauma Level 1 Activation', shortcut: 'TL1-003' },
                  { name: 'Mass Casualty Incident', shortcut: 'MCI-004' },
                ].map(proto => (
                  <button key={proto.name} className="w-full flex items-center justify-between p-2.5 border border-red-100 bg-red-50 rounded-xl hover:bg-red-100 transition-colors text-left">
                    <span className="text-xs font-semibold text-red-700">{proto.name}</span>
                    <span className="text-[10px] text-red-500 font-mono">{proto.shortcut}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Triage */}
            <div className="medical-card p-5 border border-primary-100">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-primary-600" />
                <h3 className="font-bold text-gray-900 font-display text-sm">AI Triage Recommendations</h3>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-xs font-semibold text-red-700">🚨 EM-001: Immediate cath lab activation recommended. Predicted STEMI. Clopidogrel 300mg loading dose.</p>
                </div>
                <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-xl">
                  <p className="text-xs font-semibold text-amber-700">⚠️ EM-002: Stroke scale score 14. tPA eligibility check required. CT scan priority.</p>
                </div>
              </div>
            </div>
            </div>
          </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
