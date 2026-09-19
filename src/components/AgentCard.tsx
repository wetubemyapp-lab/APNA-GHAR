import React from 'react';
import { ShieldCheck, Star, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { ContactButton } from './ContactButton';

interface AgentCardProps {
  name: string;
  role: 'owner' | 'agent' | 'builder';
  phone: string;
  email?: string;
  rating?: number;
  listingsCount?: number;
  avatarUrl?: string;
  className?: string;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  name,
  role,
  phone,
  email = '',
  rating = 4.8,
  listingsCount = 12,
  avatarUrl,
  className = ''
}) => {
  const roleLabel = role === 'owner' ? 'Individual Owner' : role === 'builder' ? 'Developer / Builder' : 'RERA Registered Agent';
  
  return (
    <div className={`p-4 rounded-3xl border border-slate-200 bg-white shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 text-white font-extrabold flex items-center justify-center uppercase text-sm border-2 border-white ring-1 ring-slate-200">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover rounded-full" />
            ) : (
              name.slice(0, 2)
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Verified Professional">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className="font-extrabold text-sm text-slate-900">{name}</h4>
            <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[9px] font-black uppercase tracking-wider border border-indigo-150">
              {role}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">{roleLabel}</p>
          
          <div className="flex items-center gap-2.5 mt-1 text-[10px] text-slate-400 font-bold">
            <span className="flex items-center gap-0.5 text-amber-505">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-slate-600">{rating} Rating</span>
            </span>
            <span>•</span>
            <span>{listingsCount} Verified Listings</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 w-full sm:w-auto border-t border-slate-100 sm:border-0 pt-3 sm:pt-0 shrink-0">
        <ContactButton 
          phone={phone} 
          email={email} 
          name={name} 
          className="w-full sm:w-auto justify-center" 
        />
      </div>
    </div>
  );
};
