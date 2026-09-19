import React from 'react';

interface SkeletonProps {
  type?: 'card' | 'list' | 'detail' | 'profile';
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({ 
  type = 'card', 
  count = 3 
}) => {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {items.map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200/80 bg-white p-3 space-y-3 animate-pulse shadow-xs">
            {/* Image Skeleton */}
            <div className="w-full h-44 bg-slate-200 rounded-xl" />
            
            {/* Title & Badge Skeleton */}
            <div className="flex items-center justify-between pt-1">
              <div className="h-4 bg-slate-200 rounded-md w-2/3" />
              <div className="h-4 bg-slate-200 rounded-md w-1/4" />
            </div>

            {/* Price & Subtitle */}
            <div className="h-5 bg-slate-300 rounded-md w-1/2" />
            <div className="h-3 bg-slate-200 rounded-md w-3/4" />

            {/* Amenities row */}
            <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
              <div className="h-6 bg-slate-100 rounded-lg w-16" />
              <div className="h-6 bg-slate-100 rounded-lg w-16" />
              <div className="h-6 bg-slate-100 rounded-lg w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-3 w-full">
        {items.map((_, i) => (
          <div key={i} className="p-3.5 rounded-2xl border border-slate-200/80 bg-white flex items-center gap-3 animate-pulse">
            <div className="w-20 h-20 bg-slate-200 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded-md w-3/4" />
              <div className="h-3 bg-slate-200 rounded-md w-1/2" />
              <div className="h-4 bg-slate-300 rounded-md w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="p-5 space-y-4 animate-pulse bg-white rounded-3xl max-w-xl mx-auto border border-slate-200">
        <div className="w-full h-60 bg-slate-200 rounded-2xl" />
        <div className="h-6 bg-slate-300 rounded-md w-3/4" />
        <div className="h-4 bg-slate-200 rounded-md w-1/2" />
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="h-16 bg-slate-100 rounded-xl" />
          <div className="h-16 bg-slate-100 rounded-xl" />
          <div className="h-16 bg-slate-100 rounded-xl" />
        </div>
        <div className="h-20 bg-slate-100 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-slate-200" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-slate-200 rounded-md w-1/2" />
          <div className="h-3 bg-slate-200 rounded-md w-1/3" />
        </div>
      </div>
    </div>
  );
};
