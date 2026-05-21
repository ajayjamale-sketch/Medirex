import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Eye, EyeOff, Loader2, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types';

const ROLES: { value: UserRole; label: string; desc: string; icon: string }[] = [
  { value: 'patient', label: 'Patient', desc: 'Book appointments, view records', icon: '🧑‍⚕️' },
  { value: 'doctor', label: 'Doctor', desc: 'Manage patients & consultations', icon: '👨‍⚕️' },
  { value: 'hospital_staff', label: 'Hospital Staff', desc: 'Hospital operations & management', icon: '🏥' },
  { value: 'pharmacy', label: 'Pharmacy Partner', desc: 'Manage inventory & prescriptions', icon: '💊' },
  { value: 'lab', label: 'Lab Partner', desc: 'Process tests & reports', icon: '🔬' },
];

const ROLE_DASHBOARDS: Record<UserRole, string> = {
  patient: '/patient',
  doctor: '/doctor',
  hospital_staff: '/hospital',
  pharmacy: '/pharmacy-dash',
  lab: '/lab-dash',
  admin: '/admin',
};

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', role: 'patient' as UserRole });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!form.name.trim()) newErrors.name = 'Full name is required';
      if (!form.email.includes('@')) newErrors.email = 'Valid email is required';
      if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    }
    if (step === 2) {
      if (!form.password || form.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) setStep(s => Math.min(s + 1, 3) as 1 | 2 | 3);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await signup({ name: form.name, email: form.email, phone: form.phone, password: form.password, role: form.role });
    navigate('/auth/otp', { state: { email: form.email, redirect: ROLE_DASHBOARDS[form.role] } });
    setIsLoading(false);
  };

  const passwordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = passwordStrength(form.password);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', 'bg-red-500', 'bg-amber-500', 'bg-emerald-400', 'bg-emerald-600'][strength];

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-navy via-medical-navy-light to-primary-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-medical-lg mb-4">
            <Heart className="w-7 h-7 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Create Your Account</h1>
          <p className="text-gray-300 text-sm mt-1">Join 2M+ healthcare professionals on Medirex</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map(s => (
            <div key={s} className={`flex-1 h-1 rounded-full transition-all ${s <= step ? 'bg-primary-400' : 'bg-white/20'}`} />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-medical-lg p-6">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="font-bold text-gray-900 font-display">Personal Information</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Dr. John Smith" className="input-medical" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="john@hospital.com" className="input-medical" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                <input type="tel" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+1 (555) 000-0000" className="input-medical" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <button onClick={handleNext} className="btn-primary w-full justify-center py-3.5">Next Step <ArrowRight className="w-4 h-4" /></button>
            </div>
          )}

          {/* Step 2: Password */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="font-bold text-gray-900 font-display">Secure Your Account</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm(f => ({...f, password: e.target.value}))}
                    placeholder="Min. 8 characters"
                    className="input-medical pr-11"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1,2,3,4].map(i => <div key={i} className={`flex-1 h-1 rounded-full ${i <= strength ? strengthColor : 'bg-gray-100'}`} />)}
                    </div>
                    <p className="text-xs text-gray-500">Password strength: <span className="font-semibold">{strengthLabel}</span></p>
                  </div>
                )}
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={e => setForm(f => ({...f, confirmPassword: e.target.value}))}
                  placeholder="Re-enter your password"
                  className="input-medical"
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-ghost flex-1 justify-center border border-gray-200">Back</button>
                <button onClick={handleNext} className="btn-primary flex-1 justify-center">Next <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {/* Step 3: Role Selection */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="font-bold text-gray-900 font-display">Select Your Role</h2>
              <p className="text-sm text-gray-500">Choose the role that best describes how you'll use Medirex.</p>
              <div className="space-y-2.5">
                {ROLES.map(role => (
                  <button
                    key={role.value}
                    onClick={() => setForm(f => ({...f, role: role.value}))}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${
                      form.role === role.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-2xl">{role.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">{role.label}</div>
                      <div className="text-xs text-gray-500">{role.desc}</div>
                    </div>
                    {form.role === role.value && <CheckCircle className="w-5 h-5 text-primary-600" />}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn-ghost flex-1 justify-center border border-gray-200">Back</button>
                <button onClick={handleSubmit} disabled={isLoading} className="btn-primary flex-1 justify-center">
                  {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
            </div>
          )}

          <div className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-primary-600 font-semibold hover:text-primary-700">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
