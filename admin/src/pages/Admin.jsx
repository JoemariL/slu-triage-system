import React, { useEffect, useState } from "react";

import "../css/admin.css";
import TableComponent from "../app/components/table";
import { getAllAdmin } from "../actions/adminActions";

function App() {
  const [adminInfo, setAdminInfo] = useState({});
  useEffect(() => {
    (async function () {
      const admin = await getAllAdmin();
      setAdminInfo(admin);
    })();
  }, []);

  const columns = [
    {
      Header: "Username",
      accessor: "username", // accessor is the "key" in the data
    },
    {
      Header: "Action",
      accessor: "action",
    },
  ];

  return (
    <>
      {!adminInfo.length ? (
        <div>
          <h1>Empty</h1>
        </div>
      ) : (
        adminInfo.length && (
          <TableComponent COLUMNS={columns} DATA={adminInfo} />
        )
      )}
    </>
  );
}

export default App;
