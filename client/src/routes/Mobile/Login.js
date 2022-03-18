import React from "react";
import { Logo } from "../../assets";
import { LoginForm } from "../../components/index";

function Login() {
  return (
    <div className="mx-12 grid grid-rows-auto sm:mx-28 md:mx-44 lg:mx-60 ease-in-out duration-300">
      <br />

      <div className="flex flex-col items-center">
        <div>
          <img src={Logo} alt="Saint Louis University Triage App Logo" />
        </div>
      </div>

      <div className="my-10">
        <LoginForm />
      </div>

      <br />
    </div>
  );
}

export default Login;
