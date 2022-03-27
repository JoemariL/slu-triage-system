import React, { useState } from "react";
import classnames from "classnames";
import { Select, Input, Button, Checkbox } from "../../../commons";
import Appbar from "../Appbar";

import { register } from "../../../../actions/authActions";

const userTypes = ["STUDENT", "EMPLOYEE", "VISITOR"];

const RegistrationForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState(userTypes[0]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      userType,
      firstName,
      lastName,
      age,
      contactNumber,
      address,
      email,
      password,
    };
    const response = await register(user);
    // TODO: Display something here...
    if (response) console.log(response);
  };

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

      <form
        onSubmit={handleSubmit}
        className="m-5 pt-20 flex flex-col space-y-5 sm:mx-16 md:mx-28 lg:mx-36 ease-in-out duration-300"
      >
        <div>
          <span className="text-xl">What are you?</span>
          <Select
            items={userTypes}
            selectStyle="h-12"
            optionStyle="hover:bg-blue-700 hover:text-white"
            subtitle="Please choose your appropriate type as user."
            onChange={setUserType}
          />
        </div>

        <hr />

        <div>
          <div className="mb-5 text-gray-600">
            <span>
              <strong>USER INFORMATION</strong>
            </span>
          </div>
          <Input
            inputOutStyle="rounded focus-within:border-blue-800"
            inputInStyle="h-12"
            placeholder="Enter your first name"
            id="firstName"
            name="firstName"
            type={"text"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            inputOutStyle="rounded focus-within:border-blue-800"
            inputInStyle="h-12"
            placeholder="Enter your last name"
            id="lastName"
            name="lastName"
            type={"text"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <Input
            inputOutStyle="rounded focus-within:border-blue-800"
            inputInStyle="h-12"
            placeholder="Enter your age"
            id="age"
            name="age"
            type={"text"}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <hr />

        <div className="space-y-5">
          <div className="mb-5 text-gray-600">
            <span>
              <strong>CONTACT INFORMATION</strong>
            </span>
          </div>
          <Input
            inputOutStyle="rounded focus-within:border-blue-800"
            inputInStyle="h-12"
            placeholder="Enter your contact number"
            id="contactNumber"
            name="contactNumber"
            type={"text"}
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <hr />

        <div className="space-y-5">
          <div className="mb-5 text-gray-600">
            <span>
              <strong>USER ACCOUNT</strong>
            </span>
          </div>

          <Input
            inputOutStyle="rounded focus-within:border-blue-800"
            inputInStyle="h-12"
            placeholder="Enter your email address"
            subtitle="You can use letters, numbers, & periods."
            id="emailAddress"
            name="emailAddres"
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* <Input
              inputOutStyle="rounded focus-within:border-blue-800"
              type={showPassword ? "text" : "password"}
              inputInStyle="h-12"
              placeholder="Confirm your password"
              subtitle="Use 8 or more characters with a mix of letters, numbers & symbols."
              id="confirmPassword"
              name="confirmPassword"
            /> */}
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
