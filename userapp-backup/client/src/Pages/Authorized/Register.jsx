import React from "react";
import { Formbar } from "../../Components/ui";
import { RegisterModule } from "../../Modules/Authorized";

function Register() {
  return (
    <div className="text-xs ... sm:text-base">
      <Formbar headerText="Create your account" fixedTop />

      <div className="mx-5 py-20 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <RegisterModule />
      </div>
    </div>
  );
}

export default Register;
