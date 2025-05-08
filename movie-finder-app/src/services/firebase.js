// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfV5iaaDvwFNtDb3bERC7QqTm4IgWePf0",
  authDomain: "hypermovies-4346e.firebaseapp.com",
  projectId: "hypermovies-4346e",
  storageBucket: "hypermovies-4346e.firebasestorage.app",
  messagingSenderId: "723050409118",
  appId: "1:723050409118:web:d57deb66464aacd86b9f8f",
  measurementId: "G-GRGBQZK867"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };