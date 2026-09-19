import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

interface OfflineBannerProps {
  onRetry?: () => void;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ onRetry }) => {
  const [isOnline, setIsOnline] = useState<boolean>(() => navigator.onLine);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [justReconnected, setJustReconnected] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setJustReconnected(true);
      setTimeout(() => setJustReconnected(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetryClick = () => {
    setIsRetrying(true);
    if (onRetry) onRetry();
    
    setTimeout(() => {
      setIsRetrying(false);
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        setJustReconnected(true);
        setTimeout(() => setJustReconnected(false), 3000);
      }
    }, 1000);
  };

  if (justReconnected) {
    return (
      <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 flex items-center justify-between shadow-md transition-all animate-in slide-in-from-top duration-300 z-50 sticky top-0">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Connection restored! Syncing latest property listings...</span>
        </div>
      </div>
    );
  }

  if (isOnline) return null;

  return (
    <div className="bg-amber-600 text-white text-xs font-bold px-4 py-2 flex items-center justify-between shadow-md transition-all animate-in slide-in-from-top duration-300 z-50 sticky top-0">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 shrink-0" />
        <span>Offline Mode: Showing cached properties & saved offline data.</span>
      </div>
      <button
        onClick={handleRetryClick}
        disabled={isRetrying}
        className="px-2.5 py-1 rounded-lg bg-amber-800 hover:bg-amber-900 active:scale-95 text-white font-bold text-[11px] flex items-center gap-1 transition shrink-0 cursor-pointer"
      >
        <RefreshCw className={`w-3 h-3 ${isRetrying ? 'animate-spin' : ''}`} />
        <span>{isRetrying ? 'Checking...' : 'Retry Connection'}</span>
      </button>
    </div>
  );
};
