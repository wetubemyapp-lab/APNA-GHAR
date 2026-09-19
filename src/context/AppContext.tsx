import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  User, 
  Property, 
  Project, 
  LocalityInfo, 
  FilterState, 
  ListingType, 
  ActiveTab, 
  ChatThread, 
  NotificationItem, 
  CallbackRequest, 
  Language,
  AuthMode,
  UserRole
} from '../types';
import { 
  CITIES_LIST, 
  INITIAL_USER, 
  INITIAL_PROPERTIES, 
  FEATURED_PROJECTS, 
  POPULAR_LOCALITIES, 
  INITIAL_CHAT_THREADS, 
  INITIAL_NOTIFICATIONS,
  SCREEN_INVENTORY_LIST
} from '../data/mockData';

export const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  listingType: 'buy',
  city: 'Bengaluru',
  locality: '',
  minPrice: 0,
  maxPrice: 100000000,
  minArea: 0,
  maxArea: 100000,
  bhk: [],
  propertyTypes: [],
  possession: [],
  furnishing: [],
  listedBy: [],
  parking: [],
  minBalconies: 0,
  amenities: [],
  verifiedOnly: false,
  reraOnly: false,
  zeroBrokerage: false,
  immediateOnly: false,
  recentlyAdded: false,
  sortBy: 'recommended'
};

interface AppContextType {
  // App Lang & User
  language: Language;
  setLanguage: (lang: Language) => void;
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  
  // City
  selectedCity: typeof CITIES_LIST[0];
  setSelectedCity: (city: typeof CITIES_LIST[0]) => void;
  isCityModalOpen: boolean;
  setIsCityModalOpen: (open: boolean) => void;
  
  // Listing Type Toggle
  listingType: ListingType;
  setListingType: (type: ListingType) => void;
  
  // Properties & Filters
  properties: Property[];
  filteredProperties: Property[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  activeFilterCount: number;
  addRecentSearch: (query: string) => void;
  removeRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  
  // Property Detail (Screen 08)
  selectedProperty: Property | null;
  setSelectedProperty: (prop: Property | null) => void;
  
  // Saved / Shortlist (Screen 13)
  savedPropertyIds: string[];
  savedProperties: Property[];
  toggleSaveProperty: (id: string) => void;
  isPropertySaved: (id: string) => boolean;
  savedProjectIds: string[];
  savedProjects: Project[];
  toggleSaveProject: (id: string) => void;
  isProjectSaved: (id: string) => boolean;
  
  // Comparison (Screen 12)
  comparePropertyIds: string[];
  compareProperties: Property[];
  toggleCompareProperty: (id: string) => void;
  clearCompare: () => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
  
  // Bottom Sheet Filter Modal (Screen 07)
  isFilterBottomSheetOpen: boolean;
  setIsFilterBottomSheetOpen: (open: boolean) => void;
  
  // Schedule Visit / Request Callback (Screen 15)
  isScheduleVisitModalOpen: boolean;
  setIsScheduleVisitModalOpen: (open: boolean) => void;
  scheduleVisitProperty: Property | null;
  setScheduleVisitProperty: (prop: Property | null) => void;
  openScheduleVisit: (prop: Property) => void;
  submitScheduleVisit: (data: {
    propertyId: string;
    date: string;
    timeSlot: string;
    visitType: 'in_person' | 'video_call';
    needCabPickup: boolean;
    notes?: string;
  }) => void;
  callbackRequests: CallbackRequest[];
  
  // Contact / Enquiry Modal (Screen 14)
  isEnquiryModalOpen: boolean;
  setIsEnquiryModalOpen: (open: boolean) => void;
  enquiryProperty: Property | null;
  setEnquiryProperty: (prop: Property | null) => void;
  openEnquiryModal: (prop: Property) => void;
  
  // Post Property & Management (Screens 19, 20, 21, 22)
  isPostPropertyModalOpen: boolean;
  setIsPostPropertyModalOpen: (open: boolean) => void;
  isMyListingsModalOpen: boolean;
  setIsMyListingsModalOpen: (open: boolean) => void;
  addProperty: (newProp: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'inquiryCount' | 'savedCount'>) => Property;
  deleteProperty: (id: string) => void;
  isManageListingModalOpen: boolean;
  setIsManageListingModalOpen: (open: boolean) => void;
  managingProperty: Property | null;
  setManagingProperty: (prop: Property | null) => void;
  isEditListingModalOpen: boolean;
  setIsEditListingModalOpen: (open: boolean) => void;
  editingProperty: Property | null;
  setEditingProperty: (prop: Property | null) => void;
  updateExistingProperty: (id: string, updated: Partial<Property>) => void;
  
  // Auth (Screens 16, 17) - Email/Password + Mobile + Area
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
  authIdentifier: string;
  setAuthIdentifier: (val: string) => void;
  rememberMe: boolean;
  setRememberMe: (val: boolean) => void;
  handleLoginWithPassword: (identifier: string, password: string) => { ok: boolean; message: string };
  handleSignUp: (data: { name: string; email: string; phone: string; area: string; password: string; role?: UserRole }) => { ok: boolean; message: string };
  handleLogout: () => void;
  
  // Messaging / Chat (Screen 23)
  chatThreads: ChatThread[];
  activeThreadId: string | null;
  setActiveThreadId: (id: string | null) => void;
  openChatWithProperty: (prop: Property, initialMsg?: string) => void;
  sendMessage: (threadId: string, text: string) => void;
  totalUnreadMessages: number;
  
  // Notifications (Screen 24)
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  isNotificationCenterOpen: boolean;
  setIsNotificationCenterOpen: (open: boolean) => void;
  
  // Projects & Localities (Screens 09, 10)
  projects: Project[];
  localities: LocalityInfo[];
  selectedLocality: LocalityInfo | null;
  setSelectedLocality: (loc: LocalityInfo | null) => void;
  isLocalityModalOpen: boolean;
  setIsLocalityModalOpen: (open: boolean) => void;
  selectedProject: Project | null;
  setSelectedProject: (proj: Project | null) => void;
  isProjectModalOpen: boolean;
  setIsProjectModalOpen: (open: boolean) => void;
  
  // Splash & Onboarding (Screens 01, 02)
  isSplashScreenVisible: boolean;
  setIsSplashScreenVisible: (visible: boolean) => void;
  isOnboardingModalOpen: boolean;
  setIsOnboardingModalOpen: (open: boolean) => void;
  
  // Utilities & Settings (Screens 26, 27, 28, 30)
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (open: boolean) => void;
  isHelpSupportModalOpen: boolean;
  setIsHelpSupportModalOpen: (open: boolean) => void;
  isAboutModalOpen: boolean;
  setIsAboutModalOpen: (open: boolean) => void;
  isOfflineMode: boolean;
  setIsOfflineMode: (offline: boolean) => void;
  
  // Screen Inventory Showcase & Master Navigator
  isScreenInventoryOpen: boolean;
  setIsScreenInventoryOpen: (open: boolean) => void;
  openScreen: (screenId: number) => void;
  
  // Device Frame View Toggle & Compose Inspector
  deviceMode: 'android_frame' | 'responsive';
  setDeviceMode: (mode: 'android_frame' | 'responsive') => void;
  toggleDeviceMode: () => void;
  isComposeInspectorOpen: boolean;
  setIsComposeInspectorOpen: (open: boolean) => void;
  
  // Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [listingType, setListingType] = useState<ListingType>('buy');

  // Selected city
  const [selectedCity, setSelectedCity] = useState<typeof CITIES_LIST[0]>(() => {
    const saved = localStorage.getItem('apnaghar_city');
    if (saved) {
      const found = CITIES_LIST.find(c => c.name === saved);
      if (found) return found;
    }
    return CITIES_LIST[0]; // Bengaluru default
  });
  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);

