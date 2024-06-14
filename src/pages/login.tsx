import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login_with_password } from "../services/api/auth";
import { validateEmail } from "../utils";
import { parseError, saveSession } from "../utils/serverUtils";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });
  const handleFormOnChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    console.log(formValues);
    if (!formValues.email || !formValues.password) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }
    if (!validateEmail(formValues.email)) {
      setMessage({ type: "error", text: "Invalid email address." });
      return;
    }
    // handle login here
    setMessage({ type: "success", text: "Logging in..." });
    try {
      const login = await login_with_password(
        formValues.email,
        formValues.password
      );
      console.log(login);
      saveSession({
        accessToken: login.token,
        expiresIn: 3600,
      });
      setMessage({ type: "success", text: "Login successful!" });
      navigate("/app");
    } catch (error) {
      setMessage({ type: "error", text: parseError(error) });
      console.log(error);
    }
  };
  return (
    <div className="page">
      <div className="page-content">
        <h1>Login</h1>
        <p>Log in to your account.</p>
        <div className="form">
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email Address"
            onChange={handleFormOnChange}
          />
          <br />
          <br />
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleFormOnChange}
          />
          <br />
          <button onClick={handleLogin}>Log in</button>
        </div>
        <br />
        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
        <br />
        <div className="signup-link">
          Don't have an account? <Link to="/signup"> &nbsp; Signup!</Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
