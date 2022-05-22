import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../../../hooks/useForm";
import { register } from "../../../actions/authActions";

import {
  RegisterFormInitialState,
  RegisterFormValidations,
} from "./register_form";

import { Select, Input, Button, Checkbox } from "../../../Components/commons";

const USER_TYPES = ["STUDENT", "EMPLOYEE"];

const STUDENT_DEPTS = [
  "SAMCIS",
  "SAS",
  "SEA",
  "SNS",
  "SOL",
  "SOM",
  "SON",
  "STELA",
];

const EMP_DEPTS = [
  "Office of the President",
  "Office of the VPAA",
  "Office of the VPAdmin",
  "Office of the VPFinance",
  "Office of the VPHospAffairs",
  "Office of the VPMI",
  "Athletics and Fitness Center",
  "CPMSD",
  "Center fo CICM Studies",
  "CCA",
  "Extension Office",
  "Dental Clinic",
  "ERMCAA",
  "Finance Office",
  "Guidance Center",
  "HR",
  "Residence Halls",
  "Medical Clinic",
  "Museum of ICA",
  "Sacred Heart Medical Center",
  "Internal Audit",
  "Legal Affairs",
  "IDQA",
  "Student Affairs (OSA)",
  "EISSIF",
  "PEAC",
  "Inclusive Education",
  "Post Office",
  "Security Office",
  "Registrar (URO)",
  "Parish Office",
  "Printing Operations",
  "Sunflower",
  "TMDD",
  "University Libraries",
  "UnRIC",
  "SAMCIS",
  "SAS",
  "SEA",
  "LES",
  "LHS-Senior High",
  "LHS-Junior High",
  "SOL",
  "SOM",
  "SNS",
  "SON",
  "STELA",
];

const RegisterForm = ({
  REGISTER_SUCCESS = () => {},
  REGISTER_ERROR = () => {},
}) => {
    const navigate = useNavigate();

  const {
    changeHandler,
    formValues,
    setFormErrors,
    formErrors,
    isFormValid,
    inputTouched,
  } = useForm(RegisterFormInitialState, RegisterFormValidations);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const response = await register(formValues);

    if (response.hasOwnProperty("message")) {
      setFormErrors({ email: response?.message });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      REGISTER_SUCCESS();
    }
  };

  return (
    <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-3">
        <p className="text-lg">
          What are you? <span className="text-red-600">*</span>
        </p>
        <Select
          name="userType"
          asFormInput
          items={USER_TYPES}
          subtitle="Please choose your appropriate type as user of this application."
          onChange={changeHandler}
        />
      </div>
      {formValues.userType === "STUDENT" && (
        <div className="flex flex-col space-y-3">
          <p className="text-lg">
            Select your Department (Student)
            <span className="text-red-600">*</span>
          </p>
          <Select
            name="department"
            asFormInput
            items={STUDENT_DEPTS}
            onChange={changeHandler}
            subtitle="You are currently selecting a department as a STUDENT."
          />
        </div>
      )}
      {formValues.userType === "EMPLOYEE" && (
        <div className="flex flex-col space-y-3">
          <p className="text-lg">
            Select your Office (Employee)
            <span className="text-red-600">*</span>
          </p>
          <Select
            name="department"
            asFormInput
            items={EMP_DEPTS}
            onChange={changeHandler}
            subtitle="You are currently selecting an office as an EMPLOYEE."
          />
        </div>
      )}
      <hr />
      <div className="flex flex-col space-y-5">
        <span className="text-md font-bold text-gray-500">
          BASIC USER INFORMATION
        </span>

        <div>
          <Input
            label="First Name"
            placeholder="Enter your First Name"
            id="firstName"
            name="firstName"
            type="text"
            required
            error={inputTouched.firstName && formErrors.firstName}
            onChange={changeHandler}
          />

          <Input
            label="Last Name"
            placeholder="Enter your Last Name"
            id="lastName"
            name="lastName"
            type="text"
            required
            error={inputTouched.lastName && formErrors.lastName}
            onChange={changeHandler}
          />

          <Input
            label="Age"
            placeholder="Enter your Age"
            id="age"
            name="age"
            type="number"
            minLength="4"
            required
            error={inputTouched.age && formErrors.age}
            onChange={changeHandler}
          />
        </div>
      </div>
      <hr />
      <div className="flex flex-col space-y-5">
        <span className="text-md font-bold text-gray-500">
          BASIC CONTACT INFORMATION
        </span>

        <div className="space-y-3">
          <Input
            label="Contact Number"
            placeholder="Enter your Contact Number"
            id="contactNumber"
            name="contactNumber"
            type="text"
            subtitle="Please start with 0, no spaces. (e.g. 09—)"
            required
            error={inputTouched.contactNumber && formErrors.contactNumber}
            onChange={changeHandler}
            minLength={11}
            maxLength={11}
          />

          <Input
            label="Local Address"
            placeholder="Enter Local Address"
            id="address"
            name="address"
            type="text"
            required
            error={inputTouched.address && formErrors.address}
            onChange={changeHandler}
          />
        </div>
      </div>
      <hr />
      <div className="flex flex-col space-y-5">
        <span className="text-md font-bold text-gray-500">
          ACCOUNT INFORMATION
        </span>

        <div className="space-y-3">
          <Input
            label="Email Address"
            placeholder="Enter your Email Address"
            id="email"
            name="email"
            type="text"
            subtitle="You can only use your university email: (@slu.edu.ph)."
            required
            error={inputTouched.email && formErrors.email}
            onChange={changeHandler}
          />

          <div className="flex flex-col space-y-3">
            <div>
              <Input
                label="Password"
                placeholder="Enter your Password"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                error={inputTouched.password && formErrors.password}
                onChange={changeHandler}
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your Password"
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                error={
                  inputTouched.confirmPassword && formErrors.confirmPassword
                }
                onChange={changeHandler}
              />
            </div>

            <Checkbox
              name="visiblePassword"
              id="visiblePassword"
              label="Show password"
              onChange={toggleShowPassword}
            />
          </div>
        </div>
      </div>

      <Button
        className="bg-blue-900 text-white  rounded"
        label="Register"
        type="submit"
        disabled={!isFormValid}
        loading={isLoading}
      />
    </form>
  );
};

export default RegisterForm;
