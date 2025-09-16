import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import GuestlistScreen from './components/GuestlistScreen';
import StatisticsScreen from './components/StatisticsScreen';
import ProfileScreen from './components/ProfileScreen';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
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
    return (
      <>
        <div className={`screen ${currentScreen === 'login' ? 'active' : ''}`}>
          <div className="screen-content">
            <LoginScreen onLogin={handleLogin} />
          </div>
        </div>
        <div className={`screen ${currentScreen === 'guestlist' ? 'active' : ''}`}>
          <div className="screen-content">
            <GuestlistScreen onLogout={handleLogout} onNavigate={handleNavigation} />
          </div>
        </div>
        <div className={`screen ${currentScreen === 'statistics' ? 'active' : ''}`}>
          <div className="screen-content">
            <StatisticsScreen onLogout={handleLogout} onNavigate={handleNavigation} />
          </div>
        </div>
        <div className={`screen ${currentScreen === 'profile' ? 'active' : ''}`}>
          <div className="screen-content">
            <ProfileScreen onLogout={handleLogout} onNavigate={handleNavigation} />
          </div>
        </div>
      </>
    );
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
