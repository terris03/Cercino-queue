import React from 'react';

const Dashboard = ({ onLogout }) => {
  return (
    <div className="cercino-app-screen">
      <div className="cercino-container">
        {/* CERCINO Header */}
        <header className="cercino-header">
          <h1 className="cercino-title">CERCINO</h1>
          
          {/* Navigation Buttons */}
          <div className="cercino-nav-buttons">
            <button className="nav-btn">Create event</button>
            <button className="nav-btn">Edit Guest</button>
            <button className="nav-btn">Import CSV</button>
            <button className="nav-btn">Export CSV</button>
          </div>
        </header>

        {/* Main Content */}
        <main className="cercino-main">
          {/* DISCIPLINE Artwork Section */}
          <div className="discipline-section">
            <div className="discipline-artwork">
              <div className="discipline-title">DISCIPLINE 27-Ⅱ</div>
              <div className="artwork-content">
                <div className="psychedelic-art">
                  <div className="figure-left">👤</div>
                  <div className="figure-center">👩🏿‍🦱</div>
                  <div className="figure-right">🪐</div>
                </div>
              </div>
            </div>
          </div>

          {/* Glass Effect Guest List */}
          <div className="glass-guest-list-container">
            <div className="glass-guest-list">
              <div className="guest-item-glass">
                <span className="guest-name-glass">Aaron Garrido</span>
                <span className="guest-status-glass vip">VIP</span>
              </div>
              <div className="guest-item-glass">
                <span className="guest-name-glass">Ajay James</span>
                <span className="guest-plus-glass">+5</span>
                <span className="guest-status-glass staff">Staff</span>
              </div>
              <div className="guest-item-glass">
                <span className="guest-name-glass">Alan Tudyk</span>
                <span className="guest-plus-glass">+5</span>
                <span className="guest-status-glass staff">Staff</span>
              </div>
              <div className="guest-item-glass">
                <span className="guest-name-glass">Bill O'Reilly</span>
                <span className="guest-status-glass staff">Staff</span>
              </div>
              <div className="guest-item-glass">
                <span className="guest-name-glass">Brett Lynch</span>
                <span className="guest-status-glass vip">VIP</span>
              </div>
              <div className="guest-item-glass">
                <span className="guest-name-glass">Brett Stimely</span>
                <span className="guest-plus-glass">+2</span>
                <span className="guest-status-glass press">Press</span>
              </div>
              <div className="guest-item-glass">
                <span className="guest-name-glass">Brian Call</span>
                <span className="guest-plus-glass">+4 (free)</span>
                <span className="guest-status-glass staff">Staff</span>
              </div>
              <div className="guest-item-glass">
                <span className="guest-name-glass">Buzz Aldrin</span>
                <span className="guest-plus-glass">+20 (free)</span>
                <span className="guest-status-glass vip">VIP</span>
              </div>
              <div className="guest-item-glass">
                <span className="guest-name-glass">Chris a. Robinson</span>
                <span className="guest-plus-glass">+2</span>
                <span className="guest-status-glass vip">VIP</span>
              </div>
              <div className="guest-item-glass">
                <span className="guest-name-glass">Drew Pillsbury</span>
                <span className="guest-status-glass press">Press</span>
              </div>
              <div className="guest-item-glass">
                <span className="guest-name-glass">Dustin Dennard</span>
                <span className="guest-status-glass press">Press</span>
              </div>
              <div className="guest-item-glass">
                <span className="guest-name-glass">Frances McDormand</span>
                <span className="guest-plus-glass">+10 (free)</span>
                <span className="guest-status-glass press">Press</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
