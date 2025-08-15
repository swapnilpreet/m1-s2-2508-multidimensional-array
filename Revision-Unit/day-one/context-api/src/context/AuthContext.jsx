import React, { createContext, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, settoken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(()=>localStorage.getItem("user"));
  
  const login=async (email, password) => {
    try{
      const res=await fetch("https://reqres.in/api/login", {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
        },
        body:JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log("data",res);
      if (data.token) {
        settoken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", "Admin");
      } else {
        throw new Error("error occured");
      }
    } catch (error) {
      console.log(error);
      alert("somthing went wrong", error);
    }
  };

  const logout = () => {
    setUser(null);
    settoken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const getAlluser=async()=>{
    try {
        const res=await fetch('https://reqres.in/api/users',{
            headers:{
                "Content-Type": "application/json",
                "x-api-key": "reqres-free-v1",
            },
        })
        const data=await res.json();
        console.log("all user",data);
        return data.data;
    } catch (error) {
        alert("error ocuured",error)
    }
  } 
  //   console.log("context",user,token)
  return (
    <AuthContext.Provider value={{ user, token, login, logout,getAlluser }}>
      {children}
    </AuthContext.Provider>
  );
};
