// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqob8Jf2fGzZEMw81HAW7aWiybWWIhpiU",
  authDomain: "clone-c5172.firebaseapp.com",
  projectId: "clone-c5172",
  storageBucket: "clone-c5172.firebasestorage.app",
  messagingSenderId: "667029342139",
  appId: "1:667029342139:web:d9a7c6100e83c6c927269e",
  measurementId: "G-D0P84TTYBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);