import React, { useEffect, useState } from "react";
import { Logo } from "../../assets";
import { LoginForm } from "../../Components/index";

import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../actions/authActions';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password)
    if(response.hasOwnProperty("message")) alert(response.message)
    if(response.hasOwnProperty("success")) navigate('/home', { replace: true })
  };
  
  return (
    <div className="mx-10 grid auto-rows-auto space-y-5 sm:mx-28 md:mx-44 lg:mx-60 ease-in-out duration-300">
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
          <span className="text-xl">
            <strong>
              Saint Louis University <br />
              Triage App
            </strong>
          </span>
        </div>
      </div>

      <div>
        <LoginForm
          emailOnChange={(e) => setEmail(e.target.value)}
          pwdOnChange={(e) => setPassword(e.target.value)}
          email={email}
          password={password}
          handleSubmit={handleSubmit}
        />
      </div>
      <br />
    </div>
  );
}

export default Login;
