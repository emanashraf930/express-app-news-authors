const mongoose = require('mongoose')
const validator = require('validator')
    // const bcrypt = require('bcryptjs')
    // const jwt = require('jsonwebtoken')
    // const auth = require('../middelware/auth')
    // authers--> age, email, age, phone, password
const authorsSchema = new mongoose.Schema({

    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 20,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be postive number')

            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value) {
            let reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
            if (!reg.test(value)) {
                throw new Error('Password must include uppercase, lowercase,special characer & number')
            }
        }
    },
    phone: {
        type: Number,
        validate(value) {
            // !validator.isEmail(value)
            if (!validator.isMobilePhone(value)) {
                throw new Error('the number is error .. please try again')
            }
        }
    }

})
const Authors = mongoose.model('authors', authorsSchema)
module.exports = Authors