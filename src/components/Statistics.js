import React from 'react';

const Statistics = () => {
  return (
    <div className="page">
      <header className="header">
        <div className="header-content">
          <div className="profile-icon">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="page-title">
            <h1>Statistics</h1>
          </div>
          <div className="filter-container">
            <button className="filter-btn">
              <i className="fas fa-filter"></i>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="stats-module">
          <div className="stats-content">
            <div className="stats-card">
              <h3>Total Guests</h3>
              <div className="stats-number">0</div>
            </div>
            <div className="stats-card">
              <h3>Checked In</h3>
              <div className="stats-number">0</div>
            </div>
            <div className="stats-card">
              <h3>Revenue</h3>
              <div className="stats-number">€0</div>
            </div>
          </div>
        </div>

        <div className="placeholder-content">
          <h2>Statistics Dashboard</h2>
          <p>This page will show detailed analytics and statistics about your events.</p>
          <div className="placeholder-features">
            <div className="feature-item">
              <i className="fas fa-chart-line"></i>
              <span>Revenue Analytics</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-users"></i>
              <span>Guest Demographics</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-clock"></i>
              <span>Check-in Times</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-calendar"></i>
              <span>Event History</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Statistics;
