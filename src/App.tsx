import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavigationBar } from './components/BottomNavigationBar';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { ShortlistScreen } from './components/ShortlistScreen';
import { MessagesScreen } from './components/MessagesScreen';
import { AccountScreen } from './components/AccountScreen';
import { OfflineBanner } from './components/OfflineBanner';
import { SplashScreenModal } from './components/SplashScreenModal';
import { OnboardingModal } from './components/OnboardingModal';
import { useEffect, useState } from 'react';
import { CheckCircle2, Info, XCircle, X } from 'lucide-react';

const ToastHost: React.FC = () => {
  const { toast } = useApp();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (toast) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [toast]);
  if (!toast || !visible) return null;
  const color =
    toast.type === 'success'
      ? 'bg-emerald-600'
      : toast.type === 'error'
      ? 'bg-rose-600'
      : 'bg-slate-800';
  const Icon = toast.type === 'success' ? CheckCircle2 : toast.type === 'error' ? XCircle : Info;
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] max-w-[92vw] animate-in fade-in slide-in-from-bottom-4">
      <div className={`${color} text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-medium min-w-[200px] max-w-md`}>
        <Icon className="w-4 h-4 shrink-0" />
        <span className="flex-1 leading-snug">{toast.message}</span>
        <button
          aria-label="Dismiss notification"
          onClick={() => setVisible(false)}
          className="opacity-70 hover:opacity-100 p-1 -mr-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// Modals
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { LocalityDetailModal } from './components/LocalityDetailModal';
import { FilterBottomSheet } from './components/FilterBottomSheet';
import { PostPropertyModal } from './components/PostPropertyModal';
import { CitySelectorModal } from './components/CitySelectorModal';
import { AuthModal } from './components/AuthModal';
import { CompareModal } from './components/CompareModal';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { ContactEnquiryModal } from './components/ContactEnquiryModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { ScreenInventoryModal } from './components/ScreenInventoryModal';
import { ComposeInspectorModal } from './components/ComposeInspectorModal';
import { MyListingsModal } from './components/MyListingsModal';
import { ManageListingModal } from './components/ManageListingModal';
import { SettingsModal } from './components/SettingsModal';
import { AboutLegalModal } from './components/AboutLegalModal';
import { HelpSupportModal } from './components/HelpSupportModal';

