import React, { useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { IoLogOutOutline } from "react-icons/io5";
import classnames from "classnames";

import { logout } from "../../../actions/authActions";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

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
      {isTabletOrMobile ? (
        <nav className="bg-blue-900 text-sm sticky top-0 py-5 px-3 z-40 ... text-white">
          <ul className="w-full ... inline-flex items-center gap-x-3">
            <div className="w-[40rem] inline-flex items-center gap-x-3 overflow-x-auto">
              <NavLink
                to="/main"
                className={({ isActive }) =>
                  isActive ? "bg-slate-100 text-black rounded" : ""
                }
              >
                <li
                  className={classnames(
                    "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black"
                  )}
                >
                  DASHBOARD
                </li>
              </NavLink>

              <NavLink
                to="/triageapp-qrcodes"
                className={({ isActive }) =>
                  isActive ? "bg-slate-100 text-black rounded" : ""
                }
              >
                <li
                  className={classnames(
                    "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black"
                  )}
                >
                  CAMPUS & GATE
                </li>
              </NavLink>

              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  isActive ? "bg-slate-100 text-black rounded" : ""
                }
              >
                <li
                  className={classnames(
                    "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black"
                  )}
                >
                  REPORTS
                </li>
              </NavLink>

              <NavLink
                to="/triageapp-users"
                className={({ isActive }) =>
                  isActive ? "bg-slate-100 text-black rounded" : ""
                }
              >
                <li
                  className={classnames(
                    "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black"
                  )}
                >
                  TRIAGE USERS
                </li>
              </NavLink>

              <NavLink
                to="/triageapp-administrators"
                className={({ isActive }) =>
                  isActive ? "bg-slate-100 text-black rounded" : ""
                }
              >
                <li
                  className={classnames(
                    "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black"
                  )}
                >
                  TRIAGE TEAM
                </li>
              </NavLink>
            </div>

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
      ) : (
        <nav className="bg-blue-900 sticky top-0 py-5 px-3 z-40 ... text-white">
          <ul className="w-full ... inline-flex items-center gap-x-3">
            <NavLink
              to="/main"
              className={({ isActive }) =>
                isActive ? "bg-slate-100 text-black rounded" : ""
              }
            >
              <li
                className={classnames(
                  "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black"
                )}
              >
                DASHBOARD
              </li>
            </NavLink>

            <NavLink
              to="/triageapp-qrcodes"
              className={({ isActive }) =>
                isActive ? "bg-slate-100 text-black rounded" : ""
              }
            >
              <li
                className={classnames(
                  "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black"
                )}
              >
                CAMPUS & GATE
              </li>
            </NavLink>

            <NavLink
              to="/reports"
              className={({ isActive }) =>
                isActive ? "bg-slate-100 text-black rounded" : ""
              }
            >
              <li
                className={classnames(
                  "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black"
                )}
              >
                REPORTS
              </li>
            </NavLink>

            <NavLink
              to="/triageapp-users"
              className={({ isActive }) =>
                isActive ? "bg-slate-100 text-black rounded" : ""
              }
            >
              <li
                className={classnames(
                  "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black"
                )}
              >
                TRIAGE USERS
              </li>
            </NavLink>

            <NavLink
              to="/triageapp-administrators"
              className={({ isActive }) =>
                isActive ? "bg-slate-100 text-black rounded" : ""
              }
            >
              <li
                className={classnames(
                  "py-2 px-3 rounded cursor-pointer hover:bg-slate-100 hover:text-black"
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
      )}

      <Outlet />
    </>
  );
};

export default Navbar;
