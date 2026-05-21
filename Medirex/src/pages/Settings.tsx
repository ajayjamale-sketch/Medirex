import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Settings, Bell, Shield, User, Globe, Eye, Smartphone, Key, Trash2, ChevronRight, Check, LogOut, AlertTriangle, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Toggle { label: string; description: string; enabled: boolean }

export default function SettingsPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('general');
  const [toast, setToast] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const [notifications, setNotifications] = useState<Toggle[]>([
    { label: 'Emergency Alerts', description: 'Critical emergency notifications', enabled: true },
    { label: 'Appointment Reminders', description: '24h before appointment', enabled: true },
    { label: 'Lab Result Notifications', description: 'When results are ready', enabled: true },
    { label: 'AI Health Insights', description: 'Predictive health recommendations', enabled: false },
    { label: 'Billing Updates', description: 'Invoice and payment notifications', enabled: true },
    { label: 'System Announcements', description: 'Platform updates and maintenance', enabled: false },
  ]);

  const [general, setGeneral] = useState<Toggle[]>([
    { label: 'Dark Mode', description: 'Use dark theme', enabled: document.documentElement.classList.contains('dark') },
    { label: 'Compact View', description: 'Condensed UI layout', enabled: false },
    { label: 'Auto-Save', description: 'Automatically save drafts', enabled: true },
    { label: 'Analytics Sharing', description: 'Share usage for improvements', enabled: true },
  ]);

  const [security, setSecurity] = useState<Toggle[]>([
    { label: 'Two-Factor Authentication', description: 'Require 2FA on login', enabled: true },
    { label: 'Session Timeout', description: 'Auto-logout after 30 min idle', enabled: true },
    { label: 'Login Alerts', description: 'Email alert on new login', enabled: true },
    { label: 'Audit Log Access', description: 'Allow security team to review', enabled: false },
  ]);

  const toggle = (setter: React.Dispatch<React.SetStateAction<Toggle[]>>, index: number, label: string) => {
    setter(prev => prev.map((t, i) => i === index ? { ...t, enabled: !t.enabled } : t));
    showToast(`${label} ${!notifications[index]?.enabled ? 'enabled' : 'disabled'}`);
  };

  const handlePasswordChange = () => {
    setPasswordError('');
    setPasswordSuccess(false);
    if (!passwordForm.current) { setPasswordError('Please enter your current password'); return; }
    if (passwordForm.new.length < 8) { setPasswordError('New password must be at least 8 characters'); return; }
    if (passwordForm.new !== passwordForm.confirm) { setPasswordError("Passwords don't match"); return; }
    setPasswordSuccess(true);
    setPasswordForm({ current: '', new: '', confirm: '' });
    showToast('Password updated successfully');
  };

  const SECTIONS = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
    { id: 'account', label: 'Account', icon: User },
  ];

  const ToggleGroup = ({ items, setter }: { items: Toggle[]; setter: React.Dispatch<React.SetStateAction<Toggle[]>> }) => (
    <div className="divide-y divide-gray-100">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center justify-between py-4">
          <div>
            <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
          </div>
          <button
            onClick={() => { 
              setter(prev => prev.map((t, ti) => ti === i ? { ...t, enabled: !t.enabled } : t)); 
              showToast(`${item.label} ${item.enabled ? 'disabled' : 'enabled'}`); 
              if (item.label === 'Dark Mode') {
                if (item.enabled) document.documentElement.classList.remove('dark');
                else document.documentElement.classList.add('dark');
              }
            }}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${item.enabled ? 'bg-primary-600' : 'bg-gray-200'}`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${item.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><AlertTriangle className="w-6 h-6 text-red-600" /></div>
            <h3 className="font-bold text-gray-900 font-display text-center mb-2">Delete Account</h3>
            <p className="text-sm text-gray-500 text-center mb-4">This action is <strong>irreversible</strong>. All your data will be permanently deleted.</p>
            <input className="input-medical mb-3" placeholder={'Type "DELETE" to confirm'} />
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 btn-ghost border border-gray-200 justify-center">Cancel</button>
              <button onClick={() => { setShowDeleteConfirm(false); showToast('Account deletion request submitted'); }} className="flex-1 btn-danger justify-center">Delete Account</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 font-display">Settings</h1>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="medical-card p-3">
            {SECTIONS.map(section => {
              const Icon = section.icon;
              return (
                <button key={section.id} onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all mb-1 ${activeSection === section.id ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
            <div className="border-t border-gray-100 mt-3 pt-3">
              <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-5">
            {activeSection === 'general' && (
              <div className="medical-card p-5 animate-fade-in">
                <h2 className="font-bold text-gray-900 font-display mb-1">General Settings</h2>
                <p className="text-sm text-gray-500 mb-4">Customize your Medirex experience</p>
                <ToggleGroup items={general} setter={setGeneral} />
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Language</label>
                    <select className="input-medical w-48" onChange={() => showToast('Language preference saved')}>
                      <option>English (US)</option><option>Spanish</option><option>French</option><option>Arabic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Timezone</label>
                    <select className="input-medical w-64" onChange={() => showToast('Timezone updated')}>
                      <option>UTC-5 (Eastern Time)</option><option>UTC-6 (Central Time)</option><option>UTC-8 (Pacific Time)</option><option>UTC+0 (GMT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date Format</label>
                    <select className="input-medical w-48" onChange={() => showToast('Date format saved')}>
                      <option>MM/DD/YYYY</option><option>DD/MM/YYYY</option><option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <button onClick={() => showToast('Preferences saved')} className="btn-primary text-sm py-2.5"><Check className="w-4 h-4" /> Save Preferences</button>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="medical-card p-5 animate-fade-in">
                <h2 className="font-bold text-gray-900 font-display mb-1">Notification Preferences</h2>
                <p className="text-sm text-gray-500 mb-4">Choose what you get notified about</p>
                <ToggleGroup items={notifications} setter={setNotifications} />
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Notification Channels</p>
                  <div className="space-y-2">
                    {['Email Notifications', 'SMS Alerts', 'Push Notifications', 'In-App Alerts'].map(ch => (
                      <label key={ch} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary-600" onChange={() => showToast(`${ch} preference updated`)} />
                        <span className="text-sm text-gray-700">{ch}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-4 animate-fade-in">
                <div className="medical-card p-5">
                  <h2 className="font-bold text-gray-900 font-display mb-1">Security & Privacy</h2>
                  <p className="text-sm text-gray-500 mb-4">Protect your account and data</p>
                  <ToggleGroup items={security} setter={setSecurity} />
                </div>
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 font-display mb-3">Change Password</h3>
                  <div className="space-y-3 max-w-sm">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Current Password</label>
                      <input type="password" value={passwordForm.current} onChange={e => setPasswordForm(f => ({...f, current: e.target.value}))} placeholder="Current password" className="input-medical" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">New Password</label>
                      <input type="password" value={passwordForm.new} onChange={e => setPasswordForm(f => ({...f, new: e.target.value}))} placeholder="New password (min 8 chars)" className="input-medical" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Confirm New Password</label>
                      <input type="password" value={passwordForm.confirm} onChange={e => setPasswordForm(f => ({...f, confirm: e.target.value}))} placeholder="Confirm new password" className="input-medical" />
                    </div>
                    {passwordError && (
                      <div className="flex items-center gap-2 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                        <AlertTriangle className="w-3.5 h-3.5" /> {passwordError}
                      </div>
                    )}
                    {passwordSuccess && (
                      <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-600">
                        <Check className="w-3.5 h-3.5" /> Password updated successfully
                      </div>
                    )}
                    <button onClick={handlePasswordChange} className="btn-primary text-sm py-2.5"><Key className="w-4 h-4" /> Update Password</button>
                  </div>
                </div>
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 font-display mb-3">Active Sessions</h3>
                  <div className="space-y-2">
                    {[
                      { device: 'Chrome on macOS', location: 'New York, US', time: 'Current session', current: true },
                      { device: 'Safari on iPhone', location: 'New York, US', time: '2 hours ago', current: false },
                    ].map((s, i) => (
                      <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${s.current ? 'bg-primary-50 border border-primary-100' : 'bg-gray-50'}`}>
                        <Smartphone className="w-8 h-8 text-gray-400 bg-white p-1.5 rounded-lg" />
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-gray-900">{s.device}</p>
                          <p className="text-xs text-gray-500">{s.location} · {s.time}</p>
                        </div>
                        {s.current ? <span className="badge-success text-[10px]">Active</span> : (
                          <button onClick={() => showToast('Session terminated')} className="text-xs text-red-500 hover:underline font-medium">Revoke</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'account' && (
              <div className="space-y-4 animate-fade-in">
                <div className="medical-card p-5">
                  <h2 className="font-bold text-gray-900 font-display mb-4">Account Settings</h2>
                  {[
                    { label: 'Download My Data', desc: 'Get a copy of all your health data (HIPAA compliant)', icon: Eye, action: 'Download', handler: () => showToast('Data export started — you will receive an email') },
                    { label: 'Connected Devices', desc: 'Manage wearables and health monitors', icon: Smartphone, action: 'Manage', handler: () => showToast('Opening device management') },
                    { label: 'API Access', desc: 'Manage API keys and integrations', icon: Key, action: 'Configure', handler: () => showToast('Opening API configuration') },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center"><Icon className="w-4 h-4 text-gray-500" /></div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                          </div>
                        </div>
                        <button onClick={item.handler} className="btn-ghost text-xs py-1.5 border border-gray-200">
                          {item.action} <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="medical-card p-5">
                  <h3 className="font-bold text-gray-900 font-display mb-2">Quick Navigation</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Edit Profile', path: '/profile' },
                      { label: 'Notifications', path: '/notifications' },
                      { label: 'Compliance', path: '/compliance' },
                      { label: 'Analytics', path: '/analytics' },
                    ].map(item => (
                      <button key={item.label} onClick={() => navigate(item.path)}
                        className="flex items-center justify-between px-3 py-2.5 bg-gray-50 hover:bg-primary-50 rounded-xl text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
                        {item.label}<ChevronRight className="w-4 h-4 text-gray-300" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="medical-card p-5 border border-red-100">
                  <h3 className="font-bold text-red-600 font-display mb-2">Danger Zone</h3>
                  <p className="text-sm text-gray-500 mb-4">These actions are irreversible. Please proceed with caution.</p>
                  <button onClick={() => setShowDeleteConfirm(true)} className="flex items-center gap-2 px-4 py-2.5 border-2 border-red-300 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" /> Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
