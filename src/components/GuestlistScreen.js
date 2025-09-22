import React, { useState, useEffect, useRef, useCallback } from 'react';
import { collection, updateDoc, deleteDoc, doc, onSnapshot, query, where, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { loadGuests, updateGuest, deleteGuest, addGuestsBatch } from '../utils/localStorage';

const GuestlistScreen = ({ onLogout, onNavigate, roomCode = '1515', onGuestsUpdate }) => {
  // Memoize the guests update callback to prevent unnecessary re-renders
  const memoizedOnGuestsUpdate = useCallback(onGuestsUpdate, [onGuestsUpdate]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);
  const [guestForm, setGuestForm] = useState({ name: '', price: '', tag: '' });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef(null);

  // Load guests with Firebase real-time sync (optimized)
  useEffect(() => {
    let unsubscribe = null;
    
    // Load from localStorage immediately for instant display
    const localGuests = loadGuests().filter(guest => guest.roomCode === roomCode);
    setGuests(localGuests);
    setLoading(false);
    
    // Set up Firebase real-time listener (optimized)
    try {
      const guestsRef = collection(db, 'guests');
      const q = query(guestsRef, where('roomCode', '==', roomCode));
      
      unsubscribe = onSnapshot(q, (snapshot) => {
        const firebaseGuests = [];
        snapshot.forEach((doc) => {
          firebaseGuests.push({ id: doc.id, ...doc.data() });
        });
        
        // Only update state if there are actual differences to avoid unnecessary re-renders
        setGuests(currentGuests => {
          // Check if the data is actually different
          const currentGuestsString = JSON.stringify(currentGuests.sort((a, b) => a.id.localeCompare(b.id)));
          const firebaseGuestsString = JSON.stringify(firebaseGuests.sort((a, b) => a.id.localeCompare(b.id)));
          
          if (currentGuestsString !== firebaseGuestsString) {
            // Data has changed, update state
            if (memoizedOnGuestsUpdate) {
              memoizedOnGuestsUpdate(firebaseGuests);
            }
            
            // Update localStorage only when data actually changes
            const allGuests = loadGuests();
            const otherRoomGuests = allGuests.filter(g => g.roomCode !== roomCode);
            const updatedGuests = [...otherRoomGuests, ...firebaseGuests];
            localStorage.setItem('cercino-guests', JSON.stringify(updatedGuests));
            
            return firebaseGuests;
          }
          
          // No changes, return current state to avoid re-render
          return currentGuests;
        });
        
      }, (error) => {
        console.error('Firebase sync error:', error.message);
        // Keep using localStorage data if Firebase fails
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    } catch (error) {
      console.error('Firebase setup error:', error.message);
      // Keep using localStorage data
    }
  }, [roomCode, memoizedOnGuestsUpdate]);

  // Add click outside listener for dropdowns
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const totalGuests = guests.length;
  const checkedInCount = guests.filter(guest => guest.checkedIn === true).length;
  const remainingGuests = totalGuests - checkedInCount;

  // Function to calculate number of tickets based on price
  const calculateTickets = (price) => {
    if (!price) return 0;
    
    // Extract numeric value from price string (e.g., "100 kr" -> 100)
    const numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));
    if (isNaN(numericPrice)) return 0;
    
    // Assuming each ticket costs 100 kr (you can adjust this)
    const ticketPrice = 100;
    return Math.floor(numericPrice / ticketPrice);
  };

  const handleCheckIn = async (guestId) => {
    try {
      const guest = guests.find(g => g.id === guestId);
      if (!guest) {
        console.error('Guest not found:', guestId);
        return;
      }
      
      // OPTIMISTIC UPDATE: Update local state immediately for instant feedback
      const newCheckedInState = !guest.checkedIn;
      setGuests(prevGuests => 
        prevGuests.map(g => 
          g.id === guestId 
            ? { ...g, checkedIn: newCheckedInState, lastUpdated: new Date() }
            : g
        )
      );
      
      // Update in Firebase for real-time sync (background operation)
      try {
        const guestRef = doc(db, 'guests', guestId);
        const updateData = {
          checkedIn: newCheckedInState,
          lastUpdated: new Date()
        };
        
        // Fire and forget - don't wait for Firebase response
        updateDoc(guestRef, updateData).catch(firebaseError => {
          console.error('Firebase update failed:', firebaseError.message);
          // If Firebase fails, the real-time listener will eventually sync
          // or we can show a subtle error indicator if needed
        });
      } catch (firebaseError) {
        console.error('Firebase update failed:', firebaseError.message);
        // Firebase error doesn't affect the UI - optimistic update already applied
      }
    } catch (error) {
      console.error('Error checking in guest:', error);
      // Revert optimistic update on error
      setGuests(prevGuests => 
        prevGuests.map(g => 
          g.id === guestId 
            ? { ...g, checkedIn: !g.checkedIn } // Revert to original state
            : g
        )
      );
      alert('Error updating guest. Please try again.');
    }
  };

  const handleAddGuest = () => {
    setEditingGuest(null);
    setGuestForm({ name: '', price: '', tag: '' });
    setSearchTerm('');
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    setShowGuestModal(true);
  };

  const handleEditGuest = (guest) => {
    setEditingGuest(guest);
    setGuestForm({ name: guest.name, price: guest.price, tag: guest.tag || '' });
    setSearchTerm('');
    setShowSuggestions(false);
    setFilteredSuggestions([]);
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
          tag: guestForm.tag.trim(),
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
          tag: guestForm.tag.trim(),
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
      setGuestForm({ name: '', price: '', tag: '' });
      setSearchTerm('');
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
    setGuestForm({ name: guest.name, price: guest.price, tag: guest.tag || '' });
    setEditingGuest(guest);
    setSearchTerm(''); // Clear the search field
    setShowSuggestions(false);
    setFilteredSuggestions([]);
  };

  const handleClickOutside = (e) => {
    if (e.target.closest('.input-with-suggestions')) return;
    if (e.target.closest('.filter-container')) return;
    setShowSuggestions(false);
    setShowFilterDropdown(false);
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

  const clearSearch = () => {
    setSearchTerm('');
  };

  const filteredGuests = guests.filter(guest => {
    // ENHANCED search function with better debugging
    let matchesSearch = true;
    
    if (searchTerm.trim().length > 0) {
      const searchValue = searchTerm.trim().toLowerCase();
      const guestName = (guest.name || '').toLowerCase();
      
      // Enhanced search - check if name contains search term
      matchesSearch = guestName.includes(searchValue);
      
      // Debug logging for search
      if (searchValue === 'molly') {
        console.log('🔍 Search Debug for "molly":', {
          guestName: guest.name,
          guestId: guest.id,
          matchesSearch: matchesSearch,
          searchValue: searchValue,
          guestNameLower: guestName
        });
      }
    }
    
    // Apply filter
    switch (filter) {
      case 'All':
        return matchesSearch;
      case 'Checked In':
        return matchesSearch && guest.checkedIn === true;
      case 'Not Checked In':
        return matchesSearch && guest.checkedIn !== true;
      case 'Alphabetic Order':
        return matchesSearch;
      case 'Amount':
        return matchesSearch;
      default:
        return matchesSearch;
    }
  }).sort((a, b) => {
    switch (filter) {
      case 'Alphabetic Order':
        return a.name.localeCompare(b.name);
      case 'Amount':
        const priceA = parseFloat(a.price?.replace(/[^\d.]/g, '')) || 0;
        const priceB = parseFloat(b.price?.replace(/[^\d.]/g, '')) || 0;
        return priceB - priceA; // Highest amount first
      default:
        return 0; // No sorting for other filters
    }
  });

  // Debug logging for search results
  if (searchTerm.trim().length > 0) {
    console.log('🔍 Search Results Debug:', {
      searchTerm: searchTerm,
      totalGuests: guests.length,
      filteredGuests: filteredGuests.length,
      allGuestNames: guests.map(g => g.name)
    });
  }

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
            <div className="search-input-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search guests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="search-clear-btn"
                  onClick={clearSearch}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
            <div className="filter-container">
              <button 
                className={`filter-btn ${showFilterDropdown ? 'active' : ''}`}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              >
                <i className="fas fa-filter"></i>
                <span>{filter}</span>
                <i className={`fas fa-chevron-${showFilterDropdown ? 'up' : 'down'}`}></i>
              </button>
              
              {showFilterDropdown && (
                <div className="filter-dropdown">
                  <div 
                    className="filter-option"
                    onClick={() => {
                      setFilter('All');
                      setShowFilterDropdown(false);
                    }}
                  >
                    All
                  </div>
                  <div 
                    className="filter-option"
                    onClick={() => {
                      setFilter('Checked In');
                      setShowFilterDropdown(false);
                    }}
                  >
                    Checked In
                  </div>
                  <div 
                    className="filter-option"
                    onClick={() => {
                      setFilter('Not Checked In');
                      setShowFilterDropdown(false);
                    }}
                  >
                    Not Checked In
                  </div>
                  <div 
                    className="filter-option"
                    onClick={() => {
                      setFilter('Alphabetic Order');
                      setShowFilterDropdown(false);
                    }}
                  >
                    Alphabetic Order
                  </div>
                  <div 
                    className="filter-option"
                    onClick={() => {
                      setFilter('Amount');
                      setShowFilterDropdown(false);
                    }}
                  >
                    Amount
                  </div>
                </div>
              )}
            </div>
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
              <div className="guest-price-info">
                <span className="guest-price">{guest.price || 'No price'}</span>
                {guest.price && calculateTickets(guest.price) > 0 && (
                  <span className="guest-tickets">
                    {calculateTickets(guest.price)} ticket{calculateTickets(guest.price) !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              {guest.tag && (
                <span className="guest-tag">{guest.tag}</span>
              )}
            </div>
            <div className="guest-actions">
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

      {/* Guest Slide Menu */}
      {showGuestModal && (
        <div className="menu-overlay" onClick={handleCloseModal}>
          <div className="slide-menu open" onClick={(e) => e.stopPropagation()}>
            <div className="menu-header">
              <h3>{editingGuest ? 'Edit Guest' : 'Add New Guest'}</h3>
              <div className="modal-header-actions">
                <button className="close-btn" onClick={handleCloseModal}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div className="menu-content">
              <div className="form-group">
                <label htmlFor="guestSearch">Search Existing Guest</label>
                <div className="input-with-suggestions">
                  <input
                    id="guestSearch"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      const value = e.target.value.trim();
                      setSearchTerm(value);
                      
                      if (value.length > 0) {
                        // Include current form data if editing a guest
                        let searchableGuests = [...guests];
                        
                        // If editing an existing guest, temporarily update their name for search
                        if (editingGuest && guestForm.name.trim()) {
                          const updatedGuest = {
                            ...editingGuest,
                            name: guestForm.name.trim()
                          };
                          searchableGuests = searchableGuests.map(g => 
                            g.id === editingGuest.id ? updatedGuest : g
                          );
                        }
                        
                        // SIMPLE AND BULLETPROOF search function
                        const suggestions = searchableGuests.filter(guest => {
                          if (!guest.name) return false;
                          
                          const searchTerm = value.toLowerCase();
                          const guestName = guest.name.toLowerCase();
                          
                          // ONLY show guests whose name contains the search term
                          return guestName.includes(searchTerm);
                        });
                        
                        // Remove duplicates based on guest ID
                        const uniqueSuggestions = suggestions.filter((guest, index, self) => 
                          index === self.findIndex(g => g.id === guest.id)
                        );
                        
                        // Sort suggestions by relevance
                        const sortedSuggestions = uniqueSuggestions.sort((a, b) => {
                          const aName = a.name.toLowerCase();
                          const bName = b.name.toLowerCase();
                          const searchTerm = value.toLowerCase();
                          
                          // Exact matches first
                          if (aName === searchTerm && bName !== searchTerm) return -1;
                          if (bName === searchTerm && aName !== searchTerm) return 1;
                          
                          // Starts with search term
                          if (aName.startsWith(searchTerm) && !bName.startsWith(searchTerm)) return -1;
                          if (bName.startsWith(searchTerm) && !aName.startsWith(searchTerm)) return 1;
                          
                          // Alphabetical order for same relevance
                          return aName.localeCompare(bName);
                        });
                        
                        setFilteredSuggestions(sortedSuggestions);
                        setShowSuggestions(sortedSuggestions.length > 0);
                        
                        // Debug logging
                        console.log('🔍 Search Debug:', {
                          searchTerm: value,
                          totalGuests: searchableGuests.length,
                          foundSuggestions: sortedSuggestions.length,
                          suggestions: sortedSuggestions.map(g => g.name)
                        });
                      } else {
                        setShowSuggestions(false);
                        setFilteredSuggestions([]);
                      }
                    }}
                    placeholder="Search for existing guest..."
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
                <label htmlFor="guestName">Guest Name</label>
                <input
                  id="guestName"
                  type="text"
                  value={guestForm.name}
                  onChange={(e) => setGuestForm({ ...guestForm, name: e.target.value })}
                  placeholder="Enter guest name"
                  autoComplete="off"
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
              <div className="form-group">
                <label htmlFor="guestTag">Custom Tag</label>
                <input
                  id="guestTag"
                  type="text"
                  value={guestForm.tag}
                  onChange={(e) => setGuestForm({ ...guestForm, tag: e.target.value })}
                  placeholder="e.g., VIP, Staff, Press"
                  className="tag-input"
                />
              </div>
            </div>
            <div className="menu-footer">
              <button className="logout-btn" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
                <span>Cancel</span>
              </button>
              {editingGuest && (
                <button 
                  className="delete-guest-btn"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this guest?')) {
                      handleDeleteGuest(editingGuest.id);
                      handleCloseModal();
                    }
                  }}
                >
                  <i className="fas fa-trash"></i>
                  <span>Delete Guest</span>
                </button>
              )}
              <button className="save-btn" onClick={handleSaveGuest} style={{background: '#ff6b9d', border: 'none', color: '#fff', padding: '12px 20px', borderRadius: '8px', marginLeft: '10px'}}>
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
