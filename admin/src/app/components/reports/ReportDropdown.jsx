import React, { useState } from "react";
import "../../../css/reports.css";

function ReportDropdown({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
  const options = ["General", "Main Campus", "Bakakeng Campus", "Navy Base"];

  return (
    <>
      <div className="dropdown">
        <div className="dropbtn" onClick={(e) => setIsActive(!isActive)}>
          {selected}
        </div>

        {isActive && (
          <div className="dropdown-content">
            {options.map((option) => (
              <h4
                onClick={(e) => {
                  setSelected(option);
                  setIsActive(false);
                }}
              >
                {option}
              </h4>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ReportDropdown;
