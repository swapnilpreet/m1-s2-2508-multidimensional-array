import { useState } from "react";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import RecipeDetail from "./components/RecipeDetail";
import FavoritesList from "./components/FavoritesList";
import { MdFavoriteBorder } from "react-icons/md";
import "./App.css";

export default function App() {
  const [view, setView] = useState("search");
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await res.json();
      console.log("recipes", data)
      setRecipes(data?.meals || []);
      
    } catch (err) {
      console.log(err)
      setError("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {view === "search" && (
        <>
          <header>
            <h1>Recipe Finder <MdFavoriteBorder color="red"/> Dishcovery</h1>
            <button onClick={() => setView("favorites")}> View Favorites </button>
          </header>
          <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
          {loading && <p>Loading recipes...</p>}
          {error && <p className="error">{error}</p>}
          <div className="recipe-list">
            {recipes.length === 0 && !loading && <p>No recipes found</p>}
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                onClick={() => {
                  setSelectedRecipe(recipe.idMeal);
                  setView("detail");
                }}
              />
            ))}
          </div>
        </>
      )}

      {view === "detail" && (
        <RecipeDetail
          recipeId={selectedRecipe}
          onBack={() => setView("search")}
        />
      )}

      {view === "favorites" && (
        <FavoritesList
          onBack={() => setView("search")}
          onSelect={(id) => {
            setSelectedRecipe(id);
            setView("detail");
          }}
        />
      )}
    </div>
  );
}
