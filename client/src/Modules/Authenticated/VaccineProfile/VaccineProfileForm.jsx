import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import moment from "moment";

import useForm from "../../../hooks/useForm";
import { updateVaccine } from "../../../actions/userActions";
import { getUserData } from "../../../actions/userActions";

import {
  VaccineFormInitialState,
  VaccineFormValidations,
} from "./vaccine_form";

import { Input, Button, RadioButton } from "../../../Components/commons";

const VaccineProfileForm = ({
  VACCINE_SUCCESS = () => {},
  VACCINE_ERROR = () => {},
}) => {
  const navigate = useNavigate();

  const { changeHandler, formValues, setFormValues } = useForm(
    VaccineFormInitialState,
    VaccineFormValidations
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      const user = await getUserData();
      const vaccine = user.vaccination_details[0];
      if (vaccine) {
        setFormValues(vaccine);
      } else {
        setFormValues(VaccineFormInitialState);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    let {
      vaccine_status,
      vaccine_date: vaccineDate,
      vaccine_serial_no,
    } = formValues;
    let vacDate = new Date(vaccineDate);

    if (vaccine_status === "NOT VACCINATED") {
      const response = await updateVaccine({ vaccine_status });

      if (response.hasOwnProperty("message")) {
        setIsLoading(false);
        VACCINE_ERROR();
      } else {
        setIsLoading(false);
        VACCINE_SUCCESS();
      }
    } else {
      const response = await updateVaccine({
        vaccine_status,
        vaccine_date: vacDate,
        vaccine_serial_no,
      });

      if (response.hasOwnProperty("message")) {
        setIsLoading(false);
        VACCINE_ERROR();
      } else {
        setIsLoading(false);
        VACCINE_SUCCESS();
      }
    }
  };

  return (
    <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
      <div>
        <p>
          <span className="text-lg font-bold">INSTRUCTION</span>
          <br />
          Setup or update your vaccine profile truthfully.
        </p>
      </div>

      <div className="flex flex-col space-y-5">
        <p className="font-bold">
          VACCINATION STATUS&nbsp;<span className="text-red-600">*</span>
        </p>

        <div className="flex flex-col space-y-3" onChange={changeHandler}>
          <RadioButton
            name="vaccine_status"
            id="vaccine_status"
            value="FULLY VACCINATED"
            label="FULLY VACCINATED"
            checked={
              formValues?.vaccine_status === "FULLY VACCINATED" ? true : false
            }
            required
          />
          <RadioButton
            name="vaccine_status"
            id="vaccine_status"
            value="PARTIALLY VACCINATED"
            label="PARTIALLY VACCINATED"
            checked={
              formValues?.vaccine_status === "PARTIALLY VACCINATED"
                ? true
                : false
            }
            required
          />
          <RadioButton
            name="vaccine_status"
            id="vaccine_status"
            value="NOT VACCINATED"
            label="NOT VACCINATED"
            checked={
              formValues?.vaccine_status === "NOT VACCINATED" ? true : false
            }
            required
          />
        </div>
      </div>

      <div
        className={classnames(
          "space-y-5",
          formValues?.vaccine_status === "NOT VACCINATED" ? "sr-only" : ""
        )}
      >
        <div className="flex flex-col space-y-3">
          <Input
            label="DATE OF YOUR MOST RECENT SHOT"
            id="vaccine_date"
            name="vaccine_date"
            type="date"
            max={new Date().toISOString().slice(0, 10)}
            onChange={changeHandler}
            disabled={
              formValues?.vaccine_status === "NOT VACCINATED" ? true : false
            }
            value={
              formValues?.vaccine_date
                ? moment(formValues?.vaccine_date).format("YYYY-MM-DD")
                : ""
            }
            required
          />
        </div>

        <div className="flex flex-col">
          <Input
            label="VACCINATION CARD SERIAL NO."
            id="vaccine_serial_no"
            name="vaccine_serial_no"
            type="text"
            onChange={changeHandler}
            value={
              formValues?.vaccine_serial_no ? formValues.vaccine_serial_no : ""
            }
            disabled={
              formValues?.vaccine_status === "NOT VACCINATED" ? true : false
            }
          />
        </div>
      </div>

      <Button
        className="bg-blue-900 text-white rounded"
        label="Save"
        type="submit"
        loading={isLoading}
      />
    </form>
  );
};

export default VaccineProfileForm;
