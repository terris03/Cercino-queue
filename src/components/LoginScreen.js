import React, { useState } from 'react';

const LoginScreen = ({ onLogin, onBack }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation - in real app, this would connect to authentication
    if (credentials.email && credentials.password) {
      onLogin();
    }
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        {/* Header */}
        <div className="login-header">
          <button className="back-btn" onClick={onBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your admin panel</p>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="admin@cercino.eu"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            <i className="fas fa-sign-in-alt"></i>
            Sign In
          </button>
        </form>

        {/* Bottom Navigation */}
        <div className="bottom-navigation">
          <div className="nav-item">
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

export default LoginScreen;