import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../../../hooks/useForm";
import { UpdateProfileValidations } from "./profile_update_form";
import {
  getUserData,
  updateProfile,
  updatePassword,
} from "../../../actions/userActions";

import {
  Select,
  Input,
  Button,
  Checkbox,
  List,
  ListItem,
} from "../../../Components/commons";

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

const ProfileUpdateForm = ({
  PROFILE_UPDATE_SUCCESS = () => {},
  PROFILE_UPDATE_ERROR = () => {},
}) => {
  const { setFormErrors, formErrors, isFormValid, inputTouched } = useForm(
    UpdateProfileValidations
  );

  const [user, setUser] = useState({});

  const [department, setDepartment] = useState("");
  const [age, setAge] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateDept, setUpdateDept] = useState(false);

  const toggleUpdateDept = () => {
    setUpdateDept(!updateDept);
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async function () {
      const user = await getUserData();
      if (user) {
        setUser(user);
        setAge(user.age);
        setNumber(user.contact_number);
        setAddress(user.home_address);
        setDepartment(user.department);
      }
    })();
  }, []);

  // TODO: Error Problem when User clicked "Save Changes" without changing anything in the input: Server Crash.
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (oldPassword.trim() !== "") {
      const profilePayload = {
        age,
        contactNumber: number,
        homeAddress: address,
        department: department,
      };

      const passwordPayload = {
        oldPassword,
        newPassword,
        confirmNewPassword: confirmPassword,
      };

      const profileResponse = await updateProfile(profilePayload);
      const passwordResponse = await updatePassword(passwordPayload);

      if (profileResponse.hasOwnProperty("message")) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }

      if (passwordResponse.hasOwnProperty("message")) {
        setIsLoading(false);

        setError(true);
        setErrorMessage(passwordResponse?.message);
      } else {
        setIsLoading(false);
        PROFILE_UPDATE_SUCCESS();
      }
    } else {
      const payload = {
        age,
        contactNumber: number,
        homeAddress: address,
        department: department,
      };

      const response = await updateProfile(payload);
      if (response.hasOwnProperty("message")) {
        setIsLoading(false);

        setError(true);
        setErrorMessage(response?.message);
      } else {
        setIsLoading(false);
        PROFILE_UPDATE_SUCCESS();
      }
    }
  };

  return (
    <div className="space-y-5">
      <hr />
      <List position="vertical">
        <ListItem
          label={`${user.first_name} ${user.last_name}`}
          subtitle="Name"
        />

        <ListItem label={user.email_address} subtitle="Email Address" />

        <ListItem label={user.user_type} subtitle="User Type" />
      </List>
      <hr />

      <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-3">
          <span className="text-md font-bold text-gray-500">
            DEPARTMENT / SCHOOL / OFFICE
          </span>
          {updateDept ? (
            <div className="space-y-5">
              {user.user_type === "STUDENT" && (
                <>
                  <Select
                    name="department"
                    asFormInput
                    items={STUDENT_DEPTS}
                    subtitle="Select your new school here to update."
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                  <Button
                    className="bg-blue-900 text-white w-full rounded"
                    type="button"
                    label="Enter Change"
                    onClick={toggleUpdateDept}
                  />
                </>
              )}

              {user.user_type === "EMPLOYEE" && (
                <>
                  <Select
                    name="department"
                    asFormInput
                    items={EMP_DEPTS}
                    subtitle="Select your new office here to update."
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                  <Button
                    className="bg-blue-900 text-white w-full rounded"
                    type="button"
                    label="Enter Change"
                    onClick={toggleUpdateDept}
                  />
                </>
              )}
            </div>
          ) : (
            <List position="vertical">
              <div className="inline-flex items-center">
                <ListItem label={department} subtitle="Department" />

                <div
                  className="ml-auto font-bold text-blue-900 cursor-pointer hover:underline"
                  onClick={toggleUpdateDept}
                >
                  <span>Edit</span>
                </div>
              </div>
            </List>
          )}
        </div>

        <hr />

        <div className="flex flex-col space-y-5">
          <span className="text-md font-bold text-gray-500">AGE</span>
          <Input
            label="Age"
            id="age"
            name="age"
            type="number"
            value={age}
            min={4}
            onChange={(e) => {
              setAge(e.target.value);
            }}
            error={age === ""}
            required
          />
        </div>

        <hr />

        <div className="flex flex-col space-y-5">
          <span className="text-md font-bold text-gray-500">CONTACT</span>

          <div>
            <Input
              label="Contact Number"
              id="contactNumber"
              name="contactNumber"
              type="text"
              value={number}
              minLength={11}
              maxLength={11}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              pattern="[0-9]+"
              error={number === ""}
              required
            />

            <Input
              label="Local Address"
              id="address"
              name="address"
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              error={address === ""}
              required
            />
          </div>

          <hr />

          <div className="flex flex-col space-y-5">
            <span className="text-md font-bold text-gray-500">
              CHANGE PASSWORD
            </span>

            <div className="flex flex-col">
              <div>
                <Input
                  label="Enter your Old Password"
                  id="oldPassword"
                  name="oldPassword"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                  error={error}
                />
              </div>

              <div>
                <Input
                  label="Enter your New Password"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  error={error}
                />

                <Input
                  label="Confirm your New Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  error={error}
                />

                <span className="px-2 text-red-600">{errorMessage}</span>
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

        <br />

        <Button
          className="bg-blue-900 text-white rounded"
          label="Save Changes"
          type="submit"
          loading={isLoading}
        />
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
