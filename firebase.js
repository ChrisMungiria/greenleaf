// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQDMpbif-76wgjnt_g4cDY-tZp1Oiq7lI",
  authDomain: "greenleaf-40277.firebaseapp.com",
  projectId: "greenleaf-40277",
  storageBucket: "greenleaf-40277.appspot.com",
  messagingSenderId: "1089188375632",
  appId: "1:1089188375632:web:5d5e5c79c458a6ced2b555",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firebase auth
export const auth = getAuth();

//initialize firestore
export const db = getFirestore(app);
