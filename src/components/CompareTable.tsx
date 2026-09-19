import React from 'react';
import { Property } from '../types';
import { Check, X, Maximize2, Sparkles, Building2, MapPin } from 'lucide-react';
import { PriceLabel } from './PriceLabel';

interface CompareTableProps {
  properties: Property[];
  onRemove?: (id: string) => void;
  className?: string;
}

export const CompareTable: React.FC<CompareTableProps> = ({
  properties,
  onRemove,
  className = ''
}) => {
  if (!properties || properties.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold text-xs flex flex-col items-center justify-center gap-2">
        <span>No properties selected for comparison</span>
        <span className="text-[11px] font-medium text-slate-400">Shortlist properties to compare them side-by-side</span>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto border border-slate-200 rounded-3xl bg-white shadow-xs ${className}`}>
      <table className="w-full min-w-[600px] border-collapse text-left text-xs text-slate-700">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="p-4 font-black text-slate-900 w-1/4">Features</th>
            {properties.map((p) => (
              <th key={p.id} className="p-4 font-black text-slate-900 w-1/4 relative">
                {onRemove && (
                  <button
                    onClick={() => onRemove(p.id)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-slate-200 hover:bg-rose-500 hover:text-white text-slate-600 transition"
                    title="Remove from comparison"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                <div className="flex flex-col gap-1 pr-4">
                  <span className="font-extrabold text-sm text-slate-900 line-clamp-1">{p.title}</span>
                  <span className="text-[10px] text-slate-400 font-bold">{p.locality}, {p.city}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-bold">
          {/* Cover image */}
          <tr>
            <td className="p-4 font-black text-slate-500">Preview</td>
            {properties.map((p) => (
              <td key={p.id} className="p-4">
                <div className="w-full h-24 rounded-2xl overflow-hidden bg-slate-100">
                  <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
              </td>
            ))}
          </tr>

          {/* Pricing */}
          <tr>
            <td className="p-4 font-black text-slate-500">Price</td>
            {properties.map((p) => (
              <td key={p.id} className="p-4">
                <PriceLabel price={p.price} priceDisplay={p.priceDisplay} pricePerSqFt={p.pricePerSqFt} size="sm" />
              </td>
            ))}
          </tr>

          {/* Configuration */}
          <tr>
            <td className="p-4 font-black text-slate-500">Configuration</td>
            {properties.map((p) => (
              <td key={p.id} className="p-4 text-slate-900">
                {p.bhk} BHK Apartment
              </td>
            ))}
          </tr>

          {/* Area */}
          <tr>
            <td className="p-4 font-black text-slate-500">Carpet Area</td>
            {properties.map((p) => (
              <td key={p.id} className="p-4 text-slate-900">
                <span className="flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{p.carpetAreaSqFt.toLocaleString()} sq.ft</span>
                </span>
              </td>
            ))}
          </tr>

          {/* Furnishing */}
          <tr>
            <td className="p-4 font-black text-slate-500">Furnishing</td>
            {properties.map((p) => (
              <td key={p.id} className="p-4 text-slate-900 capitalize">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{p.furnishing.replace('-', ' ')}</span>
                </span>
              </td>
            ))}
          </tr>

          {/* Facing */}
          <tr>
            <td className="p-4 font-black text-slate-500">Facing Direction</td>
            {properties.map((p) => (
              <td key={p.id} className="p-4 text-slate-900">
                {p.facing || 'East'}
              </td>
            ))}
          </tr>

          {/* Floor */}
          <tr>
            <td className="p-4 font-black text-slate-500">Floor Level</td>
            {properties.map((p) => (
              <td key={p.id} className="p-4 text-slate-900">
                Floor {p.floor || 2} of {p.totalFloors || 5}
              </td>
            ))}
          </tr>

          {/* Verification */}
          <tr>
            <td className="p-4 font-black text-slate-500">Verified</td>
            {properties.map((p) => (
              <td key={p.id} className="p-4">
                {p.isOwnerVerified ? (
                  <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-[10px]">
                    <Check className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                ) : (
                  <span className="text-slate-400">Under Review</span>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
