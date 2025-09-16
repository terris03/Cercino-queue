import React from 'react';

const Dashboard = ({ onLogout }) => {
  return (
    <div className="event-app-screen">
      <div className="event-app-container">
        {/* Header */}
        <header className="event-header">
          <h1 className="header-title">Home</h1>
          
          {/* Search and Create Section */}
          <div className="search-create-section">
            <div className="search-input-container">
              <input 
                type="text" 
                placeholder="Search events..." 
                className="search-input"
              />
              <button className="create-event-btn">
                Create Event
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="event-main">
          {/* Spotify-like Event Scroller */}
          <div className="spotify-scroller">
            <div className="spotify-container">
              {/* Tutorial Event Card */}
              <div className="spotify-event-card active">
                <div className="event-image-spotify">
                  <div className="retro-artwork">
                    <div className="afro-woman">👩🏿‍🦱</div>
                    <div className="abstract-shapes">
                      <div className="shape shape-1"></div>
                      <div className="shape shape-2"></div>
                      <div className="shape shape-3"></div>
                    </div>
                  </div>
                </div>
                <div className="event-content-spotify">
                  <h3 className="event-title-spotify">Tutorial</h3>
                  <p className="event-subtitle-spotify">Learn how to use the app</p>
                </div>
                
                {/* Guest List */}
                <div className="guest-list">
                  <div className="guest-item">
                    <span className="guest-name">Emma Andersson</span>
                    <span className="guest-price">250 kr</span>
                  </div>
                  <div className="guest-item">
                    <span className="guest-name">Marcus Johansson</span>
                    <span className="guest-price">300 kr</span>
                  </div>
                  <div className="guest-item">
                    <span className="guest-name">Sofia Eriksson</span>
                    <span className="guest-price">200 kr</span>
                  </div>
                  <div className="guest-item">
                    <span className="guest-name">Alexander Nilsson</span>
                    <span className="guest-price">350 kr</span>
                  </div>
                  <div className="guest-item">
                    <span className="guest-name">Isabella Larsson</span>
                    <span className="guest-price">275 kr</span>
                  </div>
                  <div className="guest-item">
                    <span className="guest-name">Erik Gustafsson</span>
                    <span className="guest-price">225 kr</span>
                  </div>
                </div>
              </div>

              {/* Add New Event Card */}
              <div className="spotify-event-card add-event">
                <div className="add-event-content">
                  <div className="add-event-icon">+</div>
                  <h3 className="add-event-title">Add Event</h3>
                  <p className="add-event-subtitle">Create new event</p>
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
