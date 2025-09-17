import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import GuestlistScreen from './components/GuestlistScreen';
import StatisticsScreen from './components/StatisticsScreen';
import ProfileScreen from './components/ProfileScreen';
import HamburgerMenu from './components/HamburgerMenu';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roomCode, setRoomCode] = useState('1515');
  const [guests, setGuests] = useState([]);

  const handleLogin = (code) => {
    setRoomCode(code);
    setIsLoggedIn(true);
    setCurrentScreen('guestlist');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const handleNavigation = (screen) => {
    if (isLoggedIn && screen !== currentScreen) {
      setCurrentScreen(screen);
    }
  };

  const handleGuestsUpdate = (updatedGuests) => {
    setGuests(updatedGuests);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <div className="screen active">
            <div className="screen-content">
              <LoginScreen onLogin={handleLogin} />
            </div>
          </div>
        );
      case 'guestlist':
        return (
          <div className="screen active">
            <div className="screen-content">
              <GuestlistScreen onLogout={handleLogout} onNavigate={handleNavigation} roomCode={roomCode} onGuestsUpdate={handleGuestsUpdate} />
            </div>
          </div>
        );
      case 'statistics':
        return (
          <div className="screen active">
            <div className="screen-content">
              <StatisticsScreen onLogout={handleLogout} onNavigate={handleNavigation} guests={guests} />
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="screen active">
            <div className="screen-content">
              <ProfileScreen onLogout={handleLogout} onNavigate={handleNavigation} roomCode={roomCode} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="screen-container">
        {renderScreen()}
        {isLoggedIn && (
          <HamburgerMenu 
            onNavigate={handleNavigation} 
            currentScreen={currentScreen}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
}

export default App;
