import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import moment from "moment";

import {
  getReportDateRange,
  getReports,
  getHdfRejectedDateRange,
} from "../actions/commonActions";

import {
  filterCampus,
  convertDateFormat,
  extractSchoolList,
  getCurrentDate,
} from "../utils/Functions";

import { ReportsTable } from "../Modules/Displays";

import { Background, DualLayout } from "../Components/app_ui/Layout";
import { ReportsPDF } from "../Components/app_ui/PDF";
import { CampusTab, RejectedList } from "../Components/app_ui/Misc";
import { Button, Input } from "../Components/common";

function Reports() {
  const navigate = useNavigate();

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [selectedCampus, setSelectedCampus] = useState({});
  const [campusData, setCampusData] = useState({});
  const [campus, setCampus] = useState({});

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [campusID, setCampusID] = useState("");
  const [campusName, setCampusName] = useState("");

  const [selectRejects, setSelectRejects] = useState(false);

  const [render, setRender] = useState(false);

  useEffect(() => {
    (async function () {
      setFromDate(moment().format("L"));
      setToDate(moment().format("L"));
      const payload = {
        fromDate,
        toDate,
      };
      const response = await getReportDateRange(payload);
      const rejected = await getHdfRejectedDateRange(payload);
      if (
        response.hasOwnProperty("message") ||
        rejected.hasOwnProperty("message")
      ) {
        alert("Error Occured.");
      } else {
        const filteredCampus = filterCampus(response, "school");
        setCampus(filteredCampus);

        setSelectRejects(rejected);

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
      const response = await getReportDateRange(payload);
      const rejected = await getHdfRejectedDateRange(payload);
      if (
        response.hasOwnProperty("message") ||
        rejected.hasOwnProperty("message")
      ) {
        alert("Error Occured");
      } else {
        const filteredCampus = filterCampus(response, "school");
        setCampus(filteredCampus);

        setSelectRejects(rejected);

        const list = extractSchoolList(filteredCampus);
        setCampusData(list);
      }
    })();
  }, [fromDate, toDate]);

  const handleOnClickCampus = (data) => {
    setCampusName(data);
    setSelectedCampus(campus[data]);
    setRender(true);
  };

  return (
    <>
      <Background>
        <DualLayout>
          <div className="w-full border-2 lg:w-[28rem]">
            <div className="w-full p-2 ... inline-flex justify-between items-center shadow-sm">
              <span className="text-blue-600 text-lg font-bold">REPORTS</span>
            </div>

            <div className="w-full p-2 ... inline-flex justify-between items-center shadow-sm">
              <Button
                className="ml-auto bg-orange-600 text-white ... rounded lg:w-full"
                label="GO TO ARCHIVED REPORTS"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/reports/archived");
                }}
              />
            </div>

            <div className="h-[80%] px-2 pt-4 pb-48 overflow-y-auto ...">
              <>
                {campusData.length ? (
                  campusData.map((data) => {
                    return (
                      <CampusTab
                        CAMPUS_NAME={data}
                        key={data}
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
            </div>
          </div>

          <div className="h-full w-full overflow-y-auto">
            <div className="bg-slate-100 sticky top-0 w-full p-4 z-40 ... inline-flex items-center gap-3 shadow-sm">
              {render ? (
                <span className="px-4 text-lg">{campusName}</span>
              ) : (
                <></>
              )}

              <div className="ml-auto inline-flex items-center gap-3">
                <div className="inline-flex items-center gap-3">
                  <Input
                    type="date"
                    max={new Date().toISOString().slice(0, 10)}
                    defaultValue={getCurrentDate()}
                    onChange={(e) => {
                      const date = convertDateFormat(e.target.value);
                      setFromDate(date);
                      setRender(false);
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
                      setRender(false);
                    }}
                  />

                  <div className="divider"></div>

                  <Button
                    className="bg-blue-600 text-white w-48 ... rounded"
                    label="PRINT PDF"
                    type="button"
                    onClick={handlePrint}
                    disabled={campusID === ""}
                  />
                </div>
              </div>
            </div>

            {render ? (
              <div className="px-6 pt-4 pb-48 space-y-10">
                {selectedCampus.length ? (
                  <>
                    <ReportsTable LIST={selectedCampus} />
                    <RejectedList
                      TOTAL={selectRejects.total}
                      STUDENTS={selectRejects.students}
                      EMPLOYEE={selectRejects.employees}
                    />
                  </>
                ) : (
                  <span className="font-bold">
                    CLICK A SPECIFIC CAMPUS ON THE LEFT-SIDE TO VIEW ITS
                    REPORTS.
                  </span>
                )}
              </div>
            ) : (
              <> </>
            )}
          </div>
        </DualLayout>
      </Background>

      <div style={{ display: "none" }}>
        <ReportsPDF
          ref={componentRef}
          CAMPUS={campusName}
          REPORTS_TABLE={
            <>
              <ReportsTable
                LIST={selectedCampus}
                NOT_SEARCHABLE
                REMOVE_PAGE_CONTROL
              />
              {/* <RejectedList
                TOTAL={selectRejects.total}
                STUDENTS={selectRejects.students}
                EMPLOYEE={selectRejects.employees}
              /> */}
            </>
          }
        />
      </div>
    </>
  );
}

export default Reports;
