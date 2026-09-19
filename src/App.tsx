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
    setIsHelpSupportModalOpen
  } = useApp();

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
