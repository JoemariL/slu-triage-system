import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import useAuth from "../../hooks/useAuth";
import { scanQR } from "../../actions/userActions";
import { getHdfDay } from "../../actions/userActions";
import { Formbar, Error } from "../../Components/ui";
import { Input, Button } from "../../Components/commons";

function QRScanner() {
  const navigate = useNavigate();

  // react hooks
  const { auth } = useAuth();

  // initializations
  const [errMessage, setErrMessage] = useState("");
  const [destination, setDestination] = useState("");

  // render states
  const [step, setstep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // render handlers
  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };

  const errorPopUp = () => {
    setError(!error);
  };

  const handleSubmitQR = async (qrCode) => {
    const payload = {
      destination,
      qrCode,
    };

    const response = await scanQR(payload);
    if (response.hasOwnProperty("message")) {
      setErrMessage(response.message);
      errorPopUp();
    } else {
      navigate("/qr-scanner/success");
    }
  };

  // use effects
  useEffect(() => {
    (async function () {
      const user = await getHdfDay();
      if (!user || user.length === 0) {
        localStorage.setItem("hdf", null);
      } else {
        localStorage.setItem("hdf", user[0]._id);
      }
    })();
  }, []);

  switch (step) {
    case 1:
      return (
        <div className="text-sm bg-slate-100 ... sm:text-base">
          <Formbar
            header="Scan QR Code"
            onReturnClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          />

          <div className="py-10 px-5 flex flex-col space-y-10 rounded-t-3xl bg-white ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
            <div>
              <span className="text-lg">
                Where will you go within the campus?
              </span>
              <Input
                placeholder="Enter your Destination"
                id="deptDestination"
                name="deptDestination"
                type="text"
                subtitle="D522 Lab, Registrar, etc."
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
              />
            </div>

            <div className="space-y-3">
              <Button
                label="Confirm Destination"
                type="button"
                loading={isLoading}
                onClick={nextStep}
                disabled={destination === "" && destination.trim().length <= 0}
              />
            </div>
          </div>
        </div>
      );

    case 2:
      return (
        <div className="relative text-sm bg-slate-100 ... sm:text-base">
          {error && (
            <Error
              header="QR SCAN ERROR!"
              message={errMessage}
              onClick={errorPopUp}
            />
          )}

          <Formbar
            header="Scan QR Code"
            onReturnClick={(e) => {
              e.preventDefault();
              prevStep();
            }}
          />

          <div className="py-10 px-5 flex flex-col space-y-10 rounded-t-3xl bg-white ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
            <div>
              <div className="text-center">
                <span className="font-bold underline underline-offset-2 decoration-blue-800">
                  ALIGN QR CODE TO SCAN
                </span>
              </div>

              <QrReader
                scanDelay={500}
                constraints={{ facingMode: "environment" }}
                onResult={(result, error) => {
                  if (!!result) {
                    handleSubmitQR(result?.text);
                  }
                }}
                videoStyle={{ width: "100vw" }}
              />
            </div>

            <div className="px-16">
              <Button
                secondary
                label="Cancel"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("hdf");
                  navigate("/main");
                }}
                roundedFull
              />
            </div>
          </div>
        </div>
      );
    default:
      return <div className="text-sm ... sm:text-base"></div>;
  }
}

export default QRScanner;
