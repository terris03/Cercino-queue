import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [slideDirection, setSlideDirection] = useState('');

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
    setSlideDirection('slide-out-left');
    setTimeout(() => {
      setCurrentScreen('dashboard');
      setSlideDirection('slide-in-right');
    }, 300);
  };

  const handleLogout = () => {
    setSlideDirection('slide-out-right');
    setTimeout(() => {
      setCurrentScreen('welcome');
      setSlideDirection('slide-in-left');
    }, 300);
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
      case 'dashboard':
        return (
          <div className={screenClass}>
            <Dashboard onLogout={handleLogout} />
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
