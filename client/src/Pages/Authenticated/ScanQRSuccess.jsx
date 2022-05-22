import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImCheckmark } from "react-icons/im";

import { Button, Icon } from "../../Components/commons";

const ScanQRSuccess = () => {
  const navigate = useNavigate();

  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setInterval(() => {
      navigate("/main");
      window.location.reload();
    }, 3000);
  }, [navigate, showComponent]);

  return (
    <div className="bg-white fixed h-screen w-full z-50 ... flex flex-col justify-center items-center gap-y-5">
      <Icon
        roundedFull
        className="bg-green-400 text-white"
        icon={<ImCheckmark className="h-14 w-14" />}
      />

      <div className="text-center space-y-3">
        <p className="text-xl font-bold uppercase">QR CODE SCANNED</p>
        <p className="text-lg">
          Your Health Declaration Form is now sent to the Triage Team of Saint
          Louis University.
        </p>
        <p className="text-gray-600">
          You will be redirected to the homepage in 3 seconds.
        </p>
      </div>

      <div className="pb-16 absolute inset-x-6 bottom-5">
        <Button
          className="bg-blue-900 text-white rounded-full w-full"
          label="Return"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            navigate("/main");
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
};

export default ScanQRSuccess;
