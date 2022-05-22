import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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

  const navigateMain = (e) => {
    e.preventDefault();
    toggleIsActive(1);
    navigate("/main", { replace: true });
  };

  const navigateQR = (e) => {
    e.preventDefault();
    toggleIsActive(2);
    navigate("/triageapp-qrcodes", { replace: true });
  };

  const navigateReports = (e) => {
    e.preventDefault();
    toggleIsActive(3);
    navigate("/reports", { replace: true });
  };

  const navigateAppUsers = (e) => {
    e.preventDefault();
    toggleIsActive(4);
    navigate("/triageapp-users", { replace: true });
  };

  const navigateAdministrators = (e) => {
    e.preventDefault();
    toggleIsActive(5);
    navigate("/triageapp-administrators", { replace: true });
  };

  return (
    <>
      <nav className="bg-blue-900 sticky top-0 py-5 px-3 z-40 ... text-white">
        <ul className="w-full ... inline-flex items-center gap-x-3">
          <li
            className={classnames(
              "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black",
              isActive === 1 && "bg-slate-100 text-black"
            )}
            onClick={navigateMain}
          >
            DASHBOARD
          </li>

          <li
            className={classnames(
              "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black",
              isActive === 2 && "bg-slate-100 text-black"
            )}
            onClick={navigateQR}
          >
            CAMPUS & GATE
          </li>

          <li
            className={classnames(
              "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black",
              isActive === 3 && "bg-slate-100 text-black"
            )}
            onClick={navigateReports}
          >
            REPORTS
          </li>

          <li
            className={classnames(
              "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black",
              isActive === 4 && "bg-slate-100 text-black"
            )}
            onClick={navigateAppUsers}
          >
            TRIAGE USERS
          </li>

          <li
            className={classnames(
              "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black",
              isActive === 5 && "bg-slate-100 text-black"
            )}
            onClick={navigateAdministrators}
          >
            TRIAGE TEAM
          </li>

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
