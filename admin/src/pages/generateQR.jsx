import Header from '../app/components/sidenav';
import React from 'react'
import { useTable } from 'react-table'
// import "../body.css"
import "../findQR.css"

function App() {
  const data = React.useMemo(

    // Sample data ito
    () => [
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
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Campus',
        accessor: 'campus', // accessor is the "key" in the data
      },
      {
        Header: 'Gate',
        accessor: 'gate',
      },
      {
        Header: 'QR link',
        accessor: 'qrlink',
      },     
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (<>

<Header/>

<div class="flex-container">
<h1>QR PAGE</h1>
    <table {...getTableProps()}>

      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>


      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                console.log(cell)
                return (
                  <td {...cell.getCellProps()}>
                    {/* if(every 3 cell) */}
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>

    </table>
    </div>
    </>
  )
}

export default App