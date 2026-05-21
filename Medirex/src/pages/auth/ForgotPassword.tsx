import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Loader2, CheckCircle, ArrowLeft, Mail } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) { setError('Please enter a valid email address.'); return; }
    setError('');
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setIsSent(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-navy to-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-medical-lg mb-4">
            <Heart className="w-7 h-7 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Reset Password</h1>
          <p className="text-gray-300 text-sm mt-1">We'll send you a secure reset link</p>
        </div>

        <div className="bg-white rounded-2xl shadow-medical-lg p-8">
          {isSent ? (
            <div className="text-center animate-scale-in">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 font-display">Email Sent!</h2>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                If an account exists for <span className="font-semibold text-gray-700">{email}</span>, you'll receive a password reset link within 5 minutes.
              </p>
              <div className="mt-6 space-y-3">
                <Link to="/auth/login" className="btn-primary w-full justify-center">
                  Back to Sign In
                </Link>
                <button onClick={() => { setIsSent(false); setEmail(''); }} className="w-full text-sm text-gray-500 hover:text-gray-700">
                  Try a different email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 mb-4">
                  <Mail className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Enter the email associated with your Medirex account.</p>
                </div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  placeholder="your@email.com"
                  className="input-medical"
                  autoFocus
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>

              <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-70">
                {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : 'Send Reset Link'}
              </button>

              <Link to="/auth/login" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Sign In
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
