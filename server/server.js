// LIBRARY IMPORTS.
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const http = require('http')

// UTIL IMPORTS.
require('dotenv').config()
const connectDB = require('./config/database')
const auto = require('./utils/automation')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

let whitelist = [ "http://localhost:5000", "http://localhost:3000" ]
app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
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

app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.use("/hdf", userHdfRouter)

// DATABASE CONNECTION AND SERVER INITIALIZATION.
const port = process.env.PORT
app.set('trust proxy', 1)
const httpServer = http.createServer(app)
connectDB()
    .then(() => {
        httpServer.listen(port, '0.0.0.0', () => {
            console.log("✈  Database connected!")
            console.log(`🚀 server is running on port: ${port}!`)
            auto()
        })
    })
    .catch(() => {
        console.log('⁉  Failed to connect!')
    })

