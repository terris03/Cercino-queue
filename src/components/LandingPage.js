import React, { useState } from 'react';

const LandingPage = ({ onGetStarted, onCreateEvent, onShop, onLogin }) => {
  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    }
  };

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="flowvent-landing-page">
      {/* Navigation */}
      <nav className="flowvent-nav">
        <div className="flowvent-nav-container">
          <div className="flowvent-logo">
            <div className="flowvent-logo-icon">
              <div className="logo-plus">+</div>
              <div className="logo-plus">+</div>
              <div className="logo-plus">+</div>
              <div className="logo-plus">+</div>
            </div>
            <span className="flowvent-logo-text">CERCINO</span>
          </div>
          <div className="flowvent-nav-links">
            <a href="#home" className="flowvent-nav-link active">Home</a>
            <a href="#tickets" className="flowvent-nav-link">Tickets</a>
            <a href="#contact" className="flowvent-nav-link">Contact Us</a>
          </div>
          <button className="flowvent-login-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flowvent-hero">
        <div className="flowvent-hero-container">
          <div className="flowvent-hero-content">
            <div className="flowvent-hero-left">
              <h1 className="flowvent-hero-title">
                <span className="flowvent-title-line1">THE CHAOS</span>
                <span className="flowvent-title-line2">PROTOCOL</span>
              </h1>
              <p className="flowvent-hero-description">
                WE CHARGE NOTHING, BUT DELIVER EVERYTHING.
              </p>
              <button className="flowvent-sponsor-btn" onClick={handleGetStarted}>
                Become Sponsor
                <i className="fas fa-arrow-up-right"></i>
              </button>
              <div className="flowvent-event-details">
                <div className="flowvent-event-info">
                  <i className="fas fa-calendar"></i>
                  <span>6-7 September, 2025</span>
                </div>
                <div className="flowvent-event-info">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>1130 MacLaren Street, Ontario, Canada</span>
                </div>
              </div>
              <div className="flowvent-services">
                <div className="flowvent-service">/Event Strategy & Planning</div>
                <div className="flowvent-service">/Venue Booking & Management</div>
                <div className="flowvent-service">/Event Branding & Design</div>
                <div className="flowvent-service">/Live Streaming & Virtual Events</div>
              </div>
            </div>
            <div className="flowvent-hero-right">
              <div className="flowvent-image-container">
                <img 
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop" 
                  alt="Event Speaker" 
                  className="flowvent-hero-image"
                />
                <div className="flowvent-play-button">
                  <i className="fas fa-play"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Menu Section */}
      <section className="flowvent-hero-menu">
        <div className="flowvent-hero-menu-container">
          <div className="flowvent-menu-grid">
            <div className="flowvent-menu-card">
              <div className="flowvent-menu-icon">
                <i className="fas fa-comments"></i>
              </div>
              <h3 className="flowvent-menu-title">STEP 1 - TELL US YOUR PLAN</h3>
              <p className="flowvent-menu-description">Whether it's a kickoff, prom, or 100 days celebration - just let us know what you're planning. We'll listen to your ideas and help shape the concept so it fits your school or company perfectly.</p>
              <div className="flowvent-menu-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
            
            <div className="flowvent-menu-card">
              <div className="flowvent-menu-icon">
                <i className="fas fa-magic"></i>
              </div>
              <h3 className="flowvent-menu-title">STEP 2 - WE MAKE IT HAPPEN</h3>
              <p className="flowvent-menu-description">Our team creates everything you need: event branding, graphic design, photo, video, and promotion material. We make sure it's professional, on-brand, and ready to share directly with your community.</p>
              <div className="flowvent-menu-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
            
            <div className="flowvent-menu-card">
              <div className="flowvent-menu-icon">
                <i className="fas fa-party-horn"></i>
              </div>
              <h3 className="flowvent-menu-title">STEP 3 - LET'S F*CKING PARTY</h3>
              <p className="flowvent-menu-description">All you need to do is spread the word with the ready-made content. And yes, working with us costs absolutely nothing.</p>
              <div className="flowvent-menu-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cool Footer */}
      <footer className="flowvent-footer">
        <div className="flowvent-footer-container">
          <div className="flowvent-footer-content">
            <div className="flowvent-footer-section">
              <div className="flowvent-footer-logo">
                <div className="flowvent-logo-icon">
                  <div className="logo-plus">+</div>
                  <div className="logo-plus">+</div>
                  <div className="logo-plus">+</div>
                  <div className="logo-plus">+</div>
                </div>
                <span className="flowvent-logo-text">CERCINO</span>
              </div>
              <p className="flowvent-footer-description">
                We charge nothing, but deliver everything. Creating unforgettable events with professional branding and promotion materials.
              </p>
              <div className="flowvent-social-links">
                <a href="#" className="flowvent-social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="flowvent-social-link">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="flowvent-social-link">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="flowvent-social-link">
                  <i className="fab fa-facebook"></i>
                </a>
              </div>
            </div>
            
            <div className="flowvent-footer-section">
              <h4 className="flowvent-footer-title">Product</h4>
              <ul className="flowvent-footer-links">
                <li><a href="#" className="flowvent-footer-link">Features</a></li>
                <li><a href="#" className="flowvent-footer-link">Pricing</a></li>
                <li><a href="#" className="flowvent-footer-link">Integrations</a></li>
                <li><a href="#" className="flowvent-footer-link">API</a></li>
              </ul>
            </div>
            
            <div className="flowvent-footer-section">
              <h4 className="flowvent-footer-title">Company</h4>
              <ul className="flowvent-footer-links">
                <li><a href="#" className="flowvent-footer-link">About Us</a></li>
                <li><a href="#" className="flowvent-footer-link">Careers</a></li>
                <li><a href="#" className="flowvent-footer-link">Press</a></li>
                <li><a href="#" className="flowvent-footer-link">Contact</a></li>
              </ul>
            </div>
            
            <div className="flowvent-footer-section">
              <h4 className="flowvent-footer-title">Support</h4>
              <ul className="flowvent-footer-links">
                <li><a href="#" className="flowvent-footer-link">Help Center</a></li>
                <li><a href="#" className="flowvent-footer-link">Documentation</a></li>
                <li><a href="#" className="flowvent-footer-link">Community</a></li>
                <li><a href="#" className="flowvent-footer-link">Status</a></li>
              </ul>
            </div>
            
            <div className="flowvent-footer-section">
              <h4 className="flowvent-footer-title">Legal</h4>
              <ul className="flowvent-footer-links">
                <li><a href="#" className="flowvent-footer-link">Privacy Policy</a></li>
                <li><a href="#" className="flowvent-footer-link">Terms of Service</a></li>
                <li><a href="#" className="flowvent-footer-link">Cookie Policy</a></li>
                <li><a href="#" className="flowvent-footer-link">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flowvent-footer-bottom">
            <div className="flowvent-footer-bottom-content">
              <p className="flowvent-copyright">
                © 2024 CERCINO. All rights reserved.
              </p>
              <div className="flowvent-footer-bottom-links">
                <a href="#" className="flowvent-footer-bottom-link">Privacy</a>
                <a href="#" className="flowvent-footer-bottom-link">Terms</a>
                <a href="#" className="flowvent-footer-bottom-link">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
