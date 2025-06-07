import { useForm } from "../hooks/useForm";

const SignupForm = () => {
  const { values, handleChange, resetForm } = useForm({ username: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Signed up with: ${values.username}`);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={values.username}
        onChange={handleChange}
        required
      />
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
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
