import React from 'react';
import { ListingType } from '../types';

interface BuyRentToggleProps {
  value: ListingType;
  onChange: (value: ListingType) => void;
  className?: string;
}

export const BuyRentToggle: React.FC<BuyRentToggleProps> = ({
  value,
  onChange,
  className = ''
}) => {
  return (
    <div className={`inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200/80 ${className}`}>
      <button
        type="button"
        onClick={() => onChange('buy')}
        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
          value === 'buy'
            ? 'bg-[#3949AB] text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        }`}
      >
        Buy
      </button>
      <button
        type="button"
        onClick={() => onChange('rent')}
        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
          value === 'rent'
            ? 'bg-[#3949AB] text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        }`}
      >
        Rent
      </button>
    </div>
  );
};
