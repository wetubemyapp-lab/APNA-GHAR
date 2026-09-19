import React from 'react';

interface ApnaGharLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'dark' | 'light' | 'white';
}

export const ApnaGharLogo: React.FC<ApnaGharLogoProps> = ({ 
  className = '', 
  size = 'md',
  showTagline = false,
  variant = 'dark'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const taglineSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-[12px]',
    xl: 'text-[14px]'
  };

  const isLightOrWhite = variant === 'light' || variant === 'white';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Apna Ghar SVG Logo Icon: Red/Orange Gable House Cradled by Caring Palm & Leaf Circle */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Red to Orange Warm Gradient */}
            <linearGradient id="apnaGharRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E53935" />
              <stop offset="50%" stopColor="#F44336" />
              <stop offset="100%" stopColor="#FF6D00" />
            </linearGradient>

            {/* Orange-Yellow Arc Gradient */}
            <linearGradient id="apnaGharArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9800" />
              <stop offset="100%" stopColor="#E53935" />
            </linearGradient>

            {/* Green Leaf Accent */}
            <linearGradient id="apnaGharLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4CAF50" />
              <stop offset="100%" stopColor="#2E7D32" />
            </linearGradient>
          </defs>

          {/* Outer Protective Arc (Left side) */}
          <path 
            d="M 38 16 A 36 36 0 0 0 25 58 C 28 68 35 74 42 78" 
            stroke="url(#apnaGharArcGrad)" 
            strokeWidth="5" 
            strokeLinecap="round" 
            fill="none" 
          />

          {/* Green Leaf Accent on Arc */}
          <path 
            d="M 26 36 C 21 34 18 41 24 46 C 29 48 31 41 26 36 Z" 
            fill="url(#apnaGharLeafGrad)" 
          />

          {/* Gable Roof with Chimney */}
          <path 
            d="M 28 32 L 50 14 L 72 32 M 62 21 V 14 H 67 V 25" 
            stroke={isLightOrWhite ? "#FF5252" : "url(#apnaGharRedGrad)"} 
            strokeWidth="7" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none"
          />

          {/* House Walls & Roof Interior */}
          <path 
            d="M 33 30 L 50 16 L 67 30 V 55 H 33 Z" 
            fill={isLightOrWhite ? "rgba(255,255,255,0.95)" : "#FFFFFF"} 
          />

          {/* 4-Pane Grid Window (Dark Charcoal/Navy) */}
          <rect x="42" y="32" width="6" height="6" rx="1" fill={isLightOrWhite ? "#0F172A" : "#1E293B"} />
          <rect x="52" y="32" width="6" height="6" rx="1" fill={isLightOrWhite ? "#0F172A" : "#1E293B"} />
          <rect x="42" y="41" width="6" height="6" rx="1" fill={isLightOrWhite ? "#0F172A" : "#1E293B"} />
          <rect x="52" y="41" width="6" height="6" rx="1" fill={isLightOrWhite ? "#0F172A" : "#1E293B"} />

          {/* Caring Palm / Open Hand Cradling the House from Below */}
          <path 
            d="M 32 50 C 32 50 40 56 50 56 C 60 56 68 50 72 43 C 73 41 71 39 69 40 C 65 43 58 48 50 48 C 42 48 35 43 32 50 Z" 
            fill="url(#apnaGharRedGrad)" 
          />
          <path 
            d="M 30 52 C 30 52 38 68 62 68 C 72 68 76 56 76 50 C 76 46 72 48 68 53 C 62 61 52 62 44 60 C 37 58 32 53 30 52 Z" 
            fill="url(#apnaGharRedGrad)" 
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1 leading-none">
          <span className={`font-black tracking-tight ${isLightOrWhite ? 'text-white' : 'text-[#1E293B]'} ${textSizes[size]}`}>
            Apna <span className="text-[#E53935]">Ghar</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E53935] self-end mb-1"></span>
        </div>
        {showTagline && (
          <div className="flex items-center gap-1 mt-1">
            <span className="w-3 h-0.5 bg-[#E53935] rounded-full"></span>
            <span className={`font-bold tracking-tight ${isLightOrWhite ? 'text-slate-200' : 'text-slate-700'} ${taglineSizes[size]}`}>
              हर किसी का अपना घर
            </span>
            <span className="w-3 h-0.5 bg-[#E53935] rounded-full"></span>
          </div>
        )}
      </div>
    </div>
  );
};

// Backwards compatibility alias
export const NestoraLogo = ApnaGharLogo;
