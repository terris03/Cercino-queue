import React from 'react';

const WelcomeScreen = ({ onNext }) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-container">
        {/* Header */}
        <div className="welcome-header">
          <div className="shield-icon">
            <i className="fas fa-shield-alt"></i>
          </div>
          <h1 className="welcome-title">Admin Panel</h1>
          <p className="welcome-subtitle">Manage your event system</p>
        </div>

        {/* Action Cards */}
        <div className="welcome-cards">
          <div className="welcome-card" onClick={onNext}>
            <div className="card-icon create-logins">
              <i className="fas fa-user-plus"></i>
            </div>
            <h3>Create Logins</h3>
            <p>Manage user access and permissions</p>
          </div>

          <div className="welcome-card" onClick={onNext}>
            <div className="card-icon create-event">
              <i className="fas fa-calendar-plus"></i>
            </div>
            <h3>Create Event</h3>
            <p>Create new event with guest list</p>
          </div>

          <div className="welcome-card" onClick={onNext}>
            <div className="card-icon settings">
              <i className="fas fa-cog"></i>
            </div>
            <h3>Settings</h3>
            <p>Customize your experience</p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-navigation">
          <div className="nav-item active">
            <i className="fas fa-users"></i>
            <span>Guests</span>
          </div>
          <div className="nav-item">
            <i className="fas fa-chart-bar"></i>
            <span>Stats</span>
          </div>
          <div className="nav-item">
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;