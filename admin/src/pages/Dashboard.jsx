import React, { useEffect, useState } from "react";
import { getHdfToday } from "../actions/commonActions";
import DashboardModal from "../app/components/DashboardModal";

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
              <span className="dot2"></span>Allowed: 1000
            </p>
            <p className="rejected">
              <span className="dot"></span>Rejected: 150
            </p>
            <div className="Breakdown">
              <h5>Student:750</h5>
              <h5>Employee:200</h5>
              <h5>Visitor:50</h5>
            </div>
          </div>
          <div>
            <h4>Gate 2</h4>
            <p>
              <span className="dot2"></span>Allowed: 800
            </p>
            <p className="rejected">
              <span className="dot"></span>Rejected: 250
            </p>
            <div className="Breakdown">
              <h5>Student:500</h5>
              <h5>Employee:200</h5>
              <h5>Visitor:100</h5>
            </div>
          </div>
          <div>
            <h4>Gate 3</h4>
            <p>
              <span className="dot2"></span>Allowed: 600
            </p>
            <p className="rejected">
              <span className="dot"></span>Rejected: 350
            </p>
            <div className="Breakdown">
              <h5>Student:500</h5>
              <h5>Employee:50</h5>
              <h5>Visitor:50</h5>
            </div>
          </div>
          <div>
            <h4>Gate 4</h4>
            <p>
              <span className="dot2"></span>Allowed: 45
            </p>
            <p className="rejected">
              <span className="dot"></span>Rejected: 65
            </p>
            <div className="Breakdown">
              <h5>Student: 20</h5>
              <h5>Employee:20</h5>
              <h5>Visitor:5</h5>
            </div>
          </div>
        </div>
        {openModal && <DashboardModal closeModal={setOpenModal} />}
      </div>
    </>
  );
}

export default Dashboard;
