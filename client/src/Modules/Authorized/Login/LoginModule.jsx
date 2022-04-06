import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { login } from "../../../actions/authActions";
import { Input, Button } from "../../../Components/commons";

const LoginModule = () => {
  // const navigate = useNavigate();

  const { setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);

    // TODO: SUCCESS, ERROR, LOADING.
    if (response.hasOwnProperty("message")) console.log(response.message);
    if (response) {
      setAuth({ access: response });
      // navigate("/application", { replace: true });
    }  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <Input
            placeholder="Enter your Email Address"
            id="emailAddress"
            name="emailAddres"
            type="email"
            onChange={handleEmail}
            required
          />

          <Input
            placeholder="Enter your Password"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            iconRight={
              <span
                className="font-bold cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            }
            onChange={handlePassword}
            required
          />
        </div>

        <Button label="Log In" type="submit" />
      </form>
    </>
  );
};

export default LoginModule;
