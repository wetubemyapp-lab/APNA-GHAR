import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CITIES_LIST } from '../data/mockData';
import { 
  X, 
  Settings, 
  Bell, 
  MapPin, 
  Globe, 
  IndianRupee, 
  Search, 
  ShieldCheck, 
  UserCheck, 
  Smartphone, 
  Database, 
  Trash2, 
  CheckCircle2,
  ChevronRight,
  Lock,
  LogOut,
  AlertTriangle
} from 'lucide-react';
import { Language } from '../types';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { 
    language, 
    setLanguage, 
    deviceMode, 
    toggleDeviceMode, 
    showToast, 
    selectedCity, 
    setSelectedCity,
    currentUser,
    filterState,
    setFilterState
  } = useApp();

  // Settings state with standard Android switches
  const [notifications, setNotifications] = useState({
    push: true,
    priceDrop: true,
    whatsapp: true,
    visitReminder: true
  });

  const [locationSettings, setLocationSettings] = useState({
    autoGps: true,
    radiusKm: 15
  });

  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'AED'>('INR');

  const [searchPrefs, setSearchPrefs] = useState({
    defaultPurpose: 'buy' as 'buy' | 'rent' | 'pg',
    defaultType: 'apartment',
    recentlyAddedDefault: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    hidePhone: true,
    anonymousMode: false,
    analyticsSharing: true
  });

  const clearAppData = () => {
    localStorage.clear();
    showToast('App cache and local storage cleared', 'info');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  // Reusable Android Switch Component
  const AndroidSwitch = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <div 
      onClick={() => onChange(!checked)}
      className="relative inline-flex items-center cursor-pointer select-none"
    >
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)} 
        className="sr-only peer" 
      />
      <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-[#3949AB]' : 'bg-slate-300'}`}>
        <div className={`absolute top-[2px] left-[2px] bg-white border border-slate-200 rounded-full h-5 w-5 transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'} shadow-sm flex items-center justify-center`}>
          {checked && <div className="w-1.5 h-1.5 rounded-full bg-[#3949AB]" />}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[88vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative">
        
        {/* Android Material 3 Top App Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3949AB] text-white flex items-center justify-center shadow-md shadow-[#3949AB]/20">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">25. Settings</h3>
              <p className="text-[11px] text-slate-500">Android System Preferences & Privacy Controls</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 no-scrollbar">

          {/* 1. NOTIFICATIONS */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <div className="p-1.5 rounded-xl bg-amber-100 text-amber-700">
                <Bell className="w-4 h-4" />
              </div>
              <span>1. Notifications</span>
            </div>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">Push Notifications</span>
                  <span className="text-[10px] text-slate-500">In-app alerts for price drops & matches</span>
                </div>
                <AndroidSwitch 
                  checked={notifications.push} 
                  onChange={(v) => {
                    setNotifications(prev => ({ ...prev, push: v }));
                    showToast(`Push notifications ${v ? 'enabled' : 'disabled'}`, 'info');
                  }} 
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">Price Drop & Lead Alerts</span>
                  <span className="text-[10px] text-slate-500">Instant updates when saved properties drop price</span>
                </div>
                <AndroidSwitch 
                  checked={notifications.priceDrop} 
                  onChange={(v) => setNotifications(prev => ({ ...prev, priceDrop: v }))} 
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">WhatsApp Inspection Updates</span>
                  <span className="text-[10px] text-slate-500">Receive free driver cabs and OTP on WhatsApp</span>
                </div>
                <AndroidSwitch 
                  checked={notifications.whatsapp} 
                  onChange={(v) => setNotifications(prev => ({ ...prev, whatsapp: v }))} 
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">Site Visit Reminders</span>
                  <span className="text-[10px] text-slate-500">Automated SMS/push reminders 2 hours before visits</span>
                </div>
                <AndroidSwitch 
                  checked={notifications.visitReminder} 
                  onChange={(v) => setNotifications(prev => ({ ...prev, visitReminder: v }))} 
                />
              </div>
            </div>
          </div>

          {/* 2. LOCATION */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <div className="p-1.5 rounded-xl bg-blue-100 text-blue-700">
                <MapPin className="w-4 h-4" />
              </div>
              <span>2. Location Preferences</span>
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">GPS Auto-Detect Location</span>
                  <span className="text-[10px] text-slate-500">Automatically filter properties near current coordinates</span>
                </div>
                <AndroidSwitch 
                  checked={locationSettings.autoGps} 
                  onChange={(v) => {
                    setLocationSettings(prev => ({ ...prev, autoGps: v }));
                    showToast(v ? 'GPS Auto-detect active' : 'Manual city selection active', 'info');
                  }} 
                />
              </div>

              <div className="border-t border-slate-100 pt-2.5">
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Active City / Region</label>
                <select
                  value={selectedCity.id}
                  onChange={(e) => {
                    const c = CITIES_LIST.find((city: { id: string }) => city.id === e.target.value);
                    if (c) {
                      setSelectedCity(c as any);
                      showToast(`City changed to ${c.name}`, 'success');
                    }
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3949AB]"
                >
                  {CITIES_LIST.map((c: { id: string; name: string; state: string }) => (
                    <option key={c.id} value={c.id}>{c.name} ({c.state})</option>
                  ))}
                </select>
              </div>

              <div className="border-t border-slate-100 pt-2.5">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">Search Radius Distance</span>
                  <span className="font-bold text-[#3949AB]">{locationSettings.radiusKm} km</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="50" 
                  step="5"
                  value={locationSettings.radiusKm}
                  onChange={(e) => setLocationSettings(prev => ({ ...prev, radiusKm: Number(e.target.value) }))}
                  className="w-full accent-[#3949AB] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 3. LANGUAGE */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <div className="p-1.5 rounded-xl bg-purple-100 text-purple-700">
                <Globe className="w-4 h-4" />
              </div>
              <span>3. Language</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { id: 'en', label: 'English (India)' },
                { id: 'hi', label: 'हिन्दी (Hindi)' },
                { id: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
                { id: 'te', label: 'తెలుగు (Telugu)' },
                { id: 'ta', label: 'தமிழ் (Tamil)' },
                { id: 'mr', label: 'मराठी (Marathi)' }
              ].map(lang => (
                <button
                  key={lang.id}
                  onClick={() => {
                    setLanguage(lang.id as Language);
                    showToast(`Language set to ${lang.label}`, 'success');
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                    language === lang.id 
                      ? 'border-[#3949AB] bg-indigo-50/70 text-[#3949AB]' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{lang.label}</span>
                  {language === lang.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#3949AB]" />}
                </button>
              ))}
            </div>
          </div>

          {/* 4. CURRENCY */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <div className="p-1.5 rounded-xl bg-emerald-100 text-emerald-700">
                <IndianRupee className="w-4 h-4" />
              </div>
              <span>4. Currency</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { id: 'INR', label: 'Indian Rupee (₹)', symbol: '₹' },
                { id: 'USD', label: 'US Dollar ($)', symbol: '$' },
                { id: 'EUR', label: 'Euro (€)', symbol: '€' },
                { id: 'AED', label: 'UAE Dirham (AED)', symbol: 'AED' }
              ].map(curr => (
                <button
                  key={curr.id}
                  onClick={() => {
                    setCurrency(curr.id as any);
                    showToast(`Display currency set to ${curr.id}`, 'info');
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                    currency === curr.id 
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{curr.label}</span>
                  {currency === curr.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* 5. SEARCH PREFERENCES */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <div className="p-1.5 rounded-xl bg-rose-100 text-rose-700">
                <Search className="w-4 h-4" />
              </div>
              <span>5. Search Preferences</span>
            </div>

            <div className="space-y-2.5 pt-1 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Default Purpose</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['buy', 'rent', 'pg'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setSearchPrefs(prev => ({ ...prev, defaultPurpose: p }))}
                      className={`py-1.5 rounded-xl border font-bold capitalize transition ${
                        searchPrefs.defaultPurpose === p 
                          ? 'border-[#3949AB] bg-indigo-50 text-[#3949AB]' 
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      {p === 'buy' ? 'Buy' : p === 'rent' ? 'Rent' : 'PG / Co-Living'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-2 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 block">Default Recently Added Filter</span>
                  <span className="text-[10px] text-slate-500">Show newly added listings first</span>
                </div>
                <AndroidSwitch 
                  checked={searchPrefs.recentlyAddedDefault} 
                  onChange={(v) => setSearchPrefs(prev => ({ ...prev, recentlyAddedDefault: v }))} 
                />
              </div>
            </div>
          </div>

          {/* 6. PRIVACY */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <div className="p-1.5 rounded-xl bg-indigo-100 text-indigo-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>6. Privacy Controls</span>
            </div>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">Hide Phone Number</span>
                  <span className="text-[10px] text-slate-500">Mask phone number until callback requested</span>
                </div>
                <AndroidSwitch 
                  checked={privacySettings.hidePhone} 
                  onChange={(v) => setPrivacySettings(prev => ({ ...prev, hidePhone: v }))} 
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">Incognito Property Browsing</span>
                  <span className="text-[10px] text-slate-500">Do not save search history in user profile</span>
                </div>
                <AndroidSwitch 
                  checked={privacySettings.anonymousMode} 
                  onChange={(v) => setPrivacySettings(prev => ({ ...prev, anonymousMode: v }))} 
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">Personalized Recommendation Analytics</span>
                  <span className="text-[10px] text-slate-500">Allow AI matching based on saved properties</span>
                </div>
                <AndroidSwitch 
                  checked={privacySettings.analyticsSharing} 
                  onChange={(v) => setPrivacySettings(prev => ({ ...prev, analyticsSharing: v }))} 
                />
              </div>
            </div>
          </div>

          {/* 7. ACCOUNT SETTINGS */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <div className="p-1.5 rounded-xl bg-cyan-100 text-cyan-700">
                <UserCheck className="w-4 h-4" />
              </div>
              <span>7. Account Settings</span>
            </div>

            <div className="space-y-2 pt-1">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-900">{currentUser.name}</h5>
                  <p className="text-[11px] text-slate-500">{currentUser.email} • {currentUser.phone}</p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                  {currentUser.role}
                </span>
              </div>

              <button
                onClick={() => showToast('Password reset link sent to your registered email', 'info')}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-between transition"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Change Password</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Android Frame & System Tools */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-[#3949AB]" />
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Android Frame Simulator</h5>
                  <p className="text-[10px] text-slate-500">Toggle Google Pixel Android preview wrapper</p>
                </div>
              </div>
              <button
                onClick={toggleDeviceMode}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                  deviceMode === 'android_frame' 
                    ? 'bg-[#3949AB] text-white' 
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {deviceMode === 'android_frame' ? 'Phone Mode' : 'Full Window'}
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200/60 pt-2.5">
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-slate-500" />
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Reset Local Storage & App State</h5>
                  <p className="text-[10px] text-slate-500">Clear cache and restore original mock data</p>
                </div>
              </div>
              <button
                onClick={clearAppData}
                className="px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs flex items-center gap-1 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
