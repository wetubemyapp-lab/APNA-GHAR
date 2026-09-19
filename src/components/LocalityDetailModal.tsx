import React from 'react';
import { useApp } from '../context/AppContext';
import { LocalityInfo } from '../types';
import { 
  X, 
  MapPin, 
  TrendingUp, 
  Star, 
  ShieldCheck, 
  School, 
  Hospital, 
  Train, 
  ShoppingBag, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Percent
} from 'lucide-react';

interface LocalityDetailModalProps {
  locality: LocalityInfo;
  onClose: () => void;
}

export const LocalityDetailModal: React.FC<LocalityDetailModalProps> = ({ locality, onClose }) => {
  const { properties, setSelectedProperty, setActiveTab, updateFilter } = useApp();

  const localityProperties = properties.filter(p => 
    p.locality.toLowerCase().includes(locality.name.toLowerCase()) ||
    locality.name.toLowerCase().includes(p.locality.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{locality.name}, {locality.city}</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" /> {locality.connectivityRating} / 5.0
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Comprehensive Locality Guide & Market Analytics</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 no-scrollbar">
          
          {/* Hero Insights Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-100">
              <span className="text-[11px] font-semibold text-blue-800">Avg. Property Rate</span>
              <p className="text-base font-black text-blue-900 mt-0.5">₹{locality.avgRatePerSqFt.toLocaleString()}<span className="text-xs font-normal">/sq.ft</span></p>
            </div>
            <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100">
              <span className="text-[11px] font-semibold text-emerald-800">YoY Capital Growth</span>
              <p className="text-base font-black text-emerald-900 mt-0.5 flex items-center justify-center gap-0.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" /> {locality.growthYoy}
              </p>
            </div>
            <div className="p-3.5 bg-purple-50/70 rounded-2xl border border-purple-100">
              <span className="text-[11px] font-semibold text-purple-800">Rental Yield</span>
              <p className="text-base font-black text-purple-900 mt-0.5">{locality.rentalYield}</p>
            </div>
            <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-100">
              <span className="text-[11px] font-semibold text-amber-800">Available Listings</span>
              <p className="text-base font-black text-amber-900 mt-0.5">{locality.activeListingsCount || localityProperties.length}+</p>
            </div>
          </div>

          {/* Locality Overview */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">Locality Overview</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {locality.description || `${locality.name} is one of ${locality.city}'s most sought-after premium residential and commercial hubs, offering superior metro connectivity, tree-lined avenues, proximity to premier tech parks, top-tier international schools, and multispecialty healthcare facilities.`}
            </p>
          </div>

          {/* Top Highlights */}
          {locality.topHighlights && locality.topHighlights.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2.5">Key Infrastructure & Location Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {locality.topHighlights.map((highlight, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pros & Cons (Balanced Local Insights) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
              <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> What Residents Love
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-start gap-1.5">• 5-10 mins to nearest Metro line stations</li>
                <li className="flex items-start gap-1.5">• High concentration of top schools and multispecialty hospitals</li>
                <li className="flex items-start gap-1.5">• High rental demand from IT professionals</li>
                <li className="flex items-start gap-1.5">• Abundant recreational parks, cafes, and gourmet eateries</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2">
              <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> Things to Consider
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-start gap-1.5">• Peak hour traffic bottlenecks near major arterial junctions</li>
                <li className="flex items-start gap-1.5">• High capital acquisition prices compared to suburban clusters</li>
              </ul>
            </div>
          </div>

          {/* Properties in this Locality */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Live Properties in {locality.name} ({localityProperties.length})</h3>
              <button 
                onClick={() => {
                  updateFilter('locality', locality.name);
                  setActiveTab('search');
                  onClose();
                }}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>View all in Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {localityProperties.length === 0 ? (
              <p className="text-xs text-slate-400 p-4 bg-slate-50 rounded-xl text-center">No properties directly indexed in sample catalog for this locality yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {localityProperties.slice(0, 4).map(prop => (
                  <div 
                    key={prop.id}
                    onClick={() => {
                      setSelectedProperty(prop);
                      onClose();
                    }}
                    className="p-3 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 shadow-xs hover:shadow-md transition cursor-pointer flex gap-3"
                  >
                    <img src={prop.images[0]} alt={prop.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                    <div className="flex flex-col justify-between min-w-0">
                      <div>
                        <span className="text-xs font-black text-blue-600">{prop.priceDisplay}</span>
                        <h5 className="font-bold text-xs text-slate-900 truncate mt-0.5">{prop.title}</h5>
                        <p className="text-[11px] text-slate-500">{prop.bhk} • {prop.carpetAreaSqFt} sq.ft</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600">Verified Listing</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">Discover all homes, apartments & plots in {locality.name}</span>
          <button
            onClick={() => {
              updateFilter('locality', locality.name);
              setActiveTab('search');
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm"
          >
            Explore {locality.name} Listings
          </button>
        </div>

      </div>
    </div>
  );
};
