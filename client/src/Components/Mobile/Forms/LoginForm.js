import React, { useState } from "react";
import classnames from "classnames";

const LoginForm = ({
  username = "",
  password = "",
  loading = false,
  userOnChange = () => {},
  pwdOnChange = () => {},
  err,
  handleSubmit,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="text-base">
      <form className="component-form" onSubmit={handleSubmit}>
        <div>
          <input
            className={classnames(
              "component-input",
              err ? "border-red-600" : "border-gray-300"
            )}
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Enter your email address"
            onChange={userOnChange}
            required
          />
        </div>

        <div>
          <input
            className={classnames(
              "component-input",
              err ? "border-red-600" : "border-gray-300"
            )}
            type={isChecked ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            minLength="6"
            onChange={pwdOnChange}
            required
          />
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

        <div>
          <button className="component-button-blue" type="submit">
            Log In
          </button>
        </div>

        <div>
          <p className="text-center">
            <a className="p-2 rounded-lg hover:bg-gray-100" href="#">
              Forgot password?
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
