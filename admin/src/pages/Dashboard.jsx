import React, { useEffect, useState } from "react";
import { getHdfToday } from "../actions/commonActions";
import DashboardModal from "../app/components/DashboardModal";
import sampleReport from "../app/components/reports_sample.json";

function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [records, setRecords] = useState({});
  useEffect(() => {
    (async function () {
      const info = await getHdfToday();
      setRecords(info);
    })();
  }, []);

  console.log(records);

  let compiled_array = (sampleReport, filter_school) => {
    let gate1 = {
      school: filter_school,
      allowed: 0,
      not_allowed: 0,
      total_entry: 0,
      students: 0,
      employees: 0,
      visitors: 0,
    };
    let gate2 = {
      school: filter_school,
      allowed: 0,
      not_allowed: 0,
      total_entry: 0,
      students: 0,
      employees: 0,
      visitors: 0,
    };
    let gate3 = {
      school: filter_school,
      allowed: 0,
      not_allowed: 0,
      total_entry: 0,
      students: 0,
      employees: 0,
      visitors: 0,
    };
    let gate4 = {
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
          gate1["allowed"] += school["allowed"];
          gate1["not_allowed"] += school["not_allowed"];
          gate1["total_entry"] += school["total_entry"];
          gate1["students"] += school["students"];
          gate1["employees"] += school["employees"];
          gate1["visitors"] += school["visitors"];
        });
    });
    sampleReport.map((entry_2) => {
      entry_2.info
        .filter(
          (entry2) =>
            entry2.school === filter_school && entry2.gate === "Gate 2"
        )
        .map((school) => {
          gate2["allowed"] += school["allowed"];
          gate2["not_allowed"] += school["not_allowed"];
          gate2["total_entry"] += school["total_entry"];
          gate2["students"] += school["students"];
          gate2["employees"] += school["employees"];
          gate2["visitors"] += school["visitors"];
        });
    });

    sampleReport.map((entry_3) => {
      entry_3.info
        .filter(
          (entry3) =>
            entry3.school === filter_school && entry3.gate === "Gate 3"
        )
        .map((school) => {
          gate3["allowed"] += school["allowed"];
          gate3["not_allowed"] += school["not_allowed"];
          gate3["total_entry"] += school["total_entry"];
          gate3["students"] += school["students"];
          gate3["employees"] += school["employees"];
          gate3["visitors"] += school["visitors"];
        });
    });

    sampleReport.map((entry_4) => {
      entry_4.info
        .filter(
          (entry4) =>
            entry4.school === filter_school && entry4.gate === "Gate 4"
        )
        .map((school) => {
          gate4["allowed"] += school["allowed"];
          gate4["not_allowed"] += school["not_allowed"];
          gate4["total_entry"] += school["total_entry"];
          gate4["students"] += school["students"];
          gate4["employees"] += school["employees"];
          gate4["visitors"] += school["visitors"];
        });
    });

    return (
      <>
        <div className="container2">
          <div>
            <h1 name="dashboardh1">Main Campus Status:</h1>
          </div>

          <div className="flex-container">
            <div
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <h4>Gate 1</h4>
              <p>
                <span className="dot2"></span>Allowed:{gate1.allowed}
              </p>
              <p className="rejected">
                <span className="dot"></span>Rejected:{gate1.not_allowed}
              </p>
              <div className="Breakdown">
                <h5>Student:{gate1.students}</h5>
                <h5>Employee:{gate1.employees}</h5>
                <h5>Visitor:{gate1.visitors}</h5>
              </div>
            </div>
            <div>
              <h4>Gate 2</h4>
              <p>
                <span className="dot2"></span>Allowed:{gate2.allowed}
              </p>
              <p className="rejected">
                <span className="dot"></span>Rejected:{gate2.not_allowed}
              </p>
              <div className="Breakdown">
                <h5>Student:{gate2.students}</h5>
                <h5>Employee:{gate2.employees}</h5>
                <h5>Visitor:{gate2.visitors}</h5>
              </div>
            </div>
            <div>
              <h4>Gate 3</h4>
              <p>
                <span className="dot2"></span>Allowed:{gate3.allowed}
              </p>
              <p className="rejected">
                <span className="dot"></span>Rejected:{gate3.not_allowed}
              </p>
              <div className="Breakdown">
                <h5>Student:{gate3.students}</h5>
                <h5>Employee:{gate3.employees}</h5>
                <h5>Visitor:{gate3.visitors}</h5>
              </div>
            </div>
            <div>
              <h4>Gate 4</h4>
              <p>
                <span className="dot2"></span>Allowed:{gate4.allowed}
              </p>
              <p className="rejected">
                <span className="dot"></span>Rejected:{gate4.not_allowed}
              </p>
              <div className="Breakdown">
                <h5>Student: {gate4.students}</h5>
                <h5>Employee:{gate4.employees}</h5>
                <h5>Visitor: {gate4.visitors}</h5>
              </div>
            </div>
          </div>
          {openModal && <DashboardModal closeModal={setOpenModal} />}
        </div>
      </>
    );
  };

  return <>{compiled_array(sampleReport, "Main Campus")}</>;
}

export default Dashboard;
