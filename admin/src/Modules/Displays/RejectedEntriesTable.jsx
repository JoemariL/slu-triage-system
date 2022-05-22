import React, { useState } from "react";

import { ViewUser } from "../../Components/app_ui/Misc/UserOverview";
import { Table } from "../../Components/app_ui/Table";
import { HDF } from "../../Components/app_ui/Misc";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "../../Components/common/Modal";

import { Button } from "../../Components/common";

const RejectedEntriesTable = () => {
  const [userData, setUserData] = useState({});
  const [userID, setUserID] = useState("");

  const [viewUser, setViewUser] = useState(false);

  const renderViewUser = (userID, userData) => {
    setViewUser(!viewUser);
    setUserID(userID);
    setUserData(userData);
  };

  const [viewHDF, setViewHDF] = useState(false);

  const renderViewHDF = () => {
    setViewHDF(!viewHDF);
  };

  return (
    <>
      {viewUser && (
        <Modal>
          {!viewHDF && (
            <ModalContent>
              <ViewUser
                USER_DATA={userData}
                FIRST_NAME={userData.first_name}
                LAST_NAME={userData.last_name}
                DEPARTMENT={userData.department}
                EMAIL={userData.email_address}
                CONTACT={userData.contact_number}
                ADDRESS={userData.home_address}
                TYPE={userData.user_type}
                CLOSE={renderViewUser}
                VIEW_HDF={renderViewHDF}
              />
            </ModalContent>
          )}

          {viewHDF && (
            <>
              <ModalContent>
                <HDF CLOSE={renderViewUser} />
              </ModalContent>
              <ModalFooter>
                <Button
                  className="ml-auto bg-gray-600 text-white w-48 ... rounded"
                  label="RETURN"
                  type="button"
                  onClick={renderViewHDF}
                />
              </ModalFooter>
            </>
          )}
        </Modal>
      )}
      <div className="relative overflow-x-auto">{/* <Table /> */}</div>
    </>
  );
};

export default RejectedEntriesTable;
