// LIBRARY IMPORT
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

// MODEL IMPORT
const USERS = require('../models/users')

// UTILS IMPORT
const { objectIDValidator, emailValidator } = require('../utils/validator')
const { vaccineIfExist, getUserDetails } = require('../utils/pipelines')

// GET ALL USER INFO.
router.get("/all", async (req, res) => {
    try {
        const userData = await USERS.find().select('-password -__v -createdAt -updatedAt').sort({ "hdf_data.createdAt": -1 })
        if(!userData) return res.status(404).json({ errors:{ message: 'no data found'}})
        return res.status(200).json(userData)
    } catch (error) {
        return res.sendStatus(500)
    }
})

// GET SPECIFIC USER.
router.get("/get/:userID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    try {
        const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
        if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
        return res.status(200).json(user)
    } catch (error) {
        return res.sendStatus(500)
    }
})

// CHANGE PASSWORD FOR USER.
router.patch("/password/:userID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors:{ message:'invalid user ID' }})

    const { oldPassword, newPassword, confirmNewPassword } = req.body 

    const user = await USERS.findById(userUid)
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if(!isMatch) return res.status(400).json({ errors:{ message:'password not match' }})

    const samePassword = await bcrypt.compare(newPassword, user.password)
    if(samePassword) return res.status(400).json({ errors: { message:'new password can\'t be the same password' }})

    const hashedPassword = await bcrypt.hash(newPassword, 12)
    const password = await bcrypt.compare(confirmNewPassword, hashedPassword)
    if(!password) return res.status(400).json({ errors: { message:'password and confirm password not match' }})

    try {
        const updatedUser = await USERS.findOneAndUpdate({ _id: user._id }, { password: hashedPassword}, { new: true })
        if(updatedUser) return res.status(200).json({ success: { message:'change password success!'}})
        return res.status(400).json({ errors:{ message:'change password error!' }})
    } catch (error) {
        return res.sendStatus(500)
    }
})

// UPDATES USER INFO.
router.patch("/update/:userID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const { firstName, lastName, age, contactNumber, homeAddress, emailAddress } = req.body

    const emailCheck = emailValidator(emailAddress)
    if(emailCheck) return res.status(400).json({ errors:{ message:'email input must be a valid email address' }})

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    const userDetails = {
        first_name: firstName,
        last_name: lastName,
        age: age,
        contact_number: contactNumber,
        home_address: homeAddress,
        email_address: emailAddress
    }
    const uid = user._id
    try {
        const updatedUser = await USERS.findByIdAndUpdate(
            uid,
            { $set: userDetails },
            { new: true}
        )
        if(updatedUser) return res.status(201).json({ success: { message:'user profile update success'}})
        return res.status(400).json({ errors:{ message:'user profile update failed' }})
    } catch (error) {
        switch(error.codeName){
            case 'DuplicateKey': 
                return res.status(400).json({ errors:{ message:'email already taken'}})
            default:  
                return res.sendStatus(500)  
        }
    }
})

// ADDS VACCINATION RECORD OF A USER.
router.post("/vaccination/:userID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const { vaccineStatus, vaccineName, vaccineSerial } = req.body

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    const vaccineData = {
        vaccine_status: vaccineStatus,
        vaccine_name: vaccineName,
        vaccine_serial_no: vaccineSerial
    }
    const uid = user._id
    try {
        const newVaccineData = await USERS.findByIdAndUpdate(
            uid,
            { $push: { "vaccination_details" : vaccineData }},
            { new: true }
        )
        if(newVaccineData) return res.status(201).json({ success: { message:'user vaccination details added'}})
        return res.status(400).json({ errors:{ message:'user vaccination details failed' }})
    } catch (error) {
        return res.sendStatus(500)
    }
})

// UPDATES THE VACCINATION RECORD OF A USER.
router.patch("/vaccination/:userID/:vaccineID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const vacUid = req.params.vaccineID
    const vacCheck = objectIDValidator(vacUid)
    if (!vacCheck) return res.status(400).json({ errors:{ message:'invalid vaccine ID'}}) 

    const { vaccineStatus, vaccineName, vaccineSerial } = req.body

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
    
    const ifExists = await vaccineIfExist(userUid, vacUid)
    if(!ifExists) return res.status(404).json({ errors:{ message:'user vaccination details not found' }})
    
    const uid = user._id
    try {
        const newVaccineData = await USERS.findByIdAndUpdate(
            uid,
            { 
                $set: {
                    "vaccination_details.$[element].vaccine_status": vaccineStatus,
                    "vaccination_details.$[element].vaccine_name": vaccineName,
                    "vaccination_details.$[element].vaccine_serial_no": vaccineSerial,
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
    } catch (error) {
        return res.sendStatus(500)
    }
})

// DELETES VACCINE RECORD OF A USER.
router.delete("/vaccination/:userID/:vaccineID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const vacUid = req.params.vaccineID
    const vacCheck = objectIDValidator(vacUid)
    if (!vacCheck) return res.status(400).json({ errors:{ message:'invalid vaccine ID'}})

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
    
    const ifExists = await vaccineIfExist(userUid, vacUid)
    if(!ifExists) return res.status(404).json({ errors:{ message:'user vaccination details not found' }})
    
    const uid = user._id
    try {
        const removedVaccineData = await USERS.findByIdAndUpdate(
            uid,
            {
                $pull : {
                    vaccination_details: { _id: mongoose.Types.ObjectId(vacUid) }
                }
            }
        )
        if(removedVaccineData) return res.status(201).json({ success: { message: 'user vaccination details deleted'}})
        return res.status(400).json({ errors:{ message:'user vaccination detail failed to delete' }})
    } catch (error) {
        return res.sendStatus(500)
    }
})


module.exports = router;