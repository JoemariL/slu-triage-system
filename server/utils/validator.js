// LIBRARY IMPORTS
const ObjectId = require("mongoose").Types.ObjectId;

// CHECKS THE INPUT IF ID IS VALID.
module.exports.objectIDValidator = (id) => {
    if (ObjectId.isValid(id)) {
        if (String(new ObjectId(id)) === id) return true;
        return false;
    }
}

// CHECKS THE EMAIL FORMAT
module.exports.emailValidator = (email) => {
    const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regex)) return true
    return false
}


module.exports.changePasswordInputValidator = (username, oldPassword, newPassword, confirmPassword) => {
    const errors = {}
    if (username === null || username.trim() === "") errors.inputUsername = "input field must not be empty."
    if (oldPassword === "" || oldPassword === null || newPassword === "" || newPassword === null || confirmPassword === "" || confirmPassword === null)
        errors.inputPassword = "password field must not be empty"

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.loginInputValidator = (username, password) => {
    const errors = {}
    if (username === undefined || username === null || username.trim() === "") errors.inputUsername = "input field must not be empty"
    if (password === undefined || password === null || password === "") errors.inputPassword = "password field must not be empty"

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.userRegistrationValidator = (
    firstName,
    lastName,
    idNumber,
    password,
    age,
    contactNumber,
    homeAddress,
    emailAddress,
) => {
    const errors = {}
    if (firstName === undefined || firstName === null) errors.inputFirstName = "first name field must not be empty"
    if (lastName === undefined || lastName === null) errors.inputLastName = "last name field must not be empty"
    if (idNumber === undefined || idNumber === null || idNumber.trim() === "") errors.inputIDnumber = "id number field must not be empty"
    if (password === undefined || password === null) errors.inputPassword = "password field must not be empty"
    if (age === undefined || age === null || age.trim() === "") errors.inputAge = "age field must not be empty"
    if (contactNumber === undefined || contactNumber === null || contactNumber.trim() === "") errors.inputContactNumber = "contact field number must not be empty"
    if (homeAddress === undefined || homeAddress === null || homeAddress.trim() === "") errors.inputHomeAddress = "home address field must not be empty"
    if (emailAddress === undefined || emailAddress === null || emailAddress.trim() === "") errors.inputEmail = "email field must not be empty"

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.userEditValidator = (
    firstName,
    lastName,
    age,
    contactNumber,
    homeAddress,
    email
) => {
    const errors = {}
    if (firstName === undefined || firstName === null) errors.inputFirstName = "first name field must not be empty"
    if (lastName === undefined || lastName === null) errors.inputLastName = "last name field must not be empty"
    if (age === undefined || age === null || age.trim() === "") errors.inputAge = "age field must not be empty"
    if (contactNumber === undefined || contactNumber === null || contactNumber.trim() === "") errors.inputContactNumber = "contact field number must not be empty"
    if (homeAddress === undefined || homeAddress === null || homeAddress.trim() === "") errors.inputHomeAddress = "home address field must not be empty"
    if (email === undefined || email === null || email.trim() === "") errors.inputEmail = "email field must not be empty"

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.hdfInputValidator = (
    exposure,
    positive,
    fever,
    cough,
    cold,
    soreThroat,
    diffBreathing,
    diarrhea
) => {
    const errors = {}
    if (exposure === null || positive === null || fever === null || cough === null || cold === null || soreThroat === null || diffBreathing === null || diarrhea === null) errors.inputFields = "fields must not be empty"
    if (typeof (exposure) != "boolean" || typeof (positive) != "boolean" || typeof (fever) != "boolean" || typeof (cough) != "boolean" || typeof (cold) != "boolean" || typeof (soreThroat) != "boolean" || typeof (diffBreathing) != "boolean" || typeof (diarrhea) != "boolean") errors.inputBoolean = "input must be a boolean"

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}