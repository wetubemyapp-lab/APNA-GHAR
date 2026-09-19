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
  Mail,
  Sparkles,
  Building,
  Calendar,
  PhoneCall,
  Check
} from 'lucide-react';

interface ContactEnquiryModalProps {
  property: Property;
  onClose: () => void;
}

export const ContactEnquiryModal: React.FC<ContactEnquiryModalProps> = ({ property, onClose }) => {
  const { currentUser, openScheduleVisit, openChatWithProperty, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'enquiry' | 'callback'>('enquiry');
  
  // Enquiry Form State
  const [name, setName] = useState(currentUser.name || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [message, setMessage] = useState('Hi, I am interested in this property. Please share full details and pricing breakup.');
  const [allowShare, setAllowShare] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnquirySuccess, setIsEnquirySuccess] = useState(false);
  const [enquiryErrors, setEnquiryErrors] = useState<{name?: string; phone?: string; email?: string; message?: string}>({});

  // Callback Form State
  const [callbackName, setCallbackName] = useState(currentUser.name || '');
  const [callbackPhone, setCallbackPhone] = useState(currentUser.phone || '');
  const [preferredTime, setPreferredTime] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [isCallbackSuccess, setIsCallbackSuccess] = useState(false);
  const [callbackErrors, setCallbackErrors] = useState<{name?: string; phone?: string}>({});

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
  const validatePhone = (p: string) => {
    const digits = p.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 13;
  };

  // Mask private phone numbers
  const maskedOwnerPhone = property.ownerPhone 
    ? `${property.ownerPhone.slice(0, 6)}*****` 
    : '+91 98*** *****';

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof enquiryErrors = {};
    if (!name.trim()) errs.name = 'Name is required';
    else if (name.trim().length < 2) errs.name = 'Enter a valid name';
    if (!phone.trim()) errs.phone = 'Phone number is required';
    else if (!validatePhone(phone)) errs.phone = 'Enter a valid 10-digit phone number';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!validateEmail(email)) errs.email = 'Enter a valid email address';
    if (!message.trim()) errs.message = 'Please write a short message';
    else if (message.trim().length < 6) errs.message = 'Message is too short';
    setEnquiryErrors(errs);
    if (Object.keys(errs).length > 0) {
      showToast('Please fix the highlighted errors', 'error');
      return;
    }
    if (!allowShare) {
      showToast('Please consent to share your enquiry with the advertiser', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsEnquirySuccess(true);
      showToast('Your enquiry has been sent. The owner will contact you shortly.', 'success');
    }, 600);
  };

  const handleRequestCallback = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof callbackErrors = {};
    if (!callbackName.trim()) errs.name = 'Name is required';
    else if (callbackName.trim().length < 2) errs.name = 'Enter a valid name';
    if (!callbackPhone.trim()) errs.phone = 'Phone number is required';
    else if (!validatePhone(callbackPhone)) errs.phone = 'Enter a valid 10-digit phone number';
    setCallbackErrors(errs);
    if (Object.keys(errs).length > 0) {
      showToast('Please fix the highlighted errors', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCallbackSuccess(true);
      showToast('Callback request submitted. We will connect you shortly.', 'success');
    }, 600);
  };

  const handleDirectCall = () => {
    showToast(`Initiating masked call to ${property.ownerName} (${maskedOwnerPhone})`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black shadow-xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 leading-tight">
                Contact Advertiser
              </h3>
              <p className="text-xs font-medium text-slate-500">
                Direct connect with {property.ownerName} ({property.listedBy === 'owner' ? 'Owner' : 'Verified Agent'})
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Property Context Banner */}
        <div className="p-3 bg-red-50/50 border-b border-red-100 flex items-center gap-3 shrink-0">
          <img src={property.images[0]} alt={property.title} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-red-200" />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-700 bg-red-100 px-2 py-0.5 rounded-md">
              {property.priceDisplay}
            </span>
            <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">{property.title}</h4>
            <p className="text-[11px] text-slate-500 truncate">{property.locality}, {property.city}</p>
          </div>
        </div>

        {/* Quick Action Contact Bar (Call, Chat, Request Callback) */}
        <div className="p-3 bg-slate-100/80 border-b border-slate-200/80 grid grid-cols-3 gap-2 shrink-0">
          <button
            type="button"
            onClick={handleDirectCall}
            className="py-2 px-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 border border-slate-200/90 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition active:scale-95"
            title="Call Masked Number"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Call</span>
          </button>

          <button
            type="button"
            onClick={() => {
              openChatWithProperty(property, message);
              onClose();
            }}
            className="py-2 px-2.5 rounded-xl bg-white hover:bg-blue-50 text-blue-700 border border-slate-200/90 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>Chat</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('callback');
              setIsCallbackSuccess(false);
            }}
            className={`py-2 px-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 ${
              activeTab === 'callback'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white hover:bg-amber-50 text-slate-800 border border-slate-200/90 shadow-2xs'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
            <span>Callback</span>
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-5 overflow-y-auto flex-1">

          {/* TAB 1: SEND ENQUIRY */}
          {activeTab === 'enquiry' && (
            <>
              {isEnquirySuccess ? (
                /* Success State */
                <div className="py-10 text-center flex flex-col items-center justify-center animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-inner">
                    <CheckCircle2 className="w-10 h-10 stroke-[2]" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    Your enquiry has been sent.
                  </h3>
                  <p className="text-xs font-medium text-slate-500 max-w-xs mt-1 mb-6 leading-relaxed">
                    {property.ownerName} has received your contact details and message. They will reach out to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendEnquiry} className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                      Send Written Enquiry
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      Private Masked Contact
                    </span>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${enquiryErrors.name ? 'text-rose-500' : 'text-slate-400'}`} />
                      <input 
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setEnquiryErrors(prev => ({...prev, name: undefined})); }}
                        placeholder="Your Name"
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 ${enquiryErrors.name ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-red-600'}`}
                      />
                    </div>
                    {enquiryErrors.name && <p className="text-[10px] text-rose-600 font-medium mt-1">{enquiryErrors.name}</p>}
                  </div>

                  {/* Phone & Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${enquiryErrors.phone ? 'text-rose-500' : 'text-slate-400'}`} />
                        <input 
                          type="tel"
                          inputMode="numeric"
                          value={phone}
                          onChange={(e) => { setPhone(e.target.value); setEnquiryErrors(prev => ({...prev, phone: undefined})); }}
                          placeholder="+91 9876543210"
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 ${enquiryErrors.phone ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-red-600'}`}
                        />
                      </div>
                      {enquiryErrors.phone && <p className="text-[10px] text-rose-600 font-medium mt-1">{enquiryErrors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${enquiryErrors.email ? 'text-rose-500' : 'text-slate-400'}`} />
                        <input 
                          type="email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setEnquiryErrors(prev => ({...prev, email: undefined})); }}
                          placeholder="you@example.com"
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 ${enquiryErrors.email ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-red-600'}`}
                        />
                      </div>
                      {enquiryErrors.email && <p className="text-[10px] text-rose-600 font-medium mt-1">{enquiryErrors.email}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea 
                      rows={3}
                      value={message}
                      onChange={(e) => { setMessage(e.target.value); setEnquiryErrors(prev => ({...prev, message: undefined})); }}
                      placeholder="Write your specific questions..."
                      className={`w-full p-3 rounded-xl bg-slate-50 border text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 ${enquiryErrors.message ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-red-600'}`}
                    />
                    {enquiryErrors.message && <p className="text-[10px] text-rose-600 font-medium mt-1">{enquiryErrors.message}</p>}
                  </div>

                  {/* Checkbox */}
                  <label className="flex items-start gap-2 cursor-pointer pt-1">
                    <input 
                      type="checkbox"
                      checked={allowShare}
                      onChange={(e) => setAllowShare(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-[11px] font-medium text-slate-600 leading-snug">
                      Allow this enquiry to be shared with the advertiser
                    </span>
                  </label>

                  {/* Send Enquiry CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-2xl bg-[#E53935] hover:bg-red-700 text-white font-black text-xs shadow-md shadow-red-600/20 flex items-center justify-center gap-2 transition active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Enquiry...' : 'Send Enquiry'}</span>
                  </button>
                </form>
              )}
            </>
          )}

          {/* TAB 2: REQUEST CALLBACK */}
          {activeTab === 'callback' && (
            <>
              {isCallbackSuccess ? (
                /* Success State */
                <div className="py-10 text-center flex flex-col items-center justify-center animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4 shadow-inner">
                    <CheckCircle2 className="w-10 h-10 stroke-[2]" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    Callback request submitted.
                  </h3>
                  <p className="text-xs font-medium text-slate-500 max-w-xs mt-1 mb-6 leading-relaxed">
                    We will connect you with {property.ownerName} during your preferred slot ({preferredTime}).
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRequestCallback} className="space-y-4">
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                      Request Callback Schedule
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select your preferred time slot for an instant callback.
                    </p>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${callbackErrors.name ? 'text-rose-500' : 'text-slate-400'}`} />
                      <input 
                        type="text"
                        value={callbackName}
                        onChange={(e) => { setCallbackName(e.target.value); setCallbackErrors(prev => ({...prev, name: undefined})); }}
                        placeholder="Your Name"
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 ${callbackErrors.name ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-amber-500'}`}
                      />
                    </div>
                    {callbackErrors.name && <p className="text-[10px] text-rose-600 font-medium mt-1">{callbackErrors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${callbackErrors.phone ? 'text-rose-500' : 'text-slate-400'}`} />
                      <input 
                        type="tel"
                        inputMode="numeric"
                        value={callbackPhone}
                        onChange={(e) => { setCallbackPhone(e.target.value); setCallbackErrors(prev => ({...prev, phone: undefined})); }}
                        placeholder="+91 9876543210"
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 ${callbackErrors.phone ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-amber-500'}`}
                      />
                    </div>
                    {callbackErrors.phone && <p className="text-[10px] text-rose-600 font-medium mt-1">{callbackErrors.phone}</p>}
                  </div>

                  {/* Preferred Time Options */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Preferred Time Slot
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'Morning', label: 'Morning', sub: '9 AM - 12 PM' },
                        { id: 'Afternoon', label: 'Afternoon', sub: '12 PM - 4 PM' },
                        { id: 'Evening', label: 'Evening', sub: '4 PM - 8 PM' }
                      ].map((slot) => (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setPreferredTime(slot.id as any)}
                          className={`p-2.5 rounded-2xl border text-center transition ${
                            preferredTime === slot.id
                              ? 'bg-amber-50 border-amber-500 text-amber-900 font-extrabold shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className="block text-xs">{slot.label}</span>
                          <span className="block text-[9px] text-slate-400 font-medium">{slot.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Request Callback CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition active:scale-98"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting...' : 'Request Callback'}</span>
                  </button>
                </form>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
};
