import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB3Q2B-zbCehd_9LZvdIB_T6ZkgHqTlw1M",
  authDomain: "cercino-queue.firebaseapp.com",
  projectId: "cercino-queue",
  storageBucket: "cercino-queue.firebasestorage.app",
  messagingSenderId: "217220700501",
  appId: "1:217220700501:web:fd8102f98e0255a3c0b7dc",
  measurementId: "G-H7356FG4GZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Try to read existing data
    const guestsRef = collection(db, 'guests');
    const snapshot = await getDocs(guestsRef);
    console.log('Existing guests:', snapshot.docs.length);
    
    // Add a test guest
    const testGuest = {
      name: "Test Guest",
      price: "100 kr",
      checkedIn: false,
      roomCode: "123",
      createdAt: new Date(),
      lastUpdated: new Date()
    };
    
    const docRef = await addDoc(guestsRef, testGuest);
    console.log('Successfully added test guest with ID:', docRef.id);
    
    // Read it back
    const newSnapshot = await getDocs(guestsRef);
    console.log('Total guests after adding:', newSnapshot.docs.length);
    
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testConnection();
