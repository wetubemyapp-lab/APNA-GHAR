import React from 'react';
import { Building2, Home, Layers, Map, Store, Shield } from 'lucide-react';
import { PropertyType } from '../types';

interface CategoryChipProps {
  type: PropertyType;
  label: string;
  count?: number;
  active?: boolean;
  onSelect?: () => void;
  className?: string;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  type,
  label,
  count,
  active = false,
  onSelect,
  className = ''
}) => {
  const getIcon = () => {
    switch (type) {
      case 'apartment':
        return Building2;
      case 'villa':
        return Home;
      case 'builder-floor':
        return Layers;
      case 'house':
        return Home;
      case 'plot':
        return Map;
      case 'commercial':
        return Store;
      default:
        return Shield;
    }
  };

  const Icon = getIcon();

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 flex items-center gap-2 border select-none active:scale-95 shrink-0 ${
        active
          ? 'bg-[#3949AB] text-white border-[#3949AB] shadow-xs'
          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
      } ${className}`}
    >
      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-amber-300' : 'text-slate-400'}`} />
      <span>{label}</span>
      {count !== undefined && (
        <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold ${active ? 'bg-indigo-800 text-indigo-200' : 'bg-slate-100 text-slate-500'}`}>
          {count}
        </span>
      )}
    </button>
  );
};
