import { Modal, ModalHeader, ModalContent } from "../../../common/Modal";
import { Button } from "../../../common";

const ManageUser = ({
  USER_DATA,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  TYPE,
  HAS_HDF = false,
  CLOSE = () => {},
  RESET_PASSWORD = () => {},
  VIEW_HDF = () => {},
}) => {
  return (
    <>
      <ModalHeader close={CLOSE}>Manage User</ModalHeader>

      <div className="mt-4 space-y-5">
        <div className="space-y-1">
          <div className="grid grid-rows-2 grid-cols-2 gap-3">
            <div className="col-span-2 underline underline-offset-2 decoration-blue-800">
              USER INFORMATION
            </div>
            <span>NAME</span>
            <span className="font-bold">
              {USER_DATA ? (
                <span>
                  {FIRST_NAME} {LAST_NAME}
                </span>
              ) : (
                ""
              )}
            </span>

            <span>EMAIL ADDRESS</span>
            <span className="font-bold">
              {USER_DATA ? <span>{EMAIL}</span> : ""}
            </span>

            <span>TYPE</span>
            <span className="font-bold">
              {USER_DATA ? <span>{TYPE}</span> : ""}
            </span>
          </div>
        </div>

        <hr />

        <div className="px-16 grid grid-flow-row auto-rows-max items-center gap-3">
          <Button
            className="bg-blue-600 text-white ... rounded"
            label="Reset Password"
            type="button"
            onClick={RESET_PASSWORD}
          />

          {HAS_HDF && (
            <Button
              className="bg-blue-600 text-white ... rounded"
              label="Health Declaration Form"
              type="button"
              onClick={VIEW_HDF}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ManageUser;
