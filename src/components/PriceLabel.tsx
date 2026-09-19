import React from 'react';

interface PriceLabelProps {
  price: number;
  priceDisplay: string;
  pricePerSqFt?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PriceLabel: React.FC<PriceLabelProps> = ({
  price,
  priceDisplay,
  pricePerSqFt,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-sm sm:text-base font-black',
    md: 'text-xl sm:text-2xl font-black',
    lg: 'text-2xl sm:text-3xl font-black'
  };

  return (
    <div className={`flex flex-col gap-0.5 tracking-tight ${className}`}>
      <span className={`text-slate-900 leading-none ${sizeClasses[size]}`}>
        {priceDisplay}
      </span>
      {pricePerSqFt && pricePerSqFt > 0 ? (
        <span className="text-[10px] sm:text-xs text-slate-500 font-bold">
          ₹{pricePerSqFt.toLocaleString()}/sq.ft
        </span>
      ) : null}
    </div>
  );
};
