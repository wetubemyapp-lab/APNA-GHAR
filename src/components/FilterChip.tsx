import React from 'react';
import { X } from 'lucide-react';

interface FilterChipProps {
  label: string;
  active?: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
  className?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  active = false,
  onSelect,
  onRemove,
  className = ''
}) => {
  return (
    <div
      onClick={onSelect}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150 border cursor-pointer select-none ${
        active
          ? 'bg-[#3949AB] text-white border-[#3949AB] shadow-2xs hover:bg-[#283593]'
          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
      } ${className}`}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={`p-0.5 rounded-full ${
            active ? 'hover:bg-indigo-700 text-white' : 'hover:bg-slate-200 text-slate-500'
          }`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
