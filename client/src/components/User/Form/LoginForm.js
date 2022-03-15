const LoginForm = () => {
  return (
    <div>
      <form className="grid gap-32 text-base" method="post">
        <div className="flex-col">
          <input
            className="component-input focus"
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
          <input
            className="component-input focus"
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
            className="component-button-primary"
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
