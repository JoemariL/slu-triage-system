import React from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { RegisterForm } from "../../Components/index";

function Registration() {
  return (
    <div className="grid grid-rows-auto gap-24">
      <div className="p-5 flex flex-row items-center">
        <div>
          <button
            className="flex flex-row justify-center items-center h-9 w-9 rounded-full text-xl text-center bg-blue-800 text-white focus:outline-none hover:bg-blue-700"
            type="button"
          >
            <IoReturnUpBack />
          </button>
        </div>

        <div className="mx-4 text-xl">
          <p>
            <strong>Create your account</strong>
          </p>
        </div>
      </div>

      <div className="mx-12 grid grid-rows-auto sm:mx-28 md:mx-44 lg:mx-60 ease-in-out duration-300">
        <div>
          <RegisterForm />
        </div>
      </div>

      <br />
    </div>
  );
}

export default Registration;
