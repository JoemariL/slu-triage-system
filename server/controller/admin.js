// LIBRARY IMPORT
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

// MODEL IMPORT
const ADMIN = require('../models/admin')
const TOKEN = require('../models/token')

// UTILS IMPORT
require('dotenv').config({ path: '../.env'})
const { generateAccessToken, generateRefreshToken } = require('../middleware/jwt-helper')
const { loginInputValidator } = require('../utils/validator')

// LOGIN AN ADMIN.
router.post("/admin/login", async (req, res) => {
    const { username, password } = req.body
    
    const admin = await ADMIN.findOne({ username })
    if(!admin) return res.status(404).json({ errors: { message:'user not found' }})
    if(admin.isDeactivated) return res.status(401).json({ errors: { message:'account is disabled' }})

    const isMatch = await bcrypt.compare(password, admin.password)
    if(!isMatch) return res.status(400).json({ errors: { message:'invalid login credentials'}})
    
    try {
        const payload = {
            id: admin._id,
            role: admin.role,
            username: admin.username
        }
        const accessToken = await generateAccessToken(payload)
        const refreshToken = await generateRefreshToken(payload)

        const saveToken = new TOKEN ({
            token: refreshToken
        })
        await saveToken.save()

        return res.status(200).json({
            accessToken,
            refreshToken
        })
    } catch (error) {
        return res.status(200).json({ errors: { message:'error occurred'}})
    }
})


// REGISTER AN ADMIN.
router.post("/admin/register", async (req, res) => {
    const { username, password } = req.body
    
    let user = username.replace(/\s+/g, '')
    let regex = new RegExp(["^", user, "$"].join(""), "i")

    const ifExists = await ADMIN.find({ username: regex })
    if(ifExists.length !== 0) return res.status(400).json({ errors: { message:'user already exists' }})

    let hashedPassword = await bcrypt.hash(password, 12)

    const newAdmin = new ADMIN({
        username: user,
        password: hashedPassword
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