import React, { useState } from 'react';

const Dashboard = ({ onLogout }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        console.log('Image uploaded:', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Add date";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const handleCardClick = () => {
    console.log('Card clicked! Current expanded state:', isCardExpanded);
    setIsCardExpanded(!isCardExpanded);
    console.log('New expanded state:', !isCardExpanded);
  };

  const handleCloseEventInfo = (e) => {
    e.stopPropagation();
    setIsCardExpanded(false);
  };

  return (
    <div className="cercino-app-screen">
      <div className="cercino-container">
        {/* Main Content */}
        <main className="cercino-main">
              {/* DISCIPLINE Artwork Section */}
              <div className="discipline-section">
                {/* Search and Filter */}
                <div className="search-filter-section">
                  <input 
                    type="text" 
                    placeholder="Search guests..." 
                    className="search-input"
                  />
                  <button className="filter-btn">
                    <i className="fas fa-filter"></i>
                  </button>
                </div>
                
                {/* Navigation Buttons Over Card */}
                <div className="buttons-over-card">
                  <button className="nav-btn">Create event</button>
                  <button className="nav-btn">Edit Guest</button>
                  <button className="nav-btn">Import CSV</button>
                  <button className="nav-btn">Export CSV</button>
                </div>
                
                <div className="discipline-artwork">
                  <div className="artwork-content">
                <div 
                  className={`upload-card ${uploadedImage ? 'has-image' : ''} ${isCardExpanded ? 'expanded' : ''}`}
                  onClick={handleCardClick}
                >
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleImageUpload(e)}
                    style={{ display: 'none' }}
                    id="image-upload"
                  />
                  
                  {/* Event Information Content */}
                  <div className="event-info-content">
                    <div className="event-info-header">
                      <h3 className="event-info-title">DISCIPLINE 27-Ⅱ</h3>
                      <button className="event-info-close" onClick={handleCloseEventInfo}>
                        ×
                      </button>
                    </div>
                    
                    
                    <div className="event-info-details">
                      <div className="event-info-item">
                        <div className="event-info-icon">📅</div>
                        <p className="event-info-text">Date: {formatDate(selectedDate)}</p>
                      </div>
                      <div className="event-info-item">
                        <div className="event-info-icon">🕐</div>
                        <p className="event-info-text">Time: 22:00 - 06:00</p>
                      </div>
                      <div className="event-info-item">
                        <div className="event-info-icon">📍</div>
                        <p className="event-info-text">Location: Warehouse 9, Stockholm</p>
                      </div>
                      <div className="event-info-item">
                        <div className="event-info-icon">🎵</div>
                        <p className="event-info-text">Genre: Techno / Electronic</p>
                      </div>
                      <div className="event-info-item">
                        <div className="event-info-icon">👔</div>
                        <p className="event-info-text">Dress Code: All Black</p>
                      </div>
                      <div className="event-info-item">
                        <div className="event-info-icon">🎫</div>
                        <p className="event-info-text">Age: 21+</p>
                      </div>
                      <div className="event-info-item">
                        <div className="event-info-icon">🍻</div>
                        <p className="event-info-text">Bar: Full Service</p>
                      </div>
                      <div className="event-info-item">
                        <div className="event-info-icon">🚗</div>
                        <p className="event-info-text">Parking: Limited</p>
                      </div>
                    </div>
                    
                    <div className="event-info-stats">
                      <div className="event-stat">
                        <p className="event-stat-number">12</p>
                        <p className="event-stat-label">Checked In</p>
                      </div>
                      <div className="event-stat">
                        <p className="event-stat-number">488</p>
                        <p className="event-stat-label">Remaining</p>
                      </div>
                      <div className="event-stat">
                        <p className="event-stat-number">2.4%</p>
                        <p className="event-stat-label">Capacity</p>
                      </div>
                    </div>
                    
                    <div className="event-sales-info">
                      <div className="sales-header">
                        <h4 style={{color: '#ffffff', fontSize: '18px', fontWeight: '600', margin: '0 0 12px 0', textAlign: 'center'}}>
                          💰 Sales Summary
                        </h4>
                      </div>
                      <div className="sales-stats">
                        <div className="sales-item">
                          <span style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px'}}>Total Revenue:</span>
                          <span style={{color: '#ffffff', fontSize: '20px', fontWeight: '700', marginLeft: '8px'}}>
                            47,500 kr
                          </span>
                        </div>
                        <div className="sales-item">
                          <span style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px'}}>Tickets Sold:</span>
                          <span style={{color: '#ffffff', fontSize: '20px', fontWeight: '700', marginLeft: '8px'}}>
                            95 tickets
                          </span>
                        </div>
                        <div className="sales-item">
                          <span style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px'}}>Avg. Price:</span>
                          <span style={{color: '#ffffff', fontSize: '20px', fontWeight: '700', marginLeft: '8px'}}>
                            500 kr
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {uploadedImage ? (
                    <div className="uploaded-image-container">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded artwork" 
                        className="uploaded-image"
                      />
                      <label htmlFor="image-upload" className="change-image-button">
                        Change Image
                      </label>
                      <div className="date-overlay" onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById('date-picker').showPicker();
                      }}>
                        <input
                          type="date"
                          id="date-picker"
                          value={selectedDate}
                          onChange={handleDateChange}
                          className="date-input"
                        />
                        <div className="date-display">
                          {formatDate(selectedDate)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label htmlFor="image-upload" className="upload-button">
                      <div className="upload-plus">+</div>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

              {/* Glass Effect Guest List */}
              <div className="glass-guest-list-container">
                <div className="glass-guest-list">
                  <div className="guest-item-glass">
                    <span className="guest-name-glass">Aaron Garrido</span>
                    <button className="checkin-btn">Check In</button>
                  </div>
                  <div className="guest-item-glass">
                    <span className="guest-name-glass">Ajay James</span>
                    <span className="guest-plus-glass">+5</span>
                    <button className="checkin-btn">Check In</button>
                  </div>
                  <div className="guest-item-glass">
                    <span className="guest-name-glass">Alan Tudyk</span>
                    <span className="guest-plus-glass">+5</span>
                    <button className="checkin-btn">Check In</button>
                  </div>
                  <div className="guest-item-glass">
                    <span className="guest-name-glass">Bill O'Reilly</span>
                    <button className="checkin-btn">Check In</button>
                  </div>
                  <div className="guest-item-glass">
                    <span className="guest-name-glass">Brett Lynch</span>
                    <button className="checkin-btn">Check In</button>
                  </div>
                  <div className="guest-item-glass">
                    <span className="guest-name-glass">Brett Stimely</span>
                    <span className="guest-plus-glass">+2</span>
                    <button className="checkin-btn">Check In</button>
                  </div>
                  <div className="guest-item-glass">
                    <span className="guest-name-glass">Brian Call</span>
                    <span className="guest-plus-glass">+4 (free)</span>
                    <button className="checkin-btn">Check In</button>
                  </div>
                  <div className="guest-item-glass">
                    <span className="guest-name-glass">Buzz Aldrin</span>
                    <span className="guest-plus-glass">+20 (free)</span>
                    <button className="checkin-btn">Check In</button>
                  </div>
                  <div className="guest-item-glass">
                    <span className="guest-name-glass">Chris a. Robinson</span>
                    <span className="guest-plus-glass">+2</span>
                    <button className="checkin-btn">Check In</button>
                  </div>
                  <div className="guest-item-glass">
                    <span className="guest-name-glass">Drew Pillsbury</span>
                    <button className="checkin-btn">Check In</button>
                  </div>
                  <div className="guest-item-glass">
                    <span className="guest-name-glass">Dustin Dennard</span>
                    <button className="checkin-btn">Check In</button>
                  </div>
                  <div className="guest-item-glass">
                    <span className="guest-name-glass">Frances McDormand</span>
                    <span className="guest-plus-glass">+10 (free)</span>
                    <button className="checkin-btn">Check In</button>
                  </div>
                </div>
              </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
