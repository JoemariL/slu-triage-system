import React from "react";

const RejectedList = ({ TOTAL = 0, STUDENTS = 0, EMPLOYEE = 0 }) => {
  return (
    <div className="bg-red-600 text-white mx-16 p-6 ... space-y-5 rounded shadow-sm">
      <div className="w-full ... flex flex-col justify-center items-center text-center">
        <span className="text-2xl font-bold">REJECTED ENTRIES</span>
      </div>

      <div className="w-full px-24 ... inline-flex justify-between items-center gap-x-3">
        <div className="flex flex-col items-center text-center">
          <span className="text-2xl font-bold">{TOTAL}</span>
          <span className="text-sm">TOTAL</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <span className="text-2xl font-bold">{STUDENTS}</span>
          <span className="text-sm">STUDENTS</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <span className="text-2xl font-bold">{EMPLOYEE}</span>
          <span className="text-sm">EMPLOYEE</span>
        </div>
      </div>
    </div>
  );
};

export default RejectedList;
