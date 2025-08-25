const API_BASE = "https://www.themealdb.com/api/json/v1/1";
const mealGrid = document.getElementById("mealGrid");
const loader = document.getElementById("loader");
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");
const categoryFilter = document.getElementById("categoryFilter");
const sortDropdown = document.getElementById("sortDropdown");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

let allMeals = [];
let filteredMeals = [];
let currentPage = 1;
const itemsPerPage = 8;
let throttleTimeout = false;
function toggleLoader(show) {
  loader.classList.toggle("hidden", !show);
}

async function loadCategories() {
  const res = await fetch(`${API_BASE}/list.php?c=list`);
  const data = await res.json();
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  data.meals.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.strCategory;
    opt.textContent = c.strCategory;
    categoryFilter.appendChild(opt);
  });
}

async function loadMeals(letter = "a") {
  toggleLoader(true);
  const res = await fetch(`${API_BASE}/search.php?f=${letter}`);
  const data = await res.json();
  allMeals = data.meals || [];
  applyFilters();
  toggleLoader(false);
}

function renderMeals() {
  mealGrid.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const pageMeals = filteredMeals.slice(start, start + itemsPerPage);

  pageMeals.forEach(m => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${m.strMealThumb}" alt="${m.strMeal}" />
      <div class="card-body">
        <h3>${m.strMeal}</h3>
        <p>${m.strCategory}</p>
      </div>`;
    mealGrid.appendChild(card);
  });

  pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(filteredMeals.length / itemsPerPage)}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === Math.ceil(filteredMeals.length / itemsPerPage);
}

function applyFilters() {
  let meals = [...allMeals];
  const category = categoryFilter.value;
  if (category !== "all") {
    meals = meals.filter(m => m.strCategory === category);
  }

  const sort = sortDropdown.value;
  if (sort === "name-asc") meals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
  if (sort === "name-desc") meals.sort((a, b) => b.strMeal.localeCompare(a.strMeal));

  filteredMeals = meals;
  currentPage = 1;
  renderMeals();
}

function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

function throttle(fn, delay) {
  if (throttleTimeout) return;
  throttleTimeout = true;
  fn();
  setTimeout(() => (throttleTimeout = false), delay);
}

const handleSearch = debounce(async (query) => {
  if (!query) {
    suggestionsBox.style.display = "block";
    return;
  }
  const res = await fetch(`${API_BASE}/search.php?s=${query}`);
  const data = await res.json();
  const results = data.meals || [];
  suggestionsBox.innerHTML = "";
  if (results.length) {
    suggestionsBox.style.display = "block";
    results.forEach(m => {
      const div = document.createElement("div");
      div.textContent = m.strMeal;
      div.onclick = () => {
        suggestionsBox.style.display = "none";
        allMeals = [m];
        applyFilters();
      };
      suggestionsBox.appendChild(div);
    });
  } else {
    suggestionsBox.style.display = "none";
  }
}, 500);

searchInput.addEventListener("input", e => handleSearch(e.target.value));
categoryFilter.addEventListener("change", applyFilters);
sortDropdown.addEventListener("change", applyFilters);
prevBtn.addEventListener("click", () => throttle(() => { currentPage--; renderMeals(); }, 800));
nextBtn.addEventListener("click", () => throttle(() => { currentPage++; renderMeals(); }, 800));

loadCategories();
loadMeals("c");
