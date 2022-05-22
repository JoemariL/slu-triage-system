import React from "react";

import { Background } from "../Components/app_ui/Layout";
import { LoginForm } from "../Modules/Forms";

import { TriageappTeamIcon } from "../Assets";

function Login() {
  return (
    <Background>
      <div className="h-full ... flex flex-col justify-center items-center space-y-5">
        <div className="bg-white border-2 w-[28rem] py-20 px-14 ... flex flex-col space-y-16 rounded">
          <div className=" ... flex flex-col justify-center items-center text-center space-y-5">
            <img src={TriageappTeamIcon} alt="Triage Application Team Logo" />

            <div>
              <p>Triage Team Account</p>
              <p className="text-xl">Sign In</p>
            </div>
          </div>

          <div className=" ... rounded-b">
            <LoginForm />
          </div>
        </div>

        <footer className="text-center">
          <span className="block text-sm text-gray-600">
            Copyright © Saint Louis University. All Rights Reserved.
          </span>
        </footer>
      </div>
    </Background>
  );
}

export default Login;
