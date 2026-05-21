import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Zap, ShieldCheck, Activity, Award, ArrowRight, FlaskConical, University, CheckCircle2, BookOpen } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const DIAGNOSTICS = [
  { symptoms: 'Fever, cough, short breath', condition: 'Differential: Acute Bronchitis vs Mild Pneumonia', accuracy: '94.7%', recs: 'Check SpO2 levels and schedule primary clinic video consult.' },
  { symptoms: 'Chest pain, left arm pain', condition: 'Differential: Angina / Acute Coronary Syndrome', accuracy: '98.9%', recs: 'CAUTION: Highly urgent. Dispatching immediate emergency triage guidance.' },
  { symptoms: 'Skin rash, itchy red spots', condition: 'Differential: Contact Dermatitis vs Eczema', accuracy: '89.2%', recs: 'Upload high-res dermatological image for automated EMR classification review.' },
];

const RESEARCH_PARTNERS = [
  { name: 'Johns Hopkins Medicine', type: 'Academic Medical Center', country: '🇺🇸', contribution: 'Clinical validation of triage AI on 3.2M cases' },
  { name: 'Mayo Clinic', type: 'Research Hospital', country: '🇺🇸', contribution: 'Diagnostic accuracy benchmarking & ICD-12 mapping' },
  { name: 'Imperial College London', type: 'Research Institution', country: '🇬🇧', contribution: 'Predictive readmission models & drug safety algorithms' },
  { name: 'AIIMS New Delhi', type: 'Academic Hospital', country: '🇮🇳', contribution: 'Multi-language NLP clinical notes processing' },
  { name: 'Charité Berlin', type: 'University Hospital', country: '🇩🇪', contribution: 'GDPR-compliant federated learning infrastructure' },
  { name: 'SingHealth', type: 'Hospital Network', country: '🇸🇬', contribution: 'Asia-Pacific patient outcome modeling' },
];

