// LIBRARY IMPORT
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// MODEL IMPORT
const ADMIN = require('../models/admin')

// UTILS IMPORT
require('dotenv').config({ path: '../.env'})
const { loginInputValidator } = require('../utils/validator')

async function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_KEY, { expiresIn: '24h' })
}

// LOGIN AN ADMIN.
router.post("/admin/login", async (req, res) => {
    let inputUsername = (req.body.username === undefined) ? null : req.body.username
    let inputPassword = (req.body.password === undefined) ? null : req.body.password
    
    const { errors, valid } = loginInputValidator(inputUsername, inputPassword)
    if(!valid) return res.status(400).json({ errors })
    
    const admin = await ADMIN.findOne({ username: inputUsername })
    if(!admin) return res.status(404).json({ errors: { message:'user not found' }})
    if(admin.isDeactivated) return res.status(401).json({ errors: { message:'account is disabled' }})

    const isMatch = await bcrypt.compare(inputPassword, admin.password)
    if(!isMatch) return res.status(400).json({ errors: { message:'invalid login credentials'}})
    
    try {
        const payload = {
            id: admin._id,
            role: admin.role,
            username: admin.username
        }
        const accessToken = await generateAccessToken(payload)

        return res.status(200).json({
            username: admin.username,
            accessToken
        })
    } catch (error) {
        return res.status(200).json({ errors: { message:'error occurred'}})
    }
})


// REGISTER AN ADMIN.
router.post("/admin/register", async (req, res) => {
    let inputUsername = (req.body.username === undefined) ? null : req.body.username
    let inputPassword = (req.body.password === undefined) ? null : req.body.password
    
    let username = inputUsername.replace(/\s+/g, '')
    let regex = new RegExp(["^", username, "$"].join(""), "i")

    const ifExists = await ADMIN.find({ username: regex })
    if(ifExists.length !== 0) return res.status(400).json({ errors: { message:'user already exists' }})

    let password = await bcrypt.hash(inputPassword, 12)

    const newAdmin = new ADMIN({
        username,
        password
    })

    await newAdmin.save()
    .then(() => {
        return res.status(201).json({ success:{ message:'user registered' }})
    })
    .catch(() => {
        return res.status(400).json({ errors:{ message:'user registration failed' }})
    })
})

module.exports = router