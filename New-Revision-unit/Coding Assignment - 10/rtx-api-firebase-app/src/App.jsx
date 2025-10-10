import "./App.css";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import Signup from "./Components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Navbar />
      <Signup />
      <Login />
      <Cart />
      <Products />
    </>
  );
}

export default App;
