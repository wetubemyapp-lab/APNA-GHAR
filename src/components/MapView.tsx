import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Crosshair, 
  MapPin, 
  SlidersHorizontal, 
  List, 
  Search, 
  X, 
  Maximize2, 
  Sparkles, 
  Building2, 
  ChevronRight,
  ShieldCheck,
  Compass,
  Building
} from 'lucide-react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';

interface MapViewProps {
  properties: Property[];
  onToggleListView?: () => void;
}

export const MapView: React.FC<MapViewProps> = ({ properties, onToggleListView }) => {
  const { 
    setSelectedProperty, 
    selectedCity, 
    showToast, 
    filterState, 
    updateFilter,
    setIsFilterBottomSheetOpen,
    activeFilterCount 
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filterState.searchQuery || '');

  // Initialize Leaflet map with Carto Voyager tiles abstraction
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [selectedCity.lat, selectedCity.lng],
      zoom: 12,
      zoomControl: false
    });

    // CartoDB Voyager tiles for modern clean aesthetic
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync center when city changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([selectedCity.lat, selectedCity.lng], 12);
    }
  }, [selectedCity]);

  // Update markers when properties change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    if (properties.length === 0) return;

    const bounds = L.latLngBounds([]);

    properties.forEach((prop) => {
      if (!prop.lat || !prop.lng) return;

      const isSelected = activeProperty?.id === prop.id;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `
          <div style="
            background: ${isSelected ? '#10B981' : '#E53935'};
            color: white;
            padding: 5px 10px;
            border-radius: 16px;
            font-weight: 800;
            font-size: 11px;
            box-shadow: 0 4px 12px ${isSelected ? 'rgba(16, 185, 129, 0.4)' : 'rgba(229, 57, 53, 0.35)'};
            border: 2px solid white;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            transition: transform 0.2s;
            transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
          ">
            <span>${prop.priceDisplay}</span>
          </div>
        `,
        iconSize: [80, 28],
        iconAnchor: [40, 14]
      });

      const marker = L.marker([prop.lat, prop.lng], { icon: customIcon });

      marker.on('click', () => {
        setActiveProperty(prop);
        map.setView([prop.lat, prop.lng], Math.max(map.getZoom(), 14), {
          animate: true
        });
      });

      marker.addTo(markersGroup);
      bounds.extend([prop.lat, prop.lng]);
    });

    if (bounds.isValid() && !activeProperty) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [properties, activeProperty]);

  // Recenter map to fit all markers
  const handleRecenter = () => {
    const map = mapInstanceRef.current;
    if (!map || properties.length === 0) {
      if (map) map.setView([selectedCity.lat, selectedCity.lng], 12);
      return;
    }

    const bounds = L.latLngBounds([]);
    properties.forEach(p => {
      if (p.lat && p.lng) bounds.extend([p.lat, p.lng]);
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      showToast('Centered map to fit all properties', 'info');
    }
  };

  // Locate user position
  const handleLocateMe = () => {
    if (!mapInstanceRef.current) return;
    setIsLocating(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const map = mapInstanceRef.current;
          if (map) {
            map.flyTo([latitude, longitude], 14, { animate: true });

            const userIcon = L.divIcon({
              className: 'user-pin',
              html: `
                <div style="width: 18px; height: 18px; background: #E53935; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 0 8px rgba(229, 57, 53, 0.3);"></div>
              `,
              iconSize: [18, 18],
              iconAnchor: [9, 9]
            });

            L.marker([latitude, longitude], { icon: userIcon })
              .addTo(map)
              .bindPopup('Your Current Location')
              .openPopup();
          }
          setIsLocating(false);
          showToast('Located your position on the map', 'info');
        },
        () => {
          setIsLocating(false);
          showToast('Could not access GPS location. Using city center.', 'error');
        }
      );
    } else {
      setIsLocating(false);
      showToast('Geolocation is not supported by your browser.', 'error');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('searchQuery', searchQuery);
  };

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 flex flex-col">
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[500px] z-0" />

      {/* TOP FLOATING SEARCH BAR */}
      <div className="absolute top-3 left-3 right-3 z-[1000] max-w-xl mx-auto">
        <form 
          onSubmit={handleSearchSubmit}
          className="p-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-200/90 flex items-center gap-2"
        >
          <div className="flex items-center gap-2 flex-1 px-2.5">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                updateFilter('searchQuery', e.target.value);
              }}
              placeholder={`Search locality in ${selectedCity.name}...`}
              className="w-full bg-transparent text-xs font-semibold text-slate-900 focus:outline-none placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  updateFilter('searchQuery', '');
                }}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <span className="h-5 w-px bg-slate-200" />

          <span className="px-2.5 py-1 rounded-xl bg-red-50 text-red-700 text-[11px] font-extrabold shrink-0">
            {properties.length} Homes
          </span>
        </form>
      </div>

      {/* FLOATING ACTION CONTROLS (FILTER, RECENTER, LIST VIEW) */}
      <div className="absolute top-18 right-3 z-[1000] flex flex-col gap-2">
        {/* Filter Button */}
        <button
          onClick={() => setIsFilterBottomSheetOpen(true)}
          className="relative p-2.5 rounded-2xl bg-white/95 hover:bg-white text-slate-800 backdrop-blur-md shadow-md border border-slate-200/90 transition active:scale-95 flex items-center justify-center"
          title="Filter Properties"
        >
          <SlidersHorizontal className="w-4 h-4 text-red-600" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Recenter Button */}
        <button
          onClick={handleRecenter}
          className="p-2.5 rounded-2xl bg-white/95 hover:bg-white text-slate-800 backdrop-blur-md shadow-md border border-slate-200/90 transition active:scale-95 flex items-center justify-center"
          title="Recenter Map Bounds"
        >
          <Compass className="w-4 h-4 text-blue-600" />
        </button>

        {/* Locate GPS Button */}
        <button
          onClick={handleLocateMe}
          disabled={isLocating}
          className="p-2.5 rounded-2xl bg-white/95 hover:bg-white text-slate-800 backdrop-blur-md shadow-md border border-slate-200/90 transition active:scale-95 flex items-center justify-center"
          title="GPS My Location"
        >
          <Crosshair className={`w-4 h-4 ${isLocating ? 'animate-spin text-red-600' : 'text-slate-700'}`} />
        </button>

        {/* List View Toggle Button */}
        {onToggleListView && (
          <button
            onClick={onToggleListView}
            className="p-2.5 rounded-2xl bg-slate-900 text-white backdrop-blur-md shadow-md border border-slate-800 transition active:scale-95 flex items-center justify-center gap-1"
            title="Switch to List View"
          >
            <List className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* BOTTOM FLOATING SMALL PROPERTY PREVIEW CARD */}
      {activeProperty && (
        <div className="absolute bottom-4 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 z-[1000] w-auto max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-4">
          <div className="relative p-3 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-2xl flex gap-3 items-center group cursor-pointer hover:border-red-300 transition"
            onClick={() => setSelectedProperty(activeProperty)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveProperty(null);
              }}
              className="absolute -top-2 -right-2 z-20 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-md hover:bg-slate-700"
            >
              ×
            </button>

            {/* Preview Image */}
            <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100">
              <img 
                src={activeProperty.images[0]} 
                alt={activeProperty.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
              />
              <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-extrabold">
                {activeProperty.bhk}
              </span>
            </div>

            {/* Preview Details */}
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-base font-black text-red-600">
                  {activeProperty.priceDisplay}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[9px] uppercase">
                  {activeProperty.possessionStatus === 'ready_to_move' ? 'Ready' : 'Under Const.'}
                </span>
              </div>

              <h4 className="font-bold text-xs text-slate-900 truncate">
                {activeProperty.title}
              </h4>

              <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate">
                <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                <span className="truncate">{activeProperty.locality}, {activeProperty.city}</span>
              </div>

              <div className="pt-1 flex items-center justify-between border-t border-slate-100 text-[10px] text-slate-600">
                <span>{activeProperty.carpetAreaSqFt} sq.ft</span>
                <span className="font-extrabold text-red-600 flex items-center gap-0.5">
                  View Details <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
