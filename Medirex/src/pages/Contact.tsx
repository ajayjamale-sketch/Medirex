import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, HelpCircle, MessageSquare, Clock, HeadphonesIcon, ArrowRight, Zap } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const FAQS = [
  { q: 'Is my health data protected and HIPAA compliant?', a: 'Yes. Medirex enforces AES-256 bit encryption, maintains multi-region backup security, and undergoes SOC 2 Type II audits regularly.' },
  { q: 'How do patients access prescriptions and results?', a: 'After signing in, patient homepage redirects directly to Appointments, Prescriptions, or Diagnostics pages where results can be accessed immediately.' },
  { q: 'Does Medirex integrate with third-party hospital databases?', a: 'Yes. We support HL7 FHIR standards to synchronize patient records across Epic Systems, Cerner, and national diagnostic laboratories.' },
  { q: 'What is the onboarding timeline for a new hospital?', a: 'Standard deployment takes 2–4 weeks. Enterprise migrations with existing EHR data can be completed in 6–8 weeks with dedicated support specialists.' },
];

const SUPPORT_CHANNELS = [
  {
    icon: MessageSquare,
    title: 'Live Chat',
    desc: 'Chat with a support agent in real time.',
    availability: 'Available 24/7',
    badge: 'Online Now',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    action: 'Start Chat',
    color: 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30',
  },
  {
    icon: Phone,
    title: 'Priority Hotline',
    desc: 'Direct line for critical clinical systems.',
    availability: 'Mon–Fri 8 AM – 8 PM EST',
    badge: 'Enterprise Only',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    action: '+1 (800) 555-0900',
    color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30',
  },
  {
    icon: Mail,
    title: 'Email Support',
    desc: 'Detailed tickets answered within 1 business hour.',
    availability: 'Response within 1 hour',
    badge: 'All Plans',
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    action: 'support@medirex.com',
    color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30',
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated CSM',
    desc: 'A named Customer Success Manager for your account.',
    availability: 'Enterprise accounts',
    badge: 'Enterprise',
    badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    action: 'Request a CSM',
    color: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30',
  },
];

const SLA_TABLE = [
  { severity: 'P1 — Critical', desc: 'System down / data loss', response: '< 15 min', color: 'text-red-600 dark:text-red-400' },
  { severity: 'P2 — High', desc: 'Core feature broken', response: '< 2 hours', color: 'text-amber-600 dark:text-amber-400' },
  { severity: 'P3 — Medium', desc: 'Non-critical issue', response: '< 8 hours', color: 'text-sky-600 dark:text-sky-400' },
  { severity: 'P4 — Low', desc: 'General question', response: '< 24 hours', color: 'text-slate-600 dark:text-slate-400' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
    }
  };

  return (
    <PublicLayout>
      {/* Section 1: Hero Banner */}
      <section className="bg-white dark:bg-slate-950 text-gray-900 dark:text-white py-20 text-center relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-primary-950/60 dark:via-slate-950 dark:to-slate-950" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/5 dark:bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 space-y-5">
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 rounded-full px-4 py-1.5 mx-auto mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-700 dark:text-emerald-300 text-xs font-semibold">We're Here to Help</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight">
            Get in Touch with{' '}
            <span className="text-sky-600 dark:text-sky-400">Our Teams</span>
          </h1>
          <p className="text-gray-600 dark:text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
            Have questions about clinical setup, custom LIS integrations, or pricing tier details? Our sales and support teams are available 24/7.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs text-gray-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> 24/7 Live Support</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" /> &lt; 1hr Email Response</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" /> Priority Hotline</span>
          </div>
        </div>
      </section>

      {/* Section 2: Contact Form */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-2">Support Ticket</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display mb-1.5">Send a Request</h2>
          </div>
          {submitted ? (
            <div className="p-8 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-700 rounded-2xl text-center space-y-4">
              <CheckCircle className="w-14 h-14 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h3 className="font-bold text-gray-900 dark:text-white text-lg font-display">Ticket Registered Successfully!</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Thank you, <strong className="text-gray-800 dark:text-slate-200">{form.name}</strong>. Our support team will respond to{' '}
                <strong className="text-gray-800 dark:text-slate-200">{form.email}</strong> within 1 business hour.
              </p>
              <button
                onClick={() => { setForm({ name: '', email: '', message: '' }); setSubmitted(false); }}
                className="btn-primary text-sm py-2.5 px-6"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl p-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl p-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                    placeholder="john@hospital.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Your Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl p-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                  placeholder="How can we assist you today?"
                />
              </div>
              <button type="submit" className="btn-primary text-sm py-3 px-8">
                Submit Ticket <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Section 3: Interactive FAQ Accordion */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50 border-y border-slate-100 dark:border-slate-700 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-2">Common Questions</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display mb-1.5">Frequently Asked Questions</h2>
            <p className="text-gray-500 dark:text-slate-400 text-xs">Click on any question to view details.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 border border-slate-150 dark:border-slate-700 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full text-left p-5 font-bold text-sm text-gray-800 dark:text-white flex justify-between items-center hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <span className="flex items-center gap-3 pr-4">
                    <HelpCircle className="w-4 h-4 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                    {faq.q}
                  </span>
                  <span className={`text-lg transition-transform duration-200 flex-shrink-0 ${expandedFaq === i ? 'rotate-180' : ''}`}>
                    ›
                  </span>
                </button>
                {expandedFaq === i && (
                  <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm leading-relaxed animate-fade-in pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Office Info & Contact Channels */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-2">Our Office</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display mb-1.5">Find Us</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Mail, title: 'Email Support', lines: ['support@medirex.com', 'Average response: 1 hour'], color: 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30' },
              { icon: Phone, title: 'Phone Line', lines: ['+1 (800) 555-0900', 'Mon–Fri: 9 AM – 6 PM EST'], color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' },
              { icon: MapPin, title: 'HQ Headquarters', lines: ['742 Evergreen Terrace', 'Boston, MA 02108'], color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex gap-4 hover:border-primary-200 dark:hover:border-primary-700 transition-all">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-sm font-display mb-1">{item.title}</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-xs">{item.lines[0]}</p>
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] mt-0.5">{item.lines[1]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5: Live Support Channels & SLA Matrix */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider mb-2">Support Ecosystem</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display mb-2">Live Support Channels</h2>
            <p className="text-gray-500 dark:text-slate-400 text-xs max-w-md mx-auto">
              Multiple support pathways available to ensure your clinical operations never face a blocker.
            </p>
          </div>

          {/* Support Channel Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {SUPPORT_CHANNELS.map(channel => {
              const Icon = channel.icon;
              return (
                <div
                  key={channel.title}
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-600 transition-all hover:-translate-y-1 flex flex-col"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${channel.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-800 dark:text-white text-sm font-display mb-1">{channel.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-3 flex-1">{channel.desc}</p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{channel.availability}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${channel.badgeColor}`}>
                      {channel.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SLA Response Matrix */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
              <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <h3 className="font-bold text-gray-800 dark:text-white text-sm font-display">Support Response SLA Matrix</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700/50">
                    <th className="text-left px-6 py-3 font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Severity</th>
                    <th className="text-left px-6 py-3 font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Description</th>
                    <th className="text-left px-6 py-3 font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Response Time</th>
                    <th className="text-left px-6 py-3 font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {SLA_TABLE.map((row, i) => (
                    <tr key={i} className="border-t border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className={`px-6 py-4 font-bold ${row.color}`}>{row.severity}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{row.desc}</td>
                      <td className="px-6 py-4 font-bold text-gray-800 dark:text-white">{row.response}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
