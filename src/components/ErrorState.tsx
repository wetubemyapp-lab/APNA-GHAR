import React from 'react';
import { ApiErrorState } from './ApiErrorState';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry: () => void;
  onGoHome?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  onRetry,
  onGoHome,
  className
}) => {
  return (
    <ApiErrorState
      title={title}
      message={message}
      onRetry={onRetry}
      onGoHome={onGoHome}
      className={className}
    />
  );
};
