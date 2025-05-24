import { createContext, useState } from "react";


export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{

    const [islogin,setislogin]=useState(false);

    return (
        <AuthContext.Provider value={{islogin,setislogin}}>
            {children}
        </AuthContext.Provider>
    )

}