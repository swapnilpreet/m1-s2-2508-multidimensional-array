import { createContext, useState } from "react";

export const ThemeContext=createContext();


export function ThemeContextProvider({children}){
    const [theme,setTheme]=useState("light");

    const handletogglebtn=()=>{
        setTheme((prev)=>prev==='light'?"dark":"light")
    }

    return (
        <ThemeContext.Provider value={{theme,setTheme,handletogglebtn}}>
            {children}
        </ThemeContext.Provider>
    )
}