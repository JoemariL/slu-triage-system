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
    
    let hashedPassword = await bcrypt.hash(password, 12)
    const newAdmin = new ADMIN({
        username,
        password: hashedPassword
    })

    try {
        await newAdmin.save()
        .then(() => {
            return res.status(201).json({ success:{ message:'user registered' }})
        })
    } catch (error) {
        switch(error.code) {
            case 11000: 
                return res.status(400).json({ errors:{ message:'username already taken'}})
            default:  
                return res.sendStatus(500)
        }
    }
})

module.exports = router