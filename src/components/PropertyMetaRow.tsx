import React from 'react';
import { BedDouble, Maximize2, Sparkles, Compass } from 'lucide-react';
import { BHKType, FurnishingStatus } from '../types';

interface PropertyMetaRowProps {
  bhk: BHKType;
  bathrooms: number;
  carpetAreaSqFt: number;
  furnishing: FurnishingStatus;
  facing?: string;
  className?: string;
}

export const PropertyMetaRow: React.FC<PropertyMetaRowProps> = ({
  bhk,
  bathrooms,
  carpetAreaSqFt,
  furnishing,
  facing,
  className = ''
}) => {
  const furnishingLabel = furnishing === 'fully-furnished'
    ? 'Fully-Furnished'
    : furnishing === 'semi-furnished'
    ? 'Semi-Furnished'
    : 'Unfurnished';

  return (
    <div className={`grid grid-cols-4 gap-2.5 p-3.5 bg-slate-50 border border-slate-150 rounded-2xl text-center text-xs ${className}`}>
      <div className="flex flex-col items-center gap-1">
        <BedDouble className="w-4 h-4 text-indigo-600" />
        <span className="font-extrabold text-slate-800 leading-none">{bhk}</span>
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Bedrooms</span>
      </div>

      <div className="flex flex-col items-center gap-1 border-l border-slate-200">
        <Maximize2 className="w-4 h-4 text-indigo-600" />
        <span className="font-extrabold text-slate-800 leading-none">{carpetAreaSqFt.toLocaleString()}</span>
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">sq.ft Area</span>
      </div>

      <div className="flex flex-col items-center gap-1 border-l border-slate-200">
        <Sparkles className="w-4 h-4 text-indigo-600" />
        <span className="font-extrabold text-slate-800 leading-none truncate max-w-full px-1">{furnishingLabel.split('-')[0]}</span>
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Furnishing</span>
      </div>

      <div className="flex flex-col items-center gap-1 border-l border-slate-200">
        <Compass className="w-4 h-4 text-indigo-600" />
        <span className="font-extrabold text-slate-800 leading-none truncate max-w-full px-1">{facing || 'North-East'}</span>
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Facing</span>
      </div>
    </div>
  );
};
