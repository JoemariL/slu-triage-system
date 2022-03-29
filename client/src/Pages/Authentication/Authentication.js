import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { Button } from "../../Components/commons";
import { login } from "../../actions/authActions";
import useAuth from "../../hooks/useAuth";
import { LogoSLU } from "../../assets";
import Register from "./Register";

function Authentication() {
  const navigate = useNavigate();

  // Actions & hooks.
  const { setAuth } = useAuth();

  // Setup log in variables.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [switchRegister, setSwitchRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);

    //TODO: Success & Error messages.
    if (response.hasOwnProperty("message")) console.log(response.message);
    if (response) {
      setAuth({ access: response });
      navigate("/home", { replace: true });
    }
  };

  return (
    <div className="relative text-sm sm:text-base">
      {/* Register. */}
      {switchRegister && (
        <Register
          returnOnClick={() => {
            setSwitchRegister(false);
          }}
          nextPage={() => {
            setSwitchRegister(false);
          }}
        />
      )}

      {/* Main. */}
      <div className="p-5 space-y-10 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300">
        {/* School logo and title. */}
        <div className="flex flex-col space-y-2 items-center text-center">
          <img
            src={LogoSLU}
            className="h-auto w-32"
            alt="saint louis university logo"
          />
          <span>
            <strong>
              Saint Louis University <br />
              TRIAGE APPLICATION
            </strong>
          </span>
        </div>

        {/* Login form. */}
        <div className="space-y-2">
          <Login
            emailOnChange={(e) => setEmail(e.target.value)}
            pwdOnChange={(e) => setPassword(e.target.value)}
            emailAddress={email}
            password={password}
            handleSubmit={handleSubmit}
          />
          <Button
            buttonStyle="btn-secondary"
            label="Register"
            type="button"
            onClick={() => setSwitchRegister(!switchRegister)}
          />
        </div>
      </div>
    </div>
  );
}

export default Authentication;
