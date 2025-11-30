const input = document.getElementById("suggestion-input");
const suggestionBox = document.getElementById("suggestion-box");
const productBox = document.getElementById("product-details");

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

async function fetchSuggestions(query) {
  if (!query.trim()) {
    suggestionBox.style.display = "none";
    return;
  }

  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  // PARTIAL MATCH SEARCH
  const filtered = data.filter((pro) =>
    pro.category.toLowerCase().includes(query.toLowerCase())
  );

  renderSuggestions(filtered);
}

function renderSuggestions(list) {
  console.log(list);
  if(list.length===0){
    suggestionBox.style.display="none";
    return;
  }

  suggestionBox.innerHTML="";

  list.forEach((item)=>{
    const div=document.createElement("div");
    div.textContent=item.title;
    div.style.padding="6px";
    div.style.cursor = "pointer";
    div.style.borderBottom = "1px solid #eee";

    // 👉 Show product on same page
    // div.onclick = () => {
    //   showProduct(item);
    //   suggestionBox.style.display = "none"; // hide suggestions after click
    //   input.value = item.title;
    // };

     div.onclick = () => {
      window.location.href = `product.html?id=${item.id}`;
    };

    suggestionBox.appendChild(div);
  });

  suggestionBox.style.display = "block";
}

// ⭐ Show product details IN SAME PAGE
function showProduct(product) {
  productBox.style.display = "block";
  productBox.innerHTML = `
    <div style="margin-top: 20px; border:1px solid #ddd; padding:15px; width:300px;">
      <h2>${product.title}</h2>
      <img src="${product.image}" width="150" />
      <p><b>Price:</b> $${product.price}</p>
      <p><b>Category:</b> ${product.category}</p>
      <p>${product.description}</p>
    </div>
  `;
}

const handleInput = debounce((e) => {
  productBox.style.display = "none";
  fetchSuggestions(e.target.value);
}, 500);

input.addEventListener("input", handleInput);
