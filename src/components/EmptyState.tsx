import React from 'react';
import { 
  SearchX, 
  Heart, 
  MessageSquareOff, 
  BellOff, 
  Building2, 
  BookmarkCheck,
  RotateCcw,
  PlusCircle,
  Compass,
  Search,
  MessageSquare
} from 'lucide-react';

export type EmptyStateType = 
  | 'no_search_results'
  | 'no_shortlist'
  | 'no_messages'
  | 'no_notifications'
  | 'no_listings'
  | 'no_saved_searches';

interface EmptyStateProps {
  type: EmptyStateType;
  title?: string;
  message?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  message,
  ctaText,
  onCtaClick,
  className = ''
}) => {
  const getDefaultContent = () => {
    switch (type) {
      case 'no_search_results':
        return {
          icon: SearchX,
          bgColor: 'bg-indigo-50',
          borderColor: 'border-indigo-100',
          iconColor: 'text-[#3949AB]',
          defaultTitle: 'No properties match these filters.',
          defaultMessage: 'Try adjusting your budget range, BHK count, or locality filters to discover verified homes.',
          defaultCta: 'Adjust Filters',
          ctaIcon: RotateCcw
        };

      case 'no_shortlist':
        return {
          icon: Heart,
          bgColor: 'bg-rose-50',
          borderColor: 'border-rose-100',
          iconColor: 'text-rose-600',
          defaultTitle: 'Your shortlist is empty.',
          defaultMessage: 'Save your favorite properties by clicking the heart icon to easily compare and revisit them.',
          defaultCta: 'Explore Properties',
          ctaIcon: Compass
        };

      case 'no_messages':
        return {
          icon: MessageSquareOff,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-100',
          iconColor: 'text-blue-600',
          defaultTitle: 'No messages yet.',
          defaultMessage: 'Start a direct chat or request callback on any property card to connect with direct owners.',
          defaultCta: 'Inquire on a Property',
          ctaIcon: MessageSquare
        };

      case 'no_notifications':
        return {
          icon: BellOff,
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-100',
          iconColor: 'text-amber-600',
          defaultTitle: "You're all caught up!",
          defaultMessage: 'No new notifications right now. We will alert you when prices drop or new matches are listed.',
          defaultCta: 'Explore Home',
          ctaIcon: Compass
        };

      case 'no_listings':
        return {
          icon: Building2,
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-100',
          iconColor: 'text-emerald-700',
          defaultTitle: "You haven't posted any properties yet.",
          defaultMessage: 'Post your residential or commercial property in 2 minutes with 100% Zero Brokerage.',
          defaultCta: 'Post Property for Free',
          ctaIcon: PlusCircle
        };

      case 'no_saved_searches':
        return {
          icon: BookmarkCheck,
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-100',
          iconColor: 'text-purple-600',
          defaultTitle: 'No saved searches yet.',
          defaultMessage: 'Save your preferred city, locality, and filter setups to quickly re-run searches and receive alerts.',
          defaultCta: 'Save Current Search',
          ctaIcon: Search
        };
    }
  };

  const content = getDefaultContent();
  const IconComponent = content.icon;
  const CtaIconComponent = content.ctaIcon;

  const displayTitle = title || content.defaultTitle;
  const displayMessage = message || content.defaultMessage;
  const displayCta = ctaText || content.defaultCta;

  return (
    <div className={`flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs max-w-md mx-auto my-4 transition-all animate-in fade-in duration-300 ${className}`}>
      
      {/* Visual Illustration Badge */}
      <div className="relative mb-4">
        <div className={`w-20 h-20 rounded-3xl ${content.bgColor} border ${content.borderColor} flex items-center justify-center ${content.iconColor} shadow-inner`}>
          <IconComponent className="w-10 h-10 stroke-[1.75]" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-400">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
      </div>

      {/* Title & Message */}
      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1.5 leading-snug">
        {displayTitle}
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed max-w-xs mb-5 font-medium">
        {displayMessage}
      </p>

      {/* CTA Button */}
      {onCtaClick && (
        <button
          onClick={onCtaClick}
          className="px-5 py-2.5 rounded-2xl bg-[#3949AB] hover:bg-[#283593] active:scale-95 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-[#3949AB]/20 transition-all cursor-pointer"
        >
          <CtaIconComponent className="w-4 h-4" />
          <span>{displayCta}</span>
        </button>
      )}

    </div>
  );
};
