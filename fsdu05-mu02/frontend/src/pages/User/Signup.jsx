import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { SetLoader } from "../../redux/LoadingSlice";
import { SignupUser } from "../../Apicalls/user";
import { useDispatch } from "react-redux";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);
    try {
      dispatch(SetLoader(true));
      const response = await SignupUser(formData);
      
  // console.log(response);
      if (response) {
        // console.log(response.data);
        dispatch(SetLoader(false));
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      console.log(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-image">
          <img
            src="https://plus.unsplash.com/premium_photo-1661757221486-183030ef8670?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Signup"
          />
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
          <p className="login-link">
            Already have an account? <Link to="/login">login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
