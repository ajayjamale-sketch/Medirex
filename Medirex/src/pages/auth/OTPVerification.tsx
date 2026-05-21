import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, Loader2, CheckCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateUser } = useAuth();
  const email = (location.state as { email?: string; redirect?: string })?.email || user?.email || '';
  const redirect = (location.state as { redirect?: string })?.redirect || '/patient';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');
    if (value && index < 5) refs.current[index + 1]?.focus();
    if (newOtp.every(d => d !== '')) handleVerify(newOtp);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (otpToVerify = otp) => {
    const code = otpToVerify.join('');
    if (code.length < 6) { setError('Please enter the complete 6-digit code.'); return; }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    // Demo: any 6-digit code works, or show error for wrong patterns
    if (code === '000000') {
      setError('Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      refs.current[0]?.focus();
      setIsLoading(false);
      return;
    }
    setIsVerified(true);
    updateUser({ verified: true });
    setIsLoading(false);
    setTimeout(() => navigate(redirect), 1500);
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    refs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-navy to-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-medical-lg mb-4">
            <Heart className="w-7 h-7 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Verify Your Account</h1>
          <p className="text-gray-300 text-sm mt-2">
            We sent a 6-digit verification code to<br />
            <span className="text-white font-semibold">{email}</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-medical-lg p-8">
          {isVerified ? (
            <div className="text-center py-4 animate-scale-in">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 font-display">Account Verified!</h2>
              <p className="text-gray-500 mt-2">Redirecting to your dashboard...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">Enter Verification Code</label>
                <div className="flex gap-3 justify-center">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => refs.current[i] = el}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleKeyDown(i, e)}
                      className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-all ${
                        error ? 'border-red-400 bg-red-50' :
                        digit ? 'border-primary-500 bg-primary-50 text-primary-700' :
                        'border-gray-200 focus:border-primary-500 focus:bg-primary-50'
                      }`}
                    />
                  ))}
                </div>
                {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}
                <p className="text-xs text-gray-400 text-center mt-3">Demo: enter any 6-digit code (not 000000)</p>
              </div>

              <button
                onClick={() => handleVerify()}
                disabled={isLoading || otp.some(d => !d)}
                className="btn-primary w-full justify-center py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</> : 'Verify & Continue'}
              </button>

              <div className="text-center">
                {canResend ? (
                  <button onClick={handleResend} className="flex items-center gap-2 text-primary-600 font-semibold text-sm mx-auto hover:text-primary-700">
                    <RefreshCw className="w-4 h-4" /> Resend Code
                  </button>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Resend code in <span className="font-semibold text-primary-600">{countdown}s</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
