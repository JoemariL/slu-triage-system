import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import moment from "moment";

import {
  getHdfDateRange,
  getHdfRejectedDateRange,
} from "../actions/commonActions";
import {
  filterCampus,
  convertDateFormat,
  extractSchoolList,
  getCurrentDate,
} from "../utils/Functions";

import { RejectedEntriesTable, TriageUsersTable } from "../Modules/Displays";

import {
  Background,
  DualLayout,
  GridItemLayout,
} from "../Components/app_ui/Layout";
import { CampusTab, GateCard, RejectedList } from "../Components/app_ui/Misc";
import { Searchbar } from "../Components/app_ui";
import { Checkbox, Input } from "../Components/common";

import { CampusEmpty, GateEmpty } from "../Assets/Placeholders";

function Main() {
  const navigate = useNavigate();

  const [selectedCampus, setSelectedCampus] = useState({});
  const [campusData, setCampusData] = useState({});
  const [campus, setCampus] = useState({});

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [campusID, setCampusID] = useState("");
  const [campusName, setCampusName] = useState("");

  const [selectRejects, setSelectRejects] = useState(false);

  const renderSelectRejects = () => {
    setSelectRejects(!selectRejects);
  };

  const [rejected, setRejected] = useState({});

  useEffect(() => {
    (async function () {
      setFromDate(moment().format("L"));
      setToDate(moment().format("L"));
      const payload = {
        fromDate,
        toDate,
      };
      const response = await getHdfDateRange(payload);
      const rejected = await getHdfRejectedDateRange(payload);
      if (
        response.hasOwnProperty("message") ||
        rejected.hasOwnProperty("message")
      ) {
        alert("Error Occured.");
      } else {
        const filteredCampus = filterCampus(response, "school");
        setCampus(filteredCampus);

        setRejected(rejected);

        const list = extractSchoolList(filteredCampus);
        setCampusData(list);
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const payload = {
        fromDate,
        toDate,
      };
      const response = await getHdfDateRange(payload);
      const rejected = await getHdfRejectedDateRange(payload);
      if (
        response.hasOwnProperty("message") ||
        rejected.hasOwnProperty("message")
      ) {
        alert("Error Occured");
      } else {
        const filteredCampus = filterCampus(response, "school");
        setCampus(filteredCampus);

        setRejected(rejected);

        const list = extractSchoolList(filteredCampus);
        setCampusData(list);
      }
    })();
  }, [fromDate, toDate]);

  const handleOnClickCampus = (data) => {
    setCampusName(data);
    setSelectedCampus(campus[data]);
  };

  const overview = (
    USER_ID,
    USER_LIST,
    DEP_LIST,
    CAMPUS,
    GATE,
    ALLOWED,
    NOT_ALLOWED,
    STUDENTS_NUM,
    EMP_NUM,
    VISITORS_NUM
  ) => {
    navigate("/main/campus/gate/overview", {
      state: {
        id: USER_ID,
        userList: USER_LIST,
        campusName: CAMPUS,
        gateNumber: GATE,
        department: DEP_LIST,
        allowed: ALLOWED,
        notAllowed: NOT_ALLOWED,
        student: STUDENTS_NUM,
        employee: EMP_NUM,
        visitors: VISITORS_NUM,
      },
    });
  };

  return (
    <Background>
      <DualLayout>
        <div className="w-[28rem] border-r-2">
          <div className="w-full p-2 ... inline-flex justify-between items-center shadow-sm">
            <span className="text-blue-600 text-lg font-bold">DASHBOARD</span>
          </div>

          <div
            className={classNames(
              "w-full p-2 ... inline-flex justify-between items-center cursor-pointer shadow-sm hover:opacity-70",
              selectRejects && "bg-red-600 text-white"
            )}
          >
            <span>VIEW ALL TODAY'S REJECTED ENTRIES</span>

            <Checkbox onChange={renderSelectRejects} />
          </div>

          <div className="h-[80%] px-2 pt-4 pb-48 overflow-y-auto ...">
            {selectRejects && (
              <div className="h-full w-full ... flex flex-col justify-center items-center text-center">
                <span className="text-lg">
                  YOU ARE CURRENTLY VIEWING ALL TODAY'S REJECTED ENTRIES.
                </span>
              </div>
            )}

            {!selectRejects && (
              <>
                {campusData.length ? (
                  campusData.map((data) => {
                    return (
                      <CampusTab
                        key={data}
                        CAMPUS_NAME={data}
                        onClick={(e) => {
                          e.preventDefault();
                          setCampusID(data);
                          handleOnClickCampus(data);
                        }}
                        ACTIVE={campusID === data}
                      />
                    );
                  })
                ) : (
                  <span className="font-bold">NO DATA FOR TODAY.</span>
                )}
              </>
            )}
          </div>
        </div>

        <div
          className={classNames(
            "h-full w-full overflow-y-auto",
            selectRejects && "bg-red-50"
          )}
        >
          {!selectRejects && (
            <>
              <div className="bg-slate-100 sticky top-0 w-full p-4 z-40 ... inline-flex items-center gap-3 shadow-sm">
                <span className="px-4 text-lg">{campusName}</span>

                <div className="ml-auto inline-flex items-center gap-3">
                  <Searchbar setPlaceholder="Search for a campus" />
                  <div className="divider"></div>

                  <div className="inline-flex items-center gap-3">
                    <Input
                      type="date"
                      max={new Date().toISOString().slice(0, 10)}
                      defaultValue={getCurrentDate()}
                      onChange={(e) => {
                        const date = convertDateFormat(e.target.value);
                        setFromDate(date);
                      }}
                    />
                    <span>to</span>
                    <Input
                      type="date"
                      max={new Date().toISOString().slice(0, 10)}
                      defaultValue={getCurrentDate()}
                      onChange={(e) => {
                        const date = convertDateFormat(e.target.value);
                        setToDate(date);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 pt-4 pb-48">
                <GridItemLayout>
                  {selectedCampus.length ? (
                    selectedCampus.map((payload) => {
                      return (
                        <GateCard
                          key={payload.gate}
                          GATE_NAME={payload.gate}
                          ALLOWED={payload.allowed}
                          NOT_ALLOWED={payload.not_allowed}
                          STUDENTS_NUM={payload.students}
                          EMPLOYEES_NUM={payload.employees}
                          VISITORS_NUM={payload.visitors}
                          allowed={true}
                          overviewOnClick={() => {
                            overview(
                              payload._id,
                              payload.users,
                              payload.department_list,
                              payload.school,
                              payload.gate,
                              payload.allowed,
                              payload.not_allowed,
                              payload.students,
                              payload.employees,
                              payload.visitors,
                              payload.department_list,
                              payload.users
                            );
                          }}
                        />
                      );
                    })
                  ) : (
                    <div className="w-full flex flex-col justify-center items-center">
                      <img
                        className="opacity-30 w-96"
                        src={GateEmpty}
                        alt="Triage Application Team Logo"
                      />
                    </div>
                  )}
                </GridItemLayout>
              </div>
            </>
          )}

          {selectRejects && (
            <div className="px-6 pt-4 pb-48 space-y-10">
              <RejectedList
                TOTAL={rejected.total}
                STUDENTS={rejected.students}
                EMPLOYEE={rejected.employees}
              />

              <div className="mx-16">{/* <RejectedEntriesTable /> */}</div>
            </div>
          )}
        </div>
      </DualLayout>
    </Background>
  );
}

export default Main;
