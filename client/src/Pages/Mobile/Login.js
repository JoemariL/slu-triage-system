import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/commons";
import { LoginForm, RegistrationForm } from "../../Components/presets/mobile";
import { login } from "../../actions/authActions";
import useAuth from "../../hooks/useAuth";
import { LogoSLU } from "../../assets";

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerView, setRegisterView] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response.hasOwnProperty("message")) alert(response.message);
    if (response) {
      setAuth({ access: response });
      navigate("/home", { replace: true });
    }
  };

  return (
    <div className="text-base relative">
      {registerView && (
        <RegistrationForm
          className="absolute h-full w-full z-50"
          returnOnClick={() => {
            setRegisterView(false);
          }}
        />
      )}

      <div className="mx-5 py-10 space-y-5 sm:mx-16 md:mx-28 lg:mx-36 ease-in-out duration-300">
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

        <div className="space-y-2">
          <LoginForm
            emailOnChange={(e) => setEmail(e.target.value)}
            pwdOnChange={(e) => setPassword(e.target.value)}
            emailAddress={email}
            password={password}
            handleSubmit={handleSubmit}
          />

          <Button
            buttonStyle="h-12 rounded border-2 border-blue-900 text-blue-900 bg-white hover:border-blue-800 hover:text-blue-800"
            label="Register"
            type="button"
            onClick={() => setRegisterView(!registerView)}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
