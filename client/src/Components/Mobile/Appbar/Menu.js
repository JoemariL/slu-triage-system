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
        <div className="px-8 py-8 flex flex-row justify-between bg-gradient-to-r from-blue-100 to-blue-200">
          {/* Account and Name. */}
          <div className="grid grid-flow-row auto-rows- space-y-5">
            <div>
              <span className="text-xl">
                <strong>NAME</strong>
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
        <div className="grid grid-flow-row auto-rows-auto space-y-2">
          <div className="h-16 px-8 flex flex-row justify-between items-center text-lg cursor-pointer hover:bg-gray-100">
            <span>Log out</span>
            <MdOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
