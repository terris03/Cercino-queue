import React, { useState } from 'react';

const HamburgerMenu = ({ onNavigate, currentScreen, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (screen) => {
    onNavigate(screen);
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <div className={`hamburger-button ${isOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}

      {/* Slide-out Menu */}
      <div className={`slide-menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h2>CERCINO</h2>
        </div>

        <div className="menu-content">
          <div className="menu-section">
            <h3>Navigation</h3>
            <div className="menu-item" onClick={() => handleNavigation('guestlist')}>
              <i className="fas fa-users"></i>
              <span>Guestlist</span>
              {currentScreen === 'guestlist' && <div className="active-indicator"></div>}
            </div>
            
            <div className="menu-item" onClick={() => handleNavigation('statistics')}>
              <i className="fas fa-chart-bar"></i>
              <span>Statistics</span>
              {currentScreen === 'statistics' && <div className="active-indicator"></div>}
            </div>
            
            <div className="menu-item" onClick={() => handleNavigation('createevent')}>
              <i className="fas fa-plus-circle"></i>
              <span>Create Event</span>
              {currentScreen === 'createevent' && <div className="active-indicator"></div>}
            </div>
            
            <div className="menu-item" onClick={() => handleNavigation('shop')}>
              <i className="fas fa-store"></i>
              <span>Shop</span>
              {currentScreen === 'shop' && <div className="active-indicator"></div>}
            </div>
            
            <div className="menu-item" onClick={() => handleNavigation('profile')}>
              <i className="fas fa-user"></i>
              <span>Profile</span>
              {currentScreen === 'profile' && <div className="active-indicator"></div>}
            </div>
          </div>

          <div className="menu-section">
            <h3>Support</h3>
            <div className="menu-item">
              <i className="fas fa-shield-alt"></i>
              <span>Privacy & Policies</span>
            </div>
            
            <div className="menu-item">
              <i className="fas fa-question-circle"></i>
              <span>Support</span>
            </div>
          </div>

          <div className="menu-footer">
            <button className="logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
