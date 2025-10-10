import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCqob8Jf2fGzZEMw81HAW7aWiybWWIhpiU",
  authDomain: "clone-c5172.firebaseapp.com",
  projectId: "clone-c5172",
  storageBucket: "clone-c5172.firebasestorage.app",
  messagingSenderId: "667029342139",
  appId: "1:667029342139:web:d9a7c6100e83c6c927269e",
  measurementId: "G-D0P84TTYBQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);