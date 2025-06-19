// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import { getDatabase }  from "firebase/database";

const firebaseConfig = {
 apiKey: "AIzaSyB_oyrBr7GI4sPfXYikrbaOe8P48vhDanQ",
  authDomain: "agora-b9278.firebaseapp.com",
  projectId: "agora-b9278",
  storageBucket: "agora-b9278.firebasestorage.app",
  messagingSenderId: "893867366663",
  appId: "1:893867366663:web:720b898ca07482b2f20da2",
  measurementId: "G-8Y2TE8DXGY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app,"https://agora-b9278-default-rtdb.asia-southeast1.firebasedatabase.app/");

export { auth, db };

