import React, { useState } from 'react';

const GuestlistScreen = ({ onLogout, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter] = useState('All');
  
  // Sample guest data with state management
  const [guests, setGuests] = useState([
    { id: 1, name: 'Melvin Edström', price: '100 kr', checkedIn: false },
    { id: 2, name: 'Vilma Lundin', price: '100 kr', checkedIn: false },
    { id: 3, name: 'Julia Rådenfjord', price: '100 kr', checkedIn: false },
    { id: 4, name: 'Elin Karlsson', price: '100 kr', checkedIn: false },
    { id: 5, name: 'Anna Svensson', price: '150 kr', checkedIn: true },
    { id: 6, name: 'Erik Johansson', price: '100 kr', checkedIn: false },
    { id: 7, name: 'Maria Andersson', price: '200 kr', checkedIn: true },
    { id: 8, name: 'Lars Nilsson', price: '100 kr', checkedIn: false },
  ]);

  const totalGuests = guests.length;
  const checkedInCount = guests.filter(guest => guest.checkedIn).length;
  const remainingGuests = totalGuests - checkedInCount;

  const handleCheckIn = (guestId) => {
    setGuests(prevGuests => 
      prevGuests.map(guest => 
        guest.id === guestId 
          ? { ...guest, checkedIn: !guest.checkedIn }
          : guest
      )
    );
  };

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="guestlist-screen">
      {/* Fixed Header */}
      <div className="guestlist-header">
        <div className="header-left">
          <h1 className="event-title">CERCINO x PartyHBG</h1>
          <div className="checkin-stats">
            <span className="checked-in">Checked In</span>
            <span className="remaining">Remaining</span>
          </div>
          <div className="checkin-numbers">
            <span className="checked-count">{checkedInCount}</span>
            <span className="total-count">/{totalGuests}</span>
            <span className="remaining-count">{remainingGuests}</span>
          </div>
        </div>
      </div>

      {/* Fixed Controls */}
      <div className="guestlist-controls">
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="Search guests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="filter-btn">
            <i className="fas fa-filter"></i>
            <span>{filter}</span>
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>
        
        <div className="action-buttons">
          <button className="add-guest-btn">
            <i className="fas fa-plus"></i>
            Add / Edit Guest
          </button>
          <button className="import-csv-btn">
            <i className="fas fa-upload"></i>
            Import CSV
          </button>
        </div>
      </div>

      {/* Scrollable Guest List */}
      <div className="guest-list">
        {filteredGuests.map(guest => (
          <div key={guest.id} className="guest-item">
            <div className="guest-info">
              <span className="guest-name">{guest.name}</span>
              <span className="guest-price">{guest.price}</span>
            </div>
            <button 
              className={`checkin-btn ${guest.checkedIn ? 'checked' : ''}`}
              onClick={() => handleCheckIn(guest.id)}
              disabled={guest.checkedIn}
            >
              <i className="fas fa-check"></i>
              {guest.checkedIn ? 'Checked' : 'Check In'}
            </button>
          </div>
        ))}
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="bottom-navigation">
        <div className="nav-item active" onClick={() => onNavigate('guestlist')}>
          <i className="fas fa-users"></i>
          <span>Guests</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate('statistics')}>
          <i className="fas fa-chart-bar"></i>
          <span>Stats</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate('profile')}>
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default GuestlistScreen;
