import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyADUlaeggIJ-IFZmtdpujshZKjm95B85Vo",
  authDomain: "notes-app-6e1d8.firebaseapp.com",
  projectId: "notes-app-6e1d8",
  storageBucket: "notes-app-6e1d8.firebasestorage.app",
  messagingSenderId: "652215252472",
  appId: "1:652215252472:web:5ee3325e000c1076cc120d",
  measurementId: "G-37QXTVN71D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
