import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  eyebrowColor?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  eyebrow,
  eyebrowColor = 'text-indigo-600',
  ctaLabel,
  onCtaClick,
  className = ''
}) => {
  return (
    <div className={`flex items-end justify-between gap-4 mb-4 ${className}`}>
      <div>
        {eyebrow && (
          <span className={`block text-[11px] font-black uppercase tracking-wider mb-0.5 ${eyebrowColor}`}>
            {eyebrow}
          </span>
        )}
        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {ctaLabel && onCtaClick && (
        <button
          type="button"
          onClick={onCtaClick}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-0.5 transition-colors shrink-0"
        >
          <span>{ctaLabel}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
