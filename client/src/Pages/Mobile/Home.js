import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { QRButton } from "../../assets";
import { Dashboard, Header } from "../../Component";

function Home() {
  return (
    <div className="grid grid-rows-auto gap-28">
      <div>
        <Header>
          <div className="pt-5 pl-8 pb-5 grid grid-rows-auto text-base text-white">
            <div>
              <span>
                <strong>NAME</strong>
              </span>
            </div>
            <div>
              <span>TYPE</span>
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

      <div className="grid grid-rows-auto">
        <div className="p-5 flex flex-col items-center text-center space-y-4 rounded-md bg-slate-100 cursor-pointer hover:scale-105 focus:outline-none ease-in-out duration-300">
          <img
            className="object-contain rounded-md w-48 h-auto"
            src={QRButton}
            alt="QR Button"
          />
          <span>Scan QR Code</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
