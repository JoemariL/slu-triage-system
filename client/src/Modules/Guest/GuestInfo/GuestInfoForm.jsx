import React, { useEffect, useState } from "react";

import useForm from "../../../hooks/useForm";
import {
  VisitorFormInitialState,
  VisitorFormValidations,
} from "./guest_info_form";

import { Input, Button } from "../../../Components/commons";

const GuestInfoForm = ({
  SWITCH_NEXT = () => {},
  ON_SUCEESS = () => {},
  ON_ERROR = () => {},
}) => {
  const {
    changeHandler,
    setFormValues,
    isFormValid,
    formValues,
    formErrors,
    inputTouched,
  } = useForm(VisitorFormInitialState, VisitorFormValidations);

  const handleSubmit = async (e) => {
    e.preventDefault();

    localStorage.setItem("userInfo", JSON.stringify(formValues));
    SWITCH_NEXT();
  };

  return (
    <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <span className="text-md font-bold text-gray-500">
          ENTER YOUR BASIC INFORMATION
        </span>

        <div>
          <Input
            label="First Name"
            placeholder="Enter your First Name"
            id="first_name"
            name="first_name"
            type="text"
            required
            error={inputTouched.first_name && formErrors.first_name}
            onChange={changeHandler}
          />

          <Input
            label="Last Name"
            placeholder="Enter your Last Name"
            id="last_name"
            name="last_name"
            type="text"
            required
            error={inputTouched.last_name && formErrors.last_name}
            onChange={changeHandler}
          />

          <Input
            label="Age"
            placeholder="Enter your Age"
            id="age"
            name="age"
            type="number"
            required
            error={inputTouched.age && formErrors.age}
            onChange={changeHandler}
          />
        </div>
      </div>

      <div className="flex flex-col space-y-5">
        <span className="text-md font-bold text-gray-500">
          ENTER YOUR CONTACT INFORMATION
        </span>

        <div className="space-y-3">
          <Input
            label="Contact Number"
            placeholder="Enter your Contact Number"
            id="contact_number"
            name="contact_number"
            type="text"
            required
            minLength={11}
            maxLength={11}
            error={inputTouched.contact_number && formErrors.contact_number}
            onChange={changeHandler}
            subtitle="Please start with 0. (e.g. 09—)"
          />

          <Input
            label="Local Address"
            placeholder="Enter Local Address"
            id="home_address"
            name="home_address"
            type="text"
            required
            error={inputTouched.home_address && formErrors.home_address}
            onChange={changeHandler}
          />
        </div>
      </div>

      <Button
        className="bg-blue-900 text-white  rounded"
        label="Next"
        type="submit"
        disabled={!isFormValid}
      />
    </form>
  );
};

export default GuestInfoForm;
