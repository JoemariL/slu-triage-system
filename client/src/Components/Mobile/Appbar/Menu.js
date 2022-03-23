import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { HiMail, HiPhone } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";

const Menu = (props) => {
  return (
    <div className="text-base">
      <div className="fixed w-full h-full z-50 bg-white">
        <div className="px-8 py-8 flex flex-row justify-between bg-gradient-to-r from-blue-100 to-blue-200">
          <div className="grid grid-flow-row auto-rows- space-y-5">
            <div className="grid grid-flow-row auto-rows-auto">
              <span className="text-sm text-gray-500">ACCOUNT</span>
              <span className="text-xl">
                <strong>NAME</strong>
              </span>
            </div>

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

          <div>{props.closeMenu}</div>
        </div>

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
