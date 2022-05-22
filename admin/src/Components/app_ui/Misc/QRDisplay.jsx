import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import QRCode from "react-qr-code";

import { QRPDF } from "../PDF";

import { Button, Checkbox } from "../../common";

const QRDisplay = ({
  GATE_ID,
  CAMPUS_NAME,
  GATE_NAME,
  QR_VALUE = "",
  REGENERATE = () => {},
  printOnClick = () => {},
}) => {
  const componentRef = useRef();

  const getDocumentTitle = () => {
    return GATE_NAME;
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [isChecked, setIsChecked] = useState(false);

  const toggleIsChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="mt-10">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-5">
            <QRCode value={QR_VALUE} />
            <span>
              Print this QR Code then post at your establishment's entrance.
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="space-y-3">
              <Button
                className="bg-blue-600 text-white w-full ... rounded-full"
                label="Download / Print QR"
                onClick={handlePrint}
              />

              <Button
                className="bg-green-600 text-white w-full ... rounded-full"
                label="Re-generate QR"
                disabled={!isChecked}
                onClick={REGENERATE}
              />

              <div className="pl-4">
                <Checkbox
                  label="I confirm to re-generate QR."
                  onChange={toggleIsChecked}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "none" }}>
        <QRPDF
          ref={componentRef}
          CAMPUS={CAMPUS_NAME}
          GATE={GATE_NAME}
          QRCODE={QR_VALUE}
        />
      </div>
    </>
  );
};

export default QRDisplay;
