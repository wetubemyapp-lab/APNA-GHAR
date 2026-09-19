import React from 'react';
import { AlertCircle, RefreshCw, ServerOff, Home } from 'lucide-react';

interface ApiErrorStateProps {
  title?: string;
  message?: string;
  onRetry: () => void;
  onGoHome?: () => void;
  className?: string;
}

export const ApiErrorState: React.FC<ApiErrorStateProps> = ({
  title = 'Failed to load property data',
  message = 'We encountered an error connecting to our server. Please check your network or try again.',
  onRetry,
  onGoHome,
  className = ''
}) => {
  return (
    <div className={`p-6 sm:p-8 rounded-3xl bg-white border border-rose-200/80 shadow-sm text-center max-w-md mx-auto my-6 flex flex-col items-center justify-center animate-in fade-in duration-300 ${className}`}>
      
      <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-3 shadow-inner">
        <ServerOff className="w-8 h-8" />
      </div>

      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1">
        {title}
      </h3>
      
      <p className="text-xs text-slate-500 leading-relaxed mb-5 max-w-xs font-medium">
        {message}
      </p>

      <div className="flex items-center gap-2.5">
        <button
          onClick={onRetry}
          className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/20 active:scale-95 transition cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Loading</span>
        </button>

        {onGoHome && (
          <button
            onClick={onGoHome}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 active:scale-95 transition cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Go to Home</span>
          </button>
        )}
      </div>

    </div>
  );
};
