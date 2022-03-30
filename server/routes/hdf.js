// LIBRARY IMPORT 
const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const moment = require('moment')

// MODEL IMPORT 
const USERS = require('../models/users')
const SCHOOL = require('../models/school')

// UTILS IMPORT 
const { objectIDValidator } = require('../utils/validator')
const { hdfIfExist, hdfIfExpired, hdfIfExistDay, hdfIfOver, getUserHdf, getHdfToday, getHdfTodayUser, getExpiredHDF } = require('../utils/pipelines')
const { decryptJSON } = require('../utils/functions')
const { extractID } = require('../middleware/jwt-helper')

// GET HDF DATA FOR THE DAY.
router.get("/day", async (req, res) => {
    let dateToday = moment().startOf('day').toDate()
    let dateTomorrow = moment().startOf('day').add(1, 'days').toDate()
    const data = await getExpiredHDF(dateTomorrow)
    for(let i = 0; i < data.length; i++){
        console.log("user_id: ", data[i]._id, "hdf_id: ", data[i].hdf_data._id)
    }
    try {
        const data = await getHdfToday(dateToday, dateTomorrow)
        if(!data) return res.status(404).json({ errors:{ message:'not found' }})
        return res.status(200).json(data)
    } catch (error) {
        return res.sendStatus(500)
    }
})

// GET HDF DATA FOR SPECIFIC USER
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

        const userHdf = await getUserHdf(user._id)
        if(!userHdf) return res.status(404).json({ errors:{ message:'not found' }})
        return res.status(200).json(userHdf)
    } catch (error) {
        return res.sendStatus(500)
    }
})

// GET HDF DATA FOR SPECIFIC USER WITH-IN A DAY
router.get("/get/day", async (req, res) => {

    let dateToday = moment().startOf('day').toDate()
    let dateTomorrow = moment().startOf('day').add(1, 'days').toDate()

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

        const userHdf = await getHdfTodayUser(user._id, dateToday, dateTomorrow)
        if(!userHdf) return res.status(404).json({ errors:{ message:'not found' }})
        return res.status(200).json(userHdf)
    } catch (error) {
        return res.sendStatus(500)
    }

})

// GENERATE HDF DATA FOR SPECIFIC USER
router.post("/generate", async (req, res) => {

    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const userUid = await extractID(req.cookies.accessToken)
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    let dateToday = moment().startOf('day').toDate()
    let dateTomorrow = moment().startOf('day').add(1, 'days').toDate()

    const { destination, covidExposure, covidPositive, fever, cough, cold, soreThroat, diffBreathing, diarrhea, others, pregnant } = req.body

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    const entryCheck = await hdfIfExistDay(user._id, dateToday, dateTomorrow)
    if(!entryCheck) return res.status(404).json({ errors:{ message:'user already has registered hdf this day' }})

    let allowed = true
    if(covidExposure || covidPositive || fever || cough || cold || soreThroat || diffBreathing || diarrhea) allowed = false

    const hdfData = {
        allowed,
        destination,
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
    
        if(newHdfData) return res.status(201).json({ success: { message:'user hdf form added'}})
        return res.status(400).json({ errors:{ message:'user hdf form add failed' }})
    } catch (error) {
        return res.sendStatus(500)
    }
})

// FOR VISITORS
router.post("/visitor/generate", async (req, res) => {
    const { qrCode } = req.body
    const { first_name, last_name, age, contact_number, home_address } = req.body
    const { vaccine_status, vaccine_date, vaccine_serial_no } = req.body
    const { covid_exposure, covid_positive, fever, cough, cold, sore_throat, diff_breathing, diarrhea, others, pregnant, destination } = req.body

    let allowed = true
    if(covid_exposure || covid_positive || fever || cough || cold || sore_throat || diff_breathing || diarrhea) allowed = false

    const vaccination_details = {
        vaccine_status,
        vaccine_date,
        vaccine_serial_no
    }

    let decrypted, school, gate, code = null
    try {
        decrypted = decryptJSON(qrCode)
        if(decrypted.hasOwnProperty('raw_code')) school = decrypted.school, gate = decrypted.gate, code = decrypted.raw_code
        let check = await SCHOOL.findOne({ raw_code: code})
        if(!check) return res.status(404).json({ errors:{ message:'qr code information not found' }})
    } catch (error) {
        return res.status(400).json({ errors:{ message:'no signature found or invalid qr code' }})
    }
    let dateNow = moment().toDate()

    const hdf_data = {
        entry_date: dateNow,
        entry_campus: school,
        gate_info: gate,
        allowed,
        destination,
        is_expired: true
    }
    let random = (Math.random() + 1).toString(36).substring(7)
    try {
        const user = new USERS({
            first_name,
            last_name,
            age,
            contact_number,
            home_address,
            email_address: random,
            user_type: "VISITOR",
            vaccination_details,
            hdf_data,
            others,
            pregnant
        })
        await user.save({ validateBeforeSave: false })
        res.status(201).json({ success: { message:'visitor registered' }})
    } catch (error) {
        return res.sendStatus(500)
    }
})

