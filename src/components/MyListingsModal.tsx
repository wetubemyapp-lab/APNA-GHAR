import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EmptyState } from './EmptyState';
import { 
  X, 
  Building2, 
  PlusCircle, 
  Edit3, 
  Eye, 
  Trash2, 
  PauseCircle, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle,
  ExternalLink,
  MapPin,
  Tag,
  BarChart2,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import { Property } from '../types';

type ListingTabStatus = 'active' | 'pending' | 'draft' | 'closed';

interface MyListingsModalProps {
  onClose: () => void;
}

export const MyListingsModal: React.FC<MyListingsModalProps> = ({ onClose }) => {
  const { 
    currentUser, 
    properties, 
    deleteProperty, 
    updateExistingProperty, 
    setEditingProperty, 
    setIsPostPropertyModalOpen, 
    setSelectedProperty,
    setManagingProperty,
    setIsManageListingModalOpen,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<ListingTabStatus>('active');

  // Combine user's posted properties
  const allUserProperties = currentUser.postedProperties || properties.filter(p => p.ownerId === currentUser.id);

  // Helper to categorize status
  const getPropertyStatus = (prop: Property): ListingTabStatus => {
    if (prop.status) return prop.status;
    if (prop.isAvailable) return 'active';
    return 'pending';
  };

  const activeProperties = allUserProperties.filter(p => getPropertyStatus(p) === 'active');
  const pendingProperties = allUserProperties.filter(p => getPropertyStatus(p) === 'pending');
  const draftProperties = allUserProperties.filter(p => getPropertyStatus(p) === 'draft');
  const closedProperties = allUserProperties.filter(p => getPropertyStatus(p) === 'closed');

  const getFilteredProperties = () => {
    switch (activeTab) {
      case 'active': return activeProperties;
      case 'pending': return pendingProperties;
      case 'draft': return draftProperties;
      case 'closed': return closedProperties;
      default: return activeProperties;
    }
  };

  const currentList = getFilteredProperties();

  // Handlers
  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setIsPostPropertyModalOpen(true);
    onClose();
  };

  const handleTogglePause = (property: Property) => {
    const currentStatus = getPropertyStatus(property);
    const newStatus: ListingTabStatus = currentStatus === 'active' ? 'pending' : 'active';
    const isAvail = newStatus === 'active';

    updateExistingProperty(property.id, {
      status: newStatus,
      isAvailable: isAvail
    });

    showToast(
      newStatus === 'pending' 
        ? 'Listing paused. It will no longer appear in search.' 
        : 'Listing is now Active and live on NestOra!',
      'info'
    );
  };

  const handleDelete = (property: Property) => {
    if (window.confirm(`Are you sure you want to delete "${property.title}"?`)) {
      deleteProperty(property.id);
      showToast('Listing deleted successfully', 'error');
    }
  };

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleManageAnalytics = (property: Property) => {
    setManagingProperty(property);
    setIsManageListingModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200/80">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-2xl shadow-md shadow-blue-600/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">My Listings</h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                  Screen 20
                </span>
              </div>
              <p className="text-xs text-slate-500">Manage all your posted properties, drafts, and closed deals in one place</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditingProperty(null);
                setIsPostPropertyModalOpen(true);
                onClose();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Post New Property</span>
              <span className="sm:hidden">Post</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200/70 text-slate-500 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation (Active, Pending, Draft, Closed) */}
        <div className="px-5 pt-3 pb-2 bg-white border-b border-slate-100">
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100/80 rounded-2xl">
            
            {/* Active Tab */}
            <button
              onClick={() => setActiveTab('active')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'active'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Active</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                activeTab === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
              }`}>
                {activeProperties.length}
              </span>
            </button>

            {/* Pending / Paused Tab */}
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'pending'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Pending</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                activeTab === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
              }`}>
                {pendingProperties.length}
              </span>
            </button>

            {/* Draft Tab */}
            <button
              onClick={() => setActiveTab('draft')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'draft'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Draft</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                activeTab === 'draft' ? 'bg-slate-200 text-slate-900' : 'bg-slate-200 text-slate-700'
              }`}>
                {draftProperties.length}
              </span>
            </button>

            {/* Closed Tab */}
            <button
              onClick={() => setActiveTab('closed')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'closed'
                  ? 'bg-white text-rose-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Closed</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                activeTab === 'closed' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
              }`}>
                {closedProperties.length}
              </span>
            </button>

          </div>
        </div>

        {/* Listings Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {currentList.length === 0 ? (
            <EmptyState 
              type="no_listings"
              title={`No ${activeTab} listings found`}
              message={
                activeTab === 'active' ? 'Post a new property listing to start receiving buyer & tenant inquiries instantly.' :
                activeTab === 'pending' ? 'You have no paused or under-review listings currently.' :
                activeTab === 'draft' ? 'No draft properties saved. Drafts auto-save as you build listings.' :
                'Sold or rented out properties will appear here for your history records.'
              }
              ctaText="Post Property for Free"
              onCtaClick={() => {
                setEditingProperty(null);
                setIsPostPropertyModalOpen(true);
                onClose();
              }}
            />
          ) : (
            currentList.map(prop => {
              const status = getPropertyStatus(prop);

              return (
                <div 
                  key={prop.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Property Image & Basic Info */}
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    <div className="relative shrink-0">
                      <img 
                        src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop&q=80'} 
                        alt={prop.title} 
                        className="w-20 h-20 rounded-xl object-cover border border-slate-200"
                      />
                      <span className={`absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider text-white shadow-xs ${
                        prop.listingType === 'buy' ? 'bg-blue-600' : 'bg-emerald-600'
                      }`}>
                        {prop.listingType === 'buy' ? 'SELL' : 'RENT'}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-sm font-extrabold text-blue-600 tracking-tight">{prop.priceDisplay}</span>
                        
                        {/* Status Badge */}
                        {status === 'active' && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            ACTIVE
                          </span>
                        )}
                        {status === 'pending' && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-extrabold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            PAUSED / PENDING
                          </span>
                        )}
                        {status === 'draft' && (
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-extrabold flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            DRAFT
                          </span>
                        )}
                        {status === 'closed' && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-extrabold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            CLOSED
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-xs text-slate-900 truncate">{prop.title}</h4>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{prop.locality}, {prop.city}</span>
                      </p>

                      {/* Performance metrics */}
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-blue-500" />
                          <strong>{prop.viewsCount || 0}</strong> Views
                        </span>
                        <span className="flex items-center gap-1">
                          <BarChart2 className="w-3 h-3 text-amber-500" />
                          <strong>{prop.inquiryCount || 0}</strong> Inquiries
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-emerald-500" />
                          <strong>{prop.savedCount || 0}</strong> Shortlists
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions (Edit, Pause/Resume, Delete, View) */}
                  <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2.5 sm:pt-0 border-slate-100">
                    
                    {/* View Action */}
                    <button
                      onClick={() => handleViewDetails(prop)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition"
                      title="View listing details as buyer"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>View</span>
                    </button>

                    {/* Manage Analytics Action */}
                    <button
                      onClick={() => handleManageAnalytics(prop)}
                      className="px-2.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1 transition"
                      title="View inquiry dashboard"
                    >
                      <BarChart2 className="w-3.5 h-3.5 text-blue-600" />
                      <span className="hidden md:inline">Analytics</span>
                    </button>

                    {/* Edit Action (Screen 21) */}
                    <button
                      onClick={() => handleEdit(prop)}
                      className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1 transition"
                      title="Edit property details using multi-step wizard"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Edit</span>
                    </button>

                    {/* Pause / Resume Action */}
                    {status !== 'closed' && (
                      <button
                        onClick={() => handleTogglePause(prop)}
                        className={`p-1.5 rounded-xl transition ${
                          status === 'active'
                            ? 'bg-amber-50 hover:bg-amber-100 text-amber-700'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                        }`}
                        title={status === 'active' ? 'Pause listing' : 'Activate listing'}
                      >
                        {status === 'active' ? (
                          <PauseCircle className="w-4 h-4" />
                        ) : (
                          <PlayCircle className="w-4 h-4" />
                        )}
                      </button>
                    )}

                    {/* Delete Action */}
                    <button
                      onClick={() => handleDelete(prop)}
                      className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                      title="Delete listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          Tip: Paused listings are saved safely in your account and can be reactivated anytime with one click.
        </div>

      </div>
    </div>
  );
};
