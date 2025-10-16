import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authcontext";
 

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  console.log(user)
  return (
    <nav className="bg-green-500 text-white p-4 flex justify-between">
      <div>
        <Link to="/" className="mr-4">Home</Link>
        {user && user.role === "admin" && <Link to="/add-course" className="mr-4">Add Course</Link>}
        {user && <Link to="/my-courses">My Courses</Link>}
      </div>
      <div>
        {user ? (
          <button onClick={logout} className="bg-red-500 px-2 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-2">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
