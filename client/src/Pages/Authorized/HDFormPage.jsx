import React from "react";
import { useNavigate } from "react-router-dom";
import { HDFModule } from "../../Modules/Authorized";
import { Formbar } from "../../Components/ui";

function HDFormPage() {
  const navigate = useNavigate();

  return (
    <div className="text-sm ... sm:text-base">
      <Formbar
        header="Fill out your Health Declaration Form"
        onReturnClick={(e) => {
          e.preventDefault();
          navigate("/hdf");
        }}
      />

      <div className="p-5 ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
        <HDFModule />
      </div>
    </div>
  );
}

export default HDFormPage;
