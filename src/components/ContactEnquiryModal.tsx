import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Property } from '../types';
import { 
  X, 
  Phone, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  User, 
  Sparkles,
  Building,
  Calendar
} from 'lucide-react';

interface ContactEnquiryModalProps {
  property: Property;
  onClose: () => void;
}

export const ContactEnquiryModal: React.FC<ContactEnquiryModalProps> = ({ property, onClose }) => {
  const { currentUser, openScheduleVisit, openChatWithProperty, showToast } = useApp();
  const [selectedInquiry, setSelectedInquiry] = useState<string>('Is price negotiable for immediate booking?');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const predefinedQueries = [
    'Is price negotiable for immediate booking?',
    'When can I schedule a physical inspection?',
    'Are all RERA and municipal approvals clear?',
    'Please share floor plan and bank loan eligibility sheet.',
    'Is car parking and club membership included in quote?'
  ];

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(`Inquiry sent to ${property.ownerName}! They will contact you shortly.`, 'success');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Direct Owner & Builder Enquiry</h3>
              <p className="text-xs text-slate-500">Free Callback & WhatsApp Instant Connect</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Property Mini Banner */}
        <div className="p-4 bg-blue-50/50 border-b border-blue-100 flex items-center gap-3">
          <img src={property.images[0]} alt={property.title} className="w-16 h-16 rounded-xl object-cover" />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
              {property.listedBy === 'owner' ? 'Zero Brokerage' : 'Verified Partner'}
            </span>
            <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">{property.title}</h4>
            <p className="text-xs font-black text-blue-600 mt-0.5">{property.priceDisplay} • {property.locality}</p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitEnquiry} className="p-5 space-y-4">
          
          {/* Seller Profile */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                {property.ownerName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  {property.ownerName}
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </p>
                <p className="text-[10px] text-slate-500">{property.listedBy === 'owner' ? 'Individual Property Owner' : 'Authorized Builder Desk'}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a 
                href={`tel:${property.ownerPhone}`}
                onClick={(e) => {
                  e.preventDefault();
                  showToast(`Connecting direct call to ${property.ownerName} (${property.ownerPhone})`, 'info');
                }}
                className="p-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Select Inquiries */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Select Your Question</label>
            <div className="space-y-1.5">
              {predefinedQueries.map((query, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedInquiry(query)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition ${
                    selectedInquiry === query 
                      ? 'bg-blue-50 border-blue-600 text-blue-800 font-bold' 
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {query}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Custom Message / Requirements (Optional)</label>
            <textarea 
              rows={2}
              placeholder="e.g. Interested in high-floor east-facing unit with 2 car parks..."
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 grid grid-cols-2 gap-3">
            <button 
              type="button"
              onClick={() => {
                openChatWithProperty(property, selectedInquiry);
                onClose();
              }}
              className="py-3 px-4 rounded-xl border border-blue-600 text-blue-600 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-blue-50 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>In-App Chat</span>
            </button>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 transition"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending...' : 'Send Enquiry'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
