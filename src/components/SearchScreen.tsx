import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from './PropertyCard';
import { MapView } from './MapView';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  Map as MapIcon, 
  List, 
  RotateCcw, 
  ArrowUpDown,
  Mic,
  MapPin,
  Building2,
  Construction,
  Compass,
  Clock,
  ArrowRight,
  TrendingUp,
  Building,
  Check,
  ChevronRight,
  Navigation,
  Sparkles,
  Tag,
  ArrowLeft,
  ChevronDown
} from 'lucide-react';
import { BHKType, PropertyType } from '../types';

type SearchByTab = 'locality' | 'project' | 'builder' | 'landmark';

interface AutocompleteSuggestion {
  id: string;
  title: string;
  subtitle: string;
  type: SearchByTab;
  badgeText: string;
  propertyCount?: number;
}

export const SearchScreen: React.FC = () => {
  const { 
    properties,
    filteredProperties, 
    filterState, 
    updateFilter, 
    resetFilters,
    setIsFilterBottomSheetOpen,
    activeFilterCount,
    selectedCity,
    listingType,
    setListingType,
    showToast,
    currentUser,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches
  } = useApp();

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isListening, setIsListening] = useState(false);
  const [searchByTab, setSearchByTab] = useState<SearchByTab>('locality');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [hasExecutedSearch, setHasExecutedSearch] = useState<boolean>(() => {
    return filterState.searchQuery.trim().length > 0;
  });

  // Quick BHK chips
  const bhkOptions: BHKType[] = ['1BHK', '2BHK', '3BHK', '4BHK'];

  const toggleBhkChip = (bhk: BHKType) => {
    const isSelected = filterState.bhk.includes(bhk);
    const newBhk = isSelected 
      ? filterState.bhk.filter(b => b !== bhk)
      : [...filterState.bhk, bhk];
    updateFilter('bhk', newBhk);
  };

  const handleSelectQuery = (query: string) => {
    updateFilter('searchQuery', query);
    addRecentSearch(query);
    setHasExecutedSearch(true);
    setIsInputFocused(false);
    showToast(`Showing results for "${query}"`, 'info');
  };

  const handleClearSearch = () => {
    updateFilter('searchQuery', '');
    setHasExecutedSearch(false);
  };

  const simulateVoiceSearch = () => {
    setIsListening(true);
    showToast('Listening... (e.g., "3 BHK in Indiranagar")', 'info');
    setTimeout(() => {
      setIsListening(false);
      const query = 'Indiranagar';
      handleSelectQuery(query);
    }, 1800);
  };

  // Recent Searches list fallback
  const recentSearchesList = useMemo(() => {
    if (currentUser.recentSearches && currentUser.recentSearches.length > 0) {
      return currentUser.recentSearches;
    }
    return ['2 BHK in Indiranagar', 'Villas in Whitefield', 'Malviya Nagar', 'Flats near Hitec City', 'Ready to move Bandra'];
  }, [currentUser.recentSearches]);

  // Popular Near You items
  const popularNearYou = useMemo(() => {
    return [
      { name: 'Indiranagar', type: 'Locality', count: '42+ Listings', query: 'Indiranagar' },
      { name: 'Whitefield', type: 'Locality', count: '65+ Listings', query: 'Whitefield' },
      { name: 'Malviya Nagar', type: 'Locality', count: '28+ Listings', query: 'Malviya Nagar' },
      { name: 'HSR Layout', type: 'Locality', count: '30+ Listings', query: 'HSR Layout' },
      { name: 'Koramangala', type: 'Locality', count: '38+ Listings', query: 'Koramangala' },
      { name: 'Phoenix Mall Area', type: 'Landmark', count: '18+ Listings', query: 'Phoenix Mall' },
      { name: 'MG Road Metro Corridor', type: 'Landmark', count: '24+ Listings', query: 'Metro Station' },
    ];
  }, []);

  // Search By Category Items
  const searchByCategory = useMemo(() => {
    return {
      locality: [
        { title: 'Indiranagar', location: 'Bengaluru, Karnataka', count: 42 },
        { title: 'Whitefield', location: 'Bengaluru, Karnataka', count: 65 },
        { title: 'Malviya Nagar', location: 'Jaipur / NCR Region', count: 28 },
        { title: 'Bandra West', location: 'Mumbai, Maharashtra', count: 34 },
        { title: 'Golf Course Road', location: 'Gurugram, Delhi NCR', count: 50 },
        { title: 'Hitec City', location: 'Hyderabad, Telangana', count: 45 },
        { title: 'Baner', location: 'Pune, Maharashtra', count: 38 },
        { title: 'OMR Road Corridor', location: 'Chennai, Tamil Nadu', count: 32 }
      ],
      project: [
        { title: 'Indira Skyviews', location: 'Indiranagar, Bengaluru', count: 12, builder: 'Prestige Estates' },
        { title: 'Prestige Park Grove', location: 'Whitefield, Bengaluru', count: 24, builder: 'Prestige Estates' },
        { title: 'Sobha Dream Acres', location: 'Panathur, Bengaluru', count: 18, builder: 'Sobha Developers' },
        { title: 'Malviya Nagar Apartments', location: 'Malviya Nagar', count: 15, builder: 'Residential Board' },
        { title: 'Godrej Air', location: 'Hoodi, Bengaluru', count: 20, builder: 'Godrej Properties' },
        { title: 'DLF Ultima', location: 'Sector 81, Gurugram', count: 28, builder: 'DLF Homes' },
        { title: 'Lodha Park Towers', location: 'Worli, Mumbai', count: 19, builder: 'Lodha Group' }
      ],
      builder: [
        { title: 'Prestige Estates', location: '42 Active Projects Nationwide', count: 140 },
        { title: 'Sobha Developers', location: '38 Premium Residential Projects', count: 110 },
        { title: 'Godrej Properties', location: '55 Sustainable Green Communities', count: 165 },
        { title: 'Brigade Group', location: '31 Integrated Smart Townships', count: 95 },
        { title: 'DLF Homes', location: '48 Luxury Ultra-High Rise Towers', count: 180 },
        { title: 'Lodha Group', location: '50 Luxury Iconic Developments', count: 155 }
      ],
      landmark: [
        { title: 'Near Indiranagar Metro Station', location: 'Within 1.2 km Corridor', count: 35 },
        { title: 'Near Malviya Nagar Metro Station', location: 'Within 800m Walk', count: 22 },
        { title: 'Near Tech Park & IT Corridors', location: 'Within 2.0 km Tech Hub', count: 85 },
        { title: 'Near Phoenix Marketcity Mall', location: 'Within 1.0 km Shopping Belt', count: 40 },
        { title: 'Near World Trade Park', location: 'Commercial Central Sector', count: 18 },
        { title: 'Near International Airport Expressway', location: 'Within 25 mins Drive', count: 52 }
      ]
    };
  }, []);

  // Real-time Autocomplete Suggestions generator
  const suggestions: AutocompleteSuggestion[] = useMemo(() => {
    const q = filterState.searchQuery.trim().toLowerCase();
    if (!q) return [];

    const items: AutocompleteSuggestion[] = [];

    // Check query for "malviya" or any query string to match requirements
    if (q.includes('malviya') || q.includes('mal')) {
      items.push({
        id: 'sug-mal-1',
        title: 'Malviya Nagar',
        subtitle: 'Popular Locality in Jaipur / NCR',
        type: 'locality',
        badgeText: 'Locality',
        propertyCount: 28
      });
      items.push({
        id: 'sug-mal-2',
        title: 'Malviya Nagar Apartments',
        subtitle: 'Gated Luxury Society in Malviya Nagar',
        type: 'project',
        badgeText: 'Project',
        propertyCount: 15
      });
      items.push({
        id: 'sug-mal-3',
        title: 'Projects near Malviya Nagar',
        subtitle: 'Top Builder Projects in & around Malviya Nagar',
        type: 'project',
        badgeText: 'Project Group',
        propertyCount: 42
      });
      items.push({
        id: 'sug-mal-4',
        title: 'Sobha & Prestige Projects in Malviya Nagar',
        subtitle: 'Verified Builder Residential Schemes',
        type: 'builder',
        badgeText: 'Builder',
        propertyCount: 12
      });
      items.push({
        id: 'sug-mal-5',
        title: 'Near Malviya Nagar Metro Station',
        subtitle: 'Properties within 1 km of Metro Corridor',
        type: 'landmark',
        badgeText: 'Landmark',
        propertyCount: 20
      });
    }

    // Dynamic matches from properties database
    properties.forEach(prop => {
      // Locality match
      if (prop.locality.toLowerCase().includes(q) && !items.some(i => i.title.toLowerCase() === prop.locality.toLowerCase())) {
        items.push({
          id: `loc-${prop.id}`,
          title: prop.locality,
          subtitle: `${prop.city}, ${prop.state}`,
          type: 'locality',
          badgeText: 'Locality',
          propertyCount: 25
        });
      }
      // Project match
      if (prop.projectName && prop.projectName.toLowerCase().includes(q) && !items.some(i => i.title.toLowerCase() === prop.projectName?.toLowerCase())) {
        items.push({
          id: `proj-${prop.id}`,
          title: prop.projectName,
          subtitle: `Project in ${prop.locality}, ${prop.city}`,
          type: 'project',
          badgeText: 'Project',
          propertyCount: 8
        });
      }
      // Builder match
      if (prop.builderName && prop.builderName.toLowerCase().includes(q) && !items.some(i => i.title.toLowerCase() === prop.builderName?.toLowerCase())) {
        items.push({
          id: `bld-${prop.id}`,
          title: prop.builderName,
          subtitle: `Verified Premium Developer`,
          type: 'builder',
          badgeText: 'Builder',
          propertyCount: 30
        });
      }
    });

    // Generic fallback suggestions for typed string if list is short
    if (items.length < 3) {
      const formattedTitle = q.charAt(0).toUpperCase() + q.slice(1);
      items.push({
        id: `gen-1-${q}`,
        title: `${formattedTitle}`,
        subtitle: `Localities matching "${formattedTitle}" in ${selectedCity.name}`,
        type: 'locality',
        badgeText: 'Locality'
      });
      items.push({
        id: `gen-2-${q}`,
        title: `${formattedTitle} Apartments`,
        subtitle: `Residential Gated Communities in ${selectedCity.name}`,
        type: 'project',
        badgeText: 'Project'
      });
      items.push({
        id: `gen-3-${q}`,
        title: `Projects near ${formattedTitle}`,
        subtitle: `Verified New Project Launches`,
        type: 'project',
        badgeText: 'Projects Group'
      });
      items.push({
        id: `gen-4-${q}`,
        title: `Near ${formattedTitle} Landmark / Metro`,
        subtitle: `Proximity to key transit & business hubs`,
        type: 'landmark',
        badgeText: 'Landmark'
      });
    }

    return items;
  }, [filterState.searchQuery, properties, selectedCity]);

  // Render Category Icon helper
  const renderCategoryIcon = (type: SearchByTab) => {
    switch (type) {
      case 'locality':
        return <MapPin className="w-4 h-4 text-emerald-600" />;
      case 'project':
        return <Building2 className="w-4 h-4 text-indigo-600" />;
      case 'builder':
        return <Construction className="w-4 h-4 text-amber-600" />;
      case 'landmark':
        return <Compass className="w-4 h-4 text-cyan-600" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-slate-50">
      
      {/* Sticky Search & Filter Header Bar */}
      <div className="sticky top-[53px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
          
          {/* Main Search Input Group (Back Button + Input + Voice + Filters Icon) */}
          <div className="flex items-center gap-2">
            {/* Back Button (shown when search active or input focused) */}
            {(hasExecutedSearch || filterState.searchQuery || isInputFocused) && (
              <button
                onClick={() => {
                  if (hasExecutedSearch) {
                    setHasExecutedSearch(false);
                  } else {
                    handleClearSearch();
                  }
                  setIsInputFocused(false);
                }}
                className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-all shrink-0 active:scale-95 border border-slate-200/80"
                title="Go Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            <div className="relative flex-1 flex items-center bg-slate-100/90 rounded-2xl border border-slate-200/80 focus-within:border-[#3949AB] focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition-all shadow-xs">
              <Search className="w-4.5 h-4.5 text-[#3949AB] ml-3.5 shrink-0" />
              <input
                type="text"
                value={filterState.searchQuery}
                onFocus={() => setIsInputFocused(true)}
                onChange={(e) => {
                  updateFilter('searchQuery', e.target.value);
                  setHasExecutedSearch(false);
                  setIsInputFocused(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filterState.searchQuery.trim()) {
                    handleSelectQuery(filterState.searchQuery.trim());
                  }
                }}
                placeholder={`Search ${selectedCity.name} by locality, project, builder, landmark...`}
                className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none"
              />

              {filterState.searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="p-1.5 text-slate-400 hover:text-slate-700 mr-1 rounded-full hover:bg-slate-200/60 transition-all"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={simulateVoiceSearch}
                className={`p-2 mr-1 rounded-xl transition-all ${
                  isListening ? 'bg-rose-500 text-white animate-pulse' : 'text-slate-500 hover:text-[#3949AB] hover:bg-indigo-50'
                }`}
                title="Voice Search"
              >
                <Mic className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Filter Bottom Sheet Trigger Button */}
            <button
              onClick={() => setIsFilterBottomSheetOpen(true)}
              className={`relative flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl font-bold text-xs border transition-all active:scale-95 shrink-0 ${
                activeFilterCount > 0 
                  ? 'bg-[#3949AB] text-white border-[#3949AB] shadow-xs' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4.5 h-4.5 rounded-full bg-[#F4A62A] text-slate-950 font-bold text-[10px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Quick Filter Pill Chips Row (Buy/Rent, Property Type, Budget, Bedrooms, More Filters) */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {/* Buy / Rent Switch */}
              <button
                onClick={() => setListingType(listingType === 'buy' ? 'rent' : 'buy')}
                className="px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-[#3949AB] border border-indigo-200 whitespace-nowrap active:scale-95 shadow-2xs"
              >
                {listingType === 'buy' ? '🏷️ Buy' : '🔑 Rent'}
              </button>

              {/* Property Type Quick Selectors */}
              {[
                { label: 'All Types', value: 'all' },
                { label: 'Apartments', value: 'apartment' },
                { label: 'Villas', value: 'villa' },
                { label: 'Houses', value: 'house' },
                { label: 'Plots', value: 'plot' },
                { label: 'Builder Floors', value: 'builder-floor' }
              ].map((pType) => {
                const isSelected = pType.value === 'all' 
                  ? filterState.propertyTypes.length === 0 
                  : filterState.propertyTypes.includes(pType.value as PropertyType);

                return (
                  <button
                    key={pType.value}
                    onClick={() => {
                      if (pType.value === 'all') {
                        updateFilter('propertyTypes', []);
                      } else {
                        const exists = filterState.propertyTypes.includes(pType.value as PropertyType);
                        if (exists) {
                          updateFilter('propertyTypes', filterState.propertyTypes.filter((t: PropertyType) => t !== pType.value));
                        } else {
                          updateFilter('propertyTypes', [...filterState.propertyTypes, pType.value as PropertyType]);
                        }
                      }
                      setHasExecutedSearch(true);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all active:scale-95 ${
                      isSelected 
                        ? 'bg-[#3949AB] text-white border-[#3949AB]' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {pType.label}
                  </button>
                );
              })}

              {/* Budget Quick Shortcuts */}
              {[
                { label: 'Under ₹30L', max: 3000000 },
                { label: '₹30L–₹60L', min: 3000000, max: 6000000 },
                { label: '₹60L–₹1Cr', min: 6000000, max: 10000000 },
                { label: '₹1Cr+', min: 10000000 }
              ].map((bItem, idx) => {
                const isSelected = filterState.maxPrice === bItem.max && filterState.minPrice === (bItem.min || 0);

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (isSelected) {
                        updateFilter('minPrice', 0);
                        updateFilter('maxPrice', 50000000);
                      } else {
                        updateFilter('minPrice', bItem.min || 0);
                        updateFilter('maxPrice', bItem.max || 50000000);
                      }
                      setHasExecutedSearch(true);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all active:scale-95 ${
                      isSelected 
                        ? 'bg-[#F4A62A] text-slate-950 font-bold border-[#F4A62A]' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {bItem.label}
                  </button>
                );
              })}

              {/* BHK chips */}
              {bhkOptions.map(bhk => {
                const isSelected = filterState.bhk.includes(bhk);
                return (
                  <button
                    key={bhk}
                    onClick={() => {
                      toggleBhkChip(bhk);
                      setHasExecutedSearch(true);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all active:scale-95 ${
                      isSelected 
                        ? 'bg-[#3949AB] text-white border-[#3949AB]' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {bhk}
                  </button>
                );
              })}

              {/* Verified Owner / Zero Brokerage */}
              <button
                onClick={() => {
                  updateFilter('zeroBrokerage', !filterState.zeroBrokerage);
                  setHasExecutedSearch(true);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all active:scale-95 ${
                  filterState.zeroBrokerage 
                    ? 'bg-emerald-600 text-white border-emerald-600' 
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                Zero Brokerage
              </button>
            </div>

            {/* List / Map Switcher Button */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 shrink-0">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white text-[#3949AB] shadow-2xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'map' 
                    ? 'bg-white text-[#3949AB] shadow-2xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Map View"
              >
                <MapIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Body: Either Autocomplete Suggestions / Search Discovery OR Search Results */}

      {/* -------------------------------------------------------------------------------- */}
      {/* REAL-TIME AUTOCOMPLETE SUGGESTIONS PANEL (When typing) */}
      {/* -------------------------------------------------------------------------------- */}
      {filterState.searchQuery.trim().length > 0 && !hasExecutedSearch ? (
        <div className="max-w-7xl mx-auto w-full px-4 pt-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-4">
            
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Sparkles className="w-4 h-4 text-[#3949AB]" />
                <span>Suggestions for "{filterState.searchQuery}"</span>
              </div>
              <button
                onClick={() => handleSelectQuery(filterState.searchQuery)}
                className="text-xs font-bold text-[#3949AB] hover:underline flex items-center gap-1"
              >
                <span>Search All Results</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List of Autocomplete Suggestions */}
            <div className="divide-y divide-slate-100">
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectQuery(item.title)}
                  className="w-full text-left py-3 px-2 flex items-center justify-between hover:bg-slate-50 rounded-xl transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                      {renderCategoryIcon(item.type)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-[#3949AB] transition-colors flex items-center gap-2">
                        <span>{item.title}</span>
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                      {item.badgeText}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#3949AB] group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Action Footer inside Suggestions */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleSelectQuery(filterState.searchQuery)}
                className="w-full py-2.5 bg-[#3949AB] hover:bg-[#283593] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
              >
                <Search className="w-4 h-4" />
                <span>Show All Properties for "{filterState.searchQuery}"</span>
              </button>
            </div>

          </div>
        </div>
      ) : !hasExecutedSearch ? (
        
        /* -------------------------------------------------------------------------------- */
        /* DEDICATED SEARCH SCREEN DISCOVERY VIEW (Recent Searches, Popular Near You, Search By) */
        /* -------------------------------------------------------------------------------- */
        <div className="max-w-7xl mx-auto w-full px-4 pt-4 space-y-6">
          
          {/* SECTION 1: RECENT SEARCHES */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Clock className="w-4 h-4 text-[#3949AB]" />
                <span>Recent Searches</span>
              </div>
              {recentSearchesList.length > 0 && (
                <button
                  onClick={clearRecentSearches}
                  className="text-xs font-semibold text-slate-400 hover:text-rose-600 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {recentSearchesList.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No recent searches yet.</p>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                {recentSearchesList.map((query, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200/80 transition-all cursor-pointer group"
                  >
                    <span 
                      onClick={() => handleSelectQuery(query)}
                      className="group-hover:text-[#3949AB]"
                    >
                      {query}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(query);
                      }}
                      className="text-slate-400 hover:text-rose-500 p-0.5 rounded-full hover:bg-slate-300/50 transition-colors"
                      title="Remove"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 2: POPULAR NEAR YOU */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Popular Near You ({selectedCity.name})</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {popularNearYou.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectQuery(item.query)}
                  className="flex flex-col text-left p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200/70 hover:border-indigo-200 transition-all group active:scale-98"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-[#3949AB] truncate">
                      {item.name}
                    </span>
                    <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#3949AB] shrink-0" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{item.type}</span>
                    <span className="font-semibold text-emerald-600">{item.count}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 3: SEARCH BY TABS (Locality, Project, Builder, Landmark) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3.5">
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#3949AB]" />
                <span>Search by</span>
              </div>
            </div>

            {/* Category Tabs: Locality, Project, Builder, Landmark */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-4 overflow-x-auto no-scrollbar">
              {(['locality', 'project', 'builder', 'landmark'] as SearchByTab[]).map((tab) => {
                const isActive = searchByTab === tab;
                const labels: Record<SearchByTab, string> = {
                  locality: '📍 Locality',
                  project: '🏢 Project',
                  builder: '🏗️ Builder',
                  landmark: '🚇 Landmark'
                };

                return (
                  <button
                    key={tab}
                    onClick={() => setSearchByTab(tab)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                      isActive 
                        ? 'bg-[#3949AB] text-white shadow-xs' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                    }`}
                  >
                    {labels[tab]}
                  </button>
                );
              })}
            </div>

            {/* Content for selected "Search by" Tab */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {searchByCategory[searchByTab].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectQuery(item.title)}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-[#3949AB] hover:bg-indigo-50/40 transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                      {renderCategoryIcon(searchByTab)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#3949AB] transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {item.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {item.count} Listings
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#3949AB] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              ))}
            </div>

          </div>

        </div>
      ) : (

        /* -------------------------------------------------------------------------------- */
        /* SEARCH RESULTS VIEW (Properties Grid, Count Header, Map/List Toggle) */
        /* -------------------------------------------------------------------------------- */
        <div className="max-w-7xl mx-auto w-full px-4 pt-4 flex-1">
          
          {/* Active Query Banner / Modify Search Bar */}
          <div className="flex items-center justify-between bg-indigo-50/80 border border-indigo-100 rounded-2xl p-3 mb-3 text-xs text-slate-800">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#3949AB] shrink-0" />
              <span>
                Active Search: <strong className="font-extrabold text-[#3949AB]">"{filterState.searchQuery}"</strong>
              </span>
            </div>
            <button
              onClick={() => {
                setHasExecutedSearch(false);
                setIsInputFocused(true);
              }}
              className="text-[#3949AB] font-bold hover:underline flex items-center gap-1"
            >
              <span>Modify Search</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Results Metadata & Sort Bar */}
          <div className="flex items-center justify-between pb-3 text-xs text-slate-600">
            <div>
              <span className="font-extrabold text-slate-900 text-sm">{filteredProperties.length}</span> properties found in{' '}
              <strong className="text-slate-800 font-semibold">{filterState.locality || filterState.searchQuery || selectedCity.name}</strong>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filterState.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value as any)}
                className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer text-xs"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rate_sqft">Rate: ₹/sq.ft Low-High</option>
                <option value="area">Area: Largest First</option>
                <option value="newest">Newest Listed First</option>
              </select>
            </div>
          </div>

          {/* View Mode: Map vs List */}
          {viewMode === 'map' ? (
            <div className="h-[calc(100vh-230px)] rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
              <MapView properties={filteredProperties} />
            </div>
          ) : (
            <>
              {filteredProperties.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 mt-2">
                  <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-[#3949AB] mb-3">
                    <Building className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No properties match your exact filters</h3>
                  <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
                    Try adjusting the budget range, clearing the search keyword, or resetting filters to view all verified properties.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        handleClearSearch();
                        resetFilters();
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3949AB] text-white font-bold text-xs shadow-sm hover:bg-[#283593] transition-all active:scale-95"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset All Filters</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Property Cards Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      )}

    </div>
  );
};
