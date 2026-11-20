import React from 'react';

/**
 * ErrorBoundary catches rendering errors of its children.
 */
export interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error): void {
    console.error('Dashboard crashed:', error);
  }

  render(): React.ReactNode {
    if (this.state.error) {
      return this.props.fallback ?? <div className="error">Something went wrong.</div>;
    }
    return this.props.children;
  }
}
