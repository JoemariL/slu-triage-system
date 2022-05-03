import { useEffect, useState } from "react";
import sampleReport from "../reports_sample.json";
import "../../../css/reports.css";

import React from "react";
import { sample } from "lodash";

const GeneralReport = (props) => {
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
        .filter((entry) => entry.school === filter_school)
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

  return <>{compiled_array(sampleReport, "Main Campus")}</>;
};

export default GeneralReport;
