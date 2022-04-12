import Header from "../app/components/Navbar";
import React from "react";
import { useTable, useResizeColumns } from "react-table";
import BTable from "react-bootstrap/Table";
import "../css/admin.css";

function App() {
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

  const columns = React.useMemo(
    () => [
      {
        Header: "Username",
        accessor: "username", // accessor is the "key" in the data
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <div class="flex-container">
        {/* <button type="submit" class="button">
          Add User
        </button>
        <button type="submit" class="button">
          Remove User
        </button> */}

        <table className="admintable" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="admintableth" {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr className="admintablerow" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    console.log(cell);
                    return (
                      <td className="admintabletd" {...cell.getCellProps()}>
                        {/* if(every 3 cell) */}
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
