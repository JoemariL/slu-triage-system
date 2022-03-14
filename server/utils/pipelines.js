// LIBRARY IMPORTS
const mongoose = require("mongoose")

// MODEL IMPORTS
const USERS = require('../models/users')
const ADMIN = require('../models/admin')

// CHECK IF THE VACCINE OBJECT ID EXIST.
module.exports.vaccineIfExist = async (userID, vaccineID) => {
    const vaccine = await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$vaccination_details"
            }
        },
        {
            $match: {
                "vaccination_details._id": mongoose.Types.ObjectId(vaccineID)
            }
        }
    ])
    if(vaccine === undefined || vaccine.length === 0 || vaccine === null) return false
    return true
}

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

module.exports.getHdfToday = async() => {
    return await USERS.aggregate([
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
                    $gt:new Date(Date.now() / 1000 - 24*60*60)
                }
            }
        }
    ])
}