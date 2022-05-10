import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginModule } from "../../Modules/Authorized";
import { Applogo, Formbar } from "../../Components/ui";
import { Button } from "../../Components/commons";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="text-sm bg-slate-100 ... sm:text-base">
      <Formbar
        header="User Log In"
        onReturnClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      />

      <div className="p-5 rounded-t-3xl bg-white ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
        <div className="flex flex-col gap-y-10">
          <Applogo />

          <div className="flex flex-col space-y-2">
            <LoginModule />
            <Button
              label="Create an account"
              type="button"
              secondary
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
