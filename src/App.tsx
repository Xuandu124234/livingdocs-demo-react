import React from 'react';
import { DashboardPage } from './pages/DashboardPage';
import { NotificationBell } from './components/NotificationBell';
import { ErrorBoundary } from './components/ErrorBoundary';

/**
 * Application root component.
 *
 * Mounts the dashboard page and provides the global layout.
 */
export function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>LivingDocs Demo</h1>
        <NotificationBell />
      </header>
      <main className="app-main">
        <ErrorBoundary>
          <DashboardPage />
        </ErrorBoundary>
      </main>
    </div>
  );
}
