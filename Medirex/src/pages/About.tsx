import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Target, Shield, Heart, ArrowRight, Rocket, Globe, CheckCircle2 } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const MILESTONES = [
  { year: '2023', title: 'Medirex Founded', desc: 'Started with a vision to automate clinical workflows using advanced LLMs and secure EHR adapters.' },
  { year: '2024', title: 'HIPAA & ISO Audits', desc: 'Achieved enterprise security verification. Deployed in over 120 regional clinics.' },
  { year: '2025', title: 'AI Diagnostics Launch', desc: 'Introduced 94.7% accuracy ML models for medical diagnostics and predictive patient triage.' },
  { year: '2026', title: 'Global Integration', desc: 'Restructured the platform into a unified ecosystem handling 12M+ records worldwide.' },
];

const LEADERSHIP = [
  { name: 'Dr. Evelyn Vance', role: 'CEO & Co-Founder', bio: 'Former Chief of Medicine with 15+ years in clinical management.', avatar: 'https://i.pravatar.cc/150?u=1559839734-2b71ea197ec2' },
  { name: 'Marcus Chen', role: 'Chief Technology Officer', bio: 'AI researcher and former Lead Architect at Google Health.', avatar: 'https://i.pravatar.cc/150?u=1472099645785-5658abf4ff4e' },
  { name: 'Sarah Jenkins, PharmD', role: 'VP of Pharmacy Relations', bio: 'Expert in clinical pharmacy supply chain and drug interaction grids.', avatar: 'https://i.pravatar.cc/150?u=1594824476967-48c8b964273f' },
];

const GLOBAL_PRESENCE = [
  { region: 'North America', hospitals: '1,240+', color: 'bg-blue-500' },
  { region: 'Europe', hospitals: '620+', color: 'bg-emerald-500' },
  { region: 'Asia Pacific', hospitals: '380+', color: 'bg-violet-500' },
  { region: 'Middle East & Africa', hospitals: '160+', color: 'bg-amber-500' },
];

