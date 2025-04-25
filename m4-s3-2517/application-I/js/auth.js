import { auth, db } from "../firebase-config.js";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import {doc,getDoc,setDoc} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded",()=>{
    const loginbtn=document.getElementById('login-btn');
    const signupbtn=document.getElementById('signup-btn');
    const logoutbtn=document.getElementById('logout-btn');

    if(loginbtn){
        loginbtn.addEventListener("click",async()=>{
            const email=document.getElementById('login-email').value;
            const password=document.getElementById('login-password').value;

            try {
                await signInWithEmailAndPassword(auth,email,password)
                window.open("dashboard.html",'_black')
            } catch (error) {
                document.getElementById('login-message').innerText=error.message
            }
        })
    }

    if(signupbtn){
        signupbtn.addEventListener('click',async()=>{
            const email=document.getElementById('signup-email').value;
            const password=document.getElementById('signup-password').value;
            const role=document.getElementById('role').value;

            try {
                const userCredentials= await createUserWithEmailAndPassword(auth,email,password)
                await setDoc(doc(db,'users',userCredentials.user.uid),{email,role});
                window.location.href="index.html"
            } catch (error) {
                document.getElementById('login-message').innerText=error.message
            }
        })
    }

    if(logoutbtn){
        logoutbtn.addEventListener('click',async()=>{
            await signOut(auth);
            window.location.href='index.html'
        })
    }
})