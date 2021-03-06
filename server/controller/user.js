// LIBRARY IMPORT
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

// MODEL IMPORT
const USERS = require('../models/users')
const TOKEN = require('../models/token')

// UTILS IMPORT
require('dotenv').config({ path: '../.env'})
const auth = require('../middleware/auth')
const { generateAccessToken, generateRefreshToken } = require('../middleware/jwt-helper')
const { emailValidator } = require('../utils/validator')

// LOGIN USER.
router.post("/user/login", async (req, res) => {
    const { email, password } = req.body
    const verifiedEmail = email.toLowerCase();

    const user = await USERS.findOne({ email_address: verifiedEmail })
    if(!user) return res.status(404).json({ errors: { message:'The email or password you entered is not connected to an account.' }})
    if(user.user_type === "VISITOR") return res.status(400).json({ errors: { message:'The email or password you entered is invalid.' }}) 

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({ errors: { message:'The email or password you entered is invalid.' }})

    try {
        const payload = {
            id: user._id,
        }
        const accessToken = await generateAccessToken(payload)
        const refreshToken = await generateRefreshToken(payload)

        const saveToken = new TOKEN ({
            token: refreshToken
        })
        await saveToken.save()

        if (process.env.NODE_ENV === "PRODUCTION"){
            return res.status(200)
            .cookie("accessToken", accessToken, { expires: new Date(new Date().getTime() + 518400 * 1000), secure: true })
            .cookie("refreshToken", refreshToken, { expires: new Date(new Date().getTime() + 518400 * 1000) , httpOnly: true, secure: true})
            .send('Cookies registered')
        } else {
            return res.status(200)
            .cookie("accessToken", accessToken, { expires: new Date(new Date().getTime() + 518400 * 1000) })
            .cookie("refreshToken", refreshToken, { expires: new Date(new Date().getTime() + 518400 * 1000) })
            .send('Cookies registered')
        }
        
    } catch (error) {
        return res.status(400).json({ errors: { message:'error occurred' }})
    }
})

// REGISTER A USER.
router.post("/user/register", async (req, res) => {
    const { firstName, lastName, password, age, contactNumber, homeAddress, email, userType, department } = req.body
    let email_address = email.replace(/\s+/g, '').toLowerCase();
    const emailCheck = emailValidator(email)
    if(age < 1) return res.status(400).json({ errors: { message: 'Please enter a valid age.' }})
    if(emailCheck) return res.status(400).json({ errors:{ message:'Please enter a valid email address.' }})

    let hashedPassword = await bcrypt.hash(password, 12)

    try {
        let newUser = new USERS({
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            password: hashedPassword,
            age,
            contact_number: contactNumber.trim(),
            home_address: homeAddress.trim(),
            email_address,
            department,
            user_type: userType
        })

        await newUser.save()
        .then(() => {
            return res.status(201).json({ success:{ message:'user registered' }})
        })
    } catch (error) {
        switch(error.code) {
            case 11000: 
                return res.status(400).json({ errors:{ message:'Email already taken.'}})
            default:  
                return res.sendStatus(500)
        }
    }
})

router.delete('/logout', async (req, res) => {
    try {
        const token = req.cookies.refreshToken
        if (token == null) {
            res.clearCookie('accessToken')
            return res.sendStatus(204)
        } else { 
            return await TOKEN.deleteOne({ token }).then(() => {
                res.clearCookie('refreshToken').clearCookie('accessToken')
                return res.sendStatus(204)
            })
        }
    } catch (error) {
        return res.sendStatus(400)
    }
})

module.exports = router;