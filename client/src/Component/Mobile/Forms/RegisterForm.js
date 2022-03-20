import classnames from "classnames";

const RegisterForm = (err) => {
  return (
    <div className="text-base">
      <form className="grid grid-rows-auto gap-5 text-center">
        <div>
          <input
            className={classnames(
              "component-input",
              err ? "border-red-600" : "border-gray-300"
            )}
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            minLength="6"
            maxLength="16"
            required
          />
        </div>
        <div>
          <input
            className={classnames(
              "component-input",
              err ? "border-red-600" : "border-gray-300"
            )}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            minLength="6"
            maxLength="16"
            required
          />
        </div>
        <div>
          <input
            className={classnames(
              "component-input",
              err ? "border-red-600" : "border-gray-300"
            )}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            minLength="6"
            maxLength="16"
            required
          />
        </div>
        <div>
          <button className="component-button" type="button">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