const MainLayout: React.FC = () => {
  const { 
    activeTab, 
    deviceMode,
    selectedProperty,
    setSelectedProperty,
    selectedProject,
    setSelectedProject,
    selectedLocality,
    setSelectedLocality,
    isFilterBottomSheetOpen,
    setIsFilterBottomSheetOpen,
    isPostPropertyModalOpen,
    setIsPostPropertyModalOpen,
    isCityModalOpen,
    setIsCityModalOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isCompareModalOpen,
    setIsCompareModalOpen,
    isScheduleVisitModalOpen,
    setIsScheduleVisitModalOpen,
    scheduleVisitProperty,
    isEnquiryModalOpen,
    setIsEnquiryModalOpen,
    enquiryProperty,
    isNotificationCenterOpen,
    setIsNotificationCenterOpen,
    isScreenInventoryOpen,
    setIsScreenInventoryOpen,
    isComposeInspectorOpen,
    setIsComposeInspectorOpen,
    isMyListingsModalOpen,
    setIsMyListingsModalOpen,
    isManageListingModalOpen,
    setIsManageListingModalOpen,
    managingProperty,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    isAboutModalOpen,
    setIsAboutModalOpen,
    isHelpSupportModalOpen,
    setIsHelpSupportModalOpen,
    isSplashScreenVisible,
    setIsSplashScreenVisible,
    isOnboardingModalOpen,
    setIsOnboardingModalOpen,
  } = useApp();

  // First-launch: show splash screen if no record of prior launch
  useEffect(() => {
    const hasLaunched = localStorage.getItem('apnaghar_has_launched_before');
    if (!hasLaunched) {
      setIsSplashScreenVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Global ESC key back-navigation (closes top-most modal/view)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // Order matters from most-nested to least
      if (isComposeInspectorOpen) return setIsComposeInspectorOpen(false);
      if (isScreenInventoryOpen) return setIsScreenInventoryOpen(false);
      if (isHelpSupportModalOpen) return setIsHelpSupportModalOpen(false);
      if (isAboutModalOpen) return setIsAboutModalOpen(false);
      if (isSettingsModalOpen) return setIsSettingsModalOpen(false);
      if (isManageListingModalOpen) return setIsManageListingModalOpen(false);
      if (isMyListingsModalOpen) return setIsMyListingsModalOpen(false);
      if (isNotificationCenterOpen) return setIsNotificationCenterOpen(false);
      if (isEnquiryModalOpen) return setIsEnquiryModalOpen(false);
      if (isScheduleVisitModalOpen) return setIsScheduleVisitModalOpen(false);
      if (isCompareModalOpen) return setIsCompareModalOpen(false);
      if (isAuthModalOpen) return setIsAuthModalOpen(false);
      if (isCityModalOpen) return setIsCityModalOpen(false);
      if (isPostPropertyModalOpen) return setIsPostPropertyModalOpen(false);
      if (isFilterBottomSheetOpen) return setIsFilterBottomSheetOpen(false);
      if (selectedLocality) return setSelectedLocality(null);
      if (selectedProject) return setSelectedProject(null);
      if (selectedProperty) return setSelectedProperty(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [
    isComposeInspectorOpen, setIsComposeInspectorOpen,
    isScreenInventoryOpen, setIsScreenInventoryOpen,
    isHelpSupportModalOpen, setIsHelpSupportModalOpen,
    isAboutModalOpen, setIsAboutModalOpen,
    isSettingsModalOpen, setIsSettingsModalOpen,
    isManageListingModalOpen, setIsManageListingModalOpen,
    isMyListingsModalOpen, setIsMyListingsModalOpen,
    isNotificationCenterOpen, setIsNotificationCenterOpen,
    isEnquiryModalOpen, setIsEnquiryModalOpen,
    isScheduleVisitModalOpen, setIsScheduleVisitModalOpen,
    isCompareModalOpen, setIsCompareModalOpen,
    isAuthModalOpen, setIsAuthModalOpen,
    isCityModalOpen, setIsCityModalOpen,
    isPostPropertyModalOpen, setIsPostPropertyModalOpen,
    isFilterBottomSheetOpen, setIsFilterBottomSheetOpen,
    selectedLocality, setSelectedLocality,
    selectedProject, setSelectedProject,
    selectedProperty, setSelectedProperty,
  ]);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'search':
        return <SearchScreen />;
      case 'shortlist':
        return <ShortlistScreen />;
      case 'messages':
        return <MessagesScreen />;
      case 'account':
        return <AccountScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const content = (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 flex flex-col font-sans pb-20 selection:bg-blue-600 selection:text-white">
      <OfflineBanner />
      <TopAppBar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-4 py-4">
        {renderActiveScreen()}
      </main>

      <BottomNavigationBar />

      {/* Full Screen & Bottom Sheet Modals */}
      {selectedProperty && (
        <PropertyDetailModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
      {selectedLocality && (
        <LocalityDetailModal 
          locality={selectedLocality} 
          onClose={() => setSelectedLocality(null)} 
        />
      )}
      {isFilterBottomSheetOpen && (
        <FilterBottomSheet 
          onClose={() => setIsFilterBottomSheetOpen(false)} 
        />
      )}
      {isPostPropertyModalOpen && (
        <PostPropertyModal 
          onClose={() => setIsPostPropertyModalOpen(false)} 
        />
      )}
      {isCityModalOpen && (
        <CitySelectorModal 
          onClose={() => setIsCityModalOpen(false)} 
        />
      )}
      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      )}
      {isCompareModalOpen && (
        <CompareModal 
          onClose={() => setIsCompareModalOpen(false)} 
        />
      )}
      {isScheduleVisitModalOpen && scheduleVisitProperty && (
        <ScheduleVisitModal 
          property={scheduleVisitProperty} 
          onClose={() => setIsScheduleVisitModalOpen(false)} 
        />
      )}
      {isEnquiryModalOpen && enquiryProperty && (
        <ContactEnquiryModal 
          property={enquiryProperty} 
          onClose={() => setIsEnquiryModalOpen(false)} 
        />
      )}
      {isNotificationCenterOpen && (
        <NotificationCenterModal 
          onClose={() => setIsNotificationCenterOpen(false)} 
        />
      )}
      {isScreenInventoryOpen && (
        <ScreenInventoryModal 
          onClose={() => setIsScreenInventoryOpen(false)} 
        />
      )}
      {isComposeInspectorOpen && (
        <ComposeInspectorModal 
          onClose={() => setIsComposeInspectorOpen(false)} 
        />
      )}
      {isMyListingsModalOpen && (
        <MyListingsModal 
          onClose={() => setIsMyListingsModalOpen(false)} 
        />
      )}
      {isManageListingModalOpen && managingProperty && (
        <ManageListingModal 
          property={managingProperty} 
          onClose={() => setIsManageListingModalOpen(false)} 
        />
      )}
      {isSettingsModalOpen && (
        <SettingsModal 
          onClose={() => setIsSettingsModalOpen(false)} 
        />
      )}
      {isAboutModalOpen && (
        <AboutLegalModal 
          onClose={() => setIsAboutModalOpen(false)} 
        />
      )}
      {isHelpSupportModalOpen && (
        <HelpSupportModal 
          onClose={() => setIsHelpSupportModalOpen(false)} 
        />
      )}

      {/* Splash + Onboarding overlays */}
      <SplashScreenModal />
      {isOnboardingModalOpen && (
        <OnboardingModal onClose={() => setIsOnboardingModalOpen(false)} />
      )}

      {/* Global Toast */}
      <ToastHost />
    </div>
  );

  if (deviceMode === 'android_frame') {
    return (
      <div className="min-h-screen bg-slate-900 py-6 px-2 flex items-center justify-center overflow-auto">
        {/* Pixel Device Frame Simulation */}
        <div className="relative w-full max-w-[430px] h-[880px] bg-black rounded-[48px] p-3 shadow-2xl ring-1 ring-white/20 flex flex-col overflow-hidden">
          {/* Camera Punchhole */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 w-24 h-5 bg-black rounded-full flex items-center justify-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800"></div>
          </div>
          
          {/* Device Screen Content Container */}
          <div className="w-full h-full bg-[#F8F9FB] rounded-[38px] overflow-y-auto relative scrollbar-none">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
