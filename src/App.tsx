import React from 'react';
import { DashboardPage } from './pages/DashboardPage';

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
      </header>
      <main className="app-main">
        <DashboardPage />
      </main>
    </div>
  );
}
