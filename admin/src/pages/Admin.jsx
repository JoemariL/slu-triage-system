import React, { useEffect, useState } from "react";

import "../css/admin.css";
import TableComponent from "../app/components/table"
import { getAllAdmin } from "../actions/adminActions";

function App() {
  const [adminInfo, setAdminInfo] = useState({})
  useEffect(() => {
    (async function () {
        const admin = await getAllAdmin()
        setAdminInfo(admin)
    })()
  }, [])

  const data = React.useMemo(
    // Sample data ito
    () => [
      {
        username: "Juan",
        action: "delete button, reset button",
      },
      {
        username: "Benz",
        action: "delete button, reset button",
      },
      {
        username: "JP",
        action: "delete button, reset button",
      },
    ],
    []
  );

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
      {
        !adminInfo.length ? <div><h1>Empty</h1></div>
        : adminInfo.length && <TableComponent COLUMNS={columns} DATA={adminInfo}/>
      }
    </>
  )
}

export default App;
