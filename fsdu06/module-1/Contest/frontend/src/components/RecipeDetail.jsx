import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { FaArrowLeft } from "react-icons/fa6";
import "../styles/RecipeDetail.css";

export default function RecipeDetail({ recipeId, onBack }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        );
        const data = await res.json();
        setRecipe(data.meals[0]);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  useEffect(() => {
    const checkFavorite = async () => {
      const docRef = doc(db, "favoriteRecipes", recipeId);
      const docSnap = await getDoc(docRef);
      setIsFavorite(docSnap.exists());
    };
    checkFavorite();
  }, [recipeId]);

  const toggleFavorite = async () => {
    if (!recipe) return;

    const docRef = doc(db, "favoriteRecipes", recipeId);
    if (isFavorite) {
      await deleteDoc(docRef);
      setIsFavorite(false);
    } else {
      await setDoc(docRef, {
        id: recipe.idMeal,
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      });
      setIsFavorite(true);
    }
  };

  if (loading) return <p>Loading recipe details...</p>;
  if (!recipe) return <p>Recipe not found</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <div className="recipe-detail">
      <button className="back-btn" onClick={onBack}><FaArrowLeft /> Back to Search</button>
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="detail-img" />
      <p><strong>Category:</strong> {recipe.strCategory}</p>
      <p><strong>Cuisine:</strong> {recipe.strArea}</p>

      <button
        className={`favorite-btn ${isFavorite ? "unfavorite" : ""}`}
        onClick={toggleFavorite}
        disabled={!recipe || loading}
      >
        {isFavorite ? "Unfavorite" : "Add to Favorites"}
      </button>

      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <h3>Instructions:</h3>
      <p>{recipe.strInstructions}</p>

      {recipe.strYoutube && (
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${recipe.strYoutube.split("v=")[1]}`}
            title="Recipe Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
