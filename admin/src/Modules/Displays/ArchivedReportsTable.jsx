import React, { useState } from "react";

import { RejectedList } from "../../Components/app_ui/Misc";
import moment from "moment";
import Table from "../../Components/app_ui/Table/Table";
import { extractSchoolList } from "../../utils/Functions";

const ArchivedReportsTable = ({ DATA }) => {
  
  const [data, setData] = useState(DATA.info);
  const [rejected, setRejected] = useState(DATA.rejected[0]);
  

  const schoolColumn = [
    {
      Header: "CAMPUS",
      accessor: "school"
    },
    {
      Header: "GATE",
      accessor: "gate"
    },
    {
      Header: "TOTAL",
      accessor: "allowed"
    },
    {
      Header: "STUDENTS",
      accessor: "students"
    },
    {
      Header: "EMPLOYEE",
      accessor: "employees"
    },
    {
      Header: "VISITOR",
      accessor: "visitors"
    }
  ]

  return (
    <>
      { 
        data.length && <Table COLUMNS={schoolColumn} DATA={data} />
      }
      { 
        <RejectedList TOTAL={rejected.total} STUDENTS={rejected.students} EMPLOYEE={rejected.employees} />
      }
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

export default ArchivedReportsTable;
