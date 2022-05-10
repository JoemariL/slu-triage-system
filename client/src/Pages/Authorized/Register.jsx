import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterModule } from "../../Modules/Authorized";
import { DataPrivacy, Formbar, Success } from "../../Components/ui";
import { Button, Checkbox } from "../../Components/commons";

function Register() {
  const navigate = useNavigate();

  const [step, setstep] = useState(1);
  const [agree, setAgree] = useState(false);
  const [success, setSuccess] = useState(false);
  // const [bottom, setBottom] = useState(false);

  // const handleScroll = (e) => {
  //   const bottom =
  //     e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  //   setBottom(bottom);
  // };

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };

  const handleConditions = () => {
    setAgree(!agree);
  };

  const successPopUp = () => {
    setSuccess(!success);
  };

  switch (step) {
    case 1:
      return (
        <div className="text-sm ... sm:text-base">
          <Formbar
            header="Privacy Statement"
            onReturnClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          />

          <div className="p-5 space-y-10 ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
            <div className="h-96 p-2 overflow-y-scroll">
              <DataPrivacy />
            </div>

            <Checkbox
              name="termscon"
              id="termscon"
              label="I Agree."
              onChange={handleConditions}
            />

            <Button
              type="button"
              label="Agree & Continue"
              disabled={!agree}
              onClick={nextStep}
            />
          </div>
        </div>
      );

    case 2:
      return (
        <div className="text-sm ... sm:text-base">
          {success && (
            <Success
              header="SUCCESS"
              message="Your account has been successfully created!"
              route="/login"
            />
          )}

          <Formbar
            header="Create your account"
            onReturnClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          />

          <div className="p-5 ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
            <RegisterModule onSuccess={successPopUp} />
          </div>
        </div>
      );

    default:
      return <div className="text-sm ... sm:text-base"></div>;
  }
}

export default Register;
