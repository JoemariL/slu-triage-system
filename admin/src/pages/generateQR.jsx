import React, { useEffect, useState } from "react";
import TableComponent from "../app/components/table";
import { getQR } from "../actions/adminActions";

function GenerateQR() {
  const [campusInfo, setCampusInfo] = useState({});
  useEffect(() => {
    (async function () {
      const info = await getQR();
      setCampusInfo(info);
    })();
  }, []);

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
      {!campusInfo.length ? (
        <div>
          <h1>Empty</h1>
        </div>
      ) : (
        campusInfo.length && (
          <TableComponent COLUMNS={columns} DATA={campusInfo} />
        )
      )}
    </>
  );
}

export default GenerateQR;
