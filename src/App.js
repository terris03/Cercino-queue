import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import GuestlistScreen from './components/GuestlistScreen';
import StatisticsScreen from './components/StatisticsScreen';
import ProfileScreen from './components/ProfileScreen';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [slideDirection, setSlideDirection] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNext = () => {
    setSlideDirection('slide-out-left');
    setTimeout(() => {
      setCurrentScreen('login');
      setSlideDirection('slide-in-right');
    }, 300);
  };

  const handleBack = () => {
    setSlideDirection('slide-out-right');
    setTimeout(() => {
      setCurrentScreen('welcome');
      setSlideDirection('slide-in-left');
    }, 300);
  };

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
      setCurrentScreen('welcome');
      setSlideDirection('slide-in-left');
    }, 300);
  };

  const handleNavigation = (screen) => {
    if (isLoggedIn) {
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
      case 'welcome':
        return (
          <div className={screenClass}>
            <WelcomeScreen onNext={handleNext} />
          </div>
        );
      case 'login':
        return (
          <div className={screenClass}>
            <LoginScreen onLogin={handleLogin} onBack={handleBack} />
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
