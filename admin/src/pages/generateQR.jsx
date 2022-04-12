import Header from "../app/components/Navbar";
import React, { useEffect, useState } from "react";
import "../css/findQR.css";
import TableComponent from "../app/components/table";

import { getQR } from "../actions/adminActions";

function App() {
  const [campusInfo, setCampusInfo] = useState({});
  useEffect(() => {
    (async function () {
      const info = await getQR();
      setCampusInfo(info);
    })();
  }, []);

  const data = [
    {
      campus: "Main",
      gate: "Gate1",
      qrlink: "qrlink.jpeg",
    },
    {
      campus: "Bakakeng",
      gate: "Gate2",
      qrlink: "qrlink.jpeg",
    },
    {
      campus: "Navy Base",
      gate: "Gate1",
      qrlink: "qrlink.jpeg",
    },
  ];

  const columns = [
    {
      Header: "Campus",
      accessor: "school",
    },
    {
      Header: "Gate",
      accessor: "gate",
    },
    {
      Header: "QR",
      accessor: "generated_code",
    },
  ];

  return (
    <>
      <Header />
      {campusInfo.length && <TableComponent COLUMNS={columns} DATA={data} />}
    </>
  );
}

export default App;
