import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { MOCK_NOTIFICATIONS } from '@/constants/mockData';
import { Bell, Check, Trash2, AlertTriangle, Calendar, FlaskConical, Pill, CreditCard, Zap, Settings } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import type { Notification } from '@/types';

const TYPE_ICONS: Record<string, React.ComponentType<{className?: string}>> = {
  emergency: AlertTriangle, appointment: Calendar, lab: FlaskConical,
  prescription: Pill, billing: CreditCard, ai: Zap, system: Settings,
};

const TYPE_COLORS: Record<string, string> = {
  emergency: 'bg-red-50 text-red-600 border-red-100',
  appointment: 'bg-primary-50 text-primary-600 border-primary-100',
  lab: 'bg-purple-50 text-purple-600 border-purple-100',
  prescription: 'bg-amber-50 text-amber-600 border-amber-100',
  billing: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  ai: 'bg-primary-50 text-primary-600 border-primary-100',
  system: 'bg-gray-50 text-gray-600 border-gray-100',
};

export default function Notifications() {
  const { notifications, markNotificationRead, markAllRead } = useApp();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = notifications.filter(n =>
    (filter === 'all' || !n.read) &&
    (typeFilter === 'all' || n.type === typeFilter)
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleClick = (n: Notification) => {
    markNotificationRead(n.id);
    if (n.action) navigate(n.action);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">Notifications</h1>
            <p className="text-gray-500 text-sm mt-0.5">{unreadCount} unread notifications</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="btn-ghost text-sm border border-gray-200">
              <Check className="w-4 h-4" /> Mark All Read
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {(['all', 'unread'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${filter === f ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500'}`}>{f}</button>
            ))}
          </div>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            <option value="all">All Types</option>
            {['emergency', 'appointment', 'lab', 'prescription', 'billing', 'ai', 'system'].map(t => <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
        </div>

        {/* Notification List */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="medical-card p-12 text-center">
              <Bell className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="font-semibold text-gray-500">No notifications</p>
              <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
            </div>
          ) : filtered.map(notif => {
            const Icon = TYPE_ICONS[notif.type] || Bell;
            const colorClass = TYPE_COLORS[notif.type] || 'bg-gray-50 text-gray-600 border-gray-100';
            return (
              <div
                key={notif.id}
                onClick={() => handleClick(notif)}
                className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-card ${
                  !notif.read ? 'bg-white border-primary-100 shadow-sm' : 'bg-gray-50/50 border-gray-100'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <p className={`font-semibold text-sm ${!notif.read ? 'text-gray-900' : 'text-gray-600'}`}>{notif.title}</p>
                      {!notif.read && <span className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0" />}
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className={`badge text-[9px] ${notif.priority === 'high' ? 'badge-danger' : notif.priority === 'medium' ? 'badge-warning' : 'bg-gray-100 text-gray-500'}`}>{notif.priority}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1.5">
                    {new Date(notif.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); markNotificationRead(notif.id); }}
                  className="p-1.5 text-gray-300 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors flex-shrink-0"
                  title="Mark as read"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Section 4: Notification Insights & Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="medical-card p-4 text-center">
            <h4 className="font-bold text-lg text-gray-900 font-display">{notifications.length}</h4>
            <p className="text-[10px] text-slate-500">Total Alerts</p>
          </div>
          <div className="medical-card p-4 text-center">
            <h4 className="font-bold text-lg text-emerald-600 font-display">{notifications.filter(n => n.read).length}</h4>
            <p className="text-[10px] text-slate-500">Read & Acknowledged</p>
          </div>
          <div className="medical-card p-4 text-center">
            <h4 className="font-bold text-lg text-red-600 font-display">{notifications.filter(n => n.priority === 'high').length}</h4>
            <p className="text-[10px] text-slate-500">High Priority Critical</p>
          </div>
        </div>

        {/* Section 5: Dispatch & Alert Settings */}
        <div className="medical-card p-5 space-y-3">
          <h3 className="font-bold text-gray-900 text-xs font-display flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-primary-600" /> Dispatch & Alert Settings
          </h3>
          <p className="text-[10px] text-slate-500">Configure alert routing thresholds for patient updates and billing logs.</p>
          <div className="space-y-2">
            {[
              { id: 'email', name: 'Email Dispatch Notifications', desc: 'Send digests of EMR updates and insurance claims status.' },
              { id: 'sms', name: 'Emergency SMS Routing', desc: 'Ping mobile devices immediately when critical lab values or STAT triage is triggered.' },
            ].map(pref => (
              <label key={pref.id} className="flex items-start justify-between cursor-pointer p-2.5 hover:bg-slate-50 rounded-xl transition-all border border-slate-100 bg-white">
                <div>
                  <p className="text-xs font-semibold text-slate-700">{pref.name}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">{pref.desc}</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary-600 mt-0.5" />
              </label>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
