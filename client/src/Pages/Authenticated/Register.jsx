import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RegisterForm } from "../../Modules/Authenticated";

import { DataPrivacy } from "../../Components/app_ui/Articles";
import { ParagraphLayout, MainLayout } from "../../Components/app_ui/Layouts";
import { Formbar, SuccessUI } from "../../Components/app_ui";
import { Button, Checkbox } from "../../Components/commons";

function Register() {
  const navigate = useNavigate();

  const [step, setstep] = useState(1);

  const nextStep = () => {
    setstep(step + 1);
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
                navigate("/login");
              }}
            />
          </div>
        </div>
      );

    case 2:
      return (
        <div>
          {registerSuccess && (
            <SuccessUI
              header="Registered"
              message="Your account has been successfully registered."
              route="/login"
            />
          )}

          <div className="bg-white w-full sticky top-0 z-40">
            <Formbar
              header="User Registration"
              onReturnClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            />
          </div>
          <MainLayout>
            <RegisterForm REGISTER_SUCCESS={renderRegisterSuccess} />
          </MainLayout>
        </div>
      );

    default:
      return <div></div>;
  }
}

export default Register;
