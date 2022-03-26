import React, { useState, useEffect } from "react";
// React icon imports.
import { RiMenuUnfoldFill, RiMenuFoldFill } from "react-icons/ri";
import { IoAlertCircle } from "react-icons/io5";
import { FaSyringe } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
// Component imports.
import { Icon } from "../../Components/commons";
import { Menu } from "../../Components/presets/mobile";
import { QRButton } from "../../assets/index";

import useAuth from '../../hooks/useAuth';
import { logout } from '../../actions/authActions';
import { getUserData } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    (async function(){
      const user = await getUserData()
      setUser(user)
    })()
  }, [])
  
  const logoutSubmit = async (e) => {
    e.preventDefault();
    const response = await logout()
    if(response) {
      setAuth({ access: null })
      navigate('/login', { replace: true })
    }
  }

  return (
    <div className="text-lg">
      {/* Menu interface. */}
      {menuOpened && (
        <Menu
          user={user}
          logout={logoutSubmit}
          close={
            <button
              className="rounded-full focus:outline-none hover:scale-110 ease-in-out duration-300"
              type="button"
              onClick={() => setMenuOpened(false)}
            >
              <Icon
                className="p-3 bg-white"
                icon={<RiMenuFoldFill className="h-6 w-6 text-blue-800" />}
              />
            </button>
          }
        />
      )}

      <div className="space-y-20">
        {/* Header. */}
        <div className="h-32 rounded-b-2xl bg-blue-700">
          {/* Summarized user details. */}
          <div className="flex flex-row justify-between items-center">
            <div className="p-4 grid grid-row-2 text-white">
              <span>WELCOME</span>
              <span>
                <strong>{user.first_name} {user.last_name}</strong>
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
                  className="p-3 bg-white"
                  icon={<RiMenuUnfoldFill className="h-6 w-6 text-blue-800" />}
                />
              </button>
            </div>
          </div>

          {/* Dashboard. */}
          <div className="mx-5 rounded-xl bg-white drop-shadow sm:mx-16 md:mx-28 lg:mx-36 ease-in-out duration-300">
            <div className="h-24 flex flex-row items-center">
              <div onClick={() => { navigate('/profile/vaccine')}} className="container grid grid-rows-2 space-y-1 cursor-pointer text-blue-800 hover:text-blue-700">
                <Icon
                  icon={<FaSyringe className="border-2 rounded-full text-xl" />}
                />
                <span className="text-sm text-center text-blue-800">
                  Vaccine Profile
                </span>
              </div>

              <div className="container grid grid-rows-2 space-y-1 cursor-pointer text-blue-800 hover:text-blue-700">
                <div className="absolute p-2 top-0 right-0 self-end">
                  <IoAlertCircle className="h-6 w-6 text-red-600 animate-pulse" />
                </div>

                <Icon
                  icon={
                    <GiHealthNormal className="border-2 rounded-full text-xl" />
                  }
                />

                <span className="text-sm text-center text-blue-800">HDF</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contents. */}
        <div className="mx-5 sm:mx-16 md:mx-28 lg:mx-36 ease-in-out duration-300">
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
