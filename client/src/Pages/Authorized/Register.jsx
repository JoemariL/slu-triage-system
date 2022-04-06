import React from "react";
import { Formbar } from "../../Components/ui";
import { RegisterModule } from "../../Modules/Authorized";

function Register() {
  return (
    <div className="text-sm ... sm:text-base">
      <Formbar headerText="Create your account" />

      <div className="mx-5 py-20 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-72">
        <RegisterModule />
      </div>
    </div>
  );
}

export default Register;
