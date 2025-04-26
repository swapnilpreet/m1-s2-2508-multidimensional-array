import { fetchallproducts } from "./auth.js";
let role = localStorage.getItem('role');

if(role !== 'Admin'){
    window.location.href='userdashboard.html'
}

window.addEventListener("DOMContentLoaded", () => {
  fetchallproducts();
});