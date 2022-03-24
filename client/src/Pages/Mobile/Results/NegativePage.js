import React, { useState } from "react";
import { RiMenuUnfoldLine, RiMenuFoldLine } from "react-icons/ri";
import { Dashboard, Header, Menu } from "../../../Components/";
import { Disapproved } from "../../../assets/";

function NegativePage() {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div className="h-screen grid grid-flow-row auto-rows-auto space-y-5">
      {menuOpened && (
        <Menu
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
          <div className="px-5 py-5 flex flex-row">
            <div className="ml-auto">
              <button
                className="component-button-icon bg-white focus:outline-none hover:scale-110 ease-in-out duration-300"
                type="button"
                onClick={() => setMenuOpened(!menuOpened)}
              >
                <RiMenuUnfoldLine className="text-blue-800" />
              </button>
            </div>
          </div>
        </Header>
      </div>

      <div className="mx-10 grid grid-flow-row auto-rows-auto space-y-10 sm:mx-28 md:mx-44 lg:mx-60 ease-in-out duration-300">
        <div className="flex flex-col justify-center items-center space-y-2">
          <div>
            <img
              className="object-contain rounded-full w-36 h-auto"
              src={Disapproved}
              alt="Disapproved to enter campus"
            />
          </div>

          <p className="text-center">
            <span className="text-xl">
              You are not allowed to enter the
              <br />
              Saint Louis University Campus.
            </span>
          </p>
        </div>

        <hr />

        <div>
          <p>
            DATE & TIME <br />
            <span>
              <strong>
                <u>DATE</u>
              </strong>
            </span>
          </p>
        </div>

        <div className="flex flex-col space-y-1">
          <span>STATUS</span>
          <div className="p-2 px-5 rounded-xl bg-gradient-to-r from-red-700">
            <span className="text-white">NOT ALLOWED</span>
          </div>
        </div>

        <div className="mt-auto">
          <button className="component-button-gray" type="button">
            Return
          </button>
        </div>
      </div>
      <br />
    </div>
  );
}

export default NegativePage;
