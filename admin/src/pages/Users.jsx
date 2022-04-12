import Header from "../app/components/Navbar";
import React from "react";
import { useTable } from "react-table";
import BTable from "react-bootstrap/Table";
import "../css/users.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const data = React.useMemo(
    // Sample data ito
    () => [
      {
        name: "Juan",
        email: "juan@gmail.com",
        lastActivity: "Entered Gate1",
        action: "delete button, reset button",
      },
      {
        name: "Benz",
        email: "benz@gmail.com",
        lastActivity: "Exited Gate1",
        action: "delete button, reset button",
      },
      {
        name: "JP",
        email: "jp@gmail.com",
        lastActivity: "Entered Gate 1",
        action: "delete button, reset button",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Last Activity",
        accessor: "lastActivity",
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
              <tr className="users" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
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
                <tr className="usersbody" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    console.log(cell);
                    return (
                      <td className="usersbody" {...cell.getCellProps()}>
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
