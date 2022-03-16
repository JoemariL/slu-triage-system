// LIBRARY IMPORT 
const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const moment = require('moment')

// MODEL IMPORT 
const USERS = require('../models/users')
const SCHOOL = require('../models/school')


// UTILS IMPORT 
const auth = require('../middleware/auth')
const { objectIDValidator, hdfInputValidator } = require('../utils/validator')
const { hdfIfExist, hdfIfExpired, hdfIfExistDay, hdfIfOver, getUserHdf, getHdfToday } = require('../utils/pipelines')
const { decryptJSON } = require('../utils/functions')


// GET HDF DATA FOR THE DAY.
router.get("/day", async (req, res) => {
    let dateToday = moment().startOf('day').toDate()
    let dateTomorrow = moment().startOf('day').add(1, 'days').toDate()

    const data = await getHdfToday(dateToday, dateTomorrow)
    if(!data) return res.status(404).json({ errors:{ message:'not found' }})
    return res.status(200).json(data)
})

// GET HDF DATA FOR SPECIFIC USER
router.get("/get/:userID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const inputUser = (req.body.idNumber === undefined) ? req.body.username : req.body.idNumber
    if(inputUser === null || inputUser === undefined) return res.status(400).json({ errors:{ message:'provide the user details' }})

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
    if(user.id_number != inputUser && user.username != inputUser) return res.status(400).json({ errors:{ message:'user info mismatch' }})

    const userHdf = await getUserHdf(user._id)
    if(!userHdf) return res.status(404).json({ errors:{ message:'not found' }})
    return res.status(200).json(userHdf)

})

// GENERATE HDF DATA FOR SPECIFIC USER
router.post("/generate/:userID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const inputUser = (req.body.idNumber === undefined) ? req.body.username : req.body.idNumber
    if(inputUser === null || inputUser === undefined) return res.status(400).json({ errors:{ message:'provide the user details' }})

    let dateNow = moment().toDate()
    let dateToday = moment().startOf('day').toDate()
    let dateTomorrow = moment().startOf('day').add(1, 'days').toDate()

    const inputDeptDestination = (req.body.deptDestination === undefined) ? null : req.body.deptDestination 
    const inputExposure = (req.body.covidExposure === undefined) ? null : req.body.covidExposure
    const inputPositive = (req.body.covidPositive === undefined) ? null : req.body.covidPositive
    const inputFever = (req.body.fever === undefined) ? null : req.body.fever
    const inputCough = (req.body.cough === undefined) ? null : req.body.cough
    const inputCold = (req.body.cold === undefined) ? null : req.body.cold
    const inputSoreThroat = (req.body.soreThroat === undefined ) ? null : req.body.soreThroat
    const inputDiffBreathing = (req.body.DiffBreathing === undefined) ? null : req.body.DiffBreathing
    const inputDiarrhea = (req.body.diarrhea === undefined) ? null : req.body.diarrhea
    const inputOthers = (req.body.others === undefined) ? null : req.body.others
    const inputIfPregnant = (req.body.ifPregnant === undefined) ? null : req.body.ifPregnant

    const { errors, valid } = hdfInputValidator(inputExposure, inputPositive, inputFever, inputCough, inputCold, inputSoreThroat, inputDiffBreathing, inputDiarrhea)
    if(!valid) return res.status(400).json({ errors })

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
    if(user.id_number != inputUser && user.username != inputUser) return res.status(400).json({ errors:{ message:'user info mismatch' }})

    const entryCheck = await hdfIfExistDay(user._id, dateToday, dateTomorrow)
    if(!entryCheck) return res.status(404).json({ errors:{ message:'user already has registered hdf this day' }})

    let allowed = null
    if(inputExposure || inputPositive || inputFever || inputCough || inputCold || inputSoreThroat || inputDiffBreathing || inputDiarrhea) {
        allowed = false
    } else {
        allowed = true
    }

    const hdfData = {
        entry_date: null,
        entry_campus: null,
        gate_info: null,
        code: null,
        allowed,
        is_expired: false,
        dept_destination: inputDeptDestination,
        covid_exposure: inputExposure,
        covid_positive: inputPositive,
        fever: inputFever,
        cough: inputCough,
        cold: inputCold,
        sore_throat: inputSoreThroat,
        diff_breathing: inputDiffBreathing,
        diarrhea: inputDiarrhea,
        others: inputOthers,
        pregnant: inputIfPregnant,
        createdAt: dateNow
    }

    const uid = user._id
    const newHdfData = await USERS.findByIdAndUpdate(
        uid,
        { $push: { "hdf_data": hdfData }},
        { new: true}
    )

    if(newHdfData) return res.status(201).json({ success: { message:'user hdf form added'}})
    return res.status(400).json({ errors:{ message:'user hdf form add failed' }})
})

// HDF QR SCAN
router.patch("/scan/:userID/:hdfID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const hdfUid = req.params.hdfID
    const hdfCheck = objectIDValidator(hdfUid)
    if (!hdfCheck) return res.status(400).json({ errors:{ message:'invalid hdf ID'}})

    const inputUser = (req.body.idNumber === undefined) ? req.body.username : req.body.idNumber
    if(inputUser === null || inputUser === undefined) return res.status(400).json({ errors:{ message:'provide the user details' }})
    const inputQrData = (req.body.qrCode === undefined) ? null : req.body.qrCode
    if(inputQrData === null) return res.status(400).json({ errors:{ message:'provide the qr code data' }})

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
    if(user.id_number != inputUser && user.username != inputUser) return res.status(400).json({ errors:{ message:'user info mismatch' }})

    const ifExist = await hdfIfExist(userUid, hdfUid)
    if(!ifExist) return res.status(404).json({ errors:{ message:'user hdf info not found' }})

    const ifExpired = await hdfIfExpired(userUid, hdfUid)
    if(ifExpired) return res.status(400).json({ errors:{ message:'hdf info already entered today'}})

    let decrypted, school, gate, code = null

    try{
        decrypted = decryptJSON(inputQrData)
        if(decrypted.hasOwnProperty('raw_code')) school = decrypted.school, gate = decrypted.gate, code = decrypted.raw_code
        let check = await SCHOOL.findOne({ raw_code: code})
        if(!check) return res.status(404).json({ errors:{ message:'qr code information not found' }})
    } catch (err) {
        return res.status(400).json({ errors:{ message:'no signature found or invalid qr code' }})
    }
    let dateNow = moment().toDate()

    const uid = user._id
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
})

// EDIT HDF DATA FOR SPECIFIC USER
router.patch("/update/:userID/:hdfID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const hdfUid = req.params.hdfID
    const hdfCheck = objectIDValidator(hdfUid)
    if (!hdfCheck) return res.status(400).json({ errors:{ message:'invalid hdf ID'}})

    const inputUser = (req.body.idNumber === undefined) ? req.body.username : req.body.idNumber
    if(inputUser === null || inputUser === undefined) return res.status(400).json({ errors:{ message:'provide the user details' }})

    const inputDeptDestination = (req.body.deptDestination === undefined) ? null : req.body.deptDestination 
    const inputExposure = (req.body.covidExposure === undefined) ? null : req.body.covidExposure
    const inputPositive = (req.body.covidPositive === undefined) ? null : req.body.covidPositive
    const inputFever = (req.body.fever === undefined) ? null : req.body.fever
    const inputCough = (req.body.cough === undefined) ? null : req.body.cough
    const inputCold = (req.body.cold === undefined) ? null : req.body.cold
    const inputSoreThroat = (req.body.soreThroat === undefined ) ? null : req.body.soreThroat
    const inputDiffBreathing = (req.body.diffBreathing === undefined) ? null : req.body.diffBreathing
    const inputDiarrhea = (req.body.diarrhea === undefined) ? null : req.body.diarrhea
    const inputOthers = (req.body.others === undefined) ? null : req.body.others

    let dateYesterday = moment().startOf('day').add(-1, 'days').toDate()
    
    const { errors, valid } = hdfInputValidator(inputExposure, inputPositive, inputFever, inputCough, inputCold, inputSoreThroat, inputDiffBreathing, inputDiarrhea)
    if(!valid) return res.status(400).json({ errors })

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
    if(user.id_number != inputUser && user.username != inputUser) return res.status(400).json({ errors:{ message:'user info mismatch' }})

    const ifExist = await hdfIfExist(userUid, hdfUid)
    if(!ifExist) return res.status(404).json({ errors:{ message:'user hdf info not found' }})

    const ifExpired = await hdfIfExpired(userUid, hdfUid)
    if(ifExpired) return res.status(400).json({ errors:{ message:'hdf already expired and cannot be changed'}})

    const ifPassed = await hdfIfOver(userUid, hdfUid, dateYesterday)
    if(ifPassed) return res.status(400).json({ errors:{ message:'hdf that are created in the past can no longer be updated'}})

    const uid = user._id
    const newHdfData = await USERS.findByIdAndUpdate(
        uid,
        {
            $set: {
                "hdf_data.$[element].dept_destination": inputDeptDestination,
                "hdf_data.$[element].covid_exposure": inputExposure,
                "hdf_data.$[element].covid_positive": inputPositive,
                "hdf_data.$[element].fever": inputFever,
                "hdf_data.$[element].cough": inputCough,
                "hdf_data.$[element].cold": inputCold,
                "hdf_data.$[element].sore_throat": inputSoreThroat,
                "hdf_data.$[element].diff_breathing": inputDiffBreathing,
                "hdf_data.$[element].diarrhea": inputDiarrhea,
                "hdf_data.$[element].others": inputOthers
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

})

// DELETE HDF DATA IN A USER
router.delete("/delete/:userID/:hdfID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const hdfUid = req.params.hdfID
    const hdfCheck = objectIDValidator(hdfUid)
    if (!hdfCheck) return res.status(400).json({ errors:{ message:'invalid hdf ID'}})

    const inputUser = (req.body.idNumber === undefined) ? req.body.username : req.body.idNumber
    if(inputUser === null || inputUser === undefined) return res.status(400).json({ errors:{ message:'provide the user details' }})

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
    if(user.id_number != inputUser && user.username != inputUser) return res.status(400).json({ errors:{ message:'user info mismatch' }})

    const ifExist = await hdfIfExist(userUid, hdfUid)
    if(!ifExist) return res.status(404).json({ errors:{ message:'user hdf info not found' }})

    const uid = user._id
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

})

module.exports = router