import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
);
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
      alert("Failed to log out. Please try again.");
    }
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between h-14 px-4 bg-[#202020] border-b border-gray-700">
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-[#3f3f3f] text-white">
          <MenuIcon />
        </button>
        <Link
          to="/"
          className="flex items-center space-x-1 text-white text-xl font-bold"
        >
          <span className="text-red-500 text-3xl">▶</span>
          <span>YouTube Clone</span>
        </Link>
      </div>
      <div className="hidden sm:flex flex-grow max-w-xl mx-8">
        <input
          type="text"
          placeholder="Search"
          className="flex-grow p-2 pl-4 text-sm text-white bg-[#121212] border border-[#3f3f3f] rounded-l-full focus:outline-none focus:ring-1 focus:border-blue-500"
        />
        <button className="p-2 w-16 bg-[#3f3f3f] rounded-r-full border border-[#3f3f3f] hover:bg-[#525252] text-white">
          <div className="flex justify-center">
            <SearchIcon />
          </div>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        {currentUser ? (
          <>
            <button className="p-2 rounded-full hover:bg-[#3f3f3f] text-white">
              <UserIcon />
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm text-red-400 border border-red-400 rounded hover:bg-red-900/50 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-400 border border-blue-400 rounded hover:bg-blue-900/50 transition-colors"
          >
            <UserIcon className="h-5 w-5" />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </header>
  );
}
