import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApnaGharLogo } from './ApnaGharLogo';
import { authService } from '../services/authService';
import { 
  X, 
  Phone, 
  Mail, 
  User as UserIcon, 
  ArrowRight, 
  CheckCircle2,
  Lock,
  ChevronLeft
} from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { 
    authMode, 
    setAuthMode, 
    authIdentifier, 
    setAuthIdentifier,
    handleLogin, 
    handleVerifyOtp,
    setCurrentUser,
    showToast 
  } = useApp();

  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [inputVal, setInputVal] = useState<string>(authIdentifier || '');
  const [otpValues, setOtpValues] = useState<string[]>(['1', '2', '3', '4', '5', '6']);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle Continue button press
  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) {
      showToast(`Please enter your ${loginMethod === 'phone' ? 'phone number' : 'email address'}`, 'error');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authService.requestOtp(inputVal);
      if (res.success) {
        handleLogin(inputVal);
      }
    } catch (err) {
      showToast('Authentication failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign-In Placeholder
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const res = await authService.signInWithGoogle();
      if (res.success) {
        setCurrentUser(prev => ({
          ...prev,
          name: res.user.name,
          email: res.user.email,
          phone: res.user.phone,
          avatar: res.user.photoURL || prev.avatar
        }));
        showToast(`Signed in with Google as ${res.user.name}!`, 'success');
        onClose();
      }
    } catch (err) {
      showToast('Google Sign-In failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // OTP Verification
  const handleVerifyOtpSubmit = async () => {
    const fullOtp = otpValues.join('');
    setIsLoading(true);
    try {
      const res = await authService.verifyOtp(fullOtp, authIdentifier);
      if (res.success) {
        setCurrentUser(prev => ({
          ...prev,
          name: res.user.name,
          email: res.user.email,
          phone: res.user.phone
        }));
        handleVerifyOtp(fullOtp);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      const chars = val.slice(0, 6).split('');
      const newOtp = [...otpValues];
      chars.forEach((c, i) => { newOtp[i] = c; });
      setOtpValues(newOtp);
      return;
    }

    const updated = [...otpValues];
    updated[index] = val;
    setOtpValues(updated);

    if (val && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Minimal Header */}
        <div className="p-6 pb-4 bg-white flex flex-col items-center text-center pt-8">
          <ApnaGharLogo size="md" showTagline={false} />
          
          <div className="mt-3">
            {authMode === 'login' && (
              <>
                <h3 className="text-base font-black text-slate-900">Sign in or create account</h3>
                <p className="text-xs text-slate-500 mt-0.5">Enter your phone or email to continue</p>
              </>
            )}
            {authMode === 'otp' && (
              <>
                <h3 className="text-base font-black text-slate-900">Verification Code</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter 6-digit OTP sent to <span className="font-bold text-slate-800">{authIdentifier || '+91 98765 43210'}</span>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 pt-2">
          
          {/* STEP 1: INITIAL LOGIN SCREEN */}
          {authMode === 'login' && (
            <form onSubmit={handleContinue} className="space-y-4">
              
              {/* Phone / Email Toggle Tabs */}
              <div className="p-1 bg-slate-100 rounded-2xl grid grid-cols-2 gap-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('phone');
                    setInputVal('+91 ');
                  }}
                  className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                    loginMethod === 'phone'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-red-600" />
                  <span>Phone Number</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('email');
                    setInputVal('');
                  }}
                  className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                    loginMethod === 'email'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Email</span>
                </button>
              </div>

              {/* Input Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {loginMethod === 'phone' ? 'Mobile Number' : 'Email Address'}
                </label>
                <div className="relative">
                  {loginMethod === 'phone' ? (
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  ) : (
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  )}
                  <input 
                    type={loginMethod === 'phone' ? 'tel' : 'email'} 
                    placeholder={loginMethod === 'phone' ? '+91 98765 43210' : 'you@example.com'}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-600 font-semibold text-slate-900"
                  />
                </div>
              </div>

              {/* Primary Continue Button */}
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#E53935] hover:bg-red-700 text-white font-black text-xs shadow-md shadow-red-600/20 flex items-center justify-center gap-2 transition active:scale-98"
              >
                <span>{isLoading ? 'Processing...' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-[10px]">
                  <span className="px-3 bg-white text-slate-400 font-bold uppercase tracking-wider">or</span>
                </div>
              </div>

              {/* Google Sign-In Placeholder */}
              <button 
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-xs font-extrabold text-slate-700 flex items-center justify-center gap-2.5 transition active:scale-98"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

            </form>
          )}

          {/* STEP 2: OTP VERIFICATION */}
          {authMode === 'otp' && (
            <div className="space-y-4">
              
              <div className="flex justify-center gap-2 my-2">
                {otpValues.map((digit, idx) => (
                  <input 
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-10 h-11 text-center text-lg font-bold rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-red-600 focus:bg-white focus:outline-none transition text-slate-900"
                  />
                ))}
              </div>

              <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200/80 flex items-center justify-between text-xs text-amber-900">
                <span>Demo Code: <strong className="font-mono">123456</strong></span>
                <button 
                  type="button" 
                  onClick={() => setOtpValues(['1', '2', '3', '4', '5', '6'])}
                  className="text-amber-950 font-extrabold underline"
                >
                  Auto-fill
                </button>
              </div>

              <button 
                type="button"
                onClick={handleVerifyOtpSubmit}
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition active:scale-98"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLoading ? 'Verifying...' : 'Verify OTP'}</span>
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <button 
                  type="button" 
                  onClick={() => setAuthMode('login')} 
                  className="text-slate-600 font-semibold hover:underline flex items-center gap-0.5"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Change</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => showToast('Resent verification OTP code (123456)', 'info')} 
                  className="text-red-600 font-bold hover:underline"
                >
                  Resend OTP
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
