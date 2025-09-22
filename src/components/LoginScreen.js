import React, { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [roomNumber, setRoomNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true); // Default to true for convenience

  // Secure password validation - in production, this should be server-side
  const validatePassword = async (password) => {
    // Basic validation - in production, hash comparison should be server-side
    const validPasswords = ['1515', 'admin', 'test']; // Multiple room codes
    return validPasswords.includes(password.trim());
  };

  const handleInputChange = (e) => {
    setRoomNumber(e.target.value);
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const isValid = await validatePassword(roomNumber);
      if (isValid) {
        // Pass rememberMe preference to parent component
        onLogin(roomNumber.trim(), rememberMe);
      } else {
        setError('Invalid room code. Please try again.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
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
              placeholder="Your room code here"
              value={roomNumber}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
            {error && <div className="error-message">{error}</div>}
          </div>

          <div className="remember-me-group">
            <label className="remember-me-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span className="checkmark"></span>
              Remember me for 7 days
            </label>
          </div>

          <button 
            type="submit" 
            className="hotel-explore-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Explore Services'}
            <i className="fas fa-arrow-up-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;