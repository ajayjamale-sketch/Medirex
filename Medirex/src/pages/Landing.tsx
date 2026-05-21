import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart, Shield, Activity, Users, Stethoscope, Brain, Zap, ArrowRight,
  Video, Pill, FlaskConical, CreditCard,
  AlertTriangle, TrendingUp, BadgeCheck, FileText,
  Lock, Server, Globe, Award, Calendar
} from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';
import heroImg from '@/assets/hero-dashboard.jpg';

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, label, suffix = '', started }: { value: number; label: string; suffix?: string; started: boolean }) {
  const count = useCountUp(value, 2000, started);
  return (
    <div className="text-center">
      <div className="text-3xl lg:text-4xl font-bold text-primary-700 dark:text-white font-display">
        {started ? count.toLocaleString() : 0}{suffix}
      </div>
      <div className="text-primary-600 dark:text-sky-200 text-sm mt-1">{label}</div>
    </div>
  );
}

const PARTNERS = [
  { name: 'MedUniversal Hospital', type: 'Hospital', logo: '🏥' },
  { name: 'LifeCare Labs', type: 'Laboratory', logo: '🔬' },
  { name: 'BlueCross Insurance', type: 'Insurance', logo: '🛡️' },
  { name: 'PharmaNow', type: 'Pharmacy', logo: '💊' },
  { name: 'HealthFirst Network', type: 'Network', logo: '🌐' },
  { name: 'ClinicalEdge', type: 'Research', logo: '🧬' },
  { name: 'MediTrust', type: 'Insurance', logo: '✅' },
  { name: 'BioScan Imaging', type: 'Diagnostics', logo: '🩺' },
];

const SERVICES = [
  { icon: Stethoscope, title: 'Patient Management', desc: 'Complete patient journey from registration to discharge with AI-assisted care.', color: 'from-blue-500 to-sky-600', count: '2.4M+ patients', path: '/emr' },
  { icon: Calendar, title: 'Smart Appointments', desc: 'Intelligent scheduling with conflict detection and automated reminders.', color: 'from-emerald-500 to-teal-600', count: '850K+ bookings', path: '/appointments' },
  { icon: FileText, title: 'EMR / EHR Records', desc: 'Comprehensive electronic medical records with voice-to-text documentation.', color: 'from-violet-500 to-purple-600', count: '12M+ records', path: '/emr' },
  { icon: Video, title: 'Telemedicine Consultation', desc: 'HD video consultations with in-call prescriptions and file sharing.', color: 'from-sky-500 to-blue-600', count: '380K+ sessions', path: '/telemedicine' },
  { icon: Pill, title: 'Pharmacy & Deliveries', desc: 'Integrated pharmacy management with automated refills and delivery tracking.', color: 'from-amber-500 to-orange-600', count: '4.2M+ prescriptions', path: '/pharmacy' },
  { icon: FlaskConical, title: 'Laboratory Diagnostics', desc: 'Full lab workflow from order to digital report with AI anomaly detection.', color: 'from-rose-500 to-red-600', count: '6.8M+ tests', path: '/diagnostics' },
  { icon: CreditCard, title: 'Billing & Claims', desc: 'Automated claims processing with real-time eligibility verification.', color: 'from-green-500 to-emerald-600', count: '$2.1B processed', path: '/billing' },
  { icon: AlertTriangle, title: 'Emergency SOS', desc: 'Real-time emergency dispatch with predictive routing and triage AI.', color: 'from-red-500 to-rose-600', count: '98.2% response rate', path: '/emergency' },
];

const AI_FEATURES = [
  { icon: Brain, title: 'AI Diagnostics', desc: 'Machine learning models trained on 50M+ clinical cases for accurate differential diagnosis.', metric: '94.7% accuracy' },
  { icon: TrendingUp, title: 'Predictive Analytics', desc: 'Predict patient deterioration, readmission risk, and treatment outcomes 72hrs in advance.', metric: '87% prediction accuracy' },
  { icon: Zap, title: 'Smart Alerts', desc: 'Real-time clinical decision support with drug interaction checks and anomaly detection.', metric: '<2 sec response' },
  { icon: Activity, title: 'Emergency Intelligence', desc: 'AI-powered triage and routing optimizes emergency response and reduces mortality.', metric: '31% mortality reduction' },
];

