import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../actions/authActions";
import useForm from "../../../hooks/useForm";

import { Select, Input, Button, Checkbox } from "../../../Components/commons";

const userTypes = ["STUDENT", "EMPLOYEE"];
const departmentNames = [
  "SAMCIS",
  "SAS",
  "SEA",
  "SNS",
  "SOL",
  "SOM",
  "SON",
  "STELA",
];

const UpdateProfileModule = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form className="flex flex-col space-y-10">
        <div className="flex flex-col space-y-3">
          <span className="text-lg">You are a/an</span>
          <Select
            name="userType"
            asFormInput
            items={userTypes}
            subtitle="Please choose your appropriate type as user of this application."
            disabled
          />
        </div>

        <div className="flex flex-col space-y-3">
          <span className="text-lg">Department</span>
          <Select
            name="department"
            asFormInput
            items={departmentNames}
            disabled
          />
        </div>

        <hr />

        <div className="flex flex-col space-y-5">
          <span className="text-md font-bold text-gray-500">
            BASIC USER INFORMATION
          </span>

          <div>
            <Input
              placeholder="Enter your First Name"
              id="firstName"
              name="firstName"
              type="text"
              disabled
            />

            <Input
              placeholder="Enter your Last Name"
              id="lastName"
              name="lastName"
              type="text"
              disabled
            />

            <Input
              placeholder="Enter your Age"
              id="age"
              name="age"
              type="text"
            />
          </div>
        </div>

        <hr />

        <div className="flex flex-col space-y-5">
          <span className="text-md font-bold text-gray-500">
            BASIC CONTACT INFORMATION
          </span>

          <div>
            <Input
              placeholder="Enter your Contact Number"
              id="contactNumber"
              name="contactNumber"
              type="text"
            />

            <Input
              placeholder="Enter Local Address"
              id="address"
              name="address"
              type="text"
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
              placeholder="Enter your Email Address"
              id="email"
              name="email"
              type="text"
              subtitle="You can only use your university email: (@slu.edu.ph)."
              disabled
            />
          </div>
        </div>

        <hr />

        <div className="flex flex-col space-y-5">
          <span className="text-md font-bold text-gray-500">
            CHANGE PASSWORD
          </span>

          <div className="flex flex-col space-y-3">
            <div>
              <Input
                placeholder="Enter your Old Password"
                id="oldPassword"
                name="oldPassword"
                type={showPassword ? "text" : "password"}
              />
            </div>

            <div>
              <Input
                placeholder="Enter your New Password"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
              />

              <Input
                placeholder="Confirm your New Password"
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
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

        <Button label="Save" type="submit" loading={isLoading} />
      </form>
    </>
  );
};

export default UpdateProfileModule;
