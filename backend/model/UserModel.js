const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({

    UserName: {
        type: String,
        required: [true, 'Please add a name']
    },

    Email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },

    Password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    MobNo: {
        type: String,
        required: [true, 'Please add a phone number'],
    },
Address:{
    type: String,
    required: [true, 'Please add a phone number'],
},


}, { timestamps: true });

module.exports = UserModel = mongoose.model('User', UserSchema)