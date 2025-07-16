import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice.js';
import '../../styles/components.css'; // Import component-specific styles

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Online Pharmacy
        </Link>
        <nav>
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
        </nav>
      </div>
    </header>
  );
};

export default Header;








// // In Header.jsx
// import Navbar from './Navbar.jsx';

// const Header = () => {
//   // ... existing logic ...
//   return (
//     <header className="header">
//       <div className="header-container">
//         <Link to="/" className="logo">
//           Online Pharmacy
//         </Link>
//         <nav>
//           <Navbar /> {/* Render Navbar component here */}
//         </nav>
//       </div>
//     </header>
//   );
// };