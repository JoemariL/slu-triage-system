import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { Input, Button, Checkbox, RadioButton } from "../../../commons";
import Appbar from "../Appbar";

function VaccineForm(props) {
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
          onClick={props.returnOnClick}
          className="bg-white"
          headerText={"Updating Vaccination Profile"}
        />
      </div>

      <form className="m-5 pt-20 flex flex-col space-y-5 sm:mx-16 md:mx-28 lg:mx-36 ease-in-out duration-300">
        <div className="flex flex-col space-y-5">
          <div>
            <p>
              <strong>COVID-19 VACCINATION RECORD</strong>
            </p>
          </div>

          <div className="space-y-5">
            <RadioButton
              name="vaccinationRecord"
              id="vaccinationRecord"
              label="Fully Vaccinated"
              value="FULLY-VACCINATED"
            />
            <RadioButton
              name="vaccinationRecord"
              id="vaccinationRecord"
              value="PARTIALLY-VACCINATED"
              label="Partially Vaccinated"
            />
            <RadioButton
              name="vaccinationRecord"
              id="vaccinationRecord"
              label="Not Vaccinated"
              value="NOT-VACCINATED"
            />
          </div>
        </div>

        <hr />

        <div className="flex flex-col space-y-5">
          <div>
            <p>What COVID-19 Vaccine did you get?</p>
          </div>

          <div className="space-y-5">
            <Checkbox name="pfizer" id="pfizer" label="Pfizer" />
            <Checkbox name="moderna" id="fever" label="Moderna" />
            <Checkbox
              name="jandjj"
              id="jandjj"
              label="Jhonson and Johnson Janssen"
            />
            <Checkbox name="sinova" id="sinova" label="Sinovac" />
            <Checkbox name="astrazeneca" id="astrazeneca" label="Astrazeneca" />
          </div>

          <div>
            <Input
              inputOutStyle="rounded focus-within:border-blue-800"
              inputInStyle="h-12"
              placeholder="Enter your vaccination card serial no."
              id="deptDestination"
              name="deptDestination"
              type={"text"}
              required
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col space-y-3">
            <Button
              buttonStyle="h-12 rounded text-white bg-blue-900 hover:bg-blue-800"
              label="Save"
              type={"submit"}
            />

            <Button
              buttonStyle="h-12 rounded border-2 border-gray-600 text-gray-600 bg-white hover:border-gray-400 hover:text-gray-400"
              label="Cancel"
              type="button"
              onClick={props.cancelOnClick}
            />
          </div>
        </div>
      </form>
      <br />
    </div>
  );
}

export default VaccineForm;