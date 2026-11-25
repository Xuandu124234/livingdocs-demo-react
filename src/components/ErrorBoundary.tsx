import React, { Component } from 'react';

export interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * ErrorBoundary catches the rendering errors of its children and shows
 * a fallback instead of unmounting the whole tree.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
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
