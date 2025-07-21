// import "../css/Navbar.css";
// import React, { useEffect, useState } from "react";
// import { FaShoppingCart, FaBars, FaTimes, FaHeartbeat } from "react-icons/fa";
// import { FiUser } from "react-icons/fi";
// import { GiMedicines } from "react-icons/gi";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// const menuItems = [/* same */];

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showUserDropdown, setShowUserDropdown] = useState(false);
//   const user = useSelector((state) => state.users);
  
//   const handleLogout = () => {
//   localStorage.removeItem("token");
//   window.location.href='/login';
//   };

//   useEffect(() => {
//     const mobile = window.innerWidth < 768;
//     setMenuOpen(!mobile);
//     setIsLoggedIn(!!localStorage.getItem("token"));
//     window.addEventListener("resize", () => {
//       const mobile = window.innerWidth < 768;
//       setMenuOpen(!mobile);
//     });
//     return () => window.removeEventListener("resize", () => {});
//   }, []);

//   return (
//     <div className="navbar-container">
//       {/* Top Navbar */}
//       <div className="navbar-top">
//         <div className="navbar-logo">
//           <h1 className="logo-heading">
//               <FaHeartbeat size={20} /> 
//             <Link to={'/'} >
//             APNA-MEDS
//             </Link>
//           </h1>
//         </div>

//         <div className="navbar-links desktop-only">
//           <Link to="#">Download App</Link>

//           {isLoggedIn ? (
//             <div
//               className="user-dropdown-wrapper"
//               onMouseEnter={() => setShowUserDropdown(true)}
//               onMouseLeave={() => setShowUserDropdown(false)}
//             >
//               <span className="user-info">
//                 <FiUser size={15} />
//                 {user?.user?.name}
//               </span>

//               {showUserDropdown && (
//                 <div className="user-dropdown">
//                   <p className="user-name">{user?.user?.name}</p>
//                   <p className="user-phone">8329207372</p>
//                   <Link to="/profile">Add more user details</Link>
//                   <hr />
//                   <Link to="/myorders">My Orders</Link>
//                   {user?.user?.isAdmin && <Link to="/admin">Admin</Link>}
//                   <Link to="#">Manage Patients</Link>
//                   <Link to="#">Manage Addresses</Link>
//                   <Link to="#">Refer and Earn</Link>
//                   <Link to="#">Health Articles</Link>
//                   <Link to="#">Help</Link>
//                   <hr />
//                   <Link to="#">Terms and Conditions</Link>
//                   <Link to="#"  onClick={handleLogout}>Logout</Link>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link to="/login">Login / Signup</Link>
//           )}

//           <Link to="/cart">
//             <FaShoppingCart size={13}/> Cart
//           </Link>
//         </div>

//         {/* Mobile Icons */}
//         <div className="mobile-menu-toggle mobile-only">
//           <a href="#">
//             <FiUser />
//           </a>
//           <a href="#">
//             <FaShoppingCart />
//           </a>
//           <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       <hr />

//       {/* Mobile Dropdown + Bottom Menu */}
//       <div className={`dropdown-menu ${menuOpen ? "open" : ""}`}>
//         <div className="navbar-links-mobile mobile-only">
//           <a href="#">Download App</a>
//           {!isLoggedIn && <a href="#">Login / Signup</a>}
//           <a href="#">Cart</a>
//         </div>

//         <div className="navbar-bottom">
//           {menuItems.map((item, index) => (
//             <div key={index} className="nav-item">
//               <a href="#">{item}</a>
//               <div className="submenu">
//                 <p>{item} Submenu</p>
//                 <p>Skin Care</p>
//                 <p>Hair Care</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes, FaHeartbeat } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

const fadeInLogo = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const NavbarContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
`;

const NavbarTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.5rem;
  flex-wrap: wrap;
`;

const LogoHeading = styled.h1`
  display: flex;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: linear-gradient(90deg, #007bff, #00c9a7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeInLogo} 1s ease-in-out;
  margin: 0;
`;

