import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  loading?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  loading = false,
  icon: Icon,
  className = '',
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`px-5 py-3 rounded-2xl bg-[#3949AB] hover:bg-[#283593] text-white text-sm font-extrabold shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{label || children}</span>
    </button>
  );
};
