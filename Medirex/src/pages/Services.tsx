import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle2, Zap, Users, Building2, ArrowRight, Star, HeartPulse } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const SERVICE_TABS = [
  { id: 'clinic', title: 'Clinic Operations', desc: 'Direct outpatient schedule trackers, EMR record builders, telemedicine panels, and specialist referrals.', details: ['Real-time appointment scheduler', 'Digital prescription drafts', 'Patient consent logger', 'ICD-10 clinical tags'] },
  { id: 'diagnostics', title: 'Diagnostic & Lab Integration', desc: 'Order tracking for laboratory scans, specimen status monitor, PDF result generators, and AI abnormality flagging.', details: ['LIS machine connectivity', 'Barcoded sample tracking', 'PDF diagnostic reports', 'Patient portal push updates'] },
  { id: 'pharmacy', title: 'E-Pharmacy Deliveries', desc: 'Prescription dispenser tools, inventory control grids, automated drug refill reminders, and delivery mapping.', details: ['Drug database safety checker', 'Real-time stock alerts', 'Prescription validation', 'Courier dispatch tracker'] },
  { id: 'claims', title: 'Automated Billing & Insurance', desc: 'Dynamic patient invoice generation, claims eligibility checking, payment reminders, and revenue dashboards.', details: ['Instant claims submission', 'Secure payment portals', 'Payment plan setups', 'Automatic ledger mapping'] },
];

const PORTALS = [
  { role: 'Patient Hub', desc: 'Secure slot scheduler, prescription history refills, and lab report downloads.', link: '/patient', icon: '🧑‍⚕️' },
  { role: 'Clinical Suite', desc: 'Doctor charts documentation, virtual video consultation, and referral managers.', link: '/doctor', icon: '🩺' },
  { role: 'Pharmacy Hub', desc: 'Stock inventory management, dispense records, and label outputs.', link: '/pharmacy-dash', icon: '💊' },
  { role: 'Super Admin', desc: 'Complete 14-module workspace controls, user roles, audit trails, and logistics.', link: '/admin', icon: '⚙️' },
];

const PRICING_TIERS = [
  {
    name: 'Starter',
    price: '$299',
    period: '/mo',
    desc: 'Ideal for small clinics and solo practitioners.',
    features: ['Up to 500 patients', 'EMR & Appointments', 'Basic Analytics', 'Email Support'],
    highlight: false,
    cta: 'Start Free Trial',
  },
  {
    name: 'Professional',
    price: '$899',
    period: '/mo',
    desc: 'Perfect for multi-specialty clinics and mid-size hospitals.',
    features: ['Up to 5,000 patients', 'Full AI Diagnostics', 'Telemedicine Module', 'Lab & Pharmacy Integration', 'Priority Support'],
    highlight: true,
    cta: 'Get Started',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For hospital networks and health systems with complex needs.',
    features: ['Unlimited patients', 'Custom EHR Integration', 'Dedicated SLA 99.99%', 'On-site Implementation', 'Compliance Audit Support'],
    highlight: false,
    cta: 'Contact Sales',
  },
];

