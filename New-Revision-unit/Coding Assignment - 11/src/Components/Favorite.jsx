import React, { useEffect, useState, useMemo, useCallback } from "react";

const UserItem=React.memo(({user,isFavorite,onToggleFavorite})=>{
  console.log("Rendered:", user.name);
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #eee",
        padding: "8px 10px",
      }}
    >
      <div>
        <strong>{user.name}</strong> <br />
        <small>{user.email}</small>
      </div>
      <button
        onClick={()=>onToggleFavorite(user.id)}
      >
        {isFavorite ? "Favorite" : "Add Favorite"}
      </button>
    </li>
  );
});

const Favorite = () => {
  const [users, setUsers] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (showFavorites) {
      return users.filter((u) => favorites.has(u.id));
    }
    return users;
  }, [users, favorites, showFavorites]);

  const handleToggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  }, []);

  const handleFilterToggle = useCallback(() => {
    setShowFavorites((prev) => !prev);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>User List with Favorites</h2>
      <button
        onClick={handleFilterToggle}
      >
        {showFavorites ? "Show All Users" : "Show Only Favorites"}
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredUsers.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            isFavorite={favorites.has(user.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </ul>
    </div>
  );
};

export default Favorite;
