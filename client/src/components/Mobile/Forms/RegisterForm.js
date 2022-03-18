const RegisterForm = () => {
  return (
    <div className="text-base">
      <div className="grid grid-rows-auto gap-6">
        <div>
          <input
            className="w-full h-10 px-2 border-2 rounded border-gray-300 focus:outline-none focus:border-blue-700"
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
            className="w-full h-10 px-2 border-2 rounded border-gray-300 focus:outline-none focus:border-blue-700"
            type="text"
            id="username"
            name="username"
            placeholder="Enter your password"
            minLength="6"
            maxLength="16"
            required
          />
        </div>
        <div>
          <input
            className="w-full h-10 px-2 border-2 rounded border-gray-300 focus:outline-none focus:border-blue-700"
            type="text"
            id="username"
            name="username"
            placeholder="Confirm your password"
            minLength="6"
            maxLength="16"
            required
          />
        </div>
        <div>
          <button
            className="mb-0 mt-4 w-full h-10 rounded bg-blue-800 text-white focus:outline-none hover:bg-blue-700"
            type="button"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
