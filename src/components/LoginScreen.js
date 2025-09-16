import React, { useState } from 'react';

const LoginScreen = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        {/* Header */}
        <div className="login-header">
          <button className="back-button" onClick={onBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to continue to your dashboard</p>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              className="login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <i className="fas fa-arrow-right"></i>
              </>
            )}
          </button>
        </form>

        {/* Additional Options */}
        <div className="login-options">
          <button className="forgot-password">Forgot Password?</button>
          <div className="signup-link">
            Don't have an account? <button className="signup-button">Sign Up</button>
          </div>
        </div>

        {/* Demo Login */}
        <div className="demo-login">
          <button 
            className="demo-button"
            onClick={() => {
              setEmail('demo@cercino.com');
              setPassword('demo123');
            }}
          >
            <i className="fas fa-magic"></i>
            Use Demo Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
