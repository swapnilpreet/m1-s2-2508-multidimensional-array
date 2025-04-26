import { fetchallproducts } from "./auth.js";
let role=localStorage.getItem('role');

if(role!=='user'){
    window.location.href="admindashboard.html"
}
 
window.addEventListener("DOMContentLoaded", () => {
  fetchallproducts();
});