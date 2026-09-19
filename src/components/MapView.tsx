import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Crosshair, MapPin } from 'lucide-react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { PropertyCard } from './PropertyCard';

interface MapViewProps {
  properties: Property[];
}

export const MapView: React.FC<MapViewProps> = ({ properties }) => {
  const { setSelectedProperty, selectedCity, showToast } = useApp();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Initialize map
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

      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `
          <div class="custom-map-pin">
            <span>${prop.priceDisplay}</span>
          </div>
        `,
        iconSize: [70, 26],
        iconAnchor: [35, 13]
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

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    }
  }, [properties]);

  // Find user's current location
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
                <div style="width: 16px; height: 16px; background: #3949AB; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 0 6px rgba(57, 73, 171, 0.3);"></div>
              `,
              iconSize: [16, 16],
              iconAnchor: [8, 8]
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
          showToast('Could not access GPS location. Please check browser permissions.', 'error');
        }
      );
    } else {
      setIsLocating(false);
      showToast('Geolocation is not supported by your browser.', 'error');
    }
  };

  return (
    <div className="relative w-full h-full min-h-[450px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100">
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Top Controls */}
      <div className="absolute top-3 left-3 z-[1000] flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md shadow-sm border border-slate-200/80 flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <MapPin className="w-3.5 h-3.5 text-[#3949AB]" />
          <span>{properties.length} Properties</span>
        </div>
      </div>

      {/* Locate Me FAB Button */}
      <div className="absolute top-3 right-3 z-[1000]">
        <button
          onClick={handleLocateMe}
          disabled={isLocating}
          className="p-2.5 rounded-xl bg-white/95 hover:bg-white text-slate-700 hover:text-[#3949AB] backdrop-blur-md shadow-sm border border-slate-200/80 transition-all active:scale-95 flex items-center gap-1.5 text-xs font-bold"
          title="Locate Me"
        >
          <Crosshair className={`w-4 h-4 ${isLocating ? 'animate-spin text-[#3949AB]' : 'text-slate-600'}`} />
          <span className="hidden sm:inline">My Location</span>
        </button>
      </div>

      {/* Bottom Floating Property Card Preview (when a pin is clicked) */}
      {activeProperty && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-sm px-3 animate-in fade-in slide-in-from-bottom-3">
          <div className="relative">
            <button
              onClick={() => setActiveProperty(null)}
              className="absolute -top-2 -right-2 z-20 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-md hover:bg-slate-700"
            >
              ×
            </button>
            <PropertyCard property={activeProperty} />
          </div>
        </div>
      )}
    </div>
  );
};
