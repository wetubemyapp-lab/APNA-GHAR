import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EmptyState } from './EmptyState';
import { 
  X, 
  Bell, 
  CheckCheck, 
  Tag, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  Info, 
  Trash2,
  ArrowRight
} from 'lucide-react';

interface NotificationCenterModalProps {
  onClose: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({ onClose }) => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    setSelectedProperty, 
    properties, 
    setActiveTab 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'price' | 'inquiry' | 'callback' | 'system'>('all');

  const filteredNotifs = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    return n.type === activeFilter;
  });

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'price': return <Tag className="w-4 h-4 text-emerald-600" />;
      case 'callback': return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'inquiry': return <MessageSquare className="w-4 h-4 text-purple-600" />;
      default: return <Bell className="w-4 h-4 text-amber-600" />;
    }
  };

  const handleNotifClick = (notif: any) => {
    markNotificationAsRead(notif.id);
    if (notif.targetType === 'property' && notif.targetId) {
      const found = properties.find(p => p.id === notif.targetId);
      if (found) {
        setSelectedProperty(found);
        onClose();
      }
    } else if (notif.targetType === 'callback') {
      setActiveTab('account');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Activity & Alerts</h3>
              <p className="text-xs text-slate-500">Real-time alerts on price drops & site visits</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsAsRead}
              className="px-2.5 py-1.5 rounded-xl bg-slate-200/70 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="p-3 bg-white border-b border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Alerts' },
            { id: 'price', label: 'Price Drops' },
            { id: 'callback', label: 'Site Visits' },
            { id: 'inquiry', label: 'Leads' },
            { id: 'system', label: 'System' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeFilter === tab.id 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List of Notifications */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 bg-slate-50/50 no-scrollbar">
          {filteredNotifs.length === 0 ? (
            <EmptyState 
              type="no_notifications"
              title="You're all caught up!"
              ctaText="Explore Home"
              onCtaClick={() => {
                setActiveTab('search');
                onClose();
              }}
              className="my-4"
            />
          ) : (
            filteredNotifs.map(n => (
              <div
                key={n.id}
                onClick={() => handleNotifClick(n)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                  n.isRead 
                    ? 'bg-white border-slate-200/80 text-slate-600' 
                    : 'bg-blue-50/70 border-blue-200 text-slate-900 shadow-sm'
                }`}
              >
                <div className="p-2 rounded-xl bg-white border border-slate-200 shrink-0 shadow-xs">
                  {getNotifIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold truncate">{n.title}</h4>
                    <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
