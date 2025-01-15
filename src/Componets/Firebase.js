// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {  doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2puJbQI-TzBg77m-tlzbKr_x73olX4hA",
  authDomain: "atmostrip-f14ad.firebaseapp.com",
  projectId: "atmostrip-f14ad",
  storageBucket: "atmostrip-f14ad.firebasestorage.app",
  messagingSenderId: "518388406821",
  appId: "1:518388406821:web:115a0147b7a1f14c5ffdcc",
  measurementId: "G-J1TPP3SET9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
export default db;
export {doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove};
