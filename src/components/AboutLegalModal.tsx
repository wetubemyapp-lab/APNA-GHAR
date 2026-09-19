import React from 'react';
import { ApnaGharLogo } from './ApnaGharLogo';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Lock, 
  CheckCircle2, 
  Award, 
  Heart,
  Scale
} from 'lucide-react';

interface AboutLegalModalProps {
  onClose: () => void;
}

export const AboutLegalModal: React.FC<AboutLegalModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[88vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ApnaGharLogo size="md" />
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-slate-700 text-xs leading-relaxed no-scrollbar">
          
          <div className="text-center py-2">
            <h3 className="text-base font-bold text-slate-900">About Apna Ghar</h3>
            <p className="text-slate-500 mt-0.5">Version 3.4.0 • Made with ❤️ for Indian Home Seekers</p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
            <h4 className="font-bold text-blue-950 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" /> Our Mission & Legal Originality
            </h4>
            <p>
              Apna Ghar is an independent, 100% original Indian real-estate discovery application architected under strict adherence to Google Material 3 and Jetpack Compose design guidelines. We empower buyers, tenants, owners, and developers with genuine zero-brokerage listings, transparent RERA certification verification, and reliable price analytics.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-slate-700" /> Terms of Service
            </h4>
            <p>
              1. All property listings posted by users undergo automated algorithmic verification and manual audits before being designated as verified.
            </p>
            <p>
              2. Free site visit cabs are provided in collaboration with licensed transportation partners across Tier-1 and Tier-2 Indian metropolitan clusters.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-600" /> Privacy & Data Encryption
            </h4>
            <p>
              Your phone numbers and identity data are encrypted under AES-256 protocols. Your contact details are only shared with authorized sellers after you explicitly initiate an inquiry or site visit.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-center text-slate-400 text-[11px]">
            © {new Date().getFullYear()} Apna Ghar Technologies India Pvt Ltd. All rights reserved.
          </div>

        </div>

      </div>
    </div>
  );
};
