import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../assets";
import { LoginForm } from "../../Components/index";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          userOnChange={(e) => setUsername(e.target.value)}
          pwdOnChange={(e) => setPassword(e.target.value)}
          username={username}
          password={password}
        />
      </div>
      <br />
    </div>
  );
}

export default Login;
