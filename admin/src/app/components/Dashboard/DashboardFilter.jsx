import sampleReport from "../reports_sample.json";
import React, { useState } from "react";
import DashboardModal from "./DashboardModal";

function DashboardFilter(props) {
  let School = props.schoolName;
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);
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
      department_list: {},
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

            //GATE COURSE CHECKER
            for (let gateCourse in school["department_list"]) {
              if (gateCourse in gate[school["gate"]]["department_list"]) {
                gate[school["gate"]]["department_list"][gateCourse] +=
                  school["department_list"][gateCourse];
              } else {
                gate[school["gate"]]["department_list"][gateCourse] =
                  school["department_list"][gateCourse];
              }
            }

            //ELSE
          } else {
            gate[school["gate"]] = {
              school: school["school"],
              allowed: school["allowed"],
              not_allowed: school["not_allowed"],
              total_entry: school["total_entry"],
              students: school["students"],
              visitors: school["visitors"],
              employees: school["employees"],
              department_list: school["department_list"],
            };
          }
          //
          //Course checker
          for (var course in school["department_list"]) {
            if (course in CampusTotal["department_list"]) {
              CampusTotal["department_list"][course] +=
                school["department_list"][course];
            } else {
              CampusTotal["department_list"][course] =
                school["department_list"][course];
            }
          }
        });
    });
    return (
      <>
        <div className="container2">
          <div className="flex-container">
            <div
              onClick={() => {
                setOpenModal(true);
              }}
            >
              {gate["Gate 1"]?.allowed > 0 ? (
                <>
                  <h4>Gate 1</h4>
                  <div className="crd-body">
                    <p>
                      <span className="dot2"> </span>
                      Allowed:{gate["Gate 1"].allowed}
                    </p>
                    <p className="rejected">
                      <span className="dot"> </span>
                      Rejected:{gate["Gate 1"].not_allowed}
                    </p>
                  </div>
                  <div className="Breakdown"></div>
                  <div className="breakdown">
                    <h5>Students: {gate["Gate 1"]?.students}</h5>
                    <h5>Employees: {gate["Gate 1"]?.employees}</h5>
                    <h5>Visitors: {gate["Gate 1"]?.visitors}</h5>
                  </div>
                </>
              ) : (
                <>No Data Available</>
              )}
            </div>
            <div
              onClick={() => {
                setOpenModal2(true);
              }}
            >
              {gate["Gate 2"]?.allowed > 0 ? (
                <>
                  <h4>Gate 2</h4>
                  <div className="crd-body">
                    <p>
                      <span className="dot2"> </span>
                      Allowed:{gate["Gate 2"].allowed}
                    </p>
                    <p className="rejected">
                      <span className="dot"> </span>
                      Rejected:{gate["Gate 2"].not_allowed}
                    </p>
                  </div>
                  <div className="Breakdown"></div>
                  <div className="breakdown">
                    <h5>Students: {gate["Gate 2"]?.students}</h5>
                    <h5>Employees: {gate["Gate 2"]?.employees}</h5>
                    <h5>Visitors: {gate["Gate 2"]?.visitors}</h5>
                  </div>
                </>
              ) : (
                <>No Data Available</>
              )}
            </div>
            <div
              onClick={() => {
                setOpenModal3(true);
              }}
            >
              {gate["Gate 3"]?.allowed > 0 ? (
                <>
                  <h4>Gate 3</h4>
                  <div className="crd-body">
                    <p>
                      <span className="dot2"> </span>
                      Allowed:{gate["Gate 3"].allowed}
                    </p>
                    <p className="rejected">
                      <span className="dot"> </span>
                      Rejected:{gate["Gate 3"].not_allowed}
                    </p>
                  </div>
                  <div className="Breakdown"></div>
                  <div className="breakdown">
                    <h5>Students: {gate["Gate 3"]?.students}</h5>
                    <h5>Employees: {gate["Gate 3"]?.employees}</h5>
                    <h5>Visitors: {gate["Gate 3"]?.visitors}</h5>
                  </div>
                </>
              ) : (
                <>No Data Available</>
              )}
            </div>
            <div>
              <div
                onClick={() => {
                  setOpenModal4(true);
                }}
              >
                {gate["Gate 4"]?.allowed > 0 ? (
                  <>
                    <h4>Gate 4</h4>
                    <div className="crd-body">
                      <p>
                        <span className="dot2"> </span>
                        Allowed:{gate["Gate 4"].allowed}
                      </p>
                      <p className="rejected">
                        <span className="dot"> </span>
                        Rejected:{gate["Gate 4"].not_allowed}
                      </p>
                    </div>
                    <div className="Breakdown"></div>
                    <div className="breakdown">
                      <h5>Students: {gate["Gate 4"]?.students}</h5>
                      <h5>Employees: {gate["Gate 4"]?.employees}</h5>
                      <h5>Visitors: {gate["Gate 4"]?.visitors}</h5>
                    </div>
                  </>
                ) : (
                  <>No Data Available</>
                )}
              </div>
            </div>
          </div>
          {console.log(gate["Gate 1"].department_list?.SOL)}
          {(openModal && (
            <DashboardModal
              closeModal={setOpenModal}
              gateNumber="Gate 1"
              SON={gate["Gate 1"]?.department_list?.SON}
              SAMCIS={gate["Gate 1"]?.department_list?.SAMCIS}
              SOL={gate["Gate 1"]?.department_list?.SOL}
              SEA={gate["Gate 1"]?.department_list?.SEA}
              SOM={gate["Gate 1"]?.department_list?.SOM}
              STELA={gate["Gate 1"]?.department_list?.STELA}
              Students={gate["Gate 1"]?.students}
              Employees={gate["Gate 1"]?.employees}
              Visitors={gate["Gate 1"]?.visitors}
              Allowed={gate["Gate 1"]?.allowed}
              Rejected={gate["Gate 1"]?.not_allowed}
            />
          )) ||
            (openModal2 && (
              <DashboardModal
                closeModal={setOpenModal2}
                gateNumber="Gate 2"
                SON={gate["Gate 2"]?.department_list?.SON}
                SAMCIS={gate["Gate 2"]?.department_list?.SAMCIS}
                SOL={gate["Gate 2"]?.department_list?.SOL}
                SEA={gate["Gate 2"]?.department_list?.SEA}
                SOM={gate["Gate 2"]?.department_list?.SOM}
                STELA={gate["Gate 2"]?.department_list?.STELA}
                Students={gate["Gate 2"]?.students}
                Employees={gate["Gate 2"]?.employees}
                Visitors={gate["Gate 2"]?.visitors}
                Allowed={gate["Gate 2"]?.allowed}
                Rejected={gate["Gate 2"]?.not_allowed}
              />
            )) ||
            (openModal3 && (
              <DashboardModal
                closeModal={setOpenModal3}
                gateNumber="Gate 3"
                SON={gate["Gate 3"]?.department_list?.SON}
                SAMCIS={gate["Gate 3"]?.department_list?.SAMCIS}
                SOL={gate["Gate 3"]?.department_list?.SOL}
                SEA={gate["Gate 3"]?.department_list?.SEA}
                SOM={gate["Gate 3"]?.department_list?.SOM}
                STELA={gate["Gate 3"]?.department_list?.STELA}
                Students={gate["Gate 3"]?.students}
                Employees={gate["Gate 3"]?.employees}
                Visitors={gate["Gate 3"]?.visitors}
                Allowed={gate["Gate 3"]?.allowed}
                Rejected={gate["Gate 3"]?.not_allowed}
              />
            )) ||
            (openModal4 && (
              <DashboardModal
                closeModal={setOpenModal4}
                gateNumber="Gate 4"
                SON={gate["Gate 4"]?.department_list?.SON}
                SAMCIS={gate["Gate 4"]?.department_list?.SAMCIS}
                SOL={gate["Gate 4"]?.department_list?.SOL}
                SEA={gate["Gate 4"]?.department_list?.SEA}
                SOM={gate["Gate 4"]?.department_list?.SOM}
                STELA={gate["Gate 4"]?.department_list?.STELA}
                Students={gate["Gate 4"]?.students}
                Employees={gate["Gate 4"]?.employees}
                Visitors={gate["Gate 4"]?.visitors}
                Allowed={gate["Gate 4"]?.allowed}
                Rejected={gate["Gate 4"]?.not_allowed}
              />
            ))}
        </div>
      </>
    );
  };
  return <>{compiled_array(sampleReport, School)}</>;
}

export default DashboardFilter;
