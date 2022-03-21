import classnames from "classnames";

const HDF = (err) => {
  return (
    <div className="text-base">
      <form className="grid grid-rows-auto gap-5">
        <hr />
        <div>
          <p>
            In the past weeks, have you had any known exposure to confirmed
            COVID-19 patient?
          </p>
          <div>
            <input
              className="m-3"
              type="radio"
              id="exposure"
              name="exposure"
              value="true"
            />
            <label for="yes">Yes</label>
          </div>

          <div>
            <input
              className="m-3"
              type="radio"
              id="exposure"
              name="exposure"
              value="false"
            />
            <label for="no">No</label>
          </div>
        </div>

        <div>
          <p>
            Have you tested <u>POSITIVE for COVID-19</u> in the last 30 days?
          </p>
          <div>
            <input
              className="m-3"
              type="radio"
              id="testedPositive"
              name="testedPositive"
              value="true"
            />
            <label for="yes">Yes</label>
          </div>

          <div>
            <input
              className="m-3"
              type="radio"
              id="testedPositive"
              name="testedPositive"
              value="false"
            />
            <label for="testedPositive">No</label>
          </div>
        </div>

        <hr />

        {/* Medical history. */}
        <div>
          <p>
            <span>
              <strong>MEDICAL HISTORY</strong> <br />
            </span>
            Have you been sicked or experienced any of the following in the last
            14 days?
          </p>

          <div>
            <input className="m-3" type="checkbox" id="fever" name="fever" />
            <label for="fever">FEVER (LAGNAT)</label>
          </div>

          <div>
            <input className="m-3" type="checkbox" id="cough" name="cough" />
            <label for="cough">COUGH (UBO)</label>
          </div>
          <div>
            <input className="m-3" type="checkbox" id="cold" name="cold" />
            <label for="cold">COLD (SIPON)</label>
          </div>

          <div>
            <input
              className="m-3"
              type="checkbox"
              id="soreThroat"
              name="soreThroat"
            />
            <label for="soreThroat">SORE THROAT (PANANAKIT NG LALAMUNAN)</label>
          </div>

          <div>
            <input
              className="m-3"
              type="checkbox"
              id="diffBreathing"
              name="diffBreathing"
            />
            <label for="diffBreathing">
              DIFFICULTY IN BREATHING (HIRAP SA PAGHINGA)
            </label>
          </div>

          <div>
            <input
              className="m-3"
              type="checkbox"
              id="diarrhea"
              name="diarrhea"
            />
            <label for="diarrhea">DIARRHEA (MADALAS NA PAGDUMI)</label>
          </div>

          <div>
            <input className="m-3" type="checkbox" id="others" name="others" />
            <label for="others">OTHERS (...)</label>
          </div>
        </div>

        <hr />

        <div>
          <label for="destination">Enter your destination</label>
          <input
            className={classnames(
              "w-full h-10 px-2 border-2 rounded border-gray-300 focus:outline-none focus:border-blue-700",
              err ? "border-red-600" : "border-gray-300"
            )}
            type="text"
            id="destination"
            name="destination"
            placeholder="Dept' / Destination"
            minLength="6"
            maxLength="16"
            required
          />
        </div>

        <div>
          <button
            className="w-full h-10 mb-0 mt-4 rounded bg-blue-800 text-white focus: outline-none hover:bg-blue-700"
            type="button"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HDF;
