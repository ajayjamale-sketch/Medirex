import React, { useState } from 'react';
import { ShieldCheck, FileText, UserCheck, ShieldAlert } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const POLICY_TABS = [
  { id: 'collect', title: 'Data We Collect', text: 'We process registration credentials, patient contact logs, EMR notes uploaded by doctors, laboratory diagnostics files, billing histories, and active telemedicine stream transcripts.' },
  { id: 'use', title: 'How We Use Data', text: 'All processed patient health records are used solely to deliver clinical services. We do NOT analyze patient files for marketing or advertising purposes.' },
  { id: 'share', title: 'Data Sharing Policies', text: 'We share files strictly with authorized hospital networks, contracted diagnostic labs, insurance providers, and pharmacies under signed BAA terms.' },
  { id: 'rights', title: 'Your Rights & Choices', text: 'Under GDPR and HIPAA notice provisions, you may request copy exports of your diagnostics charts, edit contact entries, or request file deletions when allowed by medical records retention laws.' },
];

export default function Privacy() {
  const [activeTab, setActiveTab] = useState('collect');

  return (
    <PublicLayout>
      {/* Section 1: Hero Banner */}
      <section className="bg-slate-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/40 via-slate-900 to-slate-900" />
        <div className="relative max-w-4xl mx-auto px-4 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight">
            Our commitment to <span className="text-sky-400">Data Privacy</span>
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Review how Medirex protects, stores, and transfers medical files and diagnostic records across clinics.
          </p>
        </div>
      </section>

      {/* Section 2: Policy Tabbed View */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display mb-1.5">Privacy Provisions</h2>
            <p className="text-gray-500 text-xs">Select a tab below to inspect our terms and disclosures.</p>
          </div>
          <div className="grid lg:grid-cols-4 gap-4 items-start">
            <div className="flex flex-col gap-2">
              {POLICY_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-3 text-left rounded-xl border transition-all ${activeTab === tab.id ? 'border-primary-500 bg-primary-50/50 text-primary-700 font-bold' : 'border-slate-100 hover:border-slate-200 bg-slate-50 text-slate-700'}`}
                >
                  <span className="text-xs">{tab.title}</span>
                </button>
              ))}
            </div>
            <div className="lg:col-span-3 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 min-h-[160px] flex items-center justify-center">
              {POLICY_TABS.map(tab => tab.id === activeTab && (
                <div key={tab.id} className="space-y-2 animate-fade-in text-left">
                  <h4 className="font-bold text-sm text-gray-800 font-display">{tab.title}</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">{tab.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Patient Rights Summary */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display mb-2">Patient Security Control</h2>
          <p className="text-gray-500 text-xs mb-10">Proactively securing records control rights.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-5 rounded-2xl border border-slate-150 text-center">
              <FileText className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h4 className="font-bold text-gray-800 text-sm mb-1.5 font-display">Access Requests</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Download a unified CSV or PDF containing your complete EMR diagnostics history at any time.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-150 text-center">
              <UserCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <h4 className="font-bold text-gray-800 text-sm mb-1.5 font-display">Consent Revocation</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Modify your scheduling permissions or restrict specific clinician EMR view access rights.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-150 text-center">
              <ShieldCheck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-bold text-gray-800 text-sm mb-1.5 font-display">Encryption Lock</h4>
              <p className="text-slate-500 text-xs leading-relaxed">All active credentials and biometric tokens are stored locally under user device keys.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Privacy Officer Contact */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-primary-600 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900 font-display">Contact Our Security Officer</h2>
          <p className="text-gray-500 text-xs leading-relaxed max-w-xl mx-auto">
            If you suspect unauthorized EMR access, wish to report a credential leak, or file a GDPR deletion ticket, contact privacy@medirex.com directly.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