export default function Services() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('clinic');

  return (
    <PublicLayout>
      {/* Section 1: Hero Banner */}
      <section className="bg-white dark:bg-slate-950 text-gray-900 dark:text-white py-20 text-center relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-primary-950/60 dark:via-slate-950 dark:to-slate-950" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-600/5 dark:bg-sky-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 space-y-5">
          <div className="inline-flex items-center gap-2 bg-sky-50 dark:bg-sky-500/20 border border-sky-200 dark:border-sky-500/30 rounded-full px-4 py-1.5 mx-auto mb-2">
            <HeartPulse className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span className="text-sky-700 dark:text-sky-300 text-xs font-semibold">Complete Healthcare Suite</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight">
            Comprehensive{' '}
            <span className="text-sky-600 dark:text-sky-400">Healthcare Solutions</span>
          </h1>
          <p className="text-gray-600 dark:text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
            Medirex bridges the gap between clinics, labs, and pharmacies. Our core infrastructure streamlines standard operations to enable modern, patient-focused care.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button onClick={() => navigate('/auth/login')} className="btn-primary text-sm py-2.5 px-6">
              Access Platform <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => navigate('/contact')} className="btn-secondary text-sm py-2.5 px-6 dark:!bg-white/10 dark:!text-white dark:!border-white/20 dark:hover:!bg-white/20">
              Request Demo
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive Service Tabbed Directory */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-2">Service Modules</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display mb-1.5">Operational Directories</h2>
            <p className="text-gray-500 dark:text-slate-400 text-xs">Click on any directory to explore specific subsystem features.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="flex flex-col gap-2">
              {SERVICE_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 text-left rounded-xl border transition-all ${
                    activeTab === tab.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-sm'
                      : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="font-bold text-xs block">{tab.title}</span>
                </button>
              ))}
            </div>
            <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-4">
              {SERVICE_TABS.map(tab => tab.id === activeTab && (
                <div key={tab.id} className="space-y-4 animate-fade-in">
                  <h4 className="font-bold text-sm text-gray-800 dark:text-white font-display">{tab.title}</h4>
                  <p className="text-gray-600 dark:text-slate-400 text-xs leading-relaxed">{tab.desc}</p>
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    {tab.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Platform Suite Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50 border-y border-slate-100 dark:border-slate-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-2">Stakeholder Portals</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display mb-1.5">Connected Core Portals</h2>
          <p className="text-gray-500 dark:text-slate-400 text-xs mb-12">We bundle individual portals for each stakeholder in the ecosystem.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PORTALS.map(p => (
              <div
                key={p.role}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-primary-200 dark:hover:border-primary-600 transition-all flex flex-col items-center text-center hover:-translate-y-1 group"
              >
                <div className="text-3xl mb-4">{p.icon}</div>
                <h4 className="font-bold text-gray-800 dark:text-white text-sm font-display mb-2">{p.role}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-5">{p.desc}</p>
                <button
                  onClick={() => navigate(p.link)}
                  className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 group-hover:underline"
                >
                  Go to Portal →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: SLA and Service Guarantee */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-2">Reliability</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display mb-4">Mission Critical 99.99% SLA</h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl mx-auto mb-8">
            Medirex guarantees server availability and instant patient records accessibility. Our multi-region database redundancy satisfies modern hospital load constraints.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {[
              { metric: '99.99%', label: 'Uptime SLA', icon: Zap, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' },
              { metric: '<2 sec', label: 'Response Time', icon: Zap, color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30' },
              { metric: '4 Regions', label: 'Global Redundancy', icon: Users, color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                  <p className={`text-2xl font-bold font-display mb-1 ${item.color.split(' ')[0]}`}>{item.metric}</p>
                  <p className="text-xs font-semibold text-gray-700 dark:text-slate-300">{item.label}</p>
                </div>
              );
            })}
          </div>
          <button onClick={() => navigate('/contact')} className="btn-primary text-sm py-2.5 px-8">
            Contact Enterprise Support <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Section 5: Pricing Tiers */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-2">Simple Pricing</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display mb-2">Plans for Every Scale</h2>
            <p className="text-gray-500 dark:text-slate-400 text-xs max-w-md mx-auto">
              Whether you're a solo practitioner or a multi-hospital network, Medirex scales to your needs with transparent, predictable pricing.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_TIERS.map(tier => (
              <div
                key={tier.name}
                className={`relative p-8 rounded-2xl border transition-all hover:-translate-y-1 ${
                  tier.highlight
                    ? 'border-primary-500 bg-primary-600 text-white shadow-medical-lg'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:border-primary-200 dark:hover:border-primary-700'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-amber-400 text-amber-900 text-[10px] font-bold px-3 py-1 rounded-full">
                    <Star className="w-3 h-3" /> Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`font-bold text-lg font-display mb-1 ${tier.highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-4xl font-bold font-display ${tier.highlight ? 'text-white' : 'text-primary-600 dark:text-primary-400'}`}>{tier.price}</span>
                    {tier.period && <span className={`text-sm ${tier.highlight ? 'text-primary-200' : 'text-gray-500 dark:text-slate-400'}`}>{tier.period}</span>}
                  </div>
                  <p className={`text-xs leading-relaxed ${tier.highlight ? 'text-primary-100' : 'text-gray-500 dark:text-slate-400'}`}>{tier.desc}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2.5 text-xs">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${tier.highlight ? 'text-emerald-300' : 'text-emerald-500'}`} />
                      <span className={tier.highlight ? 'text-primary-50' : 'text-gray-700 dark:text-slate-300'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => tier.name === 'Enterprise' ? navigate('/contact') : navigate('/auth/login')}
                  className={`w-full py-3 text-sm font-bold rounded-xl transition-all ${
                    tier.highlight
                      ? 'bg-white text-primary-600 hover:bg-primary-50'
                      : 'btn-primary justify-center'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-500 dark:text-slate-500 mt-8">
            All plans include a 30-day free trial. No credit card required.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
