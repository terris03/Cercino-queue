// Local storage utilities for guest management
export const saveGuests = (guests) => {
  try {
    localStorage.setItem('cercino-guests', JSON.stringify(guests));
    return true;
  } catch (error) {
    console.error('Error saving guests:', error);
    return false;
  }
};

export const loadGuests = () => {
  try {
    const guests = localStorage.getItem('cercino-guests');
    return guests ? JSON.parse(guests) : [];
  } catch (error) {
    console.error('Error loading guests:', error);
    return [];
  }
};

export const addGuest = (guest) => {
  const guests = loadGuests();
  const newGuest = {
    id: Date.now().toString(),
    ...guest,
    createdAt: new Date(),
    lastUpdated: new Date()
  };
  guests.push(newGuest);
  saveGuests(guests);
  return newGuest;
};

export const updateGuest = (guestId, updates) => {
  const guests = loadGuests();
  const index = guests.findIndex(g => g.id === guestId);
  if (index !== -1) {
    guests[index] = {
      ...guests[index],
      ...updates,
      lastUpdated: new Date()
    };
    saveGuests(guests);
    return guests[index];
  }
  return null;
};

export const deleteGuest = (guestId) => {
  const guests = loadGuests();
  const filteredGuests = guests.filter(g => g.id !== guestId);
  saveGuests(filteredGuests);
  return filteredGuests;
};

export const addGuestsBatch = (newGuests) => {
  const existingGuests = loadGuests();
  const guestsWithIds = newGuests.map(guest => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    ...guest,
    createdAt: new Date(),
    lastUpdated: new Date()
  }));
  const allGuests = [...existingGuests, ...guestsWithIds];
  saveGuests(allGuests);
  return guestsWithIds;
};
