const RegisterForm = () => {
  return (
    <div className="text-base">
      <div className="mb-14">
        <label htmlFor="type">
          <strong>What are you?</strong>
        </label>
        <select
          className="w-full h-9 px-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-800"
          name="type"
          id="type"
          required
        >
          <option value="student">Student</option>
          <option value="employee">Employee</option>
          <option value="visitor">Visitor</option>
        </select>
      </div>

      <div className="grid grid-rows-auto gap-6">
        <div>
          <input
            className="w-full h-9 px-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-800"
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
            className="w-full h-9 px-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-800"
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
            className="w-full h-9 px-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-800"
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
            className="mb-0 mt-4 w-full h-9 rounded bg-blue-800 text-white focus:outline-none hover:bg-blue-700"
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
