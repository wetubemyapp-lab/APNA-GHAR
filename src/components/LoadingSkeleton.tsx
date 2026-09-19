import React from 'react';
import { SkeletonLoader } from './SkeletonLoader';

interface LoadingSkeletonProps {
  type?: 'card' | 'list' | 'detail' | 'profile';
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  type = 'card', 
  count = 3 
}) => {
  return <SkeletonLoader type={type} count={count} />;
};
