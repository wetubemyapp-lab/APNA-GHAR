import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavigationBar } from './components/BottomNavigationBar';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { ShortlistScreen } from './components/ShortlistScreen';
import { MessagesScreen } from './components/MessagesScreen';
import { AccountScreen } from './components/AccountScreen';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { PostPropertyModal } from './components/PostPropertyModal';
import { CitySelectorModal } from './components/CitySelectorModal';
import { FilterBottomSheet } from './components/FilterBottomSheet';
import { ComposeInspectorModal } from './components/ComposeInspectorModal';
import { CompareModal } from './components/CompareModal';
import { AuthModal } from './components/AuthModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { LocalityDetailModal } from './components/LocalityDetailModal';
import { ContactEnquiryModal } from './components/ContactEnquiryModal';
import { ManageListingModal } from './components/ManageListingModal';
import { MyListingsModal } from './components/MyListingsModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { SplashScreenModal } from './components/SplashScreenModal';
import { OnboardingModal } from './components/OnboardingModal';
import { SettingsModal } from './components/SettingsModal';
import { HelpSupportModal } from './components/HelpSupportModal';
import { AboutLegalModal } from './components/AboutLegalModal';
import { ScreenInventoryModal } from './components/ScreenInventoryModal';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Info, 
  CheckCircle2, 
  AlertCircle,
  X,
  Layers,
  WifiOff
} from 'lucide-react';

