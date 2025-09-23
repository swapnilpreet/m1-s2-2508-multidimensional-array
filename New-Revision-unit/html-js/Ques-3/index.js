const productForm = document.getElementById("productForm");
const productTableBody = document.querySelector("#productTable tbody");

let products = JSON.parse(localStorage.getItem("products")) || [];

function renderTable() {
  productTableBody.innerHTML = "";
  products.forEach((product, index) => {
    const row = document.createElement("tr");
    const totalCost = product.totalCost || 0;
    const totalSell = product.totalSell || 0;
    const totalBenefit = product.totalBenefit || 0;

    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.quantity}</td>
      <td>${product.costPerUnit}</td>
      <td>${product.soldQuantity}</td>
      <td>${totalCost.toFixed(2)}</td>
      <td>${totalSell.toFixed(2)}</td>
      <td>${totalBenefit.toFixed(2)}</td>
      <td>
        <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
    productTableBody.appendChild(row);
  });
}

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("productName").value.trim();
  const quantity = parseFloat(document.getElementById("quantity").value) || 0;
  const costPerUnit = parseFloat(document.getElementById("costPerUnit").value) || 0;
  const soldQuantity = parseFloat(document.getElementById("soldQuantity").value) || 0;

  const totalCost = quantity * costPerUnit;

  products.push({
    name,
    quantity,
    costPerUnit,
    soldQuantity,
    totalCost,
    totalSell: 0,
    totalBenefit: 0
  });

  saveProducts();
  renderTable();
  productForm.reset();
});

function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(index, 1);
    saveProducts();
    renderTable();
  }
}

function editProduct(index) {
  const sold = prompt("Enter Sold Quantity:", products[index].soldQuantity);
  if (sold === null) return;
  const soldQuantity = parseFloat(sold) || 0;

  const totalSellInput = prompt("Enter Total Sell Amount:", products[index].totalSell) || 0;
  const totalSell = parseFloat(totalSellInput) || 0;

  const totalBenefit = totalSell - products[index].totalCost;

  products[index].soldQuantity = soldQuantity;
  products[index].totalSell = totalSell;
  products[index].totalBenefit = totalBenefit;

  saveProducts();
  renderTable();
}

renderTable();
