import React from "react";
import { useNavigate } from "react-router-dom";

import { LoginForm } from "../../Modules/Authenticated";

import { Background, MainLayout } from "../../Components/app_ui/Layouts";
import { Formbar } from "../../Components/app_ui";
import { Button } from "../../Components/commons";
import { School } from "../../Assets";

function Login() {
  const navigate = useNavigate();

  return (
    <Background>
      <Formbar
        header="User Log In"
        onReturnClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      />

      <MainLayout>
        <div className="py-16 space-y-16">
          <div className="flex flex-col justify-center items-center">
            <img
              className="h-auto w-32"
              src={School}
              alt="Saint Louis University PH Triage Application Logo"
            />

            <div className="text-lg text-center">
              <p>SAINT LOUIS UNIVERSITY</p>
              <p className="text-lg font-bold">TRIAGE APPLICATION</p>
            </div>
          </div>

          <div className="space-y-3">
            <LoginForm />
            <Button
              className="bg-white border-2 border-blue-800 text-blue-800 w-full ... rounded"
              label="Sign Up"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
            />
          </div>
        </div>
      </MainLayout>
    </Background>
  );
}

export default Login;
