import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Guestlist = () => {
  const [guests, setGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [tutorialIndex, setTutorialIndex] = useState(0);
  const fileInputRef = useRef(null);
  const tutorialRef = useRef(null);

  const tutorialCards = [
    {
      icon: '👋',
      title: 'Welcome to Cercino!',
      description: 'Your professional guestlist management system for events. Let\'s get you started! ✨ NEW APPLE DESIGN ✨',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: '📥',
      title: 'Import Your Guest List',
      description: 'Click "Import CSV" to upload your guest list. Make sure your CSV has columns: First Name, Second Name, Price, Status',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: '✅',
      title: 'Check-In Guests',
      description: 'Click the "Check-in" button next to each guest to mark them as arrived. You can toggle this status anytime!',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: '📤',
      title: 'Export Updated List',
      description: 'Click "Export CSV" to download your updated guest list with current check-in statuses for your records.',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      icon: '🔍',
      title: 'Search & Filter',
      description: 'Use the search bar to find guests quickly. The filter button will help you organize by status, price, or name.',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      icon: '📱',
      title: 'Real-Time Updates',
      description: 'All changes sync instantly across devices! If multiple people are managing the event, everyone sees updates in real-time.',
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  // Set up real-time listener for guests
  useEffect(() => {
    console.log('Setting up real-time listener...');
    const unsubscribe = onSnapshot(collection(db, 'guests'), (querySnapshot) => {
      const guestsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Real-time update: Loaded', guestsData.length, 'guests');
      console.log('Guest data:', guestsData);
      setGuests(guestsData);
    }, (error) => {
      console.error('Real-time listener error:', error);
    });

    return () => {
      console.log('Cleaning up real-time listener');
      unsubscribe();
    };
  }, []);

  // Filter guests based on search term
  useEffect(() => {
    const filtered = guests.filter(guest =>
      guest.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.secondName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGuests(filtered);
  }, [guests, searchTerm]);

  const loadGuests = useCallback(async () => {
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
  }, []);

  const handleImportCSV = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('Starting CSV import for file:', file.name);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const lines = text.split('\n');
      console.log('CSV file has', lines.length, 'lines');
      
      const newGuests = [];
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          const values = lines[i].split(',').map(v => v.trim());
          if (values.length >= 3) {
            const guest = {
              firstName: values[0] || '',
              secondName: values[1] || '',
              price: values[2] || '0',
              status: values[3] || 'Guest',
              checkedIn: false,
              timestamp: new Date()
            };
            newGuests.push(guest);
          }
        }
      }

      console.log('Parsed', newGuests.length, 'guests from CSV');

      // Add guests to Firebase
      try {
        for (const guest of newGuests) {
          await addDoc(collection(db, 'guests'), guest);
        }
        console.log('Successfully added', newGuests.length, 'guests to Firebase');
        // Real-time listener will automatically update the list
        alert(`Successfully imported ${newGuests.length} guests!`);
        
        // Reset file input to allow re-uploading the same file
        event.target.value = '';
      } catch (error) {
        console.error('Error importing guests:', error);
        alert('Error importing guests. Please try again.');
        
        // Reset file input on error too
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  const handleExportCSV = () => {
    const csvContent = [
      'First Name,Second Name,Price,Status,Checked In',
      ...guests.map(guest => 
        `${guest.firstName},${guest.secondName},${guest.price},${guest.status || 'Guest'},${guest.checkedIn ? 'Yes' : 'No'}`
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

  const handleCheckIn = useCallback(async (guestId, currentStatus) => {
    try {
      const guestRef = doc(db, 'guests', guestId);
      const newStatus = !currentStatus;
      await updateDoc(guestRef, {
        checkedIn: newStatus,
        checkInTime: newStatus ? new Date() : null
      });
      // Optimistic update for faster UI response
      setGuests(prevGuests => 
        prevGuests.map(guest => 
          guest.id === guestId 
            ? { 
                ...guest, 
                checkedIn: newStatus, 
                checkInTime: newStatus ? new Date() : null 
              }
            : guest
        )
      );
    } catch (error) {
      console.error('Error updating guest:', error);
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'staff': return '#dc2626'; // Red
      case 'press': return '#7c3aed'; // Purple
      case 'vip': return '#eab308'; // Yellow
      default: return '#6b7280'; // Gray
    }
  };

  const checkedInCount = useMemo(() => 
    guests.filter(guest => guest.checkedIn).length, [guests]
  );
  const nonCheckedCount = useMemo(() => 
    guests.filter(guest => !guest.checkedIn).length, [guests]
  );

  // Tutorial swipe functionality
  const handleTutorialSwipe = (direction) => {
    if (direction === 'next' && tutorialIndex < tutorialCards.length - 1) {
      setTutorialIndex(tutorialIndex + 1);
    } else if (direction === 'prev' && tutorialIndex > 0) {
      setTutorialIndex(tutorialIndex - 1);
    }
  };

  const handleTutorialTouchStart = (e) => {
    const startX = e.touches[0].clientX;
    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          handleTutorialSwipe('next');
        } else {
          handleTutorialSwipe('prev');
        }
      }
    };
    document.addEventListener('touchend', handleTouchEnd, { once: true });
  };

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
        {/* 2x2 Grid Layout */}
        <div className="modules-grid fade-in">
          {/* Top Row - Action Buttons */}
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={handleImportCSV}>
              <i className="fas fa-upload"></i>
              Import CSV
            </button>
          </div>
          <div className="action-buttons">
            <button className="btn btn-secondary" onClick={handleExportCSV}>
              <i className="fas fa-download"></i>
              Export CSV
            </button>
          </div>
          
          {/* Bottom Row - Statistics */}
          <div className="stats-section">
            <div className="stats-item">
              <span className="stats-label">Checked in:</span>
              <span className="stats-count">{checkedInCount}</span>
            </div>
          </div>
          <div className="stats-section">
            <div className="stats-item">
              <span className="stats-label">Non-checked:</span>
              <span className="stats-count">{nonCheckedCount}</span>
            </div>
          </div>
        </div>

        {/* Guest List */}
        <div className="guest-list fade-in fade-in-delay-2">
          {filteredGuests.length === 0 ? (
            guests.length === 0 ? (
              <div className="tutorial-carousel-container">
                {/* Tutorial Progress Dots */}
                <div className="tutorial-progress-dots">
                  {tutorialCards.map((_, index) => (
                    <div
                      key={index}
                      className={`tutorial-dot ${index === tutorialIndex ? 'active' : ''}`}
                      onClick={() => setTutorialIndex(index)}
                    />
                  ))}
                </div>

                {/* Tutorial Cards */}
                <div 
                  className="tutorial-cards-wrapper"
                  onTouchStart={handleTutorialTouchStart}
                >
                  <div 
                    className="tutorial-cards-track"
                    style={{
                      transform: `translateX(-${tutorialIndex * 100}%)`,
                      transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }}
                  >
                    {tutorialCards.map((card, index) => (
                      <div key={index} className="tutorial-card-slide">
                        <div 
                          className="tutorial-card-content"
                          style={{ background: card.color }}
                        >
                          <div className="tutorial-icon">{card.icon}</div>
                          <h3 className="tutorial-title">{card.title}</h3>
                          <p className="tutorial-description">{card.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="tutorial-navigation">
                  {tutorialIndex > 0 && (
                    <button 
                      className="tutorial-nav-btn prev" 
                      onClick={() => handleTutorialSwipe('prev')}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                  )}
                  
                  {tutorialIndex < tutorialCards.length - 1 ? (
                    <button 
                      className="tutorial-nav-btn next" 
                      onClick={() => handleTutorialSwipe('next')}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  ) : (
                    <button 
                      className="tutorial-start-btn" 
                      onClick={handleImportCSV}
                    >
                      <i className="fas fa-upload"></i>
                      Import CSV Now
                    </button>
                  )}
                </div>

                {/* Swipe Hint */}
                <div className="tutorial-swipe-hint">
                  <i className="fas fa-hand-pointer"></i>
                  <span>Swipe to explore more tips</span>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                No guests match your search criteria.
              </div>
            )
          ) : (
            filteredGuests.map((guest, index) => (
              <div key={guest.id} className={`guest-item fade-in fade-in-delay-${Math.min(3 + Math.floor(index / 5), 4)}`}>
                <div className="guest-name">{guest.firstName} {guest.secondName}</div>
                <div className="guest-price">{guest.price} kr</div>
                <button
                  className={`checkin-btn ${guest.checkedIn ? 'checked' : ''}`}
                  onClick={() => handleCheckIn(guest.id, guest.checkedIn)}
                >
                  {guest.checkedIn ? 'Checked In' : 'Check-in'}
                </button>
              </div>
            ))
          )}
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