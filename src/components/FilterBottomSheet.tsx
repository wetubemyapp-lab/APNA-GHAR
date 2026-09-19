import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  SlidersHorizontal, 
  RotateCcw, 
  Check, 
  ShieldCheck, 
  Sparkles,
  Clock,
  Building2,
  Home,
  Trees,
  Maximize2,
  KeyRound,
  Tag,
  UserCheck,
  Building,
  Dumbbell,
  ShieldAlert,
  Zap,
  Waves,
  Flower2,
  Car,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { BHKType, PropertyType, FurnishingStatus, ListedByType, PossessionStatus } from '../types';

interface FilterBottomSheetProps {
  onClose: () => void;
}

export const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({ onClose }) => {
  const { 
    filterState, 
    updateFilter, 
    resetFilters, 
    filteredProperties,
    listingType,
    setListingType 
  } = useApp();

  // 1. Transaction Types
  const handleTransactionChange = (type: 'buy' | 'rent') => {
    setListingType(type);
    updateFilter('listingType', type);
    // Reset min/max price default boundaries if switching transaction
    if (type === 'rent') {
      updateFilter('minPrice', 0);
      updateFilter('maxPrice', 200000);
    } else {
      updateFilter('minPrice', 0);
      updateFilter('maxPrice', 100000000);
    }
  };

  // 2. Property Types
  const propertyTypeList: { id: PropertyType; label: string; icon: React.ReactNode }[] = [
    { id: 'apartment', label: 'Apartment', icon: <Building2 className="w-4 h-4" /> },
    { id: 'villa', label: 'Villa', icon: <Home className="w-4 h-4" /> },
    { id: 'house', label: 'Independent House', icon: <Home className="w-4 h-4" /> },
    { id: 'plot', label: 'Plot', icon: <Trees className="w-4 h-4" /> },
    { id: 'builder-floor', label: 'Builder Floor', icon: <Building className="w-4 h-4" /> },
    { id: 'studio', label: 'Studio', icon: <Building2 className="w-4 h-4" /> },
    { id: 'commercial', label: 'Commercial', icon: <Building className="w-4 h-4" /> },
  ];

  const togglePropertyType = (type: PropertyType) => {
    const isSelected = filterState.propertyTypes.includes(type);
    const updated = isSelected
      ? filterState.propertyTypes.filter(t => t !== type)
      : [...filterState.propertyTypes, type];
    updateFilter('propertyTypes', updated);
  };

  // 3. Bedrooms (BHK)
  const bhkOptions: { label: string; value: BHKType | 'any' }[] = [
    { label: 'Any', value: 'any' },
    { label: '1 BHK', value: '1BHK' },
    { label: '2 BHK', value: '2BHK' },
    { label: '3 BHK', value: '3BHK' },
    { label: '4+ BHK', value: '4+BHK' },
  ];

  const handleBhkSelect = (val: BHKType | 'any') => {
    if (val === 'any') {
      updateFilter('bhk', []);
    } else {
      const isSelected = filterState.bhk.includes(val as BHKType);
      const updated = isSelected
        ? filterState.bhk.filter(b => b !== val)
        : [...filterState.bhk, val as BHKType];
      updateFilter('bhk', updated);
    }
  };

  // 4. Budget Presets & Inputs
  const buyPresets = [
    { label: 'Under ₹30L', min: 0, max: 3000000 },
    { label: '₹30L – ₹60L', min: 3000000, max: 6000000 },
    { label: '₹60L – ₹1Cr', min: 6000000, max: 10000000 },
    { label: '₹1Cr – ₹2Cr', min: 10000000, max: 20000000 },
    { label: '₹2Cr+', min: 20000000, max: 100000000 },
  ];

  const rentPresets = [
    { label: 'Under ₹15K', min: 0, max: 15000 },
    { label: '₹15K – ₹30K', min: 15000, max: 30000 },
    { label: '₹30K – ₹50K', min: 30000, max: 50000 },
    { label: '₹50K – ₹1L', min: 50000, max: 100000 },
    { label: '₹1L+', min: 100000, max: 500000 },
  ];

  const currentPresets = listingType === 'buy' ? buyPresets : rentPresets;

  // 5. Area Presets
  const areaPresets = [
    { label: 'Under 800 sq.ft', min: 0, max: 800 },
    { label: '800 - 1200 sq.ft', min: 800, max: 1200 },
    { label: '1200 - 1800 sq.ft', min: 1200, max: 1800 },
    { label: '1800+ sq.ft', min: 1800, max: 100000 },
  ];

  // 6. Possession
  const possessionList: { id: PossessionStatus; label: string }[] = [
    { id: 'ready_to_move', label: 'Ready to Move' },
    { id: 'under_construction', label: 'Under Construction' },
    { id: 'new_launch', label: 'New Launch' },
  ];

  const togglePossession = (pos: PossessionStatus) => {
    const isSelected = filterState.possession.includes(pos);
    const updated = isSelected
      ? filterState.possession.filter(p => p !== pos)
      : [...filterState.possession, pos];
    updateFilter('possession', updated);
  };

  // 7. Furnishing
  const furnishingList: { id: FurnishingStatus; label: string }[] = [
    { id: 'fully-furnished', label: 'Fully Furnished' },
    { id: 'semi-furnished', label: 'Semi Furnished' },
    { id: 'unfurnished', label: 'Unfurnished' },
  ];

  const toggleFurnishing = (furn: FurnishingStatus) => {
    const isSelected = filterState.furnishing.includes(furn);
    const updated = isSelected
      ? filterState.furnishing.filter(f => f !== furn)
      : [...filterState.furnishing, furn];
    updateFilter('furnishing', updated);
  };

  // 8. Amenities
  const amenityList: { name: string; label: string; icon: React.ReactNode }[] = [
    { name: 'Parking', label: 'Parking', icon: <Car className="w-4 h-4" /> },
    { name: 'Lift', label: 'Lift', icon: <Building2 className="w-4 h-4" /> },
    { name: 'Security', label: 'Security', icon: <ShieldAlert className="w-4 h-4" /> },
    { name: 'Power Backup', label: 'Power Backup', icon: <Zap className="w-4 h-4" /> },
    { name: 'Swimming Pool', label: 'Swimming Pool', icon: <Waves className="w-4 h-4" /> },
    { name: 'Gym', label: 'Gym', icon: <Dumbbell className="w-4 h-4" /> },
    { name: 'Club House', label: 'Club House', icon: <Building className="w-4 h-4" /> },
    { name: 'Garden', label: 'Garden', icon: <Flower2 className="w-4 h-4" /> },
  ];

  const toggleAmenity = (amenityName: string) => {
    const isSelected = filterState.amenities.includes(amenityName);
    const updated = isSelected
      ? filterState.amenities.filter(a => a !== amenityName)
      : [...filterState.amenities, amenityName];
    updateFilter('amenities', updated);
  };

  // 9. Posted By
  const listedByList: { id: ListedByType; label: string }[] = [
    { id: 'owner', label: 'Owner' },
    { id: 'agent', label: 'Agent' },
    { id: 'builder', label: 'Builder' },
  ];

  const toggleListedBy = (listed: ListedByType) => {
    const isSelected = filterState.listedBy.includes(listed);
    const updated = isSelected
      ? filterState.listedBy.filter(l => l !== listed)
      : [...filterState.listedBy, listed];
    updateFilter('listedBy', updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh] sm:max-h-[85vh] transition-all">
        
        {/* Mobile Drag Indicator Pill */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-slate-50 border-b border-slate-100">
          <div className="w-12 h-1.5 rounded-full bg-slate-300"></div>
        </div>

        {/* Top Sticky Header */}
        <div className="p-4 sm:px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#3949AB] text-white flex items-center justify-center shadow-md">
              <SlidersHorizontal className="w-4.5 h-4.5 text-[#F4A62A]" />
            </div>
            <div>
              <h2 className="font-black text-lg text-slate-900 leading-tight">Filter Properties</h2>
              <p className="text-xs text-slate-500 font-medium">Customize your home search parameters</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200/80 text-slate-600 transition-colors"
            title="Close Filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filter Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-6 text-xs divide-y divide-slate-100">
          
          {/* SECTION 1: Transaction (Buy / Rent) */}
          <div className="pt-1">
            <label className="block font-black text-slate-900 text-sm mb-2.5">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/60">
              <button
                type="button"
                onClick={() => handleTransactionChange('buy')}
                className={`py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
                  listingType === 'buy' 
                    ? 'bg-[#3949AB] text-white shadow-md' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Buy</span>
              </button>
              <button
                type="button"
                onClick={() => handleTransactionChange('rent')}
                className={`py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
                  listingType === 'rent' 
                    ? 'bg-[#3949AB] text-white shadow-md' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Rent</span>
              </button>
            </div>
          </div>

          {/* SECTION 2: Property Type */}
          <div className="pt-5">
            <label className="block font-black text-slate-900 text-sm mb-2.5">
              Property Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {propertyTypeList.map(pt => {
                const isSelected = filterState.propertyTypes.includes(pt.id);
                return (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => togglePropertyType(pt.id)}
                    className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 font-bold transition-all active:scale-98 ${
                      isSelected 
                        ? 'bg-indigo-50/80 border-[#3949AB] text-[#3949AB] ring-1 ring-[#3949AB]' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className={isSelected ? 'text-[#3949AB]' : 'text-slate-400'}>{pt.icon}</span>
                    <span className="truncate flex-1">{pt.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#3949AB] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: Budget Range (Min / Max Inputs & Presets) */}
          <div className="pt-5">
            <div className="flex items-center justify-between mb-2.5">
              <label className="font-black text-slate-900 text-sm">Budget</label>
              <span className="text-xs font-bold text-[#3949AB]">
                {filterState.minPrice === 0 && filterState.maxPrice >= 100000000 
                  ? 'Any Price' 
                  : listingType === 'buy'
                  ? `₹${(filterState.minPrice / 100000).toFixed(0)}L – ₹${(filterState.maxPrice / 100000).toFixed(0)}L`
                  : `₹${filterState.minPrice.toLocaleString()} – ₹${filterState.maxPrice.toLocaleString()}/mo`}
              </span>
            </div>

            {/* Min / Max Inputs */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Min Price (₹)</span>
                <input 
                  type="number"
                  placeholder="Min Budget"
                  value={filterState.minPrice || ''}
                  onChange={(e) => updateFilter('minPrice', Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#3949AB] focus:ring-1 focus:ring-[#3949AB] font-bold text-xs text-slate-900"
                />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Max Price (₹)</span>
                <input 
                  type="number"
                  placeholder="Max Budget"
                  value={filterState.maxPrice === 100000000 ? '' : filterState.maxPrice}
                  onChange={(e) => updateFilter('maxPrice', Number(e.target.value) || 100000000)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#3949AB] focus:ring-1 focus:ring-[#3949AB] font-bold text-xs text-slate-900"
                />
              </div>
            </div>

            {/* Presets Chips */}
            <div className="flex flex-wrap gap-2">
              {currentPresets.map((preset, idx) => {
                const isActive = filterState.minPrice === preset.min && filterState.maxPrice === preset.max;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      updateFilter('minPrice', preset.min);
                      updateFilter('maxPrice', preset.max);
                    }}
                    className={`px-3 py-1.5 rounded-full border font-bold text-xs transition-all active:scale-95 ${
                      isActive 
                        ? 'bg-[#3949AB] text-white border-[#3949AB] shadow-xs' 
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: Bedrooms (Bedrooms) */}
          <div className="pt-5">
            <label className="block font-black text-slate-900 text-sm mb-2.5">
              Bedrooms (BHK)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {bhkOptions.map(item => {
                const isSelected = item.value === 'any' 
                  ? filterState.bhk.length === 0 
                  : filterState.bhk.includes(item.value as BHKType);

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleBhkSelect(item.value)}
                    className={`py-2.5 rounded-2xl border text-center font-bold text-xs transition-all active:scale-95 ${
                      isSelected 
                        ? 'bg-[#3949AB] text-white border-[#3949AB] shadow-xs' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 5: Area (Min / Max sq.ft.) */}
          <div className="pt-5">
            <div className="flex items-center justify-between mb-2.5">
              <label className="font-black text-slate-900 text-sm">Area (sq.ft)</label>
              <span className="text-xs font-bold text-[#3949AB]">
                {filterState.minArea === 0 && (filterState.maxArea >= 100000 || filterState.maxArea === 0)
                  ? 'Any Area' 
                  : `${filterState.minArea} – ${filterState.maxArea} sq.ft`}
              </span>
            </div>

            {/* Min / Max Area Inputs */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Min sq.ft</span>
                <input 
                  type="number"
                  placeholder="Min sq.ft"
                  value={filterState.minArea || ''}
                  onChange={(e) => updateFilter('minArea', Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#3949AB] focus:ring-1 focus:ring-[#3949AB] font-bold text-xs text-slate-900"
                />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Max sq.ft</span>
                <input 
                  type="number"
                  placeholder="Max sq.ft"
                  value={filterState.maxArea === 100000 ? '' : filterState.maxArea}
                  onChange={(e) => updateFilter('maxArea', Number(e.target.value) || 100000)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#3949AB] focus:ring-1 focus:ring-[#3949AB] font-bold text-xs text-slate-900"
                />
              </div>
            </div>

            {/* Area Presets */}
            <div className="flex flex-wrap gap-2">
              {areaPresets.map((preset, idx) => {
                const isActive = filterState.minArea === preset.min && filterState.maxArea === preset.max;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      updateFilter('minArea', preset.min);
                      updateFilter('maxArea', preset.max);
                    }}
                    className={`px-3 py-1.5 rounded-full border font-bold text-xs transition-all active:scale-95 ${
                      isActive 
                        ? 'bg-[#3949AB] text-white border-[#3949AB] shadow-xs' 
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 6: Possession */}
          <div className="pt-5">
            <label className="block font-black text-slate-900 text-sm mb-2.5">
              Possession
            </label>
            <div className="grid grid-cols-3 gap-2">
              {possessionList.map(pos => {
                const isSelected = filterState.possession.includes(pos.id);
                return (
                  <button
                    key={pos.id}
                    type="button"
                    onClick={() => togglePossession(pos.id)}
                    className={`p-2.5 rounded-2xl border text-center font-bold text-xs transition-all active:scale-95 ${
                      isSelected 
                        ? 'bg-indigo-50 border-[#3949AB] text-[#3949AB] ring-1 ring-[#3949AB]' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {pos.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 7: Furnishing */}
          <div className="pt-5">
            <label className="block font-black text-slate-900 text-sm mb-2.5">
              Furnishing
            </label>
            <div className="grid grid-cols-3 gap-2">
              {furnishingList.map(furn => {
                const isSelected = filterState.furnishing.includes(furn.id);
                return (
                  <button
                    key={furn.id}
                    type="button"
                    onClick={() => toggleFurnishing(furn.id)}
                    className={`p-2.5 rounded-2xl border text-center font-bold text-xs transition-all active:scale-95 ${
                      isSelected 
                        ? 'bg-indigo-50 border-[#3949AB] text-[#3949AB] ring-1 ring-[#3949AB]' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {furn.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 8: Amenities */}
          <div className="pt-5">
            <label className="block font-black text-slate-900 text-sm mb-2.5">
              Amenities
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {amenityList.map(am => {
                const isSelected = filterState.amenities.includes(am.name);
                return (
                  <button
                    key={am.name}
                    type="button"
                    onClick={() => toggleAmenity(am.name)}
                    className={`p-2.5 rounded-2xl border flex items-center gap-2 font-bold text-xs transition-all active:scale-95 ${
                      isSelected 
                        ? 'bg-indigo-50 border-[#3949AB] text-[#3949AB] ring-1 ring-[#3949AB]' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className={isSelected ? 'text-[#3949AB]' : 'text-slate-400'}>{am.icon}</span>
                    <span className="truncate">{am.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 9: Posted By */}
          <div className="pt-5">
            <label className="block font-black text-slate-900 text-sm mb-2.5">
              Posted By
            </label>
            <div className="grid grid-cols-3 gap-2">
              {listedByList.map(item => {
                const isSelected = filterState.listedBy.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleListedBy(item.id)}
                    className={`p-2.5 rounded-2xl border text-center font-bold text-xs transition-all active:scale-95 ${
                      isSelected 
                        ? 'bg-indigo-50 border-[#3949AB] text-[#3949AB] ring-1 ring-[#3949AB]' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 10: Additional (Verified, No Brokerage, Recently Added) */}
          <div className="pt-5 pb-2">
            <label className="block font-black text-slate-900 text-sm mb-2.5">
              Additional Options
            </label>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col gap-3">
              
              {/* Verified */}
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-xl bg-emerald-100 text-emerald-700">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Verified Properties Only</span>
                    <span className="text-[10px] text-slate-500">Verified by Nestora field agents</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={filterState.verifiedOnly}
                  onChange={(e) => updateFilter('verifiedOnly', e.target.checked)}
                  className="w-5 h-5 accent-[#3949AB] rounded-lg cursor-pointer"
                />
              </label>

              {/* No Brokerage */}
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-xl bg-amber-100 text-amber-700">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">No Brokerage (Direct Owner)</span>
                    <span className="text-[10px] text-slate-500">Zero commission listings directly from owners</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={filterState.zeroBrokerage}
                  onChange={(e) => updateFilter('zeroBrokerage', e.target.checked)}
                  className="w-5 h-5 accent-[#3949AB] rounded-lg cursor-pointer"
                />
              </label>

              {/* Recently Added */}
              <label className="flex items-center justify-between cursor-pointer group p-1.5 rounded-xl hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-xl bg-indigo-100 text-indigo-700">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Recently Added Properties</span>
                    <span className="text-[10px] text-slate-500">Show newly listed properties</span>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterState.recentlyAdded || false}
                    onChange={(e) => updateFilter('recentlyAdded', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#3949AB]"></div>
                </div>
              </label>

            </div>
          </div>

        </div>

        {/* Bottom Sticky Controls */}
        <div className="p-4 sm:px-6 border-t border-slate-200 bg-white sticky bottom-0 z-10 flex items-center justify-between gap-3 shadow-lg">
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-all active:scale-95 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-2xl bg-[#3949AB] hover:bg-[#283593] text-white font-black text-sm shadow-md shadow-indigo-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span>Show Results ({filteredProperties.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
