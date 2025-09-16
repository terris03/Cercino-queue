import React, { useState, useRef, useEffect } from 'react';

const Tutorial = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef(null);

  const tutorials = [
    {
      icon: '📊',
      title: 'Welcome to Cercino!',
      description: 'Your professional guestlist management system for events. Let\'s get you started with a quick tour!',
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
    },
    {
      icon: '📊',
      title: 'Live Statistics',
      description: 'Track your event progress with live stats showing checked-in vs remaining guests. Perfect for event management!',
      color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    },
    {
      icon: '🎉',
      title: 'You\'re All Set!',
      description: 'Ready to manage your event like a pro! Import your CSV file and start checking in guests. Have an amazing event!',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const diff = currentX - startX;
    const threshold = 100;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (diff < 0 && currentSlide < tutorials.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    }
    
    setTranslateX(0);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, currentX, startX]);

  const nextSlide = () => {
    if (currentSlide < tutorials.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-container">
        {/* Close Button */}
        <button className="tutorial-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        {/* Progress Indicator */}
        <div className="tutorial-progress">
          {tutorials.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* Tutorial Cards */}
        <div 
          className="tutorial-cards-container"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{
            transform: `translateX(${-currentSlide * 100 + (translateX / window.innerWidth) * 100}%)`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          {tutorials.map((tutorial, index) => (
            <div key={index} className="tutorial-card">
              <div 
                className="tutorial-card-content"
                style={{ background: tutorial.color }}
              >
                <div className="tutorial-icon">{tutorial.icon}</div>
                <h2 className="tutorial-title">{tutorial.title}</h2>
                <p className="tutorial-description">{tutorial.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="tutorial-navigation">
          {currentSlide > 0 && (
            <button className="tutorial-nav-btn prev" onClick={prevSlide}>
              <i className="fas fa-chevron-left"></i>
            </button>
          )}
          
          {currentSlide < tutorials.length - 1 ? (
            <button className="tutorial-nav-btn next" onClick={nextSlide}>
              <i className="fas fa-chevron-right"></i>
            </button>
          ) : (
            <button className="tutorial-finish-btn" onClick={onClose}>
              Get Started!
            </button>
          )}
        </div>

        {/* Swipe Hint */}
        <div className="tutorial-hint">
          <i className="fas fa-hand-pointer"></i>
          <span>Swipe or use arrows to navigate</span>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
