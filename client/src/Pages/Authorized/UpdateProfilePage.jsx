import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formbar, Success } from "../../Components/ui";
import { UpdateProfileModule } from "../../Modules/Authorized";

function UpdateProfilePage() {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  const successPopUp = () => {
    setSuccess(!success);
  };

  return (
    <div className="text-sm ... sm:text-base">
      {success && (
        <Success
          header="SUCCESS"
          message="Your account has been successfully updated!"
          route="/"
        />
      )}

      <Formbar
        headerText="Update profile"
        fixedTop
        onReturnClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      />

      <div className="mx-5 py-20 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <UpdateProfileModule onSuccess={successPopUp} />
      </div>
    </div>
  );
}

export default UpdateProfilePage;
