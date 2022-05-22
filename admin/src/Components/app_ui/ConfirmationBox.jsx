import React, { useState } from "react";
import { Modal, ModalHeader, ModalContent } from "../common/Modal";
import { Alert, Button, Checkbox } from "../common";

const ConfirmationBox = ({
  contentHeader = "",
  contentMessage = "",
  alertHeader = "",
  alertMessage = "",
  emphasis = "",
  confirmButtonLabel = "",
  close = () => {},
  cancel = () => {},
  confirm = () => {},
  hasAlert = false,
  warning = false,
  error = false,
  info = false,
  loading = false,
}) => {
  const [isChecked, setIsChecked] = useState(() => {
    return false;
  });

  const toggleIsChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Modal>
      <ModalContent>
        <ModalHeader close={close}>{contentHeader}</ModalHeader>

        <div className="space-y-16">
          <div className="mt-16 space-y-5">
            <div className="flex flex-col justify-center items-center text-center">
              <p>{contentMessage}</p>
              <p className="font-bold text-lg">{emphasis}</p>
            </div>

            {hasAlert && (
              <>
                {info && (
                  <Alert header={alertHeader} message={alertMessage} info />
                )}

                {error && (
                  <Alert header={alertHeader} message={alertMessage} error />
                )}

                {warning && (
                  <Alert header={alertHeader} message={alertMessage} warning />
                )}
              </>
            )}
          </div>
        </div>

        <div className="absolute inset-x-6 bottom-5 ... grid grid-rows-2 grid-cols-2 justify-center items-center gap-3">
          <div className="col-span-2">
            <Checkbox
              label="I confirm this action."
              onChange={toggleIsChecked}
            />
          </div>

          <Button
            className="bg-gray-600 text-white ... rounded"
            label="CANCEL"
            onClick={cancel}
          />
          <Button
            className="bg-red-600 text-white ... rounded"
            label={confirmButtonLabel}
            onClick={confirm}
            loading={loading}
            disabled={!isChecked}
          />
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationBox;
