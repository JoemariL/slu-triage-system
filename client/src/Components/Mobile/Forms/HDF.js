import classnames from "classnames";

const HDF = (err) => {
  return (
    <div className="text-base">
      <form className="component-form">
        <p>
          <span className="text-xl">
            <strong>INSTRUCTIONS</strong> <br />
          </span>
          Answer the following questions truthfully.
        </p>

        <hr />

        <div className="grid grid-rows-2">
          <span>
            In the past weeks, have you had any known exposure to confirmed
            COVID-19 patient?
          </span>

          <div className="flex flex-row items-center">
            <input
              className="component-radiobtn"
              type="radio"
              value={true}
              name="covidExposure"
            />
            <span>Yes</span>
            <input
              className="component-radiobtn"
              type="radio"
              value={false}
              name="covidExposure"
            />
            <span>No</span>
          </div>
        </div>

        <div className="grid grid-rows-2">
          <span>
            Have you tested POSITIVE for COVID-19 in the last 30 days?
          </span>

          <div className="flex flex-row items-center">
            <input
              className="component-radiobtn"
              type="radio"
              value={true}
              name="covidPositive"
            />
            <span>Yes</span>
            <input
              className="component-radiobtn"
              type="radio"
              value={false}
              name="covidPositive"
            />
            <span>No</span>
          </div>
        </div>

        <hr />

        <div>
          <p>
            <span className="text-xl">
              <strong>MEDICAL HISTORY</strong> <br />
            </span>
            Have you been sicked or experienced any of the following in the last
            14 days?
          </p>
        </div>

        <div className="grid grid-flow-row auto-rows-auto space-y-2">
          <div className="flex flex-row items-center">
            <input
              className="component-checkbox"
              type="checkbox"
              id="fever"
              name="fever"
              value="Fever"
            />
            <span>Fever</span>
          </div>

          <div className="flex flex-row items-center">
            <input
              className="component-checkbox"
              type="checkbox"
              id="cough"
              name="cough"
              value="Cough"
            />
            <span>Cough</span>
          </div>

          <div className="flex flex-row items-center">
            <input
              className="component-checkbox"
              type="checkbox"
              id="cold"
              name="cold"
              value="Cold"
            />
            <span>Cold</span>
          </div>

          <div className="flex flex-row items-center">
            <input
              className="component-checkbox"
              type="checkbox"
              id="soreThroat"
              name="soreThroat"
              value="Sore Throat"
            />
            <span>Sore Throat</span>
          </div>

          <div className="flex flex-row items-center">
            <input
              className="component-checkbox"
              type="checkbox"
              id="diffBreathing"
              name="diffBreathing"
              value="Difficulty Breathing"
            />
            <span>Difficulty Breathing</span>
          </div>

          <div className="flex flex-row items-center">
            <input
              className="component-checkbox"
              type="checkbox"
              id="diarrhea"
              name="diarrhea"
              value="Diarrhea"
            />
            <span>Diarrhea</span>
          </div>
        </div>

        <hr />

        <div>
          <div className="grid grid-rows-2">
            <span>Are you pregnant?</span>

            <div className="p-1 flex flex-row items-center space-x-5">
              <div>
                <input
                  className="component-radiobtn"
                  type="radio"
                  value={true}
                  name="pregnant"
                />
                <span>Yes</span>
              </div>

              <div>
                <input
                  className="component-radiobtn"
                  type="radio"
                  value={false}
                  name="pregnant"
                />
                <span>No</span>
              </div>

              <div>
                <input
                  className="component-radiobtn"
                  type="radio"
                  name="pregnant"
                />
                <span>Not applicable</span>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="grid grid-row-2 space-y-2">
          <input
            className={classnames(
              "component-input",
              err ? "border-red-600" : "border-gray-300"
            )}
            type="input"
            id="deptDestination"
            name="deptDestination"
            placeholder="Enter your department or destination"
            required
          />
          <span className="px-2 text-sm text-gray-500">SAMCIS, SEA, etc.</span>
        </div>

        <div>
          <button className="component-button-blue" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HDF;
