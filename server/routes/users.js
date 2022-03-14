// LIBRARY IMPORT
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

// MODEL IMPORT
const USERS = require('../models/users')

// UTILS IMPORT
const auth = require('../middleware/auth')
const { objectIDValidator, userEditValidator, changePasswordInputValidator, emailValidator } = require('../utils/validator')
const { vaccineIfExist } = require('../utils/pipelines')

// GET ALL USER INFO.
router.get("/all", async (req, res) => {
    const userData = await USERS.find().select('-password')
    // return res.json(userData.filter(data => data.id === req.user.id))

    if(userData) return res.status(200).json(userData)
    return res.status(404).json({ errors:{ message: 'no data found'}})
})

// GET SPECIFIC USER.
router.get("/get/:userID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const inputUser = (req.body.idNumber === undefined) ? req.body.username : req.body.idNumber
    if(inputUser === null || inputUser === undefined) return res.status(400).json({ errors:{ message:'provide the user details' }})

    const user = await USERS.findById(userUid).select('-password')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
    if(user.id_number != inputUser && user.username != inputUser) return res.status(400).json({ errors:{ message:'user info mismatch' }})

    return res.status(200).json(user)
})

// CHANGE PASSWORD FOR USER.
router.patch("/password/:userID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors:{ message:'invalid user ID' }})

    const inputUser = (req.body.idNumber === undefined) ? req.body.username : req.body.idNumber
    if(inputUser === null || inputUser === undefined) return res.status(400).json({ errors:{ message:'provide the user details' }})

    const inputOldPassword = (req.body.oldPassword === undefined) ? null : req.body.oldPassword 
    const inputNewPassword = (req.body.newPassword === undefined) ? null : req.body.newPassword
    const inputConfirmNewPassword = (req.body.confirmNewPassword === undefined) ? null : req.body.confirmNewPassword 

    const { errors, valid } = changePasswordInputValidator(inputUser, inputOldPassword, inputNewPassword, inputConfirmNewPassword) 
    if(!valid) return res.status(400).json({errors})

    const user = await USERS.findById(userUid)
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
    if(user.id_number != inputUser || user.username != inputUser) return res.status(400).json({ errors:{ message:'user info mismatch' }})

    const isMatch = await bcrypt.compare(inputOldPassword, user.password)
    if(!isMatch) return res.status(400).json({ errors:{ message:'password not match' }})

    const samePassword = await bcrypt.compare(inputNewPassword, user.password)
    if(samePassword) return res.status(400).json({ errors: { message:'new password can\'t be the same password' }})

    const hashedPassword = await bcrypt.hash(inputNewPassword, 12)
    const password = await bcrypt.compare(inputConfirmNewPassword, hashedPassword)
    if(!password) return res.status(400).json({ errors: { message:'password and confirm password not match' }})

    const updatedUser = await USERS.findOneAndUpdate({ _id: user._id }, { password: hashedPassword}, { new: true })
    if(updatedUser) return res.status(200).json({ success: { message:'change password success!'}})
    return res.status(400).json({ errors:{ message:'change password error!' }})
})

// UPDATES USER INFO.
router.patch("/update/:userID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const inputUser = (req.body.idNumber === undefined) ? req.body.username : req.body.idNumber
    if(inputUser === null || inputUser === undefined) return res.status(400).json({ errors:{ message:'provide the user details' }})

    let inputFirstName = (req.body.firstName === undefined) ? null : req.body.firstName
    let inputLastName = (req.body.lastName === undefined) ? null : req.body.lastName
    let inputAge = (req.body.age === undefined) ? null : req.body.age
    let inputContactNumber = (req.body.contactNumber === undefined) ? null : req.body.contactNumber 
    let inputHomeAddress = (req.body.homeAddress === undefined) ? null : req.body.homeAddress
    let inputEmailAddress = (req.body.emailAddress === undefined) ? null : req.body.emailAddress

    const emailCheck = emailValidator(inputEmailAddress)
    if(emailCheck) return res.status(400).json({ errors:{ message:'email input must be a valid email address' }})

    const { errors, valid } = userEditValidator(
        inputFirstName,
        inputLastName,
        inputAge,
        inputContactNumber,
        inputHomeAddress,
        inputEmailAddress
    )
    if(!valid) return res.status(400).json({errors})

    const user = await USERS.findById(userUid).select('-password')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
    if(user.id_number != inputUser && user.username != inputUser) return res.status(400).json({ errors:{ message:'user info mismatch' }})
    
    if(isNaN(inputAge)) return res.status(400).json({ errors:{ message:'input age must be a number'}})

    const userDetails = {
        first_name: inputFirstName,
        last_name: inputLastName,
        age: inputAge,
        contact_number: inputContactNumber,
        home_address: inputHomeAddress,
        email_address: inputEmailAddress
    }
    const uid = user._id
    const updatedUser = await USERS.findByIdAndUpdate(
        uid,
        { $set: userDetails },
        { new: true}
    )
    if(updatedUser) return res.status(201).json({ success: { message:'user profile update success'}})
    return res.status(400).json({ errors:{ message:'user profile update failed' }})
})

