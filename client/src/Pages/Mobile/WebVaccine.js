import React from "react";
import { Appbar, VaccineForm } from "../../Components/index";

function WebVaccine() {
  return (
    <div className="grid auto-rows-auto space-y-5">
      <div>
        <Appbar headerText="Vaccine Profile" />
      </div>
      <div className="mx-10 grid auto-rows-auto space-y-10 sm:mx-28 md:mx-44 lg:mx-60 ease-in-out duration-300">
        <div>
          <VaccineForm />
        </div>
      </div>
      <br />
    </div>
  );
}

export default WebVaccine;
