import React, { useState, useEffect } from "react";
// React icon imports.
import { useNavigate } from "react-router-dom";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { FaSyringe } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
import { FiFileText } from "react-icons/fi";
// Component imports.
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

      <div className="flex flex-col space-y-16">
        {/* Header. */}
        <div className="h-32 py-3 rounded-b-xl bg-blue-900">
          {/* Summarized user details. */}
          <div className="flex flex-row justify-between items-center">
            <div className="px-4 grid grid-row-2 text-white">
              <span>WELCOME</span>
              <span>
                <strong>
                  {user.first_name} {user.last_name}
                </strong>
              </span>
            </div>

            {/* Hamburger menu. */}
            <div className="px-5">
              <button
                className="rounded-full focus:outline-none hover:scale-110 ease-in-out duration-300"
                type="button"
                onClick={() => setMenuOpened(!menuOpened)}
              >
                <Icon
                  className="p-2 bg-white"
                  icon={<RiMenuUnfoldFill className="h-6 w-6 text-blue-800" />}
                />
              </button>
            </div>
          </div>

          {/* Dashboard. */}
          <div className="mt-5 mx-5 grid grid-cols-2 text-center text-blue-800 sm:mx-16 md:mx-28 lg:mx-36 ease-in-out duration-300">
            <div
              onClick={() => {
                navigate("/vaccine");
              }}
              className="p-4 rounded-l-md bg-white shadow-sm cursor-pointer hover:bg-slate-100"
            >
              <Icon icon={<FaSyringe className="text-xl" />} />
              <span className="break-words text-sm">Vaccination Profile</span>
            </div>

            <div
              onClick={() => {
                navigate("/hdf");
              }}
              className="p-4 rounded-r-md bg-white shadow-sm cursor-pointer hover:bg-slate-100"
            >
              <Icon icon={<GiHealthNormal className="text-xl" />} />
              <span className="break-words text-sm">
                Health Declaration Form
              </span>
            </div>
          </div>
        </div>

        {/* Contents. */}
        <div className="mx-5 space-y-3 sm:mx-16 md:mx-28 lg:mx-36 ease-in-out duration-300">
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
