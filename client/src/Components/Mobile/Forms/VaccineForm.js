import classnames from "classnames";

const VaccineForm = ({ err }) => {
  return (
    <div className="text-base">
      <form className="component-form">
        <span>
          <strong>COVID-19 VACCINATION RECORD</strong>
        </span>
        <div className="grid grid-flow-row auto-rows-auto space-y-2">
          <div>
            <input
              className="component-radiobtn"
              type="radio"
              value="Fully Vaccinated"
              name="fullyVaccinated"
            />
            <span>Fully Vaccinated</span>
          </div>

          <div>
            <input
              className="component-radiobtn"
              type="radio"
              value="Partially Vaccinated"
              name="partiallyVaccinated"
            />
            <span>Partially Vaccinated</span>
          </div>

          <div>
            <input
              className="component-radiobtn"
              type="radio"
              value="Not Vaccinated"
              name="unvaccinated"
            />
            <span>Not Vaccinated</span>
          </div>
        </div>

        <hr />

        <div>
          <p>What COVID-19 vaccine did you get?</p>
        </div>

        <div className="grid grid-flow-row auto-rows-auto space-y-2">
          <div className="flex flex-row items-center">
            <input
              className="component-checkbox"
              type="checkbox"
              id="pfizer"
              name="pfizer"
              value="Pfizer"
            />
            <span>Pfizer</span>
          </div>

          <div className="flex flex-row items-center">
            <input
              className="component-checkbox"
              type="checkbox"
              id="moderna"
              name="moderna"
              value="Moderna"
            />
            <span>Moderna</span>
          </div>

          <div className="flex flex-row items-center">
            <input
              className="component-checkbox"
              type="checkbox"
              id="jandjj"
              name="jandjj"
              value="Jhonson and Johnson Janssen"
            />
            <span>Jhonson and Johnson Janssen</span>
          </div>

          <div className="flex flex-row items-center">
            <input
              className="component-checkbox"
              type="checkbox"
              id="sinovac"
              name="sinovac"
              value="Sinovac"
            />
            <span>Sinovac</span>
          </div>

          <div className="flex flex-row items-center">
            <input
              className="component-checkbox"
              type="checkbox"
              id="astrazeneca"
              name="astrazeneca"
              value="Astrazeneca"
            />
            <span>Astrazeneca</span>
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
            id="vaccineSerial"
            name="vaccineSerial"
            placeholder="Enter your vaccination card serial no."
            required
          />
        </div>

        <div>
          <button className="component-button-blue" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default VaccineForm;