// ADDS VACCINATION RECORD OF A USER.
router.post("/vaccination/:userID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const inputUser = (req.body.idNumber === undefined) ? req.body.username : req.body.idNumber
    if(inputUser === null || inputUser === undefined) return res.status(400).json({ errors:{ message:'provide the user details' }})

    const inputVaccineStatus = (req.body.vaccineStatus === undefined) ? null : req.body.vaccineStatus
    const inputVaccineName = (req.body.vaccineName === undefined) ? null : req.body.vaccineName
    const inputVaccineSerial = (req.body.vaccineSerial === undefined) ? null : req.body.vaccineSerial

    const user = await USERS.findById(userUid).select('-password')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
    if(user.id_number != inputUser && user.username != inputUser) return res.status(400).json({ errors:{ message:'user info mismatch' }})

    const vaccineData = {
        vaccine_status: inputVaccineStatus,
        vaccine_name: inputVaccineName,
        vaccine_serial_no: inputVaccineSerial
    }
    const uid = user._id
    const newVaccineData = await USERS.findByIdAndUpdate(
        uid,
        { $push: { "vaccination_details" : vaccineData }},
        { new: true }
    )

    if(newVaccineData) return res.status(201).json({ success: { message:'user vaccination details added'}})
    return res.status(400).json({ errors:{ message:'user vaccination details failed' }}) 
})

// UPDATES THE VACCINATION RECORD OF A USER.
router.patch("/vaccination/:userID/:vaccineID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const vacUid = req.params.vaccineID
    const vacCheck = objectIDValidator(vacUid)
    if (!vacCheck) return res.status(400).json({ errors:{ message:'invalid vaccine ID'}}) 

    const inputUser = (req.body.idNumber === undefined) ? req.body.username : req.body.idNumber
    if(inputUser === null || inputUser === undefined) return res.status(400).json({ errors:{ message:'provide the user details' }})

    const inputVaccineStatus = (req.body.vaccineStatus === undefined) ? null : req.body.vaccineStatus
    const inputVaccineName = (req.body.vaccineName === undefined) ? null : req.body.vaccineName
    const inputVaccineSerial = (req.body.vaccineSerial === undefined) ? null : req.body.vaccineSerial

    const user = await USERS.findById(userUid).select('-password')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
    if(user.id_number != inputUser && user.username != inputUser) return res.status(400).json({ errors:{ message:'user info mismatch' }})
    
    const ifExists = await vaccineIfExist(userUid, vacUid)
    if(!ifExists) return res.status(404).json({ errors:{ message:'user vaccination details not found' }})
    
    const uid = user._id
    const newVaccineData = await USERS.findByIdAndUpdate(
        uid,
        { 
            $set: {
                "vaccination_details.$[element].vaccine_status": inputVaccineStatus,
                "vaccination_details.$[element].vaccine_name": inputVaccineName,
                "vaccination_details.$[element].vaccine_serial_no": inputVaccineSerial,
            }
        },
        { 
            arrayFilters: [
                {
                    "element._id": mongoose.Types.ObjectId(vacUid)
                }
            ]
        }
    )

    if(newVaccineData) return res.status(201).json({ success: { message:'user vaccine record updated'}})
    return res.status(400).json({ errors:{ message:'user vaccine record failed to update' }}) 

})


module.exports = router;