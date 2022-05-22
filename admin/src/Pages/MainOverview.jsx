import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import { OverviewUsersTable, OverviewSummaryTable } from "../Modules/Displays";

import { Background, DualLayout } from "../Components/app_ui/Layout";
import { Button, Checkbox, Input, Alert } from "../Components/common";

function MainOverview() {
  const navigate = useNavigate();
  const location = useLocation();

  const [payload, setPayload] = useState(location.state);
  const [users, userList] = useState(location.state.userList);
  const [department, setDepartment] = useState(location.state.department);

  const [isActive, setIsActive] = useState(0);

  const handleIsActive = (index) => {
    setIsActive(index);
  };

  const [isHidden, setIsHidden] = useState(false);

  const toggleIsHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <Background>
      <div className="bg-slate-100 sticky top-0 w-full p-4 z-40 ... inline-flex items-center gap-5 shadow-sm">
        <Button
          className="bg-gray-600 text-white px-6 ... rounded-l-full"
          label="Return to Dashboard"
          type="button"
          onClick={() => {
            navigate("/main", { replace: true });
          }}
        />

        <div className="flex flex-col">
          <span className="text-xl font-bold">
            {payload.gateNumber} / {payload.campusName}
          </span>
          <span className="text-gray-600">Campus & Gate</span>
        </div>
      </div>

      <DualLayout>
        {isHidden && (
          <div className="w-[28rem] border-r-2">
            <div className="bg-blue-600 text-white p-10 ... flex flex-col items-center text-center">
              <span className="text-2xl font-bold">{payload.allowed}</span>
              <span className="text-sm">ALLLOWED</span>
            </div>

            <div className="p-6 ... grid grid-rows-3 gap-3">
              <div className="py-2 px-4 ... flex flex-row items-center justify-between gap-x-5 border-2 border-yellow-500 rounded-full">
                <span>Students</span>
                <span className="font-bold"> {payload.student} </span>
              </div>

              <div className="py-2 px-4 ... flex flex-row items-center justify-between gap-x-5 border-2 border-yellow-500 rounded-full">
                <span>Employees</span>
                <span className="font-bold"> {payload.employee} </span>
              </div>

              <div className="py-2 px-4 ... flex flex-row items-center justify-between gap-x-5 border-2 border-yellow-500 rounded-full">
                <span>Visitors</span>
                <span className="font-bold"> {payload.visitors} </span>
              </div>
            </div>
          </div>
        )}

        <div className="h-full w-full overflow-y-auto">
          <div className="bg-slate-50 sticky top-0 w-full p-4 z-40 ... inline-flex items-center gap-3 shadow-sm">
            <Button
              className="bg-blue-900 text-white px-6 ... rounded-full"
              label={isHidden ? "Hide Total" : "Show Total"}
              type="button"
              onClick={toggleIsHidden}
            />

            {/* <div className="grid grid-cols-2 items-center gap-5 w-fi text-sm">
              <div className="py-2 px-5 rounded cursor-pointer text-center hover:bg-sky-600 hover:text-white">
                Department Overview
              </div>

              <div className="py-2 px-5 rounded cursor-pointer text-center hover:bg-sky-600 hover:text-white">
                User Overview
              </div>
            </div> */}
          </div>

          <div className="px-6 pt-4 pb-48">
            <OverviewUsersTable USERS={users} />
            {/* <OverviewSummaryTable /> */}
          </div>
        </div>
      </DualLayout>
    </Background>
  );
}

export default MainOverview;
