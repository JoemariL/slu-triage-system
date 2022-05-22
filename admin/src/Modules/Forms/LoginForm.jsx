import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { VscEyeClosed, VscEye } from "react-icons/vsc";

import useAuth from "../../hooks/useAuth";
import { login } from "../../actions/authActions";

import { Input, Button } from "../../Components/common";

const LoginForm = () => {
  const navigate = useNavigate();
  const isMounted = useRef(false);

  const { setAuth } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isMounted.current = true;
    const response = await login(username, password);

    if (response.hasOwnProperty("message")) {
      alert(response?.message);
    } else {
      setAuth({ access: response });
      navigate("/main", { replace: true });
      window.location.reload();
    }
    isMounted.current = false;
  };

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <Input
          label="Username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <Input
          label="Password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          iconRight={
            <button type="button" onClick={toggleShowPassword}>
              {showPassword ? (
                <VscEye className="h-6 w-6 mr-2 text-gray-500" />
              ) : (
                <VscEyeClosed className="h-6 w-6 mr-2 text-gray-500" />
              )}
            </button>
          }
        />
      </div>

      <Button
        className="bg-blue-600 text-white w-48 float-right ... rounded"
        label="Log In"
        type="submit"
      />
    </form>
  );
};

export default LoginForm;
