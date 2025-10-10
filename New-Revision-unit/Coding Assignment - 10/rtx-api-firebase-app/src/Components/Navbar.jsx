import React from 'react'
import { useAuth } from './useAuth';

const Navbar = () => {
   const { user, logoutUser } = useAuth();

  return (
    <header style={{border:"1px solid gray"}}>
      <h2>Navbar</h2>
      <div>
        {user ? (
          <>
            <span>Welcome, {user.displayName || user.email}</span>
            <button onClick={logoutUser} style={{ marginLeft: "10px" }}>Logout</button>
          </>
        ) : (
          <span>Please Login</span>
        )}
      </div>
    </header>
  );
}

export default Navbar