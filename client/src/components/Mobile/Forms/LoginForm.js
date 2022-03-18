const LoginForm = () => {
  return (
    <div>
      <form className="grid grid-rows-auto gap-6 text-center text-base">
        <div>
          <input
            className="w-full px-2 h-10 border-2 rounded border-gray-300 focus:outline-none focus:border-blue-700"
            type="text"
            id="username"
            name="username"
            placeholder="Enter ID/username"
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
            placeholder="Enter password"
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
