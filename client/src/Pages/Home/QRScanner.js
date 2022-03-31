import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { QrReader } from "react-qr-reader";
import { Appbar } from "../../Components";

function QRScanner(props) {
  const [data, setData] = useState("No result");

  return (
    <div
      className={classnames(
        "absolute min-h-screen w-full z-50 bg-white",
        props.className
      )}
    >
      {/* Appbar. */}
      <div>
        <Appbar
          headerText="Create your account"
          onClick={props.returnOnClick}
        />
      </div>

      <div className="py-20 px-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300">
        <div className="flex flex-col text-center">
          <div>
            <span>Align QR Code to scan.</span>
          </div>
          <div>
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  setData(result?.text);
                }
                if (!!error) {
                  console.info(error);
                }
              }}
              style={{ height: "auto", width: "200px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRScanner;
