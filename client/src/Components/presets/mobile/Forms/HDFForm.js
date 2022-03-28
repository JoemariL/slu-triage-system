import React, { useState } from "react";
import classnames from "classnames";
import { Button, Input, Checkbox, RadioButton } from "../../../commons";
import Appbar from "../Appbar";

import { generateHdf } from "../../../../actions/userActions";

function HDFForm(props) {

  const [exposure, setExposure] = useState(false)
  const [positive, setPositive] = useState(false)

  const [fever, setFever] = useState(false)
  const [cough, setCough] = useState(false)
  const [cold, setCold] = useState(false)
  const [soreThroat, setSoreThroat] = useState(false)
  const [diffBreathing, setDiffBreathing] = useState(false)
  const [diarrhea, setDiarrhea] = useState(false)
 
  const [pregnant, setPregnant] = useState(false)
  const [destination, setDestination] = useState("")

  const handleChangeExposure = (e) => {
    if(e.target.value === "YES") setExposure(true)
  }

  const handleChangePositive = (e) => {
    if(e.target.value === "YES") setPositive(true)
  }

  const handleChangeCheckboxes = (e) => {
    switch(e.target.value) {
      case "FEVER":
          setFever(!fever)
          break
      case "COUGH":
          setCough(!cough)
          break
      case "COLD":
          setCold(!cold)
          break
      case "SORE":
          setSoreThroat(!soreThroat)
          break
      case "BREATHING":
          setDiffBreathing(!diffBreathing)
          break
      case "DIARRHEA":
          setDiarrhea(!diarrhea)
          break
    } 
  }

  const handleChangePregnant = (e) => {
    if(e.target.value === "YES") {
      setPregnant(true)
    } else if (e.target.value === "N/A") {
      setPregnant(null)
    } else {
      setPregnant(false)
    }
  }

  const handleChangeDestination  = (e) => {
    setDestination(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { exposure, positive, fever, cough, cold, soreThroat, diffBreathing, diarrhea, pregnant, destination }
    const response = await generateHdf(payload)
    //TODO: SUCCESS AND ERROR MESSAGES
    if (response.hasOwnProperty("message")) console.log(response.message)
    if(response) console.log(response)
  }

  return (
    <div
      className={classnames(
        "text-base",
        "space-y-5",
        "bg-white",
        props.className
      )}
    >
      <div>
        <Appbar
          className="bg-white"
          headerText="Fill out your Health Declaration Form"
          onClick={props.returnOnClick}
        />
      </div>

      <div className="pt-20 mx-5 flex flex-col space-y-5 sm:mx-16 md:mx-28 lg:mx-36 ease-in-out duration-300">
        <div>
          <p>
            <span className="text-lg">
              <strong>INSTRUCTION</strong>
            </span>
            <br />
            Answer the following questions truthfully.
          </p>
        </div>

        <hr />

        <div>
          <form onSubmit={handleSubmit} className="m-5 flex flex-col space-y-5">
            <div className="space-y-5">
              <p>
                In the past weeks, have you had any known exposure to confirmed
                COVID-19 patient?
              </p>
              <div className="flex flex-row space-x-5">
                <RadioButton
                  name="covidExposure"
                  id="covidExposure"
                  value="YES"
                  label="Yes"
                  onChange={handleChangeExposure}
                />
                <RadioButton
                  name="covidExposure"
                  id="covidExposure"
                  value="NO"
                  label="No"
                  onChange={handleChangeExposure}
                />
              </div>
            </div>

            <div className="space-y-5">
              <p>
                Have you tested <u>POSITIVE for COVID-19</u> in the last 30
                days?
              </p>
              <div className="flex flex-row space-x-5">
                <RadioButton
                  name="covidPositive"
                  id="covidPositive"
                  value="YES"
                  label="Yes"
                  onChange={handleChangePositive}
                />
                <RadioButton
                  name="covidPositive"
                  id="covidPositive"
                  value="NO"
                  label="No"
                  onChange={handleChangePositive}
                />
              </div>
            </div>

            <hr />

            <div>
              <p>
                <span className="text-lg">
                  <strong>MEDICAL HISTORY</strong>
                </span>
                <br />
                Have you been sicked or experienced any of the following in the
                last 14 days?
              </p>
            </div>

            <div className="space-y-4">
              <Checkbox name="fever" id="fever" label="Fever" value="FEVER" isChecked={fever} onChange={handleChangeCheckboxes}/>
              <Checkbox name="cough" id="cough" label="Cough" value="COUGH" isChecked={cough} onChange={handleChangeCheckboxes}/>
              <Checkbox name="cold" id="cold" label="Cold" value="COLD" isChecked={cold} onChange={handleChangeCheckboxes}/>
              <Checkbox name="soreThroat" id="soreThroat" label="Sore Throat" value="SORE" isChecked={soreThroat} onChange={handleChangeCheckboxes}/>
              <Checkbox
                name="diffBreathing"
                id="diffBreathing"
                label="Difficulty Breathing"
                value="BREATHING"
                isChecked={diffBreathing}
                onChange={handleChangeCheckboxes}
              />
              <Checkbox name="diarrhea" id="diarrhea" label="Diarrhea" value="DIARRHEA" isChecked={diarrhea} onChange={handleChangeCheckboxes} />
            </div>

            <div>
              <div className="space-y-5">
                <p>Are you pregnant?</p>
                <div className="flex flex-row space-x-5">
                  <RadioButton name="isPregnant" id="isPregnant" value="YES" label="Yes" onChange={handleChangePregnant} />
                  <RadioButton name="isPregnant" id="isPregnant" value="NO" label="No" onChange={handleChangePregnant} />
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

            <div>
              <Input
                inputOutStyle="rounded focus-within:border-blue-800"
                inputInStyle="h-12"
                placeholder="Enter your department or destination"
                id="deptDestination"
                name="deptDestination"
                type={"text"}
                subtitle="SAMCIS, SEA, etc."
                required
                onChange={handleChangeDestination}
              />
            </div>

            <div>
              <Button
                buttonStyle="h-12 rounded text-white bg-blue-900 hover:bg-blue-800"
                label="Submit"
                type={"submit"}
              />
            </div>
          </form>
        </div>
      </div>
      <br />
    </div>
  );
}

export default HDFForm;
