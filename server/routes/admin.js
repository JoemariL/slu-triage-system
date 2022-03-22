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
const { objectIDValidator, changePasswordInputValidator } = require('../utils/validator')
const { encryptJSON } = require('../utils/functions')

// GET ALL ADMIN INFO.
router.get("/all", async (req, res) => {
    try {
        const adminData = await ADMIN.find().select('-password')
        if(!adminData) return res.status(404).json({ errors:{ message: 'no data found' }})
        return res.status(200).json(adminData)
    } catch (error) {
        return res.sendStatus(500)
    }
})

// GET SPECIFIC ADMIN.
router.get("/:adminID", async (req, res) => {
    const adminUid = req.params.adminID
    const idCheck = objectIDValidator(adminUid)
    if (!idCheck) return res.status(400).json({ errors:{ message:'invalid admin id' }})

    try {
        const admin = await ADMIN.findById(adminUid)
        if(!admin) return res.status(404).json({ errors:{ message:'admin not found' }})
        return res.status(200).json(admin)
    } catch (error) {
        return res.sendStatus(500)
    }
})

// CHANGE PASSWORD FOR ADMIN.
router.patch("/update/password/:adminID", async(req, res) => {
    const adminUid = req.params.adminID
    const idCheck = objectIDValidator(adminUid)
    if (!idCheck) return res.status(400).json({ errors:{ message:'invalid admin id '}})

    const { oldPassword, newPassword, confirmNewPassword } = req.body

    const admin = await ADMIN.findById(adminUid)
    if(!admin) return res.status(404).json({ errors:{ message:'admin not found' }})

    const isMatch = await bcrypt.compare(oldPassword, admin.password)
    if(!isMatch) return res.status(400).json({ errors:{ message:'password not match' }})

    const samePassword = await bcrypt.compare(newPassword, admin.password)
    if(samePassword) return res.status(400).json({ errors:{ message:'new password can\'t be the same password' }})

    const hashedPassword = await bcrypt.hash(newPassword, 12)
    const password = await bcrypt.compare(confirmNewPassword, hashedPassword)
    if(!password) return res.status(400).json({ errors:{ message:'password and confirm password not match' }})

    try {
        const updatedAdmin = await ADMIN.findOneAndUpdate({ _id: admin._id }, { password: hashedPassword }, { new: true })
        if(updatedAdmin) return res.status(200).json({ success:{ message:'change password success!'}})
        return res.status(400).json({ errors:{ message:'change password error!'}})
    } catch (error) {
        return res.sendStatus(500)   
    }
})

// DELETES ADMIN.
router.delete("/delete/:adminID", async(req, res) => {
    const adminUid = req.params.adminID
    const idCheck = objectIDValidator(adminUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid admin id' }})

    const admin = await ADMIN.findById(adminUid)
    if(!admin) return res.status(404).json({ errors:{ message:'admin not found' }})

    try {
        const deleteAdmin = await ADMIN.deleteOne({ _id: admin._id })
        if(deleteAdmin) return res.status(200).json({ success:{ message:'admin deleted' }})
        return res.status(200).json({ errors:{ message:'admin deletion error'}})
    } catch (error) {
        return res.sendStatus(500)
    }
   
})

// DELETES USER.
router.delete("/deleteUser/:userID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors:{ message:'invalid user ID' }})

    const user = await USERS.findById(userUid)
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    try {
        const deleteUser = await USERS.deleteOne({ _id: user._id })
        if(deleteUser) return res.status(200).json({ success:{ message:'user deleted' }})
        return res.status(400).json({ errors:{ message:'user deletion error' }})
    } catch (error) {
        return res.sendStatus(500)
    }
})

// GET LIST OF QR CODES.
router.get("/get/qr", async (req, res) => {
    try {
        const qrData = await SCHOOL.find()
        if(!qrData) return res.status(404).json({ errors:{ message: 'no data found' }})
        return res.status(200).json(qrData)
    } catch (error) {
        return res.sendStatus(500)
    }
})

// ADD LIST FOR QR CODE GENERATION.
router.post("/generate/", async (req, res) => {
    const { school, gate } = req.body
   
    let concat = `${school} ${gate}`
    let matches = concat.match(/\b(\w)/g)
    let qrData = matches.join('')

    let payload = {school, gate, raw_code: qrData}
    let encrypt = encryptJSON(payload)

    const check = await SCHOOL.find({ raw_code: qrData })
    if(check.length !== 0) return res.status(400).json({ errors: { message:'gate details already exist' }})

    try {
        const newData = new SCHOOL({
            school,
            gate,
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
    } catch (error) {
        return res.sendStatus(500)
    }
})

module.exports = router