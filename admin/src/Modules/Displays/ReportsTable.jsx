import React from "react";
import Table from "../../Components/app_ui/Table/Table";

const ReportsTable = ({
  LIST,
  NOT_SEARCHABLE = false,
  REMOVE_PAGE_CONTROL = false,
}) => {
  const COLUMNS = [
    {
      Header: "GATE NAME",
      accessor: "gate",
    },
    {
      Header: "STUDENT",
      accessor: "students",
    },
    {
      Header: "EMPLOYEE",
      accessor: "employees",
    },
    {
      Header: "VISITOR",
      accessor: "visitors",
    },
    {
      Header: "TOTAL",
      accessor: "allowed",
    },
  ];

  return (
    <>
      {LIST.length && (
        <Table
          COLUMNS={COLUMNS}
          DATA={LIST}
          NOT_SEARCHABLE={NOT_SEARCHABLE}
          REMOVE_PAGE_CONTROL={REMOVE_PAGE_CONTROL}
        />
      )}
    </>
    // <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
    //   <table className="w-full text-sm text-left">
    //     <thead className="text-xs uppercase bg-blue-600 text-white">
    //       <tr>
    //         <th scope="col" className="px-6 py-3">
    //           GATE NAME
    //         </th>

    //         <th scope="col" className="px-6 py-3">
    //           STUDENT
    //         </th>

    //         <th scope="col" className="px-6 py-3">
    //           EMPLOYEE
    //         </th>

    //         <th scope="col" className="px-6 py-3">
    //           VISITOR
    //         </th>

    //         <th scope="col" className="px-6 py-3">
    //           DEPARTMENT
    //         </th>

    //         <th scope="col" className="px-6 py-3">
    //           TOTAL
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody></tbody>
    //   </table>
    // </div>
  );
};

export default ReportsTable;
