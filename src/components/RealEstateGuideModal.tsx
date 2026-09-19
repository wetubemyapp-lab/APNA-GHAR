import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Calculator, 
  Home, 
  HelpCircle, 
  Share2, 
  Download,
  Building,
  Key
} from 'lucide-react';

export interface GuideArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  steps: {
    title: string;
    description: string;
    tip?: string;
  }[];
  documentsRequired?: string[];
  faqs?: { question: string; answer: string }[];
}

export const REAL_ESTATE_GUIDES: GuideArticle[] = [
  {
    id: 'buying-checklist',
    title: 'Complete Property Homebuyer Legal & Financial Checklist',
    category: 'Home Buying Guide',
    readTime: '4 min read',
    summary: 'Essential legal verifications, title searches, RERA compliance checks, and agreement steps before paying token money.',
    icon: Home,
    color: 'bg-blue-600',
    steps: [
      {
        title: '1. Verify RERA Registration Number',
        description: 'Ensure the project is registered under the state RERA portal. Check promised completion timelines, layout approval maps, and promoter track record.',
        tip: 'Never deposit token money into personal accounts; ensure payment goes to the RERA designated escrow account.'
      },
      {
        title: '2. Perform Title Search & Encumbrance Certificate (EC)',
        description: 'Obtain an EC for the past 30 years from the sub-registrar office to ensure the land is free from existing mortgages, litigation, or legal dues.',
        tip: 'Hire an independent property lawyer to review the Sale Deed title chain.'
      },
      {
        title: '3. Sanctioned Plan & Commencement Certificate',
        description: 'Confirm that the local municipal body (e.g. BBMP, JDA, DDA) has approved the building plan floor layout and issued the Commencement Certificate (CC).',
      },
      {
        title: '4. Khata Certificate & Occupancy Certificate (OC)',
        description: 'For ready-to-move flats, verify the Occupancy Certificate (OC). Without an OC, electricity/water connections are legally temporary and resale is difficult.',
      }
    ],
    documentsRequired: [
      'Mother Deed / Parent Deed chain (30 years)',
      'Encumbrance Certificate (Form 15 & Form 16)',
      'Occupancy Certificate (OC) & Completion Certificate',
      'Sanctioned Building Plan with Municipal Seal',
      'Latest Property Tax Paid Receipts'
    ],
    faqs: [
      {
        question: 'What is the standard stamp duty charge?',
        answer: 'Stamp duty typically ranges between 5% to 7% of the total circle rate or transaction value, depending on state regulations.'
      },
      {
        question: 'Is RERA mandatory for plots and individual houses?',
        answer: 'Yes, any land development layout exceeding 500 square meters or more than 8 apartments requires RERA registration.'
      }
    ]
  },
  {
    id: 'renting-checklist',
    title: 'Tenant Rental Guide: Agreement, Security Deposit & Police Verification',
    category: 'Rental Essentials',
    readTime: '3 min read',
    summary: 'A step-by-step guide for tenants on lease agreement clauses, rent lock-in periods, maintenance terms, and digital rent receipts.',
    icon: Key,
    color: 'bg-emerald-600',
    steps: [
      {
        title: '1. Inspect Property & Document Existing Snags',
        description: 'Take high-resolution photos and video recordings of existing plumbing fixtures, appliances, electrical points, and wall paint before signing.',
        tip: 'Attach the snag list as an annexure in the lease agreement to avoid deposit deductions later.'
      },
      {
        title: '2. Standard 11-Month Rental Agreement Clauses',
        description: 'Ensure lock-in period (usually 3-6 months), notice period (1 month), maintenance fees inclusion, and deposit return terms are clearly printed on stamp paper.',
      },
      {
        title: '3. Mandatory Police Tenant Verification',
        description: 'Submit tenant details online via the local police portal or jurisdictional police station to ensure full legal compliance and safety.',
      },
      {
        title: '4. Claim House Rent Allowance (HRA) Benefits',
        description: 'Collect PAN card copy of the landlord if total annual rent exceeds ₹1,00,000 to submit digital rent receipts for tax exemption.',
      }
    ],
    documentsRequired: [
      'Government ID (Aadhaar / Passport / Voter ID)',
      'Employment Offer Letter / Company Identity Card',
      'Passport size photographs of all co-tenants',
      'Landlord Ownership Proof (Property Tax Receipt / Electricity Bill)'
    ]
  },
  {
    id: 'home-loan-basics',
    title: 'Home Loan Eligibility, Tax Benefits (Sec 80C & 24B) & EMI Hacks',
    category: 'Financial Guide',
    readTime: '5 min read',
    summary: 'Understand FOIR limits, CIBIL score requirements, repo-rate linked floating vs fixed interest, and how to save lakhs with prepayments.',
    icon: Calculator,
    color: 'bg-indigo-600',
    steps: [
      {
        title: '1. Boost Your CIBIL Score Above 750',
        description: 'Maintain a clean credit record for 6-12 months prior to applying to qualify for the lowest repo-linked interest rates.',
        tip: 'Pay off credit card balances and small personal loans before applying for home loans.'
      },
      {
        title: '2. Maximize Income Tax Deductions',
        description: 'Claim up to ₹1.5 Lakhs under Section 80C for principal repayment and up to ₹2 Lakhs under Section 24(b) for interest paid on self-occupied property.',
      },
      {
        title: '3. Power of 1 Extra EMI Payment Per Year',
        description: 'Paying just 1 extra EMI every year reduces a 20-year loan tenure down to ~15.5 years, saving huge interest over time.',
      }
    ],
    faqs: [
      {
        question: 'What is the maximum loan-to-value (LTV) ratio allowed?',
        answer: 'RBI permits up to 90% LTV for property loans up to ₹30 Lakhs, 80% for loans up to ₹75 Lakhs, and 75% for loans above ₹75 Lakhs.'
      }
    ]
  },
  {
    id: 'property-verification',
    title: 'How to Spot Red Flags & Fraud in Property Documentation',
    category: 'Safety & Verification',
    readTime: '4 min read',
    summary: 'Proactive steps to detect forged power of attorney (PoA), disputed agricultural conversions, and unapproved floor layout additions.',
    icon: ShieldCheck,
    color: 'bg-amber-600',
    steps: [
      {
        title: '1. Verify Land Use & Zoning Clearance',
        description: 'Ensure agricultural land has been legally converted for residential or commercial development by checking the N.A. (Non-Agricultural) order.',
      },
      {
        title: '2. Check Power of Attorney (PoA) Validity',
        description: 'If purchasing through a PoA holder, verify that the original owner is alive and the PoA is registered at the Sub-Registrar Office.',
        tip: 'Insist on meeting the original owner in person or via verified video call before making any advance.'
      },
      {
        title: '3. Cross-Check Joint Development Agreements (JDA)',
        description: 'For builder developments on private land, ensure the builder’s allocation share matches the unit you are purchasing.',
      }
    ]
  }
];

