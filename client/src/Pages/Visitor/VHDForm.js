import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { Input, Checkbox, RadioButton, Button } from "../../Components/commons";
import { Appbar } from "../../Components";
import { generateHdf } from "../../actions/userActions";

const VHDForm = (props) => {
  const navigate = useNavigate();

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

        <form className="space-y-5">
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
              />
              <RadioButton
                name="covidExposure"
                id="covidExposure"
                value="NO"
                label="No"
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
              />
              <RadioButton
                name="covidPositive"
                id="covidPositive"
                value="NO"
                label="No"
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
                <Checkbox name="fever" id="fever" label="Fever" value="FEVER" />
                <Checkbox name="cough" id="cough" label="Cough" value="COUGH" />
                <Checkbox name="cold" id="cold" label="Cold" value="COLD" />
                <Checkbox
                  name="soreThroat"
                  id="soreThroat"
                  label="Sore Throat"
                  value="SORE"
                />
                <Checkbox
                  name="diffBreathing"
                  id="diffBreathing"
                  label="Difficulty Breathing"
                  value="BREATHING"
                />
                <Checkbox
                  name="diarrhea"
                  id="diarrhea"
                  label="Diarrhea"
                  value="DIARRHEA"
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
                  />
                  <RadioButton
                    name="isPregnant"
                    id="isPregnant"
                    value="NO"
                    label="No"
                  />
                  <RadioButton
                    name="isPregnant"
                    id="isPregnant"
                    value="N/A"
                    label="Not Applicable"
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

export default VHDForm;
