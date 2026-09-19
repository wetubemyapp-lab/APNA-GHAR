import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CITIES_LIST } from '../data/mockData';
import { 
  X, 
  MapPin, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Building2,
  Navigation,
  Search,
  IndianRupee,
  Home,
  Waves,
  Calendar,
  PhoneCall,
  MessageSquare,
  Bookmark,
  Car,
  ChevronRight
} from 'lucide-react';

interface OnboardingModalProps {
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  const { setSelectedCity, showToast, setActiveTab } = useApp();
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [showCityPicker, setShowCityPicker] = useState<boolean>(false);
  const [searchCityQuery, setSearchCityQuery] = useState<string>('');

  const handleUseCurrentLocation = () => {
    // Graceful location simulation (no forced OS permission prompt failure)
    const defaultDetectedCity = CITIES_LIST[0]; // Bengaluru
    setSelectedCity(defaultDetectedCity);
    showToast(`Detected location: ${defaultDetectedCity.name} (Indiranagar / Whitefield)`, 'success');
    setActiveTab('home');
    onClose();
  };

  const handleSelectCity = (city: typeof CITIES_LIST[0]) => {
    setSelectedCity(city);
    showToast(`Selected ${city.name} as your preferred city`, 'success');
    setActiveTab('home');
    onClose();
  };

  const handleSkipForNow = () => {
    // Defaults gracefully without forcing
    setSelectedCity(CITIES_LIST[0]);
    showToast('Browsing all verified properties. You can change city anytime from top bar.', 'info');
    setActiveTab('home');
    onClose();
  };

