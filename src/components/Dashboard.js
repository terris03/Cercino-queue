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
          {/* Horizontal Event Scroller */}
          <div className="events-scroller">
            <div className="scroller-container">
              <div className="event-card-large">
                <div className="event-card-image-large">
                  <div className="retro-artwork">
                    <div className="afro-woman">👩🏿‍🦱</div>
                    <div className="abstract-shapes">
                      <div className="shape shape-1"></div>
                      <div className="shape shape-2"></div>
                      <div className="shape shape-3"></div>
                    </div>
                  </div>
                </div>
                <div className="event-card-content-large">
                  <h4 className="event-card-title-large">Young Pulse</h4>
                  <div className="event-card-info-large">
                    <span className="event-card-time-large">Tonight | 10:00 PM</span>
                    <span className="event-card-venue-large">Club XYZ</span>
                  </div>
                </div>
              </div>

              <div className="event-card-large">
                <div className="event-card-image-large">
                  <div className="retro-artwork">
                    <div className="afro-woman">👩🏿‍🦱</div>
                    <div className="abstract-shapes">
                      <div className="shape shape-1"></div>
                      <div className="shape shape-2"></div>
                      <div className="shape shape-3"></div>
                    </div>
                  </div>
                </div>
                <div className="event-card-content-large">
                  <h4 className="event-card-title-large">Summer Vibes</h4>
                  <div className="event-card-info-large">
                    <span className="event-card-time-large">Tonight | 11:00 PM</span>
                    <span className="event-card-venue-large">Beach Club</span>
                  </div>
                </div>
              </div>

              <div className="event-card-large">
                <div className="event-card-image-large">
                  <div className="retro-artwork">
                    <div className="afro-woman">👩🏿‍🦱</div>
                    <div className="abstract-shapes">
                      <div className="shape shape-1"></div>
                      <div className="shape shape-2"></div>
                      <div className="shape shape-3"></div>
                    </div>
                  </div>
                </div>
                <div className="event-card-content-large">
                  <h4 className="event-card-title-large">Night Fever</h4>
                  <div className="event-card-info-large">
                    <span className="event-card-time-large">Tomorrow | 9:00 PM</span>
                    <span className="event-card-venue-large">Studio 54</span>
                  </div>
                </div>
              </div>

              <div className="event-card-large">
                <div className="event-card-image-large">
                  <div className="retro-artwork">
                    <div className="afro-woman">👩🏿‍🦱</div>
                    <div className="abstract-shapes">
                      <div className="shape shape-1"></div>
                      <div className="shape shape-2"></div>
                      <div className="shape shape-3"></div>
                    </div>
                  </div>
                </div>
                <div className="event-card-content-large">
                  <h4 className="event-card-title-large">Electric Dreams</h4>
                  <div className="event-card-info-large">
                    <span className="event-card-time-large">Friday | 8:00 PM</span>
                    <span className="event-card-venue-large">Warehouse</span>
                  </div>
                </div>
              </div>

              <div className="event-card-large">
                <div className="event-card-image-large">
                  <div className="retro-artwork">
                    <div className="afro-woman">👩🏿‍🦱</div>
                    <div className="abstract-shapes">
                      <div className="shape shape-1"></div>
                      <div className="shape shape-2"></div>
                      <div className="shape shape-3"></div>
                    </div>
                  </div>
                </div>
                <div className="event-card-content-large">
                  <h4 className="event-card-title-large">Urban Beat</h4>
                  <div className="event-card-info-large">
                    <span className="event-card-time-large">Saturday | 7:00 PM</span>
                    <span className="event-card-venue-large">Rooftop</span>
                  </div>
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
