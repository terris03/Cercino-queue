import React, { useState, useRef, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const Guestlist = () => {
  const [guests, setGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filteredGuests, setFilteredGuests] = useState([]);
  const fileInputRef = useRef(null);

  // Load guests from Firebase on component mount
  useEffect(() => {
    loadGuests();
  }, []);

  // Filter guests based on search term
  useEffect(() => {
    const filtered = guests.filter(guest =>
      guest.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.secondName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGuests(filtered);
  }, [guests, searchTerm]);

  const loadGuests = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'guests'));
      const guestsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGuests(guestsData);
    } catch (error) {
      console.error('Error loading guests:', error);
    }
  };

  const handleImportCSV = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const lines = text.split('\n');
      
      const newGuests = [];
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          const values = lines[i].split(',').map(v => v.trim());
          if (values.length >= 3) {
            const guest = {
              firstName: values[0] || '',
              secondName: values[1] || '',
              price: values[2] || '0',
              checkedIn: false,
              timestamp: new Date()
            };
            newGuests.push(guest);
          }
        }
      }

      // Add guests to Firebase
      try {
        for (const guest of newGuests) {
          await addDoc(collection(db, 'guests'), guest);
        }
        await loadGuests(); // Reload the guest list
        alert(`Successfully imported ${newGuests.length} guests!`);
      } catch (error) {
        console.error('Error importing guests:', error);
        alert('Error importing guests. Please try again.');
      }
    };
    reader.readAsText(file);
  };

  const handleExportCSV = () => {
    const csvContent = [
      'First Name,Second Name,Price,Checked In',
      ...guests.map(guest => 
        `${guest.firstName},${guest.secondName},${guest.price},${guest.checkedIn ? 'Yes' : 'No'}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guestlist-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleCheckIn = async (guestId) => {
    try {
      const guestRef = doc(db, 'guests', guestId);
      await updateDoc(guestRef, {
        checkedIn: true,
        checkInTime: new Date()
      });
      await loadGuests(); // Reload the guest list
    } catch (error) {
      console.error('Error updating guest:', error);
    }
  };

  const checkedInCount = guests.filter(guest => guest.checkedIn).length;
  const nonCheckedCount = guests.filter(guest => !guest.checkedIn).length;

  return (
    <div className="guestlist-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          {/* Profile Icon */}
          <div className="profile-icon">
            <i className="fas fa-user-circle"></i>
          </div>
          
          {/* Search Bar */}
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Find your lamp..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search search-icon"></i>
          </div>
          
          {/* Filter Button */}
          <div className="filter-container">
            <button 
              className="filter-btn" 
              onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
            >
              <i className="fas fa-filter"></i>
            </button>
            {/* Filter Dropdown */}
            <div className={`filter-dropdown ${filterDropdownOpen ? 'active' : ''}`}>
              <div className="filter-item">Filter by Status</div>
              <div className="filter-item">Filter by Price</div>
              <div className="filter-item">Filter by Name</div>
              <div className="filter-item">Clear Filters</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Import/Export Buttons */}
        <div className="action-buttons">
          <button className="btn btn-primary" onClick={handleImportCSV}>
            <i className="fas fa-upload"></i>
            Import CSV
          </button>
          <button className="btn btn-secondary" onClick={handleExportCSV}>
            <i className="fas fa-download"></i>
            Export CSV
          </button>
        </div>

        {/* Check-in Statistics Cards */}
        <div className="stats-cards">
          <div className="stats-card">
            <div className="stats-label">Checked in:</div>
            <div className="stats-count">{checkedInCount}</div>
          </div>
          <div className="stats-card">
            <div className="stats-label">Non-checked:</div>
            <div className="stats-count">{nonCheckedCount}</div>
          </div>
        </div>

        {/* Guest List */}
        <div className="guest-list-container">
          <div className="guest-list-header">
            <div className="column">First Name</div>
            <div className="column">Price</div>
            <div className="column">Action</div>
          </div>
          <div className="guest-list">
            {filteredGuests.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>
                {guests.length === 0 ? 'No guests imported yet. Click "Import CSV" to get started!' : 'No guests match your search criteria.'}
              </div>
            ) : (
              filteredGuests.map(guest => (
                <div key={guest.id} className="guest-item">
                  <div className="guest-first-name">{guest.firstName}</div>
                  <div className="guest-price">€{guest.price}</div>
                  <button 
                    className={`checkin-btn ${guest.checkedIn ? 'checked' : ''}`}
                    onClick={() => !guest.checkedIn && handleCheckIn(guest.id)}
                    disabled={guest.checkedIn}
                  >
                    {guest.checkedIn ? 'Checked In' : 'Check In'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Hidden File Input for CSV Import */}
      <input 
        type="file" 
        ref={fileInputRef}
        accept=".csv" 
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default Guestlist;