import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Phone, MapPin, Camera, Save, Shield, Star, Calendar, Award } from 'lucide-react';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '123 Oak Street, New York, NY 10001',
    bio: 'Healthcare professional dedicated to patient-centered care and evidence-based medicine.',
    specialization: 'Cardiology',
  });

  const handleSave = () => {
    updateUser({ name: form.name, email: form.email, phone: form.phone });
    setEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 font-display">My Profile</h1>
          {!editing ? (
            <button onClick={() => setEditing(true)} className="btn-primary text-sm py-2.5">Edit Profile</button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setEditing(false)} className="btn-ghost border border-gray-200">Cancel</button>
              <button onClick={handleSave} className="btn-primary text-sm py-2.5"><Save className="w-4 h-4" /> Save Changes</button>
            </div>
          )}
        </div>

        {/* Profile Header */}
        <div className="medical-card p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=0284C7&color=fff&size=128`}
                alt={user?.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-primary-100"
              />
              {editing && (
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-xl flex items-center justify-center shadow-medical hover:bg-primary-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex-1">
              {editing ? (
                <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className="input-medical text-xl font-bold mb-2" />
              ) : (
                <h2 className="text-2xl font-bold text-gray-900 font-display">{user?.name}</h2>
              )}
              <p className="text-primary-600 font-semibold capitalize">{user?.role?.replace('_', ' ')}</p>
              <div className="flex flex-wrap gap-3 mt-2">
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>4.9 Rating</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Member since {new Date(user?.createdAt || '').getFullYear()}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${user?.verified ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    <Shield className="w-3 h-3" />
                    {user?.verified ? 'Verified' : 'Pending Verification'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="medical-card p-5">
            <h3 className="font-bold text-gray-900 font-display mb-4">Personal Information</h3>
            <div className="space-y-4">
              {[
                { label: 'Full Name', field: 'name', icon: User, type: 'text' },
                { label: 'Email Address', field: 'email', icon: Mail, type: 'email' },
                { label: 'Phone Number', field: 'phone', icon: Phone, type: 'tel' },
                { label: 'Address', field: 'address', icon: MapPin, type: 'text' },
              ].map(({ label, field, icon: Icon, type }) => (
                <div key={field}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
                  {editing ? (
                    <input type={type} value={form[field as keyof typeof form]} onChange={e => setForm(f => ({...f, [field]: e.target.value}))} className="input-medical" />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                      <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{form[field as keyof typeof form]}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Professional Info */}
          <div className="space-y-5">
            <div className="medical-card p-5">
              <h3 className="font-bold text-gray-900 font-display mb-4">Professional Profile</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Bio</label>
                  {editing ? (
                    <textarea value={form.bio} onChange={e => setForm(f => ({...f, bio: e.target.value}))} rows={3} className="input-medical resize-none" />
                  ) : (
                    <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-xl leading-relaxed">{form.bio}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Specialization</label>
                  {editing ? (
                    <select value={form.specialization} onChange={e => setForm(f => ({...f, specialization: e.target.value}))} className="input-medical">
                      {['Cardiology', 'Neurology', 'Orthopedics', 'Endocrinology', 'Emergency Medicine', 'General Practice'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{form.specialization}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="medical-card p-5">
              <h3 className="font-bold text-gray-900 font-display mb-3 text-sm">Achievements</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: '4,892 Patients', sub: 'Total served', color: 'bg-primary-50 text-primary-600' },
                  { label: '4.9 Stars', sub: 'Patient rating', color: 'bg-amber-50 text-amber-600' },
                  { label: '18 Years', sub: 'Experience', color: 'bg-emerald-50 text-emerald-600' },
                  { label: '3 Awards', sub: 'Excellence', color: 'bg-purple-50 text-purple-600' },
                ].map(a => (
                  <div key={a.label} className={`p-3 rounded-xl ${a.color} text-center`}>
                    <p className="font-bold text-sm">{a.label}</p>
                    <p className="text-xs opacity-70">{a.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
