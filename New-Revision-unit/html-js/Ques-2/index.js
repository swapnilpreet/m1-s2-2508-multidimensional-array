const moviesContainer = document.getElementById("moviesContainer");
const loader = document.getElementById("loader");
const API_KEY = "d09f6c8c";
const SEARCH_TERM = "Avengers";

async function fetchMovies() {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${SEARCH_TERM}`);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

function renderMovies(movies) {
  moviesContainer.innerHTML = "";
  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/180x270?text=No+Image"}" alt="${movie.Title}">
      <div class="info">
        <h4>${movie.Title}</h4>
        <p>Year: ${movie.Year}</p>
        <p>Type: ${movie.Type}</p>
      </div>
    `;
    moviesContainer.appendChild(card);
  });
}

function init() {
  loader.style.display = "flex";
  setTimeout(async () => {
    const movies = await fetchMovies();
    loader.style.display = "none";
    renderMovies(movies);
  }, 5000);
}

init();