interface RealEstateGuideModalProps {
  guide: GuideArticle | null;
  onClose: () => void;
}

export const RealEstateGuideModal: React.FC<RealEstateGuideModalProps> = ({ guide, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!guide) return null;

  const IconComponent = guide.icon;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: guide.title,
        text: guide.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${guide.title} - ${guide.summary}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl ${guide.color} text-white flex items-center justify-center shadow-sm`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 block">
                {guide.category} • {guide.readTime}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">
                {guide.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-200/80 transition-colors"
              title="Share Guide"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-200/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            💡 <strong className="text-blue-900 font-bold">Key Takeaway: </strong> {guide.summary}
          </div>

          {/* Actionable Steps */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Step-by-Step Action Plan
            </h3>

            <div className="space-y-3">
              {guide.steps.map((step, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{step.title}</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    {step.description}
                  </p>
                  {step.tip && (
                    <div className="ml-6 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium">
                      ⚠️ <strong>Pro Tip:</strong> {step.tip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Documents List */}
          {guide.documentsRequired && (
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Mandatory Legal Documents Checklist
              </h3>
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                {guide.documentsRequired.map((doc, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                    <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {guide.faqs && guide.faqs.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Frequently Asked Questions
              </h3>
              <div className="space-y-2">
                {guide.faqs.map((faq, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <strong className="text-slate-900 block font-bold mb-1">Q: {faq.question}</strong>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          {copied ? (
            <span className="text-xs font-bold text-emerald-600">Copied guide summary!</span>
          ) : (
            <span className="text-xs text-slate-500 font-medium">Verified by Legal & Housing Experts</span>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
          >
            Got It, Thanks!
          </button>
        </div>

      </div>
    </div>
  );
};
