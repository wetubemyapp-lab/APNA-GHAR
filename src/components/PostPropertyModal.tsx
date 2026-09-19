import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Building2, 
  Check, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Image as ImageIcon, 
  Upload, 
  UploadCloud,
  Plus,
  Trash2, 
  Star, 
  MoveLeft, 
  MoveRight, 
  Phone, 
  Mail, 
  MessageSquare, 
  Eye, 
  Sparkles,
  Save,
  RotateCcw,
  Clock,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { Property, BHKType, PropertyType, ListingType, FurnishingStatus, ParkingType } from '../types';

interface PostPropertyModalProps {
  initialProperty?: Property | null;
  onClose: () => void;
}

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&auto=format&fit=crop&q=80'
];

export const PostPropertyModal: React.FC<PostPropertyModalProps> = ({ initialProperty, onClose }) => {
  const { addProperty, updateExistingProperty, editingProperty, setEditingProperty, selectedCity, currentUser, showToast } = useApp();

  const propToEdit = initialProperty || editingProperty;
  const isEditing = Boolean(propToEdit);

  // Current Wizard Step (1 to 10)
  const [step, setStep] = useState<number>(1);
  const [hasRestoredDraft, setHasRestoredDraft] = useState<boolean>(false);

  // Form State
  const [listingType, setListingType] = useState<ListingType>('buy');
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  
  // Location
  const [city, setCity] = useState<string>(selectedCity.name);
  const [locality, setLocality] = useState<string>(selectedCity.popularLocalities[0] || 'Indiranagar');
  const [address, setAddress] = useState<string>('');
  const [lat, setLat] = useState<number>(selectedCity.lat);
  const [lng, setLng] = useState<number>(selectedCity.lng);

  // Property Details
  const [bhk, setBhk] = useState<BHKType>('3BHK');
  const [bathrooms, setBathrooms] = useState<number>(3);
  const [carpetArea, setCarpetArea] = useState<number>(1450);
  const [superArea, setSuperArea] = useState<number>(1800);
  const [floor, setFloor] = useState<number>(4);
  const [totalFloors, setTotalFloors] = useState<number>(12);
  const [furnishing, setFurnishing] = useState<FurnishingStatus>('semi-furnished');
  const [parking, setParking] = useState<ParkingType>('both');
  const [facing, setFacing] = useState<string>('East');
  const [amenities, setAmenities] = useState<string[]>([
    'Clubhouse & Gym', 'Swimming Pool', 'Covered Parking', '24x7 Security & CCTV', 'Power Backup'
  ]);

  // Pricing
  const [priceInLakhs, setPriceInLakhs] = useState<number>(145);
  const [isNegotiable, setIsNegotiable] = useState<boolean>(true);

  // Photos
  const [photos, setPhotos] = useState<string[]>([
    SAMPLE_PHOTOS[0],
    SAMPLE_PHOTOS[1],
    SAMPLE_PHOTOS[2]
  ]);
  const [coverIndex, setCoverIndex] = useState<number>(0);
  const [newPhotoUrl, setNewPhotoUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Description
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Contact Preferences
  const [contactMethod, setContactMethod] = useState<'phone' | 'whatsapp' | 'both'>('both');
  const [preferredHours, setPreferredHours] = useState<string>('9 AM - 8 PM');
  const [hidePhone, setHidePhone] = useState<boolean>(false);

  // Prepopulate form if propToEdit is present (Edit Listing flow)
  useEffect(() => {
    if (propToEdit) {
      setListingType(propToEdit.listingType || 'buy');
      setPropertyType(propToEdit.propertyType || 'apartment');
      setCity(propToEdit.city || selectedCity.name);
      setLocality(propToEdit.locality || selectedCity.popularLocalities[0]);
      setAddress(propToEdit.address || '');
      setLat(propToEdit.lat || selectedCity.lat);
      setLng(propToEdit.lng || selectedCity.lng);
      setBhk(propToEdit.bhk || '3BHK');
      setBathrooms(propToEdit.bathrooms || 2);
      setCarpetArea(propToEdit.carpetAreaSqFt || 1200);
      setSuperArea(propToEdit.superAreaSqFt || 1500);
      setFloor(propToEdit.floor || 1);
      setTotalFloors(propToEdit.totalFloors || 10);
      setFurnishing(propToEdit.furnishing || 'semi-furnished');
      setParking(propToEdit.parking || 'car');
      setFacing(propToEdit.facing || 'East');
      if (propToEdit.amenities?.length) setAmenities(propToEdit.amenities);

      // Price
      if (propToEdit.price) {
        if (propToEdit.listingType === 'buy') {
          setPriceInLakhs(propToEdit.price >= 100000 ? Math.round(propToEdit.price / 100000) : propToEdit.price);
        } else {
          setPriceInLakhs(propToEdit.price >= 1000 ? Math.round(propToEdit.price / 1000) : propToEdit.price);
        }
      }
      setIsNegotiable(Boolean(propToEdit.priceDisplay?.toLowerCase().includes('negotiable')));

      // Photos
      if (propToEdit.images?.length) {
        setPhotos(propToEdit.images);
      }
      
      // Title & Description
      setTitle(propToEdit.title || '');
      setDescription(propToEdit.description || '');

      // Hide phone
      setHidePhone(propToEdit.ownerPhone === 'Hidden');
    }
  }, [propToEdit, selectedCity]);

  // Auto-Save Draft to LocalStorage (only when creating new property)
  useEffect(() => {
    if (isEditing) return; // Do not overwrite draft when editing existing property
    const draftKey = 'apnaghar_post_property_draft';
    const draft = localStorage.getItem(draftKey);
    if (draft && !hasRestoredDraft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed.step) setStep(parsed.step);
        if (parsed.listingType) setListingType(parsed.listingType);
        if (parsed.propertyType) setPropertyType(parsed.propertyType);
        if (parsed.city) setCity(parsed.city);
        if (parsed.locality) setLocality(parsed.locality);
        if (parsed.address) setAddress(parsed.address);
        if (parsed.bhk) setBhk(parsed.bhk);
        if (parsed.carpetArea) setCarpetArea(parsed.carpetArea);
        if (parsed.priceInLakhs) setPriceInLakhs(parsed.priceInLakhs);
        if (parsed.photos?.length) setPhotos(parsed.photos);
        if (parsed.description) setDescription(parsed.description);
        setHasRestoredDraft(true);
      } catch (e) {
        console.error('Error restoring draft', e);
      }
    }
  }, [isEditing]);

  // Save changes to localStorage draft
  useEffect(() => {
    const draftData = {
      step,
      listingType,
      propertyType,
      city,
      locality,
      address,
      bhk,
      bathrooms,
      carpetArea,
      superArea,
      floor,
      totalFloors,
      furnishing,
      parking,
      facing,
      priceInLakhs,
      isNegotiable,
      photos,
      description,
      title
    };
    localStorage.setItem('apnaghar_post_property_draft', JSON.stringify(draftData));
  }, [
    step, listingType, propertyType, city, locality, address, bhk, bathrooms,
    carpetArea, superArea, floor, totalFloors, furnishing, parking, facing,
    priceInLakhs, isNegotiable, photos, description, title
  ]);

  const clearDraft = () => {
    localStorage.removeItem('apnaghar_post_property_draft');
    showToast('Draft cleared', 'info');
  };

  // Photo handlers
  const handleFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (fileArray.length === 0) {
      showToast('Please select valid image files (JPG, PNG, WEBP)', 'error');
      return;
    }
    
    if (photos.length >= 10) {
      showToast('Maximum 10 photos limit reached', 'error');
      return;
    }

    const remainingSlots = 10 - photos.length;
    const filesToProcess = fileArray.slice(0, remainingSlots);

    if (filesToProcess.length < fileArray.length) {
      showToast(`Only ${remainingSlots} photo(s) added as limit of 10 was reached`, 'info');
    }

    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 85) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 120);

    const newPhotosList: string[] = [];
    let processedCount = 0;

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newPhotosList.push(e.target.result as string);
        }
        processedCount++;

        if (processedCount === filesToProcess.length) {
          setTimeout(() => {
            clearInterval(interval);
            setUploadProgress(100);
            setTimeout(() => {
              setPhotos(prev => [...prev, ...newPhotosList]);
              setIsUploading(false);
              setUploadProgress(0);
              showToast(`${newPhotosList.length} photo(s) uploaded successfully!`, 'success');
            }, 250);
          }, 300);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    if (photos.length >= 10) {
      showToast('Maximum 10 photos allowed', 'error');
      return;
    }
    setPhotos([...photos, newPhotoUrl.trim()]);
    setNewPhotoUrl('');
    showToast('Photo added from URL', 'success');
  };

  const handleAddPresetPhoto = (presetUrl: string) => {
    if (photos.length >= 10) {
      showToast('Maximum 10 photos allowed', 'error');
      return;
    }
    if (photos.includes(presetUrl)) {
      showToast('Preset photo already added', 'info');
      return;
    }
    setPhotos([...photos, presetUrl]);
    showToast('Preset photo added', 'success');
  };

  const handleDeletePhoto = (index: number) => {
    if (photos.length <= 1) {
      showToast('Minimum 1 photo is required', 'error');
      return;
    }
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    if (coverIndex === index) {
      setCoverIndex(0);
    } else if (coverIndex > index) {
      setCoverIndex(prev => prev - 1);
    }
    showToast('Photo deleted', 'info');
  };

  const handleMovePhoto = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= photos.length) return;
    const updated = [...photos];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    if (coverIndex === index) {
      setCoverIndex(targetIndex);
    } else if (coverIndex === targetIndex) {
      setCoverIndex(index);
    }

    setPhotos(updated);
  };

  // Step Navigation
  const nextStep = () => {
    if (step === 3 && !locality) {
      showToast('Please select locality', 'error');
      return;
    }
    if (step === 6 && photos.length === 0) {
      showToast('Please add at least 1 photo', 'error');
      return;
    }
    setStep(prev => Math.min(prev + 1, 10));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  // Final Publish
  const handlePublish = () => {
    const finalPrice = listingType === 'buy' ? priceInLakhs * 100000 : priceInLakhs * 1000;
    const priceDisplay = listingType === 'buy' 
      ? `₹${priceInLakhs} Lakh` 
      : `₹${priceInLakhs.toLocaleString()}/month`;

    const pricePerSqFt = Math.round(finalPrice / (carpetArea || 1));

    // Reorder cover photo to index 0
    const orderedPhotos = [...photos];
    if (coverIndex > 0 && coverIndex < orderedPhotos.length) {
      const cover = orderedPhotos.splice(coverIndex, 1)[0];
      orderedPhotos.unshift(cover);
    }

    const defaultTitle = title.trim() || `${bhk} ${propertyType.toUpperCase()} for ${listingType === 'buy' ? 'Sale' : 'Rent'} in ${locality}`;
    const defaultDesc = description.trim() || `Beautiful ${bhk} property located in ${locality}, ${city}. Features ${furnishing} interiors, ${facing} facing balcony, and top society amenities.`;

    if (isEditing && propToEdit) {
      updateExistingProperty(propToEdit.id, {
        title: defaultTitle,
        description: defaultDesc,
        listingType,
        propertyType,
        bhk,
        price: finalPrice,
        priceDisplay: `${priceDisplay}${isNegotiable ? ' (Negotiable)' : ''}`,
        pricePerSqFt: listingType === 'buy' ? pricePerSqFt : 0,
        carpetAreaSqFt: Number(carpetArea),
        superAreaSqFt: Number(superArea),
        city,
        locality,
        address: address || `${locality}, ${city}`,
        lat,
        lng,
        bathrooms: Number(bathrooms),
        furnishing,
        facing: facing as any,
        floor: Number(floor),
        totalFloors: Number(totalFloors),
        parking,
        amenities,
        images: orderedPhotos,
        ownerPhone: hidePhone ? 'Hidden' : currentUser.phone
      });
      showToast('Listing updated successfully!', 'success');
      setEditingProperty(null);
      setStep(10);
      return;
    }

    const newProperty: Property = {
      id: `prop-user-${Date.now()}`,
      title: defaultTitle,
      description: defaultDesc,
      listingType,
      propertyType,
      bhk,
      price: finalPrice,
      priceDisplay: `${priceDisplay}${isNegotiable ? ' (Negotiable)' : ''}`,
      pricePerSqFt: listingType === 'buy' ? pricePerSqFt : 0,
      carpetAreaSqFt: Number(carpetArea),
      superAreaSqFt: Number(superArea),
      city,
      state: selectedCity.state,
      pincode: '560038',
      locality,
      address: address || `${locality}, ${city}`,
      lat,
      lng,
      bathrooms: Number(bathrooms),
      balconies: 2,
      furnishing,
      facing: facing as any,
      floor: Number(floor),
      totalFloors: Number(totalFloors),
      parking,
      possessionStatus: 'ready_to_move',
      possessionDate: 'Ready to Move',
      availableFrom: 'Immediately',
      isReraApproved: true,
      reraId: `PRM/KA/RERA/${Date.now().toString().slice(-6)}`,
      amenities,
      images: orderedPhotos,
      listedBy: 'owner',
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerPhone: hidePhone ? 'Hidden' : currentUser.phone,
      ownerWhatsapp: currentUser.phone,
      ownerAvatar: currentUser.avatar,
      isOwnerVerified: true,
      localityScore: {
        connectivity: 4.8,
        safety: 4.9,
        lifestyle: 4.7,
        greenCover: 4.6,
        overall: 4.8
      },
      landmarks: [
        { name: `${locality} Metro Station`, type: 'metro', distance: '500 m', travelTime: '3 min walk' }
      ],
      isFeatured: true,
      isAvailable: true,
      maintenance: listingType === 'buy' ? 3500 : 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewsCount: 1,
      inquiryCount: 0,
      savedCount: 0
    };

    addProperty(newProperty);
    clearDraft();
    setStep(10); // Transition to Step 10: Publish Success Screen
    showToast('Property published successfully!', 'success');
  };

  const STEP_TITLES = [
    'Purpose',
    'Property Type',
    'Location',
    'Details',
    'Price',
    'Photos',
    'Description',
    'Contact',
    'Preview',
    'Publish'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh] border border-slate-200">
        
        {/* HEADER BAR */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#E53935] text-white flex items-center justify-center font-black shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                {isEditing ? 'Edit Property Listing' : 'Post Property Free'}
              </h3>
              <p className="text-xs font-medium text-slate-500">
                Step {step} of 10: <span className="font-bold text-slate-800">{STEP_TITLES[step - 1]}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearDraft}
              title="Clear Saved Draft"
              className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose} 
              className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-slate-100 h-1.5 overflow-hidden shrink-0">
          <div 
            className="bg-[#E53935] h-full transition-all duration-300 ease-out" 
            style={{ width: `${(step / 10) * 100}%` }}
          />
        </div>

        {/* STEP PILLS TABS (SCROLLABLE) */}
        {step < 10 && (
          <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-200 overflow-x-auto flex items-center gap-1.5 shrink-0 no-scrollbar">
            {STEP_TITLES.map((t, idx) => {
              const sNum = idx + 1;
              const isActive = step === sNum;
              const isCompleted = step > sNum;
              return (
                <button
                  key={sNum}
                  onClick={() => {
                    if (sNum < step) setStep(sNum);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition flex items-center gap-1 ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-2xs' 
                      : isCompleted 
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                        : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : <span>{sNum}.</span>}
                  <span>{t}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* FORM BODY */}
        <div className="p-5 overflow-y-auto flex-1 text-xs">

          {/* STEP 1: PURPOSE */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">What is your purpose?</h4>
                <p className="text-slate-500 text-xs mt-0.5">Select whether you want to sell or rent out your property.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setListingType('buy')}
                  className={`p-5 rounded-2xl border-2 text-center transition flex flex-col items-center gap-2 ${
                    listingType === 'buy'
                      ? 'bg-red-50 border-[#E53935] text-red-950 font-black shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Building2 className={`w-8 h-8 ${listingType === 'buy' ? 'text-red-600' : 'text-slate-400'}`} />
                  <span className="text-sm font-extrabold">Sell Property</span>
                  <span className="text-[10px] text-slate-500 font-normal">Resale or new construction</span>
                </button>

                <button
                  type="button"
                  onClick={() => setListingType('rent')}
                  className={`p-5 rounded-2xl border-2 text-center transition flex flex-col items-center gap-2 ${
                    listingType === 'rent'
                      ? 'bg-red-50 border-[#E53935] text-red-950 font-black shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Tag className={`w-8 h-8 ${listingType === 'rent' ? 'text-red-600' : 'text-slate-400'}`} />
                  <span className="text-sm font-extrabold">Rent Out Property</span>
                  <span className="text-[10px] text-slate-500 font-normal">Residential rental or PG</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PROPERTY TYPE */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">Select Property Category</h4>
                <p className="text-slate-500 text-xs mt-0.5">Choose the type that best describes your real estate asset.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  { id: 'apartment', label: 'Apartment / Flat', desc: 'Gated community or highrise flat' },
                  { id: 'villa', label: 'Independent House / Villa', desc: 'Standalone home or villa' },
                  { id: 'plot', label: 'Plot / Land', desc: 'Residential or commercial layout plot' },
                  { id: 'commercial', label: 'Commercial Office / Shop', desc: 'Office space or retail outlet' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPropertyType(item.id as PropertyType)}
                    className={`p-4 rounded-2xl border-2 text-left transition ${
                      propertyType === item.id
                        ? 'bg-red-50 border-[#E53935] text-red-950 font-bold shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block text-xs font-black">{item.label}</span>
                    <span className="block text-[10px] text-slate-500 font-medium mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: LOCATION */}
          {step === 3 && (
            <div className="space-y-3.5">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">Where is your property located?</h4>
                <p className="text-slate-500 text-xs mt-0.5">Providing exact locality helps buyers discover your property on maps.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Locality / Neighborhood</label>
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-extrabold text-slate-900"
                >
                  {selectedCity.popularLocalities.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Complete Building Address</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Tower number, street name, landmarks..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                />
              </div>

              <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <div>
                    <span className="block text-xs font-extrabold text-slate-800">Map Pin Lat/Lng</span>
                    <span className="block text-[10px] text-slate-500">{lat.toFixed(4)}, {lng.toFixed(4)}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Auto Geocoded
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: PROPERTY DETAILS */}
          {step === 4 && (
            <div className="space-y-3.5">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">Property Details & Specs</h4>
                <p className="text-slate-500 text-xs mt-0.5">Specify configuration, carpet area, floor number, and facing.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bedrooms (BHK)</label>
                  <select
                    value={bhk}
                    onChange={(e) => setBhk(e.target.value as BHKType)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  >
                    <option value="1BHK">1 BHK</option>
                    <option value="2BHK">2 BHK</option>
                    <option value="3BHK">3 BHK</option>
                    <option value="4BHK">4 BHK</option>
                    <option value="4+BHK">4+ BHK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    min={1}
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Carpet Area (sq.ft)</label>
                  <input
                    type="number"
                    min={100}
                    value={carpetArea}
                    onChange={(e) => setCarpetArea(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Super Area (sq.ft)</label>
                  <input
                    type="number"
                    min={100}
                    value={superArea}
                    onChange={(e) => setSuperArea(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Floor No</label>
                  <input
                    type="number"
                    value={floor}
                    onChange={(e) => setFloor(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Total Floors</label>
                  <input
                    type="number"
                    value={totalFloors}
                    onChange={(e) => setTotalFloors(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Facing</label>
                  <select
                    value={facing}
                    onChange={(e) => setFacing(e.target.value as any)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                  >
                    <option value="East">East</option>
                    <option value="North">North</option>
                    <option value="North-East">North-East</option>
                    <option value="West">West</option>
                    <option value="South">South</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Furnishing</label>
                  <select
                    value={furnishing}
                    onChange={(e) => setFurnishing(e.target.value as FurnishingStatus)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 capitalize font-semibold"
                  >
                    <option value="semi-furnished">Semi-Furnished</option>
                    <option value="fully-furnished">Fully-Furnished</option>
                    <option value="unfurnished">Unfurnished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Parking</label>
                  <select
                    value={parking}
                    onChange={(e) => setParking(e.target.value as ParkingType)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 capitalize font-semibold"
                  >
                    <option value="both">Car & Bike</option>
                    <option value="car">Car Only</option>
                    <option value="bike">Bike Only</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: PRICE */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">Pricing Details</h4>
                <p className="text-slate-500 text-xs mt-0.5">Set realistic pricing based on current market trends in {locality}.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <label className="block font-extrabold text-slate-800 text-xs">
                  {listingType === 'buy' ? 'Expected Sale Price (in ₹ Lakhs)' : 'Monthly Rent Amount (in ₹ Thousands)'}
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-slate-900">₹</span>
                  <input
                    type="number"
                    min={1}
                    value={priceInLakhs}
                    onChange={(e) => setPriceInLakhs(Number(e.target.value))}
                    className="flex-1 p-3 rounded-2xl bg-white border border-slate-300 text-lg font-black text-slate-900 focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                  <span className="text-xs font-extrabold text-slate-500">
                    {listingType === 'buy' ? 'Lakhs' : 'Thousand/mo'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-100 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="block text-xs font-extrabold text-slate-900">Price Negotiable?</span>
                  <span className="block text-[10px] text-slate-500">Indicate willingness to negotiate final terms</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNegotiable}
                    onChange={(e) => setIsNegotiable(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 6: PHOTOS */}
          {step === 6 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">Property Photos ({photos.length}/10)</h4>
                <p className="text-slate-500 text-xs mt-0.5">Upload up to 10 high-resolution photos. Set cover image and reorder as needed.</p>
              </div>

              {/* PHOTO QUOTA PROGRESS BAR */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-800">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-red-600" />
                    <span>Upload Status & Limit</span>
                  </div>
                  <span className="text-slate-700 font-bold">
                    {photos.length} of 10 photos uploaded ({Math.round((photos.length / 10) * 100)}%)
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      photos.length >= 10 ? 'bg-amber-500' : photos.length >= 1 ? 'bg-red-600' : 'bg-slate-300'
                    }`}
                    style={{ width: `${(photos.length / 10) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-0.5">
                  <span>Minimum 1 photo required</span>
                  <span className="text-slate-600 font-bold">{10 - photos.length} slot(s) remaining</span>
                </div>
              </div>

              {/* DYNAMIC UPLOADING PROGRESS BAR */}
              {isUploading && (
                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-extrabold text-blue-900">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                      Processing & Uploading Images...
                    </span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* HIDDEN FILE INPUT */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
              />

              {/* DRAG AND DROP ZONE */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 rounded-2xl border-2 border-dashed text-center transition cursor-pointer flex flex-col items-center justify-center gap-2 ${
                  dragActive 
                    ? 'border-red-600 bg-red-50/80 scale-[1.01]' 
                    : photos.length >= 10
                      ? 'border-slate-200 bg-slate-100 opacity-60 cursor-not-allowed'
                      : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white text-red-600 border border-slate-200 flex items-center justify-center shadow-xs">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">
                    {photos.length >= 10 ? 'Maximum 10 photos limit reached' : 'Click to upload photos or drag & drop here'}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Supports JPG, PNG, WEBP (Up to 10MB per file)
                  </p>
                </div>
                {photos.length < 10 && (
                  <button
                    type="button"
                    className="mt-1 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-extrabold text-[11px] hover:bg-slate-800 transition"
                  >
                    Select Files from Device
                  </button>
                )}
              </div>

              {/* PRESET SAMPLE PHOTOS QUICK ADD */}
              <div>
                <span className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  Quick Add Sample Interior & Exterior Photos:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Living Room', url: SAMPLE_PHOTOS[0] },
                    { label: 'Master Bedroom', url: SAMPLE_PHOTOS[1] },
                    { label: 'Modular Kitchen', url: SAMPLE_PHOTOS[2] },
                    { label: 'Building Exterior', url: SAMPLE_PHOTOS[3] },
                    { label: 'Scenic Balcony', url: SAMPLE_PHOTOS[4] }
                  ].map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      disabled={photos.length >= 10}
                      onClick={() => handleAddPresetPhoto(preset.url)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-slate-200 transition flex items-center gap-1 disabled:opacity-40"
                    >
                      <Plus className="w-3 h-3 text-red-600" />
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* PASTE PHOTO URL FALLBACK */}
              <div className="flex gap-2 pt-1">
                <input
                  type="url"
                  placeholder="Or paste photo URL directly..."
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                />
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-white font-extrabold text-xs shrink-0 hover:bg-slate-900"
                >
                  Add URL
                </button>
              </div>

              {/* PREVIEW GRID WITH REORDER & DELETE BUTTONS */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-slate-800">
                    Uploaded Photos ({photos.length})
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Use arrows to reorder • First photo is cover
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {photos.map((photo, idx) => {
                    const isCover = coverIndex === idx;
                    return (
                      <div key={idx} className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 group shadow-xs">
                        <img src={photo} alt={`Property photo ${idx + 1}`} className="w-full h-32 object-cover" />
                        
                        {/* Index Badge */}
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-extrabold">
                          #{idx + 1}
                        </span>

                        {/* Cover Badge */}
                        {isCover && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-black shadow-xs flex items-center gap-1">
                            <Star className="w-3 h-3 fill-white text-white" />
                            Cover Photo
                          </span>
                        )}

                        {/* Control Bar Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-200 flex flex-col justify-between p-2">
                          {/* Top Right Actions: Delete */}
                          <div className="flex justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => handleDeletePhoto(idx)}
                              className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition shadow-xs"
                              title="Delete Photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Bottom Row Actions: Move Left, Set Cover, Move Right */}
                          <div className="flex items-center justify-between gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMovePhoto(idx, 'left')}
                              className="p-1.5 rounded-lg bg-white/90 text-slate-900 hover:bg-white disabled:opacity-30 transition"
                              title="Move Left / Earlier"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setCoverIndex(idx)}
                              className={`px-2 py-1 rounded-lg text-[10px] font-extrabold transition flex items-center gap-1 ${
                                isCover 
                                  ? 'bg-amber-400 text-slate-950 shadow-2xs' 
                                  : 'bg-white/90 text-slate-900 hover:bg-white'
                              }`}
                            >
                              <Star className={`w-3 h-3 ${isCover ? 'fill-slate-950' : ''}`} />
                              <span>{isCover ? 'Cover' : 'Set Cover'}</span>
                            </button>

                            <button
                              type="button"
                              disabled={idx === photos.length - 1}
                              onClick={() => handleMovePhoto(idx, 'right')}
                              className="p-1.5 rounded-lg bg-white/90 text-slate-900 hover:bg-white disabled:opacity-30 transition"
                              title="Move Right / Later"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: DESCRIPTION */}
          {step === 7 && (
            <div className="space-y-3.5">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">Description & Highlights</h4>
                <p className="text-slate-500 text-xs mt-0.5">Describe key features, society advantages, and nearby points of interest.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Listing Headline / Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`e.g., Luxury ${bhk} East Facing Flat in ${locality}`}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe floor plan, interior woodwork, natural lighting, balcony views, society amenities, and nearby metro..."
                  className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 font-medium"
                />
              </div>
            </div>
          )}

          {/* STEP 8: CONTACT PREFERENCES */}
          {step === 8 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">Contact Preferences</h4>
                <p className="text-slate-500 text-xs mt-0.5">Choose how buyers and tenants can reach you.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Preferred Contact Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'phone', label: 'Phone Call', icon: Phone },
                    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                    { id: 'both', label: 'Both', icon: ShieldCheck }
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setContactMethod(m.id as any)}
                      className={`p-3 rounded-2xl border text-center font-extrabold flex flex-col items-center gap-1.5 ${
                        contactMethod === m.id
                          ? 'bg-red-50 border-red-600 text-red-950'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <m.icon className="w-4 h-4 text-red-600" />
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time to Receive Calls</label>
                <input
                  type="text"
                  value={preferredHours}
                  onChange={(e) => setPreferredHours(e.target.value)}
                  placeholder="e.g. 9 AM - 8 PM"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                />
              </div>

              <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hidePhone}
                  onChange={(e) => setHidePhone(e.target.checked)}
                  className="rounded border-slate-300 text-red-600"
                />
                <div>
                  <span className="block text-xs font-extrabold text-slate-900">Mask Mobile Number</span>
                  <span className="block text-[10px] text-slate-500">Only verified buyers can view phone number</span>
                </div>
              </label>
            </div>
          )}

          {/* STEP 9: PREVIEW */}
          {step === 9 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">Listing Preview</h4>
                <p className="text-slate-500 text-xs mt-0.5">Review your property details before publishing live.</p>
              </div>

              {/* Preview Card */}
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="relative h-44 w-full bg-slate-100">
                  <img src={photos[coverIndex] || photos[0]} alt="Cover" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-extrabold text-xs">
                    {bhk} • {propertyType.toUpperCase()}
                  </span>
                  <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs shadow-md">
                    ₹{priceInLakhs} {listingType === 'buy' ? 'Lakh' : 'Thousand/mo'}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {title || `${bhk} ${propertyType} in ${locality}`}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{locality}, {city}</span>
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px] font-bold text-slate-700">
                    <div>Carpet: {carpetArea} sq.ft</div>
                    <div>Floor: {floor}/{totalFloors}</div>
                    <div className="capitalize">{furnishing}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 10: PUBLISH SUCCESS */}
          {step === 10 && (
            <div className="py-8 text-center flex flex-col items-center justify-center animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-inner">
                <CheckCircle2 className="w-12 h-12 stroke-[2]" />
              </div>

              <h3 className="text-2xl font-black text-slate-900">
                Property Published Successfully!
              </h3>
              <p className="text-xs font-medium text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed">
                Your listing is now live across ApnaGhar. Thousands of active buyers in {city} can now contact you directly with Zero Brokerage.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 rounded-2xl bg-[#E53935] hover:bg-red-700 text-white font-black text-xs shadow-lg shadow-red-600/30 transition active:scale-98"
              >
                Done
              </button>
            </div>
          )}

        </div>

        {/* FOOTER ACTIONS BAR */}
        {step < 10 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="py-2.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-xs border border-slate-200 transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 9 ? (
              <button
                type="button"
                onClick={nextStep}
                className="py-2.5 px-6 rounded-2xl bg-[#E53935] hover:bg-red-700 text-white font-black text-xs shadow-md shadow-red-600/20 transition flex items-center gap-1.5 active:scale-98"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                className="py-2.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5 active:scale-98"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Publish Property</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
