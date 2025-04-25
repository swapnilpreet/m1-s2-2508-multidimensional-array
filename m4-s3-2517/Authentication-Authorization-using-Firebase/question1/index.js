import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDYyvxoIovpI-2NMUDxRVMcq65HL9SPEBw",
  authDomain: "auth-12313.firebaseapp.com",
  projectId: "auth-12313",
  storageBucket: "auth-12313.firebasestorage.app",
  messagingSenderId: "567844455079",
  appId: "1:567844455079:web:bac52b2f4233959d24d182",
  measurementId: "G-RCZ784SQR9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);


document.getElementById('registerForm')?.addEventListener('submit',(e)=>{
    e.preventDefault();
    let name=document.getElementById('register-name').value;
    let email=document.getElementById('register-email').value;
    let password=document.getElementById('register-password').value;

    // console.log(name,email,password)

    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredentials)=>{
        // console.log(userCredentials)
        alert("Registration Successful! Please log in.",)
        window.location.href="login.html"
        const user = userCredentials.user;
        return updateProfile(user, {
            displayName: name
        });
    })
    .catch((error)=>{
        console.log(error.message)
    })
})

document.getElementById('loginForm')?.addEventListener('submit',(e)=>{
    e.preventDefault();
    let email=document.getElementById('login-email').value;
    let password=document.getElementById('login-password').value;
    // console.log(email,password);
    signInWithEmailAndPassword(auth,email,password)
    .then(()=>{
        localStorage.setItem("user-auth",true)
        alert("Wrong credentials! Try again.")
        window.location.href="index.html"
    })
    .catch((error)=>{
        console.log(error.message);
    })
})

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        // console.log("User:", user);
        const currentPage = window.location.pathname;
        let users=localStorage.getItem('user-auth');
        if (user && users){
            if(currentPage.endsWith("login.html")) {
                window.location.href = "index.html";
            }
        }else{
            if (
                currentPage.endsWith("index.html") ||
                currentPage.endsWith("dashboard.html")
            ){
                window.location.href = "login.html";
            }
        }
    });
});


document.getElementById('logout').addEventListener('click',()=>{
    signOut(auth)
    .then(()=>{
        localStorage.removeItem('user-auth');
        alert("Logged out successfully")
    })
    .catch((error)=>{
        console.log(error.message)
    })
})