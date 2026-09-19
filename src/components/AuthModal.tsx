import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApnaGharLogo } from './ApnaGharLogo';
import { 
  X, 
  Phone, 
  Mail, 
  User as UserIcon, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  KeyRound,
  CheckCircle2,
  Lock,
  Building,
  UserCheck,
  Briefcase
} from 'lucide-react';
import { UserRole } from '../types';

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
    handleRegister, 
    handleVerifyOtp 
  } = useApp();

  // Register Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('buyer');

  // Login Form State
  const [loginInput, setLoginInput] = useState(authIdentifier || '');

  // OTP State
  const [otpValues, setOtpValues] = useState<string[]>(['1', '2', '3', '4', '5', '6']);

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      // Handle paste
      const chars = val.slice(0, 6).split('');
      const newOtp = [...otpValues];
      chars.forEach((c, i) => {
        newOtp[i] = c;
      });
      setOtpValues(newOtp);
      return;
    }

    const updated = [...otpValues];
    updated[index] = val;
    setOtpValues(updated);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Branding */}
        <div className="p-6 pb-4 bg-gradient-to-b from-blue-50/80 to-white flex flex-col items-center text-center">
          <ApnaGharLogo size="lg" showTagline={true} />
          
          <div className="mt-4">
            {authMode === 'login' && (
              <>
                <h3 className="text-lg font-bold text-slate-900">Welcome Back</h3>
                <p className="text-xs text-slate-500 mt-0.5">Sign in with mobile OTP or email password</p>
              </>
            )}
            {authMode === 'register' && (
              <>
                <h3 className="text-lg font-bold text-slate-900">Create Apna Ghar Account</h3>
                <p className="text-xs text-slate-500 mt-0.5">Join India's most trusted real-estate discovery community</p>
              </>
            )}
            {authMode === 'otp' && (
              <>
                <h3 className="text-lg font-bold text-slate-900">Verify OTP</h3>
                <p className="text-xs text-slate-500 mt-0.5">Enter 6-digit verification code sent to <span className="font-semibold text-slate-800">{authIdentifier || '+91 98765 43210'}</span></p>
              </>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 pt-2">
          
          {/* SCREEN 16: LOGIN */}
          {authMode === 'login' && (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!loginInput.trim()) return;
                handleLogin(loginInput);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Mobile Number or Email
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="+91 98765 43210 or user@example.com"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Instant 6-digit OTP login
                </span>
                <button type="button" onClick={() => setAuthMode('register')} className="text-blue-600 font-semibold hover:underline">
                  New user? Register
                </button>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition"
              >
                <span>Get OTP on Phone</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                <div className="relative flex justify-center text-xs"><span className="px-3 bg-white text-slate-400">or sign in with</span></div>
              </div>

              <button 
                type="button"
                onClick={() => handleLogin('+91 98765 43210')}
                className="w-full py-2.5 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition"
              >
                <span>Demo 1-Click Login (Rajesh Sharma)</span>
              </button>
            </form>
          )}

          {/* SCREEN 17: REGISTER */}
          {authMode === 'register' && (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister({ name, email, phone, role });
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="e.g. Priya Sundaram"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile No.</label>
                  <input 
                    type="tel" 
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="priya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">I am registering as</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'buyer', label: 'Buyer/Tenant', icon: UserCheck },
                    { id: 'owner', label: 'Individual Owner', icon: Building },
                    { id: 'agent', label: 'Agent/Builder', icon: Briefcase }
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRole(item.id as UserRole)}
                        className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition ${
                          role === item.id 
                            ? 'border-blue-600 bg-blue-50/70 text-blue-700 font-bold' 
                            : 'border-slate-200 hover:bg-slate-50 text-slate-600 font-medium'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[10px] leading-tight">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-[11px] text-slate-500">
                By registering, you agree to Apna Ghar's <span className="text-blue-600 underline">Terms of Service</span> & <span className="text-blue-600 underline">Privacy Policy</span>.
              </div>

              <button 
                type="submit"
                className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition"
              >
                <span>Continue & Verify Phone</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <button type="button" onClick={() => setAuthMode('login')} className="text-xs text-blue-600 font-semibold hover:underline">
                  Already have an account? Sign in
                </button>
              </div>
            </form>
          )}

          {/* SCREEN 18: OTP VERIFICATION */}
          {authMode === 'otp' && (
            <div className="space-y-4">
              <div className="flex justify-center gap-2 my-4">
                {otpValues.map((digit, idx) => (
                  <input 
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-11 h-12 text-center text-lg font-bold rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none transition text-slate-900"
                  />
                ))}
              </div>

              <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200 flex items-center justify-between text-xs text-amber-800">
                <span>Demo Code: <strong className="font-mono">123456</strong></span>
                <button 
                  type="button" 
                  onClick={() => setOtpValues(['1', '2', '3', '4', '5', '6'])}
                  className="text-amber-900 font-bold underline"
                >
                  Auto-fill
                </button>
              </div>

              <button 
                type="button"
                onClick={() => {
                  const fullOtp = otpValues.join('');
                  handleVerifyOtp(fullOtp);
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify & Complete Sign In</span>
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                <button type="button" onClick={() => setAuthMode('login')} className="text-slate-600 hover:underline">
                  Change Number
                </button>
                <button type="button" onClick={() => handleLogin(authIdentifier || '+91 98765 43210')} className="text-blue-600 font-semibold hover:underline">
                  Resend OTP (00:28)
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
