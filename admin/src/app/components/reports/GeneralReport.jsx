import "../../../css/reports.css";
import MainCampusReport from "../reports/MainCampusReport";
import MaryHeightsReport from "../reports/MaryHeightsReport";

import React from "react";

const GeneralReport = (props) => {
  return (
    <>
      <MainCampusReport />
      <MaryHeightsReport />
    </>
  );
};

export default GeneralReport;
