import React from 'react';

const ProfileScreen = ({ onLogout, onNavigate }) => {
  return (
    <div className="profile-screen">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <h1 className="profile-title">Profile</h1>
          <p className="profile-subtitle">Manage your account settings</p>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {/* Profile Info */}
          <div className="profile-info-card">
            <div className="profile-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="profile-details">
              <h2>Admin User</h2>
              <p>admin@cercino.eu</p>
              <span className="role-badge">Administrator</span>
            </div>
          </div>

          {/* Settings Options */}
          <div className="settings-section">
            <h3>Settings</h3>
            
            <div className="setting-item">
              <div className="setting-icon">
                <i className="fas fa-user-edit"></i>
              </div>
              <div className="setting-content">
                <h4>Edit Profile</h4>
                <p>Update your personal information</p>
              </div>
              <i className="fas fa-chevron-right"></i>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                <i className="fas fa-lock"></i>
              </div>
              <div className="setting-content">
                <h4>Change Password</h4>
                <p>Update your account password</p>
              </div>
              <i className="fas fa-chevron-right"></i>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                <i className="fas fa-bell"></i>
              </div>
              <div className="setting-content">
                <h4>Notifications</h4>
                <p>Manage notification preferences</p>
              </div>
              <i className="fas fa-chevron-right"></i>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="setting-content">
                <h4>Privacy & Security</h4>
                <p>Control your privacy settings</p>
              </div>
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>

          {/* Logout Button */}
          <div className="logout-section">
            <button className="logout-btn" onClick={onLogout}>
              <i className="fas fa-sign-out-alt"></i>
              Sign Out
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-navigation">
          <div className="nav-item" onClick={() => onNavigate('guestlist')}>
            <i className="fas fa-users"></i>
            <span>Guests</span>
          </div>
          <div className="nav-item" onClick={() => onNavigate('statistics')}>
            <i className="fas fa-chart-bar"></i>
            <span>Stats</span>
          </div>
          <div className="nav-item active" onClick={() => onNavigate('profile')}>
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