// HDF QR SCAN
router.patch("/scan/:hdfID", async (req, res) => {

    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const userUid = await extractID(req.cookies.accessToken)
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const hdfUid = req.params.hdfID
    const hdfCheck = objectIDValidator(hdfUid)
    if (!hdfCheck) return res.status(400).json({ errors:{ message:'invalid hdf ID'}})

    const qrData = req.body.qrCode
    if(qrData === null) return res.status(400).json({ errors:{ message:'provide the qr code data' }})

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    const ifExist = await hdfIfExist(userUid, hdfUid)
    if(!ifExist) return res.status(404).json({ errors:{ message:'user hdf info not found' }})

    const ifExpired = await hdfIfExpired(userUid, hdfUid)
    if(ifExpired) return res.status(400).json({ errors:{ message:'hdf info already entered today'}})

    let decrypted, school, gate, code = null

    try{
        decrypted = decryptJSON(qrData)
        if(decrypted.hasOwnProperty('raw_code')) school = decrypted.school, gate = decrypted.gate, code = decrypted.raw_code
        let check = await SCHOOL.findOne({ raw_code: code})
        if(!check) return res.status(404).json({ errors:{ message:'qr code information not found' }})
    } catch (error) {
        return res.status(400).json({ errors:{ message:'no signature found or invalid qr code' }})
    }

    let dateNow = moment().toDate()
    const uid = user._id
    
    try {
        const newHdfData = await USERS.findByIdAndUpdate(
            uid,
            {
                $set: {
                    "hdf_data.$[element].entry_date": dateNow,
                    "hdf_data.$[element].entry_campus": school,
                    "hdf_data.$[element].gate_info": gate,
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

// EDIT HDF DATA FOR SPECIFIC USER
router.patch("/update/:hdfID", async (req, res) => {

    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const userUid = await extractID(req.cookies.accessToken)
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const hdfUid = req.params.hdfID
    const hdfCheck = objectIDValidator(hdfUid)
    if (!hdfCheck) return res.status(400).json({ errors:{ message:'invalid hdf ID'}})

    const { destination, covidExposure, covidPositive, fever, cough, cold, soreThroat, diffBreathing, diarrhea, others, ifPregnant } = req.body

    let dateYesterday = moment().startOf('day').add(-1, 'days').toDate()
    
    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    const ifExist = await hdfIfExist(userUid, hdfUid)
    if(!ifExist) return res.status(404).json({ errors:{ message:'user hdf info not found' }})

    const ifExpired = await hdfIfExpired(userUid, hdfUid)
    if(ifExpired) return res.status(400).json({ errors:{ message:'hdf already expired and cannot be changed'}})

    const ifPassed = await hdfIfOver(userUid, hdfUid, dateYesterday)
    if(ifPassed) return res.status(400).json({ errors:{ message:'hdf that are created in the past can no longer be updated'}})

    const uid = user._id
    try {
        const newHdfData = await USERS.findByIdAndUpdate(
            uid,
            {
                $set: {
                    "hdf_data.$[element].destination": destination,
                    "hdf_data.$[element].covid_exposure": covidExposure,
                    "hdf_data.$[element].covid_positive": covidPositive,
                    "hdf_data.$[element].fever": fever,
                    "hdf_data.$[element].cough": cough,
                    "hdf_data.$[element].cold": cold,
                    "hdf_data.$[element].sore_throat": soreThroat,
                    "hdf_data.$[element].diff_breathing": diffBreathing,
                    "hdf_data.$[element].diarrhea": diarrhea,
                    "hdf_data.$[element].others": others,
                    "hdf_data.$[element].pregnant": ifPregnant
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

// DELETE HDF DATA IN A USER
router.delete("/delete/:hdfID", async (req, res) => {
    
    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const userUid = await extractID(req.cookies.accessToken)
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const hdfUid = req.params.hdfID
    const hdfCheck = objectIDValidator(hdfUid)
    if (!hdfCheck) return res.status(400).json({ errors:{ message:'invalid hdf ID'}})

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    const ifExist = await hdfIfExist(userUid, hdfUid)
    if(!ifExist) return res.status(404).json({ errors:{ message:'user hdf info not found' }})

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