import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Building2, 
  Check, 
  CheckCircle2 
} from 'lucide-react';
import { Property, BHKType, PropertyType, ListingType, FurnishingStatus, ParkingType } from '../types';

interface PostPropertyModalProps {
  onClose: () => void;
}

export const PostPropertyModal: React.FC<PostPropertyModalProps> = ({ onClose }) => {
  const { addProperty, selectedCity, currentUser } = useApp();

  const [listingType, setListingType] = useState<ListingType>('buy');
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [bhk, setBhk] = useState<BHKType>('3BHK');
  const [title, setTitle] = useState('');
  const [priceInLakhs, setPriceInLakhs] = useState<number>(145);
  const [carpetArea, setCarpetArea] = useState<number>(1450);
  const [locality, setLocality] = useState(selectedCity.popularLocalities[0] || 'Indiranagar');
  const [address, setAddress] = useState('');
  const [furnishing, setFurnishing] = useState<FurnishingStatus>('semi-furnished');
  const [facing, setFacing] = useState<'East' | 'North' | 'North-East' | 'West' | 'South'>('East');
  const [bathrooms, setBathrooms] = useState<number>(3);
  const [balconies, setBalconies] = useState<number>(2);
  const [floor, setFloor] = useState<number>(4);
  const [totalFloors, setTotalFloors] = useState<number>(12);
  const [parking, setParking] = useState<ParkingType>('both');
  const [maintenance, setMaintenance] = useState<number>(4200);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Clubhouse & Gym', 'Swimming Pool', 'Covered Parking', '24x7 Security & CCTV', 'Power Backup'
  ]);

  const allAmenitiesList = [
    'Clubhouse & Gym',
    'Swimming Pool',
    'Covered Parking',
    '24x7 Security & CCTV',
    'Power Backup',
    'Children Play Area',
    'Jogging Track',
    'Badminton Court',
    'EV Charging Station',
    'Rainwater Harvesting',
    'Modular Kitchen',
    'Piped Gas'
  ];

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const price = listingType === 'buy' ? priceInLakhs * 100000 : priceInLakhs * 1000;
    const priceDisplay = listingType === 'buy' 
      ? `₹${priceInLakhs} Lakh` 
      : `₹${priceInLakhs.toLocaleString()}/month`;

    const pricePerSqFt = Math.round(price / (carpetArea || 1));

    const newProp: Property = {
      id: `prop-user-${Date.now()}`,
      title: title || `${bhk} ${propertyType} in ${locality}`,
      description: description || `Well-ventilated, premium ${bhk} property situated in prime ${locality}, ${selectedCity.name}. Equipped with top society amenities.`,
      listingType,
      propertyType,
      bhk,
      price,
      priceDisplay,
      pricePerSqFt: listingType === 'buy' ? pricePerSqFt : 0,
      carpetAreaSqFt: Number(carpetArea),
      superAreaSqFt: Math.round(Number(carpetArea) * 1.25),
      city: selectedCity.name,
      state: selectedCity.state,
      pincode: '560038',
      locality,
      address: address || `${locality}, ${selectedCity.name}`,
      lat: selectedCity.lat + (Math.random() - 0.5) * 0.04,
      lng: selectedCity.lng + (Math.random() - 0.5) * 0.04,
      bathrooms: Number(bathrooms),
      balconies: Number(balconies),
      furnishing,
      facing,
      floor: Number(floor),
      totalFloors: Number(totalFloors),
      parking,
      possessionStatus: 'ready_to_move',
      possessionDate: 'Ready to Move',
      availableFrom: 'Immediately',
      isReraApproved: true,
      reraId: `PRM/KA/RERA/${Date.now().toString().slice(-6)}`,
      amenities: selectedAmenities,
      images: [
        imageUrl,
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1000&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&auto=format&fit=crop&q=80'
      ],
      listedBy: 'owner',
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerPhone: currentUser.phone,
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
        { name: `${locality} Metro Station`, type: 'metro', distance: '600 m', travelTime: '3 min walk' },
        { name: 'City Hospital & Trauma Center', type: 'hospital', distance: '1.4 km', travelTime: '5 min drive' }
      ],
      isFeatured: true,
      isAvailable: true,
      maintenance: Number(maintenance),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewsCount: 1,
      inquiryCount: 0,
      savedCount: 0
    };

    addProperty(newProp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#3949AB] text-white flex items-center justify-center">
              <Building2 className="w-4 h-4 text-[#F4A62A]" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900">Post Free Property Listing</h2>
              <p className="text-xs text-slate-500">Reach lakhs of genuine buyers in {selectedCity.name} with Zero Brokerage</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-200 text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Form */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex flex-col gap-4 text-xs">
          
          {/* Listing Purpose Switcher */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-slate-800">I want to:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setListingType('buy')}
                className={`py-2.5 rounded-xl border text-center font-bold transition-all ${
                  listingType === 'buy' ? 'bg-[#3949AB] text-white border-[#3949AB]' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                Sell Property
              </button>
              <button
                type="button"
                onClick={() => setListingType('rent')}
                className={`py-2.5 rounded-xl border text-center font-bold transition-all ${
                  listingType === 'rent' ? 'bg-[#3949AB] text-white border-[#3949AB]' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                Rent Out Property
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Listing Title / Headline</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Luxury 3BHK East Facing Garden View Flat in Indiranagar"
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#3949AB]"
            />
          </div>

          {/* BHK & Property Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Configuration (BHK)</label>
              <select
                value={bhk}
                onChange={(e) => setBhk(e.target.value as BHKType)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
              >
                <option value="1BHK">1 BHK</option>
                <option value="2BHK">2 BHK</option>
                <option value="3BHK">3 BHK</option>
                <option value="4BHK">4 BHK</option>
                <option value="4+BHK">4+ BHK</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold capitalize"
              >
                <option value="apartment">Apartment / Highrise Flat</option>
                <option value="villa">Independent Villa / House</option>
                <option value="plot">Residential Plot / Land</option>
                <option value="commercial">Commercial Office / Shop</option>
              </select>
            </div>
          </div>

          {/* Pricing & Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {listingType === 'buy' ? 'Expected Price (in ₹ Lakhs)' : 'Monthly Rent (in ₹ Thousands)'}
              </label>
              <input
                type="number"
                required
                min={1}
                value={priceInLakhs}
                onChange={(e) => setPriceInLakhs(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Carpet Area (in Sq.Ft)</label>
              <input
                type="number"
                required
                min={100}
                value={carpetArea}
                onChange={(e) => setCarpetArea(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
              />
            </div>
          </div>

          {/* Locality & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Locality in {selectedCity.name}</label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
              >
                {selectedCity.popularLocalities.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Complete Street Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g., 12th Main, HAL 2nd Stage"
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
              />
            </div>
          </div>

          {/* Furnishing & Facing */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Furnishing</label>
              <select
                value={furnishing}
                onChange={(e) => setFurnishing(e.target.value as FurnishingStatus)}
                className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 capitalize"
              >
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="fully-furnished">Fully-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Facing</label>
              <select
                value={facing}
                onChange={(e) => setFacing(e.target.value as any)}
                className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50"
              >
                <option value="East">East</option>
                <option value="North">North</option>
                <option value="North-East">North-East</option>
                <option value="West">West</option>
                <option value="South">South</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Bathrooms</label>
              <input
                type="number"
                min={1}
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
                className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Parking</label>
              <select
                value={parking}
                onChange={(e) => setParking(e.target.value as ParkingType)}
                className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 capitalize"
              >
                <option value="both">Car & Bike</option>
                <option value="car">Car Only</option>
                <option value="bike">Bike Only</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Primary Cover Photo URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
            />
          </div>

          {/* Amenities Selector */}
          <div>
            <label className="block font-bold text-slate-700 mb-2">Select Amenities Included</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {allAmenitiesList.map(amenity => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-1.5 transition-all ${
                      isSelected ? 'bg-indigo-50 border-[#3949AB] text-[#3949AB] font-bold' : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${isSelected ? 'text-[#3949AB]' : 'opacity-0'}`} />
                    <span className="truncate">{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Detailed Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Highlight special features like modular kitchen, high floor views, vastu compliance, nearby schools..."
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-2xl bg-[#3949AB] hover:bg-[#283593] text-white font-extrabold text-sm shadow-md shadow-indigo-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#F4A62A]" />
            <span>Publish Free Property Listing</span>
          </button>
        </form>

      </div>
    </div>
  );
};
