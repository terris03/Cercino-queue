import React, { useState } from 'react';

const Dashboard = ({ onLogout }) => {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "DISCIPLINE 27-Ⅱ",
      date: "",
      image: null,
      location: "Warehouse 9, Stockholm",
      time: "22:00 - 06:00",
      genre: "Techno / Electronic",
      dressCode: "All Black",
      age: "21+",
      bar: "Full Service",
      parking: "Limited",
      capacity: 500,
      checkedIn: 12,
      remaining: 488,
      totalRevenue: 47500,
      ticketsSold: 95,
      avgPrice: 500
    }
  ]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  
  // Handle scroll to update current event index
  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const containerWidth = e.target.clientWidth;
    const newIndex = Math.round(scrollLeft / containerWidth);
    setCurrentEventIndex(newIndex);
  };
  
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    time: "",
    genre: "",
    dressCode: "",
    age: "",
    bar: "",
    parking: "",
    capacity: "",
    image: null
  });

  const handleImageUpload = (e, eventId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Update the specific event's image
        setEvents(prevEvents => 
          prevEvents.map(event => 
            event.id === eventId 
              ? { ...event, image: event.target.result }
              : event
          )
        );
        console.log('Image uploaded for event:', eventId);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (e, eventId) => {
    // Update the specific event's date
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, date: e.target.value }
          : event
      )
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Add date";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const handleCardClick = (eventId) => {
    console.log('Card clicked for event:', eventId);
    setIsCardExpanded(!isCardExpanded);
  };

  const handleCloseEventInfo = (e) => {
    e.stopPropagation();
    setIsCardExpanded(false);
  };

  const handleCreateEvent = () => {
    setShowCreateForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: events.length + 1,
      title: formData.title,
      date: formData.date,
      image: formData.image,
      location: formData.location,
      time: formData.time,
      genre: formData.genre,
      dressCode: formData.dressCode,
      age: formData.age,
      bar: formData.bar,
      parking: formData.parking,
      capacity: parseInt(formData.capacity) || 500,
      checkedIn: 0,
      remaining: parseInt(formData.capacity) || 500,
      totalRevenue: 0,
      ticketsSold: 0,
      avgPrice: 0
    };
    
    setEvents([...events, newEvent]);
    setCurrentEventIndex(events.length); // Move to the new event
    setShowCreateForm(false);
    setFormData({
      title: "",
      date: "",
      location: "",
      time: "",
      genre: "",
      dressCode: "",
      age: "",
      bar: "",
      parking: "",
      capacity: "",
      image: null
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="cercino-app-screen">
      <div className="cercino-container">
        {/* Create Event Form Modal */}
        {showCreateForm && (
          <div className="form-modal-overlay">
            <div className="form-modal">
              <div className="form-header">
                <h2>Create New Event</h2>
                <button className="form-close" onClick={() => setShowCreateForm(false)}>×</button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="event-form">
                <div className="form-group">
                  <label>Event Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    placeholder="e.g., DISCIPLINE 28-Ⅲ"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    placeholder="e.g., Warehouse 9, Stockholm"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleFormChange}
                    placeholder="e.g., 22:00 - 06:00"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Genre</label>
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleFormChange}
                    placeholder="e.g., Techno / Electronic"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Dress Code</label>
                  <input
                    type="text"
                    name="dressCode"
                    value={formData.dressCode}
                    onChange={handleFormChange}
                    placeholder="e.g., All Black"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Age Limit</label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleFormChange}
                    placeholder="e.g., 21+"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Bar Service</label>
                  <input
                    type="text"
                    name="bar"
                    value={formData.bar}
                    onChange={handleFormChange}
                    placeholder="e.g., Full Service"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Parking</label>
                  <input
                    type="text"
                    name="parking"
                    value={formData.parking}
                    onChange={handleFormChange}
                    placeholder="e.g., Limited"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Capacity</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleFormChange}
                    placeholder="e.g., 500"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Event Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFormImageUpload}
                    className="form-image-input"
                  />
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="form-image-preview" />
                  )}
                </div>
                
                <div className="form-actions">
                  <button type="button" onClick={() => setShowCreateForm(false)} className="form-cancel">
                    Cancel
                  </button>
                  <button type="submit" className="form-submit">
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="cercino-main">
          {/* Horizontal Scrolling Events Container */}
          <div className="events-horizontal-scroll" onScroll={handleScroll}>
            {events.map((event, index) => (
              <div key={event.id} className={`event-container ${index === currentEventIndex ? 'active' : ''}`}>
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
                      <button className="nav-btn" onClick={handleCreateEvent}>Create event</button>
                  <button className="nav-btn">Edit Guest</button>
                  <button className="nav-btn">Import CSV</button>
                  <button className="nav-btn">Export CSV</button>
                </div>
                
                <div className="discipline-artwork">
                  <div className="artwork-content">
                <div 
                  className={`upload-card ${event.image ? 'has-image' : ''} ${isCardExpanded ? 'expanded' : ''}`}
                  onClick={() => handleCardClick(event.id)}
                >
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleImageUpload(e, event.id)}
                    style={{ display: 'none' }}
                    id={`image-upload-${event.id}`}
                  />
                  
                  {/* Event Information Content */}
                  <div className="event-info-content">
                    <div className="event-info-header">
                      <h3 className="event-info-title">{event.title}</h3>
                      <button className="event-info-close" onClick={handleCloseEventInfo}>
                        ×
                      </button>
                    </div>
                    
                    
                    <div className="event-info-details">
                      <div className="event-info-item">
                        <div className="event-info-icon">📅</div>
                        <p className="event-info-text">Date: {formatDate(event.date)}</p>
                      </div>
                      <div className="event-info-item">
                        <div className="event-info-icon">🕐</div>
                        <p className="event-info-text">Time: {event.time}</p>
                      </div>
                      <div className="event-info-item">
                        <div className="event-info-icon">📍</div>
                        <p className="event-info-text">Location: {event.location}</p>
                      </div>
                      <div className="event-info-item">
                        <div className="event-info-icon">🎵</div>
                        <p className="event-info-text">Genre: {event.genre}</p>
                      </div>
                      <div className="event-info-item">
                        <div className="event-info-icon">👔</div>
                        <p className="event-info-text">Dress Code: {event.dressCode}</p>
                      </div>
                      <div className="event-info-item">
                        <div className="event-info-icon">🎫</div>
                        <p className="event-info-text">Age: {event.age}</p>
                      </div>
                      <div className="event-info-item">
                        <div className="event-info-icon">🍻</div>
                        <p className="event-info-text">Bar: {event.bar}</p>
                      </div>
                      <div className="event-info-item">
                        <div className="event-info-icon">🚗</div>
                        <p className="event-info-text">Parking: {event.parking}</p>
                      </div>
                    </div>
                    
                    <div className="event-info-stats">
                      <div className="event-stat">
                        <p className="event-stat-number">{event.checkedIn}</p>
                        <p className="event-stat-label">Checked In</p>
                      </div>
                      <div className="event-stat">
                        <p className="event-stat-number">{event.remaining}</p>
                        <p className="event-stat-label">Remaining</p>
                      </div>
                      <div className="event-stat">
                        <p className="event-stat-number">{((event.checkedIn / event.capacity) * 100).toFixed(1)}%</p>
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
                            {event.totalRevenue.toLocaleString()} kr
                          </span>
                        </div>
                        <div className="sales-item">
                          <span style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px'}}>Tickets Sold:</span>
                          <span style={{color: '#ffffff', fontSize: '20px', fontWeight: '700', marginLeft: '8px'}}>
                            {event.ticketsSold} tickets
                          </span>
                        </div>
                        <div className="sales-item">
                          <span style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px'}}>Avg. Price:</span>
                          <span style={{color: '#ffffff', fontSize: '20px', fontWeight: '700', marginLeft: '8px'}}>
                            {event.avgPrice} kr
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {event.image ? (
                    <div className="uploaded-image-container">
                      <img 
                        src={event.image} 
                        alt="Uploaded artwork" 
                        className="uploaded-image"
                      />
                      <label htmlFor={`image-upload-${event.id}`} className="change-image-button">
                        Change Image
                      </label>
                      <div className="date-overlay" onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById(`date-picker-${event.id}`).showPicker();
                      }}>
                        <input
                          type="date"
                          id={`date-picker-${event.id}`}
                          value={event.date}
                          onChange={(e) => handleDateChange(e, event.id)}
                          className="date-input"
                        />
                        <div className="date-display">
                          {formatDate(event.date)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label htmlFor={`image-upload-${event.id}`} className="upload-button">
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
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
