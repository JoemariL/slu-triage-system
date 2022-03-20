import React from "react";
import { RiErrorWarningFill } from "react-icons/ri"
import { QRButton } from "../../assets";
import { Dashboard, Header } from "../../Component";

function Home() {
  return (
    <div className="grid grid-rows-auto gap-24">
      <div>
        <Header>
          <div className="pl-8 pt-5 pb-5 grid grid-rows-auto text-base text-white">
            <div>
              <p>
                <span>
                  <strong>NAME</strong>
                </span>
              </p>
            </div>
            <div>
              <p>
                <span>TYPE</span>
              </p>
            </div>

            <div>
              <p>
                <span>U/ID:&nbsp;</span>
              </p>
            </div>
          </div>

          <div className="mx-5">
            <Dashboard />
          </div>
        </Header>
      </div>

      <div className="grid grid-rows-auto gap-4">
        <div className="mx-5 p-4 flex flex-row items-center rounded-md bg-orange-300 cursor-pointer hover:scale-105 focus:outline-none ease-in-out duration-300">
          <div>
            <p>Please answer your Health Declaration Form.</p>
          </div>

          <div className="ml-auto">
            <RiErrorWarningFill className="h-auto w-7 text-yellow-800" />
          </div>
        </div>

        <div className="mx-5 p-10 flex flex-col text-center items-center rounded-md space-y-4 bg-slate-100 cursor-pointer hover:scale-105 focus:outline-none ease-in-out duration-300">
          <img
            className="object-contain rounded-md w-48 h-auto"
            src={QRButton}
            alt="QR Button"
          />
          <p>
            <span>Scan QR Code</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
