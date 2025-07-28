import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import "../styles/FavoritesList.css";

export default function FavoritesList({ onBack, onSelect }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favRef = collection(db, "favoriteRecipes");
    const unsubscribe = onSnapshot(favRef, (snapshot) => {
      const favData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFavorites(favData);
    });

    return () => unsubscribe();
  }, []);

  const clearFavorites = async () => {
    for (const fav of favorites) {
      const favDocRef = doc(db, "favoriteRecipes", fav.id);
      await deleteDoc(favDocRef);
    }
  };

  return (
    <div className="favorites-list">
      <button className="back-btn" onClick={onBack}>← Back to Search</button>
      <h2>Your Favorite Recipes</h2>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <>
          <div className="favorites-grid">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="favorite-card"
                onClick={() => onSelect(fav.id)}
              >
                <img src={fav.image} alt={fav.name} />
                <h3>{fav.name}</h3>
              </div>
            ))}
          </div>
          <button className="clear-btn" onClick={clearFavorites}>Clear All Favorites</button>
        </>
      )}
    </div>
  );
}
