import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Scale, 
  Check, 
  AlertCircle, 
  Calendar, 
  ShieldCheck, 
  Building2, 
  Trash2,
  Phone,
  Sparkles
} from 'lucide-react';

interface CompareModalProps {
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ onClose }) => {
  const { 
    compareProperties, 
    toggleCompareProperty, 
    clearCompare, 
    openScheduleVisit,
    setSelectedProperty 
  } = useApp();

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#3949AB] text-white flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900">Property Comparison Matrix</h2>
              <p className="text-xs text-slate-500">Side-by-side technical & financial comparison ({compareProperties.length}/3 properties)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {compareProperties.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 px-2 py-1 rounded-lg hover:bg-rose-50"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Matrix Table Content */}
        <div className="overflow-x-auto overflow-y-auto p-4 flex-1">
          {compareProperties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm font-bold text-slate-700">No properties selected for comparison.</p>
              <p className="text-xs text-slate-500 mt-1">Tap the scale icon on property cards to compare up to 3 listings.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-3 font-bold text-slate-400 uppercase tracking-wider w-40 min-w-[140px]">Feature</th>
                  {compareProperties.map(prop => (
                    <th key={prop.id} className="p-3 min-w-[220px] max-w-[260px] align-top">
                      <div className="flex flex-col gap-2">
                        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-slate-100">
                          <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                          <button
                            onClick={() => toggleCompareProperty(prop.id)}
                            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white hover:bg-rose-600"
                            title="Remove"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <div>
                          <span className="text-base font-extrabold text-[#3949AB] block">{prop.priceDisplay}</span>
                          <h4 
                            onClick={() => {
                              onClose();
                              setSelectedProperty(prop);
                            }}
                            className="font-bold text-slate-900 hover:text-[#3949AB] cursor-pointer line-clamp-1"
                          >
                            {prop.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate">{prop.locality}, {prop.city}</p>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Configuration */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/70">Configuration</td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 font-bold text-slate-900">{prop.bhk} ({prop.propertyType})</td>
                  ))}
                </tr>

                {/* Rate per Sq.Ft */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/70">Rate per Sq.Ft</td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 font-bold text-slate-800">
                      ₹{prop.pricePerSqFt.toLocaleString()}/sq.ft
                    </td>
                  ))}
                </tr>

                {/* Carpet Area */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/70">Carpet Area</td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 font-semibold text-slate-800">
                      {prop.carpetAreaSqFt} sq.ft (Super: {prop.superAreaSqFt} sq.ft)
                    </td>
                  ))}
                </tr>

                {/* Possession Status */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/70">Possession</td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 capitalize font-semibold text-slate-800">
                      {prop.possessionStatus.replace('_', ' ')} ({prop.possessionDate})
                    </td>
                  ))}
                </tr>

                {/* Furnishing */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/70">Furnishing</td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 capitalize text-slate-800">{prop.furnishing}</td>
                  ))}
                </tr>

                {/* Floor & Facing */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/70">Floor & Facing</td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 text-slate-800">
                      Floor {prop.floor} of {prop.totalFloors} • {prop.facing} Facing
                    </td>
                  ))}
                </tr>

                {/* Parking */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/70">Parking</td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 capitalize text-slate-800">{prop.parking} Parking</td>
                  ))}
                </tr>

                {/* Monthly Maintenance */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/70">Maintenance</td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 text-slate-800">₹{prop.maintenance.toLocaleString()}/mo</td>
                  ))}
                </tr>

                {/* RERA Approval */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/70">RERA Approved</td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3">
                      {prop.isReraApproved ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                          <Check className="w-3.5 h-3.5" /> Approved
                        </span>
                      ) : (
                        <span className="text-slate-400">Under Review</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Locality Score */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/70">Neighborhood Score</td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 font-extrabold text-[#3949AB]">
                      {prop.localityScore.overall} / 5.0
                    </td>
                  ))}
                </tr>

                {/* Action CTA Row */}
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50/70">Action</td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3">
                      <button
                        onClick={() => {
                          onClose();
                          openScheduleVisit(prop);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-[#3949AB] hover:bg-[#283593] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Schedule Visit</span>
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};
