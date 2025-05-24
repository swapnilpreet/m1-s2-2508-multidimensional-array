import React, { useContext } from 'react'
import { AuthContext } from '../store/AuthContext'

const Navbar = () => {
    const {islogin,setislogin}=useContext(AuthContext);
    // console.log(islogin,setislogin)
  return (
    <div>
        <button onClick={()=>setislogin(!islogin)}>{islogin?"Logout":"Login"}</button>
    </div>
  )
}

export default Navbar