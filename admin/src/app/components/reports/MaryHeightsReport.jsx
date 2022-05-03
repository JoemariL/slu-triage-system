import { useEffect, useState } from "react";
import sampleReport from "../reports_sample.json";
import "../../../css/reports.css";

import React from "react";

const GeneralReport = (props) => {
  return (
    <>
      {sampleReport.map((item) => (
        <>
          {item.info
            .filter((entry) => entry.school === "Mary Heights")
            .map((subItem) => (
              <>
                <div className="gen-rprt-bdy" key={item._id}>
                  <div>{subItem.school}</div>
                  <div>{subItem.gate}</div>
                  <div>Allowed: {subItem.allowed}</div>
                  <div>Rejected: {subItem.not_allowed}</div>
                  <div>Employees: {subItem.employees}</div>
                  <div>LAW: {subItem.department_list.LAW}</div>
                </div>
              </>
            ))}
        </>
      ))}

      <div className="cardContainer">
        <div className="gen-rprt-card">
          <div className="gen-rprt-bdy">
            <h1>Mary Heights</h1>
            <h3>Total Approved: 1000</h3>
            <h3>Total Rejected: 500</h3>
            <div className="gates">
              <h3 className="gate1">Gate 1</h3>
              <h3 className="gate2">Gate 2</h3>
              <h3 className="gate3">Gate 3</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralReport;
