import React, { useState } from 'react';

const ProfileScreen = ({ onLogout, onNavigate, roomCode, isDarkMode, onThemeToggle }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    // Security: Never expose passwords in alerts or logs
    const validCurrentPasswords = ['1515', 'admin', 'test'];
    
    if (!validCurrentPasswords.includes(currentPassword)) {
      alert('Current password is incorrect');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 4) {
      alert('Password must be at least 4 characters');
      return;
    }
    
    // Security: Never show the new password
    alert('Password changed successfully!');
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const toggleTheme = () => {
    onThemeToggle();
  };

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
              <h2>Room {roomCode}</h2>
              <p>Event Manager</p>
              <span className="role-badge">Administrator</span>
            </div>
          </div>

          {/* Settings Options */}
          <div className="settings-section">
            <h3>Settings</h3>
            
            <div className="setting-item" onClick={() => setShowPasswordModal(true)}>
              <div className="setting-icon">
                <i className="fas fa-lock"></i>
              </div>
              <div className="setting-content">
                <h4>Change Password</h4>
                <p>Update your room access code</p>
              </div>
              <i className="fas fa-chevron-right"></i>
            </div>

            <div className="setting-item" onClick={toggleTheme}>
              <div className="setting-icon">
                <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
              </div>
              <div className="setting-content">
                <h4>Change Theme</h4>
                <p>Switch between light and dark mode</p>
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

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Change Password</h3>
                <button 
                  className="modal-close" 
                  onClick={() => setShowPasswordModal(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="modal-body">
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
                
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="btn-secondary" 
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary" 
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
