import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IoIosArrowDropdown } from "react-icons/io";
import classnames from "classnames";

const userType = [
  { id: 1, name: "student", value: "Student" },
  { id: 2, name: "employee", value: "Employee" },
  { id: 3, name: "visitor", value: "Visitor" },
];

const RegisterForm = (err) => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedType, setSelectedType] = useState(userType[0]);

  const handleCheckChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="text-base">
      <form className="component-form">
        <span className="text-xl">
          <strong>What are you?</strong>
        </span>
        <div className="grid grid-row-2 space-y-2">
          <Listbox
            as="div"
            className="relative"
            value={selectedType}
            onChange={setSelectedType}
          >
            {({ open }) => (
              <>
                <Listbox.Button className="p-2 w-full flex justify-between items-center rounded ring-1 bg-white ring-gray-300">
                  {selectedType.value}
                  <IoIosArrowDropdown
                    className={open ? "h-6 w-6 rotate-180" : "h-6 w-6"}
                  />
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Listbox.Options className="absolute w-full mt-2 z-2 rounded ring-1 bg-white ring-gray-300">
                    {userType.map((type) => (
                      <Listbox.Option
                        className="p-2 rounded cursor-pointer select-none hover:bg-blue-700 hover:text-white"
                        key={type.id}
                        value={type}
                      >
                        {type.value}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </>
            )}
          </Listbox>
          <span className="px-2 text-sm text-gray-500">
            Please select your appropriate type.
          </span>
        </div>

        <hr />
        <span className="text-gray-500">
          <strong>User Information</strong>
        </span>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <input
              className={classnames(
                "component-input",
                err ? "border-red-600" : "border-gray-300"
              )}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              minLength="2"
              required
            />
          </div>

          <div>
            <input
              className={classnames(
                "component-input",
                err ? "border-red-600" : "border-gray-300"
              )}
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              minLength="2"
              required
            />
          </div>

          <div>
            <input
              className={classnames(
                "component-input",
                err ? "border-red-600" : "border-gray-300"
              )}
              type="number"
              id="age"
              name="age"
              placeholder="Enter your age"
              required
            />
          </div>
        </div>

        <hr />

        <span className="text-gray-500">
          <strong>Contact Details</strong>
        </span>
        <div className="grid grid-row-2 space-y-2">
          <input
            className={classnames(
              "component-input",
              err ? "border-red-600" : "border-gray-300"
            )}
            type="text"
            id="contactNumber"
            name="contactNumber"
            placeholder="Enter your contact number"
            minLength="16"
            required
          />
          <span className="px-2 text-sm text-gray-500">
            For mobile phones, you can start with either '+63' or '0.'
          </span>
        </div>

        <div>
          <input
            className={classnames(
              "component-input",
              err ? "border-red-600" : "border-gray-300"
            )}
            type="text"
            id="localAddress"
            name="localAddress"
            placeholder="Enter your local address"
            minLength="4"
            required
          />
        </div>

        <hr />

        <span className="text-gray-500">
          <strong>Email & Password</strong>
        </span>

        <div className="grid grid-row-2 space-y-2">
          <input
            className={classnames(
              "component-input",
              err ? "border-red-600" : "border-gray-300"
            )}
            type="email"
            id="emailAddress"
            name="emailAddress"
            placeholder="Enter your email address"
            required
          />
          <span className="px-2 text-sm text-gray-500">
            You can use letters, numbers, & periods.
          </span>
        </div>

        <div className="grid grid-row-3 space-y-5">
          <div>
            <input
              className={classnames(
                "component-input",
                err ? "border-red-600" : "border-gray-300"
              )}
              type={isChecked ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              minLength="8"
              required
            />
          </div>

          <div className="grid grid-row-2 space-y-2">
            <input
              className={classnames(
                "component-input",
                err ? "border-red-600" : "border-gray-300"
              )}
              type={isChecked ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              minLength="8"
              required
            />
            <span className="px-2 text-sm text-gray-500">
              Use 8 or more characters with a mix of letters, numbers & symbols.
            </span>
          </div>

          <div className="px-2 flex flex-row items-center space-x-3">
            <input
              className="component-checkbox"
              type="checkbox"
              id="showPassword"
              name="showPassword"
              value="Show Password"
              checked={isChecked}
              onChange={handleCheckChange}
            />
            <span>Show Password</span>
          </div>
        </div>

        <div>
          <button className="component-button-blue" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
