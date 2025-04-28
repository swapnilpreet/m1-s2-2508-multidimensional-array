let displaygallery = document.getElementById("display-gallery");
let spinner = document.getElementById("spinner");
let filter = document.getElementById("filter");
let sort = document.getElementById("sort");
let pagination = document.getElementById("pagination");

let products = [];

async function fetchallproducts() {
  spinner.style.display = "block";
  try {
    const response = await fetch(
      "https://dummyjson.com/products/category/home-decoration"
    );
    const data = await response.json();
    console.log(data);
    products = data.products;
    displayData();
  } catch (error) {
    spinner.style.display = "none";
  }
}

function displayData() {
  //   console.log("products", products);
  spinner.style.display = "none";
  let copyproducts = [...products];

  const filterbymaterial = filter.value.toLowerCase();
  if (filterbymaterial) {
    copyproducts = copyproducts.filter((product) =>
      product.description.toLowerCase().includes(filterbymaterial)
    );
  }
  // console.log("copyproducts",copyproducts)
  if (sort.value === "low") {
    copyproducts.sort((a, b) => a.price - b.price);
  } else {
    copyproducts.sort((a, b) => b.price - a.price);
  }

  copyproducts.forEach((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" width="100">
      <h3>${product.title}</h3>
      <p>Price: $${product.price}</p>
    `;
    displaygallery.appendChild(div);
  });
}

filter.addEventListener("change", () => {
  displayData();
});
sort.addEventListener("change", () => {
  displayData();
});

fetchallproducts();