export default function About() {
  const navigate = useNavigate();
  const [activeYear, setActiveYear] = useState('2026');

  return (
    <PublicLayout>
      {/* Section 1: Hero Banner */}
      <section className="bg-white dark:bg-slate-950 text-gray-900 dark:text-white py-20 text-center relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-primary-950/60 dark:via-slate-950 dark:to-slate-950" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/5 dark:bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/5 dark:bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 space-y-5">
          <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-500/20 border border-primary-200 dark:border-primary-500/30 rounded-full px-4 py-1.5 mx-auto mb-2">
            <Heart className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
            <span className="text-primary-700 dark:text-primary-300 text-xs font-semibold">Our Story</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight">
            We exist to make{' '}
            <span className="text-primary-600 dark:text-primary-400">Healthcare Seamless</span>
          </h1>
          <p className="text-gray-600 dark:text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
            Medirex is dedicated to bridging clinical excellence and administrative workflow. By unifying medical records, smart billing, and AI insights, we save doctors time and optimize patient recovery.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button onClick={() => navigate('/auth/login')} className="btn-primary text-sm py-2.5 px-6">
              Access Portal <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => navigate('/contact')} className="btn-secondary text-sm py-2.5 px-6 dark:!bg-white/10 dark:!text-white dark:!border-white/20 dark:hover:!bg-white/20">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Values & Mission */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-2">Our Foundation</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">Built on Core Principles</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Our Mission', desc: 'To integrate fragmented medical point solutions into a secure, intuitive cloud workspace that clinicians actually love to use.', color: 'text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400' },
              { icon: Users, title: 'Physician Focus', desc: 'Designing tools that directly minimize record documentation fatigue and chart overhead — freeing clinicians for what matters.', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400' },
              { icon: Shield, title: 'Security Centric', desc: 'Enforcing military-grade AES-256 encryption to safeguard patient health information at rest, in transit, and at every endpoint.', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-400' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-7 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex gap-5 hover:border-primary-200 dark:hover:border-primary-700 transition-all group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white text-sm mb-2 font-display">{item.title}</h3>
                    <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Corporate Milestones */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50 border-y border-slate-100 dark:border-slate-700 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-2">Our Journey</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display mb-2">Corporate Evolution Timeline</h2>
          <p className="text-gray-500 dark:text-slate-400 text-xs mb-10">Select a milestone year to view development records.</p>
          <div className="flex justify-center gap-3 mb-8">
            {MILESTONES.map(m => (
              <button
                key={m.year}
                onClick={() => setActiveYear(m.year)}
                className={`py-2 px-6 text-xs font-bold rounded-xl border transition-all ${
                  activeYear === m.year
                    ? 'bg-primary-600 text-white border-primary-600 shadow-medical'
                    : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300'
                }`}
              >
                {m.year}
              </button>
            ))}
          </div>
          {MILESTONES.map(m => m.year === activeYear && (
            <div key={m.year} className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-150 dark:border-slate-700 animate-fade-in text-left shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider">{m.year}</span>
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white font-display mb-2">{m.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Leadership Team Grid */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-2">The Team</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display mb-2">Our Leadership</h2>
          <p className="text-gray-500 dark:text-slate-400 text-xs mb-12">Meet the experts guiding our healthcare ecosystem.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {LEADERSHIP.map(l => (
              <div
                key={l.name}
                className="p-8 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-primary-200 dark:hover:border-primary-600 transition-all flex flex-col items-center hover:-translate-y-1 group"
              >
                <div className="relative mb-5">
                  <img
                    src={l.avatar}
                    alt={l.name}
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-primary-500/20 group-hover:border-primary-500/50 transition-all"
                  />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" />
                </div>
                <h4 className="font-bold text-gray-800 dark:text-white text-sm font-display mb-1">{l.name}</h4>
                <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold mb-3">{l.role}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed text-center">{l.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Global Presence & CTA */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300 border-t border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600/5 dark:bg-primary-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-600/5 dark:bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-500/20 border border-primary-200 dark:border-primary-500/30 rounded-full px-4 py-1.5">
                <Globe className="w-3.5 h-3.5 text-primary-700 dark:text-primary-400" />
                <span className="text-primary-800 dark:text-primary-300 text-xs font-semibold">Global Healthcare Network</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold font-display leading-snug">
                Join <span className="text-primary-600 dark:text-primary-400">2,400+ Hospitals</span> Already Transforming Care
              </h2>
              <p className="text-gray-500 dark:text-slate-300 text-sm leading-relaxed">
                From leading academic medical centers to rural community clinics, Medirex powers seamless, AI-enhanced care delivery across four continents. Become part of the revolution.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {GLOBAL_PRESENCE.map(item => (
                  <div key={item.region} className="p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-primary-300 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none">
                    <div className={`w-2 h-2 ${item.color} rounded-full mb-2`} />
                    <p className="text-lg font-bold text-gray-900 dark:text-white font-display">{item.hospitals}</p>
                    <p className="text-gray-500 dark:text-slate-400 text-xs">{item.region}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <div className="p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl space-y-5 shadow-md dark:shadow-none backdrop-blur-sm">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">Ready to Transform Your Hospital?</h3>
                <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
                  Schedule a personalized demo with our implementation team. We'll walk you through onboarding, data migration, and integration with your existing EHR systems.
                </p>
                <div className="space-y-3">
                  {[
                    'Free 30-day pilot program',
                    'Dedicated onboarding specialist',
                    'Full data migration support',
                    'Custom SLA guarantee',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => navigate('/auth/login')}
                    className="flex-1 btn-primary py-3 text-sm justify-center"
                  >
                    Start Free Trial <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="flex-1 py-3 px-4 text-sm font-semibold rounded-xl border border-slate-200 dark:border-white/20 hover:border-slate-300 dark:hover:border-white/40 text-slate-700 dark:text-white transition-all bg-white hover:bg-slate-50 dark:bg-transparent dark:hover:bg-white/10"
                  >
                    Talk to Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
