import React from 'react';
import { LocalityInfo } from '../types';
import { useApp } from '../context/AppContext';
import { TrendingUp } from 'lucide-react';

interface LocalityCardProps {
  locality: LocalityInfo;
  className?: string;
}

export const LocalityCard: React.FC<LocalityCardProps> = ({
  locality,
  className = ''
}) => {
  const { setSelectedLocality, setIsLocalityModalOpen } = useApp();

  return (
    <div
      onClick={() => {
        setSelectedLocality(locality);
        setIsLocalityModalOpen(true);
      }}
      className={`group bg-white p-4 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-400 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 active:scale-[0.98] ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
            {locality.name}
          </h3>
          <p className="text-[11px] text-slate-500">{locality.city}</p>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-extrabold flex items-center gap-0.5 border border-emerald-200">
          <TrendingUp className="w-2.5 h-2.5" />
          {locality.growthYoy}
        </span>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between text-xs">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Avg Rate</span>
          <strong className="text-slate-900 font-bold">₹{locality.avgRatePerSqFt.toLocaleString()}</strong>
          <span className="text-[10px] text-slate-500">/sq.ft</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 block font-medium">Rental Yield</span>
          <span className="text-xs font-bold text-indigo-600">{locality.rentalYield}</span>
        </div>
      </div>
    </div>
  );
};
