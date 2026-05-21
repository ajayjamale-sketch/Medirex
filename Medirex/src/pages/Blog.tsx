import React, { useState } from 'react';
import { Calendar, User, ArrowRight, CheckCircle } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const POSTS = [
  { id: 1, title: 'Reducing Physician Burnout with AI Documentation', cat: 'AI Research', author: 'Dr. Evelyn Vance', date: 'May 12, 2026', excerpt: 'How voice-to-text models and structured EMR parsers decrease charting time by 40% in clinical environments.' },
  { id: 2, title: 'Understanding HL7 FHIR Interoperability Targets', cat: 'Clinical Guides', author: 'Marcus Chen', date: 'Apr 28, 2026', excerpt: 'A deep dive into record exchange protocols that connect local labs with national hospital networks.' },
  { id: 3, title: 'Ensuring GDPR & HIPAA Compliance in SaaS Telemedicine', cat: 'Compliance', author: 'Jane Harrison', date: 'Mar 15, 2026', excerpt: 'Best practices for securing peer consultations, video streams, and encrypted prescription database systems.' },
];

export default function Blog() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const filteredPosts = selectedCat === 'All' ? POSTS : POSTS.filter(p => p.cat === selectedCat);

  return (
    <PublicLayout>
      {/* Section 1: Hero Banner */}
      <section className="bg-slate-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/40 via-slate-900 to-slate-900" />
        <div className="relative max-w-4xl mx-auto px-4 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight">
            The Medirex <span className="text-sky-400">Clinical Blog</span>
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Insights on AI diagnostics, clinical databases, compliance updates, and SaaS healthcare operations.
          </p>
        </div>
      </section>

      {/* Section 2: Category Selector */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            {['All', 'AI Research', 'Clinical Guides', 'Compliance'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`py-2 px-5 text-xs font-bold rounded-lg border transition-all ${selectedCat === cat ? 'bg-primary-600 text-white border-primary-600' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Open Articles list */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {filteredPosts.map(p => (
            <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm flex flex-col justify-between hover:border-primary-100 transition-all">
              <div>
                <span className="text-[9px] bg-primary-50 text-primary-600 font-bold px-2 py-0.5 rounded-full">{p.cat}</span>
                <h4 className="font-bold text-gray-800 text-sm font-display mt-2.5 mb-2 leading-tight">{p.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">{p.excerpt}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-50">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold mb-2">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {p.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {p.date}</span>
                </div>
                <button onClick={() => alert(`Reading article: "${p.title}"`)} className="text-primary-600 font-bold text-xs hover:underline flex items-center gap-1 mt-2">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Newsletter signup */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {subscribed ? (
            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-2 max-w-md mx-auto">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-gray-900 text-sm font-display">Subscribed Successfully!</h4>
              <p className="text-xs text-slate-500">You will receive monthly healthcare summaries at {email}.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 font-display">Stay Updated on Medical Tech</h2>
              <p className="text-gray-500 text-xs max-w-md mx-auto">Subscribe to our newsletter and receive monthly digests of clinical AI updates and security bulletins.</p>
              <form
                onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true); }}
                className="flex max-w-md mx-auto gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:border-primary-500 focus:outline-none"
                />
                <button type="submit" className="btn-primary text-xs py-2 px-4 flex-shrink-0">Subscribe</button>
              </form>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
