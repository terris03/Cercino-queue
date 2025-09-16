import React from 'react';

const WelcomeScreen = ({ onNext }) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-container">
        {/* Logo/Brand */}
        <div className="welcome-logo">
          <div className="logo-icon">🎉</div>
          <h1 className="logo-text">Cercino</h1>
          <p className="logo-subtitle">Event Management</p>
        </div>

        {/* Welcome Content */}
        <div className="welcome-content">
          <h2 className="welcome-title">Welcome to the Future of Event Management</h2>
          <p className="welcome-description">
            Experience seamless guestlist management with our cutting-edge platform. 
            Built with love for event organizers who demand excellence.
          </p>
        </div>

        {/* Features Preview */}
        <div className="welcome-features">
          <div className="feature-item">
            <div className="feature-icon">📊</div>
            <div className="feature-text">Real-time Analytics</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <div className="feature-text">Multi-device Sync</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✨</div>
            <div className="feature-text">Beautiful Interface</div>
          </div>
        </div>

        {/* Get Started Button */}
        <button className="welcome-button" onClick={onNext}>
          <span>Get Started</span>
          <i className="fas fa-arrow-right"></i>
        </button>

        {/* Swipe Hint */}
        <div className="swipe-hint">
          <i className="fas fa-hand-pointer"></i>
          <span>Swipe to continue</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
