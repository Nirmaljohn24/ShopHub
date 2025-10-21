import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
// Users need to replace these with their own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD8bw6oKZxTZEsf0NqLEFu3-KwWWg_xQLM",
  authDomain: "productmanagement-a8c02.firebaseapp.com",
  projectId: "productmanagement-a8c02",
  storageBucket: "productmanagement-a8c02.firebasestorage.app",
  messagingSenderId: "282895874009",
  appId: "1:282895874009:web:dba8d268e92d5af2d28bc8",
  measurementId: "G-98MWEZNTQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
