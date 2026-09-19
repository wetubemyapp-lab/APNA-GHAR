import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Project } from '../types';
import { 
  X, 
  MapPin, 
  Building2, 
  Calendar, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Download, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Compass, 
  ArrowRight,
  BadgePercent,
  Check
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { openScheduleVisit, openChatWithProperty, properties, setSelectedProperty, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'units' | 'amenities' | 'builder' | 'masterplan'>('overview');

  // Associated properties in this project
  const projectProperties = properties.filter(p => p.projectName === project.name || p.builderName === project.builder);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative">
        
        {/* Top Floating Action Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400 font-bold text-xs border border-white/20 shadow-md flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> RERA: {project.reraId}
            </span>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <button 
              onClick={() => showToast('Brochure link copied to clipboard', 'success')}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          
          {/* Hero Image Gallery */}
          <div className="relative h-64 sm:h-80 w-full bg-slate-900">
            <img 
              src={project.image} 
              alt={project.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
            
            {/* Title Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-md border border-amber-400/30">
                Exclusive Township Launch
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-1 tracking-tight">{project.name}</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200 mt-1.5">
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-blue-400" /> by {project.builder}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-rose-400" /> {project.locality}, {project.city}</span>
              </div>
            </div>
          </div>

          {/* Key Specs Card Strip */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-white rounded-2xl border border-slate-200/80">
              <span className="text-[11px] text-slate-500 font-medium">Starting Price</span>
              <p className="text-base font-black text-blue-600 mt-0.5">{project.priceRange}</p>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200/80">
              <span className="text-[11px] text-slate-500 font-medium">Configurations</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{project.configurations.join(', ')}</p>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200/80">
              <span className="text-[11px] text-slate-500 font-medium">Possession</span>
              <p className="text-sm font-bold text-emerald-600 mt-0.5">{project.possessionDate}</p>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200/80">
              <span className="text-[11px] text-slate-500 font-medium">Project Scale</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{project.totalTowers || 6} Towers • {project.totalUnits || '420'} Units</p>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 flex gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'units', label: `Available Units (${projectProperties.length})` },
              { id: 'amenities', label: 'World-Class Amenities' },
              { id: 'builder', label: 'Builder Profile' },
              { id: 'masterplan', label: 'Master Plan' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition ${
                  activeTab === tab.id 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6 space-y-6">
            
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">About {project.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Experience luxury living at {project.name}, an ultra-premium residential enclave spread across 14 landscaped acres in {project.locality}. Built with high-grade seismic-resistant RCC framework, Italian marble lobby entrances, and 75% open landscaped greenery designed by world-renowned landscape architects.
                  </p>
                </div>

                {/* Highlights Grid */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2.5">Project Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      '75% Open Greenery & Japanese Zen Gardens',
                      '50,000 sq.ft Grand Clubhouse with Temperature-Controlled Pool',
                      'Double-Height Grand Reception Lounge & Concierge',
                      'Smart Home Automation with Biometric Keyless Entry',
                      'Direct Proximity to Top International Schools & IT Corridors',
                      '100% Power Backup & 3-Tier Security Surveillance'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Launch Offer */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                      <BadgePercent className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-amber-900">Festival Zero Stamp Duty Offer</h4>
                      <p className="text-[11px] text-amber-800">Book before 31st Oct & get Free Modular Kitchen + 1 Car Park</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (projectProperties[0]) openScheduleVisit(projectProperties[0]);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition"
                  >
                    Claim Offer
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'units' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Configured Units in this Project</h3>
                  <span className="text-xs text-slate-500">{projectProperties.length} verified listings available</span>
                </div>

                {projectProperties.map(prop => (
                  <div 
                    key={prop.id}
                    onClick={() => {
                      setSelectedProperty(prop);
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition cursor-pointer flex items-center justify-between gap-3 bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <img src={prop.images[0]} alt={prop.title} className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">{prop.bhk} • {prop.superAreaSqFt} sq.ft</span>
                        <h4 className="text-xs font-bold text-slate-900 mt-1">{prop.title}</h4>
                        <p className="text-xs font-bold text-blue-600 mt-0.5">{prop.priceDisplay}</p>
                      </div>
                    </div>
                    <div className="text-blue-600 font-bold text-xs flex items-center gap-1">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'amenities' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.amenities.map((amenity, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'builder' && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center">
                    {project.builder.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{project.builder}</h4>
                    <p className="text-xs text-slate-500">25+ Years Experience • 48 Delivered Projects</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  One of India's most reputed tier-1 infrastructure and real-estate conglomerates with zero delay track-record, ISO 9001 quality certifications, and over 15,000 delighted families across Bengaluru, Mumbai, Pune, and NCR.
                </p>
              </div>
            )}

            {activeTab === 'masterplan' && (
              <div className="space-y-3 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80" 
                  alt="Master Layout Plan" 
                  className="w-full h-56 object-cover rounded-2xl border border-slate-200"
                />
                <p className="text-xs text-slate-500">Detailed Tower Layout & Landscape Master Blueprint</p>
              </div>
            )}

          </div>

        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-500 font-medium">Starting from</span>
            <p className="text-base font-black text-slate-900 leading-none">{project.priceRange}</p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                if (projectProperties[0]) {
                  openChatWithProperty(projectProperties[0], `Hi, I am interested in ${project.name} by ${project.builder}. Please share price sheet and floorplans.`);
                  onClose();
                }
              }}
              className="px-4 py-2.5 rounded-xl border border-blue-600 text-blue-600 font-bold text-xs flex items-center gap-1.5 hover:bg-blue-50 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat</span>
            </button>
            <button 
              onClick={() => {
                if (projectProperties[0]) {
                  openScheduleVisit(projectProperties[0]);
                  onClose();
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Cab Visit</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
