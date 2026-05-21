import React, { useState } from 'react';
import { HelpCircle, Search, FileText, ArrowRight, LifeBuoy } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const HELP_CATEGORIES = [
  { id: 'start', title: 'Getting Started', items: ['How to set up your patient account', 'Connecting your insurance policy data', 'Scheduling your first telehealth visit', 'Adding medical allergy details'] },
  { id: 'clinical', title: 'Clinician EHR & LIS', items: ['Dictating EMR summaries via voice input', 'E-prescription refills approvals', 'Lab results PDF uploads and tags', 'Hospital staff permissions config'] },
  { id: 'billing', title: 'Billing & Pharmacy', items: ['Reading your monthly hospital statements', 'Setting up automatic refill deliveries', 'Filing claims with BlueCross insurance', 'Processing copays via Stripe portal'] },
];

export default function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState('start');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <PublicLayout>
      {/* Section 1: Hero Search Banner */}
      <section className="bg-slate-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/40 via-slate-900 to-slate-900" />
        <div className="relative max-w-4xl mx-auto px-4 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight">
            How can we <span className="text-sky-400">help you today?</span>
          </h1>
          <div className="relative max-w-md mx-auto mt-4">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search help articles (e.g. prescription refills)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs text-slate-800 focus:border-primary-500 focus:outline-none shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Interactive Category Guides */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display mb-1.5">Support Directory</h2>
            <p className="text-gray-500 text-xs">Explore documentation guides by choosing a category.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="flex flex-col gap-2">
              {HELP_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`p-4 text-left rounded-xl border transition-all ${activeCategory === cat.id ? 'border-primary-500 bg-primary-50/50 text-primary-700 font-bold shadow-sm' : 'border-slate-100 hover:border-slate-200 bg-slate-50 text-slate-700'}`}
                >
                  <span className="text-xs block">{cat.title}</span>
                </button>
              ))}
            </div>
            <div className="lg:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
              {HELP_CATEGORIES.map(cat => cat.id === activeCategory && (
                <div key={cat.id} className="space-y-4 animate-fade-in text-left">
                  <h4 className="font-bold text-sm text-gray-800 font-display">{cat.title} Articles</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {cat.items.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => alert(`Opening help article: "${item}"`)}
                        className="p-3 bg-white hover:bg-slate-50/50 rounded-xl border border-slate-150 flex items-center justify-between text-left transition-all"
                      >
                        <span className="text-xs text-slate-700 font-medium leading-snug pr-2">{item}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Common Troubleshooting Steps */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 font-display mb-1.5">Common Troubleshooting</h2>
          <p className="text-gray-500 text-xs mb-8">Follow these steps if you experience portal login issues.</p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-150 text-center">
              <p className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-bold flex items-center justify-center text-xs mx-auto mb-3">1</p>
              <h4 className="font-bold text-gray-800 text-xs mb-1 font-display">Clear Browser Cookies</h4>
              <p className="text-slate-500 text-[10px] leading-relaxed">Ensure session variables are reset to resolve page loading errors.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-150 text-center">
              <p className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold flex items-center justify-center text-xs mx-auto mb-3">2</p>
              <h4 className="font-bold text-gray-800 text-xs mb-1 font-display">Check OTP Expiry</h4>
              <p className="text-slate-500 text-[10px] leading-relaxed">Verification tokens expire in 5 minutes. Request a fresh code on login screen.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-150 text-center">
              <p className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold flex items-center justify-center text-xs mx-auto mb-3">3</p>
              <h4 className="font-bold text-gray-800 text-xs mb-1 font-display">Contact Clinic Staff</h4>
              <p className="text-slate-500 text-[10px] leading-relaxed">For EMR corrections, file modifications must be approved by the practitioner.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Live Agent Help */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <LifeBuoy className="w-12 h-12 text-primary-600 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900 font-display">Still need help?</h2>
          <p className="text-gray-500 text-xs leading-relaxed max-w-xl mx-auto">
            Our technical support agents are available to handle custom clinic integration tickets and account issues.
          </p>
          <button onClick={() => alert("Connecting to chat...")} className="btn-primary text-xs py-2 px-5">Submit Ticket</button>
        </div>
      </section>
    </PublicLayout>
  );
}
