const mongoose = require('mongoose')
    // const validator = require('validator')
    // const bcrypt = require('bcryptjs')
    // const jwt = require('jsonwebtoken')
    // const auth = require('../middelware/auth')


// const NEWS = mongoose.model('User')
// module.exports = NEWS
// news--> autherId ,title,description,image
const news = mongoose.model('news', {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }

    })
    // const News = mongoose.model('News', newsSchema)
module.exports = news