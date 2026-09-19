import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  title?: string;
  className?: string;
  aspectRatio?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  title = 'Property Image',
  className = '',
  aspectRatio = 'aspect-[16/10]'
}) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className={`w-full bg-slate-100 flex flex-col items-center justify-center text-slate-400 gap-1.5 ${aspectRatio} ${className}`}>
        <ImageIcon className="w-8 h-8 opacity-40" />
        <span className="text-xs font-bold">No Photos Available</span>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden bg-slate-900 group ${aspectRatio} ${className}`}>
      {/* Active Image */}
      <img
        src={images[activeIdx]}
        alt={`${title} - Photo ${activeIdx + 1}`}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
        loading="lazy"
      />

      {/* Shadow Gradient overlays */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

      {/* Index counter badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-black tracking-wider border border-white/20">
          {activeIdx + 1}/{images.length}
        </span>
      </div>

      {/* Left and Right navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/55 hover:bg-black/85 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            title="Previous Image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/55 hover:bg-black/85 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            title="Next Image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Indicator dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-none z-10">
            {images.slice(0, 8).map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  idx === activeIdx ? 'bg-white w-4' : 'bg-white/40'
                }`}
              />
            ))}
            {images.length > 8 && (
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            )}
          </div>
        </>
      )}
    </div>
  );
};
