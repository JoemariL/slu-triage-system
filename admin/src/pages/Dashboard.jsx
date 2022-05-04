import React, { useEffect, useState } from "react";
import { getHdfToday } from "../actions/commonActions";
// import DashboardModal from "../app/components/DashboardModal";
// import sampleReport from "../app/components/reports_sample.json";
import DashboardFilter from "../app/components/Dashboard/DashboardFilter";
import DashboardDropDown from "../app/components/Dashboard/Dropdown";

function Dashboard() {
  // const [openModal, setOpenModal] = useState(false);
  const [records, setRecords] = useState({});
  const [selected1, setSelected1] = useState("Main Campus");

  useEffect(() => {
    (async function () {
      const info = await getHdfToday();
      setRecords(info);
    })();
  }, []);

  console.log(records);

  return (
    <>
      <div className="dash-drop">
        <DashboardDropDown selected={selected1} setSelected={setSelected1} />
      </div>
      <div>
        {(selected1 === "Main Campus" && (
          <>
            <h1 style={{ textAlign: "center" }}> Main Campus Status</h1>
            <DashboardFilter schoolName="Main Campus" />
          </>
        )) ||
          (selected1 === "Mary Heights" && (
            <>
              <h1 style={{ textAlign: "center" }}> Mary Heights Status</h1>
              <DashboardFilter schoolName="Bakakeng Campus" />
            </>
          )) ||
          (selected1 === "Navy Base" && (
            <>
              <h1 style={{ textAlign: "center" }}> Navy Base Status</h1>
              <DashboardFilter schoolName="Navy Base" />
            </>
          ))}
      </div>
    </>
  );
}

export default Dashboard;
