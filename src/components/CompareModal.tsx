import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Scale, 
  Check, 
  Calendar, 
  ChevronRight,
  Sparkles,
  Building2,
  Trash2,
  Bed,
  Bath,
  Maximize2,
  MapPin
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
      <div className="bg-white w-full max-w-6xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#F4A62A] text-slate-950 flex items-center justify-center shadow-xs font-black">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-base text-slate-900 tracking-tight">Property Comparison Matrix</h2>
              <p className="text-xs font-medium text-slate-500">Side-by-side specs comparison ({compareProperties.length}/4 max properties)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {compareProperties.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-xl hover:bg-rose-50 transition"
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

        {/* Comparison Table Container */}
        <div className="overflow-x-auto overflow-y-auto p-4 flex-1">
          {compareProperties.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
                <Scale className="w-7 h-7" />
              </div>
              <p className="text-base font-black text-slate-800">No properties selected for comparison</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Tap the scale icon on any property card to compare up to 4 listings side-by-side.
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-3 font-extrabold text-slate-400 uppercase tracking-wider w-40 min-w-[140px] sticky left-0 bg-white z-20 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                    Property
                  </th>
                  {compareProperties.map(prop => (
                    <th key={prop.id} className="p-3 min-w-[240px] max-w-[280px] align-top bg-white">
                      <div className="flex flex-col gap-2">
                        <div className="relative h-32 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                          <button
                            onClick={() => toggleCompareProperty(prop.id)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white hover:bg-rose-600 transition"
                            title="Remove from comparison"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold">
                            {prop.bhk}
                          </span>
                        </div>
                        <div>
                          <h4 
                            onClick={() => {
                              onClose();
                              setSelectedProperty(prop);
                            }}
                            className="font-extrabold text-slate-900 hover:text-red-600 cursor-pointer line-clamp-1 transition"
                          >
                            {prop.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate mt-0.5">
                            <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                            <span className="truncate">{prop.locality}, {prop.city}</span>
                          </p>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* 1. Price */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-extrabold text-slate-700 bg-slate-50 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                    Price
                  </td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 font-black text-red-600 text-sm">
                      {prop.priceDisplay}
                      <span className="block text-[10px] font-semibold text-slate-500">
                        ₹{prop.pricePerSqFt.toLocaleString()}/sq.ft
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 2. Area */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-extrabold text-slate-700 bg-slate-50 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                    Area
                  </td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 font-bold text-slate-800">
                      {prop.carpetAreaSqFt} sq.ft <span className="text-[10px] text-slate-400 font-normal">(Carpet)</span>
                      <span className="block text-[10px] text-slate-500 font-normal">Super: {prop.superAreaSqFt} sq.ft</span>
                    </td>
                  ))}
                </tr>

                {/* 3. Bedrooms */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-extrabold text-slate-700 bg-slate-50 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                    Bedrooms
                  </td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 font-bold text-slate-800">
                      {prop.bhk}
                    </td>
                  ))}
                </tr>

                {/* 4. Bathrooms */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-extrabold text-slate-700 bg-slate-50 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                    Bathrooms
                  </td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 font-bold text-slate-800">
                      {prop.bathrooms} Bathrooms
                    </td>
                  ))}
                </tr>

                {/* 5. Property Type */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-extrabold text-slate-700 bg-slate-50 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                    Property Type
                  </td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 font-semibold text-slate-800 capitalize">
                      {prop.propertyType} ({prop.listingType === 'buy' ? 'For Sale' : 'For Rent'})
                    </td>
                  ))}
                </tr>

                {/* 6. Floor */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-extrabold text-slate-700 bg-slate-50 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                    Floor
                  </td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 text-slate-800">
                      <span className="font-bold">Floor {prop.floor}</span> of {prop.totalFloors}
                      <span className="block text-[10px] text-slate-500">{prop.facing} Facing</span>
                    </td>
                  ))}
                </tr>

                {/* 7. Possession */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-extrabold text-slate-700 bg-slate-50 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                    Possession
                  </td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 text-slate-800">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        prop.possessionStatus === 'ready_to_move' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {prop.possessionStatus === 'ready_to_move' ? 'Ready to Move' : 'Under Construction'}
                      </span>
                      <span className="block text-[10px] text-slate-500 mt-1">{prop.possessionDate}</span>
                    </td>
                  ))}
                </tr>

                {/* 8. Furnishing */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-extrabold text-slate-700 bg-slate-50 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                    Furnishing
                  </td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 capitalize text-slate-800 font-semibold">
                      {prop.furnishing}
                    </td>
                  ))}
                </tr>

                {/* 9. Parking */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-extrabold text-slate-700 bg-slate-50 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                    Parking
                  </td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3 capitalize text-slate-800 font-semibold">
                      {prop.parking}
                    </td>
                  ))}
                </tr>

                {/* 10. Amenities */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-extrabold text-slate-700 bg-slate-50 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                    Amenities
                  </td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3">
                      <div className="flex flex-wrap gap-1 max-w-[240px]">
                        {prop.amenities.slice(0, 5).map((amenity, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200">
                            {amenity}
                          </span>
                        ))}
                        {prop.amenities.length > 5 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-600 text-[10px] font-bold">
                            +{prop.amenities.length - 5} more
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Action Row */}
                <tr>
                  <td className="p-3 font-extrabold text-slate-700 bg-slate-50 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                    Action
                  </td>
                  {compareProperties.map(prop => (
                    <td key={prop.id} className="p-3">
                      <div className="flex flex-col gap-1.5">
                        <button
                          onClick={() => {
                            onClose();
                            openScheduleVisit(prop);
                          }}
                          className="w-full py-2 px-3 rounded-xl bg-[#E53935] hover:bg-red-700 text-white font-extrabold text-xs shadow-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Schedule Visit</span>
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            setSelectedProperty(prop);
                          }}
                          className="w-full py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center gap-1 transition"
                        >
                          <span>Full Details</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
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

