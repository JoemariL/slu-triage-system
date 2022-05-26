import React, { useRef, useState, useEffect } from "react";
import classNames from "classnames";

import {
  getAllQr,
  regenerateQR,
  deleteGate,
  deleteSchool,
} from "../actions/adminActions";

import { RegisterCampusForm, RegisterGateForm } from "../Modules/Forms";

import { ConfirmationBox, PrintQRPDF } from "../Components/app_ui";
import {
  Background,
  DualLayout,
  ListItemLayout,
} from "../Components/app_ui/Layout";
import { CampusTab, QRDisplay, QRList } from "../Components/app_ui/Misc";
import { Button, Checkbox, Input, Alert } from "../Components/common";
import { Modal, ModalHeader, ModalContent } from "../Components/common/Modal";

import { CampusEmpty, GateEmpty } from "../Assets/Placeholders";

function TriageQR() {
  const [selectedCampus, setSelectedCampus] = useState({});
  const [QRData, setQRData] = useState({});
  const [QRCode, setQRCode] = useState({});
  const [QR, setQR] = useState("");

  const [campusID, setCampusID] = useState("");
  const [gateID, setGateID] = useState("");
  const [campusName, setCampusName] = useState("");
  const [gateName, setGateName] = useState("");

  const [controller, setController] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [registerCampus, setRegisterCampus] = useState(false);

  const renderRegisterCampus = () => {
    setRegisterCampus(!registerCampus);
    setController(!controller);
  };

  const [registerGate, setRegisterGate] = useState(false);

  const renderRegisterGate = () => {
    setRegisterGate(!registerGate);
    setController(!controller);
  };

  const [removeCampus, setRemoveCampus] = useState(false);

  const renderRemoveCampus = () => {
    setRemoveCampus(!removeCampus);
  };

  const [removeGate, setRemoveGate] = useState(false);

  const renderRemoveGate = () => {
    setRemoveGate(!removeGate);
  };

  const [viewGateQR, setViewGateQR] = useState(false);

  const renderViewGateQR = () => {
    setViewGateQR(!viewGateQR);
  };

  useEffect(() => {
    (async function () {
      setIsPending(true);
      const data = await getAllQr();
      setQRData(data);
      setIsPending(false);
    })();
  }, [controller]);

  const handleDeleteCampus = async () => {
    setIsLoading(true);

    const response = await deleteSchool(selectedCampus._id);

    if (response.hasOwnProperty("message")) {
      alert("Something went wrong.");
      setIsLoading(false);
    } else {
      alert("CAMPUS DELETED SUCCESSFULLY!");
      setIsLoading(false);
      renderRemoveGate();
    }
    setController(!controller);
  };

  const handleDeleteGate = async () => {
    setIsLoading(true);

    const response = await deleteGate(selectedCampus._id, gateID);

    if (response.hasOwnProperty("message")) {
      alert("Something went wrong.");
      setIsLoading(false);
    } else {
      alert("GATE DELETED SUCCESSFULLY!");
      setIsLoading(false);
      renderRemoveGate();
    }
    setController(!controller);
  };

  const handleRegenerateQR = async (gateId) => {
    setIsLoading(true);

    const response = await regenerateQR(selectedCampus._id, gateId);

    if (response.hasOwnProperty("message")) {
      alert("Something went wrong!");
      setIsLoading(false);
    } else {
      alert("GATE QR RE-GENERATED!");
      setIsLoading(false);
    }
    setController(!controller);
  };

  return (
    <>
      {registerCampus && (
        <Modal>
          <ModalContent>
            <ModalHeader close={renderRegisterCampus}>
              Register Campus
            </ModalHeader>

            <div className="mx-5 mt-10">
              <RegisterCampusForm CLOSE_ON_SUBMIT={renderRegisterCampus} />
            </div>
          </ModalContent>
        </Modal>
      )}

      {registerGate && (
        <Modal>
          <ModalContent>
            <ModalHeader close={renderRegisterGate}>Register Gate</ModalHeader>

            <div className="mx-5 mt-10">
              <RegisterGateForm
                ID={selectedCampus._id}
                CLOSE_ON_SUBMIT={renderRegisterGate}
              />
            </div>
          </ModalContent>
        </Modal>
      )}

      {removeCampus && (
        <ConfirmationBox
          contentHeader="Remove Campus"
          contentMessage="Are you sure you want to delete this campus?"
          alertHeader="Warning"
          alertMessage="You cannot undo this action."
          emphasis={selectedCampus.school}
          confirmButtonLabel="DELETE CAMPUS"
          close={renderRemoveCampus}
          cancel={renderRemoveCampus}
          confirm={handleDeleteCampus}
          hasAlert
          warning
        />
      )}

      {removeGate && (
        <ConfirmationBox
          contentHeader="Remove Gate"
          contentMessage="Are you sure you want to delete this gate?"
          alertHeader="Warning"
          alertMessage="You cannot undo this action."
          emphasis={gateName}
          confirmButtonLabel="DELETE GATE"
          close={renderRemoveGate}
          cancel={renderRemoveGate}
          confirm={handleDeleteGate}
          hasAlert
          warning
        />
      )}

      {viewGateQR && (
        <Modal>
          <ModalContent>
            <ModalHeader close={renderViewGateQR}>
              {gateName} & QR CODE
            </ModalHeader>

            <div className="mx-5 mt-10">
              <QRDisplay
                CAMPUS_NAME={campusName}
                GATE_NAME={gateName}
                QR_VALUE={QR}
                REGENERATE={() => handleRegenerateQR(gateID)}
              />
            </div>
          </ModalContent>
        </Modal>
      )}

      <Background>
        <DualLayout>
          <div className="w-full border-2 lg:w-[28rem]">
            <div className="w-full p-2 ... inline-flex justify-between items-center shadow-sm">
              <span className="text-blue-600 text-lg font-bold">CAMPUS & GATE</span>
            </div>

            <div className="w-full p-2 ... inline-flex justify-between items-center shadow-sm">
              <Button
                className="ml-auto bg-blue-600 text-white ... rounded lg:w-full"
                label="REGISTER CAMPUS"
                type="button"
                onClick={renderRegisterCampus}
              />
            </div>

            <div className="h-[80%] px-2 pt-4 pb-48 overflow-y-auto ...">
              {QRData.length ? (
                QRData.map((payload) => {
                  return (
                    <CampusTab
                      key={payload._id}
                      CAMPUS_NAME={payload.school}
                      onClick={(e) => {
                        e.preventDefault();
                        setCampusID(payload);
                        setSelectedCampus(payload);
                        setCampusName(payload.school);
                        setQRCode(payload.gate_info);
                      }}
                      ACTIVE={campusID === payload}
                    />
                  );
                })
              ) : (
                <span className="font-bold">
                  THERE ARE NO REGISTERED CAMPUSES.
                </span>
              )}
            </div>
          </div>

          <div
            className={classNames(
              "h-full w-full overflow-y-auto",
              selectedCampus?.school && "bg-slate-50"
            )}
          >
            {selectedCampus?.school ? (
              <>
                <div className="bg-slate-100 sticky top-0 w-full p-2 z-40  ... inline-flex items-center shadow-sm">
                  <span className="px-4 text-lg">
                    {selectedCampus && selectedCampus.school}
                  </span>

                  <div className="ml-auto grid grid-cols-2 gap-3">
                    <Button
                      className="bg-red-600 text-white w-48 ... rounded"
                      label="DELETE CAMPUS"
                      type="button"
                      onClick={renderRemoveCampus}
                    />

                    <Button
                      className="bg-blue-600 text-white w-48 ... rounded"
                      label="REGISTER GATE"
                      type="button"
                      onClick={renderRegisterGate}
                    />
                  </div>
                </div>

                <div className="px-6 pt-4 pb-48 lg:w-[68rem]">
                  <ListItemLayout>
                    {QRCode.length ? (
                      QRCode.map((payload) => {
                        return (
                          <QRList
                            key={payload._id}
                            GATE_NAME={payload.gate}
                            DELETE={() => {
                              setGateID(payload._id);
                              setGateName(payload.gate);
                              renderRemoveGate();
                            }}
                            VIEW_QR={() => {
                              setGateID(payload._id);
                              setGateName(payload.gate);
                              setQR(payload.generated_code);
                              renderViewGateQR();
                            }}
                          />
                        );
                      })
                    ) : (
                      <span className="font-bold">
                        THERE ARE NO REGISTERED GATES.
                      </span>
                    )}
                  </ListItemLayout>
                </div>
              </>
            ) : (
              <div className="p-4">
                <span className="font-bold">
                  CLICK A SPECIFIC CAMPUS ON THE LEFT-SIDE TO VIEW ITS GATES.
                </span>
              </div>
            )}
          </div>
        </DualLayout>
      </Background>
    </>
  );
}

export default TriageQR;
