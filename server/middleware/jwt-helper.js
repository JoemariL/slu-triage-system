// LIBRARY IMPORTS
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode');

// UTILS IMPORT
require('dotenv').config({ path: '../.env'})

module.exports.generateAccessToken = async (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '2h' }) 
}

module.exports.generateRefreshToken = async (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: '7d' })
}

module.exports.verifyRefreshToken = async (storedToken, token) => {
    return await jwt.verify(token, process.env.REFRESH_TOKEN_KEY, (err, user) => {
        if (err) return false
        try {
            if(storedToken != token) return false
            delete user.iat
            delete user.exp
            return user
        } catch (error) {
            return false
        }
        
    })
}

module.exports.extractID = async (token) => {
    try {
        const decode = await jwtDecode(token)
        return decode.id
    } catch (error) {
        return false
    }
}
