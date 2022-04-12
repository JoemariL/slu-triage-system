import Header from "../app/components/sidenav";
import React, { useEffect, useState } from "react";
import "../css/findQR.css";
import TableComponent from "../app/components/table"

import { getQR } from "../actions/adminActions"

function App() {
  const [campusInfo, setCampusInfo] = useState({})
  useEffect(() => {
    (async function () {
        const info = await getQR()
        setCampusInfo(info)
    })()
  }, [])

  const data = [
    {
      campus: 'Main',
      gate: 'Gate1',
      qrlink: 'qrlink.jpeg',
    },
    {
      campus: 'Bakakeng',
      gate: 'Gate2',
      qrlink: 'qrlink.jpeg',
    },
    {
      campus: 'Navy Base',
      gate: 'Gate1',
      qrlink: 'qrlink.jpeg'
    },
  ]

  const columns = [
    {
      Header: 'Campus',
      accessor: 'school'
    },
    {
      Header: 'Gate',
      accessor: 'gate'
    },
    {
      Header: 'QR',
      accessor: 'generated_code'
    }
  ]

  return(
    <>
      <Header />
      { 
        !campusInfo.length ? <div><h1>Empty</h1></div>
        : campusInfo.length && <TableComponent COLUMNS={columns} DATA={campusInfo}/>
      }
    </>
  )
}

export default App;