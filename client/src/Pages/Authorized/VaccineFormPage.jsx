import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VaccineModule } from "../../Modules/Authorized";
import { Formbar, Success, Error } from "../../Components/ui";

function VaccineFormPage() {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const successPopUp = () => {
    setSuccess(!success);
  };

  const errorPopUp = () => {
    setError(!error);
  };

  return (
    <div className="text-sm ... sm:text-base">
      {success && (
        <Success
          header="SUCCESS"
          message="Your vaccination profile has been updated!"
          route="/vaccine"
        />
      )}

      {error && (
        <Error
          header="ERROR"
          message="Something went wrong."
          onClick={errorPopUp}
        />
      )}

      <Formbar
        header="Manage your Vaccine Profile"
        onReturnClick={(e) => {
          e.preventDefault();
          navigate("/vaccine");
        }}
      />

      <div className="p-5 ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
        <VaccineModule onSuccess={successPopUp} />
      </div>
    </div>
  );
}

export default VaccineFormPage;
