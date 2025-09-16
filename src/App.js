import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Guestlist from './components/Guestlist';
import Statistics from './components/Statistics';
import Profile from './components/Profile';
import BottomNavigation from './components/BottomNavigation';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Guestlist />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;
