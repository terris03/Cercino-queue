import React, { useState, useEffect } from 'react';

const ShopPage = ({ onBackToLanding }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Sample events data - in real app this would come from Firebase
  const [events] = useState([
    {
      id: 1,
      title: "Summer Music Festival 2024",
      location: "Amsterdam",
      country: "Netherlands",
      date: "2024-07-15",
      time: "18:00",
      price: 45,
      currency: "€",
      category: "Music",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
      description: "Join us for the biggest summer music festival with top DJs and live performances.",
      capacity: 5000,
      sold: 3200,
      organizer: "Amsterdam Events"
    },
    {
      id: 2,
      title: "Tech Conference 2024",
      location: "Rotterdam",
      country: "Netherlands", 
      date: "2024-08-20",
      time: "09:00",
      price: 120,
      currency: "€",
      category: "Business",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
      description: "Leading tech conference featuring AI, blockchain, and startup innovations.",
      capacity: 800,
      sold: 450,
      organizer: "TechNL"
    },
    {
      id: 3,
      title: "Food & Wine Expo",
      location: "Utrecht",
      country: "Netherlands",
      date: "2024-09-10",
      time: "12:00",
      price: 25,
      currency: "€",
      category: "Food & Drink",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
      description: "Discover the finest local and international cuisine with wine tastings.",
      capacity: 1200,
      sold: 890,
      organizer: "Utrecht Culinary"
    },
    {
      id: 4,
      title: "Art Gallery Opening",
      location: "The Hague",
      country: "Netherlands",
      date: "2024-07-28",
      time: "19:30",
      price: 15,
      currency: "€",
      category: "Arts",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
      description: "Exclusive opening of contemporary art exhibition with local artists.",
      capacity: 200,
      sold: 150,
      organizer: "The Hague Arts"
    },
    {
      id: 5,
      title: "Sports Tournament",
      location: "Eindhoven",
      country: "Netherlands",
      date: "2024-08-05",
      time: "10:00",
      price: 35,
      currency: "€",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      description: "Annual sports tournament featuring football, basketball, and volleyball.",
      capacity: 2000,
      sold: 1200,
      organizer: "Eindhoven Sports"
    },
    {
      id: 6,
      title: "Comedy Night",
      location: "Amsterdam",
      country: "Netherlands",
      date: "2024-07-22",
      time: "20:00",
      price: 30,
      currency: "€",
      category: "Entertainment",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      description: "Stand-up comedy night featuring local and international comedians.",
      capacity: 300,
      sold: 250,
      organizer: "Amsterdam Comedy Club"
    },
    {
      id: 7,
      title: "Jazz Festival",
      location: "Rotterdam",
      country: "Netherlands",
      date: "2024-08-12",
      time: "19:00",
      price: 40,
      currency: "€",
      category: "Music",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      description: "Three-day jazz festival with world-renowned musicians.",
      capacity: 1500,
      sold: 980,
      organizer: "Rotterdam Jazz Society"
    },
    {
      id: 8,
      title: "Startup Pitch Night",
      location: "Utrecht",
      country: "Netherlands",
      date: "2024-07-30",
      time: "18:30",
      price: 20,
      currency: "€",
      category: "Business",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400",
      description: "Watch innovative startups pitch their ideas to investors.",
      capacity: 400,
      sold: 320,
      organizer: "Utrecht Innovation Hub"
    },
    {
      id: 9,
      title: "Beer Festival",
      location: "Eindhoven",
      country: "Netherlands",
      date: "2024-08-18",
      time: "14:00",
      price: 35,
      currency: "€",
      category: "Food & Drink",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
      description: "Taste over 100 different craft beers from local breweries.",
      capacity: 800,
      sold: 650,
      organizer: "Eindhoven Brewers"
    },
    {
      id: 10,
      title: "Fashion Show",
      location: "Amsterdam",
      country: "Netherlands",
      date: "2024-09-05",
      time: "20:00",
      price: 50,
      currency: "€",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      description: "Exclusive fashion show featuring Dutch designers.",
      capacity: 200,
      sold: 180,
      organizer: "Amsterdam Fashion Week"
    },
    {
      id: 11,
      title: "Photography Workshop",
      location: "The Hague",
      country: "Netherlands",
      date: "2024-08-25",
      time: "10:00",
      price: 75,
      currency: "€",
      category: "Education",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
      description: "Learn professional photography techniques from experts.",
      capacity: 50,
      sold: 35,
      organizer: "The Hague Photo School"
    },
    {
      id: 12,
      title: "Dance Battle",
      location: "Rotterdam",
      country: "Netherlands",
      date: "2024-07-25",
      time: "19:30",
      price: 25,
      currency: "€",
      category: "Entertainment",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400",
      description: "Watch the best dancers compete in this epic battle.",
      capacity: 600,
      sold: 480,
      organizer: "Rotterdam Dance Academy"
    },
    {
      id: 13,
      title: "Wine Tasting",
      location: "Utrecht",
      country: "Netherlands",
      date: "2024-08-08",
      time: "19:00",
      price: 45,
      currency: "€",
      category: "Food & Drink",
      image: "https://images.unsplash.com/photo-1506377247885-7e6d8f3d6d0e?w=400",
      description: "Premium wine tasting with sommelier guidance.",
      capacity: 80,
      sold: 65,
      organizer: "Utrecht Wine Society"
    },
    {
      id: 14,
      title: "Gaming Tournament",
      location: "Eindhoven",
      country: "Netherlands",
      date: "2024-09-15",
      time: "12:00",
      price: 30,
      currency: "€",
      category: "Gaming",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400",
      description: "Competitive gaming tournament with cash prizes.",
      capacity: 200,
      sold: 150,
      organizer: "Eindhoven Gaming Center"
    },
    {
      id: 15,
      title: "Yoga Retreat",
      location: "Amsterdam",
      country: "Netherlands",
      date: "2024-08-30",
      time: "09:00",
      price: 60,
      currency: "€",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
      description: "Full-day yoga retreat in beautiful park setting.",
      capacity: 100,
      sold: 85,
      organizer: "Amsterdam Yoga Studio"
    },
    {
      id: 16,
      title: "Poetry Reading",
      location: "The Hague",
      country: "Netherlands",
      date: "2024-07-18",
      time: "20:30",
      price: 15,
      currency: "€",
      category: "Arts",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      description: "Intimate poetry reading with local and international poets.",
      capacity: 150,
      sold: 120,
      organizer: "The Hague Literary Society"
    },
    {
      id: 17,
      title: "Rock Concert",
      location: "Rotterdam",
      country: "Netherlands",
      date: "2024-09-20",
      time: "21:00",
      price: 55,
      currency: "€",
      category: "Music",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      description: "Epic rock concert featuring international bands.",
      capacity: 3000,
      sold: 2500,
      organizer: "Rotterdam Rock Festival"
    },
    {
      id: 18,
      title: "Cooking Class",
      location: "Utrecht",
      country: "Netherlands",
      date: "2024-08-14",
      time: "18:00",
      price: 40,
      currency: "€",
      category: "Education",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      description: "Learn to cook authentic Dutch cuisine with professional chefs.",
      capacity: 30,
      sold: 25,
      organizer: "Utrecht Culinary School"
    },
    {
      id: 19,
      title: "Marathon Run",
      location: "Eindhoven",
      country: "Netherlands",
      date: "2024-09-22",
      time: "08:00",
      price: 45,
      currency: "€",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      description: "Annual city marathon through beautiful Eindhoven streets.",
      capacity: 5000,
      sold: 4200,
      organizer: "Eindhoven Running Club"
    },
    {
      id: 20,
      title: "Art Workshop",
      location: "Amsterdam",
      country: "Netherlands",
      date: "2024-08-02",
      time: "14:00",
      price: 35,
      currency: "€",
      category: "Arts",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
      description: "Create your own masterpiece with guidance from local artists.",
      capacity: 40,
      sold: 30,
      organizer: "Amsterdam Art Studio"
    },
    {
      id: 8,
      title: "Gaming Convention",
      location: "Brussels",
      country: "Belgium",
      date: "2024-09-05",
      time: "10:00",
      price: 55,
      currency: "€",
      category: "Gaming",
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400",
      description: "Largest gaming convention in Belgium with tournaments and new releases.",
      capacity: 3000,
      sold: 2100,
      organizer: "Belgium Gaming"
    }
  ]);

  const cities = ['All Cities', 'Amsterdam', 'Rotterdam', 'Utrecht', 'The Hague', 'Eindhoven', 'Berlin', 'Brussels'];
  const categories = ['All Events', 'Music', 'Business', 'Food & Drink', 'Arts', 'Sports', 'Entertainment', 'Fashion', 'Gaming'];

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode this to get city name
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  }, []);

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCity = selectedCity === 'All Cities' || event.location === selectedCity;
    const matchesCategory = selectedCategory === 'All Events' || event.category === selectedCategory;
    
    return matchesSearch && matchesCity && matchesCategory;
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date) - new Date(b.date);
      case 'price':
        return a.price - b.price;
      case 'popularity':
        return (b.sold / b.capacity) - (a.sold / a.capacity);
      default:
        return 0;
    }
  });

  const handleBookEvent = (eventId) => {
    alert(`Booking event: ${events.find(e => e.id === eventId)?.title}\n\nThis would redirect to the booking page!`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getSoldPercentage = (sold, capacity) => {
    return Math.round((sold / capacity) * 100);
  };

  return (
    <div className="shop-page">
      {/* Navigation Header */}
      <header className="shop-nav-header">
        <div className="nav-container">
          <div className="nav-left">
            <button className="back-btn" onClick={onBackToLanding}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <div className="logo">CERCINO</div>
          </div>
          
          <div className="nav-center">
            <div className="nav-links">
              <a href="#" className="nav-link active">Home</a>
              <a href="#" className="nav-link">Search</a>
              <a href="#" className="nav-link">Top Picks</a>
              <a href="#" className="nav-link">Giveaways</a>
              <a href="#" className="nav-link">Just Announced</a>
              <a href="#" className="nav-link">All Cities</a>
            </div>
          </div>
          
          <div className="nav-right">
            <div className="search-container">
              <input type="text" placeholder="Search events..." className="nav-search" />
              <i className="fas fa-search"></i>
            </div>
            <div className="nav-icons">
              <i className="fas fa-bell"></i>
              <i className="fas fa-heart"></i>
              <div className="user-avatar"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="shop-layout">
        {/* Main Content */}
        <main className="shop-main-content">
          {/* Scrollable Events Feed */}
          <div className="events-feed">
            {events.map((event, index) => (
              <div key={event.id} className="event-card">
                <div className="event-card-image">
                  <img src={event.image} alt={event.title} />
                  <div className="event-badges">
                    {index < 3 && <span className="trending-badge">🔥 Trending</span>}
                    <span className="category-badge">{event.category}</span>
                  </div>
                  <div className="event-actions">
                    <button className="heart-btn">
                      <i className="fas fa-heart"></i>
                    </button>
                    <button className="share-btn">
                      <i className="fas fa-share"></i>
                    </button>
                  </div>
                </div>
                
                <div className="event-card-content">
                  <div className="event-header">
                    <h3 className="event-title">{event.title}</h3>
                    <div className="event-price">{event.currency}{event.price}</div>
                  </div>
                  
                  <div className="event-meta">
                    <div className="event-date">
                      <i className="fas fa-calendar"></i>
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="event-time">
                      <i className="fas fa-clock"></i>
                      <span>{event.time}</span>
                    </div>
                    <div className="event-location">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="event-organizer">
                    <span>by {event.organizer}</span>
                  </div>
                  
                  <div className="event-stats">
                    <div className="event-followers">
                      <span>{Math.floor(Math.random() * 5000) + 1000} following</span>
                    </div>
                    <div className="event-availability">
                      <span>{Math.floor(Math.random() * 50) + 10} tickets left</span>
                    </div>
                  </div>
                  
                  <div className="event-actions-bottom">
                    <button className="bookmark-btn">
                      <i className="far fa-bookmark"></i>
                      Save
                    </button>
                    <button className="buy-btn">
                      Get Tickets
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
