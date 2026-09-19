import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from './PropertyCard';
import { CompareModal } from './CompareModal';
import { Project } from '../types';
import { 
  Heart, 
  Scale, 
  Trash2, 
  Building2, 
  Search, 
  ChevronRight,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  ShieldCheck,
  Building,
  Check,
  ArrowRight
} from 'lucide-react';

export const ShortlistScreen: React.FC = () => {
  const { 
    savedProperties, 
    savedProjects,
    currentUser, 
    setCurrentUser, 
    setActiveTab, 
    comparePropertyIds,
    toggleCompareProperty,
    isCompareModalOpen,
    setIsCompareModalOpen,
    toggleSaveProperty,
    toggleSaveProject,
    setSelectedProject,
    showToast 
  } = useApp();

  const [activeMainTab, setActiveMainTab] = useState<'properties' | 'projects'>('properties');
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'buy' | 'rent'>('all');

  const filteredSavedProperties = savedProperties.filter(prop => {
    if (activeSubTab === 'buy') return prop.listingType === 'buy';
    if (activeSubTab === 'rent') return prop.listingType === 'rent';
    return true;
  });

  const handleClearAllProperties = () => {
    if (window.confirm('Are you sure you want to clear all saved properties?')) {
      setCurrentUser(prev => ({
        ...prev,
        savedPropertyIds: []
      }));
      showToast('Property shortlist cleared', 'info');
    }
  };

  const handleClearAllProjects = () => {
    if (window.confirm('Are you sure you want to clear all saved projects?')) {
      setCurrentUser(prev => ({
        ...prev,
        savedProjectIds: []
      }));
      showToast('Project shortlist cleared', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 pb-24 flex flex-col gap-5">
      
      {/* HEADER SECTION WITH BULK COMPARE ACTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shadow-xs">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                My Shortlist
              </h1>
              <p className="text-xs font-medium text-slate-500">
                Track, revisit, and compare your favorite properties & mega projects.
              </p>
            </div>
          </div>
        </div>

        {/* Bulk Action: Compare Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#F4A62A] hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-sm transition-all active:scale-95"
            title="Compare saved properties"
          >
            <Scale className="w-4 h-4" />
            <span>Compare {comparePropertyIds.length > 0 ? `(${comparePropertyIds.length})` : ''}</span>
          </button>

          {activeMainTab === 'properties' && savedProperties.length > 0 && (
            <button
              onClick={handleClearAllProperties}
              className="p-2.5 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
              title="Clear all saved properties"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {activeMainTab === 'projects' && savedProjects.length > 0 && (
            <button
              onClick={handleClearAllProjects}
              className="p-2.5 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
              title="Clear all saved projects"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* MAIN TABS: PROPERTIES / PROJECTS */}
      <div className="flex items-center justify-between gap-3 bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveMainTab('properties')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 ${
              activeMainTab === 'properties'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Properties ({savedProperties.length})</span>
          </button>

          <button
            onClick={() => setActiveMainTab('projects')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 ${
              activeMainTab === 'projects'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Projects ({savedProjects.length})</span>
          </button>
        </div>

        {/* Sub-filter for Properties */}
        {activeMainTab === 'properties' && savedProperties.length > 0 && (
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveSubTab('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeSubTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveSubTab('buy')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeSubTab === 'buy' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setActiveSubTab('rent')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeSubTab === 'rent' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Rent
            </button>
          </div>
        )}
      </div>

      {/* TAB CONTENT: PROPERTIES */}
      {activeMainTab === 'properties' && (
        <>
          {filteredSavedProperties.length === 0 ? (
            /* EMPTY STATE */
            <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/90 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-3 shadow-inner">
                <Heart className="w-8 h-8 fill-rose-500/20 stroke-rose-500 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Save properties you want to revisit.
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed">
                Tap the heart icon on any property while exploring to keep track of homes you love and compare them side-by-side.
              </p>
              <button
                onClick={() => setActiveTab('search')}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#E53935] hover:bg-red-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Explore Properties</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSavedProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </>
      )}

      {/* TAB CONTENT: PROJECTS */}
      {activeMainTab === 'projects' && (
        <>
          {savedProjects.length === 0 ? (
            /* EMPTY STATE FOR PROJECTS */
            <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/90 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-3 shadow-inner">
                <Building className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Save properties you want to revisit.
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed">
                Shortlist mega township projects, upcoming launches, and builder developments to track construction timelines.
              </p>
              <button
                onClick={() => setActiveTab('search')}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#E53935] hover:bg-red-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Explore Properties</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedProjects.map(project => (
                <div 
                  key={project.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col group hover:border-slate-300 transition duration-300"
                >
                  {/* Image & Favorite Toggle */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400 font-extrabold text-[10px] border border-white/20 shadow-xs flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> RERA
                      </span>
                    </div>

                    {/* Favorite Toggle Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveProject(project.id);
                      }}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md text-rose-500 flex items-center justify-center shadow-md hover:scale-110 transition active:scale-95"
                      title="Remove from shortlist"
                    >
                      <Heart className="w-4 h-4 fill-rose-500" />
                    </button>

                    {/* Bottom Title & Price Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wide">
                        {project.builder}
                      </span>
                      <h3 className="text-base font-black truncate leading-tight">
                        {project.name}
                      </h3>
                      <p className="text-sm font-black text-white mt-0.5">
                        {project.priceRange}
                      </p>
                    </div>
                  </div>

                  {/* Quick Facts & Location */}
                  <div className="p-3.5 flex flex-col gap-2.5 flex-1">
                    <div className="flex items-center gap-1 text-xs text-slate-600 font-medium truncate">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="truncate">{project.locality}, {project.city}</span>
                    </div>

                    {/* Quick Facts Pills */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-1.5 truncate">
                        <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">{project.configurations.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{project.possessionDate}</span>
                      </div>
                    </div>

                    {/* Highlight */}
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {project.highlight}
                    </p>

                    {/* Footer Action */}
                    <div className="pt-2 mt-auto border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400">
                        {project.totalUnits} Total Units
                      </span>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center gap-1 text-xs font-extrabold text-red-600 hover:text-red-700 transition"
                      >
                        <span>View Project</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Comparison Modal */}
      {isCompareModalOpen && (
        <CompareModal onClose={() => setIsCompareModalOpen(false)} />
      )}

    </div>
  );
};
