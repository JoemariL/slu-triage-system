import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  GuestInfoForm,
  GuestHDFForm,
  GuestVaccineForm,
} from "../../../Modules/Guest";

import { DataPrivacy } from "../../../Components/app_ui/Articles";
import {
  ParagraphLayout,
  MainLayout,
} from "../../../Components/app_ui/Layouts";
import { Formbar, SuccessUI } from "../../../Components/app_ui";
import { Button, Checkbox } from "../../../Components/commons";

function RegisterGuest() {
  const navigate = useNavigate();

  const [step, setstep] = useState(1);

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };

  const [userAgreed, setUserAgreed] = useState(false);

  const handleUserAgreement = () => {
    setUserAgreed(!userAgreed);
  };

  const [registerSuccess, setRegisterSuccess] = useState(false);

  const renderRegisterSuccess = () => {
    setRegisterSuccess(!registerSuccess);
  };

  switch (step) {
    case 1:
      return (
        <div className="h-screen p-5 ... space-y-10 ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
          <div className="flex flex-col">
            <span className="text-xl font-bold">PRIVACY POLICY AGREEMENT</span>
            <span className="text-gray-600">Last updated May 10, 2022</span>
          </div>

          <ParagraphLayout>
            <DataPrivacy />
          </ParagraphLayout>

          <Checkbox
            name="termscon"
            id="termscon"
            label="I Agree."
            onChange={handleUserAgreement}
          />

          <div className="flex flex-col space-y-3">
            <Button
              className="bg-blue-900 text-white w-full rounded"
              type="button"
              label="Agree & Continue"
              disabled={!userAgreed}
              onClick={nextStep}
            />

            <Button
              className="bg-white border-2 border-blue-800 text-blue-800 w-full ... rounded"
              label="Decline"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            />
          </div>
        </div>
      );

    case 2:
      return (
        <div>
          <div className="bg-white w-full sticky top-0 z-40">
            <Formbar
              header="Guest Information"
              onReturnClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            />
          </div>
          <MainLayout>
            <GuestInfoForm SWITCH_NEXT={nextStep} />

            <div className="p-10 flex flex-col gap-5 text-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full w-[33.33%]"></div>
              </div>
              <span>1 of 3</span>
            </div>
          </MainLayout>
        </div>
      );

    case 3:
      return (
        <div>
          <div className="bg-white w-full sticky top-0 z-40">
            <Formbar
              header="Guest Vaccine Profile"
              onReturnClick={(e) => {
                e.preventDefault();
                prevStep();
              }}
            />
          </div>
          <MainLayout>
            <GuestVaccineForm SWITCH_NEXT={nextStep} />

            <div className="p-10 flex flex-col gap-5 text-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full w-[66.66%]"></div>
              </div>
              <span>2 of 3</span>
            </div>
          </MainLayout>
        </div>
      );

    case 4:
      return (
        <div>
          <div className="bg-white w-full sticky top-0 z-40">
            <Formbar
              header="Guest Health Declaration Form"
              onReturnClick={(e) => {
                e.preventDefault();
                prevStep();
              }}
            />
          </div>
          <MainLayout>
            <GuestHDFForm SWITCH_NEXT={nextStep} />

            <div className="p-10 flex flex-col gap-5 text-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full w-[100%]"></div>
              </div>
              <span>3 of 3</span>
            </div>
          </MainLayout>
        </div>
      );

    case 5:
      return (
        <div>
          <SuccessUI
            header="Health Declaration Form Created"
            message="If you are allowed to enter, please scan the gate's QR code to send this form to the Triage Team."
            label="OK"
            route="/visitor/main"
          />
        </div>
      );

    default:
      return <div></div>;
  }
}

export default RegisterGuest;
