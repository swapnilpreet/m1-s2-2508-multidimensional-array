import React from "react";
import { useForm } from "../hooks/useForm";

const LoginForm = () => {
  const { values, handleChange, resetForm } = useForm({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in: ${values.email}`);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
