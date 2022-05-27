import React, { useState, useEffect } from "react";

import { getAllUser, userResetPassword } from "../../actions/adminActions";

import { Table } from "../../Components/app_ui/Table";
import {
  UserResetPassword,
  ManageUser,
} from "../../Components/app_ui/Misc/UsersManagement";
import { HDF } from "../../Components/app_ui/Misc";
import { Loader, ConfirmationBox } from "../../Components/app_ui";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "../../Components/common/Modal";
import { Button } from "../../Components/common";

const TriageUsersTable = () => {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const [userID, setUserID] = useState("");

  const [passwordResetCode, setPasswordResetCode] = useState("");

  const [isPending, setIsPending] = useState(false);
  const [isLoading, seIsLoading] = useState(false);

  const [manageUser, setManageUser] = useState(false);

  const renderManageUser = (userID, userData) => {
    setManageUser(!manageUser);
    setUserID(userID);
    setUserData(userData);
  };

  const [passwordReset, setPasswordReset] = useState(false);

  const renderPasswordReset = () => {
    setPasswordReset(!passwordReset);
  };

  const [viewHDF, setViewHDF] = useState(false);

  const renderViewHDF = () => {
    setViewHDF(!viewHDF);
  };

  useEffect(() => {
    (async function () {
      seIsLoading(true);
      const user = await getAllUser();
      setUser(user);
      seIsLoading(false);
    })();
  }, []);

  const handlePasswordResetCode = async (e) => {
    e.preventDefault();
    seIsLoading(true);

    const response = await userResetPassword(userID);

    if (response.hasOwnProperty("message")) {
      alert(response?.message);
      seIsLoading(false);
    } else {
      setPasswordResetCode(response.password);
      seIsLoading(false);
    }
  };

  const TABLE_COLUMNS = [
    {
      Header: "First Name",
      accessor: "first_name",
    },
    {
      Header: "Last Name",
      accessor: "last_name",
    },
    {
      Header: "Email",
      accessor: "email_address",
    },
    {
      Header: "User Type",
      accessor: "user_type",
    },
    {
      Header: "Department",
      accessor: "department",
    },
    {
      Header: "Last Activity",
      accessor: "updatedAt",
    },
    {
      Header: " ",
      accessor: "_id",
      Cell: ({ row }) => (
        <span
          className="p-2 bg-blue-900 text-white cursor-pointer rounded hover:opacity-70"
          onClick={() => {
            renderManageUser(row.values._id, row.values);
          }}
        >
          Manage User
        </span>
      ),
    },
  ];

  if (isPending) {
    return <Loader />;
  } else {
    return (
      <>
        {manageUser && (
          <Modal>
            {!passwordReset && !viewHDF && (
              <ModalContent>
                <ManageUser
                  USER_DATA={userData}
                  FIRST_NAME={userData.first_name}
                  LAST_NAME={userData.last_name}
                  EMAIL={userData.email_address}
                  TYPE={userData.user_type}
                  CLOSE={renderManageUser}
                  RESET_PASSWORD={renderPasswordReset}
                  // VIEW_HDF={renderViewHDF}
                />
              </ModalContent>
            )}

            {passwordReset && (
              <ModalContent>
                <UserResetPassword
                  PASSWORD_RESET_CODE={passwordResetCode}
                  CLOSE={renderManageUser}
                  CANCEL={renderPasswordReset}
                  RESET={handlePasswordResetCode}
                  loading={isLoading}
                />
              </ModalContent>
            )}

            {/* {viewHDF && (
              <>
                <ModalContent>
                  <HDF CLOSE={renderManageUser} />
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
            )} */}
          </Modal>
        )}

        <div className="relative overflow-x-auto">
          {user.length && <Table COLUMNS={TABLE_COLUMNS} DATA={user} />}
        </div>
      </>
    );
  }
};

export default TriageUsersTable;
