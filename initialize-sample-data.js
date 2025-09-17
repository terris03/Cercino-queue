// Script to initialize sample guest data in Firestore
// Run this once to populate the database with sample guests

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

const sampleGuests = [
  { name: 'Melvin Edström', price: '100 kr', checkedIn: false },
  { name: 'Vilma Lundin', price: '100 kr', checkedIn: false },
  { name: 'Julia Rådenfjord', price: '100 kr', checkedIn: false },
  { name: 'Elin Karlsson', price: '100 kr', checkedIn: false },
  { name: 'Anna Svensson', price: '150 kr', checkedIn: false },
  { name: 'Erik Johansson', price: '100 kr', checkedIn: false },
  { name: 'Maria Andersson', price: '200 kr', checkedIn: false },
  { name: 'Lars Nilsson', price: '100 kr', checkedIn: false },
];

async function initializeData() {
  try {
    console.log('Initializing sample guest data...');
    
    for (const guest of sampleGuests) {
      await addDoc(collection(db, 'guests'), {
        ...guest,
        roomCode: '123',
        createdAt: new Date(),
        lastUpdated: new Date()
      });
    }
    
    console.log('Sample data initialized successfully!');
    console.log('You can now use room code "123" to access the guest list');
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}

initializeData();
