import React, { useState } from "react";
import "../../../css/reports.css";

function ReportDropdown({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
  const options = ["Main Campus", "Mary Heights", "Navy Base"];
  const [selected1, setSelected1] = useState("Choose one ▼");

  return (
    <>
      <div class="dropdown">
        <div class="dropbtn" onClick={(e) => setIsActive(!isActive)}>
          {selected}
        </div>

        {isActive && (
          <div class="dash-drop">
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
