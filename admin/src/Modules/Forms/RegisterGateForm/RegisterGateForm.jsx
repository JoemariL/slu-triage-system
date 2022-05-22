import React, { useState } from "react";

import { addSchoolGate } from "../../../actions/adminActions";

import { Button, Input } from "../../../Components/common";

const RegisterGateForm = ({ ID, CLOSE_ON_SUBMIT = () => {} }) => {
  const [gate, setGate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await addSchoolGate(ID, gate);

    if (response.hasOwnProperty("message")) {
      alert("Something went wrong!");
      setIsLoading(false);
    } else {
      alert("GATE REGISTERED!");
      setIsLoading(false);
      CLOSE_ON_SUBMIT();
    }
  };

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      <Input
        label="Enter the name of the gate"
        type="text"
        placeholder="Gate Name"
        required
        value={gate}
        onChange={(e) => setGate(e.target.value)}
      />

      <div>
        <Button
          className="bg-blue-600 text-white w-full ... rounded"
          label="Register Gate"
          type="submit"
          loading={isLoading}
        />
      </div>
    </form>
  );
};

export default RegisterGateForm;
