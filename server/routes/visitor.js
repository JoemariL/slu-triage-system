// LIBRARY IMPORT 
const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const moment = require('moment-timezone')

// MODEL IMPORT 
const USERS = require('../models/users')
const SCHOOL = require('../models/school')

// UTILS IMPORT 
require('dotenv').config({ path: '../.env'})
const { objectIDValidator } = require('../utils/validator')
const { decryptJSON, generateRandomKey } = require('../utils/functions')
const { generateVisitorToken } = require('../middleware/jwt-helper')
const { extractID } = require('../middleware/jwt-helper')
const { extractGateInfo } = require('../utils/pipelines')

// FOR VISITORS
router.post("/generate", async (req, res) => {
    const { qrCode } = req.body
    const { first_name, last_name, age, contact_number, home_address } = req.body
    const { vaccine_status, vaccine_date, vaccine_serial_no } = req.body
    const { covid_exposure, covid_positive, fever, cough, cold, sore_throat, diff_breathing, diarrhea, others, pregnant, destination, createdAt } = req.body

    let allowed = true
    if(covid_exposure || covid_positive || fever || cough || cold || sore_throat || diff_breathing || diarrhea) allowed = false
    if(!allowed) return res.status(400).json({ errors: { message: 'You are not allowed to scan qr code.' }})

    const vaccination_details = {
        vaccine_status,
        vaccine_date,
        vaccine_serial_no
    }

    let school_id, gate_id = null
    let decrypted, school, gate, code = null
    try {
        decrypted = decryptJSON(qrCode)
        if(decrypted.hasOwnProperty('raw_code')) school_id = decrypted.school_id, gate_id = decrypted.gate_id, school = decrypted.school
        let check = await extractGateInfo(school_id, gate_id)
        if(!check || check === undefined) return res.status(404).json({ errors:{ message:'QR code information not found.' }})
        gate = check.gate
    } catch (error) {
        return res.status(400).json({ errors:{ message:'no QR signature found or invalid QR code.' }})
    }
    let dateNow = moment().toDate()

    const hdf_data = {
        entry_date: dateNow,
        entry_campus: school,
        gate_info: gate,
        allowed,
        covid_exposure,
        covid_positive,
        fever,
        cough,
        cold,
        sore_throat,
        diff_breathing,
        diarrhea,
        destination,
        others,
        pregnant,
        is_expired: true,
        createdAt,
    }
    try {
        const randomEmail = generateRandomKey(7)
        const user = new USERS({
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            age: age.trim(),
            contact_number: contact_number.trim(),
            home_address: home_address.trim(),
            email_address: randomEmail,
            user_type: "VISITOR",
            vaccination_details,
            hdf_data,
        })
        const result = await user.save()

        const payload = {
            id: result._id
        }
        const accessToken = await generateVisitorToken(payload)

        if(process.env.NODE_ENV === "PRODUCTION") {
            return res.status(200)
            .cookie("visitorToken", accessToken, { expires: new Date(new Date().getTime() + 3600 * 1000), secure: true })
            .json({ success: { message:'visitor registered'}})
        } else {
            return res.status(200)
            .cookie("visitorToken", accessToken, { expires: new Date(new Date().getTime() + 3600 * 1000) })
            .json({ success: { message:'visitor registered'}})
        }
    } catch (error) {
        return res.sendStatus(500)
    }
})

router.get("/get", async(req, res) => {
    if(req.cookies.visitorToken === null || req.cookies.visitorToken === undefined) { 
        return res.sendStatus(401)
    }

    const userUid = await extractID(req.cookies.visitorToken)
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    try {
        const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt -email_address')
        if(user.user_type != "VISITOR") return res.sendStatus(401)
        if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
        return res.status(200).json(user)
    } catch (error) {
        return res.sendStatus(500)
    }
})

module.exports = router