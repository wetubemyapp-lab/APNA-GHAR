import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SCREEN_INVENTORY_LIST } from '../data/mockData';
import { 
  X, 
  Layers, 
  ExternalLink, 
  Search, 
  Sparkles, 
  Smartphone, 
  Code2, 
  CheckCircle2,
  ArrowRight,
  Filter
} from 'lucide-react';

interface ScreenInventoryModalProps {
  onClose: () => void;
}

export const ScreenInventoryModal: React.FC<ScreenInventoryModalProps> = ({ onClose }) => {
  const { openScreen, setIsComposeInspectorOpen } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All 30 Screens' },
    { id: 'core', label: 'Core & System' },
    { id: 'discovery', label: 'Discovery & Search' },
    { id: 'inquiry', label: 'Leads & Inquiry' },
    { id: 'auth', label: 'Authentication' },
    { id: 'management', label: 'Listings & Profile' },
    { id: 'utility', label: 'Settings & Support' }
  ];

  const filteredScreens = SCREEN_INVENTORY_LIST.filter(screen => {
    if (filterCategory !== 'all' && screen.category !== filterCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        screen.name.toLowerCase().includes(q) ||
        screen.number.includes(q) ||
        screen.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'core': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'discovery': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'inquiry': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'auth': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'management': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'utility': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-tight">30-Screen Material 3 Android Catalog</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                  Production Ready
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Complete Screen Inventory & Architecture Showcase • Tap any screen to test directly
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsComposeInspectorOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition"
              title="View Kotlin Jetpack Compose Code"
            >
              <Code2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Compose Code</span>
            </button>
            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by screen number or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ×
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar py-0.5">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  filterCategory === cat.id 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of 30 Screens */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 no-scrollbar bg-slate-50/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {filteredScreens.map(screen => (
              <div 
                key={screen.id}
                onClick={() => {
                  openScreen(screen.id);
                  onClose();
                }}
                className="group p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-slate-900 text-amber-300 font-mono font-black text-xs flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {screen.number}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                        {screen.name}
                      </h4>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider ${getCategoryBadgeColor(screen.category)}`}>
                    {screen.category}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                  {screen.description}
                </p>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Screen {screen.number}
                  </span>
                  <div className="flex items-center gap-1 text-blue-600 font-bold text-xs group-hover:translate-x-0.5 transition-transform">
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredScreens.length === 0 && (
            <div className="text-center py-12">
              <Layers className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-600">No matching screens found for "{searchQuery}"</p>
              <button 
                onClick={() => { setSearchQuery(''); setFilterCategory('all'); }}
                className="text-xs text-blue-600 font-bold mt-2 hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>30 Screen Flows constructed via Jetpack Compose & Material 3 Best Practices</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition"
          >
            Close Catalog
          </button>
        </div>

      </div>
    </div>
  );
};
