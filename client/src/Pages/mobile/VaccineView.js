import React, { useState, useEffect } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import classnames from "classnames";
import {
  Input,
  Button,
  Checkbox,
  RadioButton,
  Icon,
} from "../../Components/commons";
import Appbar from "../../Components/presets/mobile/Appbar";


function VaccineView(props) {
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [notVaccinated, setNotVaccinated] = useState(false);

  const updateChange = () => {
    setIsUpdating(!isUpdating);
  };

  return (
    <div className="text-lg space-y-5">
      <div>
        <Appbar
          className="bg-white"
          headerText={
            isUpdating ? "Updating Vaccination Profile" : "Vaccination Profile"
          }
          suffixProp={
            isUpdating && (
              <Icon
                icon={
                  <BiLoaderCircle className="text-gray-400 h-6 w-6 animate-spin" />
                }
              />
            )
          }
          disabled={isUpdating}
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
              disabled={!isUpdating}
            />
            <RadioButton
              name="vaccinationRecord"
              id="vaccinationRecord"
              value="PARTIALLY-VACCINATED"
              label="Partially Vaccinated"
              disabled={!isUpdating}
            />
            <RadioButton
              name="vaccinationRecord"
              id="vaccinationRecord"
              label="Not Vaccinated"
              value="NOT-VACCINATED"
              disabled={!isUpdating}
            />
          </div>
        </div>

        <hr />

        <div className="flex flex-col space-y-5">
          <div>
            <p>What COVID-19 Vaccine did you get?</p>
          </div>

          <div className="space-y-5">
            <Checkbox
              name="pfizer"
              id="pfizer"
              label="Pfizer"
              disabled={!isUpdating}
            />
            <Checkbox
              name="moderna"
              id="fever"
              label="Moderna"
              disabled={!isUpdating}
            />
            <Checkbox
              name="jandjj"
              id="jandjj"
              label="Jhonson and Johnson Janssen"
              disabled={!isUpdating}
            />
            <Checkbox
              name="sinova"
              id="sinova"
              label="Sinovac"
              disabled={!isUpdating}
            />
            <Checkbox
              name="astrazeneca"
              id="astrazeneca"
              label="Astrazeneca"
              disabled={!isUpdating}
            />
          </div>

          <div>
            <Input
              inputOutStyle="rounded focus-within:border-blue-800"
              inputInStyle="h-12"
              placeholder="Enter your vaccination card serial no."
              id="deptDestination"
              name="deptDestination"
              type={"text"}
              disabled={!isUpdating}
              required
            />
          </div>
        </div>

        <div>
          {isUpdating ? (
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
                onClick={updateChange}
              />
            </div>
          ) : (
            <Button
              buttonStyle="h-12 rounded text-white bg-blue-900 hover:bg-blue-800"
              label="Update"
              type={"button"}
              onClick={updateChange}
            />
          )}
        </div>
      </form>
      <br />
    </div>
  );
}

export default VaccineView;
