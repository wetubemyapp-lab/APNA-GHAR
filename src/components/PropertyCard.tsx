import React, { useState } from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Maximize2, 
  Phone, 
  MessageCircle, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Car,
  BadgeCheck,
  Eye,
  UserCheck
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, compact = false }) => {
  const { 
    setSelectedProperty, 
    toggleSaveProperty, 
    isPropertySaved,
    showToast
  } = useApp();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const isSaved = isPropertySaved(property.id);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev + 1) % property.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Hi, I am inquiring about "${property.title}" (${property.priceDisplay}) on Nestora: ${window.location.origin}`;
    window.open(`https://wa.me/${property.ownerWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
    showToast('Opening WhatsApp chat with owner/agent', 'info');
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${property.ownerPhone}`;
    showToast(`Calling ${property.ownerName}...`, 'info');
  };

  // Format possession status for badge & metadata line
  const formattedPossession = property.possessionStatus === 'ready_to_move' 
    ? 'Ready to move' 
    : property.possessionStatus === 'under_construction' 
    ? 'Under Construction' 
    : 'Ready to move';

  // Format property type title
  const formattedType = property.propertyType === 'apartment' 
    ? 'Apartment' 
    : property.propertyType === 'villa' 
    ? 'Villa' 
    : property.propertyType === 'builder-floor' 
    ? 'Builder Floor' 
    : property.propertyType === 'house' 
    ? 'House' 
    : 'Property';

  // Format property title (Example: "2 BHK Apartment in Green Valley")
  const propertyTitle = property.title.includes(property.bhk) 
    ? property.title 
    : `${property.bhk} ${formattedType} in ${property.projectName || property.locality}`;

  // Metadata text: "2 BHK • 1,150 sq.ft • Ready to move"
  const metadataText = `${property.bhk} • ${property.carpetAreaSqFt.toLocaleString()} sq.ft • ${formattedPossession}`;

  // Location string: "Vaishali Nagar, Jaipur"
  const locationText = `${property.locality}, ${property.city}`;

  // Furnishing status label
  const furnishingLabel = property.furnishing === 'fully-furnished'
    ? 'Fully-Furnished'
    : property.furnishing === 'semi-furnished'
    ? 'Semi-Furnished'
    : 'Unfurnished';

  // Parking label
  const parkingLabel = property.parking || '1 Covered Parking';

  return (
    <div 
      onClick={() => setSelectedProperty(property)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col"
    >
      {/* 1. IMAGE AREA */}
      <div className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden">
        <img 
          src={property.images[activeImageIdx] || property.images[0]} 
          alt={propertyTitle} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Scrim for readable badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges Area */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Status Badge (Ready to move / Under Construction) */}
            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide shadow-md text-white backdrop-blur-md border ${
              property.possessionStatus === 'ready_to_move'
                ? 'bg-emerald-600/90 border-emerald-400/30'
                : 'bg-amber-600/90 border-amber-400/30'
            }`}>
              {formattedPossession}
            </span>

            {/* Zero Brokerage Badge if listed by owner */}
            {property.listedBy === 'owner' && (
              <span className="px-2 py-1 rounded-lg bg-indigo-600/90 border border-indigo-400/30 text-white text-[10px] font-bold tracking-tight shadow-md flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                Zero Brokerage
              </span>
            )}
          </div>

          {/* Right Top Controls: Heart Favorite & Image Count Badge */}
          <div className="flex items-center gap-1.5">
            {/* Image Count Indicator (e.g. 1/8) */}
            <span className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wider border border-white/20">
              {activeImageIdx + 1}/{property.images.length || 1}
            </span>

            {/* Favorite Heart Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveProperty(property.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all active:scale-90 border ${
                isSaved 
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md' 
                  : 'bg-black/40 text-white border-white/20 hover:bg-black/60 hover:text-rose-400'
              }`}
              title={isSaved ? 'Shortlisted' : 'Save Property'}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Gallery Navigation Arrows (if multiple images) */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1 z-10 pointer-events-none">
              {property.images.slice(0, 5).map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === activeImageIdx ? 'bg-white w-3.5' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Bottom Left Price Pill over image */}
        <div className="absolute bottom-2.5 left-2.5 z-10 flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-lg">
            {property.priceDisplay}
          </span>
          {property.pricePerSqFt > 0 && (
            <span className="text-[11px] font-semibold text-slate-200 drop-shadow">
              ₹{property.pricePerSqFt.toLocaleString()}/sq.ft
            </span>
          )}
        </div>
      </div>

      {/* 2. PROPERTY DETAILS CONTENT AREA */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Property Title (e.g. "2 BHK Apartment in Green Valley") */}
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug line-clamp-1 group-hover:text-[#3949AB] transition-colors">
            {propertyTitle}
          </h3>

          {/* Metadata Line: "2 BHK • 1,150 sq.ft • Ready to move" */}
          <div className="text-xs font-semibold text-[#3949AB] mt-0.5 flex items-center gap-1.5">
            <span>{metadataText}</span>
          </div>

          {/* Location: "Vaishali Nagar, Jaipur" */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{locationText}</span>
          </div>

          {/* Additional Features Row: Verified, Posted By, Parking, Furnishing */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            {/* Verified Badge */}
            {(property.isReraApproved || property.isOwnerVerified || property.listedBy === 'owner') && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                <BadgeCheck className="w-3 h-3 text-emerald-600" />
                Verified
              </span>
            )}

            {/* Posted By Owner / Agent */}
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-50 text-[#3949AB] text-[11px] font-bold border border-indigo-100">
              <UserCheck className="w-3 h-3 text-[#3949AB]" />
              Posted by {property.listedBy === 'owner' ? 'Owner' : property.listedBy === 'builder' ? 'Builder' : 'Agent'}
            </span>

            {/* Parking */}
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
              <Car className="w-3 h-3 text-slate-500" />
              {parkingLabel}
            </span>

            {/* Furnishing Status */}
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
              <CheckCircle2 className="w-3 h-3 text-slate-500" />
              {furnishingLabel}
            </span>
          </div>
        </div>

        {/* 3. CTA BUTTONS AREA (Primary "View Details" + Secondary "Contact") */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2.5 mt-auto">
          {/* Secondary CTA: Contact (WhatsApp / Call) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleWhatsApp}
              className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95"
              title="WhatsApp Contact"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Contact</span>
            </button>
            <button
              onClick={handleCall}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all active:scale-95"
              title="Call Owner/Agent"
            >
              <Phone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Primary CTA: View Details */}
          <button
            onClick={() => setSelectedProperty(property)}
            className="flex-1 py-2 px-3.5 rounded-xl bg-[#3949AB] hover:bg-[#283593] text-white text-xs font-bold shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

