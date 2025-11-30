const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadProduct() {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();
  document.getElementById("product").innerHTML = `
    <h2>${product.title}</h2>
    <img src="${product.image}" width="200" />
    <p><b>Price:</b> $${product.price}</p>
    <p><b>Category:</b> ${product.category}</p>
    <p>${product.description}</p>
  `;
}

loadProduct();
