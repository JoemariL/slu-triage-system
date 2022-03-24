import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { HiMail, HiPhone } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";

const Menu = (props) => {
  return (
    <div className="text-base">
      {/* Main background. */}
      <div className="fixed w-full h-full z-50 bg-white">
        {/* Top part. */}
        <div className="px-8 py-8 flex flex-row justify-between bg-gradient-to-br from-indigo-200">
          {/* Account and Name. */}
          <div className="grid grid-flow-row auto-rows- space-y-5">
            <div className="grid grid-flow-row auto-rows-auto">
              <span className="text-sm text-gray-800">ACCOUNT PROFILE</span>
              <span className="text-xl">
                <strong>Name</strong>
              </span>
            </div>

            {/* User Details. */}
            <div className="grid grid-flow-row auto-rows-auto space-y-2">
              <div className="flex flex-row items-center space-x-2">
                <div className="component-icon bg-blue-500">
                  <BsPersonCircle className="text-white" />
                </div>
                <span className="text-gray-800">STUDENT</span>
              </div>

              <div className="flex flex-row items-center space-x-2">
                <div className="component-icon bg-blue-500">
                  <HiMail className="text-white" />
                </div>
                <span className="text-gray-800">Email Address</span>
              </div>

              <div className="flex flex-row items-center space-x-2">
                <div className="component-icon bg-blue-500">
                  <HiPhone className="text-white" />
                </div>
                <span className="text-gray-800">Contact Number</span>
              </div>
            </div>
          </div>

          {/* Close Menu Button. */}
          <div>{props.closeMenu}</div>
        </div>

        {/* Bottom Part. */}
        <div className="m-2 grid grid-flow-row auto-rows-auto space-y-2 rounded-2xl bg-slate-100">
          <div className="h-16 px-5 flex flex-row space-x-5 items-center text-lg rounded-2xl cursor-pointer hover:bg-blue-100">
            <div className="component-icon bg-gray-500">
              <MdOutlineLogout className="text-gray-100" />
            </div>

            <span>Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
