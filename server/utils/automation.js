const mongoose = require('mongoose')
const schedule = require('node-schedule')
const moment = require('moment')

const USERS = require('../models/users')
const STATISTICS = require('../models/statistics')

const { getVisitor, getExpiredHDF, getHdfStatistics } = require('./pipelines')

const autoDeleteVisitor = async () => {
    const date = moment().startOf('day').add(-15, 'days').toDate()
    const user = await getVisitor(date)
    if(user.length != 0 || user.length != null) {
        for(let i = 0; i < user.length; i++) {
            await USERS.deleteOne({ _id: user[i]._id})
        }
    }
}

const autoDeleteHDF = async () => {
    const date = moment().startOf('day').add(-15, 'days').toDate()
    const user = await getExpiredHDF(date)
    if(user.length != 0 || user.length != null) {
        for(let i = 0; i < user.length; i++) {
            await USERS.findByIdAndUpdate(
                user[i]._id,
                {
                    $pull: {
                        hdf_data: { _id: mongoose.Types.ObjectId(user[i].hdf_data._id)}
                    }
                }
            )
        }
    }
}

const autoGenerateReport = async () => {
    let dateToday = moment().startOf('day').toDate()
    let dateTomorrow = moment().startOf('day').add(1, 'days').toDate()
    let dateNow = moment().format("MMM Do YYYY")

    const data = await getHdfStatistics(dateToday, dateTomorrow, dateNow)
    if(data.length != 0 || data != null) {
        const stats = data.map(data => {
            return {
                school: data._id.school,
                gate: data._id.gate,
                allowed: data.allowed,
                not_allowed: data.not_allowed,
                total_entry: data.total_entry
            }
        })
    
        const newStats = new STATISTICS({
            date: dateNow,
            info: stats
        })
    
        await newStats.save()
    }
}

module.exports = () => {
    schedule.scheduleJob('0 0 * * *', () => {
        autoGenerateReport()
        autoDeleteVisitor()
        autoDeleteHDF()
        console.log('scheduler check run.')
    })
}

// module.exports = () => {
//     schedule.scheduleJob('*/5 * * * * *', () => {
//         autoGenerateReport()
//         console.log('scheduler check run.')
//     })
// }