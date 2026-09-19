import React, { useState } from 'react';
import { ApnaGharLogo } from './ApnaGharLogo';
import { 
  X, 
  Info, 
  ShieldCheck, 
  FileText, 
  Users, 
  Mail, 
  MapPin, 
  Phone, 
  Lock, 
  AlertCircle,
  Award,
  Sparkles
} from 'lucide-react';

interface AboutLegalModalProps {
  onClose: () => void;
}

type TabType = 'about' | 'privacy' | 'terms' | 'community' | 'contact';

export const AboutLegalModal: React.FC<AboutLegalModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('about');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[88vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ApnaGharLogo size="sm" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">27. About & Legal Documentation</h3>
              <p className="text-[11px] text-slate-500">Official Prototype Disclosure & Terms</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prototype Banner */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 flex items-center gap-2 text-[11px] text-amber-900 font-medium">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span><strong>Demo / Product Prototype Notice:</strong> Apna Ghar is an interactive demonstration prototype developed for product evaluation.</span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-100/60 p-1 gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'about', label: 'About', icon: Info },
            { id: 'privacy', label: 'Privacy Policy', icon: Lock },
            { id: 'terms', label: 'Terms of Use', icon: FileText },
            { id: 'community', label: 'Guidelines', icon: Users },
            { id: 'contact', label: 'Contact', icon: Mail }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold shrink-0 flex items-center justify-center gap-1 transition ${
                  activeTab === tab.id
                    ? 'bg-white text-[#3949AB] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 text-slate-700 text-xs leading-relaxed space-y-4 no-scrollbar">

          {/* PAGE 1: ABOUT */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <div className="text-center py-2">
                <div className="inline-flex p-3 rounded-2xl bg-indigo-50 border border-indigo-100 mb-2">
                  <Sparkles className="w-6 h-6 text-[#3949AB]" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">About Apna Ghar</h3>
                <p className="text-slate-500 text-[11px]">Version 3.5.0 • Indian Zero-Brokerage Real Estate Platform</p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
                <h4 className="font-bold text-indigo-950 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#3949AB]" /> Vision & Zero-Brokerage Mission
                </h4>
                <p>
                  Apna Ghar is designed to eliminate high brokerage fees in Indian home buying and renting. By connecting buyers and tenants directly with verified individual property owners and tier-1 builders, we deliver transparent pricing, direct site visits with free cab pickup, and verified RERA credentials.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">Core Engineering Features:</h4>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  <li>AI Matchmaking algorithm for locality recommendations</li>
                  <li>Free AC Cab Pickup & Drop for site visit inspections</li>
                  <li>Verified RERA Badge auditing for builder projects</li>
                  <li>Direct WhatsApp & In-App Messaging with masking protection</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-slate-500 text-[11px] text-center border border-slate-200">
                Note: This platform is a demonstration prototype. All property listings and user profiles presented are for product testing purposes.
              </div>
            </div>
          )}

          {/* PAGE 2: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-600" /> Privacy Policy & Data Security
              </h3>

              <div className="space-y-2 text-slate-600">
                <p>
                  <strong>1. Data Collection & Phone Masking:</strong> We collect user details (name, email, phone number) strictly to facilitate property inquiries. Phone numbers are masked using encrypted virtual proxies until an explicit callback or visit is requested.
                </p>
                <p>
                  <strong>2. Zero Data Sale Guarantee:</strong> Apna Ghar never sells, leases, or trades user contact information or search activity to third-party telemarketers.
                </p>
                <p>
                  <strong>3. Location Services:</strong> GPS coordinates are accessed only with explicit user permission to calculate distance radiuses and show nearby active properties.
                </p>
                <p>
                  <strong>4. Data Deletion Rights:</strong> Users can request complete erasure of their account history, posted listings, and callback logs at any time from Settings &gt; Account.
                </p>
              </div>
            </div>
          )}

          {/* PAGE 3: TERMS OF USE */}
          {activeTab === 'terms' && (
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#3949AB]" /> Terms of Use
              </h3>

              <div className="space-y-2 text-slate-600">
                <p>
                  <strong>1. User Eligibility:</strong> Users posting property listings must be legally competent owners or authorized builder representatives.
                </p>
                <p>
                  <strong>2. Zero Brokerage Guarantee:</strong> Postings tagged as "Owner" must not demand brokerage, commission, or service fees from buyers or tenants. Violators will be permanently suspended.
                </p>
                <p>
                  <strong>3. Free Cab Pickup Terms:</strong> Free site visit cab pickups are subject to driver availability and geographical coverage within participating Tier-1 and Tier-2 metropolitan zones.
                </p>
                <p>
                  <strong>4. Prototype Disclaimer:</strong> The platform operates as a demonstration software environment. No binding monetary contracts or real property sales are executed within this prototype.
                </p>
              </div>
            </div>
          )}

          {/* PAGE 4: COMMUNITY GUIDELINES */}
          {activeTab === 'community' && (
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-purple-600" /> Community Guidelines
              </h3>

              <div className="space-y-2 text-slate-600">
                <p>
                  <strong>1. Authentic Media & Accurate Specs:</strong> All uploaded photos, floor plans, and amenity listings must represent the actual property. Using watermarked stock photos from other portals is strictly prohibited.
                </p>
                <p>
                  <strong>2. Respectful Communication:</strong> Discriminatory, offensive, or harassing messages directed at prospective tenants or home buyers based on religion, gender, diet, or background are prohibited.
                </p>
                <p>
                  <strong>3. Prompt Status Updates:</strong> Property owners must mark listings as "Closed" or "Rented" promptly once a deal is concluded.
                </p>
              </div>
            </div>
          )}

          {/* PAGE 5: CONTACT */}
          {activeTab === 'contact' && (
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-emerald-600" /> Contact Us
              </h3>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#3949AB] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Registered Corporate Office:</strong>
                    <p className="text-[11px] text-slate-600">
                      Apna Ghar Technologies India Pvt. Ltd.<br />
                      Level 6, Tech Park Tower B, Outer Ring Road,<br />
                      Bengaluru, Karnataka - 560103, India
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 border-t border-slate-200 pt-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Helpline Number:</strong>
                    <p className="text-[11px] text-slate-600">+91 (80) 4500-1234 / 1800-420-APNAGHAR</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 border-t border-slate-200 pt-2.5">
                  <Mail className="w-4 h-4 text-purple-600 shrink-0" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Official Emails:</strong>
                    <p className="text-[11px] text-slate-600">
                      Support: support@apnaghar.demo<br />
                      Legal: legal@apnaghar.demo
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center text-amber-900 text-[11px] font-medium">
                Prototype Notice: This contact section contains demonstration data for product evaluation.
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-slate-400 text-[10px]">
          © {new Date().getFullYear()} Apna Ghar Prototype • All rights reserved.
        </div>

      </div>
    </div>
  );
};
