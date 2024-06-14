import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils";
import { register_with_email } from "../services/api/auth";
import { parseError, saveSession } from "../utils/serverUtils";

const SignupPage = () => {
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
  const handleSignup = async () => {
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
      const signup = await register_with_email(
        formValues.email,
        formValues.password
      );
    //   console.log(signup);
      saveSession({
        accessToken: signup.token,
        expiresIn: 3600,
      })
      setMessage({ type: "success", text: "Signup successful!" });
      navigate("/app");
    } catch (error) {
      setMessage({ type: "error", text: parseError(error) });
      console.log(error);
    }
  };
  return (
    <div className="page">
      <div className="page-content">
        <h1>Signup</h1>
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
          <button onClick={handleSignup}>Signup</button>
        </div>
        <br />
        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
        <br />
        <div className="signup-link">
          Already have an account? <Link to="/login"> &nbsp; Login!</Link>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
