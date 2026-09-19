import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SearchBarProps {
  value?: string;
  onChange?: (val: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  showFilterBtn?: boolean;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search locality, project, landmark...',
  showFilterBtn = false,
  className = ''
}) => {
  const { filterState, updateFilter, setIsFilterBottomSheetOpen, activeFilterCount } = useApp();

  const query = value !== undefined ? value : filterState.searchQuery;
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    } else {
      updateFilter('searchQuery', e.target.value);
    }
  };

  const handleClear = () => {
    if (onChange) {
      onChange('');
    } else {
      updateFilter('searchQuery', '');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <div className={`relative flex items-center gap-2 w-full ${className}`}>
      {/* Input container */}
      <div className="relative flex items-center flex-1 bg-slate-100 hover:bg-slate-200/50 border border-slate-200 hover:border-slate-300 rounded-2xl p-3 shadow-2xs transition-all">
        <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={handleTextChange}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
        {query && (
          <button 
            type="button"
            onClick={handleClear}
            className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Optional Integrated Filter Button */}
      {showFilterBtn && (
        <button
          type="button"
          onClick={() => setIsFilterBottomSheetOpen(true)}
          className="relative p-3 rounded-2xl bg-[#3949AB] hover:bg-[#283593] text-white border border-transparent shadow-xs transition-all active:scale-95 shrink-0"
          title="Open Filters"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-450 text-slate-900 font-extrabold text-[10px] flex items-center justify-center border-2 border-white ring-1 ring-amber-500/10">
              {activeFilterCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
};
