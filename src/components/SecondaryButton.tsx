import React from 'react';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  loading?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
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
      className={`px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 rounded-full border-2 border-slate-400/30 border-t-slate-700 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4 text-slate-600 shrink-0" />
      ) : null}
      <span>{label || children}</span>
    </button>
  );
};
