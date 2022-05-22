import React from "react";
import { useNavigate } from "react-router-dom";

import { HDFForm } from "../../../Modules/Authenticated";

import { MainLayout } from "../../../Components/app_ui/Layouts";
import { Formbar } from "../../../Components/app_ui";

function RegisterHDF() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white w-full sticky top-0 z-40">
        <Formbar
          header="Health Declaration Form"
          onReturnClick={(e) => {
            e.preventDefault();
            navigate("/hdf");
          }}
        />
      </div>

      <MainLayout>
        <HDFForm />
      </MainLayout>
    </>
  );
}

export default RegisterHDF;
