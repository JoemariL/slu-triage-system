import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Applogo, Disclaimer } from "../Components/ui";
import { Button } from "../Components/commons";
import Cookies from "js-cookie";

function Introduction() {
  const visitorCookie = Cookies.get("visitorToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userVaccine = JSON.parse(localStorage.getItem("userVaccine"));
  const userHdf = JSON.parse(localStorage.getItem("userHDF"));
  const navigate = useNavigate();

  const [disclaimer, setDisclaimer] = useState(false);

  const handleDisclaimer = () => {
    setDisclaimer(!disclaimer);
  };

  return (
    <div className="relative">
      {!disclaimer && <Disclaimer onClick={handleDisclaimer} />}

      <div className="ease-in-out duration-300 sm:text-base sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <div className="min-h-screen flex flex-col justify-center items-center space-y-16">
          <Applogo />

          <div className="w-full px-16 flex flex-col gap-y-3">
            <Button
              roundedFull
              label="Login as User"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            />
            <Button
              roundedFull
              secondary
              label="Continue as Guest"
              onClick={(e) => {
                e.preventDefault();
                visitorCookie || (userInfo && userVaccine && userHdf)
                  ? navigate("/visitor/main")
                  : // : navigate("/visitor/fillout");
                    navigate("/visitor/user-agreement");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