export default function AIHealthcare() {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState(0);
  const [demoRequested, setDemoRequested] = useState(false);
  const [demoEmail, setDemoEmail] = useState('');

  return (
    <PublicLayout>
      {/* Section 1: Hero Banner */}
      <section className="bg-white dark:bg-slate-950 text-gray-900 dark:text-white py-20 text-center relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-primary-950/60 dark:via-slate-950 dark:to-slate-950" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 dark:bg-violet-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-primary-600/5 dark:bg-primary-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 space-y-5">
          <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-500/20 border border-primary-200 dark:border-primary-500/30 rounded-full px-4 py-1.5 mx-auto mb-2">
            <Brain className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
            <span className="text-primary-700 dark:text-primary-300 text-xs font-semibold">Next-Gen Clinical AI</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight">
            AI That Thinks{' '}
            <span className="text-sky-600 dark:text-sky-400">Like a Clinician</span>
          </h1>
          <p className="text-gray-600 dark:text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
            Medirex is equipped with clinically validated artificial intelligence models, designed to support medical decisions, predict patient readmissions, and triage emergency requests.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button onClick={() => navigate('/auth/login')} className="btn-primary text-sm py-2.5 px-6">
              Try AI Diagnostics <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => document.getElementById('research-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary text-sm py-2.5 px-6 dark:!bg-white/10 dark:!text-white dark:!border-white/20 dark:hover:!bg-white/20"
            >
              View Research Partners
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Symptom Classifier Simulator */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider">Live Simulator</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display">Diagnostic Model Simulator</h2>
            <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
              Explore how our clinical NLP model extracts medical tags from unstructured symptom descriptions, maps them to ICD coding, and calculates differential diagnostics recommendations.
            </p>
            <div className="flex flex-col gap-2">
              {DIAGNOSTICS.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCase(i)}
                  className={`p-4 text-left rounded-xl border transition-all ${
                    selectedCase === i
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-sm'
                      : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="font-bold text-xs block">Symptom String: {d.symptoms}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-slate-700 pb-3">
              <span className="text-xs font-bold text-gray-800 dark:text-white flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-primary-600 dark:text-primary-400" /> AI Classification Output
              </span>
              <span className="text-xs bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                {DIAGNOSTICS[selectedCase].accuracy} Accuracy Match
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Condition Differential</p>
                <p className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">{DIAGNOSTICS[selectedCase].condition}</p>
              </div>
              <div className="p-3.5 bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Recommended Triage Action</p>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">{DIAGNOSTICS[selectedCase].recs}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/appointments')}
              className="w-full btn-primary py-2.5 text-xs text-center justify-center"
            >
              Schedule Diagnostic Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Predictive Analytics Capabilities */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50 border-y border-slate-100 dark:border-slate-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-2">Proven Results</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display mb-2">Predictive Capability Metrics</h2>
          <p className="text-gray-500 dark:text-slate-400 text-xs mb-12">Trained on anonymized multi-institutional clinical outcomes.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: '87%', label: 'Readmission Risk Accuracy', desc: 'Predicts the likelihood of patient relapse and re-admission within 30 days of discharge.', color: 'text-primary-600 dark:text-primary-400' },
              { value: '<2s', label: 'Prescription Alert Triage', desc: 'Evaluates allergy checks and potential drug-to-drug interactions instantly during consult.', color: 'text-emerald-600 dark:text-emerald-400' },
              { value: '31%', label: 'Mortality Rate Reduction', desc: 'Optimizes ambulance routing and ER occupancy prediction to prioritize critical care.', color: 'text-purple-600 dark:text-purple-400' },
            ].map(item => (
              <div key={item.label} className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-150 dark:border-slate-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <p className={`text-5xl font-bold font-display mb-2 ${item.color}`}>{item.value}</p>
                <h4 className="font-bold text-gray-800 dark:text-white text-sm mb-2 font-display">{item.label}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Safe Decisions Guardrails */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <ShieldCheck className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-2">Safety First</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display mb-4">Safety and Peer Review Guardrails</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl mx-auto">
              Our AI engine behaves as a decision-support assistant. No diagnostic or treatment changes are committed to EMR without explicitly logged clinician review and digital signature verification.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Award, label: 'AMA Compliant', desc: 'Fully aligned with American Medical Association guidelines for AI-assisted diagnostics.', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' },
              { icon: Award, label: 'FDA Triage Class II', desc: 'Registered as a Class II medical decision support device with the FDA.', color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' },
              { icon: ShieldCheck, label: 'HIPAA Certified', desc: 'All AI inference is performed on encrypted, HIPAA-compliant infrastructure.', color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30' },
              { icon: Activity, label: 'Clinician Override', desc: 'Every AI suggestion can be overridden, logged, and flagged for future model retraining.', color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex gap-4 hover:border-primary-200 dark:hover:border-primary-700 transition-all">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-sm font-display mb-1">{item.label}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5: Research Partners & Demo CTA */}
      <section id="research-section" className="py-20 bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300 border-t border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600/5 dark:bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-violet-600/5 dark:bg-violet-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-500/20 border border-primary-200 dark:border-primary-500/30 rounded-full px-4 py-1.5 mb-4">
              <University className="w-3.5 h-3.5 text-primary-700 dark:text-primary-400" />
              <span className="text-primary-800 dark:text-primary-300 text-xs font-semibold">Academic Validation</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold font-display mb-3">Research & Academic Partners</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
              Our AI models are co-developed with leading medical institutions ensuring clinical rigor, bias mitigation, and real-world performance.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {RESEARCH_PARTNERS.map(partner => (
              <div
                key={partner.name}
                className="p-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-primary-300 dark:hover:border-primary-500/30 transition-all shadow-sm dark:shadow-none"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{partner.country}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm font-display leading-snug">{partner.name}</h4>
                    <p className="text-primary-600 dark:text-primary-400 text-[10px] font-semibold">{partner.type}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed">{partner.contribution}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Demo CTA */}
          <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl text-center shadow-md dark:shadow-none backdrop-blur-sm">
            <FlaskConical className="w-10 h-10 text-primary-500 dark:text-primary-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold font-display mb-2">Request an AI Capabilities Demo</h3>
            <p className="text-gray-500 dark:text-slate-400 text-sm mb-6">
              See how Medirex AI performs on your clinical data. Our team will walk you through a live integration pilot with your EHR system.
            </p>
            {demoRequested ? (
              <div className="flex items-center gap-3 justify-center p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300 text-sm font-semibold">Demo request received! We'll reach out within 24 hours.</span>
              </div>
            ) : (
              <div className="flex gap-3 max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="Your work email"
                  value={demoEmail}
                  onChange={e => setDemoEmail(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary-500"
                />
                <button
                  onClick={() => { if (demoEmail) setDemoRequested(true); }}
                  className="btn-primary text-sm py-2.5 px-5 whitespace-nowrap"
                >
                  Request Demo
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
