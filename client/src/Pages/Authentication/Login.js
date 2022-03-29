import React, { useState } from "react";
import classnames from "classnames";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Input, Button } from "../../Components/commons";

const Login = ({
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
    <div className={classnames(className)}>
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
            onChange={emailOnChange}
            required
          />
          <Input
            inputOutStyle="rounded focus-within:border-blue-800"
            inputInStyle="h-12"
            placeholder="Enter your password"
            id="password"
            name="password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={pwdOnChange}
            required
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

        <div>
          <Button
            buttonStyle="h-12 rounded bg-blue-900 text-white hover:bg-blue-800"
            label="Log In"
            type={"submit"}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
