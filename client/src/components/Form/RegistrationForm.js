const RegistrationForm = () => {
  return (
    <div>
      <form className="grid gap-32 text-base" method="post">
        <div className="flex-col">
          <label htmlFor="type">
            <strong>What are you?</strong>
          </label>
          <select
            className="component-select focus"
            name="type"
            id="type"
            required
          >
            <option value="student">Student</option>
            <option value="employee">Employee</option>
            <option value="vistor">Visitor</option>
          </select>
        </div>

        <br />

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
          <input
            className="component-input focus"
            type="password"
            id="confpassword"
            name="confpassword"
            minLength="6"
            maxLength="16"
            placeholder="Confirm Password"
            required
          />
        </div>

        <div className="flex-col">
          <button className="component-button-primary" type="button">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
