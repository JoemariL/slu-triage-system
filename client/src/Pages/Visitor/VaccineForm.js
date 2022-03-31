import React, { useState } from "react";
import classnames from "classnames";
import { Appbar } from "../../Components";
import { Input, RadioButton, Button } from "../../Components/commons";

const VaccineForm = (props) => {
  return (
    <div
      className={classnames(
        "absolute min-h-screen w-full z-50 bg-white",
        props.className
      )}
    >
      {/* Appbar. */}
      <div>
        <Appbar
          headerText="Update your vaccination profile"
          onClick={props.returnOnClick}
        />
      </div>

      {/* Update Vaccine Form. */}
      <div className="py-20 px-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300 space-y-10">
        <div>
          <p>
            <span className="text-lg">
              <strong>INSTRUCTION</strong>
            </span>
            <br />
            Setup or update your vaccination profile truthfully.
          </p>
        </div>

        <form className="space-y-5">
          <div className="space-y-5">
            <p>
              ENTER YOUR &nbsp;
              <span className="underline underline-offset-2 decoration-blue-800">
                VACCINATION STATUS.
              </span>
            </p>

            <div className="flex flex-col space-y-3">
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

          <div className="space-y-1">
            <p>
              ENTER THE &nbsp;
              <span className="underline underline-offset-2 decoration-blue-800">
                DATE
              </span>
              &nbsp; OF YOUR VACCINATION.
            </p>

            <div className="space-y-3">
              <Input
                inputOutStyle="rounded focus-within:border-blue-800"
                inputInStyle="h-12"
                id="vaccine"
                name="vaccine"
                type={"date"}
                required
              />

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

          <br />

          <div className="space-y-2">
            <Button buttonStyle="btn-primary" label="Save" type="submit" />
            <Button
              buttonStyle="btn-secondary"
              label="Cancel"
              type="button"
              onClick={props.cancelOnClick}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VaccineForm;
