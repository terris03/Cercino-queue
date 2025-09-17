// Simple API endpoint for guest data
// This will be served as a static file and updated via fetch requests

const GUESTS_DATA = {
  guests: [],
  password: "1515",
  lastUpdated: null
};

// Function to get guests data
export const getGuests = async () => {
  try {
    const response = await fetch('/data/guests.json');
    if (response.ok) {
      const data = await response.json();
      return data.guests || [];
    }
    return [];
  } catch (error) {
    console.error('Error loading guests:', error);
    return [];
  }
};

// Function to save guests data
export const saveGuests = async (guests) => {
  try {
    const data = {
      guests: guests,
      password: "1515",
      lastUpdated: new Date().toISOString()
    };
    
    // For now, we'll use localStorage as fallback
    localStorage.setItem('cercino-guests-shared', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving guests:', error);
    return false;
  }
};

// Function to load guests from shared storage
export const loadSharedGuests = () => {
  try {
    const data = localStorage.getItem('cercino-guests-shared');
    if (data) {
      const parsed = JSON.parse(data);
      return parsed.guests || [];
    }
    return [];
  } catch (error) {
    console.error('Error loading shared guests:', error);
    return [];
  }
};
