// LIBRARY IMPORT
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// MODEL IMPORT
const USERS = require('../models/users')
const TOKEN = require('../models/token')

// UTILS IMPORT
require('dotenv').config({ path: '../.env'})
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../middleware/jwt-helper')
const { emailValidator, userRegistrationValidator, loginInputValidator} = require('../utils/validator')

// LOGIN USER.
router.post("/user/login", async (req, res) => {
    let inputUser = (req.body.idNumber === undefined) ? req.body.username : req.body.idNumber
    let inputPassword = (req.body.password === undefined) ? null : req.body.password

    const { errors, valid } = loginInputValidator(inputUser, inputPassword)
    if(!valid) return res.status(400).json({ errors })

    const user = await USERS.findOne({ id_number: inputUser }) || await USERS.findOne({ username: inputUser })
    if(!user) return res.status(404).json({ errors: { message:'user not found' }})

    const isMatch = await bcrypt.compare(inputPassword, user.password)
    if(!isMatch) return res.status(400).json({ errors: { message:'invalid login credentials' }})

    const identification = (user.id_number === null || user.id_number === undefined) ? user.username : user.id_number

    try {
        const payload = {
            id: user._id,
            firstName: user.first_name,
            lastName: user.last_name,
            identification,
            userType: user.user_type
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
        return res.status(400).json({ errors: { message:'error occurred' }})
    }
})

// REGISTER A USER.
router.post("/user/register", async (req, res) => {
    let inputFirstName = (req.body.firstName === undefined) ? null : req.body.firstName
    let inputLastName = (req.body.lastName === undefined) ? null : req.body.lastName
    let inputUser = (req.body.idNumber === undefined) ? req.body.username : req.body.idNumber
    let inputPassword = (req.body.password === undefined) ? null : req.body.password
    let inputAge = (req.body.age === undefined) ? null : req.body.age
    let inputContactNumber = (req.body.contactNumber === undefined) ? null : req.body.contactNumber 
    let inputHomeAddress = (req.body.homeAddress === undefined) ? null : req.body.homeAddress
    let inputEmailAddress = (req.body.emailAddress === undefined) ? null : req.body.emailAddress
    let inputUserType = (req.body.userType === undefined) ? null : req.body.userType

    const { errors, valid } = userRegistrationValidator(
        inputFirstName,
        inputLastName,
        inputUser,
        inputPassword,
        inputAge,
        inputContactNumber,
        inputHomeAddress,
        inputEmailAddress,
    )
    if(!valid) return res.status(400).json({errors})

    let loginCredential = inputUser.replace(/\s+/g, '')
    let regex = new RegExp(["^", loginCredential, "$"].join(""), "i")

    if(isNaN(inputAge)) return res.status(400).json({ errors:{ message:'input age must be a number'}})

    const emailCheck = emailValidator(inputEmailAddress)
    if(emailCheck) return res.status(400).json({ errors:{ message:'email input must be a valid email address' }})
    const idNoIfExists = await USERS.find({ id_number: { $regex: regex }})
    const userIfExists = await USERS.find({ username: { $regex: regex }})
    const emailIfExists = await USERS.find({ email: { inputEmailAddress }})
    if(idNoIfExists.length !== 0 || userIfExists.length !== 0 || emailIfExists.length !== 0) return res.status(400).json({ errors:{ message:'user already exists'}})

    let password = await bcrypt.hash(inputPassword, 12)
    
    let newUser = null
    switch(inputUserType){
        case 'STUDENT':
            newUser = new USERS({
                first_name: inputFirstName,
                last_name: inputLastName,
                id_number: loginCredential,
                password,
                age: inputAge,
                contact_number: inputContactNumber,
                home_address: inputHomeAddress,
                email_address: inputEmailAddress,
                user_type: inputUserType
            })
            break;
        case 'EMPLOYEE':
            newUser = new USERS({
                first_name: inputFirstName,
                last_name: inputLastName,
                id_number: loginCredential,
                password,
                age: inputAge,
                contact_number: inputContactNumber,
                home_address: inputHomeAddress,
                email_address: inputEmailAddress,
                user_type: inputUserType
            })
            break;    
        case 'VISITOR':
            newUser = new USERS({
                first_name: inputFirstName,
                last_name: inputLastName,
                username: loginCredential,
                password,
                age: inputAge,
                contact_number: inputContactNumber,
                home_address: inputHomeAddress,
                email_address: inputEmailAddress,
                user_type: inputUserType
            })  
            break;
        default:  
            return res.status(400).json({ success:{ message:'user type must be specified' }})
    }
    
    await newUser.save()
    .then(() => {
        return res.status(201).json({ success:{ message:'user registered' }})
    })
    .catch(() => {
        return res.status(400).json({ errors:{ message:'user registration failed' }})
    })
    
})

router.post('/token', async (req, res) => {
    try {
        const token = req.body.token
        if (token == null) return res.sendStatus(401)

        // checks if the refresh token exists in the database
        const refreshToken = await TOKEN.find({ token })
        if(refreshToken.length === 0) return res.sendStatus(401)
        
        const tokenInfo = await verifyRefreshToken(refreshToken[0].token, token)
        if(!tokenInfo) return res.sendStatus(403)
        const accessToken = await generateAccessToken(tokenInfo)
        return res.status(200).json({ accessToken })
    } catch (error) {
        return res.sendStatus(404)
    }
})

router.delete('/logout', async (req, res) => {
    try {
        const token = req.body.token
        if (token == null) return res.sendStatus(401)
        await TOKEN.deleteOne({ token }).then(() => {
            return res.sendStatus(204)
        })
    } catch (error) {
        return res.sendStatus(400)
    }
})


module.exports = router;