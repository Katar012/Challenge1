// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1LJw1WbQAeQWwnDOsFyv6BnC1iz3lAsM",
  authDomain: "challenge5-d361c.firebaseapp.com",
  databaseURL: "https://challenge5-d361c-default-rtdb.firebaseio.com",
  projectId: "challenge5-d361c",
  storageBucket: "challenge5-d361c.firebasestorage.app",
  messagingSenderId: "268175020248",
  appId: "1:268175020248:web:4a9e69cb01f297472007ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const firebaseStorage = getStorage(app);

const db = getFirestore();

const rtdb = getDatabase(app);

export { app, auth, firebaseStorage, db, rtdb };
