import React, { useEffect, useState } from "react";
import "../css/reports.css";
import ReportDropdown from "../app/components/reports/ReportDropdown";
import sampleReport from "../app/components/reports_sample.json";
import GeneralReport from "../app/components/reports/GeneralReport";
import MainCampusReport from "../app/components/reports/MainCampusReport";
import NavyBaseReport from "../app/components/reports/NavyBaseReport";
import MaryHeightsReport from "../app/components/reports/MaryHeightsReport";

function Reports() {
  const [selected, setSelected] = useState("Choose one ▼");

  return (
    <>
      <h1>Please Select Overview</h1>
      <ReportDropdown selected={selected} setSelected={setSelected} />
      <div className="reportContainer">
        <div className="rprt-title">
          <h1>{selected} Report</h1>
        </div>
      </div>
      <div className="rprt-body">
        {/* <GeneralReport /> */}
        {(selected === "General" && <GeneralReport />) ||
          (selected === "Main Campus" && <MainCampusReport />) ||
          (selected === "Mary Heights" && <MaryHeightsReport />) ||
          (selected === "Navy Base" && <NavyBaseReport />)}
      </div>
    </>
  );
}
export default Reports;
