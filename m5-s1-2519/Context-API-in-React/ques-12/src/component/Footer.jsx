import React, { useContext } from 'react'
import { AuthContext } from '../store/AuthContext';

const Footer = () => {
  const {islogin}=useContext(AuthContext);


  if(!islogin){
      return (
        <div>
            please log in.
        </div>
      )
  }
  return (
    <div>Welcome User</div>
  )
}

export default Footer;