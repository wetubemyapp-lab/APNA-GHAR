import React, { useState, useRef, useEffect } from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { AmenityGrid } from './AmenityGrid';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Scale, 
  MapPin, 
  ShieldCheck, 
  Maximize2, 
  Compass, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Phone, 
  MessageCircle, 
  MessageSquare,
  Calendar,
  Calculator,
  ChevronRight,
  ChevronLeft,
  Layers,
  Car,
  Eye,
  Info,
  X,
  School,
  Cross,
  ShoppingBag,
  Train,
  Grid,
  ZoomIn,
  ZoomOut,
  Building,
  UserCheck,
  Check,
  Clock,
  Home
} from 'lucide-react';
import L from 'leaflet';

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ property, onClose }) => {
  const { 
    toggleSaveProperty, 
    isPropertySaved, 
    toggleCompareProperty, 
    comparePropertyIds,
    openScheduleVisit,
    openChatWithProperty,
    openEnquiryModal,
    showToast,
    properties,
    setSelectedProperty
  } = useApp();

  // Active section tab indicator
  const [activeNavSection, setActiveNavSection] = useState<'overview' | 'details' | 'amenities' | 'floorplan' | 'location' | 'builder' | 'similar'>('overview');

  // Image Gallery state
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isFullscreenGalleryOpen, setIsFullscreenGalleryOpen] = useState(false);
  const [fullscreenPhotoIdx, setFullscreenPhotoIdx] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Floor plan tab / view
  const [isFloorPlanZoomed, setIsFloorPlanZoomed] = useState(false);

  // Active category for nearby places
  const [nearbyCategory, setNearbyCategory] = useState<'all' | 'schools' | 'hospitals' | 'shopping' | 'transport'>('all');

  // EMI Calculator State
  const defaultLoanAmount = Math.round(property.price * 0.8);
  const [loanAmount, setLoanAmount] = useState(defaultLoanAmount);
  const [tenureYears, setTenureYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  const isSaved = isPropertySaved(property.id);
  const isCompared = comparePropertyIds.includes(property.id);

  // Map reference for single property location
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Initialize single property map preview
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const lat = property.lat || 26.8467;
    const lng = property.lng || 80.9462;

    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: 15,
      zoomControl: false,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CARTO &copy; OpenStreetMap',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Custom PIN for property
    const propIcon = L.divIcon({
      className: 'property-detail-pin',
      html: `
        <div style="background: #3949AB; color: white; padding: 6px 12px; border-radius: 20px; font-weight: 800; font-size: 11px; box-shadow: 0 4px 12px rgba(57, 73, 171, 0.4); border: 2px solid white; white-space: nowrap; display: flex; items-center; gap: 4px;">
          📍 ${property.priceDisplay}
        </div>
      `,
      iconSize: [80, 30],
      iconAnchor: [40, 15]
    });

    L.marker([lat, lng], { icon: propIcon })
      .addTo(map)
      .bindPopup(`<b>${property.title}</b><br/>${property.locality}`)
      .openPopup();

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [property]);

  // Calculate Monthly EMI: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    if (monthlyRate === 0) return Math.round(loanAmount / totalMonths);
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return Math.round(emi);
  };

  const emiAmount = calculateEMI();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property on Nestora: ${property.title} (${property.priceDisplay})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard! 📋', 'info');
    }
  };

  const handleWhatsApp = () => {
    const msg = `Hi, I am interested in "${property.title}" (${property.priceDisplay}) listed on Nestora. Please share details.`;
    window.open(`https://wa.me/${property.ownerWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Similar recommendations
  const similarProperties = properties.filter(p => p.id !== property.id && p.city === property.city).slice(0, 4);

  // Gallery Navigation
  const handleNextPhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % property.images.length);
  };

  const handlePrevPhoto = () => {
    setActivePhotoIdx((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleOpenFullscreen = (idx: number) => {
    setFullscreenPhotoIdx(idx);
    setZoomLevel(1);
    setIsFullscreenGalleryOpen(true);
  };

  // Filter landmarks by category
  const filteredLandmarks = property.landmarks?.filter(lm => {
    if (nearbyCategory === 'all') return true;
    if (nearbyCategory === 'schools' && lm.type === 'school') return true;
    if (nearbyCategory === 'hospitals' && lm.type === 'hospital') return true;
    if (nearbyCategory === 'shopping' && (lm.type === 'mall' || lm.type === 'tech_park')) return true;
    if (nearbyCategory === 'transport' && (lm.type === 'metro' || lm.type === 'airport')) return true;
    return false;
  }) || [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 overflow-y-auto pb-28 sm:pb-24 animate-in fade-in duration-200">
      
      {/* ----------------- TOP OVERLAY BAR ----------------- */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-slate-100 text-slate-800 active:scale-90 transition-all flex items-center gap-1.5 text-xs font-bold"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back to Search</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleCompareProperty(property.id)}
            className={`p-2 rounded-full border transition-all active:scale-90 ${
              isCompared 
                ? 'bg-[#F4A62A] text-slate-950 border-[#F4A62A]' 
                : 'border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="Compare Property"
          >
            <Scale className="w-4 h-4" />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 active:scale-90 transition-all"
            title="Share Property"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => toggleSaveProperty(property.id)}
            className={`p-2 rounded-full border transition-all active:scale-90 ${
              isSaved 
                ? 'bg-rose-500 text-white border-rose-500 shadow-sm' 
                : 'border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-rose-500'
            }`}
            title="Shortlist Property"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 flex flex-col gap-6">

        {/* ----------------- 1. IMAGE GALLERY & INTERACTIONS ----------------- */}
        <div className="flex flex-col gap-2">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl bg-slate-900 overflow-hidden shadow-md group">
            
            {/* Main Active Image */}
            <img 
              src={property.images[activePhotoIdx] || property.images[0]} 
              alt={property.title} 
              className="w-full h-full object-cover transition-all duration-300 cursor-pointer"
              onClick={() => handleOpenFullscreen(activePhotoIdx)}
            />

            {/* Swipe / Arrow Overlay Controls */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-80 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-80 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Badges Overlay */}
            <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
              <span className="px-3 py-1 rounded-xl bg-[#3949AB] text-white text-xs font-black uppercase shadow-sm">
                {property.listingType === 'buy' ? 'For Sale' : 'For Rent'}
              </span>
              {property.isReraApproved && (
                <span className="px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md text-emerald-400 text-xs font-bold flex items-center gap-1 border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  RERA Registered
                </span>
              )}
            </div>

            {/* Counter & Fullscreen Trigger Badge */}
            <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
              <button
                onClick={() => handleOpenFullscreen(activePhotoIdx)}
                className="px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#F4A62A]" />
                <span>{activePhotoIdx + 1} / {property.images.length} Photos</span>
              </button>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {property.images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`relative w-20 h-14 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                    idx === activePhotoIdx 
                      ? 'border-[#3949AB] scale-105 shadow-sm' 
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ----------------- 2. BELOW IMAGE: TITLE, LOCATION, PRICE ----------------- */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
            <div>
              <span className="text-xs font-black text-[#3949AB] tracking-wider uppercase block mb-1">
                {property.bhk} • {property.propertyType} {property.projectName ? `in ${property.projectName}` : ''}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                {property.title}
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium mt-1.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{property.address}</span>
              </div>
            </div>

            <div className="flex flex-col md:items-end bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-2xl border md:border-none border-slate-200">
              <span className="text-2xl sm:text-3xl font-black text-[#17202A] tracking-tight">
                {property.priceDisplay}
              </span>
              {property.pricePerSqFt > 0 && (
                <span className="text-xs font-bold text-slate-500">
                  @ ₹{property.pricePerSqFt.toLocaleString()} / sq.ft
                </span>
              )}
            </div>
          </div>

          {/* RERA and Verification Info Pill */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
            {property.reraId && (
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                RERA: {property.reraId}
              </span>
            )}
            {property.isOwnerVerified && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-xl flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                Verified Seller Listing
              </span>
            )}
            <span className="text-xs font-semibold text-slate-400 ml-auto">
              Views: {property.viewsCount} • Shortlisted: {property.savedCount}
            </span>
          </div>
        </div>

        {/* ----------------- 3. QUICK FACTS ROW ----------------- */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#3949AB] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase block">Bedrooms</span>
              <span className="text-sm font-black text-slate-900">{property.bhk}</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#3949AB] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase block">Bathrooms</span>
              <span className="text-sm font-black text-slate-900">{property.bathrooms} Baths</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#3949AB] flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase block">Area</span>
              <span className="text-sm font-black text-slate-900">{property.carpetAreaSqFt} sq.ft</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#3949AB] flex items-center justify-center shrink-0">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase block">Property Type</span>
              <span className="text-sm font-black text-slate-900 capitalize">{property.propertyType}</span>
            </div>
          </div>
        </div>

        {/* ----------------- 4. CTA SECTION ----------------- */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs grid grid-cols-2 gap-3">
          <button
            onClick={() => openEnquiryModal(property)}
            className="py-3 px-4 rounded-2xl bg-[#3949AB] hover:bg-[#283593] text-white font-black text-xs sm:text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#F4A62A]" />
            <span>Contact Seller</span>
          </button>

          <button
            onClick={() => openScheduleVisit(property)}
            className="py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-slate-950 border border-amber-300 font-extrabold text-xs sm:text-sm active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#3949AB]" />
            <span>Request Callback</span>
          </button>
        </div>

        {/* ----------------- SECTIONS TAB NAVIGATOR ----------------- */}
        <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto no-scrollbar text-xs font-bold">
          <button
            onClick={() => setActiveNavSection('overview')}
            className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeNavSection === 'overview' ? 'bg-[#3949AB] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveNavSection('details')}
            className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeNavSection === 'details' ? 'bg-[#3949AB] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Property Details
          </button>
          <button
            onClick={() => setActiveNavSection('amenities')}
            className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeNavSection === 'amenities' ? 'bg-[#3949AB] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Amenities
          </button>
          <button
            onClick={() => setActiveNavSection('floorplan')}
            className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeNavSection === 'floorplan' ? 'bg-[#3949AB] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Floor Plan
          </button>
          <button
            onClick={() => setActiveNavSection('location')}
            className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeNavSection === 'location' ? 'bg-[#3949AB] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Location & Nearby
          </button>
          <button
            onClick={() => setActiveNavSection('builder')}
            className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeNavSection === 'builder' ? 'bg-[#3949AB] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Seller / Agent
          </button>
          <button
            onClick={() => setActiveNavSection('similar')}
            className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeNavSection === 'similar' ? 'bg-[#3949AB] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Similar Properties
          </button>
        </div>

        {/* ----------------- SECTION: OVERVIEW & DESCRIPTION ----------------- */}
        <div id="section-overview" className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col gap-4">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Info className="w-5 h-5 text-[#3949AB]" />
            <span>Overview & Description</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            {property.description}
          </p>
        </div>

        {/* ----------------- SECTION: PROPERTY DETAILS SPECS ----------------- */}
        <div id="section-details" className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col gap-4">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Building className="w-5 h-5 text-[#3949AB]" />
            <span>Detailed Property Specifications</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 block">Carpet Area</span>
              <span className="text-xs font-black text-slate-900">{property.carpetAreaSqFt} sq.ft</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 block">Built-up / Super Area</span>
              <span className="text-xs font-black text-slate-900">{property.superAreaSqFt} sq.ft</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 block">Floor Number</span>
              <span className="text-xs font-black text-slate-900">Floor {property.floor} of {property.totalFloors}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 block">Total Floors</span>
              <span className="text-xs font-black text-slate-900">{property.totalFloors} Floors</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 block">Facing</span>
              <span className="text-xs font-black text-slate-900">{property.facing} Facing</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 block">Age of Property / Possession</span>
              <span className="text-xs font-black text-slate-900 capitalize">{property.possessionStatus.replace('_', ' ')}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 block">Furnishing Status</span>
              <span className="text-xs font-black text-slate-900 capitalize">{property.furnishing}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 block">Parking</span>
              <span className="text-xs font-black text-slate-900 capitalize">{property.parking} Parking</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 block">Balconies</span>
              <span className="text-xs font-black text-slate-900">{property.balconies} Private Balcony</span>
            </div>
          </div>
        </div>

        {/* ----------------- SECTION: AMENITIES ----------------- */}
        <div id="section-amenities" className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#3949AB]" />
              <span>Society & Apartment Amenities</span>
            </h2>
            <span className="text-xs font-bold text-slate-500">{property.amenities.length} Verified Features</span>
          </div>

          <AmenityGrid amenities={property.amenities} />
        </div>

        {/* ----------------- SECTION: FLOOR PLAN ----------------- */}
        <div id="section-floorplan" className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#3949AB]" />
              <span>Architectural Floor Plan</span>
            </h2>
            <button
              onClick={() => setIsFloorPlanZoomed(!isFloorPlanZoomed)}
              className="text-xs font-bold text-[#3949AB] hover:underline flex items-center gap-1"
            >
              {isFloorPlanZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
              <span>{isFloorPlanZoomed ? 'Reset Zoom' : 'Zoom Plan'}</span>
            </button>
          </div>

          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl bg-slate-900 overflow-hidden flex items-center justify-center p-4">
            <img 
              src={property.floorPlanImage || 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80'} 
              alt="Floor plan"
              className={`max-h-full object-contain transition-all duration-300 ${
                isFloorPlanZoomed ? 'scale-150 cursor-grab' : ''
              }`}
            />
          </div>
        </div>

        {/* ----------------- SECTION: LOCATION & NEARBY PLACES ----------------- */}
        <div id="section-location" className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#3949AB]" />
                <span>Location & Neighborhood Map</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">{property.address}</p>
            </div>
          </div>

          {/* Map Preview Container */}
          <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 relative z-0">
            <div ref={mapContainerRef} className="w-full h-full" />
          </div>

          {/* Nearby Categories & List */}
          <div className="flex flex-col gap-3 pt-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Nearby Landmark Distances
            </h3>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-bold">
              <button
                onClick={() => setNearbyCategory('all')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  nearbyCategory === 'all' ? 'bg-[#3949AB] text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                All Nearby
              </button>
              <button
                onClick={() => setNearbyCategory('schools')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  nearbyCategory === 'schools' ? 'bg-[#3949AB] text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <School className="w-3.5 h-3.5" />
                Schools
              </button>
              <button
                onClick={() => setNearbyCategory('hospitals')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  nearbyCategory === 'hospitals' ? 'bg-[#3949AB] text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Cross className="w-3.5 h-3.5" />
                Hospitals
              </button>
              <button
                onClick={() => setNearbyCategory('shopping')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  nearbyCategory === 'shopping' ? 'bg-[#3949AB] text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Shopping & Malls
              </button>
              <button
                onClick={() => setNearbyCategory('transport')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  nearbyCategory === 'transport' ? 'bg-[#3949AB] text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Train className="w-3.5 h-3.5" />
                Metro & Airport
              </button>
            </div>

            {/* Landmark Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredLandmarks.map((lm, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
                  <span className="font-bold text-slate-800">{lm.name}</span>
                  <span className="text-slate-500 font-semibold bg-white px-2.5 py-1 rounded-xl border border-slate-200">
                    {lm.distance} • {lm.travelTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ----------------- SECTION: BUILDER / AGENT ----------------- */}
        <div id="section-builder" className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col gap-4">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#3949AB]" />
            <span>Listed By Seller / Agent</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
            <div className="flex items-center gap-3">
              <img 
                src={property.ownerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
                alt={property.ownerName}
                className="w-14 h-14 rounded-full object-cover border-2 border-indigo-200 shrink-0" 
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-sm text-slate-900">{property.ownerName}</h4>
                  {property.isOwnerVerified && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 capitalize font-medium">
                  {property.listedBy === 'owner' ? 'Direct Owner (Zero Brokerage)' : property.listedBy === 'builder' ? 'Direct Builder Desk' : 'Certified RERA Property Agent'}
                </p>
                <p className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Response rate: 98% (Avg 10 mins)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleWhatsApp}
                className="flex-1 sm:flex-initial p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  window.location.href = `tel:${property.ownerPhone}`;
                  showToast(`Calling ${property.ownerName}...`, 'info');
                }}
                className="flex-1 sm:flex-initial p-2.5 rounded-xl bg-[#3949AB] hover:bg-[#283593] text-white font-bold text-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* ----------------- SECTION: SIMILAR PROPERTIES ----------------- */}
        {similarProperties.length > 0 && (
          <div id="section-similar" className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col gap-4">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#3949AB]" />
              <span>Similar Properties in {property.city}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {similarProperties.map(simProp => (
                <div
                  key={simProp.id}
                  onClick={() => {
                    setSelectedProperty(simProp);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-xs hover:border-[#3949AB] cursor-pointer transition-all flex flex-col gap-2 group"
                >
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900">
                    <img src={simProp.images[0]} alt={simProp.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-[#3949AB] text-white text-[10px] font-black uppercase">
                      {simProp.bhk}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-black text-slate-900 block">{simProp.priceDisplay}</span>
                    <p className="text-xs font-bold text-slate-700 truncate">{simProp.title}</p>
                    <p className="text-[11px] text-slate-500 truncate">{simProp.locality}, {simProp.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ----------------- STICKY BOTTOM CTA BAR ----------------- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3 px-4 shadow-[0_-6px_25px_rgba(0,0,0,0.08)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          
          <div className="hidden sm:flex items-center gap-2 min-w-0">
            <span className="text-lg font-black text-slate-900">{property.priceDisplay}</span>
            <span className="text-xs text-slate-500 font-semibold">• {property.bhk} in {property.locality}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleWhatsApp}
              className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 active:scale-95 transition-all"
              title="WhatsApp Seller"
            >
              <MessageCircle className="w-5 h-5" />
            </button>

            <button
              onClick={() => openChatWithProperty(property)}
              className="p-3 rounded-2xl bg-slate-100 text-slate-800 hover:bg-slate-200 active:scale-95 transition-all"
              title="In-App Chat"
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            <button
              onClick={() => openEnquiryModal(property)}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-[#3949AB] hover:bg-[#283593] text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#F4A62A]" />
              <span>Contact Seller</span>
            </button>
          </div>
        </div>
      </div>

      {/* ----------------- FULLSCREEN GALLERY MODAL ----------------- */}
      {isFullscreenGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 animate-in fade-in duration-200">
          
          {/* Header Controls */}
          <div className="flex items-center justify-between text-white z-10">
            <span className="text-xs font-bold text-slate-300">
              Photo {fullscreenPhotoIdx + 1} of {property.images.length}
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setZoomLevel(prev => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                title="Zoom"
              >
                {zoomLevel > 1 ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsFullscreenGalleryOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                title="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Center Image Display */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
            <img 
              src={property.images[fullscreenPhotoIdx]} 
              alt={`Fullscreen ${fullscreenPhotoIdx}`}
              style={{ transform: `scale(${zoomLevel})` }}
              className="max-h-full max-w-full object-contain transition-transform duration-200"
            />

            {/* Left & Right Controls */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() => setFullscreenPhotoIdx((prev) => (prev - 1 + property.images.length) % property.images.length)}
                  className="absolute left-2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setFullscreenPhotoIdx((prev) => (prev + 1) % property.images.length)}
                  className="absolute right-2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setFullscreenPhotoIdx(idx)}
                className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === fullscreenPhotoIdx ? 'border-[#F4A62A] scale-105' : 'border-transparent opacity-50'
                }`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
