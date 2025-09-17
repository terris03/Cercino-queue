import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import GuestlistScreen from './components/GuestlistScreen';
import ProfileScreen from './components/ProfileScreen';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roomCode, setRoomCode] = useState('123');

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
              <GuestlistScreen onLogout={handleLogout} onNavigate={handleNavigation} roomCode={roomCode} />
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="screen active">
            <div className="screen-content">
              <ProfileScreen onLogout={handleLogout} onNavigate={handleNavigation} />
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
      </div>
    </div>
  );
}

export default App;
