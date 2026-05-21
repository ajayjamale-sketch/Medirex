import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Heart, Activity, Flame, CheckSquare, Plus, BrainCircuit, TrendingUp, Droplets, Moon, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const VITALS_HISTORY = [
  { day: 'Mon', systolic: 120, diastolic: 80, hr: 72 },
  { day: 'Tue', systolic: 124, diastolic: 82, hr: 75 },
  { day: 'Wed', systolic: 118, diastolic: 78, hr: 70 },
  { day: 'Thu', systolic: 122, diastolic: 80, hr: 73 },
  { day: 'Fri', systolic: 128, diastolic: 84, hr: 78 },
  { day: 'Sat', systolic: 116, diastolic: 76, hr: 68 },
  { day: 'Sun', systolic: 121, diastolic: 79, hr: 71 },
];

export default function Wellness() {
  // Vital Logging States
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [bpm, setBpm] = useState(72);
  const [vitalsLog, setVitalsLog] = useState<{ time: string; bp: string; hr: number }[]>([
    { time: '09:00 AM', bp: '120/80', hr: 72 },
  ]);
  const [chartData, setChartData] = useState(VITALS_HISTORY);

  // Step Target
  const [stepsGoal] = useState(8000);
  const [todaySteps, setTodaySteps] = useState(5420);

  // Hydration
  const [waterGlasses, setWaterGlasses] = useState(5);
  const waterGoal = 8;

  // Sleep
  const [sleepHours, setSleepHours] = useState(7.2);

  // Medication checklist
  const [meds, setMeds] = useState([
    { id: 1, name: 'Atorvastatin 20mg (Cholesterol)', time: 'With Breakfast', taken: true },
    { id: 2, name: 'Lisinopril 10mg (Blood Pressure)', time: 'With Dinner', taken: false },
    { id: 3, name: 'Multivitamin', time: 'Anytime', taken: false },
  ]);

  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleAddVital = (e: React.FormEvent) => {
    e.preventDefault();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dayStr = days[now.getDay()];
    setVitalsLog([{ time: timeStr, bp: `${systolic}/${diastolic}`, hr: bpm }, ...vitalsLog]);
    setChartData(prev => [...prev.slice(1), { day: dayStr, systolic, diastolic, hr: bpm }]);
    showToast('Vitals logged successfully');
  };

  const toggleMed = (id: number) => {
    setMeds(meds.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
    showToast('Medication status updated');
  };

  const stepsPercent = Math.min((todaySteps / stepsGoal) * 100, 100);
  const waterPercent = Math.min((waterGlasses / waterGoal) * 100, 100);
  const healthScore = Math.round(
    (meds.filter(m => m.taken).length / meds.length) * 30 +
    stepsPercent * 0.3 +
    waterPercent * 0.2 +
    (sleepHours >= 7 ? 20 : (sleepHours / 7) * 20)
  );

  return (
    <DashboardLayout>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in flex items-center gap-2">
          <span className="text-emerald-400">✓</span> {toast}
        </div>
      )}

      <div className="space-y-6">
        {/* Header Banner */}
        <section className="bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 translate-x-10 -translate-y-2">
            <Heart className="w-64 h-64" />
          </div>
          <div className="relative space-y-2">
            <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Health Dashboard</span>
            <h1 className="text-2xl font-bold font-display">Your Health & Wellness Journey</h1>
            <p className="text-sky-100 text-xs max-w-md">Track daily vitals, review AI health predictions, and tick off your medication adherence targets.</p>
          </div>
          <div className="mt-4 flex items-center gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold font-display">{healthScore}</p>
              <p className="text-sky-200 text-xs">Health Score</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <p className="text-xl font-bold">{meds.filter(m => m.taken).length}/{meds.length}</p>
              <p className="text-sky-200 text-xs">Meds Taken</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <p className="text-xl font-bold">{todaySteps.toLocaleString()}</p>
              <p className="text-sky-200 text-xs">Steps Today</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <p className="text-xl font-bold">{sleepHours}h</p>
              <p className="text-sky-200 text-xs">Sleep Last Night</p>
            </div>
          </div>
        </section>

        {/* Vitals Chart + Logger */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recharts Vitals Chart */}
          <div className="lg:col-span-2 medical-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 font-display flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-primary-600" /> Weekly BP & Heart Rate
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">7-day blood pressure and heart rate trend</p>
              </div>
              <div className="flex gap-3 text-xs">
                <div className="flex items-center gap-1"><span className="w-3 h-0.5 bg-primary-500 inline-block rounded" /><span className="text-gray-500">Systolic</span></div>
                <div className="flex items-center gap-1"><span className="w-3 h-0.5 bg-emerald-500 inline-block rounded" /><span className="text-gray-500">Heart Rate</span></div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 145]} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="systolic" stroke="#0284C7" strokeWidth={2} dot={{ r: 4, fill: '#0284C7' }} name="Systolic BP" />
                <Line type="monotone" dataKey="hr" stroke="#10B981" strokeWidth={2} dot={{ r: 4, fill: '#10B981' }} name="Heart Rate" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Log Vitals Form */}
          <div className="medical-card p-5 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm font-display flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-primary-600" /> Log Today's Vitals
            </h3>
            <form onSubmit={handleAddVital} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Systolic BP (mmHg)</label>
                <input type="number" value={systolic} onChange={e => setSystolic(parseInt(e.target.value) || 0)}
                  className="input-medical text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Diastolic BP (mmHg)</label>
                <input type="number" value={diastolic} onChange={e => setDiastolic(parseInt(e.target.value) || 0)}
                  className="input-medical text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Heart Rate (BPM)</label>
                <input type="number" value={bpm} onChange={e => setBpm(parseInt(e.target.value) || 0)}
                  className="input-medical text-sm" />
              </div>
              <button type="submit" className="btn-primary text-xs py-2 px-4 justify-center w-full">
                <Plus className="w-4 h-4" /> Save Vitals
              </button>
            </form>
            {/* Recent log */}
            <div className="space-y-1.5 max-h-32 overflow-y-auto scrollbar-thin">
              {vitalsLog.slice(0, 4).map((log, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <p className="font-bold text-gray-800">{log.bp} mmHg</p>
                    <p className="text-[10px] text-slate-400">{log.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary-600">{log.hr} bpm</p>
                    <p className="text-[10px] text-slate-400">HR</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Trackers Row */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Steps */}
          <div className="medical-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-sm font-display flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" /> Daily Steps
              </h3>
              <span className="text-xs bg-orange-50 text-orange-600 font-bold px-2 py-0.5 rounded-full border border-orange-100">
                {todaySteps.toLocaleString()} / {stepsGoal.toLocaleString()}
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500"
                style={{ width: `${stepsPercent}%` }} />
            </div>
            <p className="text-xs text-gray-500">{stepsPercent.toFixed(0)}% of daily goal achieved</p>
            <div className="flex gap-2">
              <span className="text-[10px] text-slate-500 font-medium">Adjust:</span>
              <input type="range" min="500" max={stepsGoal} step="250" value={todaySteps}
                onChange={e => setTodaySteps(parseInt(e.target.value))}
                className="flex-1 h-1.5 bg-slate-200 rounded-lg cursor-pointer accent-orange-500" />
            </div>
          </div>

          {/* Hydration */}
          <div className="medical-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-sm font-display flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-500" /> Hydration
              </h3>
              <span className="text-xs bg-sky-50 text-sky-600 font-bold px-2 py-0.5 rounded-full border border-sky-100">
                {waterGlasses} / {waterGoal} glasses
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${waterPercent}%` }} />
            </div>
            <div className="grid grid-cols-8 gap-1 mt-1">
              {Array(waterGoal).fill(null).map((_, i) => (
                <button key={i} onClick={() => { setWaterGlasses(i + 1); showToast(`Logged ${i + 1} glass${i > 0 ? 'es' : ''} of water`); }}
                  className={`h-6 rounded-md transition-all ${i < waterGlasses ? 'bg-sky-500' : 'bg-gray-100 hover:bg-sky-100'}`} />
              ))}
            </div>
            <p className="text-xs text-gray-500">{waterGoal - waterGlasses} more glasses recommended today</p>
          </div>

          {/* Sleep */}
          <div className="medical-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-sm font-display flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-indigo-500" /> Sleep Quality
              </h3>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${sleepHours >= 7 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                {sleepHours >= 7 ? 'Good' : 'Fair'}
              </span>
            </div>
            <div className="text-center py-3">
              <p className="text-4xl font-bold font-display text-indigo-600">{sleepHours}h</p>
              <p className="text-xs text-gray-500 mt-1">Last night's sleep (goal: 7-9h)</p>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-[10px] text-slate-500">Adjust:</span>
              <input type="range" min="3" max="12" step="0.5" value={sleepHours}
                onChange={e => setSleepHours(parseFloat(e.target.value))}
                className="flex-1 h-1.5 bg-slate-200 rounded-lg cursor-pointer accent-indigo-500" />
            </div>
          </div>
        </div>

        {/* AI Coach + Medication Row */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* AI Wellness Coach */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-white/5 space-y-3 relative overflow-hidden">
            <div className="absolute right-4 top-4 text-primary-400/20">
              <BrainCircuit className="w-16 h-16" />
            </div>
            <h3 className="font-bold text-sm font-display flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-primary-400" /> AI Wellness Coach
            </h3>
            <div className="space-y-2">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs leading-relaxed">
                <p className="text-primary-300 font-bold mb-0.5">Blood Pressure Assessment</p>
                <p className="text-slate-300">Your average systolic of {systolic} mmHg is within normal range. Keep sodium below 2,000mg/day and maintain the current Lisinopril regimen.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs leading-relaxed">
                <p className="text-emerald-300 font-bold mb-0.5">Activity Recommendation</p>
                <p className="text-slate-300">You're {(stepsGoal - todaySteps).toLocaleString()} steps from your goal. A 20-minute post-dinner walk will close the gap and improve overnight glucose regulation.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs leading-relaxed">
                <p className="text-amber-300 font-bold mb-0.5">Sleep Optimization</p>
                <p className="text-slate-300">{sleepHours >= 7 ? `Great — ${sleepHours}h is within the 7–9h optimal range. Maintain consistent sleep/wake times.` : `${sleepHours}h is below the recommended 7h. Avoid screens 1 hour before bed to improve sleep onset.`}</p>
              </div>
            </div>
          </div>

          {/* Medication Checklist */}
          <div className="medical-card p-5 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm font-display flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-600" /> Daily Medication Checklist
            </h3>
            <div className="space-y-2">
              {meds.map(m => (
                <div key={m.id} onClick={() => toggleMed(m.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${m.taken ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}>
                  <div>
                    <p className={`text-xs font-bold ${m.taken ? 'text-emerald-800 line-through' : 'text-gray-800'}`}>{m.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{m.time}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${m.taken ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'}`}>
                    {m.taken && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary-600" />
                <span className="text-xs font-semibold text-gray-700">Adherence Today</span>
              </div>
              <span className={`font-bold text-sm ${meds.filter(m => m.taken).length === meds.length ? 'text-emerald-600' : 'text-amber-600'}`}>
                {Math.round((meds.filter(m => m.taken).length / meds.length) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
