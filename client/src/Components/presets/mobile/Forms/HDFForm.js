import React, { useState } from "react";
import classnames from "classnames";
import { Button, Input, Checkbox, RadioButton } from "../../../commons";
import Appbar from "../Appbar";

function HDFForm(props) {
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
        <Appbar className="bg-white" headerText="Health Declaration Form" />
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
          <form className="m-5 flex flex-col space-y-5">
            <div className="space-y-5">
              <p>
                In the past weeks, have you had any known exposure to confirmed
                COVID-19 patient?
              </p>
              <div className="flex flex-row space-x-5">
                <RadioButton
                  name="covidExposure"
                  id="covidExposure"
                  label="Yes"
                />
                <RadioButton
                  name="covidExposure"
                  id="covidExposure"
                  label="No"
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
                  label="Yes"
                />
                <RadioButton
                  name="covidPositive"
                  id="covidPositive"
                  label="No"
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
              <Checkbox name="fever" id="fever" label="Fever" />
              <Checkbox name="cough" id="cough" label="Cough" />
              <Checkbox name="cold" id="cold" label="Cold" />
              <Checkbox name="soreThroat" id="soreThroat" label="Sore Throat" />
              <Checkbox
                name="diffBreathing"
                id="diffBreathing"
                label="Difficulty Breathing"
              />
              <Checkbox name="diarrhea" id="diarrhea" label="Diarrhea" />
            </div>

            <div>
              <div className="space-y-5">
                <p>Are you pregnant?</p>
                <div className="flex flex-row space-x-5">
                  <RadioButton name="isPregnant" id="isPregnant" label="Yes" />
                  <RadioButton name="isPregnant" id="isPregnant" label="No" />
                  <RadioButton
                    name="isPregnant"
                    id="isPregnant"
                    label="Not Applicable"
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
