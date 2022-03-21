import React from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { HDF } from "../../Components";

function WebHDF() {
  return (
    <div className="grid grid-rows-auto gap-5">
      <div className="p-5 flex flex-col justify-start gap-5">
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
            <span>
              <strong>INSTRUCTION</strong> <br />
            </span>
            Answer the following questions truthfully.
          </p>
        </div>
      </div>
      <div className="mx-12 grid grid-rows-auto sm:mx-28 md:mx-44 lg:mx-60 ease-in-out duration-300">
        <div>
          <HDF />
        </div>
      </div>
      <br />
    </div>
  );
}

export default WebHDF;
