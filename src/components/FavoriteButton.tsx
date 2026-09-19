import React from 'react';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FavoriteButtonProps {
  propertyId: string;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  propertyId,
  className = ''
}) => {
  const { toggleSaveProperty, isPropertySaved } = useApp();
  const isSaved = isPropertySaved(propertyId);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleSaveProperty(propertyId);
      }}
      className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-200 active:scale-90 border shadow-xs ${
        isSaved 
          ? 'bg-rose-500 text-white border-rose-400 shadow-md scale-105' 
          : 'bg-white/90 text-slate-700 hover:text-rose-500 hover:bg-white border-slate-200 hover:border-rose-100'
      } ${className}`}
      title={isSaved ? 'Remove from Shortlist' : 'Add to Shortlist'}
    >
      <Heart className={`w-4 h-4 transition-transform duration-200 ${isSaved ? 'fill-white scale-110' : ''}`} />
    </button>
  );
};
