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
          //   console.log(gate);
        });
    });
    return (
      <>
        {/* <h1>Saint Louis University</h1>
        <h5>Total Entries: {CampusTotal.total_entry}</h5>
        <h5>Total Allowed: {CampusTotal.allowed}</h5>
        <h5>Total Rejected: {CampusTotal.not_allowed}</h5>
        <h5>SOL: {CampusTotal.department_list?.SOL}</h5> */}
        {/*						 */}

        <table>
          <tr>
            <th>Gate Number</th>
            <th>Total Entries</th>
            <th>Allowed</th>
            <th>Rejected</th>
            <th>STUDENTS</th>
            <th>EMPLOYEES</th>
            <th>VISITORS</th>
            <th>SAMCIS</th>
            <th>SOL</th>
            <th>SOM</th>
            <th>SEA</th>
            <th>SON</th>
            <th>STELA</th>
          </tr>

          {/*===================== GATE 1 ========================*/}
          <tr>
            <td>1</td>
            <td>
              {gate["Gate 1"]?.total_entry > 0 ? (
                gate["Gate 1"]?.total_entry
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 1"]?.allowed > 0 ? (
                gate["Gate 1"]?.total_entry
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 1"]?.not_allowed > 0 ? (
                gate["Gate 1"]?.not_allowed
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 1"]?.students > 0 ? gate["Gate 1"]?.students : <>0</>}
            </td>
            <td>
              {gate["Gate 1"]?.employees > 0 ? (
                gate["Gate 1"]?.employees
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 1"]?.visitors > 0 ? gate["Gate 1"]?.visitors : <>0</>}
            </td>
            <td>
              {gate["Gate 1"]?.department_list?.SAMCIS > 0 ? (
                gate["Gate 1"]?.department_list?.SAMCIS
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 1"]?.department_list?.SOL > 0 ? (
                gate["Gate 1"]?.department_list?.SOL
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 1"]?.department_list?.SOM > 0 ? (
                gate["Gate 1"]?.department_list?.SOM
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 1"]?.department_list?.SEA > 0 ? (
                gate["Gate 1"]?.department_list?.SEA
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 1"]?.department_list?.SON > 0 ? (
                gate["Gate 1"]?.department_list?.SON
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 1"]?.department_list?.STELA > 0 ? (
                gate["Gate 1"]?.department_list?.STELA
              ) : (
                <>0</>
              )}
            </td>
          </tr>
          {/*===================== GATE 2 ========================*/}
          <tr>
            <td>2</td>
            <td>
              {gate["Gate 2"]?.total_entry > 0 ? (
                gate["Gate 2"]?.total_entry
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 2"]?.allowed > 0 ? (
                gate["Gate 2"]?.total_entry
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 2"]?.not_allowed > 0 ? (
                gate["Gate 2"]?.not_allowed
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 2"]?.students > 0 ? gate["Gate 2"]?.students : <>0</>}
            </td>
            <td>
              {gate["Gate 2"]?.employees > 0 ? (
                gate["Gate 2"]?.employees
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 2"]?.visitors > 0 ? gate["Gate 2"]?.visitors : <>0</>}
            </td>
            <td>
              {gate["Gate 2"]?.department_list?.SAMCIS > 0 ? (
                gate["Gate 2"]?.department_list?.SAMCIS
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 2"]?.department_list?.SOL > 0 ? (
                gate["Gate 2"]?.department_list?.SOL
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 2"]?.department_list?.SOM > 0 ? (
                gate["Gate 2"]?.department_list?.SOM
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 2"]?.department_list?.SEA > 0 ? (
                gate["Gate 2"]?.department_list?.SEA
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 2"]?.department_list?.SON > 0 ? (
                gate["Gate 2"]?.department_list?.SON
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 2"]?.department_list?.STELA > 0 ? (
                gate["Gate 2"]?.department_list?.STELA
              ) : (
                <>0</>
              )}
            </td>
          </tr>
          {/*===================== GATE 3 ========================*/}
          <tr>
            <td>3</td>
            <td>
              {gate["Gate 3"]?.total_entry > 0 ? (
                gate["Gate 3"]?.total_entry
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 3"]?.allowed > 0 ? (
                gate["Gate 3"]?.total_entry
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 3"]?.not_allowed > 0 ? (
                gate["Gate 3"]?.not_allowed
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 3"]?.students > 0 ? gate["Gate 3"]?.students : <>0</>}
            </td>
            <td>
              {gate["Gate 3"]?.employees > 0 ? (
                gate["Gate 3"]?.employees
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 3"]?.visitors > 0 ? gate["Gate 3"]?.visitors : <>0</>}
            </td>
            <td>
              {gate["Gate 3"]?.department_list?.SAMCIS > 0 ? (
                gate["Gate 3"]?.department_list?.SAMCIS
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 3"]?.department_list?.SOL > 0 ? (
                gate["Gate 3"]?.department_list?.SOL
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 3"]?.department_list?.SOM > 0 ? (
                gate["Gate 3"]?.department_list?.SOM
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 3"]?.department_list?.SEA > 0 ? (
                gate["Gate 3"]?.department_list?.SEA
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 3"]?.department_list?.SON > 0 ? (
                gate["Gate 3"]?.department_list?.SON
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 3"]?.department_list?.STELA > 0 ? (
                gate["Gate 3"]?.department_list?.STELA
              ) : (
                <>0</>
              )}
            </td>
          </tr>
          {/*===================== GATE 4 ========================*/}
          <tr>
            <td>4</td>
            <td>
              {gate["Gate 4"]?.total_entry > 0 ? (
                gate["Gate 4"]?.total_entry
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 4"]?.allowed > 0 ? (
                gate["Gate 4"]?.total_entry
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 4"]?.not_allowed > 0 ? (
                gate["Gate 4"]?.not_allowed
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 4"]?.students > 0 ? gate["Gate 4"]?.students : <>0</>}
            </td>
            <td>
              {gate["Gate 4"]?.employees > 0 ? (
                gate["Gate 4"]?.employees
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 4"]?.visitors > 0 ? gate["Gate 4"]?.visitors : <>0</>}
            </td>
            <td>
              {gate["Gate 4"]?.department_list?.SAMCIS > 0 ? (
                gate["Gate 4"]?.department_list?.SAMCIS
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 4"]?.department_list?.SOL > 0 ? (
                gate["Gate 4"]?.department_list?.SOL
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 4"]?.department_list?.SOM > 0 ? (
                gate["Gate 4"]?.department_list?.SOM
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 4"]?.department_list?.SEA > 0 ? (
                gate["Gate 4"]?.department_list?.SEA
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 4"]?.department_list?.SON > 0 ? (
                gate["Gate 4"]?.department_list?.SON
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {gate["Gate 4"]?.department_list?.STELA > 0 ? (
                gate["Gate 4"]?.department_list?.STELA
              ) : (
                <>0</>
              )}
            </td>
          </tr>
          {/*===================== TOTAL ========================*/}
          <tr>
            <td>
              <h1>TOTAL</h1>
            </td>
            <td>
              {CampusTotal?.total_entry > 0 ? CampusTotal?.total_entry : <>0</>}
            </td>
            <td>{CampusTotal?.allowed > 0 ? CampusTotal?.allowed : <>0</>}</td>
            <td>
              {CampusTotal?.not_allowed > 0 ? CampusTotal?.not_allowed : <>0</>}
            </td>
            <td>
              {CampusTotal?.students > 0 ? CampusTotal?.students : <>0</>}
            </td>
            <td>
              {CampusTotal?.employees > 0 ? CampusTotal?.employees : <>0</>}
            </td>
            <td>
              {CampusTotal?.visitors > 0 ? CampusTotal?.visitors : <>0</>}
            </td>
            <td>
              {CampusTotal?.department_list?.SAMCIS > 0 ? (
                CampusTotal?.department_list?.SAMCIS
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {CampusTotal?.department_list?.SOL > 0 ? (
                CampusTotal?.department_list?.SOL
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {CampusTotal?.department_list?.SOM > 0 ? (
                CampusTotal?.department_list?.SOM
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {CampusTotal?.department_list?.SEA > 0 ? (
                CampusTotal?.department_list?.SEA
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {CampusTotal?.department_list?.SON > 0 ? (
                CampusTotal?.department_list?.SON
              ) : (
                <>0</>
              )}
            </td>
            <td>
              {CampusTotal?.department_list?.STELA > 0 ? (
                CampusTotal?.department_list?.STELA
              ) : (
                <>0</>
              )}
            </td>
          </tr>
        </table>
      </>
    );
  };
  return <>{compiled_array(sampleReport, School)}</>;
};

export default FilterReport;
