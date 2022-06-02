import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import Cookies from "js-cookie";
import { Disclaimer } from "../Components/app_ui/Articles";
import { Button } from "../Components/commons";
import { School } from "../Assets";
import "aos/dist/aos.css";

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

  const [page, setPage] = useState(1);

  const homePage = () => {
    setPage(page - 1);
  };

  const developersPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  switch (page) {
    case 1:
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

          <div className="... sticky top-0 py-5 px-3 z-40">
            <nav>
              <ul className="px-3 w-full inline-flex items-center gap-5">
                <li className="font-bold">SLU TRIAGE</li>
                <div className="ml-auto inline-flex items-center gap-5">
                  <li
                    className="text-xl font-bold cursor-pointer"
                    onClick={homePage}
                  >
                    Home
                  </li>
                  <li className="cursor-pointer" onClick={developersPage}>
                    Developers
                  </li>
                </div>
              </ul>
            </nav>
          </div>

          <div className="p-5 h-full ... flex flex-col justify-center items-center gap-5">
            <img
              className="h-auto w-32"
              src={School}
              alt="Saint Louis University PH Triage Application Logo"
            />

            <div className="text-center">
              <p>SAINT LOUIS UNIVERSITY </p>
              <p className="text-xl font-bold">TRIAGE APPLICATION</p>
            </div>

            <div className="grid grid-rows-2 gap-3">
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

    case 2:
      return (
        <div className="h-screen w-full">
          <div className="... sticky top-0 py-5 px-3 z-40">
            <nav>
              <ul className="px-3 w-full inline-flex items-center gap-5">
                <li className="font-bold">SLU TRIAGE</li>
                <div className="ml-auto inline-flex items-center gap-5">
                  <li className="cursor-pointer" onClick={homePage}>
                    Home
                  </li>
                  <li
                    className="text-xl font-bold cursor-pointer"
                    onClick={developersPage}
                  >
                    Developers
                  </li>
                </div>
              </ul>
            </nav>
          </div>

          <div className="py-16 p-5 space-y-5">
            <div>
              <p className="font-bold">THE DEVELOPERS</p>
            </div>

            <div className="grid grid-cols-2 gap-8 ">
              <div className="flex flex-col">
                <p className="font-bold">Kristian Harrel J. Zuniga</p>
                <p className="text-xs">Front-end Developer, UI/UX Designer</p>
              </div>

              <div className="flex flex-col">
                <p className="font-bold">Joemari M. Lopez</p>
                <p className="text-xs">Back-end Developer</p>
              </div>

              <div className="flex flex-col">
                <p className="font-bold">Ervin Joshua T. Fernandez</p>
                <p className="text-xs">Front-end Developer</p>
              </div>

              <div className="flex flex-col">
                <p className="font-bold">Athenie Andrei E. Marzan</p>
                <p className="text-xs">Graphic Designer, UI/UX Designer</p>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return <div></div>;
  }
}

export default Introduction;
