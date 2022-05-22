import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Disclaimer } from "../Components/app_ui/Articles";
import { Button } from "../Components/commons";
import { School } from "../Assets";

function Introduction() {
  const navigate = useNavigate();

  const VISITOR_COOKIE = Cookies.get("visitorToken");
  const USER_INFO = JSON.parse(localStorage.getItem("userInfo"));
  const USER_VACCINE = JSON.parse(localStorage.getItem("userVaccine"));
  const USER_HDF = JSON.parse(localStorage.getItem("userHDF"));

  const [disclaimer, setDisclaimer] = useState(false);

  const renderDisclaimer = () => {
    setDisclaimer(!disclaimer);
  };

  return (
    <div className="h-screen w-full">
      {!disclaimer && (
        <div className="bg-white fixed h-screen w-full z-50">
          <div className="h-full flex flex-col justify-center items-center gap-10">
            <Disclaimer />

            <Button
              className="bg-blue-900 text-white py-3 px-10 rounded-full"
              label="CONTINUE"
              onClick={renderDisclaimer}
            />
          </div>
        </div>
      )}

      <div className="h-full p-5 ... flex flex-col justify-center items-center gap-5">
        <img
          className="h-auto w-32"
          src={School}
          alt="Saint Louis University PH Triage Application Logo"
        />

        <div className="text-center">
          <p>SAINT LOUIS UNIVERSITY </p>
          <p className="text-xl font-bold">TRIAGE APPLICATION</p>
        </div>

        <div className="m-5 grid grid-rows-2 gap-3">
          <Button
            className="bg-blue-900 text-white py-3 px-10 rounded-full"
            label="Login as User"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          />
          <Button
            className="bg-blue-600 text-white py-3 px-10 ... rounded-full"
            label="Login as Visitor"
            onClick={(e) => {
              e.preventDefault();

              VISITOR_COOKIE || (USER_INFO && USER_VACCINE && USER_HDF)
                ? navigate("/visitor/main")
                : navigate("/visitor");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Introduction;