const MainApp: React.FC = () => {
  const {
    activeTab,
    deviceMode,
    selectedProperty,
    setSelectedProperty,
    scheduleVisitProperty,
    setScheduleVisitProperty,
    isPostPropertyModalOpen,
    setIsPostPropertyModalOpen,
    isMyListingsModalOpen,
    setIsMyListingsModalOpen,
    isCityModalOpen,
    setIsCityModalOpen,
    isFilterBottomSheetOpen,
    setIsFilterBottomSheetOpen,
    isComposeInspectorOpen,
    setIsComposeInspectorOpen,
    isCompareModalOpen,
    setIsCompareModalOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    selectedProject,
    setSelectedProject,
    isProjectModalOpen,
    setIsProjectModalOpen,
    selectedLocality,
    setSelectedLocality,
    isLocalityModalOpen,
    setIsLocalityModalOpen,
    isEnquiryModalOpen,
    setIsEnquiryModalOpen,
    enquiryProperty,
    isManageListingModalOpen,
    setIsManageListingModalOpen,
    managingProperty,
    isEditListingModalOpen,
    setIsEditListingModalOpen,
    editingProperty,
    isNotificationCenterOpen,
    setIsNotificationCenterOpen,
    isOnboardingModalOpen,
    setIsOnboardingModalOpen,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    isHelpSupportModalOpen,
    setIsHelpSupportModalOpen,
    isAboutModalOpen,
    setIsAboutModalOpen,
    isScreenInventoryOpen,
    setIsScreenInventoryOpen,
    isOfflineMode,
    setIsOfflineMode,
    toast,
    showToast
  } = useApp();

  return (
    <div className={`min-h-screen bg-[#E5E9F0] text-slate-900 font-sans antialiased selection:bg-[#2563EB] selection:text-white ${
      deviceMode === 'android_frame' ? 'py-2 sm:py-6 px-2 sm:px-4 flex justify-center items-center' : ''
    }`}>

      {/* Floating Screen Inventory Launcher Trigger (Top Right) */}
      <div className="fixed top-3 right-3 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsScreenInventoryOpen(true)}
          className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 hover:from-slate-800 hover:to-indigo-900 text-white font-bold text-xs shadow-xl border border-indigo-500/30 flex items-center gap-2 transition transform active:scale-95"
          title="Open Master 30-Screen Inventory"
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">30 Screens</span>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold">
            Catalog
          </span>
        </button>
      </div>

      {/* Android Device Presentation Frame Wrapper */}
      <div className={`w-full transition-all duration-300 ${
        deviceMode === 'android_frame' 
          ? 'max-w-[430px] h-[920px] max-h-[96vh] bg-white rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border-[9px] border-slate-900 overflow-hidden flex flex-col relative'
          : 'flex flex-col min-h-screen bg-slate-50'
      }`}>

        {/* Android Simulated Status Bar */}
        {deviceMode === 'android_frame' && (
          <div className="bg-white px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-bold text-slate-900 shrink-0 select-none z-30">
            <span>09:41</span>
            {/* Camera Punchhole */}
            <div className="w-3.5 h-3.5 rounded-full bg-black -mt-1 shadow-inner"></div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5 fill-slate-800" />
            </div>
          </div>
        )}

        {/* Offline Banner (Screen 30: Error / Offline State simulation) */}
        {isOfflineMode && (
          <div className="bg-amber-600 text-white px-4 py-1.5 flex items-center justify-between text-xs font-semibold z-30 shrink-0">
            <div className="flex items-center gap-2">
              <WifiOff className="w-3.5 h-3.5" />
              <span>Offline Mode: Showing cached properties</span>
            </div>
            <button 
              onClick={() => {
                setIsOfflineMode(false);
                showToast('Back online! Syncing live prices...', 'success');
              }}
              className="px-2 py-0.5 rounded bg-white text-amber-900 font-bold text-[10px]"
            >
              Reconnect
            </button>
          </div>
        )}

        {/* Top Material 3 App Bar */}
        <TopAppBar />

        {/* Dynamic Screen View Content with smooth scroll container */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          {activeTab === 'home' && <HomeScreen />}
          {activeTab === 'search' && <SearchScreen />}
          {activeTab === 'shortlist' && <ShortlistScreen />}
          {activeTab === 'messages' && <MessagesScreen />}
          {activeTab === 'account' && <AccountScreen />}
        </main>

        {/* Bottom Material 3 Navigation Bar */}
        <BottomNavigationBar />

        {/* Android Gesture Bar Pill */}
        {deviceMode === 'android_frame' && (
          <div className="absolute bottom-1 left-0 right-0 flex justify-center pointer-events-none z-50">
            <div className="w-32 h-1 rounded-full bg-slate-900/60"></div>
          </div>
        )}

      </div>

      {/* GLOBAL MODALS, BOTTOM SHEETS & SCREEN DIALOGS */}

      {/* Screen 01: Splash Screen */}
      <SplashScreenModal />

      {/* Screen 02: Onboarding & Location Permission */}
      {isOnboardingModalOpen && (
        <OnboardingModal 
          onClose={() => setIsOnboardingModalOpen(false)} 
        />
      )}

      {/* Screen 04: City Selector Modal */}
      {isCityModalOpen && (
        <CitySelectorModal 
          onClose={() => setIsCityModalOpen(false)} 
        />
      )}

      {/* Screen 07: Filter Bottom Sheet */}
      {isFilterBottomSheetOpen && (
        <FilterBottomSheet 
          onClose={() => setIsFilterBottomSheetOpen(false)} 
        />
      )}

      {/* Screen 08: Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}

      {/* Screen 09: Project Detail Modal */}
      {isProjectModalOpen && selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setIsProjectModalOpen(false)} 
        />
      )}

      {/* Screen 10: Locality Detail Modal */}
      {isLocalityModalOpen && selectedLocality && (
        <LocalityDetailModal 
          locality={selectedLocality} 
          onClose={() => setIsLocalityModalOpen(false)} 
        />
      )}

      {/* Screen 12: Compare Properties Modal */}
      {isCompareModalOpen && (
        <CompareModal 
          onClose={() => setIsCompareModalOpen(false)} 
        />
      )}

      {/* Screen 14: Contact / Enquiry Modal */}
      {isEnquiryModalOpen && enquiryProperty && (
        <ContactEnquiryModal 
          property={enquiryProperty} 
          onClose={() => setIsEnquiryModalOpen(false)} 
        />
      )}

      {/* Screen 15: Schedule Visit / Request Callback Modal */}
      {scheduleVisitProperty && (
        <ScheduleVisitModal 
          property={scheduleVisitProperty} 
          onClose={() => setScheduleVisitProperty(null)} 
        />
      )}

      {/* Screens 16, 17, 18: Authentication (Login, Register, OTP Verification) */}
      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      )}

      {/* Screen 19 & Screen 22: Post / Edit Property Modal */}
      {(isPostPropertyModalOpen || (isEditListingModalOpen && editingProperty)) && (
        <PostPropertyModal 
          initialProperty={editingProperty}
          onClose={() => {
            setIsPostPropertyModalOpen(false);
            setIsEditListingModalOpen(false);
          }} 
        />
      )}

      {/* Screen 20: My Listings Modal */}
      {isMyListingsModalOpen && (
        <MyListingsModal 
          onClose={() => setIsMyListingsModalOpen(false)} 
        />
      )}

      {/* Screen 21: Listing Detail / Manage Listing */}
      {isManageListingModalOpen && managingProperty && (
        <ManageListingModal 
          property={managingProperty} 
          mode="manage"
          onClose={() => setIsManageListingModalOpen(false)} 
        />
      )}

      {/* Screen 24: Notification Center */}
      {isNotificationCenterOpen && (
        <NotificationCenterModal 
          onClose={() => setIsNotificationCenterOpen(false)} 
        />
      )}

      {/* Screen 26: Settings Modal */}
      {isSettingsModalOpen && (
        <SettingsModal 
          onClose={() => setIsSettingsModalOpen(false)} 
        />
      )}

      {/* Screen 27: Help & Support Modal */}
      {isHelpSupportModalOpen && (
        <HelpSupportModal 
          onClose={() => setIsHelpSupportModalOpen(false)} 
        />
      )}

      {/* Screen 28: About / Terms / Privacy Modal */}
      {isAboutModalOpen && (
        <AboutLegalModal 
          onClose={() => setIsAboutModalOpen(false)} 
        />
      )}

      {/* Screen Inventory Catalog Modal (Quick Tester) */}
      {isScreenInventoryOpen && (
        <ScreenInventoryModal 
          onClose={() => setIsScreenInventoryOpen(false)} 
        />
      )}

      {/* Jetpack Compose Architecture Inspector */}
      {isComposeInspectorOpen && (
        <ComposeInspectorModal 
          onClose={() => setIsComposeInspectorOpen(false)} 
        />
      )}

      {/* Floating Material 3 Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold shadow-xl border border-slate-700/80 animate-in fade-in slide-in-from-top-4 duration-200">
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-amber-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
