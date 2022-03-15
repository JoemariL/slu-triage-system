import React from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { RegistrationForm } from "../components";

function Registration() {
  return (
    <div className="grid gap-16">
      <div className="mb-32 flex-row items-center p-16 gap-16">
        <div>
            <button className="component-button-return focus" type="button">
            <IoReturnUpBack />
            </button>
        </div>

        <div className="">
            <p>
                <strong>1 of 2</strong>
            </p>
        </div>
      </div>

      <div className="mx-40">
        <RegistrationForm />
      </div>

      <div className="mx-40 mt-32">
        <div className="flex-col">
          <button className="component-button-primary" type="button">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registration;
