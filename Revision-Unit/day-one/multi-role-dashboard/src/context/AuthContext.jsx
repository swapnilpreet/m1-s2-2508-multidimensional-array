import React, { createContext, useContext, useState } from "react";
import { loginUser } from "../api/reqres";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ user: null, token: null, role: null });

  const login = async (email, password, asAdmin = false) => {
    const data = await loginUser(email, password);
    if (data.token) {
      setAuth({
        user: { email },
        token: data.token,
        role: asAdmin ? "admin" : "user",
      });
    }
    return data;
  };

  const logout = () => setAuth({ user: null, token: null, role: null });

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
