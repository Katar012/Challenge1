// Import the functions you need from the SDKs you need
import {getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0fYt7lyhYrLtWMcsDRUvXMcj7xxzPbfo",
  authDomain: "parcial2-faad8.firebaseapp.com",
  projectId: "parcial2-faad8",
  databaseURL: "https://parcial2-faad8-default-rtdb.firebaseio.com/",
  storageBucket: "parcial2-faad8.firebasestorage.app",
  messagingSenderId: "937178650114",
  appId: "1:937178650114:web:e76b6c8b945821a2e0b91b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firebaseStorage = getStorage(app);
const db = getFirestore(app);

export { auth, app, firebaseStorage, db };