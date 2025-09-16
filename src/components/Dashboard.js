import React, { useState } from 'react';

const Dashboard = ({ onLogout }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

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
                <div className={`upload-card ${uploadedImage ? 'has-image' : ''}`}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleImageUpload(e)}
                    style={{ display: 'none' }}
                    id="image-upload"
                  />
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
                      <div className="date-overlay" onClick={() => document.getElementById('date-picker').showPicker()}>
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
