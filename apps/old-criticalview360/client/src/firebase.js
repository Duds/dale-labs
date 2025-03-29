// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt-Gl0fUHSXVfQg6BIhrPuQIUVMQ87APY",
  authDomain: "criticalview360.firebaseapp.com",
  projectId: "criticalview360",
  storageBucket: "criticalview360.appspot.com",
  messagingSenderId: "1037478582552",
  appId: "1:1037478582552:web:9279785975ddf40706e66d",
  measurementId: "G-5E8DJPGP5D"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

export const register = async ({ email, password }) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error('Registration Error:', error);
    return false;
  }
};

export const login = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error('Login Error:', error);
    return false;
  }
};