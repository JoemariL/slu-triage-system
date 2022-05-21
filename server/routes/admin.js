// LIBRARY IMPORT
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")
const moment = require('moment-timezone')

// MODEL IMPORT
const ADMIN = require('../models/admin')
const USERS = require('../models/users')
const STATISTICS = require('../models/statistics')

// UTILS IMPORT
const { objectIDValidator } = require('../utils/validator')
const { countDepartments } = require('../utils/functions')
const { extractID } = require('../middleware/jwt-helper')
const { getAllUsers, getHdfStatistics, getAllAdmin } = require('../utils/pipelines')

const adminAuth = require('../middleware/adminAuth')

// GET ALL ADMIN INFO.
router.get("/get-all-admin", adminAuth, async (req, res) => {
    try {
        const adminData = await getAllAdmin()
        if(!adminData) return res.status(404).json({ errors:{ message: 'no data found' }})
        return res.status(200).json(adminData)
    } catch (error) {
        return res.sendStatus(500)
    }
})

// GET ALL USERS
router.get("/get-all-users", adminAuth, async (req, res) => {
    try {
        const userData = await getAllUsers();
        if(!userData) return res.status(404).json({ errors:{ message: 'no data found'}})
        return res.status(200).json(userData)
    } catch (error) {
        return res.sendStatus(500)
    }
})

// GET SPECIFIC ADMIN.
router.get("/get", adminAuth, async (req, res) => {
    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const adminUid = await extractID(req.cookies.accessToken)
    const idCheck = objectIDValidator(adminUid).select('-password -__v -createdAt -updatedAt')
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
router.patch("/update/password", adminAuth, async(req, res) => {

    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const adminUid = await extractID(req.cookies.accessToken)
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
router.delete("/delete/:adminID", adminAuth, async(req, res) => {
    const adminUid = req.params.adminID
    const idCheck = objectIDValidator(adminUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid admin id' }})

    const admin = await ADMIN.findById(adminUid)
    if(!admin) return res.status(404).json({ errors:{ message:'admin not found' }})
    if(admin.role === "SUPER-ADMIN") return res.status(403).json({ errors: { message: 'Action not allowed.' }})

    try {
        const deleteAdmin = await ADMIN.deleteOne({ _id: admin._id })
        if(deleteAdmin) return res.status(200).json({ success:{ message:'admin deleted' }})
        return res.status(200).json({ errors:{ message:'admin deletion error'}})
    } catch (error) {
        return res.sendStatus(500)
    }

})

// DELETES USER.
router.delete("/deleteUser/:userID", adminAuth, async (req, res) => {
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

// GET A FULL USER PROFILE.
router.get("/get-user/:userUid", adminAuth, async (req, res) => {
    const userUid = req.params.userUid
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

// GET THE FULL REPORT OF HDF FROM THE DATABASE.
router.get("/hdf/full-report", adminAuth, async (req, res) => {
    try {
        const stats = await STATISTICS.find().sort({ date: -1 })
        if(!stats) return res.status(404).json({ errors: { message: 'empty' }})
        return res.status(200).json(stats)
    } catch (error) {
        return res.sendStatus(500)
    }
})

router.post("/hdf/report-range", adminAuth, async (req, res) => {
    const { fromDate, toDate } = req.body

    const formatFrom = new Date(fromDate)
    const formatTo = new Date(toDate)
    
    try {
        if(formatFrom > formatTo) return res.status(400).json({ errors: { message: 'Invalid date format.' }})
        let min = moment(formatFrom).tz('Asia/Manila').startOf('day').toDate()
        let max = moment(formatTo).tz('Asia/Manila').endOf('day').toDate()

        let formatMin = moment(min).format("L")
        let formatMax = moment(max).format("L")

        const data = await getHdfStatistics(min, max, formatMin, formatMax)
        const result = countDepartments(data)
        const reports = result.map(data => {
            return {
                school: data._id.school,
                gate: data._id.gate,
                allowed: data.allowed,
                not_allowed: data.not_allowed,
                total_entry: data.total_entry,
                students: data.students,
                employees: data.employees,
                visitors: data.visitors,
                department_list: data.department_list
            }
        })
        if(!data) return res.status(404).json({ errors:{ message:'not found' }})
        return res.status(200).json(reports)
    } catch (error) {
        return res.sendStatus(500)
    }
})

// DELETE A HDF ON A USER
router.delete("/hdf/:userUid/:hdfID", adminAuth, async (req, res) => {
    const userUid = req.params.userUid
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const hdfUid = req.params.hdfID
    const hdfCheck = objectIDValidator(hdfUid)
    if (!hdfCheck) return res.status(400).json({ errors:{ message:'invalid hdf ID'}})

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    const uid = user._id
    try {
        const removedHdfData = await USERS.findByIdAndUpdate(
            uid,
            {
                $pull : {
                    hdf_data: { _id: mongoose.Types.ObjectId(hdfUid) }
                }
            }
        )

        if(removedHdfData) return res.status(201).json({ success: { message:'user hdf detail deleted' }})
        return res.status(400).json({ errors:{ message:'user hdf detail failed to delete' }}) 
    } catch (error) {
        return res.sendStatus(500)
    }
})

module.exports = router