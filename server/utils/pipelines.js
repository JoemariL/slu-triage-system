// LIBRARY IMPORTS
const mongoose = require("mongoose")
const moment = require('moment')

// MODEL IMPORTS
const USERS = require('../models/users')
const ADMIN = require('../models/admin')

module.exports.hdfIfExist = async (userID, hdfID) => {
    const hdf = await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $match: {
                "hdf_data._id": mongoose.Types.ObjectId(hdfID)
            }
        }
    ])
    if(hdf === undefined || hdf.length === 0 || hdf === null) return false
    return true
}

module.exports.hdfIfExpired = async (userID, hdfID) => {
    const hdf = await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $replaceRoot: {
                newRoot: "$hdf_data"
            }
        },
        {
            $match: {
                _id: mongoose.Types.ObjectId(hdfID)
            }
        }
    ])
    if(hdf[0].is_expired) return true
    return false
}

module.exports.getUserHdf = async(userID) => {
    return await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $replaceRoot: {
                newRoot: "$hdf_data"
            }
        }
    ])
}

module.exports.getUserDetails = async(userID) => {
    return await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $sort: {
                "hdf_data.createdAt": -1
            }
        },
        {
            $unset: ["password", "createdAt", "updatedAt", "__v"]
        }
    ])
}

module.exports.getHdfToday = async(fromDate, toDate) => {
    return await USERS.aggregate([
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $match: {
                'hdf_data.createdAt': {
                    $gt: fromDate, $lt: toDate
                }
            }
        },
        {
            $unset: ["password", "createdAt", "updatedAt", "__v"]
        }
    ]).sort({ createdAt: -1 })
}

module.exports.getHdfTodayUser = async(userID, fromDate, toDate) => {
    return await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $replaceRoot: {
                newRoot: "$hdf_data"
            }
        },
        {
            $match: {
                createdAt: {
                    $gt: fromDate, $lt: toDate
                }
            }
        },
    ])
}

module.exports.hdfIfExistDay = async(userID, fromDate, toDate) => {
    const hdf =  await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $replaceRoot: {
                newRoot: "$hdf_data"
            }
        },
        {
            $match: {
                'createdAt': {
                    $gt: fromDate, $lt: toDate
                }
            }
        }
    ])
    if(hdf === undefined || hdf.length === 0 || hdf === null) return true
    return false
}

module.exports.hdfIfOver = async(userID, hdfID, dateFrom) => {
    const hdf = await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $match: {
                "hdf_data._id": mongoose.Types.ObjectId(hdfID)
            }
        },
        {
            $replaceRoot: {
                newRoot: "$hdf_data"
            }
        }
    ])
    const beforeTime = moment(hdf[0].createdAt)
    if(beforeTime.isBefore(dateFrom)) return true
    return false
}