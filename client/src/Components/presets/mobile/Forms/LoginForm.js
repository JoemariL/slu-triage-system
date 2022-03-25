import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Input, Button } from "../../../commons";
import classnames from "classnames";

const LoginForm = ({
  className = "",
  emailAddress,
  password,
  emailOnChange = () => {},
  pwdOnChange = () => {},
  handleSubmit = () => {},
  error,
  loading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const clickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={classnames("text-base", className)}>
      <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
        <div>
          <Input
            inputOutStyle="rounded focus-within:border-blue-800"
            inputInStyle="h-12"
            placeholder="Enter your email address"
            id="emailAddress"
            name="emailAddres"
            value={emailAddress}
            type={"email"}
            required
            onChange={emailOnChange}
          />
          <Input
            inputOutStyle="rounded focus-within:border-blue-800"
            inputInStyle="h-12"
            placeholder="Enter your password"
            id="password"
            name="password"
            value={password}
            type={showPassword ? "text" : "password"}
            required
            onChange={pwdOnChange}
            iconRight={
              <button type="button" onClick={clickShowPassword}>
                {showPassword ? (
                  <BsFillEyeFill className="h-5 w-5 mr-2 text-gray-500" />
                ) : (
                  <BsFillEyeSlashFill className="h-5 w-5 mr-2 text-gray-500" />
                )}
              </button>
            }
          />
          <span>
            <a className="text-blue-800" href="#">
              <strong>Forgot password?</strong>
            </a>
          </span>
        </div>

        <div className="flex flex-col space-y-3">
          <Button
            buttonStyle="h-12 rounded text-white bg-blue-900 hover:bg-blue-800"
            label="Log In"
            type={"submit"}
          />
          <Button
            buttonStyle="h-12 rounded border-2 border-blue-900 text-blue-900 bg-white hover:border-blue-800 hover:text-blue-800"
            label="Register"
            type="button"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
