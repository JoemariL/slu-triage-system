import React, { useState, useEffect } from "react";
import classnames from "classnames";

import useForm from "../../../hooks/useForm";
import { VisitorVaccineFormInitialState } from "./guest_vaccine_form";

import {
  Alert,
  Input,
  Button,
  RadioButton,
  Checkbox,
} from "../../../Components/commons";

const GuestVaccineForm = ({
  SWITCH_NEXT = () => {},
  ON_SUCEESS = () => {},
  ON_ERROR = () => {},
}) => {
  const { changeHandler, setFormValues, formValues } = useForm(
    VisitorVaccineFormInitialState
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      vaccine_status,
      vaccine_date: vacDate,
      vaccine_serial_no,
    } = formValues;

    let vaccine_date = new Date(vacDate);

    if (vaccine_status === "NOT VACCINATED") {
      localStorage.setItem("userVaccine", JSON.stringify({ vaccine_status }));
      SWITCH_NEXT();
    } else {
      localStorage.setItem(
        "userVaccine",
        JSON.stringify({ vaccine_status, vaccine_date, vaccine_serial_no })
      );
      SWITCH_NEXT();
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

      <Alert
        message="Please take note that you are still required to bring your own Vaccination Card for verification."
        info
      />

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
            required
          />
          <RadioButton
            name="vaccine_status"
            id="vaccine_status"
            value="PARTIALLY VACCINATED"
            label="PARTIALLY VACCINATED"
            required
          />
          <RadioButton
            name="vaccine_status"
            id="vaccine_status"
            value="NOT VACCINATED"
            label="NOT VACCINATED"
            required
          />
        </div>
      </div>

      <div
        className={classnames(
          "space-y-5",
          formValues?.vaccine_status === "NOT VACCINATED" && "sr-only"
        )}
      >
        <div className="flex flex-col space-y-3">
          <Input
            label="DATE OF YOUR MOST RECENT VACCINE SHOT"
            id="vaccine_date"
            name="vaccine_date"
            type="date"
            max={new Date().toISOString().slice(0, 10)}
            onChange={changeHandler}
            disabled={
              formValues?.vaccine_status === "NOT VACCINATED" ? true : false
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
            disabled={
              formValues?.vaccine_status === "NOT VACCINATED" ? true : false
            }
          />
        </div>
      </div>

      <Button
        className="bg-blue-900 text-white rounded"
        label="Next"
        type="submit"
      />
    </form>
  );
};

export default GuestVaccineForm;