const NavbarLinks = styled.div`
 display: flex;
  align-items: center;
  gap: 1.5rem;

  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;

    &:hover {
      color: #007bff;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserDropdownWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const UserInfo = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #333;
  padding: 8px 12px;
  border-radius: 4px;

  &:hover {
    color: #007bff;
  }
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 35px;
  right: 0;
  width: 260px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  border-radius: 8px;
  z-index: 999;

  p.user-name {
    font-weight: 600;
    margin: 0;
  }

  p.user-phone {
    color: gray;
    font-size: 14px;
    margin-bottom: 6px;
  }

  a {
    display: block;
    text-decoration: none;
    padding: 6px 0;
    font-size: 14px;
    transition: all 0.2s;

    &:hover {
      color: #007bff;
    }
  }

  hr {
    margin: 10px 0;
    border: none;
    border-top: 1px solid #eee;
  }
`;

const MobileMenuToggle = styled.div`
  display: none;
  gap: 1rem;
  align-items: center;

  button {
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const DropdownMenu = styled.div`
   display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  background-color: #f9f9f9;

  @media (min-width: 769px) {
    display: none !important;
  }
`;

const NavbarLinksMobile = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

const NavbarBottom = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: #f8f8f8;
  padding: 1rem;

  .nav-item {
    position: relative;
    margin: 0.5rem 1rem;

    a {
      text-decoration: none;
      color: #333;
      font-weight: 500;

      &:hover {
        color: #007bff;
      }
    }

    .submenu {
      display: none;
      position: absolute;
      top: 1.5rem;
      left: 0;
      padding-top: 10px;
      background-color: #f8f8f8;
      border-radius: 5px;
      padding: 0.7rem 1rem;
      border: 1px solid #ddd;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      min-width: 150px;

      p:hover {
        color: #007bff;
      }
    }

    &:hover .submenu {
      display: block;
    }
  }
`;

const menuItems = ["Wellness", "Personal Care", "Fitness", "Health Devices"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const user = useSelector((state) => state.users);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setMenuOpen(!mobile);
    setIsLoggedIn(!!localStorage.getItem("token"));

    const resizeHandler = () => {
      const mobile = window.innerWidth < 768;
      setMenuOpen(!mobile);
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <NavbarContainer>
      <NavbarTop>
        <LogoHeading>
          <FaHeartbeat size={20} />
          <Link to="/">APNA-MEDS</Link>
        </LogoHeading>

        <NavbarLinks>
          <Link to="#">Download App</Link>

          {isLoggedIn ? (
            <UserDropdownWrapper
              onMouseEnter={() => setShowUserDropdown(true)}
              onMouseLeave={() => setShowUserDropdown(false)}
            >
              <UserInfo>
                <FiUser size={15} />
                {user?.user?.name}
              </UserInfo>
              {showUserDropdown && (
                <UserDropdown>
                  <p className="user-name">{user?.user?.name}</p>
                  <p className="user-phone">9876542101</p>
                  <Link to="/profile">Add more user details</Link>
                  <hr />
                  <Link to="/myorders">My Orders</Link>
                  {user?.user?.isAdmin && <Link to="/admin">Admin</Link>}
                  <Link to="#">Manage Patients</Link>
                  <Link to="#">Manage Addresses</Link>
                  <Link to="#">Refer and Earn</Link>
                  <Link to="#">Health Articles</Link>
                  <Link to="#">Help</Link>
                  <hr />
                  <Link to="#" onClick={handleLogout}>
                    Logout
                  </Link>
                </UserDropdown>
              )}
            </UserDropdownWrapper>
          ) : (
            <Link to="/login">Login / Signup</Link>
          )}

          <Link to="/cart">
            <FaShoppingCart size={13} /> Cart
          </Link>
        </NavbarLinks>

        <MobileMenuToggle>
          <a href="#">
            <FiUser />
          </a>
          <a href="#">
            <FaShoppingCart />
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </MobileMenuToggle>
      </NavbarTop>

      <hr />

      <DropdownMenu open={menuOpen}>
        <NavbarLinksMobile>
          <a href="#">Download App</a>
          {!isLoggedIn && <a href="#">Login / Signup</a>}
          <a href="#">Cart</a>
        </NavbarLinksMobile>

        <NavbarBottom>
          {menuItems.map((item, index) => (
            <div key={index} className="nav-item">
              <a href="#">{item}</a>
              <div className="submenu">
                <p>{item} Submenu</p>
                <p>Skin Care</p>
                <p>Hair Care</p>
              </div>
            </div>
          ))}
        </NavbarBottom>
      </DropdownMenu>
    </NavbarContainer>
  );
};

export default Navbar;
