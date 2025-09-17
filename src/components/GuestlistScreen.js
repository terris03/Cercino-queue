import React, { useState } from 'react';

const GuestlistScreen = ({ onLogout, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter] = useState('All');
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);
  const [guestForm, setGuestForm] = useState({ name: '', price: '' });
  
  // Sample guest data with state management - all start unchecked
  const [guests, setGuests] = useState([
    { id: 1, name: 'Melvin Edström', price: '100 kr', checkedIn: false },
    { id: 2, name: 'Vilma Lundin', price: '100 kr', checkedIn: false },
    { id: 3, name: 'Julia Rådenfjord', price: '100 kr', checkedIn: false },
    { id: 4, name: 'Elin Karlsson', price: '100 kr', checkedIn: false },
    { id: 5, name: 'Anna Svensson', price: '150 kr', checkedIn: false },
    { id: 6, name: 'Erik Johansson', price: '100 kr', checkedIn: false },
    { id: 7, name: 'Maria Andersson', price: '200 kr', checkedIn: false },
    { id: 8, name: 'Lars Nilsson', price: '100 kr', checkedIn: false },
  ]);

  const totalGuests = guests.length;
  const checkedInCount = guests.filter(guest => guest.checkedIn).length;
  const remainingGuests = totalGuests - checkedInCount;

  const handleCheckIn = (guestId) => {
    console.log('Checking in guest:', guestId);
    setGuests(prevGuests => 
      prevGuests.map(guest => 
        guest.id === guestId 
          ? { ...guest, checkedIn: !guest.checkedIn }
          : guest
      )
    );
  };

  const handleAddGuest = () => {
    setEditingGuest(null);
    setGuestForm({ name: '', price: '' });
    setShowGuestModal(true);
  };

  const handleEditGuest = (guest) => {
    setEditingGuest(guest);
    setGuestForm({ name: guest.name, price: guest.price });
    setShowGuestModal(true);
  };

  const handleSaveGuest = () => {
    if (!guestForm.name.trim() || !guestForm.price.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (editingGuest) {
      // Edit existing guest
      setGuests(prevGuests =>
        prevGuests.map(guest =>
          guest.id === editingGuest.id
            ? { ...guest, name: guestForm.name, price: guestForm.price }
            : guest
        )
      );
    } else {
      // Add new guest
      const newGuest = {
        id: Date.now(), // Simple ID generation
        name: guestForm.name,
        price: guestForm.price,
        checkedIn: false
      };
      setGuests(prevGuests => [...prevGuests, newGuest]);
    }

    setShowGuestModal(false);
    setEditingGuest(null);
    setGuestForm({ name: '', price: '' });
  };

  const handleDeleteGuest = (guestId) => {
    if (window.confirm('Are you sure you want to delete this guest?')) {
      setGuests(prevGuests => prevGuests.filter(guest => guest.id !== guestId));
    }
  };

  const handleCloseModal = () => {
    setShowGuestModal(false);
    setEditingGuest(null);
    setGuestForm({ name: '', price: '' });
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
          <button className="add-guest-btn" onClick={handleAddGuest}>
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
          <div 
            key={guest.id} 
            className="guest-item"
            onDoubleClick={() => handleEditGuest(guest)}
            title="Double-click to edit guest"
          >
            <div className="guest-info">
              <span className="guest-name">{guest.name}</span>
              <span className="guest-price">{guest.price}</span>
            </div>
            <div className="guest-actions">
              <button 
                className="delete-btn"
                onClick={() => handleDeleteGuest(guest.id)}
                title="Delete Guest"
              >
                <i className="fas fa-trash"></i>
              </button>
              <button 
                className={`checkin-btn ${guest.checkedIn ? 'checked' : ''}`}
                onClick={() => handleCheckIn(guest.id)}
              >
                <i className="fas fa-check"></i>
                {guest.checkedIn ? 'Checked' : 'Check In'}
              </button>
            </div>
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

      {/* Guest Modal */}
      {showGuestModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingGuest ? 'Edit Guest' : 'Add New Guest'}</h3>
              <div className="modal-header-actions">
                {editingGuest && (
                  <button 
                    className="delete-guest-btn"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this guest?')) {
                        handleDeleteGuest(editingGuest.id);
                        handleCloseModal();
                      }
                    }}
                    title="Delete Guest"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                )}
                <button className="close-btn" onClick={handleCloseModal}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="guestName">Guest Name</label>
                <input
                  id="guestName"
                  type="text"
                  value={guestForm.name}
                  onChange={(e) => setGuestForm({ ...guestForm, name: e.target.value })}
                  placeholder="Enter guest name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="guestPrice">Price</label>
                <input
                  id="guestPrice"
                  type="text"
                  value={guestForm.price}
                  onChange={(e) => setGuestForm({ ...guestForm, price: e.target.value })}
                  placeholder="e.g., 100 kr"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveGuest}>
                {editingGuest ? 'Update Guest' : 'Add Guest'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestlistScreen;
