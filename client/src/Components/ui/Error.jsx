import React from "react";
import { ImCross } from "react-icons/im";
import { Button, Icon } from "../../Components/commons";

const Success = ({ header = "", message = "", onClick = () => {} }) => {
  return (
    <div className="fixed min-h-screen w-full z-50 flex flex-col justify-center items-center gap-y-5 border-2 bg-white border-slate-100">
      <div>
        <Icon
          roundedFull
          className="bg-red-400 text-white"
          icon={<ImCross className="h-8 w-8" />}
        />
      </div>

      <div>
        <p className="text-center">
          <span className="text-xl font-bold underline underline-offset-2 decoration-blue-900">
            {header}
          </span>
          <br />
          {message}
        </p>
      </div>

      <div className="my-10 px-24 w-full">
        <Button type="button" label="Return" roundedFull onClick={onClick} />
      </div>
    </div>
  );
};

export default Success;
