import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { loadGuests, addGuest, updateGuest, deleteGuest, addGuestsBatch } from '../utils/localStorage';

const GuestlistScreen = ({ onLogout, onNavigate, roomCode = '123' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter] = useState('All');
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);
  const [guestForm, setGuestForm] = useState({ name: '', price: '' });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef(null);

  // Load guests with Firebase real-time sync and detailed logging
  useEffect(() => {
    console.log('🔄 Loading guests for roomCode:', roomCode);
    
    // Load from localStorage immediately for instant display
    const localGuests = loadGuests().filter(guest => guest.roomCode === roomCode);
    console.log('💾 Loaded from localStorage instantly:', localGuests.length, 'guests');
    setGuests(localGuests);
    setLoading(false);
    
    // Set up Firebase real-time listener with detailed logging
    try {
      console.log('🔥 Setting up Firebase connection...');
      console.log('🔥 Database object:', db);
      
      const guestsRef = collection(db, 'guests');
      console.log('🔥 Guests collection reference:', guestsRef);
      
      const q = query(guestsRef, where('roomCode', '==', roomCode));
      console.log('🔥 Query created:', q);
      
      console.log('🔥 Setting up onSnapshot listener...');
      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log('🔥 Firebase real-time update received!');
        console.log('🔥 Snapshot metadata:', snapshot.metadata);
        console.log('🔥 Snapshot size:', snapshot.size);
        console.log('🔥 Snapshot empty:', snapshot.empty);
        
        const firebaseGuests = [];
        snapshot.forEach((doc) => {
          console.log('🔥 Document ID:', doc.id);
          console.log('🔥 Document data:', doc.data());
          firebaseGuests.push({ id: doc.id, ...doc.data() });
        });
        
        console.log('🔥 Firebase guests count:', firebaseGuests.length);
        console.log('🔥 Firebase guests data:', firebaseGuests);
        
        // Update state with Firebase data
        setGuests(firebaseGuests);
        
        // Also update localStorage with Firebase data
        const allGuests = loadGuests();
        const otherRoomGuests = allGuests.filter(g => g.roomCode !== roomCode);
        const updatedGuests = [...otherRoomGuests, ...firebaseGuests];
        localStorage.setItem('cercino-guests', JSON.stringify(updatedGuests));
        console.log('💾 Updated localStorage with Firebase data');
        
      }, (error) => {
        console.error('🔥 Firebase onSnapshot ERROR:', error);
        console.error('🔥 Error code:', error.code);
        console.error('🔥 Error message:', error.message);
        console.error('🔥 Error details:', error.details);
        // Keep using localStorage data if Firebase fails
      });

      console.log('🔥 Firebase listener set up successfully');
      return () => {
        console.log('🔥 Unsubscribing from Firebase listener');
        unsubscribe();
      };
    } catch (error) {
      console.error('🔥 Firebase setup ERROR:', error);
      console.error('🔥 Setup error details:', error.message);
      // Keep using localStorage data
    }
  }, [roomCode]);

  const totalGuests = guests.length;
  const checkedInCount = guests.filter(guest => guest.checkedIn).length;
  const remainingGuests = totalGuests - checkedInCount;

  const handleCheckIn = async (guestId) => {
    try {
      const guest = guests.find(g => g.id === guestId);
      if (!guest) {
        console.error('Guest not found:', guestId);
        return;
      }
      
      console.log('🔥 Attempting to update guest check-in in Firebase...');
      console.log('🔥 Guest ID:', guestId);
      console.log('🔥 Guest data:', guest);
      console.log('🔥 New checked-in status:', !guest.checkedIn);
      
      // Update in Firebase for real-time sync
      try {
        const guestRef = doc(db, 'guests', guestId);
        console.log('🔥 Document reference:', guestRef);
        
        const updateData = {
          checkedIn: !guest.checkedIn,
          lastUpdated: new Date()
        };
        console.log('🔥 Update data:', updateData);
        
        await updateDoc(guestRef, updateData);
        console.log('✅ Guest check-in updated in Firebase successfully!');
        console.log('✅ Guest:', guest.name, 'New status:', !guest.checkedIn);
      } catch (firebaseError) {
        console.error('🔥 Firebase update FAILED:', firebaseError);
        console.error('🔥 Firebase error code:', firebaseError.code);
        console.error('🔥 Firebase error message:', firebaseError.message);
        console.error('🔥 Firebase error details:', firebaseError.details);
        console.error('🔥 Full Firebase error object:', firebaseError);
        
        // Fallback to localStorage
        console.log('💾 Falling back to localStorage...');
        const updatedGuest = updateGuest(guestId, {
          checkedIn: !guest.checkedIn
        });
        
        if (updatedGuest) {
          setGuests(prevGuests => 
            prevGuests.map(g => g.id === guestId ? updatedGuest : g)
          );
          console.log('💾 Guest check-in updated in localStorage:', updatedGuest.name, updatedGuest.checkedIn);
        }
      }
    } catch (error) {
      console.error('Error checking in guest:', error);
      alert('Error updating guest. Please try again.');
    }
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

    try {
      let updatedGuests = [];
      
      if (editingGuest) {
        // Edit existing guest
        const updatedGuest = {
          ...editingGuest,
          name: guestForm.name.trim(),
          price: guestForm.price.trim(),
          lastUpdated: new Date()
        };
        
        updatedGuests = guests.map(g => g.id === editingGuest.id ? updatedGuest : g);
        setGuests(updatedGuests);
        console.log('Guest updated:', updatedGuest.name);
      } else {
        // Add new guest
        const newGuest = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: guestForm.name.trim(),
          price: guestForm.price.trim(),
          checkedIn: false,
          roomCode: roomCode,
          createdAt: new Date(),
          lastUpdated: new Date()
        };
        
        updatedGuests = [...guests, newGuest];
        setGuests(updatedGuests);
        console.log('Guest added:', newGuest.name);
      }

      // Save to shared storage
      const sharedData = {
        guests: updatedGuests,
        password: "1515",
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem('cercino-guests-shared', JSON.stringify(sharedData));

      setShowGuestModal(false);
      setEditingGuest(null);
      setGuestForm({ name: '', price: '' });
    } catch (error) {
      console.error('Error saving guest:', error);
      alert('Error saving guest. Please try again.');
    }
  };

  const handleDeleteGuest = (guestId) => {
    if (window.confirm('Are you sure you want to delete this guest?')) {
      try {
        const guest = guests.find(g => g.id === guestId);
        if (!guest) {
          console.error('Guest not found for deletion:', guestId);
          return;
        }
        
        const updatedGuests = guests.filter(g => g.id !== guestId);
        setGuests(updatedGuests);
        
        // Save to shared storage
        const sharedData = {
          guests: updatedGuests,
          password: "1515",
          lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem('cercino-guests-shared', JSON.stringify(sharedData));
        
        console.log('Guest deleted:', guest.name);
      } catch (error) {
        console.error('Error deleting guest:', error);
        alert('Error deleting guest. Please try again.');
      }
    }
  };

  const handleCloseModal = () => {
    setShowGuestModal(false);
    setEditingGuest(null);
    setGuestForm({ name: '', price: '' });
    setShowSuggestions(false);
    setFilteredSuggestions([]);
  };

  const handleGuestNameChange = (e) => {
    const value = e.target.value;
    setGuestForm({ ...guestForm, name: value });
    
    if (value.length > 0) {
      const suggestions = guests.filter(guest => 
        guest.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (guest) => {
    setGuestForm({ name: guest.name, price: guest.price });
    setEditingGuest(guest);
    setShowSuggestions(false);
    setFilteredSuggestions([]);
  };

  const handleClickOutside = (e) => {
    if (e.target.closest('.input-with-suggestions')) return;
    setShowSuggestions(false);
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split('\n');
    const guests = [];
    
    console.log('Total lines in CSV:', lines.length);
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      console.log(`Processing line ${i}:`, line);
      
      // Skip header row if it contains "name" or "firstname" or "billing"
      if (i === 0 && (line.toLowerCase().includes('name') || line.toLowerCase().includes('firstname') || line.toLowerCase().includes('billing'))) {
        console.log('Skipping header row');
        continue;
      }
      
      // Split by comma, handle quoted values properly
      const values = [];
      let current = '';
      let inQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      
      // Clean up values (remove quotes)
      const cleanValues = values.map(val => val.replace(/^"|"$/g, ''));
      
      console.log('Parsed values:', cleanValues);
      
      if (cleanValues.length >= 3) {
        // Format: "Firstname, Lastname, Price" (3 columns)
        const firstName = cleanValues[0] || '';
        const lastName = cleanValues[1] || '';
        const priceValue = cleanValues[2] || '100 kr';
        
        // Combine first and last name
        const fullName = `${firstName} ${lastName}`.trim();
        
        // Format price (convert decimal to kr format)
        let formattedPrice = priceValue;
        if (priceValue.includes('.')) {
          const numPrice = parseFloat(priceValue);
          if (!isNaN(numPrice)) {
            formattedPrice = `${Math.round(numPrice)} kr`;
          }
        }
        
        console.log('Creating guest:', { name: fullName, price: formattedPrice });
        
        guests.push({
          name: fullName,
          price: formattedPrice,
          checkedIn: false,
          roomCode: roomCode,
          createdAt: new Date(),
          lastUpdated: new Date()
        });
      } else if (cleanValues.length >= 2) {
        // Format: "Full Name, Price" (2 columns)
        const name = cleanValues[0] || `Guest ${i + 1}`;
        let price = cleanValues[1] || '100 kr';
        
        // Format price if it's a decimal
        if (price.includes('.')) {
          const numPrice = parseFloat(price);
          if (!isNaN(numPrice)) {
            price = `${Math.round(numPrice)} kr`;
          }
        }
        
        console.log('Creating guest:', { name, price });
        
        guests.push({
          name: name,
          price: price,
          checkedIn: false,
          roomCode: roomCode,
          createdAt: new Date(),
          lastUpdated: new Date()
        });
      } else {
        console.log('Skipping line - not enough columns:', cleanValues);
      }
    }
    
    console.log('Total guests parsed:', guests.length);
    return guests;
  };

  const handleCSVImport = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClearGuests = async () => {
    if (window.confirm('Are you sure you want to clear all guests? This cannot be undone.')) {
      try {
        console.log('🔥 Starting Firebase batch delete...');
        console.log('🔥 Number of guests to delete:', guests.length);
        console.log('🔥 Room code:', roomCode);
        
        // Delete from Firebase using batch write
        const batch = writeBatch(db);
        console.log('🔥 Batch object created:', batch);
        
        guests.forEach((guest, index) => {
          console.log(`🔥 Deleting guest ${index + 1}:`, guest.name);
          const guestRef = doc(db, 'guests', guest.id);
          console.log(`🔥 Document reference for guest ${index + 1}:`, guestRef);
          
          batch.delete(guestRef);
          console.log(`🔥 Added guest ${index + 1} to delete batch`);
        });
        
        console.log('🔥 Committing delete batch to Firebase...');
        await batch.commit();
        console.log('🔥 Delete batch committed successfully!');
        console.log(`✅ Successfully deleted ${guests.length} guests from Firebase!`);
        
        // Also clear from localStorage as backup
        const allGuests = loadGuests();
        const otherRoomGuests = allGuests.filter(g => g.roomCode !== roomCode);
        localStorage.setItem('cercino-guests', JSON.stringify(otherRoomGuests));
        console.log('💾 Also cleared from localStorage');
        
        // Update state
        setGuests([]);
        
        alert(`Successfully cleared ${guests.length} guests from the database!`);
      } catch (firebaseError) {
        console.error('🔥 Firebase batch delete FAILED:', firebaseError);
        console.error('🔥 Firebase error code:', firebaseError.code);
        console.error('🔥 Firebase error message:', firebaseError.message);
        console.error('🔥 Firebase error details:', firebaseError.details);
        console.error('🔥 Full Firebase error object:', firebaseError);
        
        // Fallback to localStorage only
        console.log('💾 Falling back to localStorage delete...');
        const allGuests = loadGuests();
        const otherRoomGuests = allGuests.filter(g => g.roomCode !== roomCode);
        localStorage.setItem('cercino-guests', JSON.stringify(otherRoomGuests));
        
        // Update state
        setGuests([]);
        console.log('💾 localStorage delete completed');
        alert(`Cleared ${guests.length} guests from local storage (Firebase error occurred)`);
      }
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Reset file input
    event.target.value = '';

    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('Please select a CSV file');
      return;
    }

    setImporting(true);

    try {
      const text = await file.text();
      console.log('CSV content (first 500 chars):', text.substring(0, 500)); // Debug log
      
      const newGuests = parseCSV(text);
      console.log('Parsed guests count:', newGuests.length); // Debug log
      console.log('First few parsed guests:', newGuests.slice(0, 3)); // Debug log

      if (newGuests.length === 0) {
        alert('No valid guest data found in CSV file. Please check the format:\n\nExpected formats:\n- "Full Name, Price" (2 columns)\n- "Firstname, Lastname, Price" (3 columns)\n\nMake sure your CSV has data rows after the header.');
        setImporting(false);
        return;
      }

      // Add guests to Firebase using batch write with detailed logging
      try {
        console.log('🔥 Starting Firebase batch import...');
        console.log('🔥 Number of guests to import:', newGuests.length);
        console.log('🔥 Room code:', roomCode);
        
        const batch = writeBatch(db);
        console.log('🔥 Batch object created:', batch);
        
        newGuests.forEach((guest, index) => {
          console.log(`🔥 Processing guest ${index + 1}:`, guest);
          const guestRef = doc(collection(db, 'guests'));
          console.log(`🔥 Document reference created for guest ${index + 1}:`, guestRef);
          
          const guestData = {
            ...guest,
            roomCode: roomCode,
            checkedIn: false,
            createdAt: new Date(),
            lastUpdated: new Date()
          };
          console.log(`🔥 Guest data for ${index + 1}:`, guestData);
          
          batch.set(guestRef, guestData);
          console.log(`🔥 Added guest ${index + 1} to batch`);
        });
        
        console.log('🔥 Committing batch to Firebase...');
        await batch.commit();
        console.log('🔥 Batch committed successfully!');
        console.log(`✅ Successfully imported ${newGuests.length} guests to Firebase!`);
        alert(`Successfully imported ${newGuests.length} guests! They will now be visible on all devices.`);
      } catch (firebaseError) {
        console.error('🔥 Firebase batch import FAILED:', firebaseError);
        console.error('🔥 Firebase error code:', firebaseError.code);
        console.error('🔥 Firebase error message:', firebaseError.message);
        console.error('🔥 Firebase error details:', firebaseError.details);
        console.error('🔥 Full Firebase error object:', firebaseError);
        
        // Fallback to localStorage
        console.log('💾 Falling back to localStorage...');
        const addedGuests = addGuestsBatch(newGuests.map(guest => ({
          ...guest,
          roomCode: roomCode,
          checkedIn: false
        })));
        
        setGuests(prevGuests => [...prevGuests, ...addedGuests]);
        console.log('💾 localStorage fallback completed');
        alert(`Successfully imported ${newGuests.length} guests! (Saved locally due to Firebase error)`);
      }
    } catch (error) {
      console.error('Error importing CSV:', error);
      alert(`Error importing CSV file: ${error.message}\n\nPlease check the format and try again.`);
    } finally {
      setImporting(false);
    }
  };

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="guestlist-screen">
      {/* Integrated Header & Controls */}
      <div className="guestlist-header-integrated">
        <div className="header-section">
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
        
        <div className="controls-section">
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
              Edit Guest
            </button>
            <button className="import-csv-btn" onClick={handleCSVImport} disabled={importing}>
              <i className={`fas ${importing ? 'fa-spinner fa-spin' : 'fa-upload'}`}></i>
              {importing ? 'Importing...' : 'Import CSV'}
            </button>
            <button className="clear-guests-btn" onClick={handleClearGuests}>
              <i className="fas fa-trash"></i>
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Guest List */}
      <div className="guest-list">
        {loading ? (
          <div className="loading-indicator">
            <i className="fas fa-spinner fa-spin"></i>
            <span>Loading guests...</span>
          </div>
        ) : filteredGuests.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-users"></i>
            <span>No guests found</span>
            <p>Add guests using the "Add / Edit Guest" button above</p>
          </div>
        ) : (
          filteredGuests.map(guest => (
          <div 
            key={guest.id} 
            className="guest-item"
            onDoubleClick={() => handleEditGuest(guest)}
            title="Double-click to edit guest"
          >
            <div className="guest-info">
              <span className="guest-name">{guest.name}</span>
              <span className="guest-price">{guest.price || 'No price'}</span>
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
          ))
        )}
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="bottom-navigation">
        <div className="nav-item active" onClick={() => onNavigate('guestlist')}>
          <i className="fas fa-users"></i>
          <span>Guests</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate('profile')}>
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </div>
      </div>

      {/* Guest Modal */}
      {showGuestModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} onMouseDown={handleClickOutside}>
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
                <div className="input-with-suggestions">
                  <input
                    id="guestName"
                    type="text"
                    value={guestForm.name}
                    onChange={handleGuestNameChange}
                    placeholder="Enter guest name"
                    autoComplete="off"
                  />
                  {showSuggestions && (
                    <div className="suggestions-dropdown">
                      {filteredSuggestions.map(guest => (
                        <div
                          key={guest.id}
                          className="suggestion-item"
                          onClick={() => handleSuggestionClick(guest)}
                        >
                          <span className="suggestion-name">{guest.name}</span>
                          <span className="suggestion-price">{guest.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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

      {/* Hidden file input for CSV import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default GuestlistScreen;
