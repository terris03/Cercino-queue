import React, { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [roomNumber, setRoomNumber] = useState('123');

  const handleInputChange = (e) => {
    setRoomNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation - in real app, this would connect to authentication
    if (roomNumber.trim()) {
      onLogin(roomNumber.trim());
    }
  };

  return (
    <div className="hotel-login-screen">
      {/* Top Section - Background Image */}
      <div className="hotel-image-section">
        <div className="image-gradient-overlay"></div>
      </div>

      {/* Bottom Section - Login Form */}
      <div className="hotel-form-section">
        <div className="hotel-welcome-text">
          <h1 className="hotel-title">CERCINO</h1>
        </div>

        <form className="hotel-login-form" onSubmit={handleSubmit}>
          <div className="hotel-input-group">
            <input
              type="password"
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