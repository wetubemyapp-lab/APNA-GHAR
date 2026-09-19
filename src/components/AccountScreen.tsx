import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  PlusCircle, 
  Calendar, 
  Eye, 
  MessageSquare, 
  Trash2, 
  ShieldCheck, 
  MapPin, 
  SlidersHorizontal, 
  Code2, 
  Globe, 
  HelpCircle, 
  Building,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Settings,
  FileText,
  Lock,
  Layers,
  Edit3,
  LogOut,
  PhoneCall,
  WifiOff
} from 'lucide-react';

export const AccountScreen: React.FC = () => {
  const { 
    currentUser, 
    callbackRequests, 
    setIsPostPropertyModalOpen,
    setIsMyListingsModalOpen,
    setSelectedProperty,
    deleteProperty,
    selectedCity,
    setIsCityModalOpen,
    language,
    setLanguage,
    setIsComposeInspectorOpen,
    deviceMode,
    toggleDeviceMode,
    setIsSettingsModalOpen,
    setIsHelpSupportModalOpen,
    setIsAboutModalOpen,
    setIsScreenInventoryOpen,
    setIsAuthModalOpen,
    setAuthMode,
    setManagingProperty,
    setIsManageListingModalOpen,
    setEditingProperty,
    setIsEditListingModalOpen,
    isOfflineMode,
    setIsOfflineMode,
    handleLogout,
    showToast
  } = useApp();

  const userProperties = currentUser.postedProperties || [];
  const isLoggedIn = currentUser.isLoggedIn && currentUser.name && currentUser.name !== 'Guest User';
  const avatarSrc =
    currentUser.avatarUrl ||
    currentUser.avatar ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name || 'Guest')}&backgroundColor=3949ab,f4a62a&textColor=ffffff`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 pb-28 flex flex-col gap-5">
      
      {/* Profile Overview Card (Material 3 Surface Elevation) */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <img
            src={avatarSrc}
            alt={currentUser.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-600 shadow-sm bg-slate-100"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name || 'Guest')}`;
            }}
          />
          <div>
            {isLoggedIn ? (
              <>
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{currentUser.name}</h1>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-200">
                    {currentUser.role === 'owner' ? 'Owner' : currentUser.role === 'tenant' ? 'Tenant' : 'Verified Buyer'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{currentUser.email} • {currentUser.phone}</p>
                {currentUser.area && (
                  <p className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-center sm:justify-start gap-1">
                    <MapPin className="w-3 h-3" /> {currentUser.area}
                  </p>
                )}
                <p className="text-[11px] text-slate-400 mt-1">Member since {currentUser.joinedDate || 'recently'}</p>
              </>
            ) : (
              <>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Welcome, Guest</h1>
                <p className="text-xs text-slate-500 mt-0.5">Sign in to save properties, post listings & track enquiries.</p>
              </>
            )}
          </div>
        </div>

        {/* Auth / Profile Actions */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {!isLoggedIn ? (
            <button
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
              className="px-4 py-2 rounded-2xl bg-[#3949AB] hover:bg-indigo-800 text-white text-xs font-bold shadow-md shadow-[#3949AB]/20 transition"
            >
              Sign In / Sign Up
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          )}
          <button
            onClick={() => {
              if (!isLoggedIn) {
                setAuthMode('login');
                setIsAuthModalOpen(true);
                showToast('Please sign in to post a property', 'info');
                return;
              }
              setIsPostPropertyModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#F4A62A] hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-400/20 active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Listing</span>
          </button>
        </div>
      </div>

      {/* My Posted Properties Management (Screen 20: My Listings) */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-base text-slate-900">My Listings ({userProperties.length})</h2>
            <p className="text-xs text-slate-500">Track inquiries, view leads, and manage your live advertisements</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMyListingsModalOpen(true)}
              className="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100 transition"
            >
              View All Tabs
            </button>
            <button
              onClick={() => setIsPostPropertyModalOpen(true)}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              + Add New
            </button>
          </div>
        </div>

        {userProperties.length === 0 ? (
          <div className="text-center py-8 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Building className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-700">You have not posted any properties yet.</p>
            <p className="text-[11px] text-slate-500 max-w-xs mx-auto mt-1 mb-3">
              List your flat, house, plot, or commercial space for free to reach active buyers in {selectedCity.name}.
            </p>
            <button
              onClick={() => setIsPostPropertyModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs"
            >
              Post Free Listing
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {userProperties.map(prop => (
              <div 
                key={prop.id}
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img src={prop.images[0]} alt={prop.title} className="w-14 h-14 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-blue-600">{prop.priceDisplay}</span>
                    <h4 className="font-bold text-xs text-slate-900 truncate">{prop.title}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{prop.locality}, {prop.city}</p>
                  </div>
                </div>

                {/* Listing Analytics & Actions (Screens 21 & 22 Triggers) */}
                <div className="flex items-center gap-2 text-xs w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                  <button
                    onClick={() => {
                      setManagingProperty(prop);
                      setIsManageListingModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 flex items-center gap-1 text-[11px]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Manage (Screen 21)</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingProperty(prop);
                      setIsEditListingModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 flex items-center gap-1 text-[11px]"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit (Screen 22)</span>
                  </button>

                  <button
                    onClick={() => deleteProperty(prop.id)}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                    title="Delete listing"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scheduled Site Visits & Callbacks (Screen 15 Output) */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col gap-4">
        <div>
          <h2 className="font-extrabold text-base text-slate-900">My Scheduled Site Visits ({callbackRequests.length})</h2>
          <p className="text-xs text-slate-500">Upcoming appointments and free pickup cab confirmations</p>
        </div>

        {callbackRequests.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">No site visits scheduled yet.</p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {callbackRequests.map(req => (
              <div 
                key={req.id}
                className="p-3.5 rounded-2xl border border-emerald-100 bg-emerald-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold">
                      CONFIRMED APPOINTMENT
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 truncate mt-1">{req.propertyTitle}</h4>
                    <p className="text-[11px] text-slate-600">
                      <strong>Date & Time:</strong> {req.date} ({req.timeSlot})
                    </p>
                    {req.needCabPickup && (
                      <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                        🚗 Free Cab Pickup Assigned
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-blue-600 block">{req.propertyPrice}</span>
                  <span className="text-[10px] text-slate-500">{req.locality}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* App & System Settings Links (Screens 26, 27, 28) */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col gap-3">
        <h2 className="font-extrabold text-base text-slate-900">App Settings & Legal</h2>
        
        <div className="divide-y divide-slate-100 text-xs">
          
          {/* Settings Modal (Screen 26) */}
          <div 
            onClick={() => setIsSettingsModalOpen(true)}
            className="py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 px-2 rounded-xl"
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-slate-800">Preferences, Notifications & Frame View (Screen 26)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Help & Support Modal (Screen 27) */}
          <div 
            onClick={() => setIsHelpSupportModalOpen(true)}
            className="py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 px-2 rounded-xl"
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-800">24x7 Help, FAQs & Support Desk (Screen 27)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* About / Terms / Privacy (Screen 28) */}
          <div 
            onClick={() => setIsAboutModalOpen(true)}
            className="py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 px-2 rounded-xl"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-purple-600" />
              <span className="font-semibold text-slate-800">About Apna Ghar, Terms of Service & Privacy (Screen 28)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Screen 30: Simulate Offline / Network Error State */}
          <div 
            onClick={() => {
              setIsOfflineMode(!isOfflineMode);
              showToast(isOfflineMode ? 'Online mode restored' : 'Simulating Offline State (Screen 30)', 'info');
            }}
            className="py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 px-2 rounded-xl"
          >
            <div className="flex items-center gap-2.5">
              <WifiOff className="w-4 h-4 text-amber-600" />
              <span className="font-semibold text-slate-800">Toggle Offline Network Simulation (Screen 30)</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isOfflineMode ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-600'}`}>
              {isOfflineMode ? 'Offline Active' : 'Online'}
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};
