import React, { useState } from "react";
import classnames from "classnames";
import { Select, Input, Button, Checkbox } from "../../../commons";
import Appbar from "../Appbar";

const userType = [
  { id: 1, name: "student", value: "STUDENT" },
  { id: 2, name: "employee", value: "EMPLOYEE" },
  { id: 3, name: "visitor", value: "VISITOR" },
];

const RegistrationForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const clickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div
      className={classnames(
        "text-base",
        "space-y-5",
        "bg-white",
        props.className
      )}
    >
      <div>
        <Appbar
          onClick={props.returnOnClick}
          className="bg-white"
          headerText={"Create your account"}
        />
      </div>

      <form className="m-5 pt-20 flex flex-col space-y-5 sm:mx-16 md:mx-28 lg:mx-36 ease-in-out duration-300">
        <div>
          <span className="text-xl">What are you?</span>
          <Select
            items={userType}
            selectStyle="h-12"
            optionStyle="hover:bg-blue-700 hover:text-white"
            subtitle="Please choose your appropriate type as user."
          />
        </div>

        <hr />

        <div>
          <div className="mb-5 text-gray-600">
            <strong>USER INFORMATION</strong>
          </div>
          <Input
            inputOutStyle="rounded focus-within:border-blue-800"
            inputInStyle="h-12"
            placeholder="Enter your first name"
            id="firstName"
            name="firstName"
            type={"text"}
            required
          />
          <Input
            inputOutStyle="rounded focus-within:border-blue-800"
            inputInStyle="h-12"
            placeholder="Enter your last name"
            id="lastName"
            name="lastName"
            type={"text"}
            required
          />
          <Input
            inputOutStyle="rounded focus-within:border-blue-800"
            inputInStyle="h-12"
            placeholder="Enter your age"
            id="age"
            name="age"
            type={"number"}
            required
          />
        </div>

        <hr />

        <div className="space-y-5">
          <div className="mb-5 text-gray-600">
            <strong>USER CONTACT DETAILS</strong>
          </div>
          <Input
            inputOutStyle="rounded focus-within:border-blue-800"
            inputInStyle="h-12"
            placeholder="Enter your contact number"
            id="contactNumber"
            name="contactNumber"
            type={"text"}
            subtitle="For mobile phones, you can start with either '+63' or '0.'"
            required
          />

          <Input
            inputOutStyle="rounded focus-within:border-blue-800"
            inputInStyle="h-12"
            placeholder="Enter your local address"
            id="localAddress"
            name="localAddress"
            type={"text"}
            required
          />
        </div>

        <hr />

        <div className="space-y-5">
          <div className="mb-5 text-gray-600">
            <strong>USER ACCOUNT DETAILS</strong>
          </div>

          <Input
            inputOutStyle="rounded focus-within:border-blue-800"
            inputInStyle="h-12"
            placeholder="Enter your email address"
            subtitle="You can use letters, numbers, & periods."
            id="emailAddress"
            name="emailAddres"
            type={"email"}
            required
          />

          <div>
            <Input
              inputOutStyle="rounded focus-within:border-blue-800"
              type={showPassword ? "text" : "password"}
              inputInStyle="h-12"
              placeholder="Enter your password"
              id="password"
              name="password"
              required
            />

            <Input
              inputOutStyle="rounded focus-within:border-blue-800"
              type={showPassword ? "text" : "password"}
              inputInStyle="h-12"
              placeholder="Confirm your password"
              subtitle="Use 8 or more characters with a mix of letters, numbers & symbols."
              id="confirmPassword"
              name="confirmPassword"
              required
            />
          </div>

          <Checkbox
            name="visiblePassword"
            id="visiiblePasswer"
            label="Show password"
            onChange={clickShowPassword}
          />
        </div>

        <br />
        <div>
          <Button
            buttonStyle="h-12 rounded text-white bg-blue-900 hover:bg-blue-800"
            label="Register"
            type={"submit"}
          />
        </div>
        <br />
      </form>
    </div>
  );
};

export default RegistrationForm;
