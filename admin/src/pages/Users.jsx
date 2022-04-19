import React, { useEffect, useState } from "react";
import "../css/users.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TableComponent from "../app/components/table";
import { getAllUser } from "../actions/adminActions";

function App() {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    (async function () {
      const user = await getAllUser();
      setUserInfo(user);
    })();
  }, []);
  console.log(userInfo)
  const data = React.useMemo(
    // Sample data ito
    () => [
      {
        name: "Juan",
        email: "juan@gmail.com",
        lastActivity: "13:00",
        action: "delete button, reset button",
      },
      {
        name: "Benz",
        email: "benz@gmail.com",
        lastActivity: "9:00",
        action: "delete button, reset button",
      },
      {
        name: "JP",
        email: "jp@gmail.com",
        lastActivity: "5:00",
        action: "delete button, reset button",
      },
    ],
    []
  );

  const columns = [
    {
      Header: "First Name",
      accessor: "first_name", // accessor is the "key" in the data
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
      Header: "Type",
      accessor: "user_type"
    },
    {
      Header: "Last Activity",
      accessor: "updatedAt",
    },
    {
      Header: "Action",
      accessor: ""
    }
  ];

  return (
    <>
      {
        !userInfo.length ? <div><h1>Empty</h1></div>
        : userInfo.length && <TableComponent COLUMNS={columns} DATA={userInfo}/>
      }
    </>
  );
}

export default App;
