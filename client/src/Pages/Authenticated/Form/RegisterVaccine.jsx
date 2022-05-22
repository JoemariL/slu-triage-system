import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { VaccineProfileForm } from "../../../Modules/Authenticated";

import { MainLayout } from "../../../Components/app_ui/Layouts";
import { Formbar, SuccessUI, ErrorUI } from "../../../Components/app_ui";

function RegisterVaccine() {
  const navigate = useNavigate();

  const [manageVaccineSuccess, setManageVaccineSuccess] = useState(false);

  const renderManageVaccineSuccess = () => {
    setManageVaccineSuccess(!manageVaccineSuccess);
  };

  const [manageVaccineError, setManageVaccineError] = useState(false);

  const renderManageVaccineError = () => {
    setManageVaccineError(!manageVaccineError);
  };

  return (
    <>
      {manageVaccineSuccess && (
        <SuccessUI
          header="Vaccine Profile Updated"
          message="Your vaccine profile has been successfully updated."
          route="/vaccine"
        />
      )}

      {manageVaccineError && (
        <ErrorUI
          header="Error"
          message="Something went wrong when updating your vaccine profile."
          cancel={manageVaccineError}
        />
      )}

      <div className="bg-white w-full sticky top-0 z-40">
        <Formbar
          header="Vaccine Profile"
          onReturnClick={(e) => {
            e.preventDefault();
            navigate("/vaccine");
          }}
        />
      </div>

      <MainLayout>
        <VaccineProfileForm
          VACCINE_SUCCESS={renderManageVaccineSuccess}
          VACCINE_ERROR={renderManageVaccineError}
        />
      </MainLayout>
    </>
  );
}

export default RegisterVaccine;
