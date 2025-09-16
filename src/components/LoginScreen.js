import React, { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [roomNumber, setRoomNumber] = useState('');

  const handleInputChange = (e) => {
    setRoomNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation - in real app, this would connect to authentication
    if (roomNumber.trim()) {
      onLogin();
    }
  };

  return (
    <div className="hotel-login-screen">
      {/* Top Section - Professional Image */}
      <div className="hotel-image-section">
        <div className="hotel-staff-image">
          <div className="staff-portrait">
            <div className="staff-avatar">
              <i className="fas fa-user-tie"></i>
            </div>
          </div>
        </div>
        <div className="image-gradient-overlay"></div>
      </div>

      {/* Bottom Section - Login Form */}
      <div className="hotel-form-section">
        <div className="hotel-welcome-text">
          <h2 className="hotel-subtitle">Welcome to Cercino</h2>
          <h1 className="hotel-title">Your Wish is Our Command</h1>
        </div>

        <form className="hotel-login-form" onSubmit={handleSubmit}>
          <div className="hotel-input-group">
            <input
              type="text"
              className="hotel-room-input"
              placeholder="Room Number"
              value={roomNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="hotel-explore-btn">
            Explore Services
            <i className="fas fa-arrow-up-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;