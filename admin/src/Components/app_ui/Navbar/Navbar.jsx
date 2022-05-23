import React, { useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import classnames from "classnames";

import { logout } from "../../../actions/authActions";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const [isActive, setIsActive] = useState(1);

  const toggleIsActive = (index) => {
    setIsActive(index);
  };

  const logoutUser = async (e) => {
    e.preventDefault();
    const response = await logout();
    if (response) {
      setAuth({ access: null });
      navigate("/login", { replace: true });
      window.location.reload();
    }
  };

  return (
    <>
      <nav className="bg-blue-900 sticky top-0 py-5 px-3 z-40 ... text-white">
        <ul className="w-full ... inline-flex items-center gap-x-3">
          <NavLink
            to="/main"
            style={({ isActive }) => {
              if (isActive) toggleIsActive(1);
            }}
          >
            <li
              className={classnames(
                "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black",
                isActive === 1 && "bg-slate-100 text-black"
              )}
            >
              DASHBOARD
            </li>
          </NavLink>

          <NavLink
            to="/triageapp-qrcodes"
            style={({ isActive }) => {
              if (isActive) toggleIsActive(2);
            }}
          >
            <li
              className={classnames(
                "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black",
                isActive === 2 && "bg-slate-100 text-black"
              )}
            >
              CAMPUS & GATE
            </li>
          </NavLink>

          <NavLink
            to="/reports"
            style={({ isActive }) => {
              if (isActive) toggleIsActive(3);
            }}
          >
            <li
              className={classnames(
                "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black",
                isActive === 3 && "bg-slate-100 text-black"
              )}
            >
              REPORTS
            </li>
          </NavLink>

          <NavLink
            to="/triageapp-users"
            style={({ isActive }) => {
              if (isActive) toggleIsActive(4);
            }}
          >
            <li
              className={classnames(
                "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black",
                isActive === 4 && "bg-slate-100 text-black"
              )}
            >
              TRIAGE USERS
            </li>
          </NavLink>

          <NavLink
            to="/triageapp-administrators"
            style={({ isActive }) => {
              if (isActive) toggleIsActive(5);
            }}
          >
            <li
              className={classnames(
                "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black",
                isActive === 5 && "bg-slate-100 text-black"
              )}
            >
              TRIAGE TEAM
            </li>
          </NavLink>

          <div className="ml-auto">
            <li
              className="py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black ... inline-flex items-center gap-x-3"
              onClick={logoutUser}
            >
              <IoLogOutOutline className="h-5s w-5" />
              SIGN OUT
            </li>
          </div>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
