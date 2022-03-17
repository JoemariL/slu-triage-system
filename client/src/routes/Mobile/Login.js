import React from "react";
import { LoginForm } from "../../components/index";

function Login() {
  return (
    <div className="mx-12 grid grid-rows-auto sm:mx-28 md:mx-44 lg:mx-60">
      <div></div>

      <div>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