  const filteredCities = CITIES_LIST.filter(c => 
    c.name.toLowerCase().includes(searchCityQuery.toLowerCase()) ||
    c.state.toLowerCase().includes(searchCityQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative max-h-[92vh]">
        
        {/* Top Progress & Navigation Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          {/* Step Indicator */}
          <div className="flex items-center gap-1.5">
            {!showCityPicker ? (
              [1, 2, 3].map((slideNum) => (
                <button
                  key={slideNum}
                  onClick={() => setCurrentSlide(slideNum)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === slideNum 
                      ? 'w-7 bg-blue-600' 
                      : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${slideNum}`}
                />
              ))
            ) : (
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                Final Step • Location Setup
              </span>
            )}
          </div>

          {/* Skip for now / Close Button */}
          <div className="flex items-center gap-2">
            {!showCityPicker && (
              <button
                onClick={handleSkipForNow}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 px-2 py-1 transition"
              >
                Skip
              </button>
            )}
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Slide Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 no-scrollbar">

          {!showCityPicker ? (
            <div>
              {/* SLIDE 1: Find a place that fits your life */}
              {currentSlide === 1 && (
                <div className="flex flex-col items-center text-center space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                  
                  {/* Original House/Property Illustration */}
                  <div className="w-full max-w-[280px] h-48 sm:h-52 rounded-3xl bg-gradient-to-b from-blue-50 via-indigo-50/50 to-amber-50/30 border border-blue-100/80 p-4 flex items-center justify-center relative overflow-hidden shadow-inner">
                    {/* Decorative sky & golden sun */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-amber-200/40 blur-xl"></div>
                    <div className="absolute top-4 right-8 w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 shadow-md shadow-amber-400/30"></div>
                    
                    {/* Architectural SVG Dream House Illustration */}
                    <svg viewBox="0 0 200 160" className="w-full h-full max-h-40 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Ground / Green Lawn */}
                      <path d="M10 145C50 142 150 142 190 145" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
                      
                      {/* Modern Two-Storey Indian Villa */}
                      {/* Main Structure */}
                      <rect x="40" y="65" width="120" height="75" rx="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
                      {/* Balcony / Floor Divider */}
                      <rect x="35" y="60" width="85" height="8" rx="2" fill="#2563EB" />
                      {/* Large Floor-to-Ceiling Windows */}
                      <rect x="52" y="76" width="30" height="25" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
                      <line x1="67" y1="76" x2="67" y2="101" stroke="#3B82F6" strokeWidth="1.5" />
                      
                      <rect x="92" y="76" width="30" height="25" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
                      <line x1="107" y1="76" x2="107" y2="101" stroke="#3B82F6" strokeWidth="1.5" />

                      {/* Ground Floor Welcoming Teak Door */}
                      <rect x="85" y="108" width="22" height="32" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
                      <circle cx="102" cy="124" r="1.5" fill="#78350F" />
                      
                      {/* Gabled Sloped Roof with Rooftop Garden Solar Panel */}
                      <path d="M30 60L100 22L170 60" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M45 55L100 26L155 55" fill="#FEF3C7" />
                      <rect x="120" y="32" width="24" height="12" rx="1" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="1" transform="rotate(-15 120 32)" />

                      {/* Potted Planters / Shrubs */}
                      <circle cx="32" cy="136" r="8" fill="#10B981" />
                      <circle cx="42" cy="138" r="6" fill="#059669" />
                      <circle cx="168" cy="136" r="9" fill="#10B981" />
                    </svg>

                    {/* Auspicious floating badge */}
                    <div className="absolute bottom-2 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] font-bold text-slate-800 shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>Verified Homes</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      Find a place that fits your life
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                      Discover verified apartments, gated villas, independent floors, and modern PGs tailored to your lifestyle across India's top cities.
                    </p>
                  </div>

                  {/* Highlight Chips */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> 100% RERA Verified
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-100 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Zero Brokerage Direct
                    </span>
                  </div>

                </div>
              )}

              {/* SLIDE 2: Search smarter */}
              {currentSlide === 2 && (
                <div className="flex flex-col items-center text-center space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <Search className="w-7 h-7 text-amber-300" />
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      Search smarter
                    </h2>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Filter precisely by what matters most to you with intelligent parameters:
                    </p>
                  </div>

                  {/* 5 Core Search Smarter Pillars */}
                  <div className="w-full grid grid-cols-1 gap-2 text-left pt-1">
                    
                    {/* Location */}
                    <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Location</h4>
                        <p className="text-[11px] text-slate-500">Commute time, proximity to metro stations, tech parks & schools.</p>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <IndianRupee className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Budget</h4>
                        <p className="text-[11px] text-slate-500">Exact price sliders, transparent EMI schedules & no hidden charges.</p>
                      </div>
                    </div>

                    {/* Property Type */}
                    <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Home className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Property Type</h4>
                        <p className="text-[11px] text-slate-500">1, 2, 3, 4+ BHK apartments, gated villas, penthouses & coliving.</p>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Waves className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Amenities</h4>
                        <p className="text-[11px] text-slate-500">Clubhouse, swimming pool, EV charging, power backup & gym.</p>
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Availability</h4>
                        <p className="text-[11px] text-slate-500">Ready-to-move instant possession vs Under-construction milestone dates.</p>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* SLIDE 3: Connect directly */}
              {currentSlide === 3 && (
                <div className="flex flex-col items-center text-center space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
                    <PhoneCall className="w-7 h-7 text-amber-300" />
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      Connect directly
                    </h2>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Seamless communication with genuine builders and property owners:
                    </p>
                  </div>

                  {/* 3 Core Connect Directly Pillars */}
                  <div className="w-full space-y-2.5 text-left pt-2">
                    
                    {/* Contact owners/agents */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Contact Owners & Verified Agents</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Initiate in-app instant chat or direct masked calling without sharing your private phone number.
                        </p>
                      </div>
                    </div>

                    {/* Request callbacks */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Request Callbacks & Free Cab Visits</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Schedule convenient weekend site visits with complimentary doorstep AC cab pickup or video walkthroughs.
                        </p>
                      </div>
                    </div>

                    {/* Save properties */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Bookmark className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Save & Compare Properties</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Bookmark your top shortlisted homes, compare specs side-by-side, and receive instant price-drop alerts.
                        </p>
                      </div>
                    </div>

                  </div>

                </div>
              )}
            </div>
          ) : (
            /* CITY SELECTION MODAL STATE */
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
              
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 mx-auto flex items-center justify-center mb-2">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Select Your City</h3>
                <p className="text-xs text-slate-500">
                  Pick your target city to customize verified listings and local price trends.
                </p>
              </div>

              {/* 3 Prominent Options: Current Location, Manual, Skip */}
              <div className="space-y-2.5">
                
                {/* 1. Use Current Location (Non-forcing) */}
                <button
                  onClick={handleUseCurrentLocation}
                  className="w-full p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
                      <Navigation className="w-4 h-4 text-amber-300 animate-pulse" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold">Use Current Location</div>
                      <div className="text-[10px] text-blue-100 font-normal">Auto-detect nearest metro hub</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition" />
                </button>

                {/* City Search Bar for Manual Selection */}
                <div className="relative pt-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 mt-0.5" />
                  <input
                    type="text"
                    placeholder="Search city (e.g., Bengaluru, Mumbai, Pune)..."
                    value={searchCityQuery}
                    onChange={(e) => setSearchCityQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>

                {/* 2. Select City Manually Grid */}
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto no-scrollbar pt-1">
                  {filteredCities.map(city => (
                    <button
                      key={city.name}
                      onClick={() => handleSelectCity(city)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/60 text-left transition group flex items-center gap-2"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600 flex items-center justify-center shrink-0 transition">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 truncate">{city.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{city.state}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* 3. Skip for Now Button */}
                <button
                  onClick={handleSkipForNow}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition text-center"
                >
                  Skip for now (Browse All Cities)
                </button>

              </div>

            </div>
          )}

        </div>

        {/* Bottom Actions Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3">
          
          {!showCityPicker ? (
            <>
              {currentSlide > 1 ? (
                <button
                  onClick={() => setCurrentSlide(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div className="text-[11px] text-slate-400 font-medium">
                  Slide 1 of 3
                </div>
              )}

              {currentSlide < 3 ? (
                <button
                  onClick={() => setCurrentSlide(prev => Math.min(3, prev + 1))}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition ml-auto"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                /* Slide 3 CTA: "Get Started" -> Prompts Location Setup */
                <button
                  onClick={() => setShowCityPicker(true)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs shadow-md shadow-amber-400/25 flex items-center gap-2 transition ml-auto"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => setShowCityPicker(false)}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Slides</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
};
