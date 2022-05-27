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

const RejectedEntriesTable = ({ USERS }) => {

  const [users, setUsers] = useState(USERS.users);

  const [userData, setUserData] = useState({});
  const [userHdf, setUserHdf] = useState({});
  const [userID, setUserID] = useState("");

  const [viewUser, setViewUser] = useState(false);

  const renderViewUser = (userID, userData, userHdf) => {
    setViewUser(!viewUser);
    setUserID(userID);
    setUserData(userData);
    setUserHdf(userHdf);
  };

  const [viewHDF, setViewHDF] = useState(false);

  const renderViewHDF = () => {
    setViewHDF(!viewHDF);
  };

  const columns = [
    {
      Header: "User Type",
      accessor: "user_type",
    },
    {
      Header: "First Name",
      accessor: "first_name",
    },
    {
      Header: "Last Name",
      accessor: "last_name",
    },
    {
      Header: "Email Address",
      accessor: "email_address",
      Cell: ({ row }) => {
        return (
          <>
            <span>
              {row.values.user_type === "VISITOR"
                ? "--"
                : row.values.email_address}
            </span>
          </>
        );
      },
    },
    {
      Header: "Department",
      accessor: "department",
    },
    {
      Header: "Contact Number",
      accessor: "contact_number",
    },
    {
      Header: "Home Address",
      accessor: "home_address",
    },
    {
      Header: " ",
      accessor: "hdf_data",
      Cell: ({ row }) => (
        <span
          className="font-bold text-blue-900 cursor-pointer hover:text-blue-800 hover:underline hover:underline-offset-2 hover:decoration-blue-800"
          onClick={() => {
            renderViewUser(row.values.id, row.values, row.values.hdf_data);
          }}
        >
          View User
        </span>
      ),
    },
  ]

  console.log(users)


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
                <HDF
                  HAS_HDF={userHdf}
                  EXPOSURE={userHdf.covid_exposure}
                  POSITIVE={userHdf.covid_positive}
                  FEVER={userHdf.fever}
                  COUGH={userHdf.cough}
                  COLD={userHdf.cold}
                  SORE_THROAT={userHdf.sore_throat}
                  DIFF_BREATHING={userHdf.diff_breathing}
                  DIARRHEA={userHdf.diarrhea}
                  PREGNANT={userHdf.pregnant}
                  CLOSE={renderViewUser} 
                />
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
      {users.length && <div className="relative overflow-x-auto"><Table COLUMNS={columns} DATA={users} NEGATIVE /></div>}
    </>
  );
};

export default RejectedEntriesTable;
