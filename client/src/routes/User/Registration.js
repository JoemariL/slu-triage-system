import React, { useState, useEffect } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { RegistrationForm } from "../../components";

function Registration() {
  return (
    <div className="grid gap-16">
      <div className="mb-32 flex-row items-center p-16 gap-16">
        <div>
          <button className="component-button-return" type="button">
            <IoReturnUpBack />
          </button>
        </div>
      </div>

      <div className="mx-40 flex-col">
        <div>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}

export default Registration;
