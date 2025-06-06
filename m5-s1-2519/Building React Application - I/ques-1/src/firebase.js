import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBkxm2vpkqRz7g5iU6WpLT8M9nHRVxTcEw",
  authDomain: "new-project-9889a.firebaseapp.com",
  databaseURL: "https://new-project-9889a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "new-project-9889a",
  storageBucket: "new-project-9889a.firebasestorage.app",
  messagingSenderId: "179342359333",
  appId: "1:179342359333:web:6793b457ccae5d883bb8cc",
  measurementId: "G-BBQ3LKS7HC"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.database();
export default firebase;
