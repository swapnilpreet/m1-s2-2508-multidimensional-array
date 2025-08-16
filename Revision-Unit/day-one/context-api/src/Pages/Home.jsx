import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "../index.css";
const Home = () => {

  const { logout, getAlluser } = useContext(AuthContext);
  const user = useContext(AuthContext);
  const { theme, toggletheme } = useTheme();
  const [alluser, setalluser] = useState([]);
  const handlelogout = async () => {
    await logout();
  };
  console.log("User", user.user);

  const handlealluser = async () => {
    let response = await getAlluser();
    console.log(response);
    setalluser(response);
  };

  return (
    <div>
      <h1>Home</h1>
      <div className={`${theme === "light" ? "lighttheme" : "darktheme"}`}>
        <h1>{theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}</h1>
        <button onClick={toggletheme}>
          Switch to {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
      {user.user != "User" ? (
        <>
          <button onClick={handlealluser}>fetch All User</button>
        </>
      ) : (
        <>
          <button>Show my Profile</button>
        </>
      )}
      <button onClick={handlelogout}>Logout</button>

      {alluser &&
        alluser.map((user) => (
          <div key={user.id}>
            <li>
              {user.id} Email : {user.email}, Name: {user.first_name}{" "}
              {user.last_name}
            </li>
          </div>
        ))}
    </div>
  );
};

export default Home;
