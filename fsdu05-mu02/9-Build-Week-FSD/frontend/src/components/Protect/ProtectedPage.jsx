import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GetCurrentUser } from "../../Apicalls/user";
import { useDispatch} from "react-redux";
import { SetLoader } from "../../redux/LoadingSlice";
import { SetUser } from "../../redux/userSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const validateToken = async () => {
      try {
        dispatch(SetLoader(true));
        const response = await GetCurrentUser();
        if (response) {
          dispatch(SetUser(response.data));
        } else {
          localStorage.removeItem("token");
        }
        dispatch(SetLoader(false));
      } catch (error) {
        localStorage.removeItem("token");
        dispatch(SetLoader(false));
        console.log(error.message);
      }
    };
 
    validateToken();
  }, []);
 
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    if (!decoded) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
  } catch (err) {
    console.log("protected page",err)
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
