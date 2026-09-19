import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CITIES_LIST } from '../data/mockData';
import { 
  X, 
  MapPin, 
  Search, 
  Check
} from 'lucide-react';

interface CitySelectorModalProps {
  onClose: () => void;
}

export const CitySelectorModal: React.FC<CitySelectorModalProps> = ({ onClose }) => {
  const { selectedCity, setSelectedCity, showToast, updateFilter } = useApp();
  const [search, setSearch] = useState('');

  const filteredCities = CITIES_LIST.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.state.toLowerCase().includes(search.toLowerCase()) ||
    c.popularLocalities.some(loc => loc.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSelect = (city: typeof CITIES_LIST[0]) => {
    setSelectedCity(city);
    updateFilter('locality', ''); // Reset locality filter to full city
    showToast(`Switched city to ${city.name}`, 'info');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#3949AB] text-white flex items-center justify-center">
              <MapPin className="w-4 h-4 text-[#F4A62A]" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900">Select City / Metropolitan Hub</h2>
              <p className="text-xs text-slate-500">Explore verified residential & commercial properties</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-200 text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Field */}
        <div className="p-3 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-2xl border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city or locality (e.g., Bengaluru, Whitefield, Bandra)..."
              className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="p-1 text-slate-400">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Cities Grid */}
        <div className="p-4 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredCities.map(city => {
            const isSelected = selectedCity.id === city.id;
            return (
              <div
                key={city.id}
                onClick={() => handleSelect(city)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-2.5 ${
                  isSelected 
                    ? 'border-[#3949AB] bg-indigo-50/70 shadow-xs' 
                    : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                      {city.name}
                      {isSelected && <Check className="w-4 h-4 text-[#3949AB]" />}
                    </h3>
                    <span className="text-[11px] text-slate-500">{city.state}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {city.popularLocalities.slice(0, 3).map(loc => (
                    <span key={loc} className="px-2 py-0.5 rounded-md bg-white/80 border border-slate-200/80 text-[10px] text-slate-600">
                      {loc}
                    </span>
                  ))}
                  {city.popularLocalities.length > 3 && (
                    <span className="text-[10px] text-slate-400 font-semibold self-center">
                      +{city.popularLocalities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
