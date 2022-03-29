import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { Input, Checkbox, RadioButton, Button } from "../../Components/commons";
import { Appbar } from "../../Components";
import { generateHdf } from "../../actions/userActions";

const GenerateHDF = (props) => {
  // HDF Variables.
  const [exposure, setExposure] = useState(false);
  const [positive, setPositive] = useState(false);

  // Medical history checkboxes.
  const [fever, setFever] = useState(false);
  const [cough, setCough] = useState(false);
  const [cold, setCold] = useState(false);
  const [soreThroat, setSoreThroat] = useState(false);
  const [diffBreathing, setDiffBreathing] = useState(false);
  const [diarrhea, setDiarrhea] = useState(false);

  const [pregnant, setPregnant] = useState(false);
  const [destination, setDestination] = useState("");

  const handleChangeCheckboxes = (e) => {
    switch (e.target.value) {
      case "FEVER":
        setFever(!fever);
        break;
      case "COUGH":
        setCough(!cough);
        break;
      case "COLD":
        setCold(!cold);
        break;
      case "SORE":
        setSoreThroat(!soreThroat);
        break;
      case "BREATHING":
        setDiffBreathing(!diffBreathing);
        break;
      case "DIARRHEA":
        setDiarrhea(!diarrhea);
        break;
      default:
        return null;
    }
  };

  const handleChangePregnant = (e) => {
    if (e.target.value === "YES") setPregnant(true);
    else if (e.target.value === "N/A") setPregnant(null);
    else setPregnant(false);
  };

  const handleChangeDestination = (e) => {
    setDestination(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      exposure,
      positive,
      fever,
      cough,
      cold,
      soreThroat,
      diffBreathing,
      diarrhea,
      pregnant,
      destination,
    };
    const response = await generateHdf(payload);
    //TODO: SUCCESS AND ERROR MESSAGES
    if (response.hasOwnProperty("message")) console.log(response.message);
    if (response) console.log(response);

    props.nextPage();
  };

  return (
    <div
      className={classnames(
        "absolute min-h-screen w-full z-50 bg-white",
        props.className
      )}
    >
      {/* Appbar. */}
      <div>
        <Appbar headerText="Fill out your HDF" onClick={props.returnOnClick} />
      </div>

      {/* Health Declaration Form. */}
      <div className="py-20 px-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300 space-y-10">
        <div>
          <p>
            <span className="text-lg">
              <strong>INSTRUCTION</strong>
            </span>
            <br />
            Answer the following questions truthfully.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* COVID-19 Exposure. */}
          <div className="space-y-5">
            <p>
              In the past weeks, have you had any known &nbsp;
              <span className="underline underline-offset-2 decoration-blue-800">
                EXPOSURE
              </span>
              &nbsp; to confirmed COVID-19 patient?
            </p>

            <div className="flex flex-row space-x-5">
              <RadioButton
                name="covidExposure"
                id="covidExposure"
                value="YES"
                label="Yes"
                onChange={() => {
                  setExposure(true);
                }}
              />
              <RadioButton
                name="covidExposure"
                id="covidExposure"
                value="NO"
                label="No"
                onChange={() => {
                  setExposure(false);
                }}
              />
            </div>
          </div>

          {/* COVID-19 Positive. */}
          <div className="space-y-5">
            <p>
              Have you tested &nbsp;
              <span className="underline underline-offset-2 decoration-blue-800">
                POSITIVE
              </span>
              &nbsp; for COVID-19 in the last 30 days?
            </p>

            <div className="flex flex-row space-x-5">
              <RadioButton
                name="covidPositive"
                id="covidPositive"
                value="YES"
                label="Yes"
                onChange={() => {
                  setPositive(true);
                }}
              />
              <RadioButton
                name="covidPositive"
                id="covidPositive"
                value="NO"
                label="No"
                onChange={() => {
                  setPositive(false);
                }}
              />
            </div>
          </div>

          <hr />

          {/* MEDICAL HISTORY. */}
          <div className="space-y-5">
            <div className="text-md text-gray-500">
              <span>
                <strong>MEDICAL HISTORY</strong>
              </span>
            </div>

            <div className="space-y-5">
              <span>
                Have you been sicked or experienced any of the following in the
                last 14 days?
              </span>

              <div className="space-y-3">
                <Checkbox
                  name="fever"
                  id="fever"
                  label="Fever"
                  value="FEVER"
                  onChange={handleChangeCheckboxes}
                />
                <Checkbox
                  name="cough"
                  id="cough"
                  label="Cough"
                  value="COUGH"
                  onChange={handleChangeCheckboxes}
                />
                <Checkbox
                  name="cold"
                  id="cold"
                  label="Cold"
                  value="COLD"
                  onChange={handleChangeCheckboxes}
                />
                <Checkbox
                  name="soreThroat"
                  id="soreThroat"
                  label="Sore Throat"
                  value="SORE"
                  onChange={handleChangeCheckboxes}
                />
                <Checkbox
                  name="diffBreathing"
                  id="diffBreathing"
                  label="Difficulty Breathing"
                  value="BREATHING"
                  onChange={handleChangeCheckboxes}
                />
                <Checkbox
                  name="diarrhea"
                  id="diarrhea"
                  label="Diarrhea"
                  value="DIARRHEA"
                  onChange={handleChangeCheckboxes}
                />
              </div>
            </div>

            <hr />

            {/* Pregnancy status. */}
            <div className="space-y-5">
              <div className="text-md text-gray-500">
                <span>
                  <strong>PREGNANCY STATUS</strong>
                </span>
              </div>

              <div className="space-y-5">
                <span>Are you pregnant?</span>

                <div className="flex flex-row space-x-5">
                  <RadioButton
                    name="isPregnant"
                    id="isPregnant"
                    value="YES"
                    label="Yes"
                    onChange={handleChangePregnant}
                  />
                  <RadioButton
                    name="isPregnant"
                    id="isPregnant"
                    value="NO"
                    label="No"
                    onChange={handleChangePregnant}
                  />
                  <RadioButton
                    name="isPregnant"
                    id="isPregnant"
                    value="N/A"
                    label="Not Applicable"
                    onChange={handleChangePregnant}
                  />
                </div>
              </div>
            </div>

            <hr />

            {/* Dep't & Destination. */}
            <div>
              <Input
                inputOutStyle="rounded focus-within:border-blue-800"
                inputInStyle="h-12"
                placeholder="Please enter your department or destination"
                id="deptDestination"
                name="deptDestination"
                type={"text"}
                subtitle="SAMCIS, SEA, etc."
                onChange={handleChangeDestination}
                required
              />
            </div>

            <br />

            <div>
              <Button
                buttonStyle="h-12 rounded text-white bg-blue-900 hover:bg-blue-800"
                label="Submit"
                type={"submit"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateHDF;
