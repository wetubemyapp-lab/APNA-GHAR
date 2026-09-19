import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Play, Grid } from 'lucide-react';

interface GalleryViewerProps {
  images: string[];
  title?: string;
  className?: string;
}

export const GalleryViewer: React.FC<GalleryViewerProps> = ({
  images,
  title = 'Property Gallery',
  className = ''
}) => {
  const [fullscreenIdx, setFullscreenIdx] = useState<number | null>(null);

  const handleOpen = (idx: number) => {
    setFullscreenIdx(idx);
  };

  const handleClose = () => {
    setFullscreenIdx(null);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fullscreenIdx === null) return;
    setFullscreenIdx((fullscreenIdx + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fullscreenIdx === null) return;
    setFullscreenIdx((fullscreenIdx - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-32 bg-slate-50 border border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-400 font-semibold text-xs">
        No images available
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* 4-Grid Layout: 1 large on left, 3 stacked or grid on right */}
      <div className="grid grid-cols-3 gap-2.5 h-64 rounded-3xl overflow-hidden shadow-xs border border-slate-200">
        {/* Large item */}
        <div 
          onClick={() => handleOpen(0)}
          className="col-span-2 relative h-full bg-slate-900 cursor-pointer overflow-hidden group"
        >
          <img 
            src={images[0]} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
        </div>

        {/* Small stack */}
        <div className="col-span-1 flex flex-col gap-2.5 h-full">
          <div 
            onClick={() => handleOpen(1 % images.length)}
            className="relative flex-1 bg-slate-900 cursor-pointer overflow-hidden group"
          >
            <img 
              src={images[1 % images.length]} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
          <div 
            onClick={() => handleOpen(2 % images.length)}
            className="relative flex-1 bg-slate-900 cursor-pointer overflow-hidden group"
          >
            <img 
              src={images[2 % images.length]} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />

            {/* Overlap of remaining images */}
            {images.length > 3 && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white font-extrabold gap-1">
                <Grid className="w-5 h-5 text-amber-300" />
                <span className="text-xs">+{images.length - 3} Photos</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay Slider */}
      {fullscreenIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-4 animate-in fade-in duration-250">
          {/* Header */}
          <div className="w-full max-w-5xl flex items-center justify-between text-white py-2">
            <span className="text-xs sm:text-sm font-extrabold tracking-wide text-slate-300">
              {title} • <span className="text-white font-black">{fullscreenIdx + 1} of {images.length}</span>
            </span>
            <button 
              onClick={handleClose}
              className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Slide */}
          <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center">
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <img
              src={images[fullscreenIdx]}
              alt={`${title} fullscreen`}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
            />

            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Thumbnails list at bottom */}
          <div className="w-full max-w-5xl overflow-x-auto py-4 flex justify-center gap-2">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setFullscreenIdx(idx)}
                className={`w-14 h-10 rounded-lg overflow-hidden cursor-pointer shrink-0 border-2 transition-all ${
                  idx === fullscreenIdx ? 'border-amber-450 scale-105 shadow-md shadow-amber-400/20' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
