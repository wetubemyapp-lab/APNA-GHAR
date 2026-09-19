import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, ChevronDown } from 'lucide-react';

interface LocationSelectorProps {
  className?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  className = '',
  showIcon = true,
  size = 'md'
}) => {
  const { selectedCity, setIsCityModalOpen } = useApp();

  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-3.5 py-2 text-sm',
    lg: 'px-5 py-3 text-base'
  };

  return (
    <button
      type="button"
      onClick={() => setIsCityModalOpen(true)}
      className={`flex items-center gap-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-extrabold tracking-tight transition-all duration-150 active:scale-95 border border-slate-200/60 shadow-2xs ${sizeClasses[size]} ${className}`}
      title="Select Metropolitan Hub"
    >
      {showIcon && <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />}
      <span className="truncate max-w-[120px] sm:max-w-none">{selectedCity.name}</span>
      <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
    </button>
  );
};
