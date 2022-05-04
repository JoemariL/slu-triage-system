import "../../../css/reports.css";
import MainCampusReport from "../reports/MainCampusReport";
import MaryHeightsReport from "../reports/MaryHeightsReport";
import NavyBaseReport from "../reports/NavyBaseReport";

import React from "react";

const GeneralReport = (props) => {
  return (
    <>
      <h1>Main Campus</h1>
      <MainCampusReport />
      <h1>Mary Heights Campus</h1>
      <MaryHeightsReport />
      <h1>Navy Base Campus</h1>
      <NavyBaseReport />
    </>
  );
};

export default GeneralReport;
