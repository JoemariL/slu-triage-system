const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")

const SCHOOL = require('../models/school')

const { objectIDValidator } = require('../utils/validator')
const { encryptJSON } = require('../utils/functions')
const { extractID } = require('../middleware/jwt-helper')
const { extractGateInfo, checkIfGateExist } = require('../utils/pipelines')

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

// ADDS NEW SCHOOL DATA.
router.post("/add-school", async (req, res) => {
    const { school } = req.body
    try {
        const schoolInfo = school.trim()
        const checkIfExists = await SCHOOL.find({ school: schoolInfo })
        if(checkIfExists.length !== 0) return res.status(400).json({ errors: { message: 'School info already exists.'}})
        const newSchool = new SCHOOL({
            school: schoolInfo
        })
        await newSchool.save()
        .then(() => {
            return res.status(201).json({ success:{ message:'New School info added.' }})
        })
        .catch(() => {
            return res.status(400).json({ errors:{ message:'New School info failed to add.' }})
        })
    } catch (error) {
        return res.sendStatus(500)
    }
})

// DELETES SCHOOL DATA.
router.delete("/delete-school/:schoolID", async (req, res) => {

    const schoolID = req.params.schoolID
    const idCheck = objectIDValidator(schoolID)
    if (!idCheck) return res.status(400).json({ errors: { message:'Invalid school ID.' }})

    const school = await SCHOOL.findById(schoolID)
    if(!school) return res.status(400).json({ errors: { message:'School information not found.' }})

    try {
        const deleteSchool = await SCHOOL.deleteOne({ _id: school._id })
        if(deleteSchool) return res.status(200).json({ success:{ message:'School successfully deleted.' }})
        return res.status(400).json({ errors:{ message:'School Failed to delete.' }})
    } catch (error) {
        return res.sendStatus(500)
    }
})

// ADD GATE FOR QR CODE GENERATION
router.post("/add-gate/:schoolID", async (req, res) => {
    const { gate } = req.body

    const schoolID = req.params.schoolID
    const idCheck = objectIDValidator(schoolID)
    if (!idCheck) return res.status(400).json({ errors: { message:'Invalid school ID.' }})

    const school = await SCHOOL.findById(schoolID)
    if(!school) return res.status(400).json({ errors: { message:'School information not found.' }})

    try {
        const gateInfo = gate.trim()
        const school_id = school._id
        let extractedSchool = school.school
        let concat = `${extractedSchool} ${gateInfo}`
        let matches = concat.match(/\b(\w)/g)
        let qrData = matches.join('')
        let date = new Date()

        const newID = new mongoose.Types.ObjectId()

        let payload = {school_id, gate_id: newID, school: extractedSchool, raw_code: qrData, date}
        let encrypt = encryptJSON(payload)

        const uid = school._id
        const check = await checkIfGateExist(uid, gateInfo)
        if(check) return res.status(400).json({ errors: { message:'Gate info already exists.' }}) 

        const gateDetails = {
            _id: newID,
            gate: gateInfo,
            raw_code: qrData,
            generated_code: encrypt,
        }

        await SCHOOL.findByIdAndUpdate(
            uid,
            { $push: { "gate_info": gateDetails }},
            { new: true}
        ).then(() => {
            return res.status(201).json({ success:{ message: 'New gate info added.' }})
        }).catch((err) => {
            return res.status(400).json({ errors:{ message: 'New gate info failed to add.' }})
        })
    } catch (error) {
        return res.sendStatus(500)
    }
})

// REFRESHES THE QR CODE.
router.post("/refresh-qr/:schoolID/:gateID", async (req, res) => {
    const schoolID = req.params.schoolID
    const schoolIdCheck = objectIDValidator(schoolID)
    if (!schoolIdCheck) return res.status(400).json({ errors: { message:'Invalid school ID.' }})

    const gateUid = req.params.gateID
    const idCheck = objectIDValidator(gateUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid qr id' }})

    const schoolInfo = await SCHOOL.findById(schoolID)
    if(!schoolInfo) return res.status(400).json({ errors: { message:'School information not found.' }})

    try {
        const gateData = await extractGateInfo(schoolID, gateUid)
        let school = schoolInfo.school
        let gate = gateData.gate

        let concat = `${school} ${gate}`
        let matches = concat.match(/\b(\w)/g)
        let qrData = matches.join('')
        let date = new Date()
    
        let payload = {school_id: schoolID, gate_id: gateData._id, school, raw_code: qrData, date}
        let encrypt = encryptJSON(payload)

        await SCHOOL.findByIdAndUpdate(
            schoolInfo._id,
            {
                $set: {
                    "gate_info.$[element].generated_code": encrypt
                }
            },
            {   
                arrayFilters: [
                    {
                        "element._id": mongoose.Types.ObjectId(gateUid)
                    }
                ]
            }
        ).then(() => {
            return res.status(201).json({ success:{ message: 'Gate info refreshed.' }})
        }).catch(() => {
            return res.status(400).json({ errors:{ message: 'Gate info failed to refresh.' }})
        })
    } catch (error) {
        return res.sendStatus(500)
    }
})

// DELETES THE QR CODE GENERATED
router.post("/removeQr/:schoolID/:qrID", async (req, res) => {
    const schoolID = req.params.schoolID
    const schoolIdCheck = objectIDValidator(schoolID)
    if (!schoolIdCheck) return res.status(400).json({ errors: { message:'Invalid school ID.' }})

    const qrUid = req.params.qrID
    const idCheck = objectIDValidator(qrUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid qr id' }})

    const school = await SCHOOL.findById(schoolID)
    if(!school) return res.status(404).json({ errors:{ message:'qr info not found' }})

    const uid = school._id
    try {
        await SCHOOL.findByIdAndUpdate(
            uid,
            {
                $pull : {
                    gate_info: { _id: mongoose.Types.ObjectId(qrUid) }
                }
            }
        ).then(() => {
            return res.status(201).json({ success:{ message: 'Gate info deleted.' }})
        }).catch(() => {
            return res.status(400).json({ errors:{ message: 'Gate info failed to delete.' }})
        })
    } catch (error) {
        return res.sendStatus(500)
    }
})

module.exports = router