import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../../../hooks/useForm";
import { VisitorHDFormInitialState } from "./guest_hdf_form";

import {
  Input,
  Button,
  RadioButton,
  Checkbox,
} from "../../../Components/commons";

const GuestHDFForm = ({
  SWITCH_NEXT = () => {},
  ON_SUCEESS = () => {},
  ON_ERROR = () => {},
}) => {
  const navigate = useNavigate();

  const { changeHandler, setFormValues, formValues, isFormValid } = useForm(
    VisitorHDFormInitialState
  );

  const handleRadio = (event) => {
    const value =
      event.target.value === "true"
        ? true
        : event.target.value === "false"
        ? false
        : null;

    const item = { target: { name: event.target.name, value: value } };
    changeHandler(item);
  };

  const handleCheck = (event) => {
    const value = event.target.checked ? true : false;

    const item = { target: { name: event.target.name, value: value } };
    changeHandler(item);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdAt = new Date();
    const {
      covid_exposure,
      covid_positive,
      fever,
      cough,
      cold,
      sore_throat,
      diff_breathing,
      diarrhea,
      pregnant,
      destination,
    } = formValues;

    let allowed = true;

    if (
      covid_exposure ||
      covid_positive ||
      fever ||
      cough ||
      cold ||
      sore_throat ||
      diff_breathing ||
      diarrhea
    ) {
      allowed = false;
    }

    const payload = {
      covid_exposure,
      covid_positive,
      fever,
      cough,
      cold,
      sore_throat,
      diff_breathing,
      diarrhea,
      pregnant,
      destination,
      createdAt,
      allowed,
    };
    localStorage.setItem("userHDF", JSON.stringify(payload));
    SWITCH_NEXT();
  };

  return (
    <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
      <div>
        <p>
          <span className="text-lg font-bold">INSTRUCTION</span>
          <br />
          Answer the following questions truthfully.
        </p>
      </div>

      <div className="flex flex-col space-y-3">
        <p>
          In the past weeks, have you had any known &nbsp;
          <span className="text-lg">EXPOSURE</span>
          &nbsp; to confirmed COVID-19 patient? &nbsp;
          <span className="text-red-600">*</span>
        </p>

        <div className="flex flex-row space-x-5" onChange={handleRadio}>
          <RadioButton
            name="covid_exposure"
            id="covid_exposure"
            value={true}
            label="YES"
            required
          />
          <RadioButton
            name="covid_exposure"
            id="covid_exposure"
            value={false}
            label="NO"
            required
          />
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <p>
          Have you tested &nbsp;
          <span className="text-lg">POSITIVE</span>
          &nbsp; for COVID-19 in the last 30 days? &nbsp;
          <span className="text-red-600">*</span>
        </p>

        <div className="flex flex-row space-x-5" onChange={handleRadio}>
          <RadioButton
            name="covid_positive"
            id="covid_positive"
            value={true}
            label="YES"
            required
          />
          <RadioButton
            name="covid_positive"
            id="covid_positive"
            value={false}
            label="NO"
            required
          />
        </div>
      </div>

      <hr />

      <div className="flex flex-col space-y-5">
        <p>
          <span className="text-lg font-bold">MEDICAL HISTORY</span> <br />
          Please tick if you are currently experiencing or had any of the
          following for the last 7 days.
        </p>

        <div className="flex flex-col space-y-3" onChange={handleCheck}>
          <Checkbox name="fever" id="fever" label="Fever" value="FEVER" />
          <Checkbox name="cough" id="cough" label="Cough" value="COUGH" />
          <Checkbox name="cold" id="cold" label="Cold" value="COLD" />
          <Checkbox
            name="sore_throat"
            id="sore_throat"
            label="Sore Throat"
            value="SORE"
          />
          <Checkbox
            name="diff_breathing"
            id="diff_breathing"
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

      <div className="flex flex-col space-y-3">
        <p>
          Are you pregnant?&nbsp;<span className="text-red-600">*</span>
        </p>

        <div className="flex flex-row space-x-5" onChange={handleRadio}>
          <RadioButton
            name="pregnant"
            id="pregnant"
            value={true}
            label="YES"
            required
          />
          <RadioButton
            name="pregnant"
            id="pregnant"
            value={false}
            label="NO"
            required
          />
          <RadioButton
            name="pregnant"
            id="pregnant"
            value="NOT APPLICABLE"
            label="NOT APPLICABLE"
            required
          />
        </div>
      </div>

      <hr />

      <div className="flex flex-col space-y-3">
        <Input
          label="What is your department or destination?"
          placeholder="Please enter your department or destination"
          id="destination"
          name="destination"
          type="text"
          subtitle="Registrar, etc."
          onChange={changeHandler}
          required
        />
      </div>

      <Button
        className="bg-blue-900 text-white rounded"
        label="Submit"
        type="submit"
        disabled={!isFormValid}
      />
    </form>
  );
};

export default GuestHDFForm;
