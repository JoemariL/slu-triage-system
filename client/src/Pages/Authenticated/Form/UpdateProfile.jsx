import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProfileUpdateForm } from "../../../Modules/Authenticated";

import { MainLayout } from "../../../Components/app_ui/Layouts";
import { Formbar, SuccessUI, ErrorUI } from "../../../Components/app_ui";

function RegisterVaccine() {
  const navigate = useNavigate();

  const [isSuccessful, setIsSuccessful] = useState(false);

  const renderIsSuccessful = () => {
    setIsSuccessful(!isSuccessful);
  };

  const [isError, setIsError] = useState(false);

  const renderIsError = () => {
    setIsError(!isError);
  };

  return (
    <>
      {isSuccessful && (
        <SuccessUI
          header="Profile Updated"
          message="Your profile has been successfully updated."
          route="/main"
        />
      )}

      {isError && (
        <ErrorUI
          header="Error"
          message="Something went wrong when updating your vaccine profile."
          cancel={renderIsError}
        />
      )}

      <div className="bg-white w-full sticky top-0 z-40">
        <Formbar
          header="Update Profile"
          onReturnClick={(e) => {
            e.preventDefault();
            navigate("/main");
          }}
        />
      </div>

      <MainLayout>
        <ProfileUpdateForm
          PROFILE_UPDATE_SUCCESS={renderIsSuccessful}
          PROFILE_UPDATE_ERROR={renderIsError}
        />
      </MainLayout>
    </>
  );
}

export default RegisterVaccine;
