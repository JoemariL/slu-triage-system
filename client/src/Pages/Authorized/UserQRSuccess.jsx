import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImCheckmark } from "react-icons/im";
import { Button, Icon } from "../../Components/commons";

function UserQRSuccess() {
  const navigate = useNavigate();
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setInterval(() => {
      navigate("/main");
    }, 5000);
  }, [navigate, showComponent]);

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="min-h-screen flex flex-col justify-center items-center gap-y-5">
        <div>
          <Icon
            roundedFull
            className="bg-green-400 text-white"
            icon={<ImCheckmark className="h-8 w-8" />}
          />
        </div>

        <div>
          <p className="text-center">
            <span className="text-xl font-bold underline underline-offset-2 decoration-blue-900">
              QR CODE SCANNED SUCCESSFULLY!
            </span>
            <br />
            Your Health Declaration Form is now sent to the Triage Team of Saint
            Louis University.
            <br />
            You will be redirected to the homepage in 5 seconds...
          </p>
        </div>

        <div className="my-10 px-24 w-full">
          <Button
            type="button"
            label="Return"
            roundedFull
            onClick={(e) => {
              e.preventDefault();
              navigate("/main");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default UserQRSuccess;
