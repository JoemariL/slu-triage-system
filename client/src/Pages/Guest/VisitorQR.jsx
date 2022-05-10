import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import { addVisitor } from "../../actions/visitorActions";
import { Button } from "../../Components/commons";

function VisitorQR() {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userVaccine = JSON.parse(localStorage.getItem("userVaccine"));
  const userHdf = JSON.parse(localStorage.getItem("userHDF"));

  const handleSubmitQR = async (qrCode) => {
    const payload = {
      qrCode,
      ...userInfo,
      ...userVaccine,
      ...userHdf,
    };
    await addVisitor(payload);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userVaccine");
    localStorage.removeItem("userHDF");
    navigate("/visitor/qr-scanner/success");
  };

  return (
    <div className="relative text-sm bg-slate-100 ... sm:text-base">
      <div className="py-10 px-5 flex flex-col space-y-10 rounded-t-3xl bg-white ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
        <div className="space-y-2">
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
            videoStyle={{ width: "100%" }}
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
              navigate("/visitor/main");
            }}
            roundedFull
          />
        </div>
      </div>
    </div>
  );
}

export default VisitorQR;
