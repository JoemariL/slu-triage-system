import React from "react";
import { Appbar, RegisterForm } from "../../Components/index";

function Registration() {
  return (
    <div className="grid auto-rows-auto space-y-5">
      <div>
        <Appbar headerText="Create your account" />
      </div>
      <div className="mx-10 grid auto-rows-auto space-y-10 sm:mx-28 md:mx-44 lg:mx-60 ease-in-out duration-300">
        <div>
          <RegisterForm />
        </div>
      </div>
      <br />
    </div>
  );
}

export default Registration;
