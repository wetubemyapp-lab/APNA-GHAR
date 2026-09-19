import React from 'react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';
import { 
  Home, 
  Search, 
  Heart, 
  MessageSquare, 
  User 
} from 'lucide-react';

export const BottomNavigationBar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    savedProperties, 
    totalUnreadMessages,
    setSelectedProperty,
    setSelectedProject,
    setSelectedLocality
  } = useApp();

  const navItems: { tab: ActiveTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { tab: 'home', label: 'Discover', icon: Home },
    { tab: 'search', label: 'Explore', icon: Search },
    { tab: 'shortlist', label: 'Shortlist', icon: Heart, badge: savedProperties.length },
    { tab: 'messages', label: 'Messages', icon: MessageSquare, badge: totalUnreadMessages },
    { tab: 'account', label: 'Account', icon: User }
  ];

  const handleTabClick = (tab: ActiveTab) => {
    // Reset nested full modals/views on tab switch
    setSelectedProperty(null);
    setSelectedProject(null);
    setSelectedLocality(null);
    setActiveTab(tab);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] px-2 py-1.5 transition-all">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map(item => {
          const isActive = activeTab === item.tab;
          const Icon = item.icon;

          return (
            <button
              key={item.tab}
              onClick={() => handleTabClick(item.tab)}
              className="group relative flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all"
            >
              {/* Material 3 Active Indicator Pill */}
              <div 
                className={`relative flex items-center justify-center w-12 h-7 rounded-full transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#E8EAF6] text-[#3949AB]' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-105 stroke-[2.4]' : 'stroke-[1.8]'}`} />

                {/* Badge */}
                {Boolean(item.badge && item.badge > 0) && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#3949AB] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span 
                className={`text-[11px] font-medium tracking-tight mt-0.5 transition-colors ${
                  isActive 
                    ? 'text-[#3949AB] font-bold' 
                    : 'text-slate-500 group-hover:text-slate-800'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
