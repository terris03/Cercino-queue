import React, { useState, useEffect } from 'react';
import { loadGuests } from '../utils/localStorage';

const StatisticsScreen = ({ onLogout, onNavigate, roomCode = '123' }) => {
  const [stats, setStats] = useState({
    totalEarnings: '0 kr',
    totalGuests: 0,
    checkedIn: 0,
    avgOrder: '0 kr',
    checkinRate: 0
  });

  useEffect(() => {
    const guests = loadGuests().filter(guest => guest.roomCode === roomCode);
    const checkedInGuests = guests.filter(guest => guest.checkedIn);
    
    // Calculate total earnings
    const totalEarnings = guests.reduce((sum, guest) => {
      const priceStr = guest.price || '0 kr';
      const priceNum = parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;
      return sum + priceNum;
    }, 0);
    
    // Calculate average order
    const avgOrder = guests.length > 0 ? totalEarnings / guests.length : 0;
    
    // Calculate check-in rate
    const checkinRate = guests.length > 0 ? (checkedInGuests.length / guests.length) * 100 : 0;
    
    setStats({
      totalEarnings: `${Math.round(totalEarnings)} kr`,
      totalGuests: guests.length,
      checkedIn: checkedInGuests.length,
      avgOrder: `${Math.round(avgOrder)} kr`,
      checkinRate: Math.round(checkinRate)
    });
  }, [roomCode]);

  return (
    <div className="statistics-screen">
      <div className="statistics-container">
        {/* Header */}
        <div className="statistics-header">
          <h1 className="stats-title">Statistics</h1>
          <p className="stats-subtitle">Event performance overview</p>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          {/* Top Row */}
          <div className="stats-row">
            <div className="stat-card earnings">
              <div className="stat-icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="stat-content">
                <h3>Total Earnings</h3>
                <span className="stat-value">{stats.totalEarnings}</span>
              </div>
            </div>

            <div className="stat-card guests">
              <div className="stat-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-content">
                <h3>Total Guests</h3>
                <span className="stat-value">{stats.totalGuests}</span>
              </div>
            </div>
          </div>

          {/* Middle Row */}
          <div className="stats-row">
            <div className="stat-card checked-in">
              <div className="stat-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="stat-content">
                <h3>Checked In</h3>
                <span className="stat-value">{stats.checkedIn}</span>
              </div>
            </div>

            <div className="stat-card avg-order">
              <div className="stat-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="stat-content">
                <h3>Avg Order</h3>
                <span className="stat-value">{stats.avgOrder}</span>
              </div>
            </div>
          </div>

          {/* Bottom Row - Full Width */}
          <div className="stats-row full-width">
            <div className="stat-card checkin-rate">
              <div className="stat-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="stat-content">
                <h3>Check-in Rate</h3>
                <div className="progress-section">
                  <span className="progress-label">Progress</span>
                  <span className="progress-value">{stats.checkinRate}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${stats.checkinRate}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-navigation">
          <div className="nav-item" onClick={() => onNavigate('guestlist')}>
            <i className="fas fa-users"></i>
            <span>Guests</span>
          </div>
          <div className="nav-item active" onClick={() => onNavigate('statistics')}>
            <i className="fas fa-chart-bar"></i>
            <span>Stats</span>
          </div>
          <div className="nav-item" onClick={() => onNavigate('profile')}>
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsScreen;
