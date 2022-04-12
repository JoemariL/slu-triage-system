import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import "../index.css";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { login } from "../actions/authActions";
import SLULOGO from "../assets/images/slu-logo.png";

function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await login(username, password);
    if (response.hasOwnProperty("message")) console.log(response.message);
    if (response) {
      setAuth({ access: response });
      // navigate("/dashboard", { replace: true })
    }
  };

  return (
    <>
      <section className="heading">
        <h1>Saint Louis University</h1>
        <img
          className="h-auto w-32"
          src={SLULOGO}
          alt="slu triage application logo"
        />
      </section>
      <div class="cardContainer">
        <div class="loginCard">
          <h3>Admin TRIAGE</h3>
          <h3>Login</h3>
          <form onSubmit={onSubmit}>
            <div>
              <input
                type="text"
                class="loginform"
                id="username "
                name="username"
                value={username}
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="password"
                class="loginform"
                id="password "
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div>
              <button type="submit" class="loginbutton">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
