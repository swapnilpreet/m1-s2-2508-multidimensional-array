// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_oyrBr7GI4sPfXYikrbaOe8P48vhDanQ",
  authDomain: "agora-b9278.firebaseapp.com",
  projectId: "agora-b9278",
  storageBucket: "agora-b9278.firebasestorage.app",
  messagingSenderId: "893867366663",
  appId: "1:893867366663:web:720b898ca07482b2f20da2",
  measurementId: "G-8Y2TE8DXGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);