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
  CheckCircle2
} from 'lucide-react';

interface HelpSupportModalProps {
  onClose: () => void;
}

export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({ onClose }) => {
  const { showToast } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const faqs = [
    {
      q: 'How does the Zero Brokerage policy work on Apna Ghar?',
      a: 'All individual owner listings on Apna Ghar are 100% direct and bypass all middlemen or brokerage charges. You interact directly with property owners and schedule free physical inspections.'
    },
    {
      q: 'What is the Free Cab Pickup for Site Visits?',
      a: 'When you book a site visit with our verified builder projects, Apna Ghar arranges an air-conditioned cab to pick you and your family up from your home and drop you back at zero cost.'
    },
    {
      q: 'Are all projects and properties RERA verified?',
      a: 'Yes. Every project listed on Apna Ghar features official state RERA numbers verified by our legal audit team before being published live.'
    },
    {
      q: 'How do I post my property for rent or sale?',
      a: 'Simply tap the "Post Property" FAB or button, choose your city/locality, add photos and pricing, and your listing goes live instantly.'
    }
  ];

  const handleRaiseTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim()) return;
    showToast(`Support Ticket #AG-${Math.floor(100000 + Math.random() * 900000)} created. Our team will contact you within 2 hours.`, 'success');
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">24x7 Help & Customer Support</h3>
              <p className="text-xs text-slate-500">Toll-free Assistance & Instant Query Resolution</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
          
          {/* Quick Contact Strip */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-1.5">
                <Phone className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Toll-Free Helpline</h4>
              <p className="text-xs font-black text-blue-600 mt-0.5">1800-420-APNAGHAR</p>
              <span className="text-[10px] text-slate-500">9 AM - 9 PM Daily</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-1.5">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">WhatsApp Desk</h4>
              <p className="text-xs font-black text-emerald-600 mt-0.5">+91 98765 00112</p>
              <span className="text-[10px] text-slate-500">Instant AI Assistant</span>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-2.5">Frequently Asked Questions</h4>
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-3 text-left font-bold text-xs text-slate-800 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {openFaq === idx && (
                    <div className="p-3 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Raise Support Ticket */}
          <form onSubmit={handleRaiseTicket} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900">Submit a Support Request</h4>
            <input 
              type="text" 
              placeholder="Query subject (e.g. Schedule visit issue, Listing approval)"
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
            />
            <textarea 
              rows={2}
              placeholder="Describe your issue or feedback in detail..."
              value={ticketMessage}
              onChange={(e) => setTicketMessage(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Ticket</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
