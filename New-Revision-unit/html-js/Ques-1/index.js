const mealsContainer = document.getElementById("mealsContainer");
const paginationContainer = document.getElementById("pagination");
const sortSelect = document.getElementById("sortSelect");
const categorySelect = document.getElementById("categorySelect");

let allMeals = [];
let filteredMeals = [];
let currentPage = 1;
const itemsPerPage = 5;

async function fetchMeals() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  const data = await response.json();
  allMeals = data.meals || [];
  filteredMeals = [...allMeals];
  populateCategories();
  render();
}

function populateCategories() {
  const categories = [...new Set(allMeals.map((meal) => meal.strCategory))];
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function renderMeals(meals) {
  mealsContainer.innerHTML = "";
  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.className = "meal";
    div.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h4>${meal.strMeal}</h4>
      <p>${meal.strCategory}</p>
    `;
    mealsContainer.appendChild(div);
  });
}

function renderPagination(totalItems) {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return;
  const firstBtn = document.createElement("button");
  firstBtn.textContent = "<< First";
  firstBtn.onclick = () => goToPage(1);
  paginationContainer.appendChild(firstBtn);
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + 4);
  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }
  for (let i = start; i <= end; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => goToPage(i);
    paginationContainer.appendChild(btn);
  }
  const lastBtn = document.createElement("button");
  lastBtn.textContent = "Last >>";
  lastBtn.onclick = () => goToPage(totalPages);
  paginationContainer.appendChild(lastBtn);
}

function goToPage(page) {
  currentPage = page;
  render();
}

function applySorting() {
  const value = sortSelect.value;
  if (value === "name") {
    filteredMeals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
  } else if (value === "reverse") {
    filteredMeals.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
  }
}

function applyFiltering() {
  const category = categorySelect.value;
  if (category === "all") {
    filteredMeals = [...allMeals];
  } else {
    filteredMeals = allMeals.filter((meal) => meal.strCategory === category);
  }
}

function render() {
  applyFiltering();
  applySorting();

  const totalItems = filteredMeals.length;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const mealsToShow = filteredMeals.slice(start, end);

  renderMeals(mealsToShow);
  renderPagination(totalItems);
}

sortSelect.addEventListener("change", () => {
  currentPage = 1;
  render();
});
categorySelect.addEventListener("change", () => {
  currentPage = 1;
  render();
});

fetchMeals();