  // User state
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('apnaghar_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // Properties list
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('apnaghar_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  // Projects & Localities
  const [projects] = useState<Project[]>(FEATURED_PROJECTS);
  const [localities] = useState<LocalityInfo[]>(POPULAR_LOCALITIES);
  const [selectedLocality, setSelectedLocality] = useState<LocalityInfo | null>(null);
  const [isLocalityModalOpen, setIsLocalityModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);

  // Filters State
  const [filterState, setFilterState] = useState<FilterState>(() => {
    const saved = localStorage.getItem('apnaghar_filters');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_FILTERS,
          ...parsed,
          city: selectedCity.name
        };
      } catch (e) {
        console.error('Failed to parse saved filters', e);
      }
    }
    return {
      ...DEFAULT_FILTERS,
      city: selectedCity.name
    };
  });

  // Modals & Bottom Sheets
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [isFilterBottomSheetOpen, setIsFilterBottomSheetOpen] = useState<boolean>(false);
  const [isPostPropertyModalOpen, setIsPostPropertyModalOpen] = useState<boolean>(false);
  const [isScheduleVisitModalOpen, setIsScheduleVisitModalOpen] = useState<boolean>(false);
  const [scheduleVisitProperty, setScheduleVisitProperty] = useState<Property | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);
  const [enquiryProperty, setEnquiryProperty] = useState<Property | null>(null);
  
  // Manage & Edit Listing
  const [isMyListingsModalOpen, setIsMyListingsModalOpen] = useState<boolean>(false);
  const [isManageListingModalOpen, setIsManageListingModalOpen] = useState<boolean>(false);
  const [managingProperty, setManagingProperty] = useState<Property | null>(null);
  const [isEditListingModalOpen, setIsEditListingModalOpen] = useState<boolean>(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Auth Modals (Screens 16, 17)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [authIdentifier, setAuthIdentifier] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  // Notifications (Screen 24)
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState<boolean>(false);

  // Splash & Onboarding (Screens 01, 02)
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState<boolean>(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState<boolean>(false);

  // Settings & Utilities (Screens 26, 27, 28, 30)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isHelpSupportModalOpen, setIsHelpSupportModalOpen] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  // Screen Inventory Showcase
  const [isScreenInventoryOpen, setIsScreenInventoryOpen] = useState<boolean>(false);

  // Compose Inspector & Device Mode
  const [deviceMode, setDeviceMode] = useState<'android_frame' | 'responsive'>('android_frame');
  const [isComposeInspectorOpen, setIsComposeInspectorOpen] = useState<boolean>(false);

  // Callback / Visit schedules
  const [callbackRequests, setCallbackRequests] = useState<CallbackRequest[]>(() => {
    const saved = localStorage.getItem('apnaghar_callbacks');
    return saved ? JSON.parse(saved) : (INITIAL_USER.callbackRequests || []);
  });

  // Chat
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(() => {
    const saved = localStorage.getItem('apnaghar_chats');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_THREADS;
  });
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('apnaghar_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Sync city selection with filterState and localStorage
  useEffect(() => {
    localStorage.setItem('apnaghar_city', selectedCity.name);
    setFilterState(prev => ({ ...prev, city: selectedCity.name }));
  }, [selectedCity]);

  // Sync listingType with filterState
  useEffect(() => {
    setFilterState(prev => ({ ...prev, listingType }));
  }, [listingType]);

  // Save properties to localStorage
  useEffect(() => {
    localStorage.setItem('apnaghar_properties', JSON.stringify(properties));
  }, [properties]);

  // Save chats
  useEffect(() => {
    localStorage.setItem('apnaghar_chats', JSON.stringify(chatThreads));
  }, [chatThreads]);

  // Save user
  useEffect(() => {
    localStorage.setItem('apnaghar_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Save callbacks
  useEffect(() => {
    localStorage.setItem('apnaghar_callbacks', JSON.stringify(callbackRequests));
  }, [callbackRequests]);

  // Save notifications
  useEffect(() => {
    localStorage.setItem('apnaghar_notifs', JSON.stringify(notifications));
  }, [notifications]);

  // Save filterState
  useEffect(() => {
    localStorage.setItem('apnaghar_filters', JSON.stringify(filterState));
  }, [filterState]);

  // Filter properties logic
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      // Offline mode check
      if (isOfflineMode) {
        return true;
      }

      // Listing Type check
      if (prop.listingType !== filterState.listingType) return false;

      // City filter
      if (filterState.city && prop.city.toLowerCase() !== filterState.city.toLowerCase()) {
        const isMatch = prop.city.toLowerCase().includes(filterState.city.toLowerCase()) ||
          filterState.city.toLowerCase().includes(prop.city.toLowerCase());
        if (!isMatch) return false;
      }

      // Search Query
      if (filterState.searchQuery.trim()) {
        const q = filterState.searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesLocality = prop.locality.toLowerCase().includes(q);
        const matchesBuilder = prop.builderName?.toLowerCase().includes(q) || false;
        const matchesProject = prop.projectName?.toLowerCase().includes(q) || false;
        const matchesAddress = prop.address.toLowerCase().includes(q);
        const matchesBhk = prop.bhk.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLocality && !matchesBuilder && !matchesProject && !matchesAddress && !matchesBhk) {
          return false;
        }
      }

      // Locality
      if (filterState.locality && prop.locality.toLowerCase() !== filterState.locality.toLowerCase()) {
        return false;
      }

      // Price Range
      if (prop.price < filterState.minPrice) return false;
      if (filterState.maxPrice > 0 && prop.price > filterState.maxPrice) return false;

      // BHK
      if (filterState.bhk.length > 0 && !filterState.bhk.includes(prop.bhk)) {
        return false;
      }

      // Property Type
      if (filterState.propertyTypes.length > 0 && !filterState.propertyTypes.includes(prop.propertyType)) {
        return false;
      }

      // Furnishing
      if (filterState.furnishing.length > 0 && !filterState.furnishing.includes(prop.furnishing)) {
        return false;
      }

      // Parking
      if (filterState.parking.length > 0 && !filterState.parking.includes(prop.parking)) {
        return false;
      }

      // Listed By
      if (filterState.listedBy.length > 0 && !filterState.listedBy.includes(prop.listedBy)) {
        return false;
      }

      // Zero Brokerage (Direct Owner)
      if (filterState.zeroBrokerage && prop.listedBy !== 'owner') {
        return false;
      }

      // RERA only
      if (filterState.reraOnly && !prop.isReraApproved) {
        return false;
      }

      // Verified Owner/Builder only
      if (filterState.verifiedOnly && !prop.isOwnerVerified) {
        return false;
      }

      // Immediate possession
      if (filterState.immediateOnly && prop.possessionStatus !== 'ready_to_move') {
        return false;
      }

      // Area Range
      if (filterState.minArea > 0 && prop.carpetAreaSqFt < filterState.minArea) return false;
      if (filterState.maxArea > 0 && filterState.maxArea < 100000 && prop.carpetAreaSqFt > filterState.maxArea) return false;

      // Possession Status
      if (filterState.possession.length > 0 && !filterState.possession.includes(prop.possessionStatus)) {
        return false;
      }

      // Recently Added
      if (filterState.recentlyAdded) {
        const dateCreated = new Date(prop.createdAt);
        if (!isNaN(dateCreated.getTime())) {
          const now = new Date();
          const diffInDays = (now.getTime() - dateCreated.getTime()) / (1000 * 3600 * 24);
          if (diffInDays > 365 && !prop.createdAt.includes('2026') && prop.createdAt !== 'Today') return false;
        }
      }

      // Amenities match
      if (filterState.amenities.length > 0) {
        const hasAllAmenities = filterState.amenities.every(a => 
          prop.amenities.some(item => item.toLowerCase().includes(a.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filterState.sortBy) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'rate_sqft':
          return a.pricePerSqFt - b.pricePerSqFt;
        case 'area':
          return b.superAreaSqFt - a.superAreaSqFt;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'recommended':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [properties, filterState, isOfflineMode]);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilterState(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilterState({
      ...DEFAULT_FILTERS,
      city: selectedCity.name,
      listingType: listingType
    });
    showToast('Filters reset to default', 'info');
  };

  const addRecentSearch = (query: string) => {
    if (!query || !query.trim()) return;
    const trimmed = query.trim();
    setCurrentUser(prev => {
      const existing = prev.recentSearches || [];
      const filtered = existing.filter(q => q.toLowerCase() !== trimmed.toLowerCase());
      return {
        ...prev,
        recentSearches: [trimmed, ...filtered].slice(0, 10)
      };
    });
  };

  const removeRecentSearch = (query: string) => {
    setCurrentUser(prev => ({
      ...prev,
      recentSearches: (prev.recentSearches || []).filter(q => q !== query)
    }));
  };

  const clearRecentSearches = () => {
    setCurrentUser(prev => ({
      ...prev,
      recentSearches: []
    }));
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filterState.searchQuery) count++;
    if (filterState.minPrice > 0) count++;
    if (filterState.maxPrice < 100000000 && filterState.maxPrice > 0) count++;
    if (filterState.minArea > 0) count++;
    if (filterState.maxArea < 100000 && filterState.maxArea > 0) count++;
    if (filterState.bhk.length > 0) count += filterState.bhk.length;
    if (filterState.propertyTypes.length > 0) count += filterState.propertyTypes.length;
    if (filterState.possession.length > 0) count += filterState.possession.length;
    if (filterState.furnishing.length > 0) count += filterState.furnishing.length;
    if (filterState.listedBy.length > 0) count += filterState.listedBy.length;
    if (filterState.parking.length > 0) count += filterState.parking.length;
    if (filterState.zeroBrokerage) count++;
    if (filterState.reraOnly) count++;
    if (filterState.verifiedOnly) count++;
    if (filterState.immediateOnly) count++;
    if (filterState.recentlyAdded) count++;
    if (filterState.minBalconies > 0) count++;
    if (filterState.amenities.length > 0) count += filterState.amenities.length;
    return count;
  }, [filterState]);

  // Saved / Shortlist
  const savedProperties = useMemo(() => {
    return properties.filter(p => (currentUser.savedPropertyIds || []).includes(p.id));
  }, [properties, currentUser.savedPropertyIds]);

  const toggleSaveProperty = (id: string) => {
    if (!currentUser.isLoggedIn || currentUser.name === 'Guest User') {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      showToast('Please sign in to save properties to your shortlist', 'info');
      return;
    }
    const isSaved = (currentUser.savedPropertyIds || []).includes(id);
    const updated = isSaved 
      ? (currentUser.savedPropertyIds || []).filter(item => item !== id)
      : [...(currentUser.savedPropertyIds || []), id];

    setCurrentUser(prev => ({ ...prev, savedPropertyIds: updated }));
    showToast(isSaved ? 'Removed from Shortlist' : 'Saved to Shortlist! ❤️', isSaved ? 'info' : 'success');
  };

  const isPropertySaved = (id: string) => (currentUser.savedPropertyIds || []).includes(id);

  // Saved Projects
  const savedProjects = useMemo(() => {
    return projects.filter(p => (currentUser.savedProjectIds || []).includes(p.id));
  }, [projects, currentUser.savedProjectIds]);

  const toggleSaveProject = (id: string) => {
    const isSaved = (currentUser.savedProjectIds || []).includes(id);
    const updated = isSaved 
      ? (currentUser.savedProjectIds || []).filter(item => item !== id)
      : [...(currentUser.savedProjectIds || []), id];

    setCurrentUser(prev => ({ ...prev, savedProjectIds: updated }));
    showToast(isSaved ? 'Project removed from Shortlist' : 'Project saved to Shortlist! ❤️', isSaved ? 'info' : 'success');
  };

  const isProjectSaved = (id: string) => (currentUser.savedProjectIds || []).includes(id);

  // Compare
  const compareProperties = useMemo(() => {
    return properties.filter(p => (currentUser.comparePropertyIds || []).includes(p.id));
  }, [properties, currentUser.comparePropertyIds]);

  const toggleCompareProperty = (id: string) => {
    const isCompared = (currentUser.comparePropertyIds || []).includes(id);
    if (!isCompared && (currentUser.comparePropertyIds || []).length >= 4) {
      showToast('Maximum 4 properties can be compared at once', 'error');
      return;
    }

    const updated = isCompared 
      ? (currentUser.comparePropertyIds || []).filter(item => item !== id)
      : [...(currentUser.comparePropertyIds || []), id];

    setCurrentUser(prev => ({ ...prev, comparePropertyIds: updated }));
    showToast(isCompared ? 'Removed from comparison' : 'Added to comparison matrix', 'info');
  };

  const clearCompare = () => {
    setCurrentUser(prev => ({ ...prev, comparePropertyIds: [] }));
    showToast('Comparison list cleared', 'info');
  };

  // Schedule Visit (Screen 15)
  const openScheduleVisit = (prop: Property) => {
    if (!currentUser.isLoggedIn || currentUser.name === 'Guest User') {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      showToast('Please sign in to schedule a free site visit', 'info');
      return;
    }
    setScheduleVisitProperty(prop);
    setIsScheduleVisitModalOpen(true);
  };

  const submitScheduleVisit = (data: {
    propertyId: string;
    date: string;
    timeSlot: string;
    visitType: 'in_person' | 'video_call';
    needCabPickup: boolean;
    notes?: string;
  }) => {
    const prop = properties.find(p => p.id === data.propertyId);
    if (!prop) return;

    const newReq: CallbackRequest = {
      id: `cb-${Date.now()}`,
      propertyId: prop.id,
      propertyTitle: prop.title,
      propertyImage: prop.images[0],
      propertyPrice: prop.priceDisplay,
      locality: `${prop.locality}, ${prop.city}`,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      userEmail: currentUser.email,
      date: data.date,
      timeSlot: data.timeSlot,
      visitType: data.visitType,
      needCabPickup: data.needCabPickup,
      notes: data.notes,
      status: 'confirmed',
      createdAt: 'Just now'
    };

    setCallbackRequests(prev => [newReq, ...prev]);
    setCurrentUser(prev => ({ ...prev, callbackRequests: [newReq, ...(prev.callbackRequests || [])] }));

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Site Visit Confirmed! 🚗',
      message: `Your visit for "${prop.title}" on ${data.date} (${data.timeSlot}) is scheduled. Free pickup cab assigned.`,
      type: 'callback',
      timestamp: 'Just now',
      isRead: false,
      targetId: prop.id,
      targetType: 'callback'
    };
    setNotifications(prev => [newNotif, ...prev]);

    setIsScheduleVisitModalOpen(false);
    showToast('Site visit scheduled successfully! Free cab pickup details sent via SMS.', 'success');
  };

  // Contact / Enquiry (Screen 14)
  const openEnquiryModal = (prop: Property) => {
    if (!currentUser.isLoggedIn || currentUser.name === 'Guest User') {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      showToast('Please sign in to contact the owner or builder', 'info');
      return;
    }
    setEnquiryProperty(prop);
    setIsEnquiryModalOpen(true);
  };

  // Post Property & Management (Screens 19, 20, 21, 22)
  const addProperty = (newPropData: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'inquiryCount' | 'savedCount'>): Property => {
    const newId = `prop-custom-${Date.now()}`;
    const newProperty: Property = {
      ...newPropData,
      id: newId,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerPhone: currentUser.phone,
      ownerWhatsapp: currentUser.phone,
      isOwnerVerified: true,
      isFeatured: true,
      isAvailable: true,
      viewsCount: 1,
      inquiryCount: 0,
      savedCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setProperties(prev => [newProperty, ...prev]);
    setCurrentUser(prev => ({
      ...prev,
      postedProperties: [newProperty, ...(prev.postedProperties || [])]
    }));

    // Add notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Property Listing Published Live! 🏠',
      message: `Your property "${newProperty.title.slice(0, 35)}..." is now verified and active on Apna Ghar.`,
      type: 'system',
      timestamp: 'Just now',
      isRead: false,
      targetId: newProperty.id,
      targetType: 'property'
    };
    setNotifications(prev => [notif, ...prev]);

    showToast('Property published successfully! Zero brokerage badge applied.', 'success');
    return newProperty;
  };

  const updateExistingProperty = (id: string, updated: Partial<Property>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updated, updatedAt: new Date().toISOString().split('T')[0] } : p));
    setCurrentUser(prev => ({
      ...prev,
      postedProperties: (prev.postedProperties || []).map(p => p.id === id ? { ...p, ...updated } : p)
    }));
    showToast('Listing updated successfully!', 'success');
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    setCurrentUser(prev => ({
      ...prev,
      postedProperties: (prev.postedProperties || []).filter(p => p.id !== id)
    }));
    showToast('Listing removed successfully', 'info');
  };

  // ---------- Auth helpers ----------
  const getRegisteredUsers = (): Array<User & { password: string }> => {
    try {
      const raw = localStorage.getItem('apnaghar_registered_users');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const saveRegisteredUsers = (users: Array<User & { password: string }>) => {
    localStorage.setItem('apnaghar_registered_users', JSON.stringify(users));
  };

  // Email/Password + Mobile sign in
  const handleLoginWithPassword = (identifier: string, password: string): { ok: boolean; message: string } => {
    const normalized = identifier.trim().toLowerCase();
    if (!normalized || !password) {
      return { ok: false, message: 'Please enter your email/mobile and password.' };
    }
    const users = getRegisteredUsers();
    const match = users.find(
      u => (u.email && u.email.toLowerCase() === normalized) ||
           (u.phone && u.phone.replace(/\D/g, '').slice(-10) === normalized.replace(/\D/g, '').slice(-10))
    );
    if (!match) {
      return { ok: false, message: 'No account found with these credentials. Please sign up first.' };
    }
    if (match.password !== password) {
      return { ok: false, message: 'Incorrect password. Please try again.' };
    }
    const loggedInUser: User = { ...match, isLoggedIn: true, password: undefined };
    setCurrentUser(loggedInUser);
    if (rememberMe) {
      localStorage.setItem('apnaghar_session', match.id);
    } else {
      sessionStorage.setItem('apnaghar_session', match.id);
    }
    setIsAuthModalOpen(false);
    setAuthMode('login');
    showToast(`Welcome back, ${match.name}! You are now signed in.`, 'success');
    return { ok: true, message: 'Login successful.' };
  };

  // Full register with name/email/phone/area/password
  const handleSignUp = (data: {
    name: string;
    email: string;
    phone: string;
    area: string;
    password: string;
    role?: UserRole;
  }): { ok: boolean; message: string } => {
    const users = getRegisteredUsers();
    const emailKey = data.email.trim().toLowerCase();
    const phoneKey = data.phone.replace(/\D/g, '').slice(-10);
    if (users.some(u => u.email && u.email.toLowerCase() === emailKey)) {
      return { ok: false, message: 'An account with this email already exists. Please sign in.' };
    }
    if (users.some(u => u.phone && u.phone.replace(/\D/g, '').slice(-10) === phoneKey)) {
      return { ok: false, message: 'An account with this mobile number already exists.' };
    }
    const newUser: User & { password: string } = {
      id: `user-${Date.now()}`,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      area: data.area.trim(),
      role: data.role || 'buyer',
      avatar: '',
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name.trim())}&backgroundColor=3949ab,f4a62a&textColor=ffffff`,
      password: data.password,
      isLoggedIn: true,
      savedPropertyIds: [],
      savedProjectIds: [],
      comparePropertyIds: [],
      recentSearches: [],
      postedProperties: [],
      callbackRequests: [],
      joinedDate: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    };
    users.push(newUser);
    saveRegisteredUsers(users);
    const loggedInUser: User = { ...newUser, password: undefined };
    setCurrentUser(loggedInUser);
    if (rememberMe) {
      localStorage.setItem('apnaghar_session', newUser.id);
    } else {
      sessionStorage.setItem('apnaghar_session', newUser.id);
    }
    setIsAuthModalOpen(false);
    setAuthMode('login');
    showToast(`Account created! Welcome to Apna Ghar, ${newUser.name.split(' ')[0]}.`, 'success');
    return { ok: true, message: 'Registration successful.' };
  };

  const handleLogout = () => {
    setActiveTab('home');
    setSelectedProperty(null);
    setSelectedProject(null);
    setSelectedLocality(null);
    setIsAuthModalOpen(false);
    setIsMyListingsModalOpen(false);
    setIsManageListingModalOpen(false);
    setIsEnquiryModalOpen(false);
    setIsScheduleVisitModalOpen(false);
    setIsCompareModalOpen(false);
    setIsNotificationCenterOpen(false);
    setChatThreads([]);
    setCallbackRequests([]);
    setCurrentUser(INITIAL_USER);
    localStorage.removeItem('apnaghar_user');
    localStorage.removeItem('apnaghar_session');
    sessionStorage.removeItem('apnaghar_session');
    localStorage.removeItem('apnaghar_post_property_draft');
    showToast('Successfully Logged Out', 'success');
  };

  // Restore session on mount from rememberMe / sessionStorage
  useEffect(() => {
    const sessionId = localStorage.getItem('apnaghar_session') || sessionStorage.getItem('apnaghar_session');
    if (sessionId) {
      const users = getRegisteredUsers();
      const match = users.find(u => u.id === sessionId);
      if (match) {
        const { password: _pw, ...rest } = match;
        setCurrentUser({ ...rest, isLoggedIn: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Messaging (Screen 23)
  const openChatWithProperty = (prop: Property, initialMsg?: string) => {
    if (!currentUser.isLoggedIn || currentUser.name === 'Guest User') {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      showToast('Please sign in to chat with owners and builders', 'info');
      return;
    }
    let thread = chatThreads.find(t => t.propertyId === prop.id);
    if (!thread) {
      thread = {
        id: `chat-${Date.now()}`,
        propertyId: prop.id,
        propertyTitle: prop.title,
        propertyPrice: prop.priceDisplay,
        propertyImage: prop.images[0],
        participantId: prop.ownerId,
        participantName: prop.ownerName,
        participantRole: prop.listedBy === 'builder' ? 'Direct Builder Desk' : prop.listedBy === 'owner' ? 'Verified Owner (Zero Brokerage)' : 'Verified Agent',
        participantAvatar: prop.ownerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        lastMessage: initialMsg || 'Hi, I am interested in this property. Is it available for inspection?',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `msg-${Date.now()}`,
            threadId: `chat-${Date.now()}`,
            senderId: currentUser.id,
            senderName: currentUser.name,
            isFromUser: true,
            text: initialMsg || 'Hi, I am interested in this property. Is it available for inspection?',
            timestamp: 'Just now',
            propertyContext: {
              id: prop.id,
              title: prop.title,
              price: prop.priceDisplay,
              image: prop.images[0]
            }
          }
        ]
      };
      setChatThreads(prev => [thread!, ...prev]);
    }
    setActiveThreadId(thread.id);
    setActiveTab('messages');
  };

  const sendMessage = (threadId: string, text: string) => {
    if (!text.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      threadId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      isFromUser: true,
      text: text.trim(),
      timestamp: 'Just now'
    };

    setChatThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          lastMessage: text.trim(),
          lastMessageTime: 'Just now',
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    }));

    // Auto-reply simulation from builder/owner after 1.2s
    setTimeout(() => {
      const responses = [
        'Thanks for reaching out! Yes, keys are with our on-site manager and we can arrange an inspection anytime today or tomorrow.',
        'Hello! All legal titles and RERA approvals are clear. Would you like us to share the master brochure and price breakdown on WhatsApp?',
        'Thank you! The pricing has a small negotiation buffer for immediate token booking.'
      ];
      const randomReply = responses[Math.floor(Math.random() * responses.length)];

      setChatThreads(threads => threads.map(t => {
        if (t.id === threadId) {
          const autoMsg = {
            id: `msg-rep-${Date.now()}`,
            threadId,
            senderId: t.participantId,
            senderName: t.participantName,
            isFromUser: false,
            text: randomReply,
            timestamp: 'Just now'
          };
          return {
            ...t,
            lastMessage: randomReply,
            lastMessageTime: 'Just now',
            messages: [...t.messages, autoMsg]
          };
        }
        return t;
      }));
    }, 1200);
  };

  const totalUnreadMessages = useMemo(() => {
    return chatThreads.reduce((sum, t) => sum + (t.unreadCount || 0), 0);
  }, [chatThreads]);

  // Notifications
  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('All notifications marked as read', 'info');
  };

  const toggleDeviceMode = () => {
    setDeviceMode(prev => prev === 'android_frame' ? 'responsive' : 'android_frame');
  };

  // Master Screen Navigator (Screens 01 through 30)
  const openScreen = (screenId: number) => {
    // Reset any transient modal open states
    setSelectedProperty(null);
    setIsScheduleVisitModalOpen(false);
    setIsPostPropertyModalOpen(false);
    setIsCityModalOpen(false);
    setIsFilterBottomSheetOpen(false);
    setIsCompareModalOpen(false);
    setIsComposeInspectorOpen(false);
    setIsAuthModalOpen(false);
    setIsEnquiryModalOpen(false);
    setIsManageListingModalOpen(false);
    setIsMyListingsModalOpen(false);
    setIsEditListingModalOpen(false);
    setIsNotificationCenterOpen(false);
    setIsProjectModalOpen(false);
    setIsLocalityModalOpen(false);
    setIsSplashScreenVisible(false);
    setIsOnboardingModalOpen(false);
    setIsSettingsModalOpen(false);
    setIsHelpSupportModalOpen(false);
    setIsAboutModalOpen(false);
    setIsScreenInventoryOpen(false);

    switch (screenId) {
      case 1: // 01. Splash Screen
        setIsSplashScreenVisible(true);
        break;
      case 2: // 02. Onboarding / Location Permission
        setIsOnboardingModalOpen(true);
        break;
      case 3: // 03. Home
        setActiveTab('home');
        break;
      case 4: // 04. City & Location Selector
        setIsCityModalOpen(true);
        break;
      case 5: // 05. Search
        setActiveTab('search');
        updateFilter('searchQuery', '');
        break;
      case 6: // 06. Search Results
        setActiveTab('search');
        break;
      case 7: // 07. Filter Bottom Sheet
        setIsFilterBottomSheetOpen(true);
        break;
      case 8: // 08. Property Detail
        setSelectedProperty(properties[0] || INITIAL_PROPERTIES[0]);
        break;
      case 9: // 09. Project Detail
        setSelectedProject(projects[0] || FEATURED_PROJECTS[0]);
        setIsProjectModalOpen(true);
        break;
      case 10: // 10. Locality Detail
        setSelectedLocality(localities[0] || POPULAR_LOCALITIES[0]);
        setIsLocalityModalOpen(true);
        break;
      case 11: // 11. Map Search
        setActiveTab('search');
        showToast('Toggled to Map Search view', 'info');
        break;
      case 12: // 12. Compare Properties
        if ((currentUser.comparePropertyIds || []).length === 0) {
          setCurrentUser(prev => ({ ...prev, comparePropertyIds: [properties[0]?.id || 'prop-buy-1', properties[1]?.id || 'prop-buy-2'] }));
        }
        setIsCompareModalOpen(true);
        break;
      case 13: // 13. Shortlisted Properties
        setActiveTab('shortlist');
        break;
      case 14: // 14. Contact / Enquiry
        openEnquiryModal(properties[0] || INITIAL_PROPERTIES[0]);
        break;
      case 15: // 15. Request Callback
        openScheduleVisit(properties[0] || INITIAL_PROPERTIES[0]);
        break;
      case 16: // 16. Login
        setAuthMode('login');
        setIsAuthModalOpen(true);
        break;
      case 17: // 17. Register
        setAuthMode('register');
        setIsAuthModalOpen(true);
        break;
      case 18: // 18. Login (Email/Password)
        setAuthMode('login');
        setIsAuthModalOpen(true);
        break;
      case 19: // 19. Post Property
        setIsPostPropertyModalOpen(true);
        break;
      case 20: // 20. My Listings
        setIsMyListingsModalOpen(true);
        break;
      case 21: // 21. Listing Detail / Manage Listing
        setManagingProperty(currentUser.postedProperties?.[0] || properties[0] || INITIAL_PROPERTIES[0]);
        setIsManageListingModalOpen(true);
        break;
      case 22: // 22. Edit Listing
        setEditingProperty(currentUser.postedProperties?.[0] || properties[0] || INITIAL_PROPERTIES[0]);
        setIsPostPropertyModalOpen(true);
        break;
      case 23: // 23. Messages
        setActiveTab('messages');
        break;
      case 24: // 24. Notifications
        setIsNotificationCenterOpen(true);
        break;
      case 25: // 25. Account / Profile
        setActiveTab('account');
        break;
      case 26: // 26. Settings
        setIsSettingsModalOpen(true);
        break;
      case 27: // 27. Help & Support
        setIsHelpSupportModalOpen(true);
        break;
      case 28: // 28. About / Terms / Privacy
        setIsAboutModalOpen(true);
        break;
      case 29: // 29. Empty State / No Results
        setActiveTab('search');
        updateFilter('searchQuery', 'xyz_unmatched_locality_area_99');
        showToast('Simulating Empty Results state with smart reset recommendations', 'info');
        break;
      case 30: // 30. Error / Offline State
        setIsOfflineMode(true);
        showToast('Switched to simulated Offline state', 'info');
        break;
      default:
        setActiveTab('home');
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currentUser,
        setCurrentUser,
        activeTab,
        setActiveTab,
        selectedCity,
        setSelectedCity,
        isCityModalOpen,
        setIsCityModalOpen,
        listingType,
        setListingType,
        properties,
        filteredProperties,
        filterState,
        setFilterState,
        updateFilter,
        resetFilters,
        activeFilterCount,
        addRecentSearch,
        removeRecentSearch,
        clearRecentSearches,
        selectedProperty,
        setSelectedProperty,
        savedPropertyIds: currentUser.savedPropertyIds || [],
        savedProperties,
        toggleSaveProperty,
        isPropertySaved,
        savedProjectIds: currentUser.savedProjectIds || [],
        savedProjects,
        toggleSaveProject,
        isProjectSaved,
        comparePropertyIds: currentUser.comparePropertyIds || [],
        compareProperties,
        toggleCompareProperty,
        clearCompare,
        isCompareModalOpen,
        setIsCompareModalOpen,
        isFilterBottomSheetOpen,
        setIsFilterBottomSheetOpen,
        isScheduleVisitModalOpen,
        setIsScheduleVisitModalOpen,
        scheduleVisitProperty,
        setScheduleVisitProperty,
        openScheduleVisit,
        submitScheduleVisit,
        callbackRequests,
        isEnquiryModalOpen,
        setIsEnquiryModalOpen,
        enquiryProperty,
        setEnquiryProperty,
        openEnquiryModal,
        isPostPropertyModalOpen,
        setIsPostPropertyModalOpen,
        isMyListingsModalOpen,
        setIsMyListingsModalOpen,
        addProperty,
        deleteProperty,
        isManageListingModalOpen,
        setIsManageListingModalOpen,
        managingProperty,
        setManagingProperty,
        isEditListingModalOpen,
        setIsEditListingModalOpen,
        editingProperty,
        setEditingProperty,
        updateExistingProperty,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        authIdentifier,
        setAuthIdentifier,
        rememberMe,
        setRememberMe,
        handleLoginWithPassword,
        handleSignUp,
        handleLogout,
        chatThreads,
        activeThreadId,
        setActiveThreadId,
        openChatWithProperty,
        sendMessage,
        totalUnreadMessages,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        isNotificationCenterOpen,
        setIsNotificationCenterOpen,
        projects,
        localities,
        selectedLocality,
        setSelectedLocality,
        isLocalityModalOpen,
        setIsLocalityModalOpen,
        selectedProject,
        setSelectedProject,
        isProjectModalOpen,
        setIsProjectModalOpen,
        isSplashScreenVisible,
        setIsSplashScreenVisible,
        isOnboardingModalOpen,
        setIsOnboardingModalOpen,
        isSettingsModalOpen,
        setIsSettingsModalOpen,
        isHelpSupportModalOpen,
        setIsHelpSupportModalOpen,
        isAboutModalOpen,
        setIsAboutModalOpen,
        isOfflineMode,
        setIsOfflineMode,
        isScreenInventoryOpen,
        setIsScreenInventoryOpen,
        openScreen,
        deviceMode,
        setDeviceMode,
        toggleDeviceMode,
        isComposeInspectorOpen,
        setIsComposeInspectorOpen,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
