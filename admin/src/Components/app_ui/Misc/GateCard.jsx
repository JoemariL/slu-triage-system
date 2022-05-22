import React, { useState } from "react";
import { FaList, FaChevronDown, FaChevronUp } from "react-icons/fa";
import classNames from "classnames";

const GateCard = ({
  CAMPUS_NAME = "",
  GATE_NAME = "",
  ALLOWED = 0,
  NOT_ALLOWED = 0,
  STUDENTS_NUM = 0,
  EMPLOYEES_NUM = 0,
  VISITORS_NUM = 0,
  loading = false,
  allowed = false,
  overviewOnClick = () => {},
}) => {
  const [accordion, setAccordion] = useState(false);

  const renderAccordion = () => {
    setAccordion(!accordion);
  };

  return (
    <div
      className={classNames(
        "h-fit w-[18rem] p-4 ... rounded space-y-5",
        allowed ? "bg-sky-100" : "bg-red-100"
      )}
    >
      <div className="w-full inline-flex items-center gap-3">
        <span className="font-bold truncate uppercase">{GATE_NAME}</span>

        <div className="ml-auto">
          <button
            className="p-2 border-2 rounded hover:border-blue-600 hover:text-blue-600"
            type="button"
            onClick={overviewOnClick}
          >
            <FaList className="h-5 w-5" />
          </button>
        </div>
      </div>

      {allowed && (
        <div className="bg-blue-600 text-white p-6 w-full ... flex flex-col items-center text-center justify-between rounded">
          <span className="text-2xl font-bold">{ALLOWED}</span>
          <span className="text-sm">ALLLOWED</span>
        </div>
      )}

      {!allowed && (
        <div className="bg-red-600 text-white p-6 w-full ... flex flex-col items-center text-center justify-between rounded">
          <span className="text-2xl font-bold">{NOT_ALLOWED}</span>
          <span className="text-sm">REJECTED</span>
        </div>
      )}

      <div
        className="flex flex-col justify-center items-center cursor-pointer"
        onClick={renderAccordion}
      >
        {!accordion ? (
          <FaChevronDown className="h-5 w-5" />
        ) : (
          <FaChevronUp className="h-5 w-5" />
        )}
      </div>

      {accordion && (
        <>
          <div className="flex flex-col">
            <div className="py-2 px-4 ... inline-flex items-center justify-between">
              <span>STUDENTS</span>
              <span className="font-bold">{STUDENTS_NUM}</span>
            </div>

            <div className="py-2 px-4 ... inline-flex items-center justify-between">
              <span>EMPLOYEES</span>
              <span className="font-bold">{EMPLOYEES_NUM}</span>
            </div>

            <div className="py-2 px-4 ... inline-flex items-center justify-between">
              <span>VISITORS</span>
              <span className="font-bold">{VISITORS_NUM}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GateCard;
