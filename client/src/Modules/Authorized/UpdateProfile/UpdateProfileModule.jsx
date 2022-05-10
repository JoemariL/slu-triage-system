import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import {
  Select,
  Input,
  Button,
  Checkbox,
  List,
  ListItem,
} from "../../../Components/commons";
import {
  getUserData,
  updateProfile,
  updatePassword,
} from "../../../actions/userActions";

const studentDept = [
  "SAMCIS",
  "SAS",
  "SEA",
  "SNS",
  "SOL",
  "SOM",
  "SON",
  "STELA",
];
const employeeDept = [
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

const UpdateProfileModule = ({ onSuccess = () => {} }) => {
  const [updateDept, setUpdateDept] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  const [department, setDepartment] = useState("");
  const [age, setAge] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        onSuccess();
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
        onSuccess();
      }
    }
  };

  const toggleUpdateDept = () => {
    setUpdateDept(!updateDept);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
          <span className="text-md font-bold text-gray-500">DEPARTMENT</span>
          {updateDept ? (
            <div className="space-y-5">
              {user.user_type === "STUDENT" && (
                <>
                  <Select
                    name="department"
                    asFormInput
                    items={studentDept}
                    subtitle="Select your new department here to update."
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                  <Button
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
                    items={employeeDept}
                    subtitle="Select your new office here to update."
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                  <Button
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
            id="age"
            name="age"
            type="text"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
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
              onChange={(e) => {
                setNumber(e.target.value);
              }}
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

        <Button label="Save Changes" type="submit" loading={isLoading} />
      </form>
    </div>
  );
};

export default UpdateProfileModule;
