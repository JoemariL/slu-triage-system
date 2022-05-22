import React, { useState } from "react";

import { addSchool } from "../../../actions/adminActions";

import { Button, Input } from "../../../Components/common";

const RegisterCampusForm = ({ CLOSE_ON_SUBMIT = () => {} }) => {
  const [campus, setCampus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await addSchool(campus);

    if (response.hasOwnProperty("message")) {
      alert("Something went wrong.");
      setIsLoading(false);
    } else {
      alert("CAMPUS REGISTERED!");
      setIsLoading(false);
      CLOSE_ON_SUBMIT();
    }
  };

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      <Input
        label="Enter the name of the campus"
        type="text"
        placeholder="Campus Name"
        required
        value={campus}
        onChange={(e) => {
          setCampus(e.target.value);
        }}
      />

      <div>
        <Button
          className="bg-blue-600 text-white w-full ... rounded"
          label="Register Campus"
          type="submit"
          loading={isLoading}
        />
      </div>
    </form>
  );
};

export default RegisterCampusForm;
