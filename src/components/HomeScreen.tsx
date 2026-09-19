import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from './PropertyCard';
import { ProjectCard } from './ProjectCard';
import { LocalityCard } from './LocalityCard';
import { RealEstateGuideModal, REAL_ESTATE_GUIDES, GuideArticle } from './RealEstateGuideModal';
import { 
  Search, 
  Building2, 
  Home, 
  Briefcase, 
  Map, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Key, 
  ChevronRight, 
  SlidersHorizontal,
  PlusCircle,
  Award,
  CheckCircle,
  Mic,
  Clock,
  MapPin,
  FileCheck,
  Zap,
  Users,
  Compass,
  ArrowRight,
  Layers
} from 'lucide-react';
import { ListingType, PropertyType } from '../types';

export const HomeScreen: React.FC = () => {
  const { 
    listingType, 
    setListingType, 
    selectedCity, 
    setIsCityModalOpen,
    properties,
    projects,
    localities,
    setActiveTab, 
    updateFilter, 
    setIsFilterBottomSheetOpen,
    setIsPostPropertyModalOpen,
    setSelectedProject,
    setIsProjectModalOpen,
    setSelectedLocality,
    setIsLocalityModalOpen,
    currentUser
  } = useApp();

  // Search Input State
  const [searchInput, setSearchInput] = useState('');
  const [isVoiceSearching, setIsVoiceSearching] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<GuideArticle | null>(null);

  // Segmented Switcher Categories
  const listingCategories: { type: ListingType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { type: 'buy', label: 'BUY', icon: Home },
    { type: 'rent', label: 'RENT', icon: Key },
    { type: 'commercial', label: 'COMMERCIAL', icon: Briefcase },
    { type: 'plot', label: 'PLOTS', icon: Map }
  ];

  // Property Type Grid Cards
  const propertyTypesGrid: { type: PropertyType; title: string; subtitle: string; icon: React.FC<{ className?: string }>; bg: string }[] = [
    { type: 'apartment', title: 'Apartments', subtitle: 'Flats, High-rises & Pent-houses', icon: Building2, bg: 'bg-blue-50 text-blue-700 border-blue-200' },
    { type: 'villa', title: 'Villas', subtitle: 'Independent Luxury Gated Villas', icon: Home, bg: 'bg-amber-50 text-amber-700 border-amber-200' },
    { type: 'plot', title: 'Plots & Land', subtitle: 'Residential & Commercial Layouts', icon: Map, bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { type: 'house', title: 'Independent House', subtitle: 'Single & Multi-storey Homes', icon: Home, bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { type: 'apartment', title: 'Builder Floor', subtitle: 'Low-rise Exclusive Floors', icon: Layers, bg: 'bg-purple-50 text-purple-700 border-purple-200' },
    { type: 'commercial', title: 'Commercial', subtitle: 'Shops, Offices & Showrooms', icon: Briefcase, bg: 'bg-slate-100 text-slate-800 border-slate-200' },
  ];

  // Quick Category Chips
  const quickTypeChips: { label: string; type?: PropertyType; action?: () => void }[] = [
    { label: 'Apartments', type: 'apartment' },
    { label: 'Villas', type: 'villa' },
    { label: 'Plots', type: 'plot' },
    { label: 'Houses', type: 'house' },
    { label: 'New Projects', action: () => updateFilter('possession', ['under_construction']) }
  ];

  // Budget Shortcut Chips
  const budgetChips = [
    { label: 'Under ₹30L', maxPrice: 3000000 },
    { label: '₹30L–₹60L', minPrice: 3000000, maxPrice: 6000000 },
    { label: '₹60L–₹1Cr', minPrice: 6000000, maxPrice: 10000000 },
    { label: '₹1Cr+', minPrice: 10000000 }
  ];

  // Featured Properties & Owner Direct Properties
  const featuredProperties = properties.filter(p => p.isFeatured && p.listingType === listingType).slice(0, 4);

  // Sample Popular Localities list matching prompt
  const popularSampleLocalities = [
    { name: 'Vaishali Nagar', price: '₹6,400/sq.ft', growth: '+12.4% YoY' },
    { name: 'Malviya Nagar', price: '₹7,800/sq.ft', growth: '+15.1% YoY' },
    { name: 'Jagatpura', price: '₹4,900/sq.ft', growth: '+18.5% YoY' },
    { name: 'Mansarovar', price: '₹5,600/sq.ft', growth: '+9.8% YoY' },
    { name: 'Ajmer Road', price: '₹4,200/sq.ft', growth: '+14.2% YoY' },
    { name: 'Tonk Road', price: '₹6,100/sq.ft', growth: '+11.0% YoY' },
    { name: 'Indiranagar', price: '₹12,500/sq.ft', growth: '+16.8% YoY' },
    { name: 'Whitefield', price: '₹8,900/sq.ft', growth: '+13.5% YoY' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      updateFilter('searchQuery', searchInput.trim());
      setActiveTab('search');
    }
  };

  const handleVoiceSearch = () => {
    setIsVoiceSearching(true);
    setTimeout(() => {
      const sampleQueries = ['3 BHK in Indiranagar', 'Villas under 1 Cr', 'Ready to move flats', 'Plots in Vaishali Nagar'];
      const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setSearchInput(randomQuery);
      setIsVoiceSearching(false);
      updateFilter('searchQuery', randomQuery);
      setActiveTab('search');
    }, 2200);
  };

  return (
    <div className="flex flex-col gap-8 pb-24">
      
      {/* Voice Search Simulation Modal */}
      {isVoiceSearching && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center flex flex-col items-center gap-4 shadow-2xl border border-slate-100">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 animate-pulse">
                <Mic className="w-10 h-10" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
              </span>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Listening to your voice...</h3>
              <p className="text-xs text-slate-500 mt-1">Speak e.g. "3 BHK in Indiranagar" or "Villas in Whitefield"</p>
            </div>

            <div className="flex items-center gap-1.5 py-2">
              <span className="w-2 h-6 bg-blue-600 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-10 bg-amber-500 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-12 bg-blue-700 rounded-full animate-bounce delay-200"></span>
              <span className="w-2 h-8 bg-emerald-500 rounded-full animate-bounce delay-100"></span>
            </div>

            <button
              onClick={() => setIsVoiceSearching(false)}
              className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Guide Reader Modal */}
      <RealEstateGuideModal
        guide={selectedGuide}
        onClose={() => setSelectedGuide(null)}
      />

      {/* HERO SECTION: Material 3 Surface Header & Controls */}
      <div className="relative bg-gradient-to-b from-blue-100/70 via-indigo-50/40 to-transparent pt-4 pb-6 px-4 rounded-b-3xl border-b border-indigo-100/60 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          
          {/* Header Title & City Switcher */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Find a place that fits your life in
              </p>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2 mt-0.5">
                <span>{selectedCity.name}</span>
                <button
                  onClick={() => setIsCityModalOpen(true)}
                  className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-white text-blue-700 border border-indigo-200 shadow-xs hover:bg-indigo-50 active:scale-95 transition-all flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3 text-amber-500" />
                  <span>Change City</span>
                </button>
              </h1>
            </div>

            {/* List Property CTA */}
            <button
              onClick={() => setIsPostPropertyModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white text-blue-700 font-extrabold text-xs shadow-sm border border-indigo-100 hover:shadow-md transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Post Free Property</span>
              <span className="sm:hidden">Post</span>
            </button>
          </div>

          {/* BUY / RENT Segmented Control (Default BUY) */}
          <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-xs">
            {listingCategories.map(cat => {
              const isActive = listingType === cat.type;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.type}
                  onClick={() => setListingType(cat.type)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-1 rounded-xl text-xs font-black transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm scale-[1.01]' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className="truncate tracking-wide">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box: Text input + Voice Icon + Suggested localities */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-indigo-500/5 p-2 transition-all hover:border-blue-500">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 ml-1">
                <Search className="w-4 h-4" />
              </div>

              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search locality, project, landmark..."
                className="flex-1 bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
              />

              {/* Voice Search Button */}
              <button
                type="button"
                onClick={handleVoiceSearch}
                className="p-2 rounded-xl text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                title="Search by Voice"
              >
                <Mic className="w-4 h-4 text-amber-500" />
              </button>

              {/* Filter Bottom Sheet Trigger */}
              <button
                type="button"
                onClick={() => setIsFilterBottomSheetOpen(true)}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 transition-all active:scale-95 flex items-center justify-center"
                title="Open Advanced Filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </form>

            {/* Recent Searches & Suggested Localities */}
            {currentUser?.recentSearches && currentUser.recentSearches.length > 0 && (
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar px-1">
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3 text-slate-400" />
                  Recent:
                </span>
                {currentUser.recentSearches.slice(0, 4).map((query, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchInput(query);
                      updateFilter('searchQuery', query);
                      setActiveTab('search');
                    }}
                    className="whitespace-nowrap text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-blue-700 border border-slate-200/80 transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Property Type Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[11px] font-extrabold text-slate-500 shrink-0 uppercase tracking-wider">Type:</span>
            {quickTypeChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (chip.type) {
                    updateFilter('propertyTypes', [chip.type]);
                  } else if (chip.action) {
                    chip.action();
                  }
                  setActiveTab('search');
                }}
                className="whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold bg-white hover:bg-blue-600 hover:text-white text-slate-700 border border-slate-200/90 shadow-2xs transition-all active:scale-95"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Budget Shortcut Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[11px] font-extrabold text-slate-500 shrink-0 uppercase tracking-wider">Budget:</span>
            {budgetChips.map((b, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (b.minPrice) updateFilter('minPrice', b.minPrice);
                  if (b.maxPrice) updateFilter('maxPrice', b.maxPrice);
                  setActiveTab('search');
                }}
                className="whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold bg-white text-blue-700 border border-indigo-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-2xs transition-all active:scale-95"
              >
                {b.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* MAIN CONTAINER CONTENT SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-10">

        {/* SECTION: Explore Properties (Horizontal Category Cards) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Browse Catalog</p>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Explore Properties
              </h2>
            </div>
            <button 
              onClick={() => setActiveTab('search')}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
            >
              <span>View All Categories</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            
            {/* Card 1: Buy */}
            <div
              onClick={() => {
                setListingType('buy');
                setActiveTab('search');
              }}
              className="group relative bg-gradient-to-br from-blue-500 to-indigo-700 rounded-3xl p-4 text-white overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between min-h-[140px] active:scale-[0.98]"
            >
              <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10 blur-xs group-hover:scale-125 transition-transform"></div>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-blue-700 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="z-10 mt-3">
                <h3 className="font-black text-base tracking-tight">Buy Homes</h3>
                <p className="text-[11px] text-blue-100 mt-0.5">Verified flats, villas & houses</p>
              </div>
            </div>

            {/* Card 2: Rent */}
            <div
              onClick={() => {
                setListingType('rent');
                setActiveTab('search');
              }}
              className="group relative bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-4 text-white overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between min-h-[140px] active:scale-[0.98]"
            >
              <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10 blur-xs group-hover:scale-125 transition-transform"></div>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Key className="w-5 h-5 text-white" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-emerald-700 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="z-10 mt-3">
                <h3 className="font-black text-base tracking-tight">Rent Homes</h3>
                <p className="text-[11px] text-emerald-100 mt-0.5">Zero brokerage rentals & PGs</p>
              </div>
            </div>

            {/* Card 3: New Projects */}
            <div
              onClick={() => {
                updateFilter('possession', ['under_construction']);
                setActiveTab('search');
              }}
              className="group relative bg-gradient-to-br from-amber-500 to-orange-700 rounded-3xl p-4 text-white overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between min-h-[140px] active:scale-[0.98]"
            >
              <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10 blur-xs group-hover:scale-125 transition-transform"></div>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-amber-700 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="z-10 mt-3">
                <h3 className="font-black text-base tracking-tight">New Projects</h3>
                <p className="text-[11px] text-amber-100 mt-0.5">Tier-1 RERA townships</p>
              </div>
            </div>

            {/* Card 4: Plots */}
            <div
              onClick={() => {
                setListingType('plot');
                setActiveTab('search');
              }}
              className="group relative bg-gradient-to-br from-purple-600 to-indigo-900 rounded-3xl p-4 text-white overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between min-h-[140px] active:scale-[0.98]"
            >
              <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10 blur-xs group-hover:scale-125 transition-transform"></div>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Map className="w-5 h-5 text-white" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-purple-700 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="z-10 mt-3">
                <h3 className="font-black text-base tracking-tight">Plots & Land</h3>
                <p className="text-[11px] text-purple-100 mt-0.5">Residential & commercial plots</p>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION: Popular Localities (Horizontal Chips/Cards) */}
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                High Growth Localities
              </p>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Popular Localities in {selectedCity.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            {popularSampleLocalities.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  updateFilter('searchQuery', item.name);
                  setActiveTab('search');
                }}
                className="shrink-0 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer min-w-[170px] space-y-1.5 active:scale-95"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 truncate">{item.name}</span>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {item.growth}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-semibold">Avg: {item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: Featured Properties */}
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Handpicked Premium Residences</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Featured Properties
              </h2>
            </div>
            <button 
              onClick={() => setActiveTab('search')}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
            >
              <span>View all ({properties.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProperties.map(prop => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>

        {/* SECTION: New Projects */}
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                <Award className="w-4 h-4" />
                <span>RERA Approved Master Townships</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                New Projects
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map(proj => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        </div>

        {/* SECTION: Explore by Property Type (6 Grid Layout) */}
        <div>
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Property Categories</p>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Explore by Property Type
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {propertyTypesGrid.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    updateFilter('propertyTypes', [item.type]);
                    setActiveTab('search');
                  }}
                  className={`group p-4 rounded-3xl border shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between h-28 active:scale-95 ${item.bg}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center shadow-2xs">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>

                  <div>
                    <h3 className="font-black text-sm tracking-tight">{item.title}</h3>
                    <p className="text-[10px] opacity-80 line-clamp-1">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION: Why use Apna Ghar? (4 Feature Cards) */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-extrabold border border-blue-500/30 uppercase tracking-wider">
                Platform Advantage
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-2">
                Why use Apna Ghar?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                India's most trusted real estate ecosystem designed to empower buyers, tenants, and sellers with transparent document verification and direct contacts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white">Verified Information</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  100% physical property inspections, verified floor plans & RERA legal approvals.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white">Smart Search</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Intelligent commute filters, budget sliders, BHK matching & zero brokerage toggles.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white">Direct Enquiries</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Connect straight with verified property owners & builders without paying brokerage fees.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white">Map Discovery</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interactive Leaflet map overlaying metro lines, schools, tech parks & hospital distances.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* SECTION: Popular Localities (Vertical List / Grid) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Market Price Index</p>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Locality Deep-Dive in {selectedCity.name}
              </h2>
            </div>
            <button 
              onClick={() => setActiveTab('search')}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
            >
              <span>Explore all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            {localities.map(loc => (
              <LocalityCard key={loc.id} locality={loc} />
            ))}
          </div>
        </div>

        {/* SECTION: Real Estate Guides (Educational Content Cards) */}
        <div>
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5" />
              Smart Knowledge Hub
            </p>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Real Estate Guides & Educational Checklists
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REAL_ESTATE_GUIDES.map((guide) => {
              const IconComponent = guide.icon;
              return (
                <div
                  key={guide.id}
                  onClick={() => setSelectedGuide(guide)}
                  className="group bg-white p-4 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-3 active:scale-[0.98]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-2xl ${guide.color} text-white flex items-center justify-center shadow-xs`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {guide.readTime}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 block">
                        {guide.category}
                      </span>
                      <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mt-0.5">
                        {guide.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {guide.summary}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-blue-600">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
