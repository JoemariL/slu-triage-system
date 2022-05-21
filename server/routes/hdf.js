// LIBRARY IMPORT 
const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const moment = require('moment-timezone')

// MODEL IMPORT 
const USERS = require('../models/users')

// UTILS IMPORT 
const { objectIDValidator } = require('../utils/validator')
const { hdfIfExist, getNotAllowedUsers, hdfIfNotAllowed, hdfIfExpired, getHdfTodayUser, getHdfStatistics, checkAvailableHdf, getRepeatableHdfInfo, checkTimeIntervalHdf, extractGateInfo } = require('../utils/pipelines')
const { decryptJSON, countDepartments, extractRejected } = require('../utils/functions')
const { extractID } = require('../middleware/jwt-helper')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

// GET HDF ON A DATE RANGE.
router.post("/date-range", adminAuth, async (req, res) => {
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
        const mapper = data.map((payload) => {
            return {
                ...payload,
                _id: null,
                school: payload._id.school,
                gate: payload._id.gate
            }
        })
        if(!data) return res.status(404).json({ errors:{ message:'not found' }})
        const result = countDepartments(mapper)
        return res.status(200).json(result)
    } catch (error) {
        return res.sendStatus(500)
    }
})

// GET THE REJECTED HDF ON A DATE RANGE.
router.post("/rejected/date-range", adminAuth, async (req, res) => {
    const { fromDate, toDate } = req.body

    const formatFrom = new Date(fromDate)
    const formatTo = new Date(toDate)

    try {
        if(formatFrom > formatTo) return res.status(400).json({ errors: { message: 'Invalid date format.' }})
        let min = moment(formatFrom).tz('Asia/Manila').startOf('day').toDate()
        let max = moment(formatTo).tz('Asia/Manila').endOf('day').toDate()

        const data = await getNotAllowedUsers(min, max)
        const sortedRejectedData = extractRejected(data)

        if(!data) return res.status(404).json({ errors:{ message:'not found' }})
        return res.status(200).json({
            ...sortedRejectedData,
            users: data,
        })
    } catch (error) {
        return res.sendStatus(500)
    }
})

// GET HDF DATA FOR SPECIFIC USER WITH-IN A DAY
router.get("/day-user", auth, async (req, res) => {
    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const userUid = await extractID(req.cookies.accessToken)
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    try {
        let min = moment().tz('Asia/Manila').startOf('day').toDate()
        let max = moment().tz('Asia/Manila').endOf('day').toDate()
        const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
        if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

        const userHdf = await getHdfTodayUser(user._id, min, max)
        if(!userHdf) return res.status(404).json({ errors:{ message:'not found' }})

        const hdf = userHdf.slice().sort((a, b) => b.createdAt - a.createdAt)
        return res.status(200).json(hdf)
    } catch (error) {
        return res.sendStatus(500)
    }
})

// GENERATE HDF DATA FOR SPECIFIC USER
router.post("/generate", auth, async (req, res) => {
    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const userUid = await extractID(req.cookies.accessToken)
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const { covidExposure, covidPositive, fever, cough, cold, soreThroat, diffBreathing, diarrhea, others, pregnant } = req.body

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    let allowed = true
    if(covidExposure || covidPositive || fever || cough || cold || soreThroat || diffBreathing || diarrhea) allowed = false

    const hdfID = new mongoose.Types.ObjectId()
    const hdfData = {
        _id: hdfID,
        allowed,
        covid_exposure: covidExposure,
        covid_positive: covidPositive,
        fever,
        cough,
        cold,
        sore_throat: soreThroat,
        diff_breathing: diffBreathing,
        diarrhea,
        others,
        pregnant
    }

    const uid = user._id
    try {
        const newHdfData = await USERS.findByIdAndUpdate(
            uid,
            { $push: { "hdf_data": hdfData }},
            { new: true}
        )
        if(newHdfData) return res.status(201).json({ _id: hdfID })
        return res.status(400).json({ errors:{ message:'user hdf form add failed' }})
    } catch (error) {
        return res.sendStatus(500)
    }
})

