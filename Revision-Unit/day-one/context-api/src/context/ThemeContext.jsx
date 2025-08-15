import { createContext, useContext, useEffect, useState } from "react";


const ThemeContext=createContext()

export const ThemeProvider=({children})=>{
    const [theme,settheme]=useState(() => {
    return localStorage.getItem("theme") || "light";
  });

    useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

    const toggletheme=()=>{
        settheme((prev)=>(prev==="light" ? "dark" : "light"));
    }

    return(
        <ThemeContext.Provider value={{theme,toggletheme}}>
            {children}
        </ThemeContext.Provider>
    )
}


export const useTheme=()=>useContext(ThemeContext);