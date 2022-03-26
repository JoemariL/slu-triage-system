// LIBRARY IMPORTS.
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const cookieParser = require('cookie-parser')

require('dotenv').config()
const connectDB = require('./config/database')
const clusterServer = require('./utils/cluster')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

const allowedOrigin = process.env.FRONT_END_URL
app.use(cors({
    credentials: true,
    origin: allowedOrigin,
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


app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.use("/controller", adminController)
app.use("/controller", userController)
app.use("/hdf", userHdfRouter)

// DATABASE CONNECTION AND SERVER INITIALIZATION.
const port = process.env.PORT
function serverInit(processor_number){
    connectDB().then(() => {
        app.listen(port, '0.0.0.0',() => {
            console.log(`**-- Database running on processor: ${processor_number}.`)
            console.log(`Server: ${processor_number} running on port ${port}. --** \n`)
        })
    }).catch((err) => {
        console.log('Failed to connect!')
    })
}
serverInit()
// clusterServer(serverInit)

