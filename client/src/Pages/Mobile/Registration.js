import React from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { RegisterForm } from "../../Components/index";

function Registration() {
  return (
    <div className="grid auto-rows-auto space-y-10">
      <br />
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
