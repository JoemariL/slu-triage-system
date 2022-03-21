import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Dashboard, Header } from "../../Components";
import { QRButton } from "../../assets";

function Home({ auth }) {
  return (
    <div className="grid grid-rows-auto gap-28">
      <div>
        <Header>
          <div className="pt-5 px-8 pb-5 grid grid-rows-auto text-base text-white">
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
        <div className="mx-5 p-4 flex flex-col items-center text-center space-y-4 rounded-lg bg-slate-100 cursor-pointer hover:scale-105 focus:outline-none ease-in-out duration-300">
          <img
            className="object-contain rounded-full w-48 h-auto"
            src={QRButton}
            alt="QR Button"
          />
          <span>Scan QR Code</span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Home);
