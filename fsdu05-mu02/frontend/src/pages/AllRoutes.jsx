import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedPage from "../components/Protect/ProtectedPage";
import Profile from "./Profile/Profile";
import SingleMedicine from "./SingleMedicine/SingleMedicine";
import AdminProtected from "../components/Protect/AdminProtected";
import Login from "./User/Login";
import Signup from "./User/Signup";
import Home from "./Home/Home";
import Cart from "./Cart/Cart";
import Pagewrapper from "../components/common/Pagewrapper";
import MyOrder from "./MyOrder/MyOrder";
import Admin from "./Admin/Admin";
import ProtectedRoute from "../components/Protect/ProtectedPage";
const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedPage>
              <Home />
            </ProtectedPage>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedPage>
              <Profile />
            </ProtectedPage>
          }
        />
        <Route
          path="/medicine/:id"
          element={
            <ProtectedPage>
              <SingleMedicine />
            </ProtectedPage>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedPage>
              <AdminProtected>
                <Admin />
              </AdminProtected>
            </ProtectedPage>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedPage>
              <Cart />
            </ProtectedPage>
          }
        />
        <Route
          path="/myorders"
          element={
            <ProtectedPage>
              <MyOrder />
            </ProtectedPage>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};
export default AllRoutes;
