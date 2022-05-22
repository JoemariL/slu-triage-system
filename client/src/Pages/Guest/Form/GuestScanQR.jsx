import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";

import { addVisitor } from "../../../actions/visitorActions";

import { MainLayout } from "../../../Components/app_ui/Layouts";
import { Formbar, ErrorUI } from "../../../Components/app_ui";
import { Button } from "../../../Components//commons";

function GuestScanQR() {
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
    <div>
      <div className="bg-white w-full sticky top-0 z-40">
        <Formbar
          header="QR Code Scanner"
          onReturnClick={(e) => {
            e.preventDefault();
            navigate("/visitor/main");
          }}
        />

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
                  navigate("/visitor/main");
                }}
                roundedFull
              />
            </div>
          </div>
        </MainLayout>
      </div>
    </div>
  );
}

export default GuestScanQR;
