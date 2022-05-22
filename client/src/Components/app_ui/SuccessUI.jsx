import React from "react";
import { useNavigate } from "react-router-dom";
import { ImCheckmark } from "react-icons/im";

import { Button, Icon } from "../commons";

const SuccessUI = ({ route = "", header = "", message = "", label = "" }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white fixed h-screen w-full z-50 ... flex flex-col justify-center items-center gap-y-5">
      <Icon
        roundedFull
        className="bg-green-400 text-white"
        icon={<ImCheckmark className="h-14 w-14" />}
      />

      <div className="container mx-auto p-5 text-center space-y-3">
        <p className="text-xl font-bold uppercase">{header}</p>
        <p className="text-lg">{message}</p>
      </div>

      <div className="pb-16 absolute inset-x-6 bottom-5">
        <Button
          className="bg-blue-900 text-white rounded-full w-full"
          label={label ? label : "Return"}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            navigate(route);
          }}
        />
      </div>
    </div>
  );
};

export default SuccessUI;
