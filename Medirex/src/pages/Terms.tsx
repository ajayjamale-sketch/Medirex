import React, { useState } from 'react';
import { Scale, CheckCircle, ShieldAlert, Award } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const TERMS_SECTIONS = [
  { id: 'use', title: '1. Acceptable Platform Use', text: 'Medirex is provided solely for medical operations management. Clinicians must verify credentials, and patients must supply authentic insurance details. Misuse of emergency dispatch alerts is strictly prohibited.' },
  { id: 'liability', title: '2. Clinical Liability Disclaimer', text: 'Our AI diagnostics classifier and recommendations act as support resources only. Doctors retain complete responsibility for diagnosing patients, prescribing drugs, and validating EHR modifications.' },
  { id: 'uptime', title: '3. SLA Availability Guarantee', text: 'We offer a 99.99% system uptime service level agreement. Necessary maintenance downtimes will be announced 48 hours in advance, and critical SOS channels are replicated across multi-region cells.' },
];

export default function Terms() {
  const [activeSection, setActiveSection] = useState('use');

  return (
    <PublicLayout>
      {/* Section 1: Hero Banner */}
      <section className="bg-slate-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/40 via-slate-900 to-slate-900" />
        <div className="relative max-w-4xl mx-auto px-4 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight">
            Terms of <span className="text-sky-400">Service</span>
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Please read these conditions governing medical portal access, hospital records integration, and developer API limits.
          </p>
        </div>
      </section>

      {/* Section 2: Interactive Terms Index */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display mb-1.5">Terms Index</h2>
            <p className="text-gray-500 text-xs">Select a section header below to view legally binding provisions.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="flex flex-col gap-2">
              {TERMS_SECTIONS.map(sec => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`p-3 text-left rounded-xl border transition-all ${activeSection === sec.id ? 'border-primary-500 bg-primary-50/50 text-primary-700 font-bold' : 'border-slate-100 hover:border-slate-200 bg-slate-50 text-slate-700'}`}
                >
                  <span className="text-xs">{sec.title}</span>
                </button>
              ))}
            </div>
            <div className="lg:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 min-h-[160px] flex items-center justify-center">
              {TERMS_SECTIONS.map(sec => sec.id === activeSection && (
                <div key={sec.id} className="space-y-2 animate-fade-in text-left">
                  <h4 className="font-bold text-sm text-gray-800 font-display">{sec.title}</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">{sec.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Clinician & Patient Accountability */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white border border-slate-150 rounded-2xl">
            <h4 className="font-bold text-gray-800 text-sm mb-1.5 font-display flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> Physician Verification
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              Medical practitioners must provide valid NPI numbers and license details prior to editing EMR charts, issuing prescriptions, or initiating consultations.
            </p>
          </div>
          <div className="p-6 bg-white border border-slate-150 rounded-2xl">
            <h4 className="font-bold text-gray-800 text-sm mb-1.5 font-display flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-500" /> Patient Account Safety
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              Patients are responsible for keeping logins secure. Shared passwords or unauthorized EMR edits could lead to account suspension or clinic referrals.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Governing Law */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <Scale className="w-12 h-12 text-primary-600 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900 font-display">Jurisdiction & Arbitration</h2>
          <p className="text-gray-500 text-xs leading-relaxed max-w-xl mx-auto">
            These terms are governed by the laws of the Commonwealth of Massachusetts. Any unresolved claims regarding EMR services, database integrity, or billing disputes will be resolved through arbitration in Boston.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
