import React from "react";
import { Appbar, HDF } from "../../Components";

function WebHDF() {
  return (
    <div className="grid auto-rows-auto space-y-5">
      <div>
        <Appbar headerText="Health Declaration Form" />
      </div>

      <div className="mx-10 grid auto-rows-auto space-y-10 sm:mx-28 md:mx-44 lg:mx-60 ease-in-out duration-300">
        <div>
          <HDF />
        </div>
      </div>
      <br />
    </div>
  );
}

export default WebHDF;
