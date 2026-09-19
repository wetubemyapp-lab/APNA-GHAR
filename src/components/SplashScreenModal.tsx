import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ApnaGharLogo } from './ApnaGharLogo';
import { Sparkles, ShieldCheck, ArrowRight, RotateCcw, UserCheck, UserPlus } from 'lucide-react';

export const SplashScreenModal: React.FC = () => {
  const { 
    isSplashScreenVisible, 
    setIsSplashScreenVisible, 
    setIsOnboardingModalOpen,
    setActiveTab,
    showToast
  } = useApp();

  const [progress, setProgress] = useState(0);
  const [simulationMode, setSimulationMode] = useState<'auto' | 'first_launch' | 'returning_user'>('auto');

  useEffect(() => {
    if (!isSplashScreenVisible) {
      setProgress(0);
      return;
    }

    // Smooth subtle loading animation over ~1.3 seconds (1300ms)
    const startTime = Date.now();
    const duration = 1350; // 1.35s duration (within 1–1.5 seconds)

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(calculatedProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        
        // Check first launch vs returning user
        const hasLaunchedBefore = localStorage.getItem('apnaghar_has_launched_before');

        if (simulationMode === 'first_launch' || (simulationMode === 'auto' && !hasLaunchedBefore)) {
          // First launch → Transition to Onboarding
          localStorage.setItem('apnaghar_has_launched_before', 'true');
          setIsSplashScreenVisible(false);
          setIsOnboardingModalOpen(true);
          showToast('First launch detected: Welcome to Apna Ghar Onboarding!', 'info');
        } else {
          // Returning user → Transition to Home Screen
          setIsSplashScreenVisible(false);
          setActiveTab('home');
          showToast('Welcome back to Apna Ghar!', 'success');
        }
      }
    }, 40);

    return () => {
      clearInterval(interval);
    };
  }, [isSplashScreenVisible, simulationMode, setIsSplashScreenVisible, setIsOnboardingModalOpen, setActiveTab, showToast]);

  if (!isSplashScreenVisible) return null;

  const isFirstLaunch = !localStorage.getItem('apnaghar_has_launched_before');

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-gradient-to-br from-[#0B1120] via-[#1E1B4B] to-[#0F172A] text-white animate-in fade-in duration-300">
      
      {/* Top Auspicious Badges */}
      <div className="w-full flex justify-between items-center text-xs text-blue-300/70 pt-3">
        <span className="font-mono text-[11px] bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
          Android M3 • v3.4.0
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% RERA Verified
        </span>
      </div>

      {/* Center Brand Identity */}
      <div className="flex flex-col items-center text-center space-y-5 max-w-sm">
        
        {/* Original App Logo with subtle glow and breathing animation */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-red-600 via-amber-500 to-red-500 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition duration-500 animate-pulse"></div>
          <div className="relative p-6 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col items-center">
            <ApnaGharLogo size="xl" variant="white" showTagline={true} />
          </div>
        </div>
        
        {/* App Name & Localized Tagline */}
        <div className="space-y-1.5">
          <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
            Bharat ka sabse vishwasniya Real Estate Platform
          </p>
          <p className="text-[11px] text-amber-300/90 font-mono tracking-wide">
            Buy • Rent • PG • Verified Builder Projects
          </p>
        </div>

        {/* Subtle Material 3 Loading Animation */}
        <div className="w-64 space-y-2 pt-2">
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-white/10 relative">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-amber-400 to-amber-500 rounded-full transition-all duration-75 ease-out shadow-sm shadow-amber-400/50"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
              Loading assets...
            </span>
            <span>{progress}%</span>
          </div>
        </div>

      </div>

      {/* Bottom Routing Simulation & Skip Controls */}
      <div className="w-full max-w-xs space-y-2.5 pb-4">
        
        <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Next Destination:</span>
          <span className="font-bold text-amber-300 flex items-center gap-1">
            {simulationMode === 'first_launch' || (simulationMode === 'auto' && isFirstLaunch) 
              ? 'Onboarding Screen (First Launch)' 
              : 'Home Screen (Returning User)'}
          </span>
        </div>

        {/* Test Mode Switchers */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              localStorage.removeItem('apnaghar_has_launched_before');
              setSimulationMode('first_launch');
              showToast('Set to simulate: First Launch (→ Onboarding)', 'info');
            }}
            className="px-2.5 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 border border-blue-500/30 text-[10px] font-semibold text-blue-200 flex items-center justify-center gap-1 transition"
          >
            <UserPlus className="w-3 h-3 text-amber-400" />
            <span>Test 1st Launch</span>
          </button>

          <button
            onClick={() => {
              localStorage.setItem('apnaghar_has_launched_before', 'true');
              setSimulationMode('returning_user');
              showToast('Set to simulate: Returning User (→ Home)', 'info');
            }}
            className="px-2.5 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 border border-blue-500/30 text-[10px] font-semibold text-blue-200 flex items-center justify-center gap-1 transition"
          >
            <UserCheck className="w-3 h-3 text-emerald-400" />
            <span>Test Returning</span>
          </button>
        </div>

        {/* Instant Skip Button */}
        <button
          onClick={() => {
            const hasLaunchedBefore = localStorage.getItem('apnaghar_has_launched_before');
            setIsSplashScreenVisible(false);
            if (!hasLaunchedBefore) {
              localStorage.setItem('apnaghar_has_launched_before', 'true');
              setIsOnboardingModalOpen(true);
            } else {
              setActiveTab('home');
            }
          }}
          className="w-full py-2 text-[11px] text-slate-400 hover:text-white font-medium transition flex items-center justify-center gap-1"
        >
          <span>Skip Splash Screen</span>
          <ArrowRight className="w-3 h-3" />
        </button>

      </div>

    </div>
  );
};
