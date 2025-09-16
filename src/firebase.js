// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };
