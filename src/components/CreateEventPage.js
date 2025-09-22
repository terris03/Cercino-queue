import React, { useState, useEffect } from 'react';

const CreateEventPage = ({ onBackToLanding }) => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: 100,
    theme: 'dark',
    colors: {
      primary: '#007AFF',
      secondary: '#5856D6',
      accent: '#FF9500'
    },
    logo: '',
    backgroundImage: ''
  });

  const [previewMode, setPreviewMode] = useState('desktop'); // desktop, tablet, mobile
  const [activeTab, setActiveTab] = useState('details'); // details, design, preview

  const handleInputChange = (field, value) => {
    setEventData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleColorChange = (colorType, value) => {
    setEventData(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorType]: value
      }
    }));
  };

  const generateEventCode = () => {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const handleCreateEvent = () => {
    const eventCode = generateEventCode();
    console.log('Creating event:', { ...eventData, code: eventCode });
    // Here you would save to Firebase and redirect to the event
    alert(`Event created! Your event code is: ${eventCode}`);
  };

  return (
    <div className="create-event-page">
      {/* Header */}
      <header className="create-header">
        <div className="create-header-container">
          <button className="back-btn" onClick={onBackToLanding}>
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </button>
          <h1 className="create-title">Create Your Event</h1>
          <div className="preview-controls">
            <div className="device-selector">
              <button 
                className={`device-btn ${previewMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setPreviewMode('desktop')}
              >
                <i className="fas fa-desktop"></i>
              </button>
              <button 
                className={`device-btn ${previewMode === 'tablet' ? 'active' : ''}`}
                onClick={() => setPreviewMode('tablet')}
              >
                <i className="fas fa-tablet-alt"></i>
              </button>
              <button 
                className={`device-btn ${previewMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setPreviewMode('mobile')}
              >
                <i className="fas fa-mobile-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="create-content">
        {/* Left Panel - Form */}
        <div className="create-form-panel">
          <div className="form-tabs">
            <button 
              className={`form-tab ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Event Details
            </button>
            <button 
              className={`form-tab ${activeTab === 'design' ? 'active' : ''}`}
              onClick={() => setActiveTab('design')}
            >
              Design
            </button>
            <button 
              className={`form-tab ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
          </div>

          <div className="form-content">
            {activeTab === 'details' && (
              <div className="details-form">
                <div className="form-group">
                  <label>Event Name</label>
                  <input
                    type="text"
                    value={eventData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter event name"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={eventData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your event"
                    rows="4"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={eventData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Time</label>
                    <input
                      type="time"
                      value={eventData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={eventData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Venue name and address"
                  />
                </div>

                <div className="form-group">
                  <label>Capacity</label>
                  <input
                    type="number"
                    value={eventData.capacity}
                    onChange={(e) => handleInputChange('capacity', parseInt(e.target.value))}
                    min="1"
                    max="10000"
                  />
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="design-form">
                <div className="form-group">
                  <label>Theme</label>
                  <div className="theme-selector">
                    <button 
                      className={`theme-btn ${eventData.theme === 'dark' ? 'active' : ''}`}
                      onClick={() => handleInputChange('theme', 'dark')}
                    >
                      Dark
                    </button>
                    <button 
                      className={`theme-btn ${eventData.theme === 'light' ? 'active' : ''}`}
                      onClick={() => handleInputChange('theme', 'light')}
                    >
                      Light
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Primary Color</label>
                  <div className="color-input-group">
                    <input
                      type="color"
                      value={eventData.colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                    />
                    <input
                      type="text"
                      value={eventData.colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Secondary Color</label>
                  <div className="color-input-group">
                    <input
                      type="color"
                      value={eventData.colors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                    />
                    <input
                      type="text"
                      value={eventData.colors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Accent Color</label>
                  <div className="color-input-group">
                    <input
                      type="color"
                      value={eventData.colors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                    />
                    <input
                      type="text"
                      value={eventData.colors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Event Logo URL</label>
                  <input
                    type="url"
                    value={eventData.logo}
                    onChange={(e) => handleInputChange('logo', e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div className="form-group">
                  <label>Background Image URL</label>
                  <input
                    type="url"
                    value={eventData.backgroundImage}
                    onChange={(e) => handleInputChange('backgroundImage', e.target.value)}
                    placeholder="https://example.com/background.jpg"
                  />
                </div>
              </div>
            )}

            {activeTab === 'preview' && (
              <div className="preview-form">
                <div className="preview-info">
                  <h3>Event Preview</h3>
                  <p>Your event is ready! Review the preview and create your event.</p>
                  
                  <div className="preview-stats">
                    <div className="preview-stat">
                      <span className="stat-label">Event Code</span>
                      <span className="stat-value">{generateEventCode()}</span>
                    </div>
                    <div className="preview-stat">
                      <span className="stat-label">Capacity</span>
                      <span className="stat-value">{eventData.capacity}</span>
                    </div>
                    <div className="preview-stat">
                      <span className="stat-label">Theme</span>
                      <span className="stat-value">{eventData.theme}</span>
                    </div>
                  </div>

                  <button className="create-event-btn" onClick={handleCreateEvent}>
                    <i className="fas fa-plus"></i>
                    Create Event
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="create-preview-panel">
          <div className="preview-container">
            <div className={`preview-device ${previewMode}`}>
              <div className="device-frame">
                <div className="device-screen">
                  <div className="preview-content">
                    {/* Mock Guest List Preview */}
                    <div className="preview-header">
                      <div className="preview-event-info">
                        <h2 className="preview-event-name">
                          {eventData.name || 'Your Event Name'}
                        </h2>
                        <p className="preview-event-details">
                          {eventData.date && eventData.time && `${eventData.date} at ${eventData.time}`}
                          {eventData.location && ` • ${eventData.location}`}
                        </p>
                      </div>
                      <div className="preview-stats">
                        <div className="preview-stat-item">
                          <span className="preview-stat-number">0</span>
                          <span className="preview-stat-label">Checked In</span>
                        </div>
                        <div className="preview-stat-item">
                          <span className="preview-stat-number">{eventData.capacity}</span>
                          <span className="preview-stat-label">Total</span>
                        </div>
                      </div>
                    </div>

                    <div className="preview-guest-list">
                      <div className="preview-search-bar">
                        <input type="text" placeholder="Search guests..." />
                      </div>
                      
                      <div className="preview-guests">
                        <div className="preview-guest-item">
                          <div className="preview-guest-info">
                            <span className="preview-guest-name">John Doe</span>
                            <span className="preview-guest-status">Not checked in</span>
                          </div>
                          <button className="preview-checkin-btn">Check In</button>
                        </div>
                        
                        <div className="preview-guest-item checked">
                          <div className="preview-guest-info">
                            <span className="preview-guest-name">Jane Smith</span>
                            <span className="preview-guest-status">Checked in at 19:30</span>
                          </div>
                          <button className="preview-checkin-btn checked">✓</button>
                        </div>
                        
                        <div className="preview-guest-item">
                          <div className="preview-guest-info">
                            <span className="preview-guest-name">Mike Johnson</span>
                            <span className="preview-guest-status">Not checked in</span>
                          </div>
                          <button className="preview-checkin-btn">Check In</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;

