import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const Authcontext = useContext(AuthContext);
  console.log("protected route", Authcontext.token);
  if (!Authcontext.token) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
}
