import React from "react";
import { IoReturnUpBack } from "react-icons/io5";

const Appbar = ({ headerText = "" }) => {
  return (
    <div className="text-base">
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
            <strong>{headerText}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
