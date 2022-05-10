export const RegisterFormInitialState = {
  userType: "STUDENT",
  department: "SAMCIS",
  firstName: "",
  lastName: "",
  age: "",
  contactNumber: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterFormValidations = [
  ({ firstName }) =>
    isRequired(firstName) || { firstName: "First name is required." },
  ({ lastName }) =>
    isRequired(lastName) || { lastName: "Last name is required." },
  ({ age }) => isRequired(age) || { age: "Age is required" },
  ({ age }) => isValidNumber(age) && { age: "The age you entered is invalid." },
  ({ age }) =>
    isValidAge(age) && {
      age: "You should be at least 5 years old to register.",
    },
  ({ contactNumber }) =>
    isRequired(contactNumber) || {
      contactNumber: "Contact number is required.",
    },
  ({ address }) =>
    isRequired(address) || { address: "Local address is required." },
  ({ email }) => isRequired(email) || { email: "Email address is required." },
  ({ userType, email }) =>
    isValidEmail(userType, email) && {
      email:
        "The email you entered is invalid. Please use the university email: (@slu.edu.ph). If you are a STUDENT, use your ID NUMBER.",
    },
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

const isValidNumber = (value) => {
  const pattern = /^[0-9 -]+$/;
  if (value) return !pattern.test(value);
};

const isValidAge = (value) => {
  return value < 5;
};

const isValidEmail = (userType, value) => {
  const pattern =
    userType === "EMPLOYEE"
      ? /^[a-zA-Z0-9.]+@slu\.edu.ph$/
      : /^([0-9]{6,7})+@slu\.edu.ph$/;
  if (value) return !pattern.test(value);
};

const isSamePassword = (value, equalValue) => {
  return value === equalValue;
};
