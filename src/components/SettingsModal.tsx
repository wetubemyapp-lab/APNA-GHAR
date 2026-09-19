import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Settings, 
  Bell, 
  Moon, 
  Globe, 
  ShieldCheck, 
  Smartphone, 
  Database, 
  Trash2, 
  CheckCircle2,
  Lock,
  Zap
} from 'lucide-react';
import { Language } from '../types';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { language, setLanguage, deviceMode, toggleDeviceMode, showToast } = useApp();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const clearAppData = () => {
    localStorage.clear();
    showToast('App cache and local storage cleared', 'info');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[88vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">App Settings</h3>
              <p className="text-xs text-slate-500">Preferences, Display & Privacy Controls</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
          
          {/* Language Selection */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-blue-600" /> Language / भाषा
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'en', label: 'English (India)' },
                { id: 'hi', label: 'हिन्दी (Hindi)' },
                { id: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
                { id: 'te', label: 'తెలుగు (Telugu)' }
              ].map(lang => (
                <button
                  key={lang.id}
                  onClick={() => {
                    setLanguage(lang.id as Language);
                    showToast(`Language set to ${lang.label}`, 'success');
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                    language === lang.id 
                      ? 'border-blue-600 bg-blue-50 text-blue-700' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{lang.label}</span>
                  {language === lang.id && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Device Frame View Toggle */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-indigo-600" />
              <div>
                <h5 className="text-xs font-bold text-slate-900">Android Pixel Frame Simulator</h5>
                <p className="text-[11px] text-slate-500">Toggle between Android phone frame and full responsive view</p>
              </div>
            </div>
            <button
              onClick={toggleDeviceMode}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                deviceMode === 'android_frame' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {deviceMode === 'android_frame' ? 'Phone Frame' : 'Full Screen'}
            </button>
          </div>

          {/* Notifications Toggles */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-amber-500" /> Push & Communication Alerts
            </h4>

            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-xs font-bold text-slate-800">Price Drop & New Match Alerts</p>
                <p className="text-[11px] text-slate-500">Instant notification when a shortlisted property price falls</p>
              </div>
              <input 
                type="checkbox" 
                checked={notificationsEnabled} 
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between py-1 border-t border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-800">WhatsApp Inspection Updates</p>
                <p className="text-[11px] text-slate-500">Receive free cab driver details and OTP directly on WhatsApp</p>
              </div>
              <input 
                type="checkbox" 
                checked={whatsappAlerts} 
                onChange={(e) => setWhatsappAlerts(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </div>
          </div>

          {/* Storage & Clear Cache */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-slate-500" />
              <div>
                <h5 className="text-xs font-bold text-slate-900">Reset Local Storage & Offline Cache</h5>
                <p className="text-[11px] text-slate-500">Restore mock data and initial settings</p>
              </div>
            </div>
            <button
              onClick={clearAppData}
              className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-700 font-bold text-xs flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
