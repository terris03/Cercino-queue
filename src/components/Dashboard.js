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
                <div className="glassmorphism-event-card">
                  <div className="featured-tag-glass">FEATURED</div>
                  <div className="event-artwork-glass">
                    <div className="sun-moon-artwork">
                      <div className="sun-face">☀️</div>
                      <div className="moon-face">🌙</div>
                    </div>
                  </div>
                  <div className="event-details-glass">
                    <div className="event-date-glass">SAMEDI 08 JUIN - 19H-02H</div>
                    <div className="event-title-row-glass">
                      <button className="play-btn-glass">
                        <i className="fas fa-play"></i>
                      </button>
                      <h2 className="event-title-glass">NOCHE DE VERANO</h2>
                      <button className="heart-btn-glass">
                        <i className="fas fa-heart"></i>
                      </button>
                    </div>
                    <div className="event-info-glass">
                      <div className="event-subtitle-glass">POOL PARTY GIRLS ONLY - La Bringue</div>
                      <div className="event-location-glass">The Palm Paris</div>
                    </div>
                  </div>
                </div>
                
                {/* Guest List */}
                <div className="guest-list-black">
                  <div className="guest-item-black">
                    <span className="guest-name-black">Aaron Garrido</span>
                    <span className="guest-status vip">VIP</span>
                  </div>
                  <div className="guest-item-black">
                    <span className="guest-name-black">Ajay James</span>
                    <span className="guest-plus">+5</span>
                    <span className="guest-status staff">Staff</span>
                  </div>
                  <div className="guest-item-black">
                    <span className="guest-name-black">Alan Tudyk</span>
                    <span className="guest-plus">+5</span>
                    <span className="guest-status staff">Staff</span>
                  </div>
                  <div className="guest-item-black">
                    <span className="guest-name-black">Bill O'Reilly</span>
                    <span className="guest-status staff">Staff</span>
                  </div>
                  <div className="guest-item-black">
                    <span className="guest-name-black">Brett Lynch</span>
                    <span className="guest-status vip">VIP</span>
                  </div>
                  <div className="guest-item-black">
                    <span className="guest-name-black">Brett Stimely</span>
                    <span className="guest-plus">+2</span>
                    <span className="guest-status press">Press</span>
                  </div>
                  <div className="guest-item-black">
                    <span className="guest-name-black">Brian Call</span>
                    <span className="guest-plus">+4 (free)</span>
                    <span className="guest-status staff">Staff</span>
                  </div>
                  <div className="guest-item-black">
                    <span className="guest-name-black">Buzz Aldrin</span>
                    <span className="guest-plus">+20 (free)</span>
                    <span className="guest-status vip">VIP</span>
                  </div>
                  <div className="guest-item-black">
                    <span className="guest-name-black">Chris a. Robinson</span>
                    <span className="guest-plus">+2</span>
                    <span className="guest-status vip">VIP</span>
                  </div>
                  <div className="guest-item-black">
                    <span className="guest-name-black">Drew Pillsbury</span>
                    <span className="guest-status press">Press</span>
                  </div>
                  <div className="guest-item-black">
                    <span className="guest-name-black">Dustin Dennard</span>
                    <span className="guest-status press">Press</span>
                  </div>
                  <div className="guest-item-black">
                    <span className="guest-name-black">Frances McDormand</span>
                    <span className="guest-plus">+10 (free)</span>
                    <span className="guest-status press">Press</span>
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
