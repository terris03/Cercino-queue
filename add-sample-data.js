import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqQZJqZJqZJqZJqZJqZJqZJqZJqZJqZJqZ",
  authDomain: "cercino-queue.firebaseapp.com",
  projectId: "cercino-queue",
  storageBucket: "cercino-queue.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789",
  measurementId: "G-ABCDEF1234"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, 'cercino-db');

const sampleGuests = [
  { name: "John Doe", price: "150 kr", checkedIn: false, roomCode: "123", createdAt: new Date(), lastUpdated: new Date() },
  { name: "Jane Smith", price: "200 kr", checkedIn: true, roomCode: "123", createdAt: new Date(), lastUpdated: new Date() },
  { name: "Mike Johnson", price: "100 kr", checkedIn: false, roomCode: "123", createdAt: new Date(), lastUpdated: new Date() },
  { name: "Sarah Wilson", price: "180 kr", checkedIn: true, roomCode: "123", createdAt: new Date(), lastUpdated: new Date() },
  { name: "David Brown", price: "220 kr", checkedIn: false, roomCode: "123", createdAt: new Date(), lastUpdated: new Date() }
];

async function addSampleData() {
  try {
    const guestsRef = collection(db, 'guests');
    
    for (const guest of sampleGuests) {
      await addDoc(guestsRef, guest);
      console.log('Added guest:', guest.name);
    }
    
    console.log('Successfully added sample data!');
  } catch (error) {
    console.error('Error adding sample data:', error);
  }
}

addSampleData();
