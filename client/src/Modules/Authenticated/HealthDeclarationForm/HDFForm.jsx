import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../../../hooks/useForm";
import { generateHdf } from "../../../actions/userActions";

import { HDFormInitialState } from "./hdf_form";

import {
  Button,
  RadioButton,
  Checkbox,
  Input,
} from "../../../Components/commons";

const HDFForm = ({ HDF_SUCCESS = () => {}, HDF_ERROR = () => {} }) => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");

  const { changeHandler, formValues, isFormValid } =
    useForm(HDFormInitialState);

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

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const response = await generateHdf(formValues);

    if (response.hasOwnProperty("message")) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
      localStorage.setItem("destination", destination);
      navigate("/hdf/result", { replace: true });
    }
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
          &nbsp; to confirmed COVID-19 patient?&nbsp;
          <span className="text-red-600">*</span>
        </p>

        <div className="flex flex-row space-x-5" onChange={handleRadio}>
          <RadioButton
            name="covidExposure"
            id="covidExposure"
            value={true}
            label="YES"
            required
          />
          <RadioButton
            name="covidExposure"
            id="covidExposure"
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
          &nbsp; for COVID-19 in the last 30 days?&nbsp;
          <span className="text-red-600">*</span>
        </p>

        <div className="flex flex-row space-x-5" onChange={handleRadio}>
          <RadioButton
            name="covidPositive"
            id="covidPositive"
            value={true}
            label="YES"
            required
          />
          <RadioButton
            name="covidPositive"
            id="covidPositive"
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

      {/* TODO: Will ask for destination input. */}
      <div className="flex flex-col space-y-3">
        <span className="text-lg">Where will you go within the campus?</span>
        <Input
          placeholder="Enter your Destination"
          id="deptDestination"
          name="deptDestination"
          type="text"
          subtitle="Registrar, etc."
          value={destination}
          onChange={(e) => { setDestination(e.target.value)}}
        />
      </div>

      <Button
        className="bg-blue-900 text-white rounded"
        label="Submit"
        type="submit"
        disabled={!isFormValid}
        loading={isLoading}
      />
    </form>
  );
};

export default HDFForm;
