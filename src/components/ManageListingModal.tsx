import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Property } from '../types';
import { 
  X, 
  Eye, 
  PhoneCall, 
  Bookmark, 
  TrendingUp, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Share2,
  Sparkles,
  DollarSign,
  ShieldCheck,
  Save
} from 'lucide-react';

interface ManageListingModalProps {
  property: Property;
  mode?: 'manage' | 'edit';
  onClose: () => void;
}

export const ManageListingModal: React.FC<ManageListingModalProps> = ({ 
  property, 
  mode = 'manage', 
  onClose 
}) => {
  const { updateExistingProperty, deleteProperty, showToast } = useApp();
  const [currentTab, setCurrentTab] = useState<'manage' | 'edit'>(mode);

  // Edit Form State
  const [title, setTitle] = useState(property.title);
  const [price, setPrice] = useState(property.price);
  const [priceDisplay, setPriceDisplay] = useState(property.priceDisplay);
  const [isAvailable, setIsAvailable] = useState(property.isAvailable);
  const [isFeatured, setIsFeatured] = useState(property.isFeatured || false);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    updateExistingProperty(property.id, {
      title,
      price,
      priceDisplay,
      isAvailable,
      isFeatured
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {currentTab === 'manage' ? 'Manage Property Listing' : 'Edit Listing Details'}
              </h3>
              <p className="text-xs text-slate-500">Apna Ghar Seller & Owner Dashboard</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="bg-slate-100/70 p-1.5 flex gap-2 border-b border-slate-200">
          <button
            onClick={() => setCurrentTab('manage')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
              currentTab === 'manage' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Performance & Leads (Screen 21)
          </button>
          <button
            onClick={() => setCurrentTab('edit')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
              currentTab === 'edit' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Edit Pricing & Information (Screen 22)
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
          
          {/* Property Card Overview */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
            <img src={property.images[0]} alt={property.title} className="w-20 h-20 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                property.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {property.isAvailable ? 'Active Listing' : 'Paused / Sold'}
              </span>
              <h4 className="text-xs font-bold text-slate-900 truncate mt-1">{property.title}</h4>
              <p className="text-xs font-bold text-blue-600">{property.priceDisplay} • {property.locality}, {property.city}</p>
            </div>
          </div>

          {currentTab === 'manage' && (
            <div className="space-y-4">
              {/* Analytics Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-100">
                  <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                    <Eye className="w-4 h-4" />
                  </div>
                  <p className="text-lg font-black text-blue-900">{property.viewsCount || 148}</p>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Total Views</span>
                </div>

                <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100">
                  <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <p className="text-lg font-black text-emerald-900">{property.inquiryCount || 19}</p>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Leads & Inquiries</span>
                </div>

                <div className="p-3.5 bg-purple-50/70 rounded-2xl border border-purple-100">
                  <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
                    <Bookmark className="w-4 h-4" />
                  </div>
                  <p className="text-lg font-black text-purple-900">{property.savedCount || 34}</p>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Shortlists</span>
                </div>
              </div>

              {/* Status Controls */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-900">Listing Status & Visibility</h4>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Public Marketplace Visibility</p>
                    <p className="text-[11px] text-slate-500">Show this listing in search results to buyers</p>
                  </div>
                  <button
                    onClick={() => {
                      updateExistingProperty(property.id, { isAvailable: !property.isAvailable });
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                      property.isAvailable 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-300 text-slate-700'
                    }`}
                  >
                    {property.isAvailable ? 'Active' : 'Paused'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Featured Booster Badge</p>
                    <p className="text-[11px] text-slate-500">Rank on top of city discovery search feed</p>
                  </div>
                  <button
                    onClick={() => {
                      updateExistingProperty(property.id, { isFeatured: !property.isFeatured });
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                      property.isFeatured 
                        ? 'bg-amber-500 text-slate-950' 
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {property.isFeatured ? 'Boosted ⭐' : 'Boost Listing'}
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-rose-900">Delete Listing</h5>
                  <p className="text-[11px] text-rose-700">Permanently remove this property from Apna Ghar</p>
                </div>
                <button
                  onClick={() => {
                    deleteProperty(property.id);
                    onClose();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )}

          {currentTab === 'edit' && (
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Property Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Exact Price (₹ Numbers)</label>
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Display Price Format</label>
                  <input 
                    type="text" 
                    value={priceDisplay}
                    onChange={(e) => setPriceDisplay(e.target.value)}
                    placeholder="e.g. ₹ 1.45 Cr"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Updated Details</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
