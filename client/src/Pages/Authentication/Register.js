import React, { useState } from "react";
import classnames from "classnames";
import { Appbar } from "../../Components";
import { Select, Input, Checkbox, Button } from "../../Components/commons";
import { register } from "../../actions/authActions";

const userTypes = ["STUDENT", "EMPLOYEE", "VISITOR"];

const Register = (props) => {
  // Set up registration variables.
  const [userType, setUserType] = useState(userTypes[0]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const clickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
    // TODO: Display something here.
    if (response) console.log(response);

    props.nextPage();
  };

  return (
    <div
      className={classnames(
        "absolute min-h-screen w-full z-50 bg-white",
        props.className
      )}
    >
      {/* Appbar. */}
      <div>
        <Appbar
          headerText="Create your account"
          onClick={props.returnOnClick}
        />
      </div>

      {/* Registration form. */}
      <div className="py-20 px-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* USER TYPE. */}
          <div className="space-y-5">
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

          {/* BASIC USER INFORMATION. */}
          <div className="space-y-5">
            <div className="text-md text-gray-500">
              <span>
                <strong>BASIC USER INFORMATION</strong>
              </span>
            </div>

            <div>
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
          </div>

          <hr />

          {/* CONTACT INFORMATION. */}
          <div className="space-y-5">
            <div className="text-md text-gray-500">
              <span>
                <strong>USER CONTACT DETAILS</strong>
              </span>
            </div>

            <div className="space-y-5">
              <Input
                inputOutStyle="rounded focus-within:border-blue-800"
                inputInStyle="h-12"
                placeholder="Enter your contact number"
                id="contactNumber"
                name="contactNumber"
                type={"text"}
                subtitle="For mobile phones, you can start with either '+63' or '0.'"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
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
          </div>

          <hr />

          {/* USER CREDENTIALS. */}
          <div className="space-y-5">
            <div className="text-md text-gray-500">
              <span>
                <strong>USER ACCOUNT</strong>
              </span>
            </div>

            <div className="space-y-5">
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

              {/* PASSWORD. */}
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

                <Input
                  inputOutStyle="rounded focus-within:border-blue-800"
                  type={showPassword ? "text" : "password"}
                  inputInStyle="h-12"
                  placeholder="Confirm your password"
                  subtitle="Use 8 or more characters with a mix of letters, numbers & symbols."
                  id="confirmPassword"
                  name="confirmPassword"
                />
              </div>

              <Checkbox
                name="visiblePassword"
                id="visiiblePasswer"
                label="Show password"
                onChange={clickShowPassword}
              />
            </div>
          </div>

          <br />

          <div>
            <Button
              buttonStyle="h-12 rounded text-white bg-blue-900 hover:bg-blue-800"
              label="Register"
              type={"submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
