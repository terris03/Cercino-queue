import React from 'react';

const Profile = () => {
  return (
    <div className="page">
      <header className="header">
        <div className="header-content">
          <div className="profile-icon">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="page-title">
            <h1>Profile</h1>
          </div>
          <div className="filter-container">
            <button className="filter-btn">
              <i className="fas fa-cog"></i>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="profile-section">
          <div className="profile-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <h2>Your Profile</h2>
          <p>Manage your account settings and preferences</p>
        </div>

        <div className="settings-section">
          <div className="setting-item">
            <i className="fas fa-user"></i>
            <span>Personal Information</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className="setting-item">
            <i className="fas fa-bell"></i>
            <span>Notifications</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className="setting-item">
            <i className="fas fa-shield-alt"></i>
            <span>Privacy & Security</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className="setting-item">
            <i className="fas fa-palette"></i>
            <span>Appearance</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className="setting-item">
            <i className="fas fa-question-circle"></i>
            <span>Help & Support</span>
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>

        <div className="placeholder-content">
          <h3>Account Information</h3>
          <p>This page will allow you to manage your account settings, update your profile information, and configure app preferences.</p>
        </div>
      </main>
    </div>
  );
};

export default Profile;
