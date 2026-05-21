import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Eye, EyeOff, Loader2, Shield, ArrowRight, AlertCircle, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types';

const ROLE_DASHBOARDS: Record<UserRole, string> = {
  patient: '/patient',
  doctor: '/doctor',
  hospital_staff: '/hospital',
  pharmacy: '/pharmacy-dash',
  lab: '/lab-dash',
  admin: '/admin',
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Please enter your email and password.'); return; }
    if (!form.email.includes('@')) { setError('Please enter a valid email address.'); return; }
    setError('');
    setIsLoading(true);
    try {
      const user = await login(form.email, form.password, 'patient');
      navigate(ROLE_DASHBOARDS[user.role]);
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative flex items-center justify-center p-4 overflow-hidden transition-colors duration-500">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/20 dark:bg-primary-600/40 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 dark:bg-emerald-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-violet-600/10 dark:bg-violet-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '12s' }} />
        
        {/* Modern Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white dark:bg-white/10 backdrop-blur-md border border-gray-100 dark:border-white/20 rounded-2xl shadow-xl mb-4 transform hover:scale-110 transition-transform">
            <Heart className="w-7 h-7 text-primary-600 dark:text-white" fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Welcome to Medirex</h1>
          <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">Sign in to access your healthcare dashboard</p>
        </div>

        <div className="bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-3xl shadow-2xl overflow-hidden relative group transition-colors duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 dark:from-white/10 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Demo hint banner */}
          <div className="relative z-10 p-4 bg-primary-50/50 dark:bg-white/5 border-b border-primary-100 dark:border-white/10 flex flex-col gap-3 transition-colors duration-500">
            <div className="flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-primary-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-primary-700 dark:text-emerald-300">Quick Demo Access</p>
                <p className="text-[11px] text-primary-600 dark:text-gray-300 leading-relaxed mt-0.5">
                  Click a role to auto-fill, or use any demo email with password <span className="font-semibold text-primary-800 dark:text-white">demo123</span>.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pl-6">
              {[
                { role: 'Patient', email: 'patient@medirex.com' },
                { role: 'Doctor', email: 'doctor@medirex.com' },
                { role: 'Hospital Staff', email: 'staff@medirex.com' },
                { role: 'Pharmacy', email: 'pharmacy@medirex.com' },
                { role: 'Lab', email: 'lab@medirex.com' },
                { role: 'Admin', email: 'admin@medirex.com' },
              ].map(demo => (
                <button
                  key={demo.role}
                  type="button"
                  onClick={() => setForm({ email: demo.email, password: 'demo123' })}
                  className="px-2.5 py-1 text-[10px] font-semibold bg-white dark:bg-white/5 text-primary-700 dark:text-white border border-primary-200 dark:border-white/10 rounded-lg hover:bg-primary-50 dark:hover:bg-white/20 transition-all hover:-translate-y-0.5 shadow-sm"
                >
                  {demo.role}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative z-10 p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5 drop-shadow-sm">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5 drop-shadow-sm">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all pr-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-500/20 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-200 text-sm animate-fade-in backdrop-blur-md">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-white/20 bg-white dark:bg-white/5 text-primary-600 dark:text-primary-500 focus:ring-primary-500 focus:ring-offset-slate-900" />
                <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Remember me</span>
              </label>
              <Link to="/auth/forgot-password" className="text-sm text-primary-600 dark:text-primary-300 hover:text-primary-700 dark:hover:text-primary-200 font-semibold transition-colors">Forgot password?</Link>
            </div>

            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transition-all hover:shadow-primary-500/50 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <div className="flex items-center gap-2 text-xs text-gray-400 justify-center pb-2">
              <Shield className="w-3.5 h-3.5" />
              HIPAA Compliant · AES-256 Encrypted
            </div>
          </form>

          <div className="relative z-10 px-6 pb-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/auth/signup" className="text-primary-600 dark:text-white font-bold hover:text-primary-700 dark:hover:text-primary-300 transition-colors">Create Account</Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          By signing in, you agree to our{' '}
          <Link to="/legal/terms" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white underline">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/legal/privacy" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
