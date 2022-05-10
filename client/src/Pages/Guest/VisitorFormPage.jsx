import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  VisitorModule,
  VisitorVaccineModule,
  VisitorHDFModule,
} from "../../Modules/Guest";
import { Formbar } from "../../Components/ui";

function VisitorFormPage() {
  const navigate = useNavigate();

  const [step, setstep] = useState(1);

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };

  switch (step) {
    case 1:
      return (
        <div className="text-sm bg-slate-100 ... sm:text-base">
          <Formbar
            header="Guest / Basic Information"
            onReturnClick={(e) => {
              e.preventDefault();
              navigate("/visitor/main", { replace: true });
            }}
          />

          <div className="p-5 rounded-t-3xl space-y-10 bg-white ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
            <VisitorModule onNext={nextStep} />
            <div className="mx-16 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full ease-in-out "
                style={{ width: "33.33%" }}
              ></div>
              <div className="p-5 w-full text-center">
                <span>1 of 3</span>
              </div>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="text-sm bg-slate-100 ... sm:text-base">
          <Formbar
            header="Guest / Vaccine Information"
            onReturnClick={(e) => {
              e.preventDefault();
              prevStep();
            }}
          />

          <div className="p-5 rounded-t-3xl space-y-10 bg-white ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
            <VisitorVaccineModule onNext={nextStep} />
            <div className="mx-16 bg-gray-200 rounded-full h-2.5 ">
              <div
                className="bg-blue-600 h-2.5 rounded-full ease-in-out "
                style={{ width: "66.66%" }}
              ></div>
              <div className="p-5 w-full text-center">
                <span>2 of 3</span>
              </div>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="text-sm bg-slate-100 ... sm:text-base">
          <Formbar
            header="Guest / Health Declaration Form"
            onReturnClick={(e) => {
              e.preventDefault();
              prevStep();
            }}
          />

          <div className="p-5 rounded-t-3xl space-y-10 bg-white ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
            <VisitorHDFModule />
            <div className="mx-16 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full ease-in-out"
                style={{ width: "100%" }}
              ></div>
              <div className="p-5 w-full text-center">
                <span>3 of 3</span>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return <div className="text-sm ... sm:text-base"></div>;
  }
}

export default VisitorFormPage;
