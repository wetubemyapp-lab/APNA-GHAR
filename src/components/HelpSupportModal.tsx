import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  HelpCircle, 
  Phone, 
  MessageSquare, 
  Mail, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Send,
  CheckCircle2,
  AlertTriangle,
  ShoppingBag,
  Home,
  PlusCircle,
  User,
  MessageCircle,
  Flag
} from 'lucide-react';

interface HelpSupportModalProps {
  onClose: () => void;
}

type FaqCategory = 'buying' | 'renting' | 'posting' | 'account' | 'enquiries';

export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({ onClose }) => {
  const { showToast, properties } = useApp();
  const [activeTab, setActiveTab] = useState<'faqs' | 'contact' | 'report'>('faqs');
  const [activeFaqCategory, setActiveFaqCategory] = useState<FaqCategory>('buying');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Ticket form state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('General Enquiry');
  const [ticketMessage, setTicketMessage] = useState('');

  // Report Listing state
  const [reportPropertyId, setReportPropertyId] = useState(properties[0]?.id || '');
  const [reportReason, setReportReason] = useState('Fake Listing / Scam');
  const [reportDetails, setReportDetails] = useState('');

  const faqs: Record<FaqCategory, Array<{ q: string; a: string }>> = {
    buying: [
      {
        q: 'How does Apna Ghar guarantee Zero Brokerage for home buyers?',
        a: 'All individual builder projects and owner listings on Apna Ghar are direct. You connect straight with verified sellers, bypassing all agent brokerage fees.'
      },
      {
        q: 'What is the Free Cab Pickup service for site visits?',
        a: 'When you schedule a site visit for verified builder projects, Apna Ghar books an AC cab to pick you up from home and drop you back at zero cost.'
      },
      {
        q: 'Are all listed projects RERA approved?',
        a: 'Yes. Every builder project displays an official state RERA approval registration number audited by our legal compliance team.'
      },
      {
        q: 'Can Apna Ghar assist with Home Loans?',
        a: 'Yes! We have partnered with top banks (SBI, HDFC, ICICI, Axis) offering instant pre-approved home loans with doorstep processing.'
      }
    ],
    renting: [
      {
        q: 'Are rental properties on Apna Ghar brokerage-free?',
        a: 'Yes! Over 85% of our rental listings are uploaded directly by property owners. Look for the "Owner" badge for 100% zero brokerage rental homes.'
      },
      {
        q: 'Can I generate an online Rental Agreement on Apna Ghar?',
        a: 'Yes. You can draft, sign, and stamp a legally binding e-Rental Agreement directly through your account with home delivery.'
      },
      {
        q: 'How are tenant verification and security deposits managed?',
        a: 'We offer police verification assistance and deposit protection guidance to safeguard both landlords and tenants.'
      }
    ],
    posting: [
      {
        q: 'How do I post my property for free?',
        a: 'Tap "Post Property" in the navigation bar, enter your property details, upload photos, set your price, and your ad will be live in minutes.'
      },
      {
        q: 'How many property listings can I post for free?',
        a: 'Individual owners can post up to 2 free property listings concurrently. Commercial agents and builders can choose premium lead packages.'
      },
      {
        q: 'How do I increase lead inquiries for my property?',
        a: 'Adding high-resolution photos, a accurate video walkthrough, detailed floor plans, and realistic market pricing boosts buyer views by up to 300%.'
      }
    ],
    account: [
      {
        q: 'How do I update my profile or mobile number?',
        a: 'Go to Account > Edit Profile to update your registered email, name, or phone number. OTP verification will be required.'
      },
      {
        q: 'Is my personal contact information safe from spammers?',
        a: 'Yes. We use phone number masking technology. Your number is only revealed to sellers when you explicitly click "Contact Owner" or "Schedule Visit".'
      },
      {
        q: 'How do I manage my saved favorite properties?',
        a: 'All saved properties are synchronized in your Account > Saved Shortlist tab and can be accessed across any device.'
      }
    ],
    enquiries: [
      {
        q: 'What happens after I click "Schedule Visit" or "Get Callback"?',
        a: 'Our AI system immediately notifies the seller or builder relationship manager. You will receive an SMS and WhatsApp confirmation with owner details.'
      },
      {
        q: 'Can I cancel or reschedule a physical site visit inspection?',
        a: 'Yes. Go to Account > Site Visits to modify the date/time or cancel your visit without any cancellation penalty.'
      },
      {
        q: 'How long does it take for a seller to respond to an enquiry?',
        a: 'Over 92% of sellers respond within 15 minutes during standard operational hours (9 AM - 9 PM).'
      }
    ]
  };

  const handleRaiseTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim()) return;
    showToast(`Support Ticket #AG-${Math.floor(100000 + Math.random() * 900000)} logged. Our representative will contact you within 2 hours.`, 'success');
    setTicketSubject('');
    setTicketMessage('');
  };

  const handleReportListing = (e: React.FormEvent) => {
    e.preventDefault();
    const prop = properties.find(p => p.id === reportPropertyId);
    showToast(`Report filed against property "${prop?.title || 'Listing'}". Our team will audit this within 12 hours.`, 'info');
    setReportDetails('');
    setActiveTab('faqs');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">26. Help & Support</h3>
              <p className="text-[11px] text-slate-500">Instant Queries, Contact Support & Report Listings</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 p-1 gap-1">
          <button
            onClick={() => setActiveTab('faqs')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'faqs' 
                ? 'bg-white text-emerald-800 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQs</span>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'contact' 
                ? 'bg-white text-emerald-800 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contact Support</span>
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'report' 
                ? 'bg-white text-rose-800 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Flag className="w-3.5 h-3.5 text-rose-600" />
            <span>Report Listing</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 no-scrollbar">

          {/* TAB 1: FAQs */}
          {activeTab === 'faqs' && (
            <div className="space-y-4">
              
              {/* FAQ Category Pills */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Select FAQ Category</span>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {[
                    { id: 'buying', label: 'Buying', icon: ShoppingBag },
                    { id: 'renting', label: 'Renting', icon: Home },
                    { id: 'posting', label: 'Posting', icon: PlusCircle },
                    { id: 'account', label: 'Account', icon: User },
                    { id: 'enquiries', label: 'Enquiries', icon: MessageCircle }
                  ].map(cat => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveFaqCategory(cat.id as FaqCategory);
                          setOpenFaq(0);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition ${
                          activeFaqCategory === cat.id
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accordion Questions */}
              <div className="space-y-2 pt-1">
                {faqs[activeFaqCategory].map((faq, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-3.5 text-left font-bold text-xs text-slate-800 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition"
                    >
                      <span className="pr-2">{faq.q}</span>
                      {openFaq === idx ? (
                        <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {openFaq === idx && (
                      <div className="p-3.5 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 2: CONTACT SUPPORT */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              
              {/* Quick Contact Strip */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100 text-center">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-1.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Toll-Free Helpline</h4>
                  <p className="text-xs font-black text-blue-600 mt-0.5">1800-420-APNAGHAR</p>
                  <span className="text-[10px] text-slate-500">9 AM - 9 PM Daily</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-center">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-1.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">WhatsApp Desk</h4>
                  <p className="text-xs font-black text-emerald-600 mt-0.5">+91 98765 00112</p>
                  <span className="text-[10px] text-slate-500">Instant AI Resolution</span>
                </div>
              </div>

              {/* Submit Ticket Form */}
              <form onSubmit={handleRaiseTicket} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-emerald-600" /> Raise Support Ticket
                </h4>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Issue Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Site Visit Booking">Site Visit & Cab Booking</option>
                    <option value="Property Listing Issue">Property Listing Issue</option>
                    <option value="Account & Login">Account & Login</option>
                    <option value="Brokerage Dispute">Brokerage Complaint</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Briefly state your concern..."
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Detailed Description</label>
                  <textarea 
                    rows={3}
                    placeholder="Provide details so our team can resolve it quickly..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Ticket</span>
                </button>
              </form>

            </div>
          )}

          {/* TAB 3: REPORT LISTING */}
          {activeTab === 'report' && (
            <form onSubmit={handleReportListing} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-100 flex items-start gap-3 text-xs">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-rose-950">Report Suspicious or Fake Property</h4>
                  <p className="text-rose-700 mt-0.5 text-[11px]">Help maintain a safe zero-brokerage ecosystem. All reports are confidential and audited within 12 hours.</p>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Select Property to Report</label>
                <select
                  value={reportPropertyId}
                  onChange={(e) => setReportPropertyId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-600"
                >
                  {properties.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} - ₹{p.priceDisplay} ({p.locality}, {p.city})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Violation Reason</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-600"
                >
                  <option value="Fake Listing / Scam">Fake Listing / Fraudulent Post</option>
                  <option value="Brokerage Demanded">Brokerage Demanded on Zero Brokerage Tag</option>
                  <option value="Wrong Price or Specs">Misleading Price or Inaccurate Photos</option>
                  <option value="Already Sold or Rented">Property Already Sold / Rented Out</option>
                  <option value="Unreachable Seller">Seller Unreachable / Invalid Phone</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Additional Information (Optional)</label>
                <textarea 
                  rows={3}
                  placeholder="Describe what happened or upload proof if asked..."
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-600 text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <Flag className="w-4 h-4" />
                <span>Submit Confidential Violation Report</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
