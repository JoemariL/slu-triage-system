import classnames from "classnames";

const RegisterForm = (err) => {
  return (
    <div className="text-base">
      <form className="grid grid-rows-auto gap-5 text-center">
        <div>
          <input
            className={classnames(
              "w-full h-10 px-2 border-2 rounded border-gray-300 focus:outline-none focus:border-blue-700",
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
              "w-full h-10 px-2 border-2 rounded border-gray-300 focus:outline-none focus:border-blue-700",
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
              "w-full h-10 px-2 border-2 rounded border-gray-300 focus:outline-none focus:border-blue-700",
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
          <button
            className="w-full h-10 mb-0 mt-4 rounded bg-blue-800 text-white focus: outline-none hover:bg-blue-700"
            type="button"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
