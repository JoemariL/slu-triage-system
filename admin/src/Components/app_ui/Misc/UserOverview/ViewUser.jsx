import { Modal, ModalHeader, ModalContent } from "../../../common/Modal";
import { Button } from "../../../common";

const ViewUser = ({
  USER_DATA,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  TYPE,
  CONTACT,
  DEPARTMENT,
  ADDRESS,
  CLOSE = () => {},
  VIEW_HDF = () => {},
}) => {
  return (
    <>
      <ModalHeader close={CLOSE}>View User</ModalHeader>

      <div className="mt-4 space-y-5">
        <div className="space-y-1">
          <div className="grid grid-rows-2 grid-cols-2 gap-3">
            <span>TYPE</span>
            <span className="font-bold">
              {USER_DATA ? <span>{TYPE}</span> : ""}
            </span>

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

            <span>DEPARTMENT</span>
            <span className="font-bold">
              {USER_DATA ? <span>{DEPARTMENT}</span> : ""}
            </span>

            <span>EMAIL ADDRESS</span>
            <span className="font-bold">
              {USER_DATA ? <span>{EMAIL}</span> : ""}
            </span>

            <span>CONTACT NUMBER</span>
            <span className="font-bold">
              {USER_DATA ? <span>{CONTACT}</span> : ""}
            </span>

            <span>HOME ADDRESS</span>
            <span className="font-bold">
              {USER_DATA ? <span>{ADDRESS}</span> : ""}
            </span>
          </div>
        </div>

        <hr />

        <div className="grid grid-cols-2 items-center gap-3">
          <Button
            className="bg-blue-600 text-white ... rounded"
            label="Health Declaration Form"
            type="button"
            onClick={VIEW_HDF}
          />
        </div>
      </div>
    </>
  );
};

export default ViewUser;
