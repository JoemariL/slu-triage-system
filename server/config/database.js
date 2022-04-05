const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env'})

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;