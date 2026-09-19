export type UserRole = 'buyer' | 'tenant' | 'owner' | 'agent' | 'admin';

export type Language = 'en' | 'hi';

export type ListingType = 'buy' | 'rent' | 'commercial' | 'plot';

export type PropertyType = 
  | 'apartment' 
  | 'villa' 
  | 'plot' 
  | 'house' 
  | 'builder-floor'
  | 'penthouse' 
  | 'commercial' 
  | 'studio' 
  | 'pg';

export type BHKType = '1RK' | '1BHK' | '2BHK' | '3BHK' | '4BHK' | '4+BHK';

export type FurnishingStatus = 'unfurnished' | 'semi-furnished' | 'fully-furnished';

export type PreferredTenant = 'family' | 'bachelors' | 'any' | 'company_lease';

export type ParkingType = 'bike' | 'car' | 'both' | 'none';

export type PossessionStatus = 'ready_to_move' | 'under_construction' | 'new_launch';

export type ListedByType = 'owner' | 'agent' | 'builder';

export interface Landmark {
  name: string;
  type: 'metro' | 'school' | 'hospital' | 'tech_park' | 'mall' | 'airport';
  distance: string;
  travelTime: string;
}

export interface LocalityScore {
  safety: number;
  connectivity: number;
  lifestyle: number;
  greenCover: number;
  overall: number;
}

export interface Property {
  id: string;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  listingType: ListingType;
  propertyType: PropertyType;
  projectName?: string;
  builderName?: string;
  bhk: BHKType;
  bathrooms: number;
  balconies: number;
  floor: number;
  totalFloors: number;
  facing: 'East' | 'North' | 'North-East' | 'West' | 'South' | 'South-East';
  furnishing: FurnishingStatus;
  preferredTenant?: PreferredTenant;
  parking: ParkingType;
  possessionStatus: PossessionStatus;
  possessionDate: string;
  reraId?: string;
  isReraApproved: boolean;
  price: number; // in INR (e.g. 8500000 for 85L, or 32000 for Rent)
  priceDisplay: string; // e.g. "₹85 Lac" or "₹32,000/mo"
  pricePerSqFt: number; // in INR/sq.ft
  deposit?: number; // for rent
  maintenance: number; // in INR/month
  carpetAreaSqFt: number;
  superAreaSqFt: number;
  availableFrom: string;
  address: string;
  addressHi?: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  lat: number;
  lng: number;
  images: string[];
  floorPlanImage?: string;
  virtualTourUrl?: string;
  amenities: string[];
  landmarks: Landmark[];
  localityScore: LocalityScore;
  listedBy: ListedByType;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  ownerWhatsapp: string;
  ownerAvatar?: string;
  isOwnerVerified: boolean;
  isFeatured: boolean;
  isAvailable: boolean;
  viewsCount: number;
  inquiryCount: number;
  savedCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  builder: string;
  locality: string;
  city: string;
  priceRange: string;
  startingPrice: number;
  configurations: string[];
  possessionDate: string;
  reraId: string;
  image: string;
  gallery: string[];
  totalUnits: number;
  totalTowers: number;
  openSpacePercentage: number;
  amenities: string[];
  highlight: string;
}

export interface LocalityInfo {
  id: string;
  name: string;
  city: string;
  avgRatePerSqFt: number;
  growthYoy: string;
  rentalYield: string;
  description: string;
  image: string;
  connectivityRating: number;
  topHighlights: string[];
  activeListingsCount: number;
}

export interface FilterState {
  searchQuery: string;
  listingType: ListingType;
  city: string;
  locality: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  bhk: BHKType[];
  propertyTypes: PropertyType[];
  possession: PossessionStatus[];
  furnishing: FurnishingStatus[];
  listedBy: ListedByType[];
  parking: ParkingType[];
  minBalconies: number;
  amenities: string[];
  verifiedOnly: boolean;
  reraOnly: boolean;
  zeroBrokerage: boolean;
  immediateOnly: boolean;
  recentlyAdded: boolean;
  sortBy: 'recommended' | 'price_low' | 'price_high' | 'newest' | 'rate_sqft' | 'area';
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  isFromUser: boolean;
  text: string;
  timestamp: string;
  propertyContext?: {
    id: string;
    title: string;
    price: string;
    image: string;
  };
}

export interface ChatThread {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyPrice: string;
  propertyImage: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface CallbackRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyPrice: string;
  locality: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  date: string;
  timeSlot: string;
  visitType: 'in_person' | 'video_call';
  needCabPickup: boolean;
  notes?: string;
  status: 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'price_drop' | 'lead' | 'callback' | 'new_match' | 'system';
  timestamp: string;
  isRead: boolean;
  targetId?: string;
  targetType?: 'property' | 'callback' | 'chat';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  savedPropertyIds: string[];
  comparePropertyIds: string[];
  recentSearches: string[];
  postedProperties: Property[];
  callbackRequests: CallbackRequest[];
  joinedDate: string;
}

export type ActiveTab = 'home' | 'search' | 'shortlist' | 'messages' | 'account';

export type AuthMode = 'login' | 'register' | 'otp';

export interface ScreenInventoryItem {
  id: number;
  number: string;
  name: string;
  category: 'core' | 'discovery' | 'inquiry' | 'auth' | 'management' | 'utility';
  description: string;
}

