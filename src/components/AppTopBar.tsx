import React from 'react';
import { useApp } from '../context/AppContext';
import { ApnaGharLogo } from './ApnaGharLogo';
import { 
  MapPin, 
  ChevronDown, 
  Bell, 
  Smartphone, 
  Monitor, 
  Code2, 
  SlidersHorizontal,
  Plus,
  Layers,
  User
} from 'lucide-react';

interface AppTopBarProps {
  className?: string;
}

export const AppTopBar: React.FC<AppTopBarProps> = ({ className = '' }) => {
  const { 
    selectedCity, 
    setIsCityModalOpen, 
    unreadNotificationsCount, 
    setIsNotificationCenterOpen,
    deviceMode, 
    toggleDeviceMode, 
    setIsComposeInspectorOpen, 
    setIsScreenInventoryOpen,
    activeTab, 
    setActiveTab,
    setIsFilterBottomSheetOpen, 
    activeFilterCount, 
    setIsPostPropertyModalOpen, 
    language, 
    setLanguage,
    currentUser,
    setIsAuthModalOpen
  } = useApp();

  return (
    <header className={`sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-4 py-2.5 transition-all ${className}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Left: Apna Ghar Brand & City Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ApnaGharLogo size="sm" />

          {/* City Selector Pill */}
          <button
            onClick={() => setIsCityModalOpen(true)}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-semibold tracking-tight transition-all active:scale-95"
            title="Change City"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="max-w-[75px] sm:max-w-none truncate">{selectedCity.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-500 shrink-0" />
          </button>
        </div>

        {/* Right: Quick Tools */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Post Property Quick CTA */}
          <button
            onClick={() => setIsPostPropertyModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Property</span>
            <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-1.5 py-0.2 rounded-full">FREE</span>
          </button>

          {/* Filter button (visible in search) */}
          {activeTab === 'search' && (
            <button
              onClick={() => setIsFilterBottomSheetOpen(true)}
              className="relative p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-all active:scale-95"
              title="Filters"
            >
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              {activeFilterCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          )}

          {/* Master 30 Screen Inventory Catalog Trigger */}
          <button
            onClick={() => setIsScreenInventoryOpen(true)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300/80 transition-all active:scale-95 flex items-center gap-1"
            title="Open Master 30 Screen Inventory"
          >
            <Layers className="w-4 h-4 text-amber-600" />
            <span className="hidden md:inline">30 Screens</span>
          </button>

          {/* Compose Code Inspector Modal Trigger */}
          <button
            onClick={() => setIsComposeInspectorOpen(true)}
            className="hidden xs:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200/60 transition-all active:scale-95"
            title="View Jetpack Compose Kotlin Source"
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden md:inline">Compose</span>
          </button>

          {/* Android Device Frame Toggle */}
          <button
            onClick={toggleDeviceMode}
            className="p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all active:scale-95"
            title={deviceMode === 'android_frame' ? 'Switch to Full Screen View' : 'Switch to Android Pixel Frame View'}
          >
            {deviceMode === 'android_frame' ? (
              <Monitor className="w-4 h-4 text-emerald-600" />
            ) : (
              <Smartphone className="w-4 h-4 text-blue-600" />
            )}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="px-2 py-1 rounded-md text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
            title="Toggle Language"
          >
            {language === 'en' ? 'हिन्दी' : 'ENG'}
          </button>

          {/* Notification Center Trigger */}
          <button
            onClick={() => setIsNotificationCenterOpen(true)}
            className="relative p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-all active:scale-95"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse ring-2 ring-white"></span>
            )}
          </button>

          {/* Profile / Account Icon Trigger */}
          <button
            onClick={() => {
              if (currentUser && currentUser.id) {
                setActiveTab('account');
              } else {
                setIsAuthModalOpen(true);
              }
            }}
            className="p-1 sm:p-1.5 rounded-full text-slate-700 hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center border border-slate-200 bg-slate-50"
            title={currentUser && currentUser.name ? `Account (${currentUser.name})` : "Sign In / Profile"}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-[10px] flex items-center justify-center uppercase shadow-xs">
              {currentUser && currentUser.name ? currentUser.name.slice(0, 2) : <User className="w-3.5 h-3.5" />}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
