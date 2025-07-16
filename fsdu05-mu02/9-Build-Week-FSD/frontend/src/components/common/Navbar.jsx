import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice.js';
import '../../styles/components.css'; // Import component-specific styles

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <ul className="nav-links">
      <li>
        <Link to="/products">Medicines</Link>
      </li>
      <li>
        <Link to="/cart">Cart</Link>
      </li>
      {userInfo ? (
        <>
          <li>
            <Link to="/profile">Profile ({userInfo.name})</Link>
          </li>
          <li>
            <Link to="/orders">My Orders</Link>
          </li>
          <li>
            <Link to="/prescription-upload">Upload Rx</Link>
          </li>
          <li>
            <button onClick={logoutHandler} className="btn btn-outline-primary">
              Logout
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">Sign In</Link>
        </li>
      )}
    </ul>
  );
};

export default Navbar;