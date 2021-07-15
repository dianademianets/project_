const { Schema, model } = require('mongoose');

const { USER } = require('../../constants/dataBaseTables.enum');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        type: String,
        default: ''
    },
    activate_token: {
        type: String,
        select: false
    },
    forgot_token: {
        type: String,
        select: false
    },
    activate_status: { type: Boolean }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

module.exports = model(USER, userSchema);
