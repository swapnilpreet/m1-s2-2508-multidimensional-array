import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setemail] = useState("eve.holt@reqres.in");
  const [password, setpassword] = useState("cityslicka");
  const navigate = useNavigate();
  const handleLogin = async() => {
    if (email && password) {
      await login(email, password);
      navigate("/");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
