import React from 'react';

const Dashboard = ({ onLogout }) => {
  return (
    <div className="event-app-screen">
      <div className="event-app-container">
        {/* Status Bar */}
        <div className="status-bar">
          <div className="status-left">
            <span className="time">9:41</span>
          </div>
          <div className="status-center">
            <div className="dynamic-island"></div>
          </div>
          <div className="status-right">
            <i className="fas fa-signal"></i>
            <i className="fas fa-wifi"></i>
            <i className="fas fa-battery-three-quarters"></i>
          </div>
        </div>

        {/* Header */}
        <header className="event-header">
          <h1 className="header-title">Home</h1>
          
          {/* Filter Buttons */}
          <div className="filter-section">
            <div className="filter-buttons">
              <button className="filter-btn">
                <span className="flag">🇫🇷</span>
                <span>Paris</span>
                <i className="fas fa-chevron-down"></i>
              </button>
              <button className="filter-btn">
                <span>Date</span>
                <i className="fas fa-chevron-down"></i>
              </button>
              <button className="filter-btn">
                <span>Clubs</span>
              </button>
              <button className="filter-btn">
                <span>Restaurants</span>
              </button>
            </div>
            
            <div className="header-icons">
              <button className="header-icon">
                <i className="fas fa-comment"></i>
              </button>
              <button className="header-icon">
                <i className="fas fa-bell"></i>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="event-main">
          {/* Featured Event Card */}
          <div className="featured-event-card">
            <div className="featured-tag">FEATURED</div>
            <div className="event-background">
              <div className="event-artwork">
                <div className="sun-moon-art">
                  <div className="sun-face">☀️</div>
                  <div className="moon-face">🌙</div>
                </div>
              </div>
            </div>
            <div className="event-content">
              <div className="event-date">SAMEDI 08 JUIN - 19H-02H</div>
              <div className="event-title-row">
                <button className="play-btn">
                  <i className="fas fa-play"></i>
                </button>
                <h2 className="event-title">NOCHE DE VERANO</h2>
                <button className="heart-btn">
                  <i className="fas fa-heart"></i>
                </button>
              </div>
              <div className="event-details">
                <div className="event-subtitle">POOL PARTY GIRLS ONLY - La Bringue</div>
                <div className="event-info">Wed 5 June | 06:00 PM</div>
                <div className="event-location">The Palm Paris</div>
              </div>
            </div>
          </div>

          {/* Tonight Section */}
          <div className="tonight-section">
            <h3 className="section-title">TONIGHT</h3>
            
            <div className="event-card">
              <div className="event-card-image">
                <div className="retro-artwork">
                  <div className="afro-woman">👩🏿‍🦱</div>
                  <div className="abstract-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                  </div>
                </div>
              </div>
              <div className="event-card-content">
                <h4 className="event-card-title">Young Pulse</h4>
                <div className="event-card-info">
                  <span className="event-card-time">Tonight | 10:00 PM</span>
                  <span className="event-card-venue">Club XYZ</span>
                </div>
              </div>
            </div>

            <div className="event-card">
              <div className="event-card-image">
                <div className="retro-artwork">
                  <div className="afro-woman">👩🏿‍🦱</div>
                  <div className="abstract-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                  </div>
                </div>
              </div>
              <div className="event-card-content">
                <h4 className="event-card-title">Summer Vibes</h4>
                <div className="event-card-info">
                  <span className="event-card-time">Tonight | 11:00 PM</span>
                  <span className="event-card-venue">Beach Club</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="event-bottom-nav">
          <div className="nav-item active">
            <i className="fas fa-home"></i>
          </div>
          <div className="nav-item">
            <i className="fas fa-search"></i>
          </div>
          <div className="nav-item nav-plus">
            <i className="fas fa-plus"></i>
          </div>
          <div className="nav-item">
            <i className="fas fa-ticket-alt"></i>
          </div>
          <div className="nav-item">
            <i className="fas fa-user"></i>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