const WORKFLOW_STEPS = [
  { icon: Users, label: 'Patient Registration', lightColor: 'bg-primary-100 text-primary-600', darkColor: 'dark:bg-primary-900/40 dark:text-primary-400', step: 1 },
  { icon: Calendar, label: 'Appointment Booking', lightColor: 'bg-sky-100 text-sky-600', darkColor: 'dark:bg-sky-900/40 dark:text-sky-400', step: 2 },
  { icon: Stethoscope, label: 'Doctor Consultation', lightColor: 'bg-teal-100 text-teal-600', darkColor: 'dark:bg-teal-900/40 dark:text-teal-400', step: 3 },
  { icon: FlaskConical, label: 'Lab & Diagnostics', lightColor: 'bg-purple-100 text-purple-600', darkColor: 'dark:bg-purple-900/40 dark:text-purple-400', step: 4 },
  { icon: Pill, label: 'Pharmacy & Meds', lightColor: 'bg-amber-100 text-amber-600', darkColor: 'dark:bg-amber-900/40 dark:text-amber-400', step: 5 },
  { icon: CreditCard, label: 'Billing & Insurance', lightColor: 'bg-green-100 text-green-600', darkColor: 'dark:bg-green-900/40 dark:text-green-400', step: 6 },
];

const SECURITY_FEATURES = [
  { icon: Shield, title: 'HIPAA Compliant', desc: 'Full HIPAA compliance with automated audit trails and access controls', light: 'text-primary-600 bg-primary-50', dark: 'dark:text-primary-400 dark:bg-primary-900/30' },
  { icon: Lock, title: 'AES-256 Encryption', desc: 'Military-grade encryption for all patient data at rest and in transit', light: 'text-emerald-600 bg-emerald-50', dark: 'dark:text-emerald-400 dark:bg-emerald-900/30' },
  { icon: Server, title: 'SOC 2 Type II', desc: 'Third-party verified security controls and operational excellence', light: 'text-purple-600 bg-purple-50', dark: 'dark:text-purple-400 dark:bg-purple-900/30' },
  { icon: Globe, title: 'GDPR Ready', desc: 'Full GDPR compliance with data residency controls and right to erasure', light: 'text-amber-600 bg-amber-50', dark: 'dark:text-amber-400 dark:bg-amber-900/30' },
  { icon: Activity, title: '99.99% Uptime SLA', desc: 'Mission-critical infrastructure with multi-region redundancy', light: 'text-sky-600 bg-sky-50', dark: 'dark:text-sky-400 dark:bg-sky-900/30' },
  { icon: Award, title: 'ISO 27001', desc: 'Information security management system certified by accredited auditors', light: 'text-rose-600 bg-rose-50', dark: 'dark:text-rose-400 dark:bg-rose-900/30' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [selectedSpec, setSelectedSpec] = useState('Cardiology');
  const [selectedTime, setSelectedTime] = useState('');
  const [orderStatus, setOrderStatus] = useState<'Dispatched' | 'Processing' | 'Delivered'>('Processing');
  const [monthRange, setMonthRange] = useState(4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <PublicLayout>

      {/* ─── 1. Hero ─── */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-white dark:bg-slate-950 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="absolute inset-0 bg-cover bg-center opacity-50 dark:opacity-60" style={{ backgroundImage: `url(${heroImg})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/5 dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-950/5" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-600/20 border border-primary-100 dark:border-primary-500/30 rounded-full px-4 py-1.5">
              <Zap className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-primary-700 dark:text-primary-300 text-sm font-medium">AI-Powered Healthcare Ecosystem</span>
              <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight">
              Unifying Hospital <br />
              <span className="text-sky-600 dark:text-sky-400">Operations & Care</span>
            </h1>
            <p className="text-gray-600 dark:text-slate-300 text-base max-w-lg leading-relaxed">
              Medirex integrates clinical records, intelligent diagnostics, teleconsultation, billing, pharmacies, and diagnostics into a secure, HIPAA-compliant digital platform.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button onClick={() => navigate('/auth/login')} className="btn-primary text-sm py-3 px-6 shadow-lg shadow-primary-500/20">
                Access Portal <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('/about')} className="btn-secondary text-sm py-3 px-6 dark:!bg-white/10 dark:!text-white dark:!border-white/20 dark:hover:!bg-white/20">
                Explore About
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-gray-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> HIPAA Compliant</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> SOC 2 Certified</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> 99.99% SLA Uptime</span>
            </div>
          </div>

          {/* Live Status Widget */}
          <div className="hidden lg:block animate-float">
            <div className="p-6 border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 rounded-3xl space-y-4 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                <span className="text-sm font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-2">
                  <Activity className="w-4 h-4 animate-pulse text-emerald-500 dark:text-emerald-400" /> Live Platform Status
                </span>
                <span className="text-xs bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-500/20">All Systems Active</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Active Patients', value: '1,248' },
                  { label: 'Consults Completed', value: '432' },
                  { label: 'Available Beds', value: '84%' },
                  { label: 'AI Recommendation', value: '94.7%' },
                ].map(item => (
                  <div key={item.label} className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                    <p className="text-xs text-gray-500 dark:text-slate-400">{item.label}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 p-3 rounded-xl flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" />
                <div className="text-xs">
                  <p className="text-red-700 dark:text-red-300 font-bold">Emergency Dispatch Active</p>
                  <p className="text-gray-500 dark:text-slate-400">AMB-01 dispatched to Highway 5</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div ref={statsRef} className="bg-primary-50 dark:bg-gradient-to-r dark:from-primary-800 dark:to-primary-700 py-6 border-t border-primary-100 dark:border-white/10 mt-auto transition-colors duration-300 relative z-10">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard value={2400} label="Connected Hospitals" suffix="+" started={true} />
            <StatCard value={12} label="Electronic Medical Records" suffix="M+" started={true} />
            <StatCard value={98} label="System Security Audit" suffix="%" started={true} />
            <StatCard value={14} label="Emergency Response (min)" suffix="m" started={true} />
          </div>
        </div>
      </section>

      {/* ─── 2. Partners ─── */}
      <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-2">Interoperability Partners</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display">Integrated Medical Networks</h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm max-w-xl mx-auto mt-2">
            Seamlessly exchanging records and clinical assets with top electronic health databases and diagnostic suppliers.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mt-8">
            {PARTNERS.map(p => (
              <div key={p.name} className="p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-600 bg-slate-50 dark:bg-slate-800 transition-all hover:-translate-y-0.5 flex flex-col items-center justify-center gap-1">
                <span className="text-2xl">{p.logo}</span>
                <span className="text-xs font-bold text-gray-800 dark:text-slate-200 truncate w-full text-center">{p.name}</span>
                <span className="text-[9px] text-primary-600 dark:text-primary-400 font-semibold">{p.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Core Services ─── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-1">Ecosystem Infrastructure</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">Core Clinical Solutions</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm max-w-lg mx-auto mt-2">
              A comprehensive platform addressing the operational requirements of patients, clinicians, laboratories, pharmacies, and administrators.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map(s => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  onClick={() => navigate(s.path)}
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-500 shadow-sm hover:shadow-md cursor-pointer transition-all group flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1.5 font-display">{s.title}</h3>
                    <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-[11px] font-bold text-primary-600 dark:text-primary-400">
                    <span>{s.count}</span>
                    <span className="group-hover:translate-x-1 transition-transform">Launch →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 4. AI Healthcare Intelligence ─── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-500/30 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Zap className="w-3.5 h-3.5" /> Clinical Intelligence
            </span>
            <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Clinically Validated Decision Models</h2>
            <p className="text-gray-600 dark:text-slate-400 text-sm max-w-xl mx-auto mt-2">
              Reducing physician fatigue and diagnostic errors through deep neural nets trained on millions of clinical outcomes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AI_FEATURES.map(f => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="p-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-primary-300 dark:hover:bg-white/10 dark:hover:border-primary-500/30 transition-all flex flex-col justify-between hover:-translate-y-1 shadow-sm dark:shadow-none">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-600/30 flex items-center justify-center mb-4 border border-primary-100 dark:border-transparent">
                      <Icon className="w-5 h-5 text-primary-600 dark:text-primary-300" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1.5 font-display">{f.title}</h3>
                    <p className="text-gray-600 dark:text-slate-300 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-2.5 py-1 rounded-lg w-max text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {f.metric}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. Workflow ─── */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-1">Operational Flow</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">Integrated Patient Experience</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm max-w-md mx-auto mt-2">
              Eliminating administrative bottlenecks by automating data flow across clinics, diagnostics, and invoice platforms.
            </p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-[8%] right-[8%] h-0.5 bg-slate-100 dark:bg-slate-700" />
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 relative">
              {WORKFLOW_STEPS.map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center gap-3 hover:border-primary-200 dark:hover:border-primary-600 transition-all">
                    <div className={`w-10 h-10 rounded-lg ${s.lightColor} ${s.darkColor} flex items-center justify-center font-bold text-sm shadow-sm relative`}>
                      <Icon className="w-5 h-5" />
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                        {s.step}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-800 dark:text-slate-200">{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Telemedicine ─── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-700/60 text-primary-600 dark:text-primary-400 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Virtual Clinic
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">High-Definition Consultations Anywhere</h2>
            <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
              Connect with leading board-certified specialists in seconds. Our integrated medical board allows doctors to analyze digital records and draft prescriptions during the call.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['Cardiology', 'Pediatrics', 'Neurology', 'Internal Med'].map(spec => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpec(spec)}
                  className={`p-3 text-left rounded-xl border-2 font-bold text-xs transition-all ${
                    selectedSpec === spec
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-300 dark:hover:border-primary-600'
                  }`}
                >
                  {spec} Consulting
                </button>
              ))}
            </div>
            <button onClick={() => navigate('/telemedicine')} className="btn-primary text-sm py-2.5 px-5">
              Launch Telemedicine Module
            </button>
          </div>

          {/* Scheduling Simulation */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-xs font-bold text-gray-800 dark:text-slate-200">Select Available slots ({selectedSpec})</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['09:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'].map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-1 text-center rounded-lg border text-xs font-bold transition-all ${
                    selectedTime === time
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-slate-50 dark:bg-slate-700 hover:bg-primary-50 dark:hover:bg-slate-600 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            {selectedTime && (
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-xl flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
                <span>Slot Reserved for {selectedTime}!</span>
                <button onClick={() => navigate('/appointments')} className="text-primary-700 dark:text-primary-400 font-bold hover:underline">Book Now</button>
              </div>
            )}
            <div className="bg-slate-50 dark:bg-slate-700/60 p-3 rounded-xl flex items-center gap-3 text-xs text-gray-500 dark:text-slate-400">
              <Video className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
              <span>Includes HD Video consult + HIPAA transcript summary</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. Pharmacy & Diagnostics ─── */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          {/* Order Tracker */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">E-Prescription Dispenser</span>
              <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded-full">RX-7729</span>
            </div>
            <div className="bg-white dark:bg-slate-700 p-4 rounded-xl border border-slate-100 dark:border-slate-600 space-y-2">
              {[['Amoxicillin 500mg', 'Qty: 30 caps'], ['Atorvastatin 20mg', 'Qty: 10 caps']].map(([drug, qty]) => (
                <div key={drug} className="flex justify-between text-xs">
                  <span className="font-bold text-gray-800 dark:text-slate-200">{drug}</span>
                  <span className="text-slate-400 dark:text-slate-500">{qty}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold text-gray-700 dark:text-slate-300">
                <span>Dispatch Status</span>
                <span className="text-primary-600 dark:text-primary-400 capitalize">{orderStatus}</span>
              </div>
              <div className="h-2.5 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-700"
                  style={{ width: orderStatus === 'Processing' ? '45%' : orderStatus === 'Dispatched' ? '75%' : '100%' }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              {(['Processing', 'Dispatched', 'Delivered'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setOrderStatus(status)}
                  className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                    orderStatus === status
                      ? status === 'Delivered'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-primary-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <span className="bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-700/60 text-amber-600 dark:text-amber-400 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Supply Chain & Labs
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">Integrated Pharmacy & Lab Delivery</h2>
            <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
              Verify prescription refills, track pharmacy courier deliveries, review diagnostic test listings, and secure clinical results directly. Everything connects to your centralized EMR files.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: Pill, color: 'text-amber-500', title: 'Pharmacy Inventory Logs', desc: 'Real-time counts for active drugs and dispenser units.' },
                { icon: FlaskConical, color: 'text-rose-500', title: 'Digital Diagnostics Results', desc: 'Sample dispatch notifications and PDF report generation.' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-3 items-start p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <Icon className={`w-5 h-5 ${item.color} mt-0.5 flex-shrink-0`} />
                    <div>
                      <p className="font-bold text-xs text-gray-800 dark:text-slate-200">{item.title}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3">
              <button onClick={() => navigate('/pharmacy')} className="btn-primary text-xs py-2.5 px-5 !bg-amber-600 hover:!bg-amber-700 !border-amber-600">Pharmacy Page</button>
              <button onClick={() => navigate('/diagnostics')} className="btn-ghost border border-slate-200 dark:border-slate-700 text-xs py-2.5 px-5">Diagnostics Page</button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. Analytics ─── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-1">Operational Control</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">Real-Time Revenue & Operational KPIs</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm max-w-lg mx-auto mt-2">
              Examine live performance stats, OPD trends, and monthly collection metrics. Slide the range to adjust projection counts.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">Hospital Revenue Trend (Simulated)</span>
                <span className="text-xs bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold px-2.5 py-0.5 rounded-full border border-primary-100 dark:border-primary-800">
                  {monthRange} Months
                </span>
              </div>
              <div className="space-y-3 pt-2">
                {[
                  { month: 'Jan', revenue: 420 },
                  { month: 'Feb', revenue: 490 },
                  { month: 'Mar', revenue: 530 },
                  { month: 'Apr', revenue: 580 },
                  { month: 'May', revenue: 640 },
                  { month: 'Jun', revenue: 710 },
                ].slice(0, monthRange).map(item => (
                  <div key={item.month} className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-slate-400">
                      <span>{item.month}</span>
                      <span className="font-bold text-primary-600 dark:text-primary-400">${item.revenue}K</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary-500 to-sky-500 rounded-full transition-all duration-500" style={{ width: `${(item.revenue / 800) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-2">Adjust Months View ({monthRange})</label>
                <input
                  type="range" min="2" max="6" value={monthRange}
                  onChange={e => setMonthRange(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-5 bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800/60 rounded-2xl">
                <p className="text-2xl font-bold text-sky-700 dark:text-sky-400 font-display">86%</p>
                <p className="text-xs font-bold text-gray-800 dark:text-slate-200 mt-1">Bed Occupancy Level</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-0.5">201 of 234 active beds filled.</p>
              </div>
              <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/60 rounded-2xl">
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 font-display">12 min</p>
                <p className="text-xs font-bold text-gray-800 dark:text-slate-200 mt-1">Avg ER Wait Time</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-0.5">Decreased from 18m last quarter.</p>
              </div>
              <button onClick={() => navigate('/analytics')} className="w-full btn-primary py-3 text-xs text-center justify-center">
                Launch Analytics Module
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. Security & Compliance ─── */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-1">Audit Ready</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">Enterprise Protection Protocols</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm max-w-lg mx-auto mt-2">
              Every data change is logged in a tamper-proof audit trail, maintaining compliance benchmarks across all operations.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECURITY_FEATURES.map(f => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex gap-4 hover:border-primary-200 dark:hover:border-primary-600 hover:-translate-y-0.5 transition-all">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${f.light} ${f.dark}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm font-display mb-1">{f.title}</h4>
                    <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final CTA strip */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-primary-600 to-sky-600 dark:from-primary-700 dark:to-sky-700 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="relative">
              <h3 className="text-2xl font-bold font-display mb-2">Ready to Transform Your Healthcare Operations?</h3>
              <p className="text-primary-100 text-sm mb-6 max-w-md mx-auto">
                Join 2,400+ hospitals and clinics already using Medirex to deliver better care, faster.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => navigate('/auth/login')} className="bg-white text-primary-700 font-bold px-8 py-3 rounded-xl hover:bg-primary-50 transition-colors text-sm">
                  Start Free Trial
                </button>
                <button onClick={() => navigate('/contact')} className="bg-white/10 border border-white/30 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/20 transition-colors text-sm">
                  Talk to Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PublicLayout>
  );
}
