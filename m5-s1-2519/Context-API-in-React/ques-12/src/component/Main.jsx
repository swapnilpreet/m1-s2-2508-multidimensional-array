import React, { useContext } from 'react'
import { AuthContext } from '../store/AuthContext';

const Main = () => {
  const {islogin,setislogin}=useContext(AuthContext);
  

  if(!islogin){
    return <div>Please login first</div>
  }

  return (
    <div>Wellcome to Home Page</div>
  )
}

export default Main;