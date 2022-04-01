import React, { useState } from "react";
import classnames from "classnames";
import { Appbar } from "../../Components";
import { Input, Button } from "../../Components/commons";

import { useNavigate } from "react-router-dom";

const VisitorForm = (props) => {
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [age, setAge] = useState("")
  const [contact_number, setContactNumber] = useState("");
  const [home_address, setAddress] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { first_name, last_name, age, contact_number, home_address }
    localStorage.setItem('userInfo', JSON.stringify(data))
    navigate('/visitor')
  }

  return (
    <div
      className={classnames(
        "absolute min-h-screen w-full z-50 bg-white",
        props.className
      )}
    >
      <div>
        <Appbar
          headerText="Fill out the form below"
          onClick={props.returnOnClick}
        />
      </div>

      {/* Registration form. */}
      <div className="py-20 px-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300">
        <form onSubmit={handleSubmit} className="space-y-5">
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
                required
                value={first_name}
                onChange={(e) => {setFirstName(e.target.value)}}
              />
              <Input
                inputOutStyle="rounded focus-within:border-blue-800"
                inputInStyle="h-12"
                placeholder="Enter your last name"
                id="lastName"
                name="lastName"
                type={"text"}
                required
                value={last_name}
                onChange={(e) => {setLastName(e.target.value)}}
              />
              <Input
                inputOutStyle="rounded focus-within:border-blue-800"
                inputInStyle="h-12"
                placeholder="Enter your age"
                id="age"
                name="age"
                type={"text"}
                required
                value={age}
                onChange={(e) => {setAge(e.target.value)}}
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
                required
                value={contact_number}
                onChange={(e) => {setContactNumber(e.target.value)}}
              />

              <Input
                inputOutStyle="rounded focus-within:border-blue-800"
                inputInStyle="h-12"
                placeholder="Enter your local address"
                id="localAddress"
                name="localAddress"
                type={"text"}
                required
                value={home_address}
                onChange={(e) => {setAddress(e.target.value)}}
              />
            </div>
          </div>

          <br />

          <div>
            <Button
              buttonStyle="h-12 rounded text-white bg-blue-900 hover:bg-blue-800"
              label="Next"
              type={"submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisitorForm;
