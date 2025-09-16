import React from 'react';

const Dashboard = ({ onLogout }) => {
  return (
    <div className="dashboard-screen">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <div className="dashboard-title">
              <h1>Dashboard</h1>
              <p>Welcome back to your event management hub</p>
            </div>
            <button className="logout-button" onClick={onLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="dashboard-welcome">
            <div className="welcome-card">
              <div className="welcome-icon">🎊</div>
              <h2>Your Dashboard is Ready!</h2>
              <p>This is your clean, empty dashboard. Ready for your content!</p>
            </div>
          </div>

          {/* Placeholder for future content */}
          <div className="dashboard-placeholder">
            <div className="placeholder-card">
              <i className="fas fa-plus-circle"></i>
              <h3>Add Your Content Here</h3>
              <p>This space is ready for your custom components and features.</p>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <div className="nav-item active">
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </div>
          <div className="nav-item">
            <i className="fas fa-chart-bar"></i>
            <span>Analytics</span>
          </div>
          <div className="nav-item">
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
