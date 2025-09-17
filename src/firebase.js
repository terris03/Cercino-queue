import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB3Q2B-zbCehd_9LZvdIB_T6ZkgHqTlw1M",
  authDomain: "cercino-queue.firebaseapp.com",
  projectId: "cercino-queue",
  storageBucket: "cercino-queue.firebasestorage.app",
  messagingSenderId: "217220700501",
  appId: "1:217220700501:web:fd8102f98e0255a3c0b7dc",
  measurementId: "G-H7356FG4GZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom database name
export const db = getFirestore(app, 'cercino-db');

// Initialize Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app };
