import type { ReactNode } from 'react';

// Loading
export interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

// Spinner
export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

// ErrorBoundary
export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Sidebar
export interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}
