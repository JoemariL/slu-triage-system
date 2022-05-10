import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataPrivacy, Formbar } from "../../Components/ui";
import { Button, Checkbox } from "../../Components/commons";

function VisitorAgreement() {
  const navigate = useNavigate();

  const [agree, setAgree] = useState(false);

  const handleConditions = () => {
    setAgree(!agree);
  };

  return (
    <div className="text-sm bg-slate-100 ... sm:text-base">
      <Formbar
        header="Privacy Statement"
        onReturnClick={(e) => {
          e.preventDefault();
          navigate("/visitor/main");
        }}
      />

      <div className="p-5 rounded-t-3xl space-y-10 bg-white ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
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
          onClick={(e) => {
            e.preventDefault();
            navigate("/visitor/fillout", { replace: true });
          }}
        />
      </div>
    </div>
  );
}

export default VisitorAgreement;
