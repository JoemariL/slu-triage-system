import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { FaSyringe } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
import { Icon } from "../../Components/commons";
import { Menu } from "../../Components/presets/mobile";
import { QRButton } from "../../assets/index";
import { logout } from "../../actions/authActions";
import { getUserData } from "../../actions/userActions";
import useAuth from "../../hooks/useAuth";

function Home() {
  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    (async function () {
      const user = await getUserData();
      setUser(user);
    })();
  }, [auth]);

  const logoutSubmit = async (e) => {
    e.preventDefault();
    const response = await logout();
    if (response) {
      setAuth({ access: null });
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="text-base relative">
      {/* Menu interface. */}
      {menuOpened && (
        <Menu
          className="absolute h-full w-full z-50"
          user={user}
          logout={logoutSubmit}
          closeOnClick={() => {
            setMenuOpened(false);
          }}
        />
      )}

      <div className="flex flex-col">
        {/* Header. */}
        <div className="p-5 border-b-2 bg-white border-gray-200">
          {/* Summarized user details + Menu button. */}
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <span className="text-gray-500">WELCOME</span>
              <span className="text-lg underline underline-offset-2 decoration-blue-800">
                <strong>
                  {user.first_name} {user.last_name}
                </strong>
              </span>
            </div>

            {/* Hamburger menu. */}
            <div>
              <button
                className="rounded-full focus:outline-none"
                type="button"
                onClick={() => setMenuOpened(!menuOpened)}
              >
                <Icon
                  className="p-2 rounded-full bg-blue-800"
                  icon={<RiMenuUnfoldFill className="h-6 w-6 text-white" />}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard. */}
        <div className="space-y-3 sm:mx-16 md:mx-28 lg:mx-36 ease-in-out duration-300">
          <div className="flex flex-col space-y-2 rounded-lg">
            {/* List 01. */}
            <button
              className="h-16 px-5 flex flex-row space-x-5 items-center hover:bg-slate-100"
              onClick={() => {
                navigate("/hdf");
              }}
              type="button"
            >
              <Icon
                className="p-2 rounded-full bg-red-400"
                icon={<GiHealthNormal className="h-4 w-4 text-white" />}
              />
              <span className="truncate">
                Fill out your Health Declaration Form
              </span>
            </button>

            {/* List 02. */}
            <button
              className="h-16 px-5 flex flex-row space-x-5 items-center hover:bg-slate-100"
              onClick={() => {
                navigate("/vaccine");
              }}
              type="button"
            >
              <Icon
                className="p-2 rounded-full bg-blue-400"
                icon={<FaSyringe className="h-4 w-4 text-white" />}
              />
              <span className="truncate">Manage your Vaccine Profile</span>
            </button>
          </div>
        </div>

        {/* Contents. */}
        <div className="m-5 space-y-3 sm:mx-16 md:mx-28 lg:mx-36 ease-in-out duration-300">
          <div className="p-4 flex flex-col items-center text-center space-y-4 rounded-lg cursor-pointer bg-gradient-to-tl from-yellow-100 to-yellow-500 hover:scale-105 hover:opacity-90 focus:outline-none ease-in-out duration-300">
            <img
              className="object-contain rounded-full w-48 h-auto"
              src={QRButton}
              alt="QR Button"
            />
            <div className="px-4 py-1 rounded-full bg-white">
              <span className="text-sm">Scan QR Code</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
