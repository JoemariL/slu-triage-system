import React from "react";
import { useState } from "react";

function DashboardModal({ closeModal }) {
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
            <h3>Gate #1</h3>
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
              <h3 style={{ color: "red" }}>
                School of Engineering and Architecture - 500
              </h3>
              <h3 style={{ color: "green" }}>School of Nursing - 200</h3>
              <h3 style={{ color: "brown" }}>School of Law - 0</h3>
              <h3>Registrar - 150</h3>
              <h3>Cashier - 150</h3>
            </div>
          </div>

          {/* ########################### MODAL FOOTER ######################### */}
          <div className="modalFooter">
            <h1>Student - 700</h1>
            <h1>Employee - 250</h1>
            <h1>Visitor - 50</h1>
            <h1>
              <span className="dot2"></span>Allowed: 1000
            </h1>
            <h1 className="rejected">
              <span className="dot"></span>Rejected: 150
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardModal;
