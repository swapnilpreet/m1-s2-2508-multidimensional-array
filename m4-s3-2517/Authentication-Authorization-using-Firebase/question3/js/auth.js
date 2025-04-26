import { auth, db } from "../firebase-config.js";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export async function fetchallproducts() {
  const productsContainer = document.getElementById("productsContainer");
  if (!productsContainer) return;
  productsContainer.innerHTML = "";
  const role = localStorage.getItem("role");
  const querySnapshot = await getDocs(collection(db, "products"));

  querySnapshot.forEach((ele) => {
    const product = ele.data();
    const id = ele.id;

    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}" width="100">
      <h3>${product.title}</h3>
      <p>Price: $${product.price}</p>
      ${role === "Admin"? `<button onclick="editProduct('${id}', '${product.title}', '${product.price}', '${product.image}')">Edit</button>
        <button onclick="deleteProduct('${id}')">Delete</button>`: ""}
    `;
    productsContainer.appendChild(div);
  });
}
 
window.editProduct = async function (id, oldtitle, oldprice, oldimage) {
  document.getElementById("product-id").value = id;
  document.getElementById("product-title").value = oldtitle;
  document.getElementById("product-price").value = oldprice;
  document.getElementById("product-image").value = oldimage;

  document.getElementById("addproductbtn").style.display = "none";
  document.getElementById("updateproductbtn").style.display = "inline-block";
};

window.deleteProduct = async function (id) {
  const confirmDelete = confirm("Are you sure you want to delete this product?");
  if (confirmDelete) {
    try {
      await deleteDoc(doc(db, "products", id));
      alert("Product Deleted Successfully!");
      fetchallproducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
};
 
function clearinputform() {
  document.getElementById("product-id").value = "";
  document.getElementById("product-title").value = "";
  document.getElementById("product-price").value = "";
  document.getElementById("product-image").value = "";
}
 


document.addEventListener("DOMContentLoaded", () => {
  let loginbtn = document.getElementById("login-btn");
  let signupbtn = document.getElementById("signup-btn");
  let logoutbtn = document.getElementById("logout-btn");
  let addproductbtn = document.getElementById("addproductbtn");
  let updateproductbtn = document.getElementById("updateproductbtn");

  if (loginbtn) {
    loginbtn.addEventListener("click", async () => {
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const role = userData.role;
          localStorage.setItem("role", role);
          if (role === "Admin") {
            window.location.href = "admindashboard.html";
          } else {
            window.location.href = "userdashboard.html";
          }
        } else {
          console.error("No user document found!");
        }
      } catch (error) {
        console.log(error.message);
        alert("Incorrect email or password!");
      }
    });
  }
  if (signupbtn) {
    signupbtn.addEventListener("click", async () => {
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const role = document.getElementById("role").value;

      try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredentials.user.uid), {
          email,
          role,
        });
        window.location.href = "index.html";
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    });
  }
  if (logoutbtn) {
    logoutbtn.addEventListener("click", async () => {
      await signOut(auth);
      localStorage.removeItem("role");
      window.location.href = "index.html";
    });
  }
  if (addproductbtn) {
    addproductbtn.addEventListener("click", async () => {
      const title = document.getElementById("product-title").value;
      const price = document.getElementById("product-price").value;
      const image = document.getElementById("product-image").value;

      if (!title || !price || !image) {
        alert("Please fill all fields!");
        return;
      }

      try {
        await addDoc(collection(db, "products"), {
          title,
          price: Number(price),
          image,
          createdAt: new Date(),
        });
        alert("Product Added Successfully!");
        clearinputform();
        fetchallproducts();
      } catch (error) {
        console.error("Error adding product:", error.message);
      }
    });
  }
  if (updateproductbtn) {
    updateproductbtn.addEventListener("click", async () => {
      const id = document.getElementById("product-id").value;
      const newtitle = document.getElementById("product-title").value;
      const newprice = document.getElementById("product-price").value;
      const newimage = document.getElementById("product-image").value;

      if (!newtitle || !newprice || !newimage) {
        alert("Please fill all fields!");
        return;
      }

      try {
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, {
          title: newtitle,
          price: Number(newprice),
          image: newimage,
        });
        alert("Product Updated Successfully!");
        clearinputform();
        fetchallproducts();

        document.getElementById("addproductbtn").style.display = "inline-block";
        document.getElementById("updateproductbtn").style.display = "none";
      } catch (error) {
        console.log(error.message)
        console.error("Error updating product:", error.message);
      }
    });
  }
});

