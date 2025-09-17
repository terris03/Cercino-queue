import React from 'react';

const StatisticsScreen = ({ onLogout, onNavigate }) => {
  const stats = {
    totalGuests: 150,
    checkedIn: 89,
    remaining: 61,
    totalRevenue: 25400
  };

  const checkInRate = ((stats.checkedIn / stats.totalGuests) * 100).toFixed(1);

  return (
    <div className="statistics-screen">
      <div className="screen-header">
        <h1>Statistics</h1>
      </div>

      <div className="stats-container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-content">
              <h3>Total Guests</h3>
              <p className="stat-number">{stats.totalGuests}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h3>Checked In</h3>
              <p className="stat-number">{stats.checkedIn}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-content">
              <h3>Remaining</h3>
              <p className="stat-number">{stats.remaining}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-content">
              <h3>Check-in Rate</h3>
              <p className="stat-number">{checkInRate}%</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="stat-content">
              <h3>Total Revenue</h3>
              <p className="stat-number">{stats.totalRevenue.toLocaleString()} kr</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-calendar"></i>
            </div>
            <div className="stat-content">
              <h3>Event Date</h3>
              <p className="stat-number">Today</p>
            </div>
          </div>
        </div>

        <div className="chart-section">
          <h2>Check-in Progress</h2>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${checkInRate}%` }}
            ></div>
          </div>
          <p className="progress-text">{stats.checkedIn} of {stats.totalGuests} guests checked in</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsScreen;