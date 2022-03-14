const LoginForm = () => {
  return (
    <div>
      <form className="grid gap-16 text-base" method="post">
        <div className="flex-col">
          <label htmlFor="username">Username or ID Number</label>
          <input
            className="h-40 px-2 border-rounded border-1 border-grey focus"
            type="text"
            id="username"
            name="username"
            minLength="6"
            maxLength="16"
            placeholder="Enter Username / ID Number"
            required
          />
        </div>

        <div className="flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="h-40 px-2 border-rounded border-1 border-grey focus"
            type="password"
            id="password"
            name="password"
            minLength="6"
            maxLength="16"
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="flex-col">
          <button
            className="h-40 bg-secondary text-white border-rounded border-0 cursor-pointer hover-secondary focus"
            type="button"
          >
            Log In
          </button>
        </div>

        <div className="flex justify-center">
          <p>
            Don't have an account?&nbsp;
            <span>
              <strong>
                <a className="no-underline text-black" href="#">
                  Sign up.
                </a>
              </strong>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
