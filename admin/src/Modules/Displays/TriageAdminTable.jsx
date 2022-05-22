import React, { useState, useEffect } from "react";

import { getAllAdmin, deleteAdmin } from "../../actions/adminActions";

import { AdminForm } from "../../Modules/Forms";

import { Table } from "../../Components/app_ui/Table";
import { Loader, ConfirmationBox } from "../../Components/app_ui";
import {
  Modal,
  ModalHeader,
  ModalContent,
} from "../../Components/common/Modal";

const TriageAdminTable = () => {
  const [admin, setAdmin] = useState({});

  const [adminID, setAdminID] = useState("");
  const [adminUsername, setAdminUsername] = useState("");

  const [isPending, setIsPending] = useState(false);

  const [registerAdmin, setRegisterAdmin] = useState(false);

  const renderRegisterAdmin = () => {
    setRegisterAdmin(!registerAdmin);
  };

  const [confirmDelete, setConfirmDelete] = useState(false);

  const renderConfirmDelete = (adminID, adminUsername) => {
    setConfirmDelete(!confirmDelete);
    setAdminID(adminID);
    setAdminUsername(adminUsername);
  };

  const handleDelete = async (id) => {
    setIsPending(true);
    const response = await deleteAdmin(id);

    if (response.hasOwnProperty("message")) {
      alert(response?.message);
      setIsPending(false);
    } else {
      alert("Admin was deleted successfully!");
      setIsPending(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    (async function () {
      setIsPending(true);
      const admin = await getAllAdmin();
      setAdmin(admin);
      setIsPending(false);
    })();
  }, []);

  const TABLE_COLUMNS = [
    {
      Header: "Administrators",
      accessor: "username",
    },
    {
      Header: " ",
      accessor: "_id",
      Cell: ({ row }) => (
        <>
          <span
            className="font-bold text-red-900 cursor-pointer hover:text-red-800 hover:underline hover:underline-offset-2 hover:decoration-red-800"
            onClick={() =>
              renderConfirmDelete(row.values._id, row.values.username)
            }
          >
            Remove
          </span>
        </>
      ),
    },
  ];

  if (isPending) {
    return <Loader />;
  } else {
    return (
      <>
        {registerAdmin && (
          <Modal>
            <ModalContent>
              <ModalHeader close={renderRegisterAdmin}>
                Register Administrator
              </ModalHeader>

              <div className="mx-5 mt-10">
                <AdminForm />
              </div>
            </ModalContent>
          </Modal>
        )}

        {confirmDelete && (
          <ConfirmationBox
            contentHeader="Remove Administrator"
            contentMessage="Are you sure you want to delete this admin?"
            alertHeader="Warning"
            alertMessage="You cannot undo this action."
            emphasis={adminUsername}
            confirmButtonLabel="DELETE ADMIN"
            close={renderConfirmDelete}
            cancel={renderConfirmDelete}
            confirm={() => {
              handleDelete(adminID);
            }}
            hasAlert
            warning
          />
        )}

        <div className="relative overflow-x-auto">
          {admin.length && (
            <Table
              COLUMNS={TABLE_COLUMNS}
              DATA={admin}
              BTN_LABEL="REGISTER ADMIN"
              HAS_BTN
              ONCLICK={renderRegisterAdmin}
            />
          )}
        </div>
      </>
    );
  }
};

export default TriageAdminTable;
