import { useEffect, useState } from "react";
import sampleReport from "../reports_sample.json";
import "../../../css/reports.css";

import React from "react";

const GeneralReport = (props) => {
  let depList = ["SAMCIS", "SAS", "SEA", "SNS", "SOL", "SOM", "SON", "STELA"];

  let compiled_array = (sampleReport, filter_school) => {
    let numbers = {
      school: filter_school,
      allowed: 0,
      not_allowed: 0,
      total_entry: 0,
      students: 0,
      employees: 0,
      visitors: 0,
    };
    sampleReport.map((entry_1) => {
      entry_1.info
        .filter(
          (entry) => entry.school === filter_school && entry.gate === "Gate 1"
        )
        .map((school) => {
          numbers["allowed"] += school["allowed"];
          numbers["not_allowed"] += school["not_allowed"];
          numbers["total_entry"] += school["total_entry"];
          numbers["students"] += school["students"];
          numbers["employees"] += school["employees"];
          numbers["visitors"] += school["visitors"];
        });
    });

    return (
      <>
        <div>
          <h1>General Total</h1>
          <h3>Total Entries: {numbers.total_entry}</h3>
          <h3>Total allowed: {numbers.allowed}</h3>
          <h3>Not Allowed: {numbers.not_allowed}</h3>
          <h3>Total students: {numbers.students}</h3>
          <h3>Total Employees: {numbers.employees}</h3>
          <h3>Total Visitors: {numbers.visitors}</h3>
          <h3>Total gate: {numbers?.gate}</h3>
        </div>
      </>
    );
  };

  return (
    <>
      <>{compiled_array(sampleReport, "Main Campus")}</>;
      {/* <div className="cardContainer">
        <div className="rprt-card">
          <div className="rprt-card-header">
            <h3>Saint Louis University</h3>
            <h3>Triage Report</h3>
          </div>
          <div className="gen-rprt-bdy">
            <div className="rprt-campus">
              <h1>Main Campus</h1>
            </div>
            <div className="gates">
              <h3>Gate 1</h3>
              <h3>Gate 2</h3>
              <h3>Gate 3</h3>
              <h3>Gate 4</h3>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default GeneralReport;
