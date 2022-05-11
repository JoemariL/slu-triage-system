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
      Cell: ({ cell }) => (
        <button onClick={(e) => { 
          e.preventDefault()
          console.log(cell)
        }}>
          Click Me!
        </button>
      )
    },
    {
      Header: "Actions",
      Cell: row => {
        return (
          <div>
            <button onClick={(e) => {
              e.preventDefault()
              console.log('Regenerate QR')
            }}>Regenerate QR</button>
            <button onClick={(e) => {
              e.preventDefault()
              console.log('Delete QR')
            }}>Delete QR</button>
          </div> 
        )
      }
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
