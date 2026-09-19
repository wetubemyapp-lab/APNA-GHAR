import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { LocalityInfo, Property, Project } from '../types';
import { PropertyCard } from './PropertyCard';
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
  Building2,
  Building,
  Sparkles,
  Compass,
  Car,
  Coffee,
  Trees,
  BarChart3,
  Layers,
  ExternalLink,
  ChevronRight,
  Info,
  Maximize2
} from 'lucide-react';
import L from 'leaflet';

interface LocalityDetailModalProps {
  locality: LocalityInfo;
  onClose: () => void;
}

export const LocalityDetailModal: React.FC<LocalityDetailModalProps> = ({ locality, onClose }) => {
  const { 
    properties, 
    projects,
    localities,
    setSelectedProperty, 
    setSelectedProject,
    setIsProjectModalOpen,
    setSelectedLocality,
    setActiveTab, 
    updateFilter 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'projects' | 'properties' | 'connectivity'>('overview');

  // Filter properties in this locality
  const localityProperties = properties.filter(p => 
    p.locality.toLowerCase().includes(locality.name.toLowerCase()) ||
    locality.name.toLowerCase().includes(p.locality.toLowerCase()) ||
    (p.address && p.address.toLowerCase().includes(locality.name.toLowerCase()))
  );

  // Filter projects in this locality
  const localityProjects = projects.filter(p =>
    p.locality.toLowerCase().includes(locality.name.toLowerCase()) ||
    locality.name.toLowerCase().includes(p.locality.toLowerCase())
  );

  // Nearby localities in the same city
  const nearbyLocalities = localities.filter(l => l.id !== locality.id && (l.city === locality.city || !locality.city));

  // Map Leaflet Instance Ref
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Default coordinate for locality map
  const getLocalityCoords = (): [number, number] => {
    const lname = locality.name.toLowerCase();
    if (lname.includes('indiranagar')) return [12.9784, 77.6408];
    if (lname.includes('whitefield')) return [12.9698, 77.7499];
    if (lname.includes('bandra')) return [19.0596, 72.8295];
    if (lname.includes('hitec')) return [17.4435, 78.3772];
    if (lname.includes('koramangala')) return [12.9352, 77.6245];
    if (lname.includes('hsr')) return [12.9121, 77.6446];
    
    // If property exists with coords, use that
    if (localityProperties.length > 0 && localityProperties[0].lat) {
      return [localityProperties[0].lat, localityProperties[0].lng];
    }
    return [12.9716, 77.5946]; // Default Bengaluru
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const [lat, lng] = getLocalityCoords();

    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: 14,
      zoomControl: false,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CARTO &copy; OpenStreetMap',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Main Center Marker
    const mainIcon = L.divIcon({
      className: 'locality-center-pin',
      html: `
        <div style="background: #E53935; color: white; padding: 6px 14px; border-radius: 20px; font-weight: 800; font-size: 11px; box-shadow: 0 4px 14px rgba(229, 57, 53, 0.4); border: 2.5px solid white; white-space: nowrap; display: flex; align-items: center; gap: 5px;">
          📍 ${locality.name} Hub
        </div>
      `,
      iconSize: [120, 32],
      iconAnchor: [60, 16]
    });
    L.marker([lat, lng], { icon: mainIcon }).addTo(map);

    // Nearby Metro Marker
    const metroIcon = L.divIcon({
      className: 'metro-pin',
      html: `
        <div style="background: #3B82F6; color: white; padding: 4px 10px; border-radius: 16px; font-weight: 700; font-size: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); border: 1.5px solid white; white-space: nowrap;">
          🚆 Metro Station (0.4 km)
        </div>
      `,
      iconSize: [130, 26],
      iconAnchor: [65, 13]
    });
    L.marker([lat + 0.005, lng - 0.006], { icon: metroIcon }).addTo(map);

    // Property Pins in this locality
    localityProperties.slice(0, 3).forEach((prop, idx) => {
      if (!prop.lat || !prop.lng) return;
      const propIcon = L.divIcon({
        className: 'locality-prop-pin',
        html: `
          <div style="background: #10B981; color: white; padding: 4px 8px; border-radius: 12px; font-weight: 800; font-size: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); border: 1.5px solid white; white-space: nowrap;">
            🏠 ${prop.priceDisplay}
          </div>
        `,
        iconSize: [90, 24],
        iconAnchor: [45, 12]
      });
      L.marker([prop.lat, prop.lng], { icon: propIcon }).addTo(map);
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [locality]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[94vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-orange-500 text-white flex items-center justify-center shadow-md shadow-red-500/20 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 truncate">{locality.name}</h2>
                <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[11px] font-bold shrink-0">
                  {locality.city}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1 shrink-0">
                  <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" /> {locality.connectivityRating} / 5.0
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate mt-0.5">
                Real Estate Insights, Infrastructure, Price Trends & Live Listings
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 no-scrollbar">
          
          {/* HERO / MAP AREA */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <div ref={mapContainerRef} className="w-full h-52 sm:h-64 z-0 bg-slate-100" />
            
            {/* Overlay Gradient Banner */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
              <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg border border-white/20">
                <Compass className="w-3.5 h-3.5 text-orange-400" />
                {locality.name}, {locality.city} Locality Map
              </span>
              <button 
                onClick={() => {
                  updateFilter('locality', locality.name);
                  setActiveTab('search');
                  onClose();
                }}
                className="pointer-events-auto px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-900 text-xs font-bold shadow-lg border border-slate-200 transition flex items-center gap-1"
              >
                <span>View Full Map</span>
                <Maximize2 className="w-3 h-3 text-red-600" />
              </button>
            </div>

            <div className="p-3.5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Train className="w-4 h-4 text-blue-400" /> Metro Station (0.4 km)
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Building2 className="w-4 h-4 text-purple-400" /> Major Tech Park (2.5 km)
                </span>
              </div>
              <span className="text-[11px] text-amber-300 font-semibold">
                {localityProperties.length} Verified Properties Live
              </span>
            </div>
          </div>

          {/* DEMO DATA DISCLAIMER & QUICK METRICS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-red-600" />
                Market Metrics & Price Range
              </h3>
              <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold flex items-center gap-1">
                <Info className="w-3 h-3 text-amber-600" />
                [Demo / Prototype Market Data]
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-red-50/70 rounded-2xl border border-red-100">
                <span className="text-[11px] font-semibold text-red-800">Avg. Property Rate</span>
                <p className="text-base font-black text-red-900 mt-0.5">
                  ₹{locality.avgRatePerSqFt.toLocaleString()} <span className="text-xs font-normal">/sq.ft</span>
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100">
                <span className="text-[11px] font-semibold text-emerald-800">YoY Capital Growth</span>
                <p className="text-base font-black text-emerald-900 mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" /> {locality.growthYoy}
                </p>
              </div>

              <div className="p-3.5 bg-purple-50/70 rounded-2xl border border-purple-100">
                <span className="text-[11px] font-semibold text-purple-800">Gross Rental Yield</span>
                <p className="text-base font-black text-purple-900 mt-0.5">{locality.rentalYield}</p>
              </div>

              <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-100">
                <span className="text-[11px] font-semibold text-blue-800">Active Listings</span>
                <p className="text-base font-black text-blue-900 mt-0.5">
                  {locality.activeListingsCount || localityProperties.length}+ Units
                </p>
              </div>
            </div>

            {/* Average Price Breakdown Table */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">
                Average Price Range by Bedroom Type (Demo Analytics)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-extrabold text-slate-900 block">1 & 2 BHK Flats</span>
                    <span className="text-[11px] text-slate-500">650 - 1,200 sq.ft</span>
                  </div>
                  <span className="font-black text-red-600">₹65 L - ₹1.35 Cr</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-extrabold text-slate-900 block">3 BHK Premium</span>
                    <span className="text-[11px] text-slate-500">1,400 - 2,100 sq.ft</span>
                  </div>
                  <span className="font-black text-red-600">₹1.50 Cr - ₹2.80 Cr</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-extrabold text-slate-900 block">4 BHK & Villas</span>
                    <span className="text-[11px] text-slate-500">2,600 - 4,500 sq.ft</span>
                  </div>
                  <span className="font-black text-red-600">₹3.20 Cr - ₹6.50 Cr</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: POPULAR PROPERTY TYPES */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-600" />
              Popular Property Types in {locality.name}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900">Apartments</span>
                  <span className="text-xs font-black text-red-600">65%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full w-[65%]" />
                </div>
                <span className="text-[10px] text-slate-500 block">High-rise gated & townships</span>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900">Builder Floors</span>
                  <span className="text-xs font-black text-blue-600">18%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-[18%]" />
                </div>
                <span className="text-[10px] text-slate-500 block">Low-rise independent floors</span>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900">Independent Villas</span>
                  <span className="text-xs font-black text-emerald-600">12%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[12%]" />
                </div>
                <span className="text-[10px] text-slate-500 block">Luxury duplexes & bungalows</span>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900">Residential Plots</span>
                  <span className="text-xs font-black text-purple-600">5%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full w-[5%]" />
                </div>
                <span className="text-[10px] text-slate-500 block">Gated plot layouts</span>
              </div>
            </div>
          </div>

          {/* SECTION: PROJECTS IN THIS LOCALITY */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Building className="w-4 h-4 text-red-600" />
                Featured Builder Projects in {locality.name}
              </h3>
              <span className="text-xs font-bold text-slate-500">
                {localityProjects.length > 0 ? `${localityProjects.length} Projects` : 'Top Builder Projects'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(localityProjects.length > 0 ? localityProjects : projects.slice(0, 2)).map(proj => (
                <div 
                  key={proj.id}
                  onClick={() => {
                    setSelectedProject(proj);
                    setIsProjectModalOpen(true);
                  }}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-red-300 shadow-xs hover:shadow-md transition cursor-pointer flex gap-3.5 items-center"
                >
                  <img src={proj.image} alt={proj.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-[10px] inline-block">
                      {proj.builder}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 truncate">{proj.name}</h4>
                    <p className="text-[11px] font-black text-red-600">{proj.priceRange}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span>RERA: {proj.reraId}</span>
                      <span>•</span>
                      <span>{proj.possessionDate}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* SECTION: CONNECTIVITY & TRANSPORT */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Train className="w-4 h-4 text-red-600" />
              Connectivity & Transport Infrastructure
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Train className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">Metro Connectivity</h4>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    Namma Metro Station directly connects to major tech parks & commercial hubs (0.4 km away, 5 mins walk).
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">Arterial Roads & Highways</h4>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    100ft Road, Outer Ring Road, and Main Expressways give rapid access across {locality.city}.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">Airport & Railway Links</h4>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    International Airport: ~38 km (45 mins via toll highway). Central Railway Station: 9.5 km.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">Tech Parks & Business Hubs</h4>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    Embassy GolfLinks, ITPB, and Mindspace Tech Parks located within 10-20 minutes commute time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: LIFESTYLE & AMENITIES */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Coffee className="w-4 h-4 text-red-600" />
              Lifestyle, Healthcare & Education
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-extrabold">
                  <ShoppingBag className="w-3.5 h-3.5 text-red-600" />
                  <span>Shopping & Malls</span>
                </div>
                <p className="text-[11px] text-slate-500">Phoenix Marketcity, Nexus Mall, 100ft High Street</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-extrabold">
                  <Coffee className="w-3.5 h-3.5 text-amber-600" />
                  <span>Dining & Nightlife</span>
                </div>
                <p className="text-[11px] text-slate-500">Toit, Gourmet cafes, Microbreweries, Fine dining</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-extrabold">
                  <Hospital className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Multispecialty Care</span>
                </div>
                <p className="text-[11px] text-slate-500">Manipal Hospital, Columbia Asia, CMH Hospital</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-extrabold">
                  <School className="w-3.5 h-3.5 text-blue-600" />
                  <span>Top Academics</span>
                </div>
                <p className="text-[11px] text-slate-500">National Public School, Kendriya Vidyalaya, DPS</p>
              </div>
            </div>
          </div>

          {/* SECTION: LOCALITY GUIDE & RESIDENT REVIEWS */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              Locality Guide & Resident Reviews
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {locality.description || `${locality.name} is one of ${locality.city}'s most prestigious residential hubs. Known for high livability, tree-lined avenues, top schools, and immediate metro access, it commands strong rental yield and capital growth.`}
            </p>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <h4 className="font-extrabold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> What Residents Love
                </h4>
                <ul className="space-y-1.5 text-slate-700">
                  <li className="flex items-start gap-1.5">• 5-10 mins to nearest Metro line stations</li>
                  <li className="flex items-start gap-1.5">• High concentration of top schools and multispecialty hospitals</li>
                  <li className="flex items-start gap-1.5">• Consistent high rental yield ({locality.rentalYield}) from IT executives</li>
                  <li className="flex items-start gap-1.5">• Abundant recreational parks, cafes, and gourmet eateries</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <h4 className="font-extrabold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> Things to Consider
                </h4>
                <ul className="space-y-1.5 text-slate-700">
                  <li className="flex items-start gap-1.5">• Peak hour traffic bottlenecks near main arterial junctions</li>
                  <li className="flex items-start gap-1.5">• High capital acquisition prices compared to suburban clusters</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SECTION: NEARBY LOCALITIES */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-red-600" />
              Explore Nearby Localities in {locality.city}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {nearbyLocalities.map(nLoc => (
                <div 
                  key={nLoc.id}
                  onClick={() => setSelectedLocality(nLoc)}
                  className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-red-300 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">{nLoc.name}</h4>
                    <p className="text-[10px] text-slate-500">₹{nLoc.avgRatePerSqFt.toLocaleString()}/sq.ft</p>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-emerald-600">{nLoc.growthYoy} YoY</span>
                    <ArrowRight className="w-3.5 h-3.5 text-red-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION: PROPERTIES IN THIS LOCALITY / PROPERTY LIST BELOW */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                Live Properties in {locality.name} ({localityProperties.length})
              </h3>
              <button 
                onClick={() => {
                  updateFilter('locality', locality.name);
                  setActiveTab('search');
                  onClose();
                }}
                className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
              >
                <span>View all in Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {localityProperties.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <p className="text-xs text-slate-500 font-medium">
                  No properties currently indexed for "{locality.name}" in this specific filter.
                </p>
                <button
                  onClick={() => {
                    updateFilter('locality', '');
                    setActiveTab('search');
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold shadow-sm"
                >
                  Explore All Properties in {locality.city}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {localityProperties.map(prop => (
                  <div key={prop.id} onClick={() => onClose()}>
                    <PropertyCard property={prop} />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
          <span className="text-xs font-medium text-slate-500">
            Discover verified homes, flats & builder projects in {locality.name}
          </span>
          <button
            onClick={() => {
              updateFilter('locality', locality.name);
              setActiveTab('search');
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white text-xs font-bold transition shadow-md shadow-red-600/20"
          >
            Explore All {locality.name} Listings
          </button>
        </div>

      </div>
    </div>
  );
};
