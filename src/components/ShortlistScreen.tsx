import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from './PropertyCard';
import { CompareModal } from './CompareModal';
import { 
  Heart, 
  Scale, 
  Trash2, 
  Building2, 
  Search, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const ShortlistScreen: React.FC = () => {
  const { 
    savedProperties, 
    currentUser, 
    setCurrentUser, 
    setActiveTab, 
    comparePropertyIds,
    isCompareModalOpen,
    setIsCompareModalOpen,
    showToast 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'all' | 'buy' | 'rent'>('all');

  const filteredSaved = savedProperties.filter(prop => {
    if (activeSubTab === 'buy') return prop.listingType === 'buy';
    if (activeSubTab === 'rent') return prop.listingType === 'rent';
    return true;
  });

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your saved shortlist?')) {
      setCurrentUser(prev => ({
        ...prev,
        savedPropertyIds: []
      }));
      showToast('Shortlist cleared', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 pb-24 flex flex-col gap-5">
      
      {/* Header with Compare Launcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
              <Heart className="w-4 h-4 fill-rose-500" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              My Shortlisted Properties ({savedProperties.length})
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare specs, prices, and amenities to make the right real-estate decision.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Compare Button */}
          {comparePropertyIds.length > 0 && (
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#F4A62A] hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all active:scale-95"
            >
              <Scale className="w-4 h-4" />
              <span>Compare ({comparePropertyIds.length})</span>
            </button>
          )}

          {savedProperties.length > 0 && (
            <button
              onClick={handleClearAll}
              className="p-2 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Clear all saved"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Sub tabs: All / Buy / Rent */}
      {savedProperties.length > 0 && (
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl self-start text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeSubTab === 'all' ? 'bg-white text-[#3949AB] shadow-xs' : 'text-slate-600'
            }`}
          >
            All Saved ({savedProperties.length})
          </button>
          <button
            onClick={() => setActiveSubTab('buy')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeSubTab === 'buy' ? 'bg-white text-[#3949AB] shadow-xs' : 'text-slate-600'
            }`}
          >
            For Sale ({savedProperties.filter(p => p.listingType === 'buy').length})
          </button>
          <button
            onClick={() => setActiveSubTab('rent')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeSubTab === 'rent' ? 'bg-white text-[#3949AB] shadow-xs' : 'text-slate-600'
            }`}
          >
            For Rent ({savedProperties.filter(p => p.listingType === 'rent').length})
          </button>
        </div>
      )}

      {/* Results Grid or Empty State */}
      {filteredSaved.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white rounded-3xl border border-slate-200">
          <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 mb-3">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Your shortlist is empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mt-1 mb-5">
            Tap the heart icon on any property card while exploring to save properties here for quick access and comparison.
          </p>
          <button
            onClick={() => setActiveTab('search')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#3949AB] text-white font-bold text-xs shadow-md hover:bg-[#283593] transition-all active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>Discover Properties</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSaved.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Comparison Modal */}
      {isCompareModalOpen && (
        <CompareModal onClose={() => setIsCompareModalOpen(false)} />
      )}

    </div>
  );
};
