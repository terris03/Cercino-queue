import React from 'react';

const StatisticsScreen = ({ onLogout, onNavigate, guests = [] }) => {
  // Calculate real stats from guest data
  const totalGuests = guests.length;
  const checkedIn = guests.filter(guest => guest.checkedIn).length;
  const remaining = totalGuests - checkedIn;
  
  // Calculate total revenue from guest prices
  const totalRevenue = guests.reduce((sum, guest) => {
    const price = parseFloat(guest.price?.replace(/[^\d.]/g, '')) || 0;
    return sum + price;
  }, 0);
  
  const avgOrder = totalGuests > 0 ? Math.round(totalRevenue / totalGuests) : 0;
  const checkInRate = totalGuests > 0 ? ((checkedIn / totalGuests) * 100).toFixed(1) : 0;

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
              <p className="stat-number">{totalRevenue.toLocaleString()} kr</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pink">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-content">
              <h3>Total Guests</h3>
              <p className="stat-number">{totalGuests}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon teal">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h3>Checked In</h3>
              <p className="stat-number">{checkedIn}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-content">
              <h3>Avg Order</h3>
              <p className="stat-number">{avgOrder} kr</p>
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

        <div className="fluid-diagram-section">
          <h2>Guest Flow</h2>
          <div className="fluid-container">
            <div className="fluid-box total">
              <div className="fluid-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="fluid-content">
                <span className="fluid-number">{totalGuests}</span>
                <span className="fluid-label">Total Guests</span>
              </div>
            </div>
            
            <div className="fluid-arrow">
              <i className="fas fa-arrow-right"></i>
            </div>
            
            <div className="fluid-box checked">
              <div className="fluid-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="fluid-content">
                <span className="fluid-number">{checkedIn}</span>
                <span className="fluid-label">Checked In</span>
              </div>
            </div>
            
            <div className="fluid-arrow">
              <i className="fas fa-arrow-right"></i>
            </div>
            
            <div className="fluid-box remaining">
              <div className="fluid-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="fluid-content">
                <span className="fluid-number">{remaining}</span>
                <span className="fluid-label">Remaining</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsScreen;