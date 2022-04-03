// LIBRARY IMPORTS.
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const http = require('http')
const https = require('https')
const fs = require('fs')

// UTIL IMPORTS.
require('dotenv').config()
const auth = require('./middleware/auth')
const connectDB = require('./config/database')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: true,
}))

app.use(compression({
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false
        }
        return compression.filter(req, res)
    }
})) 

app.get("/", (req, res) => {
    res.send('This is the Back End Server.')
})

// ROUTERS.
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/users')
const userHdfRouter = require('./routes/hdf')
const adminController = require('./controller/admin')
const userController = require('./controller/user') 
const visitorRouter = require('./routes/visitor')

app.use("/controller", adminController)
app.use("/controller", userController)
app.use("/visitor", visitorRouter)

if(process.env.NODE_ENV === "PRODUCTION") app.use(auth)
app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.use("/hdf", userHdfRouter)

// DATABASE CONNECTION AND SERVER INITIALIZATION.
const port = process.env.PORT
if(process.env.NODE_ENV === "PRODUCTION") {
    const privateKey  = fs.readFileSync('certificate/server.key', 'utf8');
    const certificate = fs.readFileSync('certificate/server.crt', 'utf8');
    const credentials = { key: privateKey, cert: certificate };
    const httpsServer = https.createServer(credentials, app)

    connectDB().then(() => {
        httpsServer.listen(port, '0.0.0.0', () => {
            console.log("✈  Database connected!")
            console.log(`🚀 server is running on port: ${port}!`)
        })
    }).catch(() => {
        console.log('⁉  Failed to connect!')
    })
} else {
    const httpServer = http.createServer(app)
    connectDB().then(() => {
        httpServer.listen(port, '0.0.0.0', () => {
            console.log("✈  Database connected!")
            console.log(`🚀 server is running on port: ${port}!`)
        })
    }).catch(() => {
        console.log('⁉  Failed to connect!')
    })
}

