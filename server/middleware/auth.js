// LIBRARY IMPORTS
const jwt = require('jsonwebtoken')

// UTILS IMPORT
require('dotenv').config({ path: '../.env'})

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] || req.cookies.accessToken

    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
