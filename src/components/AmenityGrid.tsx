import React from 'react';
import { 
  CheckCircle2, 
  Waves, 
  Dumbbell, 
  ShieldAlert, 
  Trees, 
  Car, 
  Zap, 
  Droplet, 
  Flame, 
  Wifi, 
  Shield, 
  Baby, 
  Gamepad2, 
  Library,
  Coffee
} from 'lucide-react';

interface AmenityGridProps {
  amenities: string[];
  className?: string;
  columns?: '2' | '3' | '4' | 'default';
}

export const AmenityGrid: React.FC<AmenityGridProps> = ({
  amenities,
  className = '',
  columns = 'default'
}) => {
  const getAmenityIcon = (name: string) => {
    const lowercase = name.toLowerCase();
    if (lowercase.includes('pool') || lowercase.includes('swimming')) return Waves;
    if (lowercase.includes('gym') || lowercase.includes('fitness') || lowercase.includes('clubhouse')) return Dumbbell;
    if (lowercase.includes('security') || lowercase.includes('cctv') || lowercase.includes('guard')) return Shield;
    if (lowercase.includes('park') || lowercase.includes('garden') || lowercase.includes('lawn')) return Trees;
    if (lowercase.includes('parking') || lowercase.includes('garage') || lowercase.includes('car')) return Car;
    if (lowercase.includes('power') || lowercase.includes('backup') || lowercase.includes('generator')) return Zap;
    if (lowercase.includes('water') || lowercase.includes('borewell')) return Droplet;
    if (lowercase.includes('gas') || lowercase.includes('piped')) return Flame;
    if (lowercase.includes('wifi') || lowercase.includes('internet')) return Wifi;
    if (lowercase.includes('kid') || lowercase.includes('play') || lowercase.includes('child')) return Baby;
    if (lowercase.includes('sport') || lowercase.includes('court') || lowercase.includes('badminton') || lowercase.includes('tennis')) return Gamepad2;
    if (lowercase.includes('library') || lowercase.includes('study')) return Library;
    if (lowercase.includes('lounge') || lowercase.includes('cafe')) return Coffee;
    return CheckCircle2;
  };

  const columnClasses = {
    '2': 'grid-cols-2',
    '3': 'grid-cols-2 sm:grid-cols-3',
    '4': 'grid-cols-2 sm:grid-cols-4',
    'default': 'grid-cols-2 xs:grid-cols-3 sm:grid-cols-4'
  };

  if (!amenities || amenities.length === 0) {
    return (
      <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-400 font-bold">
        No amenities specified.
      </div>
    );
  }

  return (
    <div className={`grid gap-2.5 ${columnClasses[columns]} ${className}`}>
      {amenities.map((amenity, idx) => {
        const Icon = getAmenityIcon(amenity);
        return (
          <div
            key={idx}
            className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 hover:bg-indigo-50/20 text-xs font-bold text-slate-800 transition duration-150"
          >
            <Icon className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="truncate">{amenity}</span>
          </div>
        );
      })}
    </div>
  );
};
