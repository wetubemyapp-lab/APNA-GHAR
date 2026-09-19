import React from 'react';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ContactButtonProps {
  phone: string;
  whatsapp?: string;
  email?: string;
  name?: string;
  title?: string;
  variant?: 'call' | 'whatsapp' | 'email' | 'all';
  className?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  phone,
  whatsapp,
  email,
  name = 'Owner/Agent',
  title = 'this property',
  variant = 'all',
  className = ''
}) => {
  const { showToast } = useApp();

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
    showToast(`Calling ${name}...`, 'info');
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanWhatsapp = (whatsapp || phone).replace(/[^0-9]/g, '');
    const msg = `Hi, I am inquiring about "${title}" on Apna Ghar: ${window.location.origin}`;
    window.open(`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    showToast('Opening WhatsApp chat...', 'info');
  };

  const handleEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!email) return;
    const subject = `Apna Ghar: Inquiry about "${title}"`;
    const body = `Hi ${name},\n\nI am interested in this property on Apna Ghar: ${window.location.origin}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showToast('Opening mail client...', 'info');
  };

  if (variant === 'call') {
    return (
      <button
        onClick={handleCall}
        className={`px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition flex items-center gap-1.5 border border-slate-200 ${className}`}
      >
        <Phone className="w-3.5 h-3.5" />
        <span>Call</span>
      </button>
    );
  }

  if (variant === 'whatsapp') {
    return (
      <button
        onClick={handleWhatsApp}
        className={`px-4 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-extrabold text-xs transition flex items-center gap-1.5 ${className}`}
      >
        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
        <span>WhatsApp</span>
      </button>
    );
  }

  if (variant === 'email') {
    return (
      <button
        onClick={handleEmail}
        disabled={!email}
        className={`px-4 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-extrabold text-xs transition flex items-center gap-1.5 disabled:opacity-40 ${className}`}
      >
        <Mail className="w-3.5 h-3.5 text-indigo-600" />
        <span>Email</span>
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={handleWhatsApp}
        className="px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 text-xs font-black transition flex items-center gap-1.5 active:scale-95"
        title="WhatsApp Chat"
      >
        <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Chat</span>
      </button>
      <button
        onClick={handleCall}
        className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-250 transition active:scale-95"
        title="Call Owner/Agent"
      >
        <Phone className="w-4 h-4" />
      </button>
    </div>
  );
};
