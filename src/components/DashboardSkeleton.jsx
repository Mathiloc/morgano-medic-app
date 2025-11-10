
import React from 'react';

// Este es el HTML de tus skeletons, convertido a JSX
export function DashboardSkeleton() {
  return (
    <div className="dashboard-grid">
      <div className="dashboard-widget" style={{ gridColumn: '1 / -1' }}>
        <div className="skeleton skeleton-title" style={{ width: '40%' }}></div>
        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-line"></div>
      </div>
      <div className="dashboard-widget">
        <div className="skeleton skeleton-title" style={{ width: '50%' }}></div>
        <div className="skeleton skeleton-circle"></div>
      </div>
      <div className="dashboard-widget">
        <div className="skeleton skeleton-title" style={{ width: '50%' }}></div>
        <div className="skeleton skeleton-circle" style={{ width: '80px', height: '80px' }}></div>
      </div>
      <div className="dashboard-widget">
        <div className="skeleton skeleton-title" style={{ width: '30%' }}></div>
        <div className="skeleton skeleton-line" style={{ height: '50px' }}></div>
      </div>
    </div>
  );
}