import React, { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [roomNumber, setRoomNumber] = useState('');

  const handleInputChange = (e) => {
    setRoomNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Password validation
    if (roomNumber.trim() === '1515') {
      onLogin(roomNumber.trim());
    } else {
      alert('Invalid password. Please enter 1515');
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
                  placeholder="Your pin here"
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