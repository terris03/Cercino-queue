import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import GuestlistScreen from './components/GuestlistScreen';
import StatisticsScreen from './components/StatisticsScreen';
import ProfileScreen from './components/ProfileScreen';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [slideDirection, setSlideDirection] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setSlideDirection('slide-out-left');
    setTimeout(() => {
      setCurrentScreen('guestlist');
      setSlideDirection('slide-in-right');
    }, 300);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSlideDirection('slide-out-right');
    setTimeout(() => {
      setCurrentScreen('login');
      setSlideDirection('slide-in-left');
    }, 300);
  };

  const handleNavigation = (screen) => {
    if (isLoggedIn && screen !== currentScreen) {
      setSlideDirection('slide-out-left');
      setTimeout(() => {
        setCurrentScreen(screen);
        setSlideDirection('slide-in-right');
      }, 300);
    }
  };

  const renderScreen = () => {
    const screenClass = `screen ${slideDirection}`;
    
    switch (currentScreen) {
      case 'login':
        return (
          <div className={screenClass}>
            <LoginScreen onLogin={handleLogin} />
          </div>
        );
      case 'guestlist':
        return (
          <div className={screenClass}>
            <GuestlistScreen onLogout={handleLogout} onNavigate={handleNavigation} />
          </div>
        );
      case 'statistics':
        return (
          <div className={screenClass}>
            <StatisticsScreen onLogout={handleLogout} onNavigate={handleNavigation} />
          </div>
        );
      case 'profile':
        return (
          <div className={screenClass}>
            <ProfileScreen onLogout={handleLogout} onNavigate={handleNavigation} />
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
