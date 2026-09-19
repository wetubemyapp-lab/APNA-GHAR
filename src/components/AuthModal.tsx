import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { ApnaGharLogo } from './ApnaGharLogo';
import {
  X,
  Phone,
  Mail,
  User as UserIcon,
  ArrowRight,
  Lock,
  MapPin,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
}

type FieldErrors = { [key: string]: string | undefined };

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const {
    authMode,
    setAuthMode,
    rememberMe,
    setRememberMe,
    handleLoginWithPassword,
    handleSignUp,
    showToast,
  } = useApp();

  // ----- Sign In State -----
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginShowPw, setLoginShowPw] = useState(false);
  const [loginErrors, setLoginErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // ----- Sign Up State -----
  const [suName, setSuName] = useState('');
  const [suEmail, setSuEmail] = useState('');
  const [suPhone, setSuPhone] = useState('');
  const [suArea, setSuArea] = useState('');
  const [suPassword, setSuPassword] = useState('');
  const [suConfirm, setSuConfirm] = useState('');
  const [suRole, setSuRole] = useState<UserRole>('buyer');
  const [suShowPw, setSuShowPw] = useState(false);
  const [suErrors, setSuErrors] = useState<FieldErrors>({});

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
  const isValidPhone = (p: string) => {
    const d = p.replace(/\D/g, '');
    return d.length === 10;
  };

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: FieldErrors = {};
    if (!loginIdentifier.trim()) errs.identifier = 'Enter your email or mobile number';
    if (!loginPassword) errs.password = 'Password is required';
    else if (loginPassword.length < 6) errs.password = 'Password must be at least 6 characters';
    setLoginErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    const res = handleLoginWithPassword(loginIdentifier, loginPassword);
    setSubmitting(false);
    if (!res.ok) {
      showToast(res.message, 'error');
      return;
    }
    onClose();
  };

  const handleSubmitSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: FieldErrors = {};
    if (!suName.trim()) errs.name = 'Full name is required';
    else if (suName.trim().length < 3) errs.name = 'Name must be at least 3 characters';
    if (!suEmail.trim()) errs.email = 'Email is required';
    else if (!validateEmail(suEmail)) errs.email = 'Enter a valid email address';
    if (!suPhone.trim()) errs.phone = 'Mobile number is required';
    else if (!isValidPhone(suPhone)) errs.phone = 'Enter a valid 10-digit mobile number';
    if (!suArea.trim()) errs.area = 'Area / locality is required';
    else if (suArea.trim().length < 3) errs.area = 'Enter your area or city (min 3 chars)';
    if (!suPassword) errs.password = 'Password is required';
    else if (suPassword.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!suConfirm) errs.confirm = 'Please confirm your password';
    else if (suConfirm !== suPassword) errs.confirm = 'Passwords do not match';
    setSuErrors(errs);
    if (Object.keys(errs).length > 0) {
      showToast('Please fix the highlighted fields', 'error');
      return;
    }

    setSubmitting(true);
    const res = handleSignUp({
      name: suName,
      email: suEmail,
      phone: suPhone,
      area: suArea,
      password: suPassword,
      role: suRole,
    });
    setSubmitting(false);
    if (!res.ok) {
      showToast(res.message, 'error');
      return;
    }
    onClose();
  };

  const pwStrength = useMemo(() => {
    const p = suPassword;
    if (!p) return { score: 0, label: '', color: '' };
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
    if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) score++;
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-rose-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500'];
    return { score, label: labels[Math.min(score, 3)], color: colors[Math.min(score, 3)] };
  }, [suPassword]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative max-h-[94vh]">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="p-6 pb-3 bg-white flex flex-col items-center text-center pt-8">
          <ApnaGharLogo size="sm" showTagline={false} />
          <h3 className="text-lg font-black text-slate-900 mt-3">
            {authMode === 'login' ? 'Welcome back' : 'Create your Apna Ghar account'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {authMode === 'login'
              ? 'Sign in to save searches, shortlist homes & contact owners'
              : 'Join to shortlist homes, post listings, and get price alerts'}
          </p>
        </div>

        {/* Mode toggle */}
        <div className="px-6 pt-1 pb-3">
          <div className="p-1 bg-slate-100 rounded-2xl grid grid-cols-2 gap-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`py-2 rounded-xl transition ${
                authMode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`py-2 rounded-xl transition ${
                authMode === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 overflow-y-auto">
          {/* ---------- SIGN IN ---------- */}
          {authMode === 'login' && (
            <form onSubmit={handleSubmitLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    inputMode="email"
                    autoComplete="username"
                    value={loginIdentifier}
                    onChange={(e) => {
                      setLoginIdentifier(e.target.value);
                      setLoginErrors((p) => ({ ...p, identifier: undefined }));
                    }}
                    placeholder="you@example.com or 9876543210"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 ${
                      loginErrors.identifier ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-[#3949AB]'
                    }`}
                  />
                </div>
                {loginErrors.identifier && (
                  <p className="text-[11px] text-rose-600 font-medium mt-1">{loginErrors.identifier}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={loginShowPw ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      setLoginErrors((p) => ({ ...p, password: undefined }));
                    }}
                    placeholder="Enter password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 ${
                      loginErrors.password ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-[#3949AB]'
                    }`}
                  />
                  <button
                    type="button"
                    aria-label={loginShowPw ? 'Hide password' : 'Show password'}
                    onClick={() => setLoginShowPw((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                  >
                    {loginShowPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {loginErrors.password && (
                  <p className="text-[11px] text-rose-600 font-medium mt-1">{loginErrors.password}</p>
                )}
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#3949AB] focus:ring-[#3949AB]"
                />
                <span className="text-[11px] font-medium text-slate-600">Remember me on this device</span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 rounded-2xl bg-[#3949AB] hover:bg-indigo-800 text-white font-black text-xs shadow-md shadow-[#3949AB]/25 flex items-center justify-center gap-2 transition active:scale-[0.98] disabled:opacity-60"
              >
                <span>{submitting ? 'Signing in...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-[11px] text-blue-900">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>Demo tip:</strong> Create an account via Sign Up, then use those credentials to sign in.
                </span>
              </div>

              <p className="text-center text-[11px] text-slate-500 pt-1">
                New to Apna Ghar?{' '}
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setLoginErrors({}); }}
                  className="text-[#3949AB] font-bold hover:underline"
                >
                  Create an account
                </button>
              </p>
            </form>
          )}

          {/* ---------- SIGN UP ---------- */}
          {authMode === 'register' && (
            <form onSubmit={handleSubmitSignUp} className="space-y-3">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${suErrors.name ? 'text-rose-500' : 'text-slate-400'}`} />
                  <input
                    type="text"
                    autoComplete="name"
                    value={suName}
                    onChange={(e) => { setSuName(e.target.value); setSuErrors((p) => ({...p, name: undefined})); }}
                    placeholder="e.g. Priya Sharma"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 ${suErrors.name ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-[#3949AB]'}`}
                  />
                </div>
                {suErrors.name && <p className="text-[11px] text-rose-600 font-medium mt-1">{suErrors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address / Gmail ID <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${suErrors.email ? 'text-rose-500' : 'text-slate-400'}`} />
                  <input
                    type="email"
                    autoComplete="email"
                    value={suEmail}
                    onChange={(e) => { setSuEmail(e.target.value); setSuErrors((p) => ({...p, email: undefined})); }}
                    placeholder="you@gmail.com"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 ${suErrors.email ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-[#3949AB]'}`}
                  />
                </div>
                {suErrors.email && <p className="text-[11px] text-rose-600 font-medium mt-1">{suErrors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (10 digits) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${suErrors.phone ? 'text-rose-500' : 'text-slate-400'}`} />
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={suPhone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setSuPhone(digits);
                      setSuErrors((p) => ({...p, phone: undefined}));
                    }}
                    placeholder="9876543210"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 ${suErrors.phone ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-[#3949AB]'}`}
                  />
                </div>
                {suErrors.phone && <p className="text-[11px] text-rose-600 font-medium mt-1">{suErrors.phone}</p>}
              </div>

              {/* Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Area / Locality / City <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${suErrors.area ? 'text-rose-500' : 'text-slate-400'}`} />
                  <input
                    type="text"
                    autoComplete="street-address"
                    value={suArea}
                    onChange={(e) => { setSuArea(e.target.value); setSuErrors((p) => ({...p, area: undefined})); }}
                    placeholder="e.g. Andheri West, Mumbai"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 ${suErrors.area ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-[#3949AB]'}`}
                  />
                </div>
                {suErrors.area && <p className="text-[11px] text-rose-600 font-medium mt-1">{suErrors.area}</p>}
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">I am a</label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { v: 'buyer', l: 'Buyer' },
                    { v: 'tenant', l: 'Tenant' },
                    { v: 'owner', l: 'Owner' },
                  ] as { v: UserRole; l: string }[]).map((r) => (
                    <button
                      type="button"
                      key={r.v}
                      onClick={() => setSuRole(r.v)}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        suRole === r.v
                          ? 'bg-[#3949AB] text-white border-[#3949AB] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-[#3949AB]'
                      }`}
                    >
                      {r.l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${suErrors.password ? 'text-rose-500' : 'text-slate-400'}`} />
                  <input
                    type={suShowPw ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={suPassword}
                    onChange={(e) => { setSuPassword(e.target.value); setSuErrors((p) => ({...p, password: undefined})); }}
                    placeholder="Min. 6 characters"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 ${suErrors.password ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-[#3949AB]'}`}
                  />
                  <button
                    type="button"
                    aria-label={suShowPw ? 'Hide password' : 'Show password'}
                    onClick={() => setSuShowPw((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                  >
                    {suShowPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {suPassword && (
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full ${pwStrength.color} transition-all`} style={{ width: `${(pwStrength.score / 4) * 100}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">{pwStrength.label}</span>
                  </div>
                )}
                {suErrors.password && <p className="text-[11px] text-rose-600 font-medium mt-1">{suErrors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${suErrors.confirm ? 'text-rose-500' : 'text-slate-400'}`} />
                  <input
                    type={suShowPw ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={suConfirm}
                    onChange={(e) => { setSuConfirm(e.target.value); setSuErrors((p) => ({...p, confirm: undefined})); }}
                    placeholder="Re-enter your password"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 ${suErrors.confirm ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-[#3949AB]'}`}
                  />
                </div>
                {suConfirm && suPassword && suConfirm === suPassword && !suErrors.confirm && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Passwords match
                  </p>
                )}
                {suErrors.confirm && <p className="text-[11px] text-rose-600 font-medium mt-1">{suErrors.confirm}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 rounded-2xl bg-[#F4A62A] hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md shadow-amber-400/25 flex items-center justify-center gap-2 transition active:scale-[0.98] disabled:opacity-60 mt-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{submitting ? 'Creating account...' : 'Create Account'}</span>
              </button>

              <p className="text-center text-[11px] text-slate-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setSuErrors({}); }}
                  className="text-[#3949AB] font-bold hover:underline"
                >
                  Sign in instead
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
