import React from 'react';
import { NotificationItem as NotificationType } from '../types';
import { 
  Bell, 
  TrendingDown, 
  Calendar, 
  UserCheck, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface NotificationItemProps {
  notification: NotificationType;
  onClick?: (notification: NotificationType) => void;
  className?: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick,
  className = ''
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'price_drop':
        return <TrendingDown className="w-4 h-4 text-emerald-600" />;
      case 'callback':
        return <Calendar className="w-4 h-4 text-indigo-600" />;
      case 'lead':
        return <UserCheck className="w-4 h-4 text-blue-600" />;
      case 'new_match':
        return <Bell className="w-4 h-4 text-[#3949AB]" />;
      case 'system':
        return <AlertCircle className="w-4 h-4 text-amber-600" />;
      default:
        return <HelpCircle className="w-4 h-4 text-slate-600" />;
    }
  };

  const getContainerBg = () => {
    if (!notification.isRead) {
      return 'bg-blue-50/70 border-blue-200 text-slate-900 shadow-2xs';
    }
    return 'bg-white border-slate-200/80 text-slate-600';
  };

  return (
    <div
      onClick={() => onClick?.(notification)}
      className={`p-4 rounded-2xl border transition duration-150 cursor-pointer flex items-start gap-3.5 hover:shadow-xs active:scale-[0.99] ${getContainerBg()} ${className}`}
    >
      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shrink-0 shadow-3xs">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2.5">
          <h4 className="text-xs font-extrabold text-slate-900 truncate">
            {notification.title}
          </h4>
          <span className="text-[10px] text-slate-400 font-bold shrink-0">
            {notification.timestamp}
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          {notification.message}
        </p>
      </div>
    </div>
  );
};
