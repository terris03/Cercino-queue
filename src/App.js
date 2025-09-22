import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import GuestlistScreen from './components/GuestlistScreen';
import StatisticsScreen from './components/StatisticsScreen';
import ProfileScreen from './components/ProfileScreen';
import HamburgerMenu from './components/HamburgerMenu';
import LandingPage from './components/LandingPage';
import CreateEventPage from './components/CreateEventPage';
import ShopPage from './components/ShopPage';
import './App.css';

// Persistent login utilities
const LOGIN_STORAGE_KEY = 'cercino-login-data';
const LOGIN_EXPIRY_HOURS = 24 * 7; // 7 days

const saveLoginData = (roomCode, isDarkMode) => {
  const loginData = {
    roomCode,
    isDarkMode,
    loginTime: Date.now(),
    expiryTime: Date.now() + (LOGIN_EXPIRY_HOURS * 60 * 60 * 1000)
  };
  localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(loginData));
};

const loadLoginData = () => {
  try {
    const stored = localStorage.getItem(LOGIN_STORAGE_KEY);
    if (!stored) return null;
    
    const loginData = JSON.parse(stored);
    
    // Check if login has expired
    if (Date.now() > loginData.expiryTime) {
      localStorage.removeItem(LOGIN_STORAGE_KEY);
      return null;
    }
    
    return loginData;
  } catch (error) {
    console.error('Error loading login data:', error);
    localStorage.removeItem(LOGIN_STORAGE_KEY);
    return null;
  }
};

const clearLoginData = () => {
  localStorage.removeItem(LOGIN_STORAGE_KEY);
};

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roomCode, setRoomCode] = useState('1515');
  const [guests, setGuests] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored login data on app startup
  useEffect(() => {
    const storedLoginData = loadLoginData();
    
    if (storedLoginData) {
      // Auto-login with stored data
      setRoomCode(storedLoginData.roomCode);
      setIsDarkMode(storedLoginData.isDarkMode);
      setIsLoggedIn(true);
      setCurrentScreen('guestlist');
    }
    
    setIsLoading(false);
  }, []);

  const handleLogin = (code, shouldRemember = true) => {
    setRoomCode(code);
    setIsLoggedIn(true);
    setCurrentScreen('guestlist');
    
    // Save login data for future sessions only if user wants to be remembered
    if (shouldRemember) {
      saveLoginData(code, isDarkMode);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
    
    // Clear stored login data
    clearLoginData();
  };

  const handleNavigation = (screen) => {
    if (isLoggedIn && screen !== currentScreen) {
      setCurrentScreen(screen);
    }
  };

  const handleGuestsUpdate = (updatedGuests) => {
    setGuests(updatedGuests);
  };

  const handleThemeToggle = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    // Save updated theme preference if logged in
    if (isLoggedIn) {
      saveLoginData(roomCode, newTheme);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return (
          <div className="screen active">
            <div className="screen-content">
              <LandingPage onLogin={() => setCurrentScreen('login')} />
            </div>
          </div>
        );
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
              <ProfileScreen onLogout={handleLogout} onNavigate={handleNavigation} roomCode={roomCode} isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
            </div>
          </div>
        );
      case 'createevent':
        return (
          <div className="screen active">
            <div className="screen-content">
              <CreateEventPage onLogout={handleLogout} onNavigate={handleNavigation} />
            </div>
          </div>
        );
      case 'shop':
        return (
          <div className="screen active">
            <div className="screen-content">
              <ShopPage onLogout={handleLogout} onNavigate={handleNavigation} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Show loading screen while checking for stored login data
  if (isLoading) {
    return (
      <div className={`App ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <div className="loading-screen">
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
          <p>Loading CERCINO...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`App ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
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
