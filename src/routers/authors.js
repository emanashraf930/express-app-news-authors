const express = require('express')
const Authors = require('../models/authors')
const router = new express.Router()
    // get all users

router.get('/authors', (req, res) => {
        Authors.find({}).then((authors) => {
            res.status(200).send(authors)
        }).catch((e) => {
            res.status(500).send(e)
        })
    })
    // 

router.post('/authors', (req, res) => {

    const authors = new Authors(req.body)
    authors.save().then(() => {
        res.status(200).send(authors)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

// get by id
module.exports = router