import React from "react";
// import { useState } from "react";

function DashboardModal({
  gateNumber,
  closeModal,
  SON,
  SAMCIS,
  SOL,
  SEA,
  SOM,
  STELA,
  Students,
  Employees,
  Visitors,
  Allowed,
  Rejected,
}) {
  return (
    <>
      <div className="modalBackground" onClick={() => closeModal(false)}>
        <div className="modalContainer">
          <div className="closeButton">
            <h3 onClick={() => closeModal(false)}>X</h3>
          </div>
          {/* ########################### MODAL TITLE ######################### */}
          <div className="modalTitle">
            <h1>Main Campus Destination Overview</h1>
            <h3>{gateNumber}</h3>
          </div>

          {/* ########################### MODAL BODY ######################### */}
          <div className="modalBody">
            {/* <div className="viewIndicator">
              <h1>
                <span className="dot2"></span>Allowed: 1000
              </h1>
              <h1 className="rejected">
                <span className="dot"></span>Rejected: 150
              </h1>
            </div> */}

            <div className="modalDestination">
              {" "}
              <h1>
                {Students > 0 ? <>Students - {Students}</> : "Students - 0"}
              </h1>
              <h1>
                {Employees > 0 ? <>Employees - {Employees}</> : "Employees - 0"}
              </h1>
              <h1>
                {Visitors > 0 ? <>Visitors - {Visitors}</> : "Visitors - 0"}
              </h1>
              <h1>
                <span className="dot2"></span>{" "}
                {Allowed > 0 ? <>Allowed - {Allowed}</> : ""}
              </h1>
              <h1 className="rejected">
                <span className="dot"></span>{" "}
                {Rejected > 0 ? <>Rejected - {Rejected}</> : ""}
              </h1>
            </div>
          </div>

          {/* ########################### MODAL FOOTER ######################### */}
          <div className="modalFooter">
            <h3 style={{ color: "red" }}>{SEA > 0 ? <>SEA - {SEA}</> : ""}</h3>
            <h3 style={{ color: "green" }}>
              {SON > 0 ? <>SON - {SON}</> : ""}
            </h3>
            <h3 style={{ color: "brown" }}>
              {SOL > 0 ? <>SOL - {SOL}</> : ""}
            </h3>
            <h3 style={{ color: "#E75480" }}>
              {STELA > 0 ? <>STELA - {STELA}</> : ""}
            </h3>
            <h3 style={{ color: "darkkhaki" }}>
              {SAMCIS > 0 ? <>SAMCIS - {SAMCIS}</> : ""}
            </h3>
            <h3 style={{ color: "mediumpurple" }}>
              {SOM > 0 ? <>SOM - {SOM}</> : ""}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardModal;
