import React from 'react'

const PrivateRoute = ({children}) => {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute