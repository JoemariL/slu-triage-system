import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Logo } from "../../assets";
import { LoginForm } from "../../Components/index";
import { login, clearErrors } from "../../actions/authActions";
import Logout from "../../Components/Mobile/Logout";

function Login({ isAuthenticated, error, login, clearErrors }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, password };
    await login(userData, navigate);
  };

  useEffect(() => {
    if (error.id === "LOGIN_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error, isAuthenticated]);

  return (
    <div className="mx-12 grid grid-rows-auto sm:mx-28 md:mx-44 lg:mx-60 ease-in-out duration-300">
      <br />
      <div className="flex flex-col items-center">
        <div>
          <img
            src={Logo}
            className="h-auto w-48"
            alt="Saint Louis University Triage App Logo"
          />
        </div>

        <div className="text-center">
          <p>
            <span className="text-xl">
              <strong>
                Saint Louis University <br />
                Triage App
              </strong>
            </span>
          </p>
        </div>
      </div>

      <div className="my-10">
        <LoginForm
          userOnChange={(e) => setUsername(e.target.value)}
          pwdOnChange={(e) => setPassword(e.target.value)}
          username={username}
          password={password}
          handleSubmit={handleSubmit}
        />
      </div>
      <br />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
