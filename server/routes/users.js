// LIBRARY IMPORT
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

// MODEL IMPORT
const USERS = require('../models/users')

// UTILS IMPORT
const { objectIDValidator } = require('../utils/validator')
const { getUserDetails } = require('../utils/pipelines')
const { extractID } = require('../middleware/jwt-helper')

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
router.get("/get", async (req, res) => {
    
    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const userUid = await extractID(req.cookies.accessToken)
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
router.patch("/password", async (req, res) => {

    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const userUid = await extractID(req.cookies.accessToken)
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
router.patch("/update", async (req, res) => {

    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const userUid = await extractID(req.cookies.accessToken)
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const { firstName, lastName, age, contactNumber, homeAddress } = req.body
    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    const userDetails = {
        first_name: firstName,
        last_name: lastName,
        age: age,
        contact_number: contactNumber,
        home_address: homeAddress,
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
        return res.sendStatus(500)
    }
})

// ADDS AND UPDATE VACCINATION RECORD OF A USER.
router.post("/vaccination", async (req, res) => {

    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const userUid = await extractID(req.cookies.accessToken)
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const { vaccineStatus, vaccineName, vaccineSerial } = req.body

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    const vaccineData = {
        vaccine_status: vaccineStatus,
        vaccine_name: vaccineName,
        vaccine_serial_no: vaccineSerial,
    }
    const uid = user._id
    try {
        const newVaccineData = await USERS.findByIdAndUpdate(
            uid,
            { $set: { "vaccination_details" : [vaccineData] }},
            { new: true }
        )
        if(newVaccineData) return res.status(201).json({ success: { message:'user vaccination details added'}})
        return res.status(400).json({ errors:{ message:'user vaccination details failed' }})
    } catch (error) {
        return res.sendStatus(500)
    }
})

// DELETES VACCINE RECORD OF A USER.
router.delete("/vaccination", async (req, res) => {

    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const userUid = await extractID(req.cookies.accessToken)
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
    
    const uid = user._id
    try {
        const removedVaccineData = await USERS.findByIdAndUpdate(
            uid,
            {
                $pull : {
                    vaccination_details: {}
                }
            },
            { "multi": true }
        )
        if(removedVaccineData) return res.status(201).json({ success: { message: 'user vaccination details deleted'}})
        return res.status(400).json({ errors:{ message:'user vaccination detail failed to delete' }})
    } catch (error) {
        return res.sendStatus(500)
    }
})


module.exports = router;