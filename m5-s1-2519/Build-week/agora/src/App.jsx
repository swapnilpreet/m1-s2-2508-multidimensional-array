// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import CreatePost from "./pages/CreatePost";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import ProtectedLayout from "./components/common/ProtectedLayout";
import Layout from './components/common/Layout'
import Explore from "./pages/Explore";
import PostPage from "./pages/PostPage";
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

      {/* Protected Routes with layout */}
      <Route
        path="/"
        element={
          user ? (
            <ProtectedLayout>
              <Layout>
              <HomePage />
              </Layout>
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          user ? (
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/createpost"
        element={
          user ? (
            <ProtectedLayout>
              <Layout>
              <CreatePost/>
              </Layout>   
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/explore"
        element={
          user ? (
            <ProtectedLayout>
              <Layout>
              <Explore/>
              </Layout>   
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
       
    </Routes>
  );
}

export default App;
