import React from 'react';
import { MapPin, Navigation, Compass, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MapPreviewProps {
  latitude: number;
  longitude: number;
  localityName: string;
  cityName: string;
  className?: string;
}

export const MapPreview: React.FC<MapPreviewProps> = ({
  latitude,
  longitude,
  localityName,
  cityName,
  className = ''
}) => {
  const { showToast } = useApp();

  const handleOpenMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, '_blank');
    showToast('Opening directions in Google Maps...', 'info');
  };

  return (
    <div className={`border border-slate-200 rounded-3xl overflow-hidden bg-white ${className}`}>
      {/* Visual map preview wrapper */}
      <div className="relative h-40 bg-slate-100 flex items-center justify-center overflow-hidden">
        {/* Carto-styled simulated grid lines & map indicators */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-70" />
        <div className="absolute top-1/3 left-1/4 w-32 h-1 bg-slate-200 rotate-12" />
        <div className="absolute top-1/2 left-1/2 w-40 h-1.5 bg-indigo-100/80 -rotate-45" />
        <div className="absolute bottom-1/4 left-1/3 w-24 h-1 bg-slate-200 rotate-90" />

        {/* Central Map Pin marker */}
        <div className="relative z-10 flex flex-col items-center animate-bounce">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#3949AB]/15 border border-[#3949AB]/40">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3949AB] text-white shadow-md">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
            </div>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#3949AB]/30 mt-1" />
        </div>

        {/* Zoom Controls Overlay Simulation */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-1 bg-white/95 backdrop-blur-md rounded-lg shadow-sm border border-slate-200/80 p-1">
          <span className="w-6 h-6 flex items-center justify-center font-bold text-xs hover:bg-slate-100 cursor-pointer text-slate-800 rounded">+</span>
          <span className="w-6 h-6 flex items-center justify-center font-bold text-xs hover:bg-slate-100 cursor-pointer text-slate-800 rounded">-</span>
        </div>

        {/* Map Type Badge */}
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[9px] font-bold">
          Carto Voyager
        </div>
      </div>

      {/* Map Details Section */}
      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 border-t border-slate-150">
        <div>
          <span className="text-[10px] text-indigo-600 font-extrabold uppercase tracking-wider block">Verified Location Coordinates</span>
          <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1 mt-0.5">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>{localityName}, {cityName}</span>
          </h4>
          <span className="text-[10px] text-slate-400 font-bold">Lat: {latitude.toFixed(4)}, Lng: {longitude.toFixed(4)}</span>
        </div>

        <button
          onClick={handleOpenMap}
          className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm hover:shadow-md transition active:scale-95 shrink-0"
        >
          <Navigation className="w-3.5 h-3.5 text-amber-300" />
          <span>Get Directions</span>
        </button>
      </div>
    </div>
  );
};
