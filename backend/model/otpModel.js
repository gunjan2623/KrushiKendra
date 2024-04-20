const mongoose = require('mongoose')


const otpSchema = mongoose.Schema({
    email: {
        type: String
    },
    code: {
        type: String
    },
    expireIn: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300// this is in seconds
    }
},
)

module.exports = mongoose.model('otpModel', otpSchema, 'otpModel');