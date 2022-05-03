import sampleReport from "../reports_sample.json";
import "../../../css/reports.css";
import React from "react";

const FilterReport = (props) => {
  let School = props.schoolName;
  let compiled_array = (sampleReport, filter_school) => {
    let gate = {};

    let CampusTotal = {
      school: filter_school,
      allowed: 0,
      not_allowed: 0,
      total_entry: 0,
      students: 0,
      employees: 0,
      visitors: 0,
    };

    sampleReport.forEach((entries) => {
      entries.info
        .filter((entries) => entries.school === filter_school)
        .forEach((school) => {
          CampusTotal["allowed"] += school["allowed"];
          CampusTotal["not_allowed"] += school["not_allowed"];
          CampusTotal["total_entry"] += school["total_entry"];
          CampusTotal["students"] += school["students"];
          CampusTotal["employees"] += school["employees"];
          CampusTotal["visitors"] += school["visitors"];
          if (gate[school["gate"]]) {
            gate[school["gate"]].allowed += school["allowed"];
            gate[school["gate"]].not_allowed += school["not_allowed"];
            gate[school["gate"]].total_entry += school["total_entry"];
            gate[school["gate"]].students += school["students"];
            gate[school["gate"]].employees += school["employees"];
            gate[school["gate"]].visitors += school["visitors"];
          } else {
            gate[school["gate"]] = {
              school: school["school"],
              allowed: school["allowed"],
              not_allowed: school["not_allowed"],
              total_entry: school["total_entry"],
              students: school["students"],
              visitors: school["visitors"],
              employees: school["employees"],
            };
          }
          //   console.log(gate);
        });
    });
    return (
      <>
        <h1>Saint Louis University</h1>
        <h5>Total Entries: {CampusTotal.total_entry}</h5>
        <h5>Total Allowed: {CampusTotal.allowed}</h5>
        <h5>Total Rejected: {CampusTotal.not_allowed}</h5>
        {gate["Gate 1"]?.allowed > 0 ? (
          <>
            {" "}
            <h2>Gate 1 breakdown</h2>
            <div className="breakdown">
              <h5>Total entries: {gate["Gate 1"]?.total_entry}</h5>
              <h5>Allowed: {gate["Gate 1"]?.allowed}</h5>
              <h5>Not Allowed: {gate["Gate 1"]?.not_allowed}</h5>
              <h5>Students: {gate["Gate 1"]?.students}</h5>
              <h5>Employees: {gate["Gate 1"]?.employees}</h5>
              <h5>Visitors: {gate["Gate 1"]?.visitors}</h5>
            </div>{" "}
          </>
        ) : (
          <></>
        )}
        {gate["Gate 2"]?.allowed > 0 ? (
          <>
            <h2>Gate 2 breakdown</h2>
            <div className="breakdown">
              <h5>Total entries: {gate["Gate 2"]?.total_entry}</h5>
              <h5>Allowed: {gate["Gate 2"]?.allowed}</h5>
              <h5>Not Allowed: {gate["Gate 2"]?.not_allowed}</h5>
              <h5>Students: {gate["Gate 2"]?.students}</h5>
              <h5>Employees: {gate["Gate 2"]?.employees}</h5>
              <h5>Visitors: {gate["Gate 2"]?.visitors}</h5>
            </div>
          </>
        ) : (
          <></>
        )}
        {gate["Gate 3"]?.allowed > 0 ? (
          <>
            <h2>Gate 3 breakdown</h2>
            <div className="breakdown">
              <h5>Total entries: {gate["Gate 3"]?.total_entry}</h5>
              <h5>Allowed: {gate["Gate 3"]?.allowed}</h5>
              <h5>Not Allowed: {gate["Gate 3"]?.not_allowed}</h5>
              <h5>Students: {gate["Gate 3"]?.students}</h5>
              <h5>Employees: {gate["Gate 3"]?.employees}</h5>
              <h5>Visitors: {gate["Gate 3"]?.visitors}</h5>
            </div>
          </>
        ) : (
          <></>
        )}
        {gate["Gate 4"]?.allowed > 0 ? (
          <>
            <h2>Gate 4 breakdown</h2>
            <div className="breakdown">
              <h5>Total entries: {gate["Gate 4"]?.total_entry}</h5>
              <h5>Allowed: {gate["Gate 4"]?.allowed}</h5>
              <h5>Not Allowed: {gate["Gate 4"]?.not_allowed}</h5>
              <h5>Students: {gate["Gate 4"]?.students}</h5>
              <h5>Employees: {gate["Gate 4"]?.employees}</h5>
              <h5>Visitors: {gate["Gate 4"]?.visitors}</h5>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  };
  return <>{compiled_array(sampleReport, School)}</>;
};

export default FilterReport;
