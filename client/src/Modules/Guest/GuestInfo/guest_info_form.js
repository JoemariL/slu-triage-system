export const VisitorFormInitialState = {
  first_name: "",
  last_name: "",
  age: "",
  contact_number: "",
  home_address: "",
};

export const VisitorFormValidations = [
  ({ first_name }) =>
    isRequired(first_name) || { first_name: "First name is required." },
  ({ last_name }) =>
    isRequired(last_name) || { last_name: "Last name is required." },
  ({ age }) => isRequired(age) || { age: "Age is required" },
  ({ age }) =>
    isValidAge(age) && {
      age: "You should be at least 5 years old to register.",
    },
  ({ age }) => isValidNumber(age) && { age: "The age you entered is invalid." },
  ({ contact_number }) =>
    isRequired(contact_number) || {
      contact_number: "Contact number is required.",
    },
  // ({ contact_number }) =>
  //   isValidContactNumber(contact_number) || {
  //     contact_number: "The contact number should be 11-digits.",
  //   },
  ({ home_address }) =>
    isRequired(home_address) || { home_address: "Local address is required." },
];

const isRequired = (value) => {
  return value != null && value.trim().length > 0;
};

const isValidAge = (value) => {
  return value < 5;
};

// const isValidContactNumber = (value) => {
//   return value <= 11;
// };

const isValidNumber = (value) => {
  const pattern = /^[0-9 -]+$/;
  if (value) return !pattern.test(value);
};
