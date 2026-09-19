import React, { useState } from 'react';
import { ImageIcon, AlertCircle } from 'lucide-react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  className?: string;
  roundedClass?: string;
}

/**
 * SmartImage
 * Highly optimized image rendering helper supporting:
 * - Loading Skeletons/Spinners
 * - Error Fallback/Placeholders
 * - Browser-Native Caching via Lazy-Loading
 * - Perfect Rounded Clipping
 */
export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  fallbackSrc = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=60',
  className = '',
  roundedClass = 'rounded-2xl',
  alt = 'Property asset',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative overflow-hidden bg-slate-50 border border-slate-100 ${roundedClass} ${className}`}>
      {/* Loading Placeholder */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 animate-pulse">
          <div className="w-6 h-6 rounded-full border-2 border-slate-300 border-t-red-600 animate-spin" />
        </div>
      )}

      {/* Error State */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-2 text-center">
          <AlertCircle className="w-5 h-5 text-slate-300 mb-1" />
          <span className="text-[10px] font-bold text-slate-500">Asset Unavailable</span>
        </div>
      ) : (
        <img
          src={src || fallbackSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};
export default SmartImage;
