export const AdminFormInitialState = {
  username: "",
  password: "",
  confirmPassword: "",
};

export const AdminFormValidations = [
  ({ username }) =>
    isRequired(username) || { username: "Username is required." },
  ({ password }) =>
    isRequired(password) || { password: "Password is required." },
  ({ password, confirmPassword }) =>
    isSamePassword(password, confirmPassword) || {
      confirmPassword: "Your passwords did not match. Try again.",
    },
];

const isRequired = (value) => {
  return value !== null && value.trim().length > 0;
};

const isSamePassword = (value, equalValue) => {
  return value === equalValue;
};
