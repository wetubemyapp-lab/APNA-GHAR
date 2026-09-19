import React, { useState } from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Calendar, 
  Clock, 
  Car, 
  CheckCircle2, 
  MapPin, 
  User, 
  Phone,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface ScheduleVisitModalProps {
  property: Property;
  onClose: () => void;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({ property, onClose }) => {
  const { submitScheduleVisit, currentUser } = useApp();

  const [date, setDate] = useState('Tomorrow');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [needCabPickup, setNeedCabPickup] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [visitType, setVisitType] = useState<'physical' | 'video'>('physical');

  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM',
  ];

  const dateOptions = [
    { label: 'Today', sub: 'Urgent Slot' },
    { label: 'Tomorrow', sub: 'Recommended' },
    { label: 'This Saturday', sub: 'Weekend Pass' },
    { label: 'This Sunday', sub: 'Weekend Pass' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitScheduleVisit({
      propertyId: property.id,
      date: `${date}`,
      timeSlot,
      visitType: visitType === 'physical' ? 'in_person' : 'video_call',
      needCabPickup: visitType === 'physical' ? needCabPickup : false,
      notes: `Requested by ${name} (${phone})`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#3949AB] text-white flex items-center justify-center">
              <Calendar className="w-4 h-4 text-[#F4A62A]" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base text-slate-900">Schedule Free Site Inspection</h2>
              <p className="text-[11px] text-slate-500">Verified escort with direct builder/owner key access</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto flex flex-col gap-4 text-xs">
          
          {/* Property Context Snippet */}
          <div className="p-3 bg-indigo-50/60 rounded-2xl border border-indigo-100 flex items-center gap-3">
            <img src={property.images[0]} alt={property.title} className="w-12 h-12 rounded-xl object-cover" />
            <div className="min-w-0">
              <span className="text-xs font-extrabold text-[#3949AB]">{property.priceDisplay}</span>
              <h4 className="font-bold text-xs text-slate-900 truncate">{property.title}</h4>
              <p className="text-[11px] text-slate-500 truncate">{property.address}</p>
            </div>
          </div>

          {/* Visit Mode Switcher */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-slate-800">Choose Inspection Format</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setVisitType('physical')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  visitType === 'physical' 
                    ? 'border-[#3949AB] bg-indigo-50/70 text-[#3949AB] font-bold' 
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <div className="font-bold">🚶 In-Person Visit</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Walk through society & flat</div>
              </button>

              <button
                type="button"
                onClick={() => setVisitType('video')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  visitType === 'video' 
                    ? 'border-[#3949AB] bg-indigo-50/70 text-[#3949AB] font-bold' 
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <div className="font-bold">📹 Live Video Tour</div>
                <div className="text-[10px] text-slate-500 mt-0.5">High-def WhatsApp/Zoom call</div>
              </button>
            </div>
          </div>

          {/* Date Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-slate-800">Select Date</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {dateOptions.map(opt => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setDate(opt.label)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    date === opt.label 
                      ? 'bg-[#3949AB] text-white border-[#3949AB] font-bold shadow-xs' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-xs">{opt.label}</div>
                  <div className={`text-[9px] ${date === opt.label ? 'text-indigo-200' : 'text-slate-400'}`}>{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-slate-800">Preferred Time Window</label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTimeSlot(slot)}
                  className={`p-2 rounded-xl border text-center font-semibold transition-all ${
                    timeSlot === slot 
                      ? 'bg-indigo-50 border-[#3949AB] text-[#3949AB] font-bold' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Free Cab Pickup (Physical only) */}
          {visitType === 'physical' && (
            <label className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/70 border border-amber-200 cursor-pointer">
              <input
                type="checkbox"
                checked={needCabPickup}
                onChange={(e) => setNeedCabPickup(e.target.checked)}
                className="w-4 h-4 accent-[#F4A62A] rounded cursor-pointer"
              />
              <div className="min-w-0">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-amber-600" />
                  Request Free Home Pickup & Drop Cab
                </span>
                <p className="text-[10px] text-slate-600 mt-0.5">Complimentary sanitized cab service to the project site</p>
              </div>
            </label>
          )}

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#3949AB]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">WhatsApp / Contact Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#3949AB]"
              />
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-2xl bg-[#3949AB] hover:bg-[#283593] text-white font-extrabold text-sm shadow-md shadow-indigo-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#F4A62A]" />
            <span>Confirm Site Visit Appointment</span>
          </button>
        </form>

      </div>
    </div>
  );
};