// HDF QR SCAN
router.post("/scan", auth, async (req, res) => {
    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const { destination, qrCode } = req.body

    const userUid = await extractID(req.cookies.accessToken)
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    let dateToday = moment().tz('Asia/Manila').startOf('day').toDate()
    let dateTomorrow = moment().tz('Asia/Manila').startOf('day').add(1, 'days').toDate()

    let hdfUid = null
    const availableId = await checkAvailableHdf(userUid, dateToday, dateTomorrow)
    const timeIntervalCheck = await checkTimeIntervalHdf(userUid, dateToday, dateTomorrow)
    if(timeIntervalCheck !== "CLEAR") return res.status(400).json({ errors: { message: timeIntervalCheck }})

        if (availableId) {
            hdfUid = availableId
        } else {
            const userHdf = await getHdfTodayUser(userUid, dateToday, dateTomorrow)
            if(!userHdf.length) return res.status(404).json({ errors:{ message:'no hdf found' }})
            const payload = await getRepeatableHdfInfo(userUid, dateToday, dateTomorrow)
            const newID = new mongoose.Types.ObjectId()
            const hdfData = {
                _id: newID,
                allowed: payload.allowed,
                covid_exposure: payload.covid_exposure,
                covid_positive: payload.covid_positive,
                fever: payload.fever,
                cough: payload.cough,
                cold: payload.cold,
                sore_throat: payload.sore_throat,
                diff_breathing: payload.diff_breathing,
                diarrhea: payload.diarrhea,
                others: payload.others,
                pregnant: payload.pregnant
            }
            try {
                await USERS.findByIdAndUpdate(
                    userUid,
                    { $push: { "hdf_data": hdfData }},
                    { new: true}
                )
                hdfUid = newID
            } catch (error) {
                return res.sendStatus(500)
            }
        }
    
    const qrData = qrCode
    if(qrData === null) return res.status(400).json({ errors:{ message:'Provide the qr code data' }})

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    const ifExist = await hdfIfExist(userUid, hdfUid)
    if(!ifExist) return res.status(404).json({ errors:{ message:'User hdf info not found' }})

    const ifExpired = await hdfIfExpired(userUid, hdfUid)
    if(ifExpired) return res.status(400).json({ errors:{ message:'Hdf already used' }})

    const ifNotAllowed = await hdfIfNotAllowed(userUid, hdfUid)
    if(!ifNotAllowed) return res.status(400).json({ errors:{ message:'You are not allowed to scan qr code.' }})

    let school_id, gate_id = null
    let decrypted, school, gate = null

    try{
        decrypted = decryptJSON(qrData)
        if(decrypted.hasOwnProperty('raw_code')) school_id = decrypted.school_id, gate_id = decrypted.gate_id, school = decrypted.school
        let check = await extractGateInfo(school_id, gate_id)
        if(!check || check === undefined) return res.status(404).json({ errors:{ message:'QR code information not found.' }})
        gate = check.gate
    } catch (error) {
        return res.status(400).json({ errors:{ message:'No QR signature found or invalid QR code.' }})
    }

    let dateNow = moment().tz('Asia/Manila').toDate()
    const uid = user._id
    
    try {
        const newHdfData = await USERS.findByIdAndUpdate(
            uid,
            {
                $set: {
                    "hdf_data.$[element].entry_date": dateNow,
                    "hdf_data.$[element].entry_campus": school,
                    "hdf_data.$[element].gate_info": gate,
                    "hdf_data.$[element].destination": destination.trim(),
                    "hdf_data.$[element].is_expired": true
                }
            },
            {
                arrayFilters: [
                    {
                        "element._id": mongoose.Types.ObjectId(hdfUid)
                    }
                ]  
            }
        )
        if(newHdfData) return res.status(201).json({ success: { message:'user hdf details updated' }})
        return res.status(400).json({ errors:{ message:'user hdf details failed to update' }}) 
    } catch (error) {
        return res.sendStatus(500)
    } 
})

module.exports = router