import React, { useEffect, useState } from "react";
import { LogoSLU } from "../../assets";
import { LoginForm } from "../../Components/presets/mobile";

import { useNavigate } from 'react-router-dom';
import { login } from '../../actions/authActions';
import useAuth from "../../hooks/useAuth";

function Login() {
  const { setAuth } = useAuth()
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password)
    if(response.hasOwnProperty("message")) alert(response.message)
    if(response) {
      setAuth({ access: response })
      navigate('/home', { replace: true })
    }
  };

  return (
    <div className="text-lg mx-5 py-10 space-y-5 sm:mx-16 md:mx-28 lg:mx-36 ease-in-out duration-300">
      <div className="flex flex-col items-center">
        <img
          src={LogoSLU}
          className="h-auto w-48"
          alt="saint louis university logo"
        />
        <p className="text-center">
          <span className="text-xl">
            <strong>
              Saint Louis University <br />
              Triage Application
            </strong>
          </span>
        </p>
      </div>

      <div>
        <LoginForm
          emailOnChange={(e) => setEmail(e.target.value)}
          pwdOnChange={(e) => setPassword(e.target.value)}
          emailAddress={email}
          password={password}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default Login;
