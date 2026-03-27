// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1LJw1WbQAeQWwnDOsFyv6BnC1iz3lAsM",
  authDomain: "challenge5-d361c.firebaseapp.com",
  projectId: "challenge5-d361c",
  storageBucket: "challenge5-d361c.firebasestorage.app",
  messagingSenderId: "268175020248",
  appId: "1:268175020248:web:4a9e69cb01f297472007ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
