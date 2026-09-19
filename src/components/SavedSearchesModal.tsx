import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EmptyState } from './EmptyState';
import { X, Search, BookmarkCheck, Trash2, ArrowRight, BellRing } from 'lucide-react';

interface SavedSearchesModalProps {
  onClose: () => void;
}

export const SavedSearchesModal: React.FC<SavedSearchesModalProps> = ({ onClose }) => {
  const { 
    filterState, 
    updateFilter, 
    showToast,
    setActiveTab
  } = useApp();

  const [savedSearches, setSavedSearches] = useState<Array<{
    id: string;
    title: string;
    filtersSummary: string;
    dateSaved: string;
    searchQuery: string;
    bhk: string[];
    priceRange: [number, number];
  }>>(() => {
    const stored = localStorage.getItem('apnaghar_saved_searches');
    return stored ? JSON.parse(stored) : [];
  });

  const handleDeleteSavedSearch = (id: string) => {
    const updated = savedSearches.filter(s => s.id !== id);
    setSavedSearches(updated);
    localStorage.setItem('apnaghar_saved_searches', JSON.stringify(updated));
    showToast('Saved search deleted', 'info');
  };

  const handleApplySavedSearch = (searchItem: typeof savedSearches[0]) => {
    updateFilter('searchQuery', searchItem.searchQuery);
    if (searchItem.bhk.length > 0) updateFilter('bhk', searchItem.bhk as any);
    updateFilter('minPrice', searchItem.priceRange[0]);
    updateFilter('maxPrice', searchItem.priceRange[1]);
    setActiveTab('search');
    onClose();
    showToast(`Applied saved search: "${searchItem.title}"`, 'info');
  };

  const handleSaveCurrentSearch = () => {
    const minP = filterState.minPrice || 0;
    const maxP = filterState.maxPrice || 100000000;
    const newSearch = {
      id: Date.now().toString(),
      title: filterState.searchQuery || filterState.locality || 'Custom Property Search',
      filtersSummary: `${filterState.bhk.length ? filterState.bhk.join(', ') : 'All BHK'} • ₹${(minP/100000).toFixed(0)}L - ₹${(maxP/100000).toFixed(0)}L`,
      dateSaved: 'Just now',
      searchQuery: filterState.searchQuery,
      bhk: filterState.bhk,
      priceRange: [minP, maxP] as [number, number]
    };

    const updated = [newSearch, ...savedSearches];
    setSavedSearches(updated);
    localStorage.setItem('apnaghar_saved_searches', JSON.stringify(updated));
    showToast('Current search saved successfully!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/20">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Saved Searches</h3>
              <p className="text-xs text-slate-500">Instant price-drop alerts on saved criteria</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-slate-50/50">
          {savedSearches.length === 0 ? (
            <EmptyState 
              type="no_saved_searches"
              title="No saved searches yet."
              ctaText="Save Current Search"
              onCtaClick={handleSaveCurrentSearch}
            />
          ) : (
            <>
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold text-slate-500">{savedSearches.length} Saved Searches</span>
                <button
                  onClick={handleSaveCurrentSearch}
                  className="text-xs font-bold text-[#3949AB] hover:underline"
                >
                  + Save Current Filter
                </button>
              </div>

              {savedSearches.map(item => (
                <div 
                  key={item.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-3 hover:border-purple-300 transition-all group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-xs text-slate-900 truncate">{item.title}</h4>
                      <span className="px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold">
                        Alerts Active
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{item.filtersSummary}</p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{item.dateSaved}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApplySavedSearch(item)}
                      className="px-3 py-1.5 rounded-xl bg-[#3949AB] text-white text-xs font-bold hover:bg-[#283593] flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteSavedSearch(item.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      title="Delete saved search"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
