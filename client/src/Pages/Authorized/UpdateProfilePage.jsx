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
        header="Update your account"
        onReturnClick={(e) => {
          e.preventDefault();
          navigate("/login");
        }}
      />

      <div className="p-5 ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
        <UpdateProfileModule onSuccess={successPopUp} />
      </div>
    </div>
  );
}

export default UpdateProfilePage;
