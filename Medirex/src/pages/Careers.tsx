import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, CheckCircle } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const JOBS = [
  { id: 1, title: 'Lead AI Engineer', dept: 'Engineering', loc: 'Boston, MA (Hybrid)', type: 'Full-time', desc: 'Own fine-tuning of clinical diagnostic LLMs and EMR entity-extraction pipelines.' },
  { id: 2, title: 'Medical Integration Specialist', dept: 'Clinical', loc: 'Remote (US)', type: 'Full-time', desc: 'Bridge HL7 FHIR connections with Epic Systems database setups.' },
  { id: 3, title: 'Senior UX Designer (Dashboard)', dept: 'Design', loc: 'Boston, MA (Hybrid)', type: 'Full-time', desc: 'Craft clean analytics layouts for hospital operations staff.' },
  { id: 4, title: 'Healthcare Sales Representative', dept: 'Sales', loc: 'Chicago, IL', type: 'Full-time', desc: 'Drive adoption of pharmacy dispatch APIs inside regional pharmacies.' },
];

export default function Careers() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [appliedJob, setAppliedJob] = useState<number | null>(null);

  const filteredJobs = selectedDept === 'All' ? JOBS : JOBS.filter(j => j.dept === selectedDept);

  return (
    <PublicLayout>
      {/* Section 1: Hero Banner */}
      <section className="bg-slate-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/40 via-slate-900 to-slate-900" />
        <div className="relative max-w-4xl mx-auto px-4 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight">
            Work That <span className="text-sky-400">Saves Lives</span>
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            At Medirex, we build intelligence layers that reduce doctor burnouts, quicken emergency dispatch times, and digitize prescription supply grids. Join our mission.
          </p>
        </div>
      </section>

      {/* Section 2: Interactive Department Filters */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="font-bold text-gray-800 text-sm mb-4 font-display">Filter by Department</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {['All', 'Engineering', 'Clinical', 'Design', 'Sales'].map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`py-2 px-5 text-xs font-bold rounded-lg border transition-all ${selectedDept === dept ? 'bg-primary-600 text-white border-primary-600' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'}`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Open Positions Listings */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 font-display text-center mb-6">Open Openings</h2>
          {filteredJobs.length === 0 ? (
            <p className="text-center text-slate-500 text-xs">No openings found in this category.</p>
          ) : (
            filteredJobs.map(job => (
              <div key={job.id} className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] bg-primary-50 text-primary-600 font-bold px-2 py-0.5 rounded-full">{job.dept}</span>
                  <h4 className="font-bold text-gray-800 text-sm font-display mt-1">{job.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-lg">{job.desc}</p>
                  <div className="flex gap-4 pt-1.5 text-[10px] text-slate-400 font-semibold">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.loc}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                  </div>
                </div>
                {appliedJob === job.id ? (
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                    <CheckCircle className="w-4 h-4" /> Applied
                  </span>
                ) : (
                  <button onClick={() => setAppliedJob(job.id)} className="btn-primary text-xs py-2 px-4 flex-shrink-0">Apply Now</button>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Section 4: Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display mb-1.5">Benefits of Joining Us</h2>
          <p className="text-gray-500 text-xs mb-10">Supporting our team members so they can support healthcare operators.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Full Health Care', desc: 'Platinum health, dental, and vision insurance covered 100% for families.' },
              { title: 'Remote Options', desc: 'Hybrid schedules or 100% remote allowances for design and engineering roles.' },
              { title: 'Learning Grants', desc: '$3,000 yearly training grants for conference attendances and courses.' },
              { title: 'Retirement Plans', desc: '401(k) matching up to 5% with immediate vesting rules.' },
            ].map(b => (
              <div key={b.title} className="p-5 rounded-2xl border border-slate-100 bg-slate-50">
                <h4 className="font-bold text-gray-800 text-sm font-display mb-2">{b.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
