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
    <div>
      <form
        className="grid grid-rows-auto gap-6 text-center text-base"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            className={classnames(
              "w-full px-2 h-10 border-2 rounded border-gray-300 focus:outline-none focus:border-blue-700",
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
              "w-full px-2 h-10 border-2 rounded border-gray-300 focus:outline-none focus:border-blue-700",
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
          <button
            className={
              "mb-0 mt-4 w-full h-10 rounded bg-blue-800 text-white focus:outline-none hover:bg-blue-700"
            }
            type="submit"
          >
            Log In
          </button>
        </div>

        <div>
          <p>
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
