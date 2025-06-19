// src/pages/Dashboard.jsx
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    alert("Logged out successfully");
    navigate("/login");
  };

  return(
    <div>
      <h2>
        Welcome {auth.currentUser?.displayName || auth.currentUser?.email}!
      </h2>
      <button onClick={logout}>Logout</button>
      <h2>Dashboard</h2>
      <PostForm />
      <PostList />
    </div>
  );
};

export default Dashboard;
