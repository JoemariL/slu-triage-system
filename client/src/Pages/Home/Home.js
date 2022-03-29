import React, { useState, useEffect } from "react";
// React npm modules.
import { useNavigate } from "react-router-dom";
// React icons.
import { FaCheck, FaSyringe } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { GoReport } from "react-icons/go";
import { MdSpaceDashboard } from "react-icons/md";
import { RiMenuUnfoldFill, RiMenuFoldFill } from "react-icons/ri";
// Pages.
import Menu from "./Menu";
// Components.
import { Icon } from "../../Components/commons";
// Actions & hooks.
import { logout } from "../../actions/authActions";
import { getUserData, getHdfDay } from "../../actions/userActions";
import useAuth from "../../hooks/useAuth";
// Resources.
import { QRButton, QRButtonDisabled } from "../../assets/";

function Home() {
  const navigate = useNavigate();

  // Actions & hooks.
  const { auth, setAuth } = useAuth();

  // User variables.
  const [user, setUser] = useState({});
  const [hdf, setHdf] = useState({});

  const [openMenu, setOpenMenu] = useState(false);
  const [hasHDF, setHasHDF] = useState(false);

  useEffect(() => {
    (async function () {
      const user = await getUserData();
      setUser(user);
    })();
  }, [auth]);

  useEffect(() => {
    (async function () {
      const user = await getHdfDay();
      if (!user || user.length === 0) {
        setHdf({});
      } else {
        setHasHDF(true);
        setHdf(user[0]);
      }
    })();
  }, [auth]);

  const logoutUser = async (e) => {
    e.preventDefault();
    const response = await logout();
    if (response) {
      setAuth({ access: null });
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="relative text-sm sm:text-base">
      {/* Menu. */}
      {openMenu && (
        <Menu
          userDetails={user}
          logoutOption={logoutUser}
          closeOnClick={() => setOpenMenu(false)}
        />
      )}

      {/* Main. */}
      <div className="flex flex-col space-y-5">
        {/* Header/Navigation/Profile. */}
        <div className="p-5 flex flex-row justify-between items-center">
          {/* User first name & last name. */}
          <div className="flex flex-col">
            <span className="text-gray-500">WELCOME</span>
            <span className="text-xl underline underline-offset-2 decoration-blue-800">
              <strong>
                {user.first_name}&nbsp;{user.last_name}
              </strong>
            </span>
          </div>

          {/* Menu prop. */}
          <div>
            <button
              className="rounded-full focus:outline-none"
              type="button"
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
            >
              {openMenu ? (
                <Icon
                  className="btn-icon-primary"
                  icon={<RiMenuFoldFill className="h-6 w-6 text-white" />}
                />
              ) : (
                <Icon
                  className="btn-icon-primary"
                  icon={<RiMenuUnfoldFill className="h-6 w-6 text-white" />}
                />
              )}
            </button>
          </div>
        </div>

        {/* Dashboard. */}
        <div onClick={() => setOpenMenu(false)}>
          <div className="mx-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300 space-y-5">
            <div>
              {/* RESULT. */}
              {hasHDF && (
                <div>
                  {hdf.allowed ? (
                    <div
                      className="p-5 cursor-pointer bg-blue-600 hover:opacity-90 focus:outline-none ease-in-out duration-300"
                      onClick={() => {
                        navigate("/entry_result");
                      }}
                    >
                      <div className="flex flex-row items-center gap-x-3">
                        <Icon
                          className="p-2 rounded-full bg-blue-400"
                          icon={<FaCheck className="h-5 w-5 text-white" />}
                        />

                        <div className="flex flex-col text-white">
                          <span>ALLOWED</span>
                          <span className="text-sm">Entry status</span>
                        </div>

                        <div className="ml-auto text-white">
                          <span>
                            <strong>CLICK TO VIEW</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="p-5 cursor-pointer bg-red-600 hover:opacity-90 focus:outline-none ease-in-out duration-300"
                      onClick={() => {
                        navigate("/entry_result");
                      }}
                    >
                      <div className="flex flex-row items-center gap-x-3">
                        <Icon
                          className="p-2 rounded-full bg-red-400"
                          icon={<ImCross className="h-5 w-5 text-white" />}
                        />

                        <div className="flex flex-col text-white">
                          <span>NOT ALLOWED</span>
                          <span className="text-sm">Entry status</span>
                        </div>

                        <div className="ml-auto text-white">
                          <span>
                            <strong>CLICK TO VIEW</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Operations. */}
              <div className="p-5 rounded space-y-5 shadow-sm bg-blue-50">
                <div className="flex flex-row items-center space-x-3">
                  <Icon
                    className="p-1 rounded bg-green-300"
                    icon={<MdSpaceDashboard className="h-4 w-4 text-white" />}
                  />
                  <span>Dashboard</span>
                </div>

                <div className="flex flex-col rounded space-y-2 bg-white">
                  {/* List 01. */}
                  <button
                    className="p-3 flex flex-row items-center rounded gap-x-5 hover:bg-slate-100"
                    type="button"
                    onClick={() => {
                      navigate("/hdf");
                    }}
                  >
                    <Icon
                      className="p-2 rounded-full bg-red-400"
                      icon={<GiHealthNormal className="h-4 w-4 text-white" />}
                    />
                    <span className="text-left">
                      Fill out your Health Declaration Form
                    </span>
                  </button>

                  {/* List 02. */}
                  <button
                    className="p-3 flex flex-row items-center rounded space-x-5 hover:bg-slate-100"
                    type="button"
                    onClick={() => {
                      navigate("/vaccine_profile");
                    }}
                  >
                    <Icon
                      className="p-2 rounded-full bg-blue-400"
                      icon={<FaSyringe className="h-4 w-4 text-white" />}
                    />
                    <span className="text-left">
                      Manage your Vaccine Profile
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* SCAN QR BUTTON. */}
            {hasHDF ? (
              <div className="p-4 flex flex-col items-center text-center space-y-4 rounded cursor-pointer bg-gradient-to-l from-yellow-200 to-yellow-500 hover:scale-105 hover:opacity-90 focus:outline-none ease-in-out duration-300">
                <img
                  className="object-contain rounded-full h-auto w-36"
                  src={QRButton}
                  alt="saint louis university triage application qr code scanner button"
                />
                <div className="px-4 py-1 rounded-full bg-white">
                  <span>Scan QR</span>
                </div>
              </div>
            ) : (
              <div className="p-4 flex flex-col items-center text-center space-y-4 rounded bg-gradient-to-l from-gray-200 to-gray-500">
                <img
                  className="object-contain rounded-full h-auto w-36"
                  src={QRButtonDisabled}
                  alt="saint louis university triage application qr code scanner button"
                />
                <div className="px-4 py-1 rounded-full bg-white">
                  <span>Please fill out your HDF first before scanning.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
