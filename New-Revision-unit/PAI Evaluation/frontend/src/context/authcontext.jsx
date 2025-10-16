import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    let userData = null;

    try {
      userData = JSON.parse(localStorage.getItem("user"));
    } catch (err) {
      console.log("Error parsing user from localStorage:", err);
    }

    return token && userData ? { token, ...userData } : null;
  });

  const login = (token, userData) => {
    console.log(userData)
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData)); // always stringify!
    setUser({ token, ...userData });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
