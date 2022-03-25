import React, { useState, useEffect } from "react";
import { RiMenuUnfoldLine, RiMenuFoldLine } from "react-icons/ri";
import { Dashboard, Header, Menu } from "../../Components";
import { QRButton } from "../../assets";

import useAuth from '../../hooks/useAuth';
import { logout } from '../../actions/authActions'
import { getUserData } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  const [menuOpened, setMenuOpened] = useState(false);
  
  useEffect(() => {
    (async function(){
      const user = await getUserData(auth.user)
      setUser(user)
    })()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await logout(refreshToken)
    if(response) {
      setAuth({ user: null })
      navigate('/login', { replace: true })
    }
  }

  return (
    <div className="grid grid-rows-auto space-y-24">
      {menuOpened && (
        <Menu
          user={user}
          logout={handleSubmit}
          closeMenu={
            <button
              className="component-button-icon bg-blue-900 focus:outline-none hover:scale-110 hover:bg-blue-800 ease-in-out duration-300"
              type="button"
              onClick={() => setMenuOpened(false)}
            >
              <RiMenuFoldLine className="text-white" />
            </button>
          }
        />
      )}

      <div>
        <Header>
          <div className="px-5 py-5 flex flex-row justify-between">
            <div className="grid grid-flow-row auto-rows-auto items-center text-white">
              <span>
                WELCOME, &nbsp;
                <strong>{user.first_name} {user.last_name}</strong>
              </span>
            </div>

            <div>
              <button
                className="component-button-icon bg-white focus:outline-none hover:scale-110 ease-in-out duration-300"
                type="button"
                onClick={() => setMenuOpened(!menuOpened)}
              >
                <RiMenuUnfoldLine className="text-blue-800" />
              </button>
            </div>
          </div>

          <div className="mx-5 grid grid-rows-auto sm:mx-28 md:mx-44 lg:mx-60 ease-in-out duration-300">
            <Dashboard />
          </div>
        </Header>
      </div>

      <div className="grid grid-flow-row auto-rows-auto space-y-4 sm:mx-28 md:mx-44 lg:mx-60 ease-in-out duration-300">
        <div className="component-button-picture bg-gradient-to-tl from-yellow-100 to-yellow-500">
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
      <br />
    </div>
  );
}

export default Home;
