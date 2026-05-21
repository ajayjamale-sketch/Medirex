import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Shield, CheckCircle, AlertTriangle, FileText, Lock, Activity, ChevronRight, Download } from 'lucide-react';

const COMPLIANCE_ITEMS = [
  { name: 'HIPAA Compliance', status: 'Compliant', lastAudit: '2026-04-01', nextAudit: '2026-10-01', score: 98, color: 'emerald' },
  { name: 'GDPR Requirements', status: 'Compliant', lastAudit: '2026-03-15', nextAudit: '2026-09-15', score: 96, color: 'emerald' },
  { name: 'SOC 2 Type II', status: 'Compliant', lastAudit: '2026-01-20', nextAudit: '2027-01-20', score: 99, color: 'emerald' },
  { name: 'ISO 27001', status: 'Review Needed', lastAudit: '2025-12-01', nextAudit: '2026-06-01', score: 87, color: 'amber' },
  { name: 'HITRUST CSF', status: 'Compliant', lastAudit: '2026-02-10', nextAudit: '2026-08-10', score: 94, color: 'emerald' },
  { name: 'PCI DSS', status: 'Compliant', lastAudit: '2026-03-01', nextAudit: '2026-09-01', score: 97, color: 'emerald' },
];

const POLICIES = [
  { name: 'Data Privacy Policy', version: 'v3.2', updated: '2026-04-15', status: 'Current' },
  { name: 'Information Security Policy', version: 'v2.8', updated: '2026-03-20', status: 'Current' },
  { name: 'Incident Response Plan', version: 'v1.9', updated: '2026-02-01', status: 'Review Due' },
  { name: 'Business Continuity Plan', version: 'v2.1', updated: '2026-01-15', status: 'Current' },
  { name: 'Access Control Policy', version: 'v3.0', updated: '2026-04-01', status: 'Current' },
];

export default function Compliance() {
  const [activeTab, setActiveTab] = useState<'overview' | 'policies' | 'incidents' | 'training'>('overview');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">Compliance Management</h1>
            <p className="text-gray-500 text-sm mt-0.5">Security controls, audit logs, and regulatory compliance</p>
          </div>
          <button className="btn-primary text-sm py-2.5"><Download className="w-4 h-4" /> Compliance Report</button>
        </div>

        {/* Overall compliance score */}
        <div className="medical-card p-6 bg-gradient-to-r from-emerald-50 to-primary-50 border-emerald-100">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Shield className="w-10 h-10 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-emerald-600 font-display">96.2%</span>
                <span className="badge-success">Excellent</span>
              </div>
              <p className="text-gray-600 font-medium">Overall Compliance Score</p>
              <p className="text-sm text-gray-500 mt-0.5">5 of 6 frameworks fully compliant · 1 requires review</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
          {(['overview', 'policies', 'incidents', 'training'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${activeTab === tab ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{tab}</button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COMPLIANCE_ITEMS.map(item => (
                <div key={item.name} className="medical-card p-5 cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color === 'emerald' ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                      <Shield className={`w-5 h-5 ${item.color === 'emerald' ? 'text-emerald-600' : 'text-amber-600'}`} />
                    </div>
                    <span className={`badge text-[10px] ${item.color === 'emerald' ? 'badge-success' : 'badge-warning'}`}>{item.status}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 font-display text-sm mb-1">{item.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.color === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${item.score}%` }} />
                    </div>
                    <span className={`text-xs font-bold ${item.color === 'emerald' ? 'text-emerald-600' : 'text-amber-600'}`}>{item.score}%</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <div>Last audit: {item.lastAudit}</div>
                    <div>Next audit: {item.nextAudit}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Security Controls */}
            <div className="medical-card p-5">
              <h2 className="font-bold text-gray-900 font-display mb-4">Active Security Controls</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: 'AES-256 Encryption at Rest', active: true },
                  { label: 'TLS 1.3 in Transit', active: true },
                  { label: 'Multi-Factor Authentication', active: true },
                  { label: 'Role-Based Access Control', active: true },
                  { label: 'Automated Audit Logging', active: true },
                  { label: 'DLP (Data Loss Prevention)', active: true },
                  { label: 'Vulnerability Scanning', active: true },
                  { label: 'Penetration Testing', active: false },
                ].map(control => (
                  <div key={control.label} className={`flex items-center gap-2.5 p-3 rounded-xl ${control.active ? 'bg-emerald-50' : 'bg-gray-50'}`}>
                    {control.active ? <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />}
                    <span className={`text-sm font-medium ${control.active ? 'text-emerald-800' : 'text-gray-600'}`}>{control.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="medical-card p-5 animate-fade-in">
            <h2 className="font-bold text-gray-900 font-display mb-4">Policy Documents</h2>
            <div className="space-y-3">
              {POLICIES.map(policy => (
                <div key={policy.name} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-primary-200 hover:bg-primary-50/20 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-primary-500 bg-primary-50 p-1.5 rounded-lg flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{policy.name}</p>
                      <p className="text-xs text-gray-500">{policy.version} · Updated {policy.updated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`badge text-[10px] ${policy.status === 'Current' ? 'badge-success' : 'badge-warning'}`}>{policy.status}</span>
                    <button className="btn-ghost text-xs py-1"><Download className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'incidents' && (
          <div className="medical-card p-5 animate-fade-in">
            <h2 className="font-bold text-gray-900 font-display mb-4">Security Incidents</h2>
            <div className="space-y-3">
              {[
                { id: 'INC-001', title: 'Failed login attempts (brute force)', severity: 'Medium', date: '2026-05-18', status: 'Resolved', desc: '47 failed login attempts from IP 192.168.1.100 blocked by WAF.' },
                { id: 'INC-002', title: 'Unauthorized data export attempt', severity: 'High', date: '2026-05-10', status: 'Resolved', desc: 'Staff member attempted bulk export blocked by DLP policy. User suspended.' },
                { id: 'INC-003', title: 'Expired SSL certificate on test server', severity: 'Low', date: '2026-04-28', status: 'Resolved', desc: 'Non-production server certificate expired. Renewed immediately.' },
              ].map(inc => (
                <div key={inc.id} className="p-4 border border-gray-100 rounded-xl">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-400">{inc.id}</span>
                        <span className={`badge text-[10px] ${inc.severity === 'High' ? 'badge-danger' : inc.severity === 'Medium' ? 'badge-warning' : 'bg-gray-100 text-gray-500'}`}>{inc.severity}</span>
                        <span className="badge-success text-[10px]">{inc.status}</span>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{inc.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{inc.desc}</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{inc.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="medical-card p-5 animate-fade-in">
            <h2 className="font-bold text-gray-900 font-display mb-4">Compliance Training Status</h2>
            <div className="space-y-3">
              {[
                { name: 'HIPAA Privacy & Security Training', completion: 94, due: '2026-06-30' },
                { name: 'Cybersecurity Awareness Training', completion: 88, due: '2026-07-15' },
                { name: 'Data Handling Best Practices', completion: 96, due: '2026-08-01' },
                { name: 'Incident Response Training', completion: 72, due: '2026-05-31' },
              ].map(training => (
                <div key={training.name} className="p-4 border border-gray-100 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{training.name}</p>
                      <p className="text-xs text-gray-500">Due: {training.due}</p>
                    </div>
                    <span className={`text-lg font-bold font-display ${training.completion >= 90 ? 'text-emerald-600' : training.completion >= 80 ? 'text-amber-600' : 'text-red-500'}`}>{training.completion}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${training.completion >= 90 ? 'bg-emerald-500' : training.completion >= 80 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${training.completion}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
