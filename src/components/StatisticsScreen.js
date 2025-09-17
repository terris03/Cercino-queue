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
            <div className="stat-icon green">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="stat-content">
              <h3>Total Earnings</h3>
              <p className="stat-number">{stats.totalRevenue.toLocaleString()} kr</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pink">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-content">
              <h3>Total Guests</h3>
              <p className="stat-number">{stats.totalGuests}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon teal">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h3>Checked In</h3>
              <p className="stat-number">{stats.checkedIn}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-content">
              <h3>Avg Order</h3>
              <p className="stat-number">{Math.round(stats.totalRevenue / stats.totalGuests)} kr</p>
            </div>
          </div>
        </div>

        <div className="chart-section">
          <div className="chart-header">
            <div className="chart-icon orange">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="chart-content">
              <h2>Check-in Rate</h2>
              <div className="progress-info">
                <span className="progress-label">Progress</span>
                <span className="progress-percentage">{checkInRate}%</span>
              </div>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${checkInRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsScreen;