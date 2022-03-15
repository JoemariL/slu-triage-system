const RegistrationForm = () => {
  return (
    <div>
      <form className="grid gap-16 text-base" method="post">
        <div className="flex-col">
          <label htmlFor="type">What are you?</label>
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

        <div>
          <hr className="dashed" />
        </div>

        <div className="flex-col">
          <label htmlFor="username">Username or ID Number</label>
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
          <label htmlFor="password">Password</label>
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
          <label htmlFor="confpassword">Confirm Password</label>
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
      </form>
    </div>
  );
};

export default RegistrationForm;
