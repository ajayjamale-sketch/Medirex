import React, { useState } from 'react';
import { ShieldAlert, Award, FileText, CheckSquare, Eye } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const SAFEGUARDS = [
  { id: 'tech', title: 'Technical Safeguards', items: ['AES-256 bit encryption at rest & in transit', 'Unique user identification IDs for all clinicians', 'Emergency access procedures & session timeouts', 'Encrypted TLS 1.3 tunnels for API payloads'] },
  { id: 'admin', title: 'Administrative Safeguards', items: ['Risk analysis & security management policies', 'Workforce security clearance verification logs', 'Sanction policy documentation grids', 'Periodic security evaluations & breach protocols'] },
  { id: 'physical', title: 'Physical Safeguards', items: ['Secure server facilities & datacenter access', 'Workstation placement & device shielding', 'Media disposal & tracking protocols', 'Facility access control logs'] },
];

export default function HIPAA() {
  const [activeCategory, setActiveCategory] = useState('tech');

  return (
    <PublicLayout>
      {/* Section 1: Hero Banner */}
      <section className="bg-slate-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/40 via-slate-900 to-slate-900" />
        <div className="relative max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-primary-500/20 text-primary-400 border border-primary-500/30 text-xs font-semibold px-3 py-1 rounded-full mx-auto">
            <ShieldAlert className="w-3.5 h-3.5" /> HIPAA Compliance Guard
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight">
            Protected Health <span className="text-sky-400">Information (PHI) Security</span>
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Medirex enforces compliance safeguards under the Health Insurance Portability and Accountability Act to secure patient confidentiality.
          </p>
        </div>
      </section>

      {/* Section 2: Interactive Safeguards Checker */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display mb-1.5">Compliance Safeguards</h2>
            <p className="text-gray-500 text-xs">Switch safeguards tab to audit particular protocols.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="flex flex-col gap-2">
              {SAFEGUARDS.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`p-4 text-left rounded-xl border transition-all ${activeCategory === cat.id ? 'border-primary-500 bg-primary-50/50 text-primary-700 shadow-sm' : 'border-slate-100 hover:border-slate-200 bg-slate-50 text-slate-700'}`}
                >
                  <span className="font-bold text-xs block">{cat.title}</span>
                </button>
              ))}
            </div>
            <div className="lg:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
              {SAFEGUARDS.map(cat => cat.id === activeCategory && (
                <div key={cat.id} className="space-y-4 animate-fade-in">
                  <h4 className="font-bold text-sm text-gray-800 font-display">{cat.title} checklist points:</h4>
                  <div className="space-y-3">
                    {cat.items.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-start bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
                        <CheckSquare className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-slate-700 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Access Control & Auditing Details */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white border border-slate-150 rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center mb-3">
              <Eye className="w-4 h-4 text-primary-600" />
            </div>
            <h4 className="font-bold text-gray-800 text-sm mb-1.5 font-display">Tamper-Proof Audit Logs</h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              Every action inside EMR files or scheduling slots generates a permanent access record containing clinician IDs, time-stamps, IP locations, and mutated fields.
            </p>
          </div>
          <div className="p-6 bg-white border border-slate-150 rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mb-3">
              <FileText className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="font-bold text-gray-800 text-sm mb-1.5 font-display">Business Associate Agreements</h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              We sign strict Business Associate Agreements (BAA) with all clinic systems and pharmacy suppliers prior to system access, establishing full liability chains.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Audited Verifications */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <Award className="w-12 h-12 text-primary-600 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900 font-display">Audited Yearly Compliance Certification</h2>
          <p className="text-gray-500 text-xs leading-relaxed max-w-xl mx-auto">
            Our platform security is evaluated quarterly by independent, accredited compliance firms to ensure all physical databases, EMR API endpoints, and dispatcher logs conform to modern standards.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
