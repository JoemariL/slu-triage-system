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
  return (
    <div className="text-base">
      <form
        className="grid grid-rows-auto gap-5 text-center"
        onSubmit={handleSubmit}
      >
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
            placeholder="Enter ID/username"
            minLength="6"
            maxLength="16"
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
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter password"
            minLength="6"
            maxLength="16"
            onChange={pwdOnChange}
            required
          />
        </div>

        <div>
          <button className="component-button" type="submit">
            Log In
          </button>
        </div>

        <div>
          <p>
            <a className="component-anchor" href="#">
              Forgot password?
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
