import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";

import useAuth from "../../../hooks/useAuth";
import { getHdfDay, scanQR } from "../../../actions/userActions";

import { MainLayout } from "../../../Components/app_ui/Layouts";
import { Formbar, ErrorUI } from "../../../Components/app_ui";
import { Input, Button } from "../../../Components/commons";

function ScanQR() {
  const navigate = useNavigate();

  const { auth } = useAuth();

  const [errMessage, setErrMessage] = useState("");
  const [destination, setDestination] = useState("");

  const [step, setstep] = useState(1);

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };

  const [isError, setIsError] = useState(false);

  const renderIsError = () => {
    setIsError(!isError);
  };

  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmitQR = async (qrCode) => {
    const payload = {
      destination,
      qrCode,
    };

    const response = await scanQR(payload);
    if (response.hasOwnProperty("message")) {
      setErrMessage(response.message);
      renderIsError();
    } else {
      navigate("/qr-scanner/successful");
    }
  };

  // TODO: The part on the bottom has no destination input.
  // return (
  //   <div>
  //     <div className="bg-white w-full sticky top-0 z-40">
  //       <Formbar
  //         header="QR Code Scanner"
  //         onReturnClick={(e) => {
  //           e.preventDefault();
  //           navigate("/main");
  //         }}
  //       />
  //     </div>

  //     <MainLayout>
  //       <div className="space-y-5">
  //         <QrReader
  //           scanDelay={500}
  //           constraints={{ facingMode: "environment" }}
  //           onResult={(result, error) => {
  //             if (!!result) {
  //               handleSubmitQR(result?.text);
  //             }
  //           }}
  //         />

  //         <div className="w-full inline-flex justify-center items-center">
  //           <Button
  //             className="px-16 bg-white border-2 border-blue-800 text-blue-800 rounded-full"
  //             label="Cancel"
  //             type="button"
  //             onClick={(e) => {
  //               e.preventDefault();
  //               localStorage.removeItem("hdf");
  //               navigate("/main");
  //             }}
  //             roundedFull
  //           />
  //         </div>
  //       </div>
  //     </MainLayout>
  //   </div>
  // );

  switch (step) {
    case 1:
      return (
        <div>
          <div className="bg-white w-full sticky top-0 z-40">
            <Formbar
              header="Your Destination"
              onReturnClick={(e) => {
                e.preventDefault();
                navigate("/main");
              }}
            />
          </div>
          <MainLayout>
            <div className="flex flex-col space-y-5">
              <div>
                <span className="text-lg">
                  Where will you go within the campus?
                </span>
                <Input
                  placeholder="Enter your Destination"
                  id="deptDestination"
                  name="deptDestination"
                  type="text"
                  subtitle="Registrar, etc."
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                  }}
                />
              </div>

              <Button
                className="bg-blue-900 text-white rounded"
                label="Confirm Destination"
                type="button"
                loading={isLoading}
                onClick={nextStep}
                disabled={destination === "" && destination.trim().length <= 0}
              />
            </div>
          </MainLayout>
        </div>
      );

    case 2:
      return (
        <div>
          <div className="bg-white w-full sticky top-0 z-40">
            <Formbar
              header="QR Code Scanner"
              onReturnClick={(e) => {
                e.preventDefault();
                prevStep();
              }}
            />
          </div>

          <MainLayout>
            <div className="space-y-5">
              <QrReader
                scanDelay={500}
                constraints={{ facingMode: "environment" }}
                onResult={(result, error) => {
                  if (!!result) {
                    handleSubmitQR(result?.text);
                  }
                }}
              />

              <div className="w-full inline-flex justify-center items-center">
                <Button
                  className="px-16 bg-white border-2 border-blue-800 text-blue-800 rounded-full"
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
          </MainLayout>
        </div>
      );

    default:
      return <div></div>;
  }
}

export default ScanQR;
