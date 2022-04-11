import Header from '../app/components/sidenav';
import React from 'react'
import { useTable } from 'react-table'
// import "../body.css"
import "../users.css"

function App() {
  const data = React.useMemo(

    // Sample data ito
    () => [
      {
        name: 'Juan',
        campus: 'Main',
        gate: 'Gate1',
        status: 'accepted',
      },
      {
        name: 'Benz',
        campus: 'Bakakeng',
        gate: 'Gate1',
        status: 'accepted',
      },
      {
        name: 'JP',
        campus: 'Navy Base',
        gate: 'Gate1',
        status: 'rejected',
      },
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Campus',
        accessor: 'campus',
      },
      {
        Header: 'Gate',
        accessor: 'gate',
      },
      {
        Header: 'Status',
        accessor: 'status',
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
<h1 class="userh1">Users</h1>
<div class="flex-container">

<button type="submit" class= 'button'>Add User</button>
<button type="submit" class= 'button'>Remove User</button>



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