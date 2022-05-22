import React, { useState } from "react";
import useForm from "../../../hooks/useForrm";
import { register } from "../../../actions/authActions";
import { AdminFormInitialState, AdminFormValidations } from "./admin_form";
import { Button, Checkbox, Input } from "../../../Components/common";

const AdminForm = () => {
  const {
    changeHandler,
    formValues,
    setFormErrors,
    formErrors,
    isFormValid,
    inputTouched,
  } = useForm(AdminFormInitialState, AdminFormValidations);

  const [isPending, setIsPending] = useState(() => {
    return false;
  });

  const [showPassword, setShowPassword] = useState(() => {
    return false;
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true);

    let { username, password } = formValues;
    const response = await register(username, password);

    if (response.hasOwnProperty("message")) {
      setFormErrors({ username: response?.message });
      setIsPending(false);
    } else {
      alert("Admin was registered successfully!");
      setIsPending(false);
      window.location.reload();
    }
  };

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <Input
            id="username"
            name="username"
            label="Enter your Username"
            type="text"
            placeholder="Username"
            onChange={changeHandler}
            error={inputTouched.username && formErrors.username}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="">
              <Input
                id="password"
                name="password"
                label="Enter your Password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={changeHandler}
                error={inputTouched.password && formErrors.password}
                required
              />
            </div>

            <div className="">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm your Password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={changeHandler}
                error={
                  inputTouched.confirmPassword && formErrors.confirmPassword
                }
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-rows-2 grid-cols-2 gap-5 ">
          <div className="col-span-2">
            <Checkbox
              label="Show password"
              name="visiblePassword"
              id="visiblePassword"
              onChange={toggleShowPassword}
            />
          </div>

          <div className="col-start-2">
            <Button
              className="bg-blue-600 text-white w-48 float-right ... rounded"
              label="REGISTER ADMIN"
              type="submit"
              loading={isPending}
              disabled={!isFormValid}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminForm;
