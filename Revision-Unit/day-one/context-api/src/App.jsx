// import { Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoutes";
import Home from "./Pages/Home";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            } />
          <Route path="/login" element={
            <Login/>
            }/>
        </Routes>
      </div>
  );
}
export default App;
