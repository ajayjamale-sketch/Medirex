import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Video, Mic, MicOff, VideoOff, Phone, MessageSquare, FileText, Users, Clock, Send, Monitor, Settings } from 'lucide-react';
import { MOCK_APPOINTMENTS } from '@/constants/mockData';
import { useNavigate } from 'react-router-dom';

export default function Telemedicine() {
  const navigate = useNavigate();
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Dr. Harrison', text: 'Hello! I can see you clearly. How are you feeling today?', time: '10:32 AM', self: false },
    { id: 2, sender: 'You', text: 'Good morning Doctor. I have been experiencing some chest discomfort.', time: '10:32 AM', self: true },
    { id: 3, sender: 'Dr. Harrison', text: 'I see. Let me pull up your recent ECG results. Can you describe the discomfort?', time: '10:33 AM', self: false },
  ]);
  const [sessionTime, setSessionTime] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  useEffect(() => {
    if (!activeSession) return;
    const timer = setInterval(() => setSessionTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, [activeSession]);

  const teleApts = MOCK_APPOINTMENTS.filter(a => a.type === 'Telemedicine');
  const formatTime = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), sender: 'You', text: message, time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}), self: true }]);
    setMessage('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now()+1, sender: 'Dr. Harrison', text: 'Thank you for sharing that. Based on your symptoms and the test results, I recommend...', time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}), self: false }]);
    }, 1500);
  };

  return (
    <DashboardLayout>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in flex items-center gap-2">
          <span className="w-4 h-4 text-emerald-400">✓</span> {toast}
        </div>
      )}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Telemedicine</h1>
          <p className="text-gray-500 text-sm mt-0.5">HD video consultations with integrated clinical tools</p>
        </div>

        {activeSession ? (
          /* Active Call UI */
          <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
            {/* Video Area */}
            <div className={`${chatOpen ? 'lg:col-span-2' : 'lg:col-span-3'} flex flex-col`}>
              <div className="flex-1 bg-medical-navy rounded-2xl relative overflow-hidden">
                {/* Remote video */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src="https://i.pravatar.cc/150?u=1612349317150-e413f6a5b16d"
                    alt="Doctor" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-medical-navy/30" />
                </div>

                {/* Self video (PiP) */}
                <div className="absolute top-4 right-4 w-32 h-24 bg-gray-700 rounded-xl overflow-hidden border-2 border-white/20">
                  {camOn ? (
                    <img src="https://i.pravatar.cc/150?u=1494790108755-2616b612b47c"
                      alt="You" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-600">
                      <VideoOff className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Session info */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-white text-xs font-semibold">{formatTime(sessionTime)}</span>
                  </div>
                  <div className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">HD Quality</div>
                </div>

                {/* Doctor name */}
                <div className="absolute bottom-20 left-4">
                  <p className="text-white font-semibold">Dr. Robert Harrison</p>
                  <p className="text-gray-300 text-xs">Cardiologist · Medirex Medical Center</p>
                </div>

                {/* Controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                  <button onClick={() => setMicOn(!micOn)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${micOn ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500 hover:bg-red-600'}`}>
                    {micOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
                  </button>
                  <button onClick={() => setCamOn(!camOn)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${camOn ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500 hover:bg-red-600'}`}>
                    {camOn ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
                  </button>
                  <button onClick={() => setActiveSession(null)} className="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all shadow-lg">
                    <Phone className="w-6 h-6 text-white rotate-[135deg]" />
                  </button>
                  <button onClick={() => setChatOpen(!chatOpen)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${chatOpen ? 'bg-primary-500 hover:bg-primary-600' : 'bg-white/20 hover:bg-white/30'}`}>
                    <MessageSquare className="w-5 h-5 text-white" />
                  </button>
                  <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all">
                    <Monitor className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Panel */}
            {chatOpen && (
              <div className="medical-card flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900 text-sm">Session Chat</h3>
                </div>
                <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] ${msg.self ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-2xl px-4 py-2.5`}>
                        {!msg.self && <p className="text-[10px] font-semibold text-primary-600 mb-0.5">{msg.sender}</p>}
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <p className={`text-[10px] mt-1 ${msg.self ? 'text-primary-200' : 'text-gray-400'}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <div className="flex gap-2">
                    <input value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    <button onClick={sendMessage} className="w-9 h-9 bg-primary-600 text-white rounded-xl flex items-center justify-center hover:bg-primary-700 transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Session list */
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="medical-card p-5">
                <h2 className="font-bold text-gray-900 font-display mb-4">Upcoming Telemedicine Sessions</h2>
                <div className="space-y-3">
                  {teleApts.map(apt => (
                    <div key={apt.id} className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:border-primary-200 hover:bg-primary-50/30 transition-all">
                      <img src={apt.avatar} alt={apt.patientName} className="w-10 h-10 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm">{apt.patientName}</p>
                        <p className="text-xs text-gray-500">{apt.doctorName} · {apt.date} {apt.time}</p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{apt.reason}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`badge text-[10px] ${apt.status === 'Confirmed' ? 'badge-success' : apt.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'badge-primary'}`}>{apt.status}</span>
                        <button onClick={() => setActiveSession(apt.id)} className="btn-primary text-xs py-1.5 px-3">
                          <Video className="w-3.5 h-3.5" /> Join
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="medical-card p-5 text-center">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Video className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900 font-display mb-1">Start Instant Consult</h3>
                <p className="text-sm text-gray-500 mb-4">Connect with an available doctor immediately</p>
                <button onClick={() => setActiveSession('instant')} className="btn-primary w-full justify-center">
                  <Video className="w-4 h-4" /> Start Now
                </button>
              </div>
              <div className="medical-card p-5">
                <h3 className="font-bold text-gray-900 font-display text-sm mb-3">Session Stats</h3>
                {[
                  { label: 'Sessions This Week', value: '8' },
                  { label: 'Average Duration', value: '24 min' },
                  { label: 'Patient Satisfaction', value: '4.9/5' },
                ].map(s => (
                  <div key={s.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0 text-sm">
                    <span className="text-gray-500">{s.label}</span>
                    <span className="font-semibold text-gray-900">{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Section 5: Hardware & Device Test Panel */}
              <div className="medical-card p-5 space-y-3">
                <h3 className="font-bold text-gray-900 font-display text-xs mb-1.5 flex items-center gap-1.5">
                  <Settings className="w-4 h-4 text-primary-600" /> Hardware Test Panel
                </h3>
                <p className="text-[10px] text-slate-500">Perform a quick diagnostic of your mic and camera streams prior to joining consultations.</p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => showToast('✓ Microphone test: audio levels normal')} className="p-2 border border-slate-200 hover:border-primary-500 rounded-lg text-[10px] font-bold text-slate-700 bg-white transition-all text-center">
                    Test Mic
                  </button>
                  <button onClick={() => showToast('✓ Camera test: video feed verified')} className="p-2 border border-slate-200 hover:border-primary-500 rounded-lg text-[10px] font-bold text-slate-700 bg-white transition-all text-center">
                    Test Camera
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
