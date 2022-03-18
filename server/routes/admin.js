// LIBRARY IMPORT
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")

// MODEL IMPORT
const ADMIN = require('../models/admin')
const USERS = require('../models/users')
const SCHOOL = require('../models/school')

// UTILS IMPORT
const auth = require('../middleware/auth')
const { objectIDValidator, changePasswordInputValidator } = require('../utils/validator')
const { encryptJSON } = require('../utils/functions')

// GET ALL ADMIN INFO.
router.get("/all", async (req, res) => {
    const adminData = await ADMIN.find().select('-password')
    if(!adminData) return res.status(404).json({ errors:{ message: 'no data found' }})
    return res.status(200).json(adminData)
})

// GET SPECIFIC ADMIN.
router.get("/:adminID", async (req, res) => {
    const adminUid = req.params.adminID
    const idCheck = objectIDValidator(adminUid)
    if (!idCheck) return res.status(400).json({ errors:{ message:'invalid admin id' }})

    const admin = await ADMIN.findById(adminUid)
    if(!admin) return res.status(404).json({ errors:{ message:'admin not found' }})
    return res.status(200).json(admin)
})

// CHANGE PASSWORD FOR ADMIN.
router.patch("/update/password/:adminID", async(req, res) => {
    const adminUid = req.params.adminID
    const idCheck = objectIDValidator(adminUid)
    if (!idCheck) return res.status(400).json({ errors:{ message:'invalid admin id '}})

    const inputUsername = (req.body.username === undefined) ? null : req.body.username
    const inputOldPassword = (req.body.oldPassword === undefined) ? null : req.body.oldPassword 
    const inputNewPassword = (req.body.newPassword === undefined) ? null : req.body.newPassword
    const inputConfirmNewPassword = (req.body.confirmNewPassword === undefined) ? null : req.body.confirmNewPassword

    const { errors, valid } = changePasswordInputValidator(inputUsername, inputOldPassword, inputNewPassword, inputConfirmNewPassword) 
    if(!valid) return res.status(400).json({errors})
    
    const admin = await ADMIN.findOne({ username: inputUsername })
    if(!admin) return res.status(404).json({ errors:{ message:'admin not found' }})
    if(admin._id != adminUid) return res.status(400).json({ errors:{ message:'admin info mismatch' }})

    const isMatch = await bcrypt.compare(inputOldPassword, admin.password)
    if(!isMatch) return res.status(200).json({ errors:{ message:'password not match' }})

    const samePassword = await bcrypt.compare(inputNewPassword, admin.password)
    if(samePassword) return res.status(200).json({ errors:{ message:'new password can\'t be the same password' }})

    const hashedPassword = await bcrypt.hash(inputNewPassword, 12)
    const password = await bcrypt.compare(inputConfirmNewPassword, hashedPassword)
    if(!password) return res.status(200).json({ errors:{ message:'password and confirm password not match' }})

    const updatedAdmin = await ADMIN.findOneAndUpdate({ _id: admin._id }, { password: hashedPassword }, { new: true })
    if(updatedAdmin) return res.status(200).json({ success:{ message:'change password success!'}})
    return res.status(200).json({ errors:{ message:'change password error!'}})
    
})

// UPDATES ADMIN INFO.
router.patch("/update/:adminID", async(req, res) => {
    const adminUid = req.params.adminID 
    const idCheck = objectIDValidator(adminUid)
    if (!idCheck) return res.status(200).json({ errors:{ message:'invalid admin id' }})

    const admin = await ADMIN.findById(adminUid)
    if(!admin) return res.status(404).json({ errors:{ message:'admin not found' }})
    return res.status(200).json(admin)
})

// DELETES ADMIN.
router.delete("/delete/:adminID", async(req, res) => {
    const adminUid = req.params.adminID
    const idCheck = objectIDValidator(adminUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid admin id' }})

    const admin = await ADMIN.findById(adminUid)
    if(!admin) return res.status(404).json({ errors:{ message:'admin not found' }})

    const deleteAdmin = await ADMIN.deleteOne({ _id: admin._id })
    if(deleteAdmin) return res.status(200).json({ success:{ message:'admin deleted' }})
    return res.status(200).json({ errors:{ message:'admin deletion error'}})
})

// DELETES USER.
router.delete("/deleteUser/:userID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors:{ message:'invalid user ID' }})

    const inputUser = (req.body.idNumber === undefined) ? req.body.username : req.body.idNumber

    const user = await USERS.findById(userUid)
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
    if(user.id_number != inputUser && user.username != inputUser) return res.status(400).json({ errors:{ message:'user info mismatch' }})

    const deleteUser = await USERS.deleteOne({ _id: user._id })
    if(deleteUser) return res.status(200).json({ success:{ message:'user deleted' }})
    return res.status(400).json({ errors:{ message:'user deletion error' }})
})

// GET LIST OF QR CODES.
router.get("/get/qr", async (req, res) => {
    const qrData = await SCHOOL.find()
    if(!qrData) return res.status(404).json({ errors:{ message: 'no data found' }})
    return res.status(200).json(qrData)
})

// ADD LIST FOR QR CODE GENERATION.
router.post("/generate/", async (req, res) => {
    const inputSchoolDetails = (req.body.school === undefined) ? null : req.body.school
    const inputGateDetails = (req.body.gate === undefined) ? null : req.body.gate

    if(inputSchoolDetails === null) return res.status(400).json({ errors:{ message:'school information must be defined' }})
    if(inputGateDetails === null) return res.status(400).json({ errors:{ message:'gate information must be defined' }})

    let concat = `${inputSchoolDetails} ${inputGateDetails}`
    let matches = concat.match(/\b(\w)/g)
    let qrData = matches.join('')

    let payload = {school: inputSchoolDetails, gate: inputGateDetails, raw_code: qrData}
    let encrypt = encryptJSON(payload)

    const check = await SCHOOL.find({ raw_code: qrData })
    if(check.length !== 0) return res.status(400).json({ errors: { message:'gate details already exist' }})

    const newData = new SCHOOL({
        school: inputSchoolDetails,
        gate: inputGateDetails,
        raw_code: qrData,
        generated_code: encrypt
    })

    await newData.save()
    .then(() => {
        return res.status(201).json({ success:{ message:'school details updated' }})
    })
    .catch(() => {
        return res.status(400).json({ errors:{ message:'school details failed to update' }})
    })
})

module.exports = router